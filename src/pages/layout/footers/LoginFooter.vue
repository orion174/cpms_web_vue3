<script setup lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<template>
	<footer class="footer position-absolute bottom-2 py-2 w-100">
		<div class="container">
			<div class="row align-items-center justify-content-lg-between">
				<div class="col-12 col-md-6 my-auto">
					<div class="copyright text-center text-sm text-white text-lg-start">
						{{ currentYear }}
						JPA, Vue3 Project
					</div>
				</div>
				<div class="col-12 col-md-6">
					<ul class="nav nav-footer justify-content-center justify-content-lg-end">
						<li class="nav-item">
							<a href="https://github.com/orion174" class="nav-link text-white" target="_blank">
								<i class="fab fa-github text-white text-lg"></i>
								Git Hub
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</footer>
</template>