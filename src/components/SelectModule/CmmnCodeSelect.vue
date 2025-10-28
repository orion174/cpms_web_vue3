<script setup lang="ts">
	import { computed, toRef } from 'vue';
	import { useCmmnCodeOptionsList } from '@/composables/cmmn/useCmmnCode';
	import type { ResCmmnCodeDTO } from '@/types/cmmn';

	interface Props {
		modelValue: number | null; // v-model
		groupCode: string; // 공통코드 그룹
		className?: string;
		initText: string;
	};

	const props = defineProps<Props>();
	const emit = defineEmits(['update:modelValue']);

	// v-model을 computed로 구현 (Get/Set)
	const selectedValue = computed<number | null>({
		get: () => props.modelValue,
		// v-model 값을 업데이트
		set: (value: number | null) => emit('update:modelValue', value)
	});

	// 공통코드 리스트를 가져오는 부분
	// useCmmnCodeOptionsList가 Ref<ResCmmnCodeDTO[]>를 반환한다고 가정한다.
	const { options, isLoading, error } = useCmmnCodeOptionsList(toRef(props, 'groupCode'));
</script>

<template>
	<select
		v-model="selectedValue"
		:class="className"
		:disabled="isLoading || !!error"
	>
		<option :value="0">{{ initText }}</option>

		<template v-if="isLoading && options.length === 0">
			<option :value="0" disabled>Loading...</option>
		</template>

		<template v-else-if="error">
			<option :value="0" disabled>error!</option>
		</template>

		<template v-else-if="options.length === 0">
			<option :value="0" disabled>empty...</option>
		</template>

		<option
			v-for="option in options"
			:key="(option as ResCmmnCodeDTO).codeId"
			:value="(option as ResCmmnCodeDTO).codeId"
		>
			{{ (option as ResCmmnCodeDTO).codeNm }}
		</option>
	</select>
</template>
