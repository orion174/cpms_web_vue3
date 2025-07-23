<template>
	<li class="nav-item">
		<a
			class="nav-link text-white"
			data-bs-toggle="collapse"
			aria-expanded="false"
			:href="`#${refer}`"
			@click="isExpanded = !isExpanded"
		>
			<span class="sidenav-mini-icon">{{ miniIcon }}</span>
			<span class="sidenav-normal me-3 ms-2 ps-1">
				{{ text }}
				<b class="caret"></b>
			</span>
		</a>
		<div :class="isExpanded ? 'collapse show' : 'collapse'">
			<ul class="nav nav-sm flex-column">
				<slot name="nav-child-item" />
			</ul>
		</div>
	</li>
</template>

<script setup lang="ts">
	import { ref } from 'vue';

	const props = defineProps<{
		refer: string;
		miniIcon: string;
		text: string;
	}>();

	const isExpanded = ref(false);
</script>

<script lang="ts">
	export default {
		name: 'SidenavCollapseItem',
	};
</script>
