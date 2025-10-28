<script setup lang="ts">
	import { ref, reactive, onMounted, watch } from 'vue';

	import BaseCardTable from '@/components/TableModule/BaseCardTable.vue';
	import SupportTableHeader from '@/pages/support/list/components/SupportTableHeader.vue';
	import SupportTableBody from '@/pages/support/list/components/SupportTableBody.vue';
	import SupportSearchBar from '@/pages/support/list/components/SupportSearchBar.vue';
	import BaseCardPagination from '@/components/TableModule/BaseCardPagination.vue';

	import { fetchSupportListAPI } from '@/api/support/service';
	import { SupportList, ReqSupportListDTO, initParams } from "@/types/support/types";


	const loading = ref<boolean>(false);

	// 초기 검색값
	const searchParams = reactive({ ...initParams });

	const supportList = ref<SupportList[]>([]);
	const totalCnt = ref<number>(0);

	// 문의 목록 조회 API 호출
	const fetchSupportList = async() => {
		if (loading.value) return; // 중복호출 방지
		loading.value = true;

		try {
			const data
				= await fetchSupportListAPI({ ...searchParams });

			supportList.value = data.supportList;
			totalCnt.value = data.totalCnt;

		} catch(e: unknown) {
			console.error('fetchSupportListAPI Error' + e);

		} finally {
			loading.value = false;
		}
	};

	// 초기 로딩
	onMounted(() => {
		fetchSupportList();
	});

	// 검색 이벤트 핸들러
	const onSearch = (payload: ReqSupportListDTO) => {
		// 검색 조건만 업데이트 (페이지는 1로 초기화)
		Object.assign(searchParams, {
			...payload, // 자식 컴포넌트가 보낸 검색 조건
			pageNo: 1, // 검색 시 항상 1페이지
		});

		fetchSupportList();
	};

	// 검색 초기화
	const onReset = () => {
		Object.assign(searchParams, { ...initParams });
		fetchSupportList();
	};

	// 페이지 변경 시, fetch
	watch(() => searchParams.pageNo, () => fetchSupportList());
</script>

<template>

	<SupportSearchBar
		:loading="loading"
		@search="onSearch"
		@reset="onReset"
	/>

	<BaseCardTable>
		<template #header>
			<SupportTableHeader />
		</template>
		<template #body>
			<div v-if="loading">🔄 데이터 불러오는 중...</div>

			<SupportTableBody
				v-else
				:list="supportList"
				:total="totalCnt"
				@rowClick="id => console.log('row click', id)"
			/>
		</template>
	</BaseCardTable>

	<BaseCardPagination
		v-model="searchParams.pageNo"
		:totalCnt="totalCnt"
		:pageSize="searchParams.pageSize"
		:maxButtons="5"
	/>

</template>