<script setup lang="ts">
	import { useRouter } from 'vue-router';
	import { openAlertModal } from '@/utils/modal';

	import MaterialButton from '@/components/BaseModule/MaterialButton.vue';

	const router = useRouter();

	const emit = defineEmits<{
		(e: "save"): void;
	}>();

	// 목록 이동
	const goToListPage = () => {
		openAlertModal({
			title: '알림',
			message: '목록으로 돌아가겠습니까?\n작성 중인 정보는 저장되지 않습니다.',
			isConfirm: true,
			onConfirm: (): void => {
				router.push('/support/list');
			},
		});
	};
</script>

<template>
	<MaterialButton
		type="button"
		color="info"
		variant="outline"
		class="me-2"
		@click="goToListPage"
	>
		목록
	</MaterialButton>

	<MaterialButton
		type="button"
		color="success"
		variant="fill"
		@click="emit('save')"
	>
		저장
	</MaterialButton>
</template>
