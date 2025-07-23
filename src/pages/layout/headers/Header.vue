<script setup>
	import { ref, computed } from 'vue';
	import { useRoute } from 'vue-router';
	import { useUiStore } from '@/stores/useUiStore';

	import MaterialInput from '@/components/MaterialInput.vue';
	import Breadcrumbs from './components/Breadcrumbs.vue';
	import DropdownMenu from './components/DropdownMenu.vue';

	const props = defineProps({
		color: String,
		minNav: Function,
	});

	const showMenu = ref(false);
	const route = useRoute();
	const uiStore = useUiStore();

	const toggleSidebar = () => {
		uiStore.navbarMinimize();
	};

	const isRTL = computed(() => uiStore.isRTL);
	const isAbsolute = computed(() => uiStore.isAbsolute);
	const currentRouteName = computed(() => route.name);
</script>

<template>
	<nav
		class="shadow-none navbar navbar-main navbar-expand-lg border-radius-xl"
		v-bind="$attrs"
		id="navbarBlur"
		data-scroll="true"
		:class="isAbsolute ? 'mt-4' : 'mt-0'"
	>
		<div class="px-3 py-1 container-fluid">
			<breadcrumbs :currentPage="currentRouteName" :color="color" />

			<div
				class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4"
				:class="isRTL ? 'px-0' : 'me-sm-4'"
				id="navbar"
			>
				<div class="pe-md-3 d-flex align-items-center" :class="isRTL ? 'me-md-auto' : 'ms-md-auto'">
					<!-- 템플릿 검색 창 -->
				</div>

				<ul class="navbar-nav justify-content-end">
					<li class="nav-item dropdown d-flex align-items-center" :class="isRTL ? 'ps-2' : 'pe-2'">
						<a
							href="#"
							class="p-0 nav-link lh-1"
							:class="[color ? color : 'text-body', showMenu ? 'show' : '']"
							id="dropdownMenuButton"
							data-bs-toggle="dropdown"
							aria-expanded="false"
							@click="showMenu = !showMenu"
						>
							<i class="material-icons cursor-pointer">account_circle</i>
						</a>

						<DropdownMenu />
					</li>
				</ul>

			</div>
		</div>
	</nav>
</template>