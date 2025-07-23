import Swal from 'sweetalert2';

interface CustomModalOptions {
	title: string;
	message: string;
	isConfirm?: boolean;
	onConfirm?: () => void;
	onCancel?: () => void;
};

interface ErrorModalOptions {
	errorCode: string;
	message: string;
	isConfirm?: boolean;
	onConfirm?: () => void;
};

export const openAlertModal = ({
	title, message, isConfirm = false, onConfirm, onCancel
}: CustomModalOptions ) => {

	Swal.fire({
		// icon: 'question',
		title: title,
		html: message.replace(/\n/g, '<br>'),
		showCancelButton: isConfirm,
		confirmButtonText: '확인',
		cancelButtonText: '취소',
		confirmButtonColor: '#28a745', // 초록
		cancelButtonColor: '#dc3545', // 빨강
	}).then((result) => {
		if (result.isConfirmed) {
			onConfirm?.();
		} else if (result.dismiss === Swal.DismissReason.cancel) {
			onCancel?.();
		}
	});
};

export const openErrorModal = ({
	errorCode, message, isConfirm = false, onConfirm
}: ErrorModalOptions) => {

	Swal.fire({
		// icon: 'error',
		title: '오류 [ 에러코드 : ' + errorCode + ' ]',
		html: message.replace(/\n/g, '<br/>'),
		confirmButtonText: '확인',
	}).then((result) => {
		if (result.isConfirmed) {
			onConfirm?.();
		}
	});
};

export const openToast = (
	message: string, type: 'success' | 'error' | 'info' | 'warning' = 'success'
) => {

	Swal.fire({
		toast: true,
		position: 'top-end',
		icon: type,
		title: message,
		showConfirmButton: false,
		timer: 2000,
		timerProgressBar: true,
	});
};