<script setup lang="ts">
	import { tokenError } from '@/api/auth/cookie';

	defineProps<{
		show: boolean;
	}>();

	const logout = () => {
		tokenError();
	};
</script>

<template>
	<ul
		class="px-2 py-3 dropdown-menu dropdown-menu-end me-sm-n4"
		:class="showMenu ? 'show' : ''"
		aria-labelledby="dropdownMenuButton"
	>
		<li>
			<a class="dropdown-item border-radius-md" @click="logout">로그아웃</a>
		</li>
	</ul>
</template>