import { ref, watch } from 'vue';
import { apiClient } from '@/api/client';
import type { ResCompanyListDTO, ReqCompanyListDTO } from '@/types/company/types';

export const useCompanyOptionsList = (companyId: number = 0) => {
	const options = ref<ResCompanyListDTO[]>([]);
	const hasAutoSelected = ref(false);

	const fetchCompanys = async (): Promise<void> => {
		const response
			= await apiClient.post<ResCompanyListDTO[], Partial<ReqCompanyListDTO>>(
				'/api/setting/company/list',
				{ companyId: companyId }
			);

		options.value = response;
	};

	watch(() => companyId, fetchCompanys, { immediate: true });

	return { options, hasAutoSelected };
};