<template>
	<div class="fixed-plugin">
		<a class="px-3 py-2 fixed-plugin-button text-dark position-fixed" @click="toggle">
			<i class="material-icons py-2">settings</i>
		</a>
		<div class="shadow-lg card">
			<!-- Card Header -->
			<div class="pt-3 pb-0 bg-transparent card-header">
				<div class="float-start">
					<h5 class="mt-3 mb-0">Material UI Configurator</h5>
					<p>See our dashboard options.</p>
				</div>
				<div class="mt-4 float-end" @click="toggle">
					<button class="p-0 btn btn-link text-dark fixed-plugin-close-button">
						<i class="material-icons">clear</i>
					</button>
				</div>
			</div>

			<hr class="my-1 horizontal dark" />

			<!-- Card Body -->
			<div class="pt-0 card-body pt-sm-3">
				<!-- Sidebar Colors -->
				<div>
					<h6 class="mb-0">Sidebar Colors</h6>
				</div>
				<a href="#" class="switch-trigger background-color">
					<div class="my-2 badge-colors" :class="isRTL ? 'text-end' : 'text-start'">
						<span
							v-for="color in colors"
							:key="color"
							class="badge filter"
							:class="`bg-gradient-${color}`"
							:data-color="color"
							@click="sidebarColor(color)"
						/>
					</div>
				</a>

				<!-- Sidenav Type -->
				<div class="mt-3">
					<h6 class="mb-0">Sidenav Type</h6>
					<p class="text-sm">Choose between 2 different sidenav types.</p>
				</div>
				<div class="d-flex">
					<button
						v-for="type in types"
						:key="type"
						:class="[
							'px-3 mb-2 btn bg-gradient-dark',
							type !== types[0] ? 'ms-2' : '',
							sidebarType === type.value ? 'active' : '',
						]"
						:id="type.id"
						@click="sidebar(type.value)"
					>
						{{ type.label }}
					</button>
				</div>
				<p class="text-sm d-xl-none d-block mt-2">You can change the sidenav type just on desktop view.</p>

				<!-- Light / Dark Mode -->
				<hr class="horizontal dark my-3" />
				<div class="mt-2 d-flex">
					<h6 class="mb-0">Light / Dark</h6>
					<div class="form-check form-switch ps-0 ms-auto my-auto">
						<input
							class="form-check-input mt-1 ms-auto"
							type="checkbox"
							:checked="isDarkMode"
							@click="toggleDarkMode"
						/>
					</div>
				</div>

				<hr class="horizontal dark my-sm-4" />

				<a
					class="btn btn-outline-dark w-100"
					href="https://www.creative-tim.com/learning-lab/vue/overview/material-dashboard/"
				>
					View documentation
				</a>

				<!-- Social Buttons -->
				<div class="text-center w-100">
					<h6 class="mt-3">Thank you for sharing!</h6>
					<a
						href="https://twitter.com/intent/tweet?text=Check%20Vue%20Material%20Dashboard%202%20made%20by%20%40CreativeTim%20%23webdesign%20%23dashboard%20%23vuejs3&amp;url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fvue-material-dashboard-2"
						class="mb-0 btn btn-dark me-2"
						target="_blank"
					>
						<i class="fab fa-twitter me-1" aria-hidden="true"></i>
						Tweet
					</a>
					<a
						href="https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/vue-material-dashboard-2"
						class="mb-0 btn btn-dark me-2"
						target="_blank"
					>
						<i class="fab fa-facebook-square me-1" aria-hidden="true"></i>
						Share
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { onMounted, computed } from 'vue';
	import { storeToRefs } from 'pinia';
	import { useUiStore } from '@/stores/useUiStore';
	import { activateDarkMode, deactivateDarkMode } from '@/assets/js/dark-mode';

	const props = defineProps({
		toggle: {
			type: Function,
			required: true,
		},
	});

	const uiStore = useUiStore();
	const { isRTL, sidebarType, isDarkMode } = storeToRefs(uiStore);

	const colors = ['primary', 'dark', 'info', 'success', 'warning', 'danger'];
	const types = [
		{ label: 'Dark', value: 'bg-gradient-dark', id: 'btn-dark' },
		{ label: 'Transparent', value: 'bg-transparent', id: 'btn-transparent' },
		{ label: 'White', value: 'bg-white', id: 'btn-white' },
	];

	function sidebarColor(color) {
		document.querySelector('#sidenav-main')?.setAttribute('data-color', color);
		uiStore.setColor(color);
	}

	function sidebar(type) {
		uiStore.sidebarType = type;
	}

	function toggleDarkMode() {
		if (uiStore.isDarkMode) {
			uiStore.isDarkMode = false;
			deactivateDarkMode();
		} else {
			uiStore.isDarkMode = true;
			activateDarkMode();
		}
	}

	function sidenavTypeOnResize() {
		const transparent = document.querySelector('#btn-transparent');
		const white = document.querySelector('#btn-white');
		if (!transparent || !white) return;

		if (window.innerWidth < 1200) {
			transparent.classList.add('disabled');
			white.classList.add('disabled');
		} else {
			transparent.classList.remove('disabled');
			white.classList.remove('disabled');
		}
	}

	onMounted(() => {
		window.addEventListener('resize', sidenavTypeOnResize);
		window.addEventListener('load', sidenavTypeOnResize);
	});
</script>
