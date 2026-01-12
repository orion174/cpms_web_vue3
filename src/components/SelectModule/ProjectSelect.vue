<script setup lang="ts">
	import { computed, toRef } from 'vue';
	import { useProjectOptionsList } from '@/composables/project/useProject';

	interface Props {
		modelValue: number | null;
		companyId?: number;
		className?: string;
		initText: string;
	}

	const props = defineProps<Props>();
	const emit = defineEmits(['update:modelValue']);

	const companyIdRef = toRef(props, 'companyId');

	const { options, isLoading, error } = useProjectOptionsList(companyIdRef);

	const selectedValue = computed<number>({
		get: () => props.modelValue,
		set: (val) => emit('update:modelValue', val ?? 0),
	});
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
			:key="option.projectId"
			:value="option.projectId"
		>
			{{ option.projectNm }}
		</option>
	</select>
</template>