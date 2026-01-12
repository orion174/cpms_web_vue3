import { apiClient } from '@/api/client';
import type { ResCmmnCodeDTO } from '@/types/cmmn';

export const codeService = {
	async getCodeList(groupCode: string): Promise<ResCmmnCodeDTO[]> {
		const response = await apiClient.get<ResCmmnCodeDTO[]>(
			'/api/code/list', {
				params: { groupCode },
			},
		);

		return response || [];
	},
};
