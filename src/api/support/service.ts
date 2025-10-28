import { apiClient } from "@/api/client";
import { ReqSupportListDTO, ResSupportListDTO } from "@/types/support/types";

export const fetchSupportListAPI = async (
	reqDTO: ReqSupportListDTO
): Promise<ResSupportListDTO> => {
	const url = '/api/support/list';

	const response
		= await apiClient.get<ResSupportListDTO>(url, { params: reqDTO });

	return response;
};