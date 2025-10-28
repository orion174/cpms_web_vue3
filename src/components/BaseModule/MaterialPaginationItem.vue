<template>
  <li
	  class="page-item"
	  :class="getClasses(active, disabled)"
	  @click="handleClick"
  >
    <a class="page-link" href="javascript:void(0);">
		<i v-if="prev" class="fa fa-angle-left"></i>
		<i v-if="next" class="fa fa-angle-right"></i>

		<span v-if="!prev && !next">{{ label }}</span>
    </a>
  </li>
</template>

<script setup lang="ts">
	const props = defineProps({
		label: { type: [String, Number], default: '' },
		active: { type: Boolean, default: false },
		disabled: { type: Boolean, default: false },
		prev: { type: Boolean, default: false },
		next: { type: Boolean, default: false },
	});

	const emit = defineEmits<{
		(e: 'click', value: string | number | 'prev' | 'next'): void
	}>();

	const handleClick = () => {
		if (props.disabled) return;

		// prev / next 구분해서 부모로 이벤트 발송
		if (props.prev) emit('click', 'prev');
		else if (props.next) emit('click', 'next');
		else emit('click', props.label);
	};

	const getClasses = (active: boolean, disabled: boolean) => {
		return [
			active ? 'active' : '',
			disabled ? 'disabled' : ''
		].join(' ')
	};
</script>
