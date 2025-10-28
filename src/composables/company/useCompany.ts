import { ref, watch, type Ref } from 'vue';

import { selectCompanyList } from '@/api/setting/companyService';
import type { ResCompanyListDTO } from '@/types/company/types';

export const useCompanyOptionsList = (companyId: Ref<number>) => {
	const options = ref<ResCompanyListDTO[]>([]);
	const isLoading = ref(false);
	const error = ref<Error | null>(null);

	const fetchCompanys = async(): Promise<void> => {
		isLoading.value = true;
		error.value = null;

		try {
			const response
				= await selectCompanyList(companyId.value);

			options.value = response;

		} catch (e: unknown) {
			console.error("composables useCompanyOptionsList error : ", e);
			error.value = e as Error;
			options.value = [];

		} finally {
			isLoading.value = false;
		}
	};

	watch(() => companyId, fetchCompanys, { immediate: true });

	return { options, isLoading, error };
};