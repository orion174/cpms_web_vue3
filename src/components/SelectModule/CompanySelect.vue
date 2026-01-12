<script setup lang="ts">
	import { watch, computed, toRef } from 'vue';
	import { useCompanyOptionsList } from '@/composables/company/useCompany';

	interface Props {
		modelValue: number | null;
		companyId?: number;
		className?: string;
		initText: string;
	};

	const props = defineProps<Props>();
	const emit = defineEmits(['update:modelValue']);

	// default 값 할당
	const companyIdRef = toRef(props, 'companyId');

	const { options, isLoading, error } = useCompanyOptionsList(companyIdRef);

	const selectedValue = computed<number>({
		get: () => props.modelValue,
		set: (val) => emit('update:modelValue', val ?? 0)
	});

	watch([options, isLoading], ([newOptions, loading]) => {
		// 로딩이 끝났고, 옵션이 하나 일때 (일반 권한의 사용자)
		if (!loading && newOptions.length === 1) {
			const singleValue = newOptions[0].companyId;

			if (selectedValue.value === 0) {
				selectedValue.value = singleValue;
			}
		}
	}, { immediate: true });
</script>

<template>
  	<select
		v-model.number="selectedValue"
		:class="className"
		:disabled="isLoading || !!error"
	>
		<option :value="0">{{ isLoading ? '로딩 중...' : initText }}</option>

		<option v-if="error" disabled>데이터를 불러오지 못했습니다.</option>

		<option v-else-if="!isLoading && options.length === 0" disabled>조회된 데이터가 없습니다.</option>

		<option
			v-for="option in options"
			:key="option.companyId"
			:value="option.companyId"
		>
			{{ option.companyNm }}
		</option>
	</select>
</template>