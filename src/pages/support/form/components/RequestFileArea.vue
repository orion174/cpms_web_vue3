<script setup lang="ts">
	import { ref } from 'vue';
	import FileUpload from '@/components/FileModule/FileUpload.vue'

	import type { FileItem } from '@/types/cmmn'

	const fileList = ref<FileItem[]>([]);

	const deleteOldFile = (id: number) => {
		console.log("기존 파일 삭제: ", id);
	};
</script>

<template>
	<div class="section-space">
		<FileUpload
			v-model="fileList"
			:onDeleteOld="deleteOldFile"
			:max="5"
		/>
	</div>
</template>
