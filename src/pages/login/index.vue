<script setup lang="ts">
	import { onBeforeMount, onBeforeUnmount } from 'vue';
	import { useUiStore } from '@/stores/useUiStore';

	import LoginNavbar from '@/pages/layout/navbars/LoginNavbar.vue';
	import LoginForm from '@/pages/login/components/LoginForm.vue';
	import LoginFooter from '@/pages/layout/footers/LoginFooter.vue';

	const uiStore = useUiStore();

	// 로그인 화면 공통 레이아웃 숨김처리
	onBeforeMount(() => {
		uiStore.toggleEveryDisplay();
		uiStore.toggleHideConfig();
	});

	onBeforeUnmount(() => {
		uiStore.toggleEveryDisplay();
		uiStore.toggleHideConfig();
	});

	const backgroundStyle = {
		backgroundImage: 'linear-gradient(to right, #434343, #000000)', // 그레이 to 블랙
		backgroundSize: 'cover',
	};
</script>

<template>
	<LoginNavbar />

	<div class="page-header align-items-start min-vh-100" :style="backgroundStyle">
		<span class="mask bg-gradient-dark opacity-6"></span>
		<div class="container my-auto">
			<div class="row">
				<div class="col-lg-4 col-md-8 col-12 mx-auto">
					<div class="card z-index-0 fadeIn3 fadeInBottom">
						<div class="card-body text-center">
							<h1 class="text-success font-weight-bold mb-4">CPMS</h1>
							<LoginForm />
						</div>
					</div>
				</div>
			</div>
		</div>

		<LoginFooter />
	</div>
</template>
