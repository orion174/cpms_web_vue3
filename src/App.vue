<script setup lang="ts">
	import { onBeforeMount } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useUiStore } from '@/stores/useUiStore';

	import Header from '@/pages/layout/headers/Header.vue';
	import Sidebar from '@/pages/layout/sidebars/Sidebar.vue';
	import Configurator from '@/examples/Configurator.vue';
	import Footer from '@/pages/layout/footers/Footer.vue';

	const uiStore = useUiStore();

	const {
		isRTL,
		color,
		isAbsolute,
		isNavFixed,
		navbarFixed,
		absolute,
		showSidenav,
		showNavbar,
		showFooter,
		showConfig,
		hideConfigButton,
	} = storeToRefs(uiStore);

	onBeforeMount(() => {
		const sidenav = document.getElementsByClassName('g-sidenav-show')[0];

		if (window.innerWidth > 1200 && sidenav) {
			sidenav.classList.add('g-sidenav-pinned');
		}
	});
</script>

<template>
	<!-- 왼쪽 사이드 메뉴 바-->
	<Sidebar
		v-if="showSidenav"
		:custom_class="color"
		:class="[isRTL ? 'fixed-end' : 'fixed-start']"
	/>

	<main class="main-content position-relative max-height-vh-100 h-100 overflow-x-hidden">
		<Header
			:class="[isNavFixed ? navbarFixed : '', isAbsolute ? absolute : '']"
			:color="isAbsolute ? 'text-white opacity-8' : ''"
			:minNav="uiStore.navbarMinimize"
			v-if="showNavbar"
		/>

		<router-view />

		<Footer v-show="showFooter" />

		<configurator
			:toggle="uiStore.toggleConfigurator"
			:class="[showConfig ? 'show' : '', hideConfigButton ? 'd-none' : '']"
		/>
	</main>
</template>
