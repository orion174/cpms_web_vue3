import { apiClient } from '@/api/client';
import type { ResCompanyListDTO } from '@/types/company/types';

export const selectCompanyList = async (
	companyId: number
):Promise<ResCompanyListDTO[]> => {
	const url = '/api/setting/company/list';

	const response = await apiClient.get<ResCompanyListDTO[]>(
		url,
		{
			params: { companyId: companyId }
		}
	);

	return response ?? [];
};
