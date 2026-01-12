<script setup lang="ts">
	import MaterialButton from '@/components/BaseModule/MaterialButton.vue';
	import { useRouter } from 'vue-router';

	// 라우터 인스턴스 가져오기
	const router = useRouter();

	// 등록 버튼 클릭 시, 이동
	const goToInsertPage = () => {
		router.push({ path: '/support/insert' });
	};
</script>

<template>
	<div>
		<MaterialButton
			type="button"
			class="bg-gradient-info"
			variant="contained"
			@click="goToInsertPage"
		>
			<i class="fas fa-plus me-2"></i>등록
		</MaterialButton>
	</div>
</template>

