<template>
	<div class="location-list">
		<mobile-location v-for="(location, index) in locations" :key="index" :location="location" />
	</div>
</template>

<script>
  import MobileLocation from 'src/modules/locations/mobile-location'
  export default {
    components: {MobileLocation},
    props: ['locations']
  }
</script>

<style lang="sass">

</style>
