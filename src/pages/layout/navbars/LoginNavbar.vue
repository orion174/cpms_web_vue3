<script setup>
	import { defineProps, useAttrs } from 'vue';

	defineProps({
		btnBackground: String,
		isBlur: String,
		darkMode: {
			type: Boolean,
			default: false,
		},
	});
</script>

<template>
	<nav class="top-0 navbar navbar-expand-lg position-absolute z-index-3"
		:class="isBlur || 'shadow-none my-2 navbar-transparent w-100'"
	>
		<div class="container px-0">
			<div class="collapse navbar-collapse" id="navigation">
				<ul class="navbar-nav ms-auto">
					<li class="nav-item">
						<router-link class="nav-link me-2" :to="{ name: 'SignUp' }">
							<i class="fas fa-user-circle opacity-6 me-1"
							   :class="isBlur ? 'text-dark' : 'text-white'"
							>
							</i>
							Sign Up
						</router-link>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>