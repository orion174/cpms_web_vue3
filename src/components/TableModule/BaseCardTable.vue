<template>
	<div class="card-body px-0 pb-2">
		<div class="table-responsive p-0">
			<table class="table align-items-center mb-0">
				<thead>
					<slot name="header">

					</slot>
				</thead>
				<tbody>
					<slot name="body">

					</slot>
				</tbody>
			</table>
		</div>
	</div>
</template>