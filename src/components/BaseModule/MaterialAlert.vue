<template>
	<div class="alert text-white" role="alert" :class="computedClasses">
		<span class="alert-icon">
			<i :class="iconClass" />
		</span>
		<span class="alert-text">
			<span v-if="icon" v-html="'&nbsp;'"></span>
			<slot />
		</span>
		<button
			v-if="dismissible"
			type="button"
			class="btn-close d-flex justify-content-center align-items-center"
			data-bs-dismiss="alert"
			aria-label="Close"
		>
			<span aria-hidden="true" class="text-lg font-weight-bold">&times;</span>
		</button>
	</div>
</template>

<script setup lang="ts">
	import { computed } from 'vue';

	const props = defineProps({
		color: {
			type: String,
			default: 'success',
		},
		icon: {
			type: String,
			default: '',
		},
		dismissible: {
			type: Boolean,
			default: false,
		},
	});

	const computedClasses = computed(() => {
		const colorValue = props.color ? `alert-${props.color}` : '';
		const dismissibleValue = props.dismissible ? 'alert-dismissible fade show' : '';
		return `${colorValue} ${dismissibleValue}`.trim();
	});

	const iconClass = computed(() => (props.icon ? props.icon : ''));
</script>
