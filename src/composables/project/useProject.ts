import { ref, watch, type Ref } from 'vue';
import { projectService } from '@/api/setting/projectService';
import type { ResProjectListDTO } from '@/types/project/types'

const projectCache = new Map<string, ResProjectListDTO[]>();

export const useProjectOptionsList = (companyId: Ref<number>) => {
	const options = ref<ResProjectListDTO[]>([]);
	const isLoading = ref(false);
	const error = ref<unknown | null>(null);

	const fetchProjects = async(): Promise<void> => {
		if (!companyId.value) {
			options.value = [];
			return;
		}

		const cacheKey = String(companyId.value);

		if (projectCache.has(cacheKey)) {
			options.value = projectCache.get(cacheKey);
			return;
		}

		isLoading.value = true;
		error.value = null;

		try {
			const response
				= await projectService.getProjectList(companyId.value);

			projectCache.set(cacheKey, response); // 캐시 저장
			options.value = response;
		} catch (e: unknown) {
			console.error("composables useProjectOptionsList error : ", e);
			error.value = e;
			options.value = [];
		} finally {
			isLoading.value = false;
		}
	};

	watch(() => companyId, fetchProjects, { immediate: true });

	return { options, isLoading, error };
};