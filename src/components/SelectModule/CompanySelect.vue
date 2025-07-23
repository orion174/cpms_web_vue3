<script setup lang="ts">
	import { ref, watch } from 'vue';
	import { useCompanyOptionsList } from '@/composables/company/useCompany';

	interface Props {
		modelValue: number;
		companyId: number;
		className: string;
		initText: string;
	};

	const props = defineProps<Props>();
	const emit = defineEmits(['update:modelValue']);

	const selectedValue = ref(props.modelValue);

	const { options, hasAutoSelected } = useCompanyOptionsList(props.companyId ?? 0);

	// v-model 연동
	watch(() => props.modelValue, val => selectedValue.value = val);
	watch(selectedValue, val => emit('update:modelValue', val));

	// 업체 데이터 조회 권한 상, 옵션이 1개일경우, 해당 옵션으로 자동선택이 된다.
	watch(options, (newOptions) => {
		if (newOptions.length === 1 && !hasAutoSelected.value) {
			selectedValue.value = newOptions[0].companyId;
			hasAutoSelected.value = true;
		}
	});
</script>

<template>
  	<select
		:class="className"
		:value="selectedValue"
		@change="(e) => selectedValue = (e.target as HTMLSelectElement).value"
	>
		<option :value="0">{{ initText }}</option>
		<option v-for="option in options" :key="option.companyId" :value="option.companyId">
			{{ option.companyNm }}
		</option>
	</select>
</template>