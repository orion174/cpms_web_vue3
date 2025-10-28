<script setup lang="ts">
	import StatusNavbar from '@/pages/layout/navbars/StatusNavbar.vue';
	import SupportTable from '@/pages/support/list/components/SupportTable.vue';
</script>

<template>
	<div class="py-4 container-fluid">
		<div class="row">
			<StatusNavbar />
		</div>

		<div class="row">
			<div class="col-12">
				<div class="card my-4">
					<SupportTable />
				</div>
			</div>
		</div>
	</div>
</template>