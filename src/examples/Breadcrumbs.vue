<template>
	<nav aria-label="breadcrumb">
		<ol class="px-0 pt-1 pb-0 mb-0 bg-transparent breadcrumb" :class="isRTL ? '' : 'me-sm-6'">
			<li class="text-sm breadcrumb-item" :class="color">
				<a v-if="isRTL" :class="color" class="opacity-5 ps-2" href="#">لوحات القيادة</a>
				<a v-else :class="color" class="opacity-8" href="#">Pages</a>
			</li>
			<li class="text-sm breadcrumb-item active" :class="color" aria-current="page">
				{{ currentPage }}
			</li>
		</ol>
		<h6 class="mb-0 font-weight-bolder" :class="color">
			{{ currentPage }}
		</h6>
	</nav>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useUiStore } from '@/stores/useUiStore';

	const props = defineProps<{
		currentPage: string;
		color?: string;
	}>();

	const uiStore = useUiStore();
	const { isRTL } = storeToRefs(uiStore);

	const color = computed(() => props.color ?? 'text-dark');
</script>