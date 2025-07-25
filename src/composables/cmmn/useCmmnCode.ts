import { ref, watch, onMounted } from 'vue';
import { apiClient } from '@/api/client';
import type { ReqCmmnCodeDTO, ResCmmnCodeDTO } from '@/types/cmmn';

export const useCmmnCode = (groupCode: string) => {
	const options = ref<ResCmmnCodeDTO[]>([]);

	const fetchOptions = async (): Promise<void> => {
		if (!groupCode) return;

		const response
			= await apiClient.post<ResCmmnCodeDTO[], ReqCmmnCodeDTO>(
				'/api/code/list',
				{ groupCode: groupCode }
			);

		options.value = response;
	};

	watch(() => groupCode, fetchOptions, { immediate: true });

	return { options };
};
