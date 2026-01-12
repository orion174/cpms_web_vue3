import { apiClient } from "@/api/client";
import { ResProjectListDTO } from '@/types/project/types';

export const projectService = {
	async getProjectList(companyId: number): Promise<ResProjectListDTO[]> {
		const response = await apiClient.get<ResProjectListDTO[]>(
			'/api/setting/project/list', {
				params: { companyId },
			},
		);

		return response || [];
	},
};
