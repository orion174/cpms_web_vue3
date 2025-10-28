<script setup lang="ts">
	import { ref, computed } from 'vue';

	const props = defineProps({
		modelValue: { type: String, default: '' },
		variant: { type: String, default: 'outline' },
		label: { type: String, default: '' },
		size: { type: String, default: 'default' },
		error: { type: Boolean, default: false },
		errorMessage: { type: String, default: '' },
		disabled: { type: Boolean, default: false },
		name: { type: String, default: '' },
		id: { type: String, required: true },
		placeholder: { type: String, default: '' },
		type: { type: String, default: 'text' },
		isRequired: { type: Boolean, default: false },
	});

	const emit = defineEmits(['update:modelValue']);

	const isFocused = ref(false);

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
		<label :class="variant === 'static' ? '' : 'form-label'">{{ label }}</label>
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
			@input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
			@focus="isFocused = true"
			@blur="isFocused = false"
		/>
	</div>
	<div class="text-danger mt-1 text-sm">
		<span v-if="error && errorMessage" >{{ errorMessage }}</span>
	</div>
</template>

<style scoped>
	/* 선택적으로 placeholder 빨간색 설정 */
	input::placeholder {
		transition: color 0.2s;
	}

	.is-invalid input::placeholder {
		color: #f44336;
	}
</style>
