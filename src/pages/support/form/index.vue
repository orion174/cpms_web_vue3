<script setup lang="ts">
	import CompanySelect from '@/components/SelectModule/CompanySelect.vue'
	import CmmnCodeSelect from '@/components/SelectModule/CmmnCodeSelect.vue'
	import ProjectSelect from '@/components/SelectModule/ProjectSelect.vue'
	import RequestButtonArea from './components/RequestButtonArea.vue'
	import MaterialInput from '@/components/BaseModule/MaterialInput.vue'
	import ToastEditor from '@/components/ToastEditorModule/ToastEditor.vue'
	import RequestFileArea from '@/pages/support/form/components/RequestFileArea.vue'

	import { useSupportForm } from '@/composables/support/useSupportForm';

	const { formData, fileList, saveSupportRequest } = useSupportForm();
</script>

<template>
	<div class="container-fluid py-4">
		<div class="row">
			<div class="col-12">
				<div class="card shadow">
					<div class="card-header bg-white border-0">
						<div class="row align-items-center">
							<div class="col-8">
								<h4 class="mb-0">프로젝트 문의</h4>
							</div>
							<div class="col-4 text-end">
								<RequestButtonArea
									@save="saveSupportRequest"
								/>
							</div>
						</div>
					</div>
					<div class="card-body">
						<h5 class="mb-3 fw-bold">문의 정보</h5>
						<div class="row g-4 mb-4">
							<div class="col-md-4">
								<label class="form-label">요청 업체</label>
								<CompanySelect
									v-model.number="formData.requestCompanyId"
									class="my-custom-select"
									initText="업체 선택"
								/>
							</div>
							<div class="col-md-4">
								<label class="form-label">문의 프로젝트</label>
								<ProjectSelect
									v-model.number="formData.requestProjectId"
									class="my-custom-select"
									initText="프로젝트 선택"
								/>
							</div>
							<div class="col-md-4">
								<label class="form-label">요청 유형</label>
								<CmmnCodeSelect
									v-model.number="formData.requestCd"
									groupCode="10"
									class="my-custom-select"
									initText="요청 선택"
								/>
							</div>
							<div class="col-md-4">
								<label class="form-label">처리 기한</label>
								<MaterialInput
									v-model="formData.requestDate"
									id="date"
									label="처리기한"
									type="date"
								/>
							</div>
							<div class="col-md-4">
								<label class="form-label">처리 상태</label>
								<CmmnCodeSelect
									v-model.number="formData.statusCd"
									groupCode="20"
									:defaultValue="3"
									class="my-custom-select"
									initText="처리 상태 선택"
								/>
							</div>
						</div>

						<h5 class="mt-4 mb-3 fw-bold">상세 요청</h5>

						<div class="row mb-4">
							<div class="col-12">
								<MaterialInput
									v-model="formData.supportTitle"
									id="title"
									type="text"
									label="요청 제목"
								/>
							</div>
						</div>
						<div class="row mb-4">
							<div class="col-12">
								<label class="form-label">상세 내용 작성</label>
								<ToastEditor
									v-model="formData.supportEditor"
									@uploaded="console.log('에디터에 이미지 파일 업로드됨')"
								/>
							</div>
						</div>
						<div class="mt-4">
							<RequestFileArea
								v-model="fileList"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	/* UI 균일화 */
	.form-control {
		min-height: 42px;
	}
</style>
