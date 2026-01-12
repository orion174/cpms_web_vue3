import { ref, watch, type Ref } from 'vue';
import { codeService } from '@/api/cmmn/codeService';
import type { ResCmmnCodeDTO } from '@/types/cmmn';

const codeCache = new Map<string, ResCmmnCodeDTO[]>();

export const useCmmnCodeOptionsList = (groupCode: Ref<string>) => {
	const options = ref<ResCmmnCodeDTO[]>([]);
	const isLoading = ref(false);
	const error = ref<unknown | null>(null);

	const fetchCmmnCodes = async(): Promise<void> => {
		if (!groupCode.value) {
			options.value = [];
			return;
		}

		if (codeCache.has(groupCode.value)) {
			options.value = codeCache.get(groupCode.value)!;
			return;
		}

		isLoading.value = true;
		error.value = null;

		try {
			const response = await codeService.getCodeList(groupCode.value);
			codeCache.set(groupCode.value, response); // 캐시 저장
			options.value = response;
		} catch (e: unknown) {
			console.error("composables useCmmnCodeOptionsList error : ", e);
			error.value = e;
			options.value = [];
		} finally {
			isLoading.value = false;
		}
	};

	watch(() => groupCode, fetchCmmnCodes, { immediate: true});

	return { options, isLoading, error };
};
