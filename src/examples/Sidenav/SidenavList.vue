<template>
	<div class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100" id="sidenav-collapse-main">
		<ul class="navbar-nav">
			<sidenav-collapse v-for="item in menuItems" :key="item.collapseRef" v-bind="item">
				<template #icon>
					<i class="material-icons-round opacity-10 fs-5">{{ item.icon }}</i>
				</template>
			</sidenav-collapse>

			<li class="mt-3 nav-item">
				<h6 class="text-xs ps-4 text-uppercase font-weight-bolder text-white" :class="isRTL ? 'me-4' : 'ms-2'">
					ACCOUNT PAGES
				</h6>
			</li>

			<sidenav-collapse v-for="item in accountItems" :key="item.collapseRef" v-bind="item">
				<template #icon>
					<i class="material-icons-round opacity-10 fs-5">{{ item.icon }}</i>
				</template>
			</sidenav-collapse>
		</ul>

		<div class="sidenav-footer position-absolute w-100 bottom-0">
			<div class="mx-3">
				<a
					class="btn mt-4 w-100"
					:class="`bg-gradient-${color}`"
					href="https://www.creative-tim.com/product/vue-material-dashboard-2-pro"
				>
					Upgrade to pro
				</a>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { storeToRefs } from 'pinia';
	import { useUiStore } from '@/stores/useUiStore';
	import SidenavCollapse from './SidenavCollapse.vue';

	defineProps<{
		cardBg?: string;
	}>();

	const uiStore = useUiStore();
	const { isRTL, color } = storeToRefs(uiStore); // 반응형 상태 추출

	const menuItems = [
		{ collapse: false, collapseRef: 'dashboard', navText: 'Dashboard', icon: 'dashboard' },
		{ collapse: false, collapseRef: 'tables', navText: 'Tables', icon: 'table_view' },
		{ collapse: false, collapseRef: 'billing', navText: 'Billing', icon: 'receipt_long' },
		{ collapse: false, collapseRef: 'rtl-page', navText: 'Rtl', icon: 'format_textdirection_r_to_l' },
		{ collapse: false, collapseRef: 'notifications', navText: 'Notifications', icon: 'notifications' },
	];

	const accountItems = [
		{ collapse: false, collapseRef: 'profile', navText: 'Profile', icon: 'person' },
		{ collapse: false, collapseRef: 'sign-in', navText: 'SignIn', icon: 'login' },
		{ collapse: false, collapseRef: 'sign-up', navText: 'SignUp', icon: 'assignment' },
	];
</script>

<script lang="ts">
	export default {
		name: 'SidenavList',
	};
</script>
