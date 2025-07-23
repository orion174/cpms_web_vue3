<script setup lang="ts">
	import { ref, watch } from 'vue';
	import { useCmmnCode } from '@/composables/cmmn/useCmmnCode';

	interface Props {
		groupCode: string;
		initText: string;
		modelValue: number;
		className?: string;
	}

	const props = defineProps<Props>();
	const emit = defineEmits(['update:modelValue']);

	const selectedValue = ref<number>(props.modelValue);

	const { options } = useCmmnCode(props.groupCode);

	// modelValue 변경 감지해서 내부 selectedValue 동기화
	watch(
		() => props.modelValue,
		(val) => {
			selectedValue.value = val;
		},
	);

	// v-model 이벤트 발생
	watch(selectedValue, (val) => {
		emit('update:modelValue', val);
	});

	defineOptions({ name: 'CmmnCodeSelect' });
</script>

<template>
	<select :class="className" v-model="selectedValue">
		<option :value="0">{{ initText }}</option>
		<option v-for="option in options" :key="option.codeId" :value="option.codeId">
			{{ option.codeNm }}
		</option>
	</select>
</template>
