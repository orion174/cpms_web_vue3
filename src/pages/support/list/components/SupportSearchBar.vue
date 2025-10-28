<script setup lang="ts">
	import { reactive, ref, onMounted } from 'vue';

	import MaterialInput from '@/components/BaseModule/MaterialInput.vue';
	import MaterialButton from '@/components/BaseModule/MaterialButton.vue';
	import CmmnCodeSelect from '@/components/SelectModule/CmmnCodeSelect.vue';
	import CompanySelect from '@/components/SelectModule/CompanySelect.vue';
	import SupportAddButton from '@/pages/support/list/components/SupportAddButton.vue';

	import { getUserAuthType, handleEnter } from '@/utils/cmmn';
	import { ReqSupportListDTO, initParams } from "@/types/support/types";

	// 검색 이벤트 emit
	const emit = defineEmits<{
		(e: 'search', params: ReqSupportListDTO): void,
		(e: 'reset'): void
	}>();

	// 초기 검색값
	const searchParams = reactive({ ...initParams });

	// 검색 버튼은 내부 상태를 emit
	const onSearch = () => {
		emit('search', { ...searchParams });
	};

	// 초기화 버튼은  내부 상태를 초기화하고, 부모에게 reset 이벤트를 알린다.
	const onReset = () => {
		Object.assign(searchParams, { ...initParams });
		emit('reset'); // 부모에게 초기화가 필요하다고 알림 (검색을 다시 트리거)
	};

	// Enter 키 이벤트
	const onEnterSearch = handleEnter(onSearch);

	// 로그인 사용자 권한
	const authType = ref<string | null>(null);

	onMounted(async () => {
		authType.value = await getUserAuthType();
	});
</script>

<template>
	<div class="card-header pb-0">
		<div class="d-flex justify-content-between flex-wrap align-items-end gap-3">
			<div class="d-flex flex-wrap align-items-center gap-3">

				<CompanySelect
					v-if="authType === 'ADMIN'"
					v-model.number="searchParams.searchCompanyId"
					className="my-custom-select"
					initText="업체 선택"
				/>

				<CmmnCodeSelect
					v-model.number="searchParams.searchRequestCd"
					groupCode="10"
					className="my-custom-select"
					initText="요청 선택"
				/>

				<CmmnCodeSelect
					v-model.number="searchParams.searchStatusCd"
					groupCode="20"
					className="my-custom-select"
					initText="처리상태 선택"
				/>

				<div style="width: 200px">
					<MaterialInput
						v-model="searchParams.searchStartDt"
						id="date"
						label="등록일"
						type="date"
						@keydown="onEnterSearch"
					/>
				</div>

				<div style="width: 200px">
					<MaterialInput
						v-model="searchParams.searchTitle"
						id="title"
						label="제목"
						type="text"
						@keydown="onEnterSearch"
					/>
				</div>

				<MaterialButton
					@click="onSearch"
				>
					검색
				</MaterialButton>

				<MaterialButton
					@click="onReset"
					variant="outline"
				>
					초기화
				</MaterialButton>
			</div>

			<SupportAddButton />

		</div>
	</div>
</template>

