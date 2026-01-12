import { apiClient } from "@/api/client";

import type { ApiResponse } from '@/types/cmmn';
import type { ReqSupportListDTO, ResSupportListDTO } from "@/types/support/types";

export const fetchSupportListAPI = async (
	reqDTO: ReqSupportListDTO
): Promise<ResSupportListDTO> => {

	const url = '/api/support/list';

	const response
		= await apiClient.get<ResSupportListDTO>(
			url, { params: reqDTO }
		);

	return response;
};

export const saveSupportRequestAPI = async (
	reqFormData: FormData
): Promise<string> => {

	const url = '/api/support/insert';

	const res: ApiResponse<void>
		= await apiClient.postForm(url, reqFormData);

	return res.message;
};