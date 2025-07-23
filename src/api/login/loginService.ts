import axios, { AxiosResponse } from 'axios';

import { openErrorModal } from '@/utils/modal';
import type { ReqLoginDTO, ResLoginDTO } from '@/types/login/types';
import type { ApiResponse } from '@/types/cmmn';

export const userLogin = async (data: ReqLoginDTO): Promise<AxiosResponse<ApiResponse<ResLoginDTO>>> => {

	return await axios.post<ApiResponse<ResLoginDTO>>(
		`${import.meta.env.VITE_API_URL}/api/auth/login`,
		data,
		{
			headers: { 'Content-Type': 'application/json' },
			withCredentials: true,
		}
	);
};
