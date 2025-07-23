\<script setup lang="ts">
	import { storeToRefs } from 'pinia';
	import { useUiStore } from '@/stores/useUiStore';

	import MenuList from '@/pages/layout/sidebars/components/MenuList.vue';

	import logo from '@/assets/img/logo-ct.png';
	import logoDark from '@/assets/img/logo-ct-dark.png';

	const uiStore = useUiStore();
	const { isRTL, sidebarType, isDarkMode } = storeToRefs(uiStore);
</script>

<template>
	<aside
		id="sidenav-main"
		class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 ms-3"
		:class="`${isRTL ? 'me-3 rotate-caret fixed-end' : 'fixed-start ms-3'} ${sidebarType}`"
	>
		<div class="sidenav-header">
			<i
				class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
				aria-hidden="true"
				id="iconSidenav"
			></i>
			<!-- 사이드바 로고 영역 -->
			<a class="m-0 navbar-brand" href="/support">
				<img
					:src="
						sidebarType === 'bg-white' || (sidebarType === 'bg-transparent' && !isDarkMode)
							? logoDark
							: logo
					"
					class="navbar-brand-img h-100"
					alt="main_logo"
				/>
				<span class="ms-2 font-weight-bold text-white">TEMP LOGO AREA</span>
			</a>
		</div>

		<hr class="horizontal light mt-0 mb-2" />

		<MenuList />

	</aside>
</template>