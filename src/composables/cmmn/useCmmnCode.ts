import { ref, watch, type Ref } from 'vue';

import { selectCodeList } from '@/api/cmmn/codeService';
import type { ResCmmnCodeDTO } from '@/types/cmmn';

export const useCmmnCodeOptionsList = (groupCode: Ref<string>) => {
	const options = ref<ResCmmnCodeDTO[]>([]);
	const isLoading = ref(false);
	const error = ref<Error | null>(null);

	const fetchCmmnCodes = async(): Promise<void> => {
		if (!groupCode.value) {
			options.value = [];
			return;
		}

		isLoading.value = true;
		error.value = null;

		try {
			const response
				= await selectCodeList(groupCode.value);

			options.value = response;

		} catch (e: unknown) {
			console.error("composables useCmmnCodeOptionsList error : ", e);
			error.value = e as Error;
			options.value = [];

		} finally {
			isLoading.value = false;
		}
	};

	watch(() => groupCode, fetchCmmnCodes, { immediate: true});

	return { options, isLoading, error };
};