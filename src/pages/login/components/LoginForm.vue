<script setup lang="ts">
	import { ref } from 'vue';
	import VerificationInput from '@/components/BaseModule/VerificationInput.vue';
	import MaterialButton from '@/components/BaseModule/MaterialButton.vue';
	import { useAuth } from '@/composables/auth/useAuth';

	const loginId = ref('');
	const loginPw = ref('');
	const idErrorFlag = ref(false);
	const pwErrorFlag = ref(false);

	const { login, isLoading } = useAuth();

	const handleLogin = async () => {
		idErrorFlag.value = !loginId.value;
		pwErrorFlag.value = !loginPw.value;

		if (idErrorFlag.value || pwErrorFlag.value) return;

		await login(loginId.value, loginPw.value);
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

<!--		<MaterialSwitch id="rememberMe" name="rememberMe">-->
<!--			Remember me-->
<!--		</MaterialSwitch>-->

		<div class="text-center">
			<MaterialButton
				type="submit"
				class="my-4 mb-2"
				variant="gradient"
				color="success"
				fullWidth
				@click="handleLogin"
			>
				{{ isLoading ? 'Loading...' : 'Login' }}
			</MaterialButton>
		</div>
	</form>
</template>
