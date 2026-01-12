import axios from 'axios';
import type { ReqLoginDTO, ResLoginDTO, ResRefreshTokenDTO } from '@/types/login/types';
import type { ApiResponse } from '@/types/cmmn';

const ACCESS_KEY = 'accessToken';
const LOGIN_HISTORY_KEY = 'loginHistoryId';

const authInstance = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}/api/auth`,
	withCredentials: true,
	timeout: 10000,
	headers: { 'Content-Type': 'application/json' }
});

export const authService = {
	// AccessToken 조회
	getAccessToken(): string | null {
		return sessionStorage.getItem(ACCESS_KEY);
	},
	// 세션 정보 정리
	clearAuthInfo(): void {
		sessionStorage.removeItem(ACCESS_KEY);
		sessionStorage.removeItem(LOGIN_HISTORY_KEY);
		sessionStorage.removeItem('accessExp');
	},
	// 유저 로그인
	async login(payload: ReqLoginDTO): Promise<ResLoginDTO> {
		const response
			= await authInstance.post<ApiResponse<ResLoginDTO>>('/login', payload);

		const { success, data: loginData, message, errorCode } = response.data

		if (!success || !loginData) {
			const error: any = new Error(message || '로그인 실패');
			error.errorCode = errorCode;
			throw error;
		}

		return loginData;
	},
	// 리프레쉬 토큰 갱신
	async refreshAccessToken(): Promise<string | null> {
		const loginHistoryId = sessionStorage.getItem(LOGIN_HISTORY_KEY);
		
		if (!loginHistoryId) {
			this.clearAuthInfo();
			return null;
		}

		try {
			const response = await authInstance.post<ApiResponse<ResRefreshTokenDTO>>(
				'/refresh-token',
				{ loginHistoryId: Number(loginHistoryId) },
				{ timeout: 5000 },
			);

			const { success, data } = response.data;

			if (success && data?.accessToken) {
				sessionStorage.setItem(ACCESS_KEY, data.accessToken);
				return data.accessToken;
			}

			this.clearAuthInfo();
			return null;

		} catch (error) {
			this.clearAuthInfo();
			console.error('refreshAccessToken failed:', error);
			return null;
		}
	},
};