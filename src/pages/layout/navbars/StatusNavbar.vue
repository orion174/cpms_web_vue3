<script setup lang="ts">
	import StatisticsCard from '@/components/StatisticsCard.vue';
</script>

<template>
	<div class="col-lg-12 position-relative z-index-2">
		<div class="row">
			<div class="col-lg-3 col-md-6 col-sm-6">
				<statistics-card
					:title="{ text: 'Today\'s', value: '0' }"
					detail="
						<span class='text-success text-sm font-weight-bolder'>+0%</span> than last week
					"
					:icon="{
						name: 'person_add',
						color: 'text-white',
						background: 'dark',
					}"
				/>
			</div>
			<div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
				<statistics-card
					:title="{ text: 'Today\'s', value: '0' }"
					detail="
						<span class='text-success text-sm font-weight-bolder'>+0%</span> than last month
					"
					:icon="{
						name: 'leaderboard',
						color: 'text-white',
						background: 'primary',
					}"
				/>
			</div>
			<div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
				<statistics-card
					:title="{ text: 'Today\'s', value: '0' }"
					detail="
						<span class='text-danger text-sm font-weight-bolder'>-0%</span> than yesterday
					"
					:icon="{
						name: 'person',
						color: 'text-white',
						background: 'success',
					}"
				/>
			</div>
			<div class="col-lg-3 col-md-6 col-sm-6 mt-lg-0 mt-4">
				<statistics-card
					:title="{ text: 'Today\'s', value: '0' }"
					detail="
						<span class='text-success text-sm font-weight-bolder'>+0%</span> Just updated
					"
					:icon="{
						name: 'done',
						color: 'text-white',
						background: 'info',
					}"
				/>
			</div>
		</div>
	</div>
</template>
