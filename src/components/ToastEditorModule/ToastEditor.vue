<script setup lang="ts">
	import { onMounted, onBeforeUnmount, ref, watch } from "vue";

	import Editor from "@toast-ui/editor";
	import "@toast-ui/editor/dist/toastui-editor.css";

	import { useAuthStore } from "@/stores/useAuthStore"

	const authStore = useAuthStore();

	const props = defineProps<{
		modelValue: string;
		height?: string;
		initialEditType?: "wysiwyg" | "markdown";
		placeholder?: string;
	}>();

	const emit = defineEmits<{
		(e: "update:modelValue", v: string): void;
		(e: "uploaded", v: string): void;
	}>();

	const editor = ref<any>(null);

	const editorEl = ref<HTMLDivElement | null>(null);

	const DEFAULT_UPLOAD_URL = `
		${import.meta.env.VITE_API_URL}/cmmn/editor/toast-editor/upload
	`;

	// 이미지 업로드 핸들러
	const addImageBlobHook = async (blob: File, callback: (url: string, alt: string) => void) => {
		try {
			const uploadUrl = DEFAULT_UPLOAD_URL;
			const headers = { Authorization: "Bearer " + authStore.accessToken, };

			const form = new FormData();

			form.append("file", blob);

			const res = await fetch(uploadUrl, {
				method: "POST",
				headers,
				body: form,
			});

			if (!res.ok) throw new Error("업로드 실패");

			const data = await res.json();
			callback(data.url, blob.name);

			emit("uploaded", data.url);

		} catch (e: unknown) {
			console.error('에디터 파일 업로드 에러 : ' + e);
		}
	};

	// Editor 초기화
	onMounted(() => {
		editor.value = new Editor({
			el: editorEl.value!,
			height: props.height ?? "420px",
			initialEditType: props.initialEditType ?? "wysiwyg",
			previewStyle: "vertical",
			initialValue: props.modelValue || "",
			usageStatistics: false,
			placeholder: props.placeholder ?? "",
			toolbarItems: [
				["heading", "bold", "italic", "strike"],
				["hr", "quote"],
				["ul", "ol", "task"],
				["table", "link"],
				["image", "code", "codeblock"],
			],
			hooks: {
				addImageBlobHook,
			},
			events: {
				change: () => {
					const html = editor.value.getHTML();
					emit("update:modelValue", html);
				},
			},
		});
	});

	// 외부에서 모델 변경 → Editor 반영
	watch(
		() => props.modelValue,
		(value) => {
			if (!editor.value) return;

			const current = editor.value.getHTML();

			if (value !== current) {
				editor.value.setHTML(value || "");
			}
		}
	);

	onBeforeUnmount(() => {
		editor.value?.destroy();
	});
</script>

<template>
	<div ref="editorEl">
		<!-- 에디터 영역 -->
	</div>
</template>

<style scoped>
	/* 테두리 스타일 커스텀 */
	:deep(.toastui-editor-defaultUI) {
		border: 1px solid #dee2e6;
		border-radius: 8px;
	}
	/* 툴바 스타일 */
	:deep(.toastui-editor-defaultUI .toastui-editor-toolbar) {
		border-bottom: 1px solid #eee;
	}
	/* 본문 텍스트 */
	:deep(.toastui-editor-contents) {
		font-size: 14px;
		line-height: 1.6;
	}
	/* Markdown/WYSIWYG 전환 버튼 숨기기 */
	:deep(.toastui-editor-mode-switch) {
		display: none !important;
	}
</style>
