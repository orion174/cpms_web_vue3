import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { requestInterceptor, responseInterceptor, errorInterceptor } from './interceptor';
import type { ApiResponse } from '@/types/cmmn';

// 인스턴스 생성 공통
const BASE_CONFIG: AxiosRequestConfig = {
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true,
	timeout: 10000,
};

const createInstance = (contentType: string): AxiosInstance => {
	const instance = axios.create({
		...BASE_CONFIG,
		headers: { 'Content-Type': contentType },
	});
	
	// 요청 인스턴스 생성
	instance.interceptors.request.use(requestInterceptor, errorInterceptor);
	// 응답 인스턴스 생성
	instance.interceptors.response.use(responseInterceptor, errorInterceptor);

	return instance;
};

export const callAPI = createInstance('application/json');

export const rawAPI = createInstance('multipart/form-data');

export const apiClient = {
	async get<T> (url: string, config?: AxiosRequestConfig): Promise<T> {
		const response
			= await callAPI.get<ApiResponse<T>>(url, config);
		return response.data.data;
	},
	async post<T, D = any> (url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
		const response
			= await callAPI.post<ApiResponse<T>>(url, data, config);
		return response.data.data;
	},
	async put<T, D = any> (url: string, data?: D, config?: AxiosRequestConfig): Promise<T> {
		const response
			= await callAPI.post<ApiResponse<T>>(url, data, config);
		return response.data.data;
	},
	async postForm<T> (url: string, formData: FormData, config?: AxiosRequestConfig): Promise<T> {
		const response
			= await rawAPI.post<ApiResponse<T>>(url, formData, config);
		return response.data.data;
	},
};
