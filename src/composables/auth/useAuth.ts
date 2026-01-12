import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '@/api/auth/service';
import { openToast, openErrorModal } from '@/utils/modal';

export function useAuth() {
	const router = useRouter();
	const isLoading = ref(false);

	const login = async (loginId: string, loginPw: string): Promise<void> => {
		isLoading.value = true;

		try {
			const data = await authService.login({ loginId, loginPw });

			sessionStorage.setItem('accessToken', data.accessToken);
			sessionStorage.setItem('accessExp', String(data.accessTokenExpiration));
			sessionStorage.setItem('loginHistoryId', String(data.loginHistoryId));

			openToast('로그인 성공!', 'success');
			router.push('/support/list');

		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				openErrorModal({
					errorCode: error.response?.data?.errorCode ?? '',
					message: error.response?.data?.message ?? '로그인 오류'
				});
			} else {
				openErrorModal({
					errorCode: error.errorCode ?? '',
					message: error.message || '알 수 없는 오류가 발생했습니다.'
				});
			}
		} finally {
			isLoading.value = false;
		}
	};

	return { login, isLoading };
}