<template>
	<div class="location-list">
		<location v-for="(location, index) in locations" :key="index" :location="location" />
	</div>
</template>

<script>
	import Location from 'src/modules/locations/location'
	export default {
		components: {Location},
		props: ['locations']
	}
</script>

<style lang="sass">
	.location-list
		min-height: 382px
		max-height: 470px
		overflow-y: auto
</style>
