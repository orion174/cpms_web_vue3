<script setup lang="ts">
	import { computed } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useUiStore } from '@/stores/useUiStore';

	const uiStore = useUiStore();
	const { isRTL } = storeToRefs(uiStore);

	defineProps<{
		title: {
			text: string;
			value: number | string;
		};
		detail?: string;
		icon: {
			name: string;
			color: string;
			background: string;
		};
		directionReverse?: boolean;
	}>();

	const reverseDirection = 'flex-row-reverse justify-content-between';
</script>

<template>
	<div class="card mb-2" :class="directionReverse ? reverseDirection : ''">
		<div class="card-header p-3 pt-2">
			<div
				class="icon icon-lg icon-shape shadow text-center border-radius-xl mt-n4 position-absolute"
				:class="`bg-gradient-${icon.background} shadow-${icon.background}`"
			>
				<i class="material-icons opacity-10" :class="icon.color" aria-hidden="true">{{ icon.name }}</i>
			</div>
			<div class="pt-1" :class="isRTL ? 'text-start' : 'text-end'">
				<p class="text-sm mb-0 text-capitalize">{{ title.text }}</p>
				<h4 class="mb-0">{{ title.value }}</h4>
			</div>
		</div>

		<hr class="dark horizontal my-0" />

		<div class="card-footer p-3" :class="isRTL ? 'text-start' : 'text-end'">
			<p class="mb-0" v-html="detail"></p>
		</div>
	</div>
</template>