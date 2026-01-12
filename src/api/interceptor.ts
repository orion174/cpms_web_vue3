import axios, {
	type AxiosResponse,
	type AxiosError,
	type AxiosRequestHeaders,
	type InternalAxiosRequestConfig
} from 'axios';
import { authService } from './auth/service';
import { openErrorModal } from '@/utils/modal'
import type { ApiResponse } from '@/types/cmmn';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
};

// 상태 변수: refresh 중 여부
let isRefreshing = false;

// 재시도할 요청들을 저장할 큐
let failedQueue: ((token: string) => void)[] = [];

const processQueue = (token: string): void => {
    failedQueue.forEach((cb) => cb(token));
    failedQueue = [];
};

// 요청 인터셉터: accessToken 삽입
export const requestInterceptor = async (config: InternalAxiosRequestConfig) => {
    const token = authService.getAccessToken();

    if (token) {
        config.headers = (config.headers ?? {}) as AxiosRequestHeaders;
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
};

// 응답 인터셉터: success=false 처리 (blob등 예외는 통과)
export const responseInterceptor = async (response: AxiosResponse) => {
    const contentType = response.headers['content-type'] || '';

    // blob등 예외는 통과
    if (contentType.includes('application/octet-stream')
		|| contentType.includes('application/pdf')
		|| contentType.includes('image/')
		|| response.request?.responseType === 'blob'
	) {
        return response;
    }

    // 그 외 API 응답
    const { success, message, errorCode } = response.data;

    if (!success) {
		openErrorModal({
			errorCode: errorCode
			, message: message
		});

        return Promise.reject(new Error(message || 'API 오류'));
    }

    return response;
};

// 에러 인터셉터: '401'시 토큰 재발급 (중복 요청 방지 포함)
export const errorInterceptor = async (error: AxiosError<ApiResponse>) => {
	const originalRequest = error.config as CustomAxiosRequestConfig & { _retry?: boolean }

	if (error.response?.status === 401 && !originalRequest._retry) {
    	originalRequest._retry = true;

		if (isRefreshing) {
			return new Promise((resolve) => {
				failedQueue.push((token: string) => {
					originalRequest.headers.Authorization = `Bearer ${token}`;
					resolve(axios(originalRequest));
				});
			});
		}

		isRefreshing = true;

		try {
			const newToken = await authService.refreshAccessToken();

			if (newToken) {
				processQueue(newToken);
				originalRequest.headers.Authorization = `Bearer ${newToken}`;

				return axios(originalRequest);
			}
		} catch (e: unknown) {
			console.error('errorInterceptor error : ', e);
			return Promise.reject(e);
		} finally {
			isRefreshing = false;
		}
	}
	
	// '401' 이외 에러 처리
	const errorData = error.response?.data;

	openErrorModal({
		errorCode: errorData?.errorCode ?? 'unknown',
		message: errorData?.message ?? '네트워크 오류가 발생했습니다.'
	});

	return Promise.reject(error);
};
