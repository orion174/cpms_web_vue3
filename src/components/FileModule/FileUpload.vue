<script setup lang="ts">
	import { ref, watch, computed } from 'vue';

	import { openAlertModal } from '@/utils/modal';
	import type { FileItem, NewFileItem } from '@/types/cmmn';

	import excelIcon from '@/assets/img/icons/excel_icon.png';
	import hwpIcon   from '@/assets/img/icons/hwp_icon.png';
	import jpgIcon   from '@/assets/img/icons/jpg_icon.png';
	import pdfIcon   from '@/assets/img/icons/pdf_icon.png';
	import pngIcon   from '@/assets/img/icons/png_icon.png';
	import pptIcon   from '@/assets/img/icons/ppt_icon.png';
	import wordIcon  from '@/assets/img/icons/word_icon.png';

	type Props = {
		/** v-model: 파일 리스트 */
		modelValue: FileItem[];
		/** 기존 파일 삭제 API 호출 콜백 (기존파일만) */
		onDeleteOld?: (id: number) => void;
		/** 허용 확장자(소문자, 점 없이) */
		allowedExts?: string[];
		/** 최대 업로드 파일 개수 */
		max?: number;
	};

	const props = withDefaults(defineProps<Props>(), {
		allowedExts: () =>
			['xlsx', 'xls', 'hwp', 'jpg', 'jpeg', 'pdf', 'png', 'ppt', 'pptx', 'doc', 'docx'],
		max: 5,
	});

	const emit = defineEmits<{
		(e: 'update:modelValue', v: FileItem[]): void;
	}>();

	/** 숨겨진 input 제어 */
	const fileInputRef = ref<HTMLInputElement | null>(null);

	/** 로컬 표시용 리스트 (v-model 동기화) */
	const fileList = ref<FileItem[]>([]);

	watch(
		() => props.modelValue,
		(v) => (fileList.value = [...v]),
		{ immediate: true }
	);

	const acceptAttr = computed(
		() => props.allowedExts.map((ext) => `.${ext}`).join(',')
	);

	/** 아이콘 선택 */
	const getIcon = (ext: string): string => {
		switch (ext) {
			case 'xlsx':
			case 'xls':
				return excelIcon;
			case 'hwp':
				return hwpIcon;
			case 'jpg':
			case 'jpeg':
				return jpgIcon;
			case 'pdf':
				return pdfIcon;
			case 'png':
				return pngIcon;
			case 'ppt':
			case 'pptx':
				return pptIcon;
			case 'doc':
			case 'docx':
				return wordIcon;
			default:
				return '';
		}
	};

	/** 파일 다이얼로그 열기 */
	const openFileDialog = () => {
		fileInputRef.value?.click();
	};

	/** 파일 추가 */
	const handleFileChange = (e: Event) => {
		const target = e.target as HTMLInputElement;
		const files = Array.from(target.files || []);

		// 확장자 필터링
		const validFiles = files.filter((f) => {
			const ext = f.name.split('.').pop()?.toLowerCase() ?? '';
			return props.allowedExts.includes(ext);
		});

		// NewFileItem으로 변환
		const newItems: NewFileItem[] = validFiles.map((f, idx) => ({
			id: Date.now() + idx, // number id 유지
			name: f.name,
			file: f,
			isNew: true,
		}));

		const merged = [...fileList.value, ...newItems];

		if (merged.length > props.max) {
			openAlertModal({
				title: '알림',
				message: `파일은 최대 ${props.max}개까지 첨부 가능합니다.`,
				isConfirm: false,
			});

			target.value = '';
			return;
		}

		fileList.value = merged;
		emit('update:modelValue', merged);

		// input 초기화(같은 파일 재선택 허용)
		target.value = '';
	};

	/** 파일 삭제 */
	const deleteFile = (file: FileItem) => {
		if (file.isNew === false) {
			// 기존 파일 → 서버 삭제 콜백
			props.onDeleteOld?.(file.id);
		}

		const next = fileList.value.filter((f) => f.id !== file.id);

		fileList.value = next;
		emit('update:modelValue', next);
	};
</script>

<template>
	<div class="file-upload">
		<div class="header-row">
			<h5 class="mb-0">첨부 파일</h5>

			<button
				type="button"
				class="btn btn-primary btn-sm"
				@click="openFileDialog"
			>
				{{ fileList.length === 0 ? '첨부파일 등록' : '첨부파일 추가 등록' }}
			</button>

			<input
				ref="fileInputRef"
				type="file"
				multiple
				:accept="acceptAttr"
				@change="handleFileChange"
				class="hidden-input"
			/>
		</div>

		<div v-if="fileList.length === 0" class="empty">
			첨부된 파일이 없습니다.
		</div>

		<ul v-else class="file-list">
			<li v-for="f in fileList" :key="f.id" class="file-chip" :title="f.name">
				<img
					class="icon"
					:src="getIcon(f.name.split('.').pop()?.toLowerCase() || '')"
					alt=""
				/>
				<span class="name">{{ f.name }}</span>
				<button
					type="button"
					class="close"
					aria-label="삭제"
					@click="deleteFile(f)"
				>
					×
				</button>
			</li>
		</ul>
	</div>
</template>

<style scoped>
	.file-upload {
		margin-top: 0.75rem;
	}

	.header-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 12px;
	}

	.hidden-input {
		display: none;
	}

	.empty {
		color: #6c757d;
		font-size: 0.95rem;
	}

	.file-list {
		display: flex;
		flex-wrap: wrap;
		gap: 8px 10px;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.file-chip {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		max-width: 100%;
		border: 1px solid #dee2e6;
		background: #f8f9fa;
		color: #495057;
		padding: 6px 10px 6px 8px;
		border-radius: 8px;
		line-height: 1.2;
	}

	.file-chip .icon {
		width: 18px;
		height: 18px;
	}

	.file-chip .name {
		max-width: 28ch;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.95rem;
	}

	.file-chip .close {
		margin-left: 2px;
		border: 0;
		background: transparent;
		color: #6c757d;
		font-size: 18px;
		line-height: 1;
		padding: 0 2px;
		cursor: pointer;
	}
	.file-chip .close:hover {
		color: #dc3545;
	}
</style>
