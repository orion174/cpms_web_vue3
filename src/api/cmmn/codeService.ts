import { apiClient } from '@/api/client';
import type { ResCmmnCodeDTO } from '@/types/cmmn';

export const selectCodeList = async (
	groupCode: string
)=> {
	const url = '/api/code/list';

	const response
		= await apiClient.get<ResCmmnCodeDTO[]>(
			url, { params: { groupCode } }
		);

	return response ?? [];
};