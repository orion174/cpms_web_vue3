<script setup lang="ts">
	import { computed, defineProps, defineEmits, watch } from 'vue';

	interface Props {
		modelValue: number; // 현재 페이지 (v-model)
		totalCnt: number;
		pageSize?: number;
		maxButtons?: number;
	};

	const props = defineProps<Props>();

	const emit = defineEmits<{
		(e: 'update:modelValue', pageNo: number): void
	}>();

	const pageSize = props.pageSize ?? 10;
	const maxButtons = props.maxButtons ?? 5;

	// 계산 속성: 전체 페이지 수
	const totalPages = computed(() => Math.ceil(props.totalCnt / pageSize));

	// 렌더링 여부
	const showPagination = computed(() => totalPages.value > 1);

	//  현재 페이지
	const currentPage = computed({
		get: () => props.modelValue,
		set: (val: number) => emit('update:modelValue', val)
	});

	// 페이지 슬라이딩 범위 계산
	const pageList = computed(() => {
		const half = Math.floor(maxButtons / 2);
		let start = Math.max(currentPage.value - half, 1);
		let end = start + maxButtons - 1;

		if (end > totalPages.value) {
			end = totalPages.value;
			start = Math.max(end - maxButtons + 1, 1);
		}

		const list = [];
		for (let i = start; i <= end; i++) list.push(i);
		return list;
	});

	// 이벤트
	const goPage = (page: number) => {
		if (page !== currentPage.value) currentPage.value = page;
	};

	const goPrev = () => {
		if (currentPage.value > 1) currentPage.value--;
	};

	const goNext = () => {
		if (currentPage.value < totalPages.value) currentPage.value++;
	};
</script>

<template>
	<div class="card-footer py-4">
		<div class="row align-items-center">
			<!-- 전체 건수 -->
			<div class="col-md-6">
				<h6 class="mb-0">
					총 <span class="text-info">{{ totalCnt }}</span> 건
				</h6>
			</div>

			<!-- 페이지 네비게이션 -->
			<div class="col-md-6 d-flex justify-content-end">
				<ul v-if="showPagination" class="pagination">
					<!-- Prev 버튼 -->
					<li
						class="page-item"
						:class="{ disabled: currentPage === 1 }"
						@click="goPrev"
					>
						<a class="page-link" href="javascript:;">
							<i class="fa fa-angle-left"></i>
						</a>
					</li>

					<!-- 페이지 번호 슬라이딩 -->
					<li
						v-for="page in pageList"
						:key="page"
						class="page-item"
						:class="{ active: currentPage === page }"
						@click="goPage(page)"
					>
						<a class="page-link" href="javascript:;">{{ page }}</a>
					</li>

					<!-- Next 버튼 -->
					<li
						class="page-item"
						:class="{ disabled: currentPage === totalPages }"
						@click="goNext"
					>
						<a class="page-link" href="javascript:;">
							<i class="fa fa-angle-right"></i>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

