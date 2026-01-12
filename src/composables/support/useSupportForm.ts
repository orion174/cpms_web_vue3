import { reactive, ref } from "vue";
import { useRouter } from 'vue-router';

import { appendPlainFields } from "@/utils/form";
import { openAlertModal, openToast } from '@/utils/modal';
import { saveSupportRequestAPI } from "@/api/support/service";

import { initFormData, ReqInsertSupportDTO } from '@/types/support/types';
import type { FileItem, NewFileItem } from "@/types/cmmn";

export const useSupportForm = () => {
	const router = useRouter();

	const formData
		= reactive<ReqInsertSupportDTO>({ ...initFormData });

	// 파일 리스트 (FileUpload.vue v-model로 연동)
	const fileList = ref<FileItem[]>([]);

	const validate = (): string | null => {
		if (!formData.requestCompanyId) return "요청 업체를 선택하세요.";
		if (!formData.requestProjectId) return "프로젝트를 선택하세요.";
		if (!formData.requestCd) return "요청 유형을 선택하세요.";
		if (!formData.supportTitle) return "제목을 입력하세요.";
		if (!formData.statusCd) return "처리 상태를 선택하세요.";
		if (!formData.requestDate) return "처리 기한을 선택하세요.";

		return null;
	};

	// 저장
	const saveSupportRequest = async (): Promise<void> => {
		const err = validate();
		
		// 필수 항목 누락
		if (err) {
			openAlertModal({
				title: "알림",
				message: err,
				isConfirm: false
			});

			return;
		}

		openAlertModal({
			title: "확인",
			message: "저장하시겠습니까?",
			isConfirm: true,
			onConfirm: async (): Promise<void> => {
				const fd = new FormData();

				// 문자열, 숫자 필드 자동 append
				appendPlainFields(fd, formData, ["supportEditor"]);

				// 에디터 HTML 추가
				fd.append("supportEditor", formData.supportEditor);

				// 새로 업로드한 파일만 append한다.
				fileList.value
					.filter((file): file is NewFileItem => file.isNew && !file.file)
					.forEach((file) => {
						if (file.file) fd.append("supportFile", file.file);
					});

				// 문의 저장 API
				const message = await saveSupportRequestAPI(fd);

				openToast(message, 'success');

				router.push('/support/list');
			}
		});
	};

	return {
		formData,
		fileList,
		saveSupportRequest
	}
};