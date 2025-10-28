<script setup lang="ts">
	import { ref, computed } from 'vue';

	const props = defineProps({
		modelValue: [String, Number] as unknown as () => string | number | null,
		variant: { type: String, default: 'outline' },
		label: { type: String, default: '' },
		size: { type: String, default: 'default' },
		error: { type: Boolean, default: false },
		disabled: { type: Boolean, default: false },
		name: { type: String, default: '' },
		id: { type: String, required: true },
		placeholder: { type: String, default: '' },
		type: { type: String, default: 'text' },
		isRequired: { type: Boolean, default: false },
	});

	const emit = defineEmits(['update:modelValue']);

	const isFocused = ref(false);

	const handleBlur = () => {
		isFocused.value = false;

		// type이 date이고, modelValue에 실제 값이 있다면
		if (!props.modelValue) {
			emit('update:modelValue', '');
		}
	};

	const handleInput = (event: Event) => {
		const target = event.target as HTMLInputElement;
		let val: string | number | null = target.value;

		if (props.type === 'number') {
			val = val === '' ? 0 : Number(val); // 빈 문자열이면 0
		}

		emit('update:modelValue', val);
	};

	const getSizeClass = computed(() => {
		return props.size ? `form-control-${props.size}` : '';
	});
</script>

<template>
	<div
		class="input-group"
		:class="[
			`input-group-${variant}`,
			{ 'is-focused': isFocused },
			{ 'is-filled': !!modelValue },
			{ 'is-invalid': error },
		]"
	>
		<!-- 날짜선택일때, label ui 숨김처리 -->
		<label
			v-if="props.type !== 'date'"
			:class="variant === 'static' ? '' : 'form-label'"
		>
			{{ label }}
		</label>

		<input
			:id="id"
			:type="type"
			class="form-control"
			:class="getSizeClass"
			:name="name"
			:placeholder="placeholder"
			:required="isRequired"
			:disabled="disabled"
			:value="modelValue"
			@input="handleInput"
			@focus="isFocused = true"
			@blur="handleBlur"
		/>
	</div>
</template>