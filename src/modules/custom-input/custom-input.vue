<template>
	<div class="custom-input">
		<label>{{ label }}</label>
		<input :type="type" v-model="value" />
	</div>
</template>

<script>
	export default {
	  props: ['label', 'type', 'value']
	}
</script>

<style lang="sass">
	.custom-input
		border: 1px solid #ebebeb
		border-radius: 8px
		input
			border: none
		label
			padding: 10px
			background: #fff
</style>
