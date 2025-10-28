<script setup lang="ts">
	import { defineProps, defineEmits } from 'vue';
	import type { SupportList } from '@/types/support/types';

	const props = defineProps<{
		list: SupportList[];
		total: number;
	}>();

	const emit = defineEmits<{
		(e: 'rowClick', supportRequestId: number): void
	}>();

	// 요청/상태 색상 맵핑
	const requestCdColors: Record<number, string> = {
		1: 'info',
		2: 'danger'
	};

	const statusColors: Record<number, string> = {
		3: 'warning',
		4: 'info',
		5: 'primary',
		6: 'danger',
		7: 'success',
		8: 'secondary'
	};

	const renderDeadline = (requestDate: string) => {
		if (!requestDate) return { text: '', color: '' };

		const today = new Date();
		today.setHours(0, 0, 0, 0);

		const targetDate = new Date(requestDate);
		targetDate.setHours(0, 0, 0, 0);

		const diffDays = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

		if (diffDays === 0) return { text: '기한 당일', color: 'green' };
		if (diffDays < 0) return { text: `${Math.abs(diffDays)}일 초과`, color: 'red' };

		return { text: requestDate, color: 'green' };
	};
</script>

<template>
	<template v-if="list.length > 0">
		<tr
			v-for="row in list"
			:key="row.supportRequestId"
			@click="() => emit('rowClick', row.supportRequestId)"
			style="cursor: pointer;"
		>
			<td class="text-center align-middle">
				{{ total - (list.indexOf(row)) }}
			</td>
			<td class="text-center align-middle">
				<span
					:class="['badge', 'px-3', 'py-2', 'fw-bold', 'pill', 'custom-badge-status', `bg-${requestCdColors[row.requestCd] ?? 'secondary'}`]"
					style="font-size: 0.6rem;"
				>
				  {{ row.requestNm }}
				</span>
			</td>
			<td class="my-input-text-tbody">{{ row.userCompanyNm }}</td>
			<td class="my-input-text-tbody">{{ row.requestProjectNm }}</td>
			<td class="my-input-text-tbody">{{ row.supportTitle }}</td>
			<td class="my-input-text-tbody">{{ row.responseUserNm ?? '미지정' }}</td>
			<td class="my-input-text-tbody">{{ row.regDt }}</td>
			<td class="my-input-text-tbody">
			  <span :style="{ color: renderDeadline(row.requestDate).color, fontWeight: 'bold' }">
				{{ renderDeadline(row.requestDate).text }}
			  </span>
			</td>
			<td class="text-center align-middle">
			  <span
				  :class="['badge', 'px-3', 'py-2', 'fw-bold', 'custom-badge-request', `bg-${statusColors[row.statusCd] ?? 'secondary'}`]"
				  style="font-size: 0.6rem;"
			  >
			  	{{ row.statusNm }}
			  </span>
			</td>
		</tr>
		<!-- 빈 행 채우기 (10줄 유지) -->
		<tr v-for="n in Math.max(0, 10 - list.length)" :key="'empty-' + n">
			<td colspan="8" style="height: 48px;"></td>
		</tr>
	</template>
	
	<tr v-else>
		<td colspan="9" class="text-center align-middle">
			<h4 class="text-muted">표시할 항목이 없습니다.</h4>
		</td>
	</tr>
</template>
