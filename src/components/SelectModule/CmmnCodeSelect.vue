<script setup lang="ts">
	import { watch, computed, toRef } from 'vue';
	import { useCmmnCodeOptionsList } from '@/composables/cmmn/useCmmnCode';

	interface Props {
		modelValue: number | null;
		groupCode: string;
		defaultValue?: number | null;
		className?: string;
		initText: string;
	};

	const props = defineProps<Props>();
	const emit = defineEmits(['update:modelValue']);

	const groupCodeRef = toRef(props, 'groupCode')

	const { options, isLoading, error } = useCmmnCodeOptionsList(groupCodeRef);

	const selectedValue = computed<number>({
		get: () => props.modelValue,
		set: (value) => emit('update:modelValue', value || 0)
	});

	watch(options, (newOpts) => {
		if (newOpts.length > 0 && !props.modelValue && props.defaultValue) {
			emit("update:modelValue", props.defaultValue);
		}
	});
</script>

<template>
	<select
		v-model="selectedValue"
		:class="className"
		:disabled="isLoading || !!error"
	>
		<option :value="0">{{ isLoading ? '로딩 중...' : initText }}</option>

		<option v-if="error" disabled>데이터를 불러오지 못했습니다.</option>

		<option v-else-if="!isLoading && options.length === 0" disabled>조회된 데이터가 없습니다.</option>

		<option
			v-for="option in options"
			:key="option.codeId"
			:value="option.codeId"
		>
			{{ option.codeNm }}
		</option>
	</select>
</template>
