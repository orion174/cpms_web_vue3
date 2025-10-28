<script setup lang="ts">
	import { ref, watch, computed, toRef } from 'vue';
	import { useCompanyOptionsList } from '@/composables/company/useCompany';

	interface Props {
		modelValue: number; // v-model
		companyId?: number; // 검색 필터
		className?: string;
		initText: string;
	};

	const props = defineProps<Props>();
	const emit = defineEmits(['update:modelValue']);

	// v-model을 computed로 구현 (Get/Set)
	const selectedValue = computed<number | null>({
		get: () => props.modelValue,
		set: (val: number | null) => emit('update:modelValue', val === null ? 0 : val)
	});

	// default 값 할당
	const companyIdRef = computed({
		get: () => props.companyId ?? 0, // undefined면 0
		set: (val: number) => {}
	});

	const { options, isLoading } = useCompanyOptionsList(companyIdRef);

	// 'hasAutoSelected' 상태를 컴포저블이 아닌 컴포넌트가 직접 관리
	const hasAutoSelected = ref(false);

	watch(options,(newOptions) => {
		// 컴포넌트 로딩이 끝났고, 옵션이 1개이며, 아직 자동선택 안됐을 때
		if (!isLoading.value && newOptions.length === 1 && !hasAutoSelected.value) {
			// computed setter가 emit을 실행시켜줌
			selectedValue.value = newOptions[0].companyId;
			hasAutoSelected.value = true;
		}
	});
</script>

<template>
  	<select
		:class="className"
		v-model.number="selectedValue"
	>
		<option :value="0">{{ initText }}</option>

		<option v-if="isLoading" :value="0" disabled>
			 Loading...
		</option>

		<option
			v-for="option in options"
			:key="option.companyId"
			:value="option.companyId"
		>
			{{ option.companyNm }}
		</option>
	</select>
</template>