import { ref, watch, type Ref } from 'vue';
import { apiClient } from '@/api/client';
import type { ResCompanyListDTO, ReqCompanyListDTO } from '@/types/company/types';

export const useCompanyOptionsList = (companyId: Ref<number>) => {
	const options = ref<ResCompanyListDTO[]>([]);
	const isLoading = ref(false);
	const error = ref<Error | null>(null);

	const fetchCompanys = async (): Promise<void> => {
		isLoading.value = true;
		error.value = null;

		try {
			const response
				= await apiClient.get<ResCompanyListDTO[]>(
				'/api/setting/company/list',
				{
					params: {
						companyId: companyId.value
					}
				}
			);

			options.value = response;

		} catch (e: unknown) {
			console.error("composables useCompany error : ", e);
			error.value = e as Error;
			options.value = [];

		} finally {
			isLoading.value = false;
		}
	};

	watch(() => companyId, fetchCompanys, { immediate: true });

	return { options, isLoading, error };
};