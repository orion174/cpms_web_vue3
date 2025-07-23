<template>
	<footer class="py-3 footer">
		<div class="container-fluid">
			<div class="row align-items-center justify-content-lg-between">
				<div class="mb-4 col-lg-6 mb-lg-0">
					<div
						class="text-sm text-center copyright text-muted"
						:class="isRTL ? 'text-lg-end' : 'text-lg-start'"
					>
						{{ currentYear }}
						JPA, Vue3 Project
					</div>
				</div>
				<div class="col-lg-6">
					<ul class="nav nav-footer justify-content-center justify-content-lg-end">
						<li class="nav-item">
							<a href="https://github.com/orion174" class="nav-link text-muted" target="_blank">
								<i class="fab fa-github text-dark text-lg"></i>
								Git Hub
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</footer>
</template>

<script setup>
	import { storeToRefs } from 'pinia';
	import { useUiStore } from '@/stores/useUiStore.ts';

	const uiStore = useUiStore();
	const { isRTL } = storeToRefs(uiStore);

	const currentYear = new Date().getFullYear();
</script>
