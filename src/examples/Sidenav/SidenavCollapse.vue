<template>
	<router-link
		:data-bs-toggle="collapse ? 'collapse' : ''"
		:to="collapse ? `#${collapseRef}` : collapseRef"
		:aria-controls="collapseRef"
		:aria-expanded="isExpanded"
		class="nav-link"
		:class="getRoute() === collapseRef ? `active bg-gradient-${color}` : ''"
		v-bind="$attrs"
		@click="isExpanded = !isExpanded"
	>
		<div class="text-center d-flex align-items-center justify-content-center" :class="isRTL ? ' ms-2' : 'me-2'">
			<slot name="icon"></slot>
		</div>
		<span class="nav-link-text" :class="isRTL ? ' me-1' : 'ms-1'">{{ navText }}</span>
	</router-link>

	<div :class="isExpanded ? 'collapse show' : 'collapse'">
		<slot name="list"></slot>
	</div>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	import { useRoute } from 'vue-router';
	import { storeToRefs } from 'pinia';
	import { useUiStore } from '@/stores/useUiStore';

	defineProps<{
		collapseRef: string;
		navText: string;
		collapse?: boolean;
	}>();

	const route = useRoute();
	const uiStore = useUiStore();
	const { isRTL, color } = storeToRefs(uiStore);

	const isExpanded = ref(false);

	const getRoute = () => {
		const routeArr = route.path.split('/');
		return routeArr[1];
	};
</script>

<script lang="ts">
	export default {
		name: 'SidenavCollapse',
	};
</script>
