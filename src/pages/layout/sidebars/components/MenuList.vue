<script setup lang="ts">
	import { storeToRefs } from 'pinia';
	import { useUiStore } from '@/stores/useUiStore';

	import MenuCollapse from './MenuCollapse.vue';

	defineProps<{ cardBg?: string }>();

	const uiStore = useUiStore();
	const { isRTL, color } = storeToRefs(uiStore);

	const menuItems = [
		{ collapse: false, collapseRef: 'support', navText: 'Support', icon: 'dashboard' },
		{ collapse: false, collapseRef: 'setting', navText: 'Setting', icon: 'receipt_long' },
		{ collapse: false, collapseRef: 'myPage', navText: 'My Page', icon: 'person' },
	];
</script>

<template>
	<div class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100" id="sidenav-collapse-main">
		<ul class="navbar-nav">
			<MenuCollapse v-for="item in menuItems" :key="item.collapseRef" v-bind="item">
				<template #icon>
					<i class="material-icons-round opacity-10 fs-5">{{ item.icon }}</i>
				</template>
			</MenuCollapse>
		</ul>
	</div>
</template>