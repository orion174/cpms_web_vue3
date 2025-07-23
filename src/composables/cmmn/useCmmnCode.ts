import { ref, watch, onMounted } from 'vue';
import { apiClient } from '@/api/client';
import type { ResCmmnCodeDTO } from '@/types/cmmn';

export const useCmmnCode = (groupCode: string) => {
	const options = ref<ResCmmnCodeDTO[]>([]);

	const fetchOptions = async () => {
		if (!groupCode) return;

		const response = await apiClient.post<ResCmmnCodeDTO[]>(`/api/code/list`, groupCode);
		options.value = response;
	};

	watch(() => groupCode, fetchOptions, { immediate: true });

	return { options };
};
