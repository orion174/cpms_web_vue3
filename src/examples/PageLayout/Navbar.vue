<template>
	<nav
		class="top-0 navbar navbar-expand-lg position-absolute z-index-3"
		:class="isBlur || 'shadow-none my-2 navbar-transparent w-100'"
	>
		<div class="container px-0">
			<router-link
				class="navbar-brand font-weight-bolder ms-lg-0 ms-3"
				to="/dashboard"
				v-bind="$attrs"
				:class="isBlur ? 'text-dark' : 'text-white'"
			>
				Material Dashboard 2
			</router-link>

			<button
				class="navbar-toggler shadow-none ms-2"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navigation"
				aria-controls="navigation"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon mt-2">
					<span class="navbar-toggler-bar bar1"></span>
					<span class="navbar-toggler-bar bar2"></span>
					<span class="navbar-toggler-bar bar3"></span>
				</span>
			</button>

			<div class="collapse navbar-collapse" id="navigation">
				<ul class="navbar-nav mx-auto">
					<li class="nav-item">
						<router-link class="nav-link d-flex align-items-center me-2 active" to="/dashboard">
							<i class="fa fa-chart-pie opacity-6 me-1" :class="isBlur ? 'text-dark' : 'text-white'"></i>
							Dashboard
						</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link me-2" to="/profile">
							<i class="fa fa-user opacity-6 me-1" :class="isBlur ? 'text-dark' : 'text-white'"></i>
							Profile
						</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link me-2" to="/sign-up">
							<i
								class="fas fa-user-circle opacity-6 me-1"
								:class="isBlur ? 'text-dark' : 'text-white'"
							></i>
							Sign Up
						</router-link>
					</li>
					<li class="nav-item">
						<router-link class="nav-link me-2" to="/sign-in">
							<i class="fas fa-key opacity-6 me-1" :class="isBlur ? 'text-dark' : 'text-white'"></i>
							Sign In
						</router-link>
					</li>
				</ul>

				<ul class="navbar-nav d-lg-block d-none">
					<li class="nav-item">
						<a
							href="https://www.creative-tim.com/product/vue-material-dashboard-2"
							class="btn btn-sm mb-0 me-1 bg-gradient-success"
						>
							Free download
						</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
	<!-- End Navbar -->
</template>

<script setup>
	import { defineProps, useAttrs } from 'vue';
	import downArrWhite from '@/assets/img/down-arrow-white.svg';
	import downArrBlack from '@/assets/img/down-arrow-dark.svg';

	defineProps({
		btnBackground: String,
		isBlur: String,
		darkMode: {
			type: Boolean,
			default: false,
		},
	});

	const $attrs = useAttrs();
</script>

<script>
	export default {
		name: 'Navbar',
	};
</script>
