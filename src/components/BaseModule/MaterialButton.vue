<template>
	<button class="btn mb-0" :class="getClasses">
		<slot />
	</button>
</template>

<script setup lang="ts">
	import { computed } from 'vue';

	const props = defineProps({
		color: {
			type: String,
			default: 'success',
		},
		size: {
			type: String,
			default: 'md',
		},
		variant: {
			type: String,
			default: 'fill',
		},
		fullWidth: {
			type: Boolean,
			default: false,
		},
		active: {
			type: Boolean,
			default: false,
		},
	});

	// 클래스 계산
	const getClasses = computed(() => {
		let colorValue = '';
		let sizeValue = '';
		let fullWidthValue = '';
		let activeValue = '';

		if (props.variant === 'gradient') {
			colorValue = `bg-gradient-${props.color}`;

		} else if (props.variant === 'outline') {
			colorValue = `btn-outline-${props.color}`;

		} else {
			colorValue = `btn-${props.color}`;
		}

		sizeValue = props.size ? `btn-${props.size}` : '';
		fullWidthValue = props.fullWidth ? 'w-100' : '';
		activeValue = props.active ? 'active' : '';

		return [colorValue, sizeValue, fullWidthValue, activeValue].filter(Boolean).join(' ');
	});
</script>
