<script setup lang="ts">
	import { ref, computed } from 'vue';
	import { useRoute } from 'vue-router';
	import { storeToRefs } from 'pinia';
	import { useUiStore } from '@/stores/useUiStore';

	const props = defineProps<{
		to: string;
		navText: string;
		collapse?: boolean;
	}>();

	const route = useRoute();
	const uiStore = useUiStore();
	const { isRTL, color } = storeToRefs(uiStore);

	const isExpanded = ref(false);

	// 현재 경로가 활성 메뉴인지 계산
	const isActive = computed(() => {
		return route.path.startsWith(props.to);
	});
</script>

<template>
	<router-link
		:data-bs-toggle="collapse ? 'collapse' : ''"
		:to="to"
		:aria-expanded="isExpanded"
		class="nav-link"
		:class="isActive ? `active bg-gradient-${color}` : ''"
		v-bind="$attrs"
		@click="isExpanded = !isExpanded"
	>
		<div class="text-center d-flex align-items-center justify-content-center" :class="isRTL ? ' ms-2' : 'me-2'">
			<slot name="icon"></slot>
		</div>
		<span class="nav-link-text" :class="isRTL ? ' me-1' : 'ms-1'">{{ navText }}</span>
	</router-link>

	<div v-if="collapse" :class="isExpanded ? 'collapse show' : 'collapse'">
		<slot name="list"></slot>
	</div>
</template>
