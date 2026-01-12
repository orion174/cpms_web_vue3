<script setup lang="ts">
	import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
	import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer.js";

	const props = defineProps<{
		html: string;
	}>();

	const viewerEl = ref<HTMLElement | null>(null);
	let viewerInstance: any = null;

	// 에디터 생성
	onMounted(() => {
		if (viewerEl.value) {
			viewerInstance = new Viewer({
				el: viewerEl.value,
				initialValue: props.html || '',
			});
		}
	});

	// html이 변경되면 viewer에도 반영
	watch(
		() => props.html,
		(v) => {
			if (viewerInstance) {
				viewerInstance.setHTML(v || '');
			}
		}
	);

	// 메모리 정리
	onBeforeUnmount(() => {
		viewerInstance = null;
	});
</script>

<template>
	<div ref="viewerEl" class="toast-viewer">
		<!-- 에디터 영역 -->
	</div>
</template>

<style scoped>
	:deep(.toastui-editor-contents) {
		font-size: 14px;
		line-height: 1.7;
	}
</style>
