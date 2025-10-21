<script setup lang="ts">
	import StatusNavbar from '@/pages/layout/navbars/StatusNavbar.vue';
	import MaterialInput from "@/components/MaterialInput.vue";
	import MaterialButton from '@/components/MaterialButton.vue';
	import MaterialPagination from '@/components/MaterialPagination.vue';
	import MaterialPaginationItem from '@/components/MaterialPaginationItem.vue';

	import CompanySelect from '@/components/SelectModule/CompanySelect.vue';
	import { ref } from 'vue';

	// v-model로 연결할 반응형 변수 (선택한 회사 ID)
	const selectedCompany = ref(0);

	// 검색 조건으로 사용할 회사 ID (없으면 0)
	const searchCompanyId = ref(0);
</script>

<template>

	<div class="py-4 container-fluid">
		<div class="row">
			<!-- 상단 통계 바 -->
			<StatusNavbar />
		</div>

		<div class="row">
			<div class="col-12">
				<div class="card my-4">
					<div class="card-header pb-0">
						<div class="d-flex justify-content-between flex-wrap align-items-end gap-3">
							<div class="d-flex flex-wrap align-items-center gap-3">
								<CompanySelect
									v-model="selectedCompany"
									:companyId="searchCompanyId"
									className="my-custom-select"
									initText="-- 전체 회사 --"
									style="width: 100px"
								/>

								<select class="my-custom-select" style="width: 100px">
									<option>옵션2</option>
								</select>
								<select class="my-custom-select" style="width: 100px">
									<option>옵션3</option>
								</select>

								<div style="width: 200px">
									<MaterialInput id="" label="" type="date" />
								</div>
								<div style="width: 200px">
									<MaterialInput id="title" label="제목" type="text" />
								</div>
								<MaterialButton
									type="button"
									variant="contained"
									color="success"
									size="sm"
								>
									검 색
								</MaterialButton>
								<MaterialButton
									type="button"
									variant="outline"
									color="success"
									size="sm"
								>
									초기화
								</MaterialButton>
							</div>
							<div>
								<MaterialButton
									type="button"
									class="bg-gradient-info"
									variant="contained"
								>
									<i class="fas fa-plus me-2"></i>
									등록
								</MaterialButton>
							</div>
						</div>
					</div>
					<div class="card-body px-0 pb-2">
						<div class="table-responsive p-0">
							<table class="table align-items-center mb-0">
								<thead>
									<tr>
										<th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">
											No
										</th>
										<th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">
											Author
										</th>
										<th
											class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
										>
											Function
										</th>
										<th
											class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
										>
											Status
										</th>
										<th
											class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7"
										>
											Employed
										</th>
									</tr>
								</thead>
								<tbody>
								<tr>
									<td>
										<p class="text-xs font-weight-bold mb-0">1</p>
									</td>
									<td>
										<div class="d-flex px-2 py-1">
											<div class="d-flex flex-column justify-content-center">
												<h6 class="mb-0 text-sm">John Michael</h6>
												<p class="text-xs text-secondary mb-0">john@creative-tim.com</p>
											</div>
										</div>
									</td>
									<td>
										<p class="text-xs font-weight-bold mb-0">Manager</p>
										<p class="text-xs text-secondary mb-0">Organization</p>
									</td>
									<td class="align-middle text-center text-sm">
										<span class="badge badge-sm bg-gradient-success">Online</span>
									</td>
									<td class="align-middle text-center">
										<span class="text-secondary text-xs font-weight-bold">23/04/18</span>
									</td>
								</tr>
								<tr>
									<td>
										<p class="text-xs font-weight-bold mb-0">1</p>
									</td>
									<td>
										<div class="d-flex px-2 py-1">
											<div class="d-flex flex-column justify-content-center">
												<h6 class="mb-0 text-sm">Alexa Liras</h6>
												<p class="text-xs text-secondary mb-0">alexa@creative-tim.com</p>
											</div>
										</div>
									</td>
									<td>
										<p class="text-xs font-weight-bold mb-0">Programator</p>
										<p class="text-xs text-secondary mb-0">Developer</p>
									</td>
									<td class="align-middle text-center text-sm">
										<span class="badge badge-sm bg-gradient-secondary">Offline</span>
									</td>
									<td class="align-middle text-center">
										<span class="text-secondary text-xs font-weight-bold">11/01/19</span>
									</td>
								</tr>
								<tr>
									<td>
										<p class="text-xs font-weight-bold mb-0">1</p>
									</td>
									<td>
										<div class="d-flex px-2 py-1">
											<div class="d-flex flex-column justify-content-center">
												<h6 class="mb-0 text-sm">Laurent Perrier</h6>
												<p class="text-xs text-secondary mb-0">laurent@creative-tim.com</p>
											</div>
										</div>
									</td>
									<td>
										<p class="text-xs font-weight-bold mb-0">Executive</p>
										<p class="text-xs text-secondary mb-0">Projects</p>
									</td>
									<td class="align-middle text-center text-sm">
										<span class="badge badge-sm bg-gradient-success">Online</span>
									</td>
									<td class="align-middle text-center">
										<span class="text-secondary text-xs font-weight-bold">19/09/17</span>
									</td>
								</tr>
								<tr>
									<td>
										<p class="text-xs font-weight-bold mb-0">1</p>
									</td>
									<td>
										<div class="d-flex px-2 py-1">
											<div class="d-flex flex-column justify-content-center">
												<h6 class="mb-0 text-sm">Michael Levi</h6>
												<p class="text-xs text-secondary mb-0">michael@creative-tim.com</p>
											</div>
										</div>
									</td>
									<td>
										<p class="text-xs font-weight-bold mb-0">Programator</p>
										<p class="text-xs text-secondary mb-0">Developer</p>
									</td>
									<td class="align-middle text-center text-sm">
										<span class="badge badge-sm bg-gradient-success">Online</span>
									</td>
									<td class="align-middle text-center">
										<span class="text-secondary text-xs font-weight-bold">24/12/08</span>
									</td>
								</tr>
								<tr>
									<td>
										<p class="text-xs font-weight-bold mb-0">1</p>
									</td>
									<td>
										<div class="d-flex px-2 py-1">
											<div class="d-flex flex-column justify-content-center">
												<h6 class="mb-0 text-sm">Richard Gran</h6>
												<p class="text-xs text-secondary mb-0">richard@creative-tim.com</p>
											</div>
										</div>
									</td>
									<td>
										<p class="text-xs font-weight-bold mb-0">Manager</p>
										<p class="text-xs text-secondary mb-0">Executive</p>
									</td>
									<td class="align-middle text-center text-sm">
										<span class="badge badge-sm bg-gradient-secondary">Offline</span>
									</td>
									<td class="align-middle text-center">
										<span class="text-secondary text-xs font-weight-bold">04/10/21</span>
									</td>
								</tr>
								<tr>
									<td>
										<p class="text-xs font-weight-bold mb-0">1</p>
									</td>
									<td>
										<div class="d-flex px-2 py-1">
											<div class="d-flex flex-column justify-content-center">
												<h6 class="mb-0 text-sm">Miriam Eric</h6>
												<p class="text-xs text-secondary mb-0">miriam@creative-tim.com</p>
											</div>
										</div>
									</td>
									<td>
										<p class="text-xs font-weight-bold mb-0">Programator</p>
										<p class="text-xs text-secondary mb-0">Developer</p>
									</td>
									<td class="align-middle text-center text-sm">
										<span class="badge badge-sm bg-gradient-secondary">Offline</span>
									</td>
									<td class="align-middle text-center">
										<span class="text-secondary text-xs font-weight-bold">14/09/20</span>
									</td>
								</tr>
								</tbody>
							</table>
						</div>
					</div>

					<div class="card-footer py-4">
						<div class="row align-items-center">
							<!-- 왼쪽: 총 건수 표시 -->
							<div class="col-md-6">
								<h6 class="mb-0">
									총 <span class="text-info">999</span> 건
								</h6>
							</div>
							<!-- 오른쪽: 페이징 -->
							<div class="col-md-6 d-flex justify-content-end">
								<material-pagination>
									<material-pagination-item prev />
									<material-pagination-item label="1" active />
									<material-pagination-item label="2" disabled />
									<material-pagination-item label="3" />
									<material-pagination-item next />
								</material-pagination>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>

	</div>
</template>