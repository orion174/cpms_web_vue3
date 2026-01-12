import { apiClient } from '@/api/client';
import type { ResCompanyListDTO } from '@/types/company/types';

export const companyService = {
	async getCompanyList(companyId: number): Promise<ResCompanyListDTO[]> {
		const response = await apiClient.get<ResCompanyListDTO[]>(
			'/api/setting/company/list', {
				params: { companyId },
			},
		);

		return response ?? [];
	},
};
