import { ref, watch, type Ref } from 'vue';
import { companyService } from '@/api/setting/companyService';
import type { ResCompanyListDTO } from '@/types/company/types';

const companyCache = new Map<string, ResCompanyListDTO[]>();

export const useCompanyOptionsList = (companyId: Ref<number>) => {
	const options = ref<ResCompanyListDTO[]>([]);
	const isLoading = ref(false);
	const error = ref<unknown | null>(null);

	const fetchCompanys = async(): Promise<void> => {
		if (!companyId.value) {
			options.value = [];
			return;
		}

		const cacheKey = String(companyId.value);

		if (companyCache.has(cacheKey)) {
			options.value = companyCache.get(cacheKey);
			return;
		}

		isLoading.value = true;
		error.value = null; // 요청 시작 시, 에러 초기화

		try {
			const response
				= await companyService.getCompanyList(companyId.value);

			companyCache.set(cacheKey, response); // 캐시 저장
			options.value = response;
		} catch (e: unknown) {
			console.error("composables useCompanyOptionsList error : ", e);
			error.value = e;
			options.value = [];
		} finally {
			isLoading.value = false;
		}
	};

	watch(() => companyId, fetchCompanys, { immediate: true });

	return { options, isLoading, error };
};
