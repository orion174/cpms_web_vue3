<script setup lang="ts">
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';
	import axios from 'axios';

	import MaterialSwitch from '@/components/MaterialSwitch.vue';
	import VerificationInput from '@/components/VerificationInput.vue';
	import MaterialButton from '@/components/MaterialButton.vue';

	import { openAlertModal, openErrorModal, openToast } from '@/utils/modal';
	import { userLogin } from '@/api/login/loginService';
	import type { ReqLoginDTO } from '@/types/login/types';

	const router = useRouter();

	const loginId = ref('');
	const loginPw = ref('');
	const idErrorFlag = ref(false);
	const pwErrorFlag = ref(false);

	const handleLogin = async () => {
		idErrorFlag.value = false;
		pwErrorFlag.value = false;

		if (!loginId.value) {
			idErrorFlag.value = true;
		}

		if (!loginPw.value) {
			pwErrorFlag.value = true;
		}

		if (idErrorFlag.value || pwErrorFlag.value) return;

		const jsonData: ReqLoginDTO = {
			loginId: loginId.value
			, loginPw: loginPw.value
		};

		try {
			const response = await userLogin(jsonData);
			const { success, message, data } = response.data;

			if (success && data?.accessToken) {
				sessionStorage.setItem('accessToken', data.accessToken);
				sessionStorage.setItem('accessExp', String(data.accessTokenExpiration));
				sessionStorage.setItem('loginHistoryId', String(data.loginHistoryId));

				openToast(message, 'success');
				router.push('/support');

			} else {
				openAlertModal({
					title: '알림',
					message: message ?? '로그인 실패',
				});
			}
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				openErrorModal({
					errorCode: error.response?.data?.errorCode ?? '',
					message: error.response?.data?.message ?? '로그인 중 오류가 발생했습니다.',
				});

			} else {
				openAlertModal({
					title: '알림',
					message: '알 수 없는 에러가 발생했습니다.',
				});
			}
		}
	};
</script>

<template>
	<form role="form" class="text-start mt-3" @submit.prevent="handleLogin">
		<div class="mb-3">
			<VerificationInput
				v-model="loginId"
				id="loginId"
				type="text"
				label="ID"
				:error="idErrorFlag"
				errorMessage="아이디를 입력해주세요."
			/>
		</div>
		<div class="mb-3">
			<VerificationInput
				v-model="loginPw"
				id="loginPw"
				type="password"
				label="Password"
				:error="pwErrorFlag"
				errorMessage="비밀번호를 입력해주세요."
			/>
		</div>

		<MaterialSwitch id="rememberMe" name="rememberMe">
			Remember me
		</MaterialSwitch>

		<div class="text-center">
			<MaterialButton
				type="submit"
				class="my-4 mb-2"
				variant="gradient"
				color="success"
				fullWidth
				@click="handleLogin"
			>
				Login
			</MaterialButton>
		</div>
	</form>
</template>
