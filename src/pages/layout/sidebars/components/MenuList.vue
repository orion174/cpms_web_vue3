<script setup lang="ts">
	import { computed } from 'vue';
	import { useRouter } from 'vue-router';

	import MenuCollapse from './MenuCollapse.vue';

	defineProps<{
		cardBg?: string
	}>();

	const router = useRouter();

	const menuItems = computed(() => {
		return router.getRoutes()
			.filter(r => r.meta?.menu && typeof r.meta.menu === 'object')
			.map(r => ({
				to: r.path,
				icon: r.meta.menu?.icon ?? '',
				label: r.meta.menu?.label ?? '',
				parent: r.meta.menu?.parent ?? null
			}));
	});
</script>

<template>
	<div class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100" id="sidenav-collapse-main">
		<ul class="navbar-nav">
			<MenuCollapse
				v-for="item in menuItems"
				:key="item.to"
				:to="item.to"
				:nav-text="item.label"
			>
				<template #icon>
					<i class="material-icons-round opacity-10 fs-5">{{ item.icon }}</i>
				</template>
			</MenuCollapse>
		</ul>
	</div>
</template>