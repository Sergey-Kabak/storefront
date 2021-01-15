<template>
  <div>
    <div id="map"></div>
    <template v-if="!!this.google && !!this.map">
      <slot
        :google="google"
        :map="map"
        :InfoWindow="InfoWindow"
      />
    </template>
  </div>
</template>

<script>
import GoogleMapsApiLoader from 'google-maps-api-loader'
import config from 'config'

export default {
  props:{
    mapConfig: Object,
    markers: Array
  },
  data(){
    return {
      google: null,
      map: null,
      InfoWindow: null
    }
  },
  beforeMount() {
    this.$bus.$on('fit-bounds', this.fitBounds)
    this.$bus.$on('close-info-window', this.closeInfoWindow)
  },
  beforeDestroy() {
    this.$bus.$off('fit-bounds', this.fitBounds)
    this.$bus.$off('close-info-window', this.closeInfoWindow)
  },
  mounted () {
    GoogleMapsApiLoader({
      apiKey: config.googleApiKey
    }).then((google) => {
      this.google = google
      this.initializeMap()
      this.initInfoWinfow()
      this.fitBounds()
    })
  },
  methods: {
    initializeMap() {
      const mapContainer = this.$el.querySelector('#map')
      const { Map } = this.google.maps
      this.map = new Map(mapContainer, this.mapConfig)
    },
    fitBounds() {
      if (this.markers && this.markers.length) {
        const bounds = new this.google.maps.LatLngBounds();
        this.markers.forEach(it => bounds.extend({ lat: +it.latitude, lng: +it.longitude }))
        this.map.fitBounds(bounds)
      }
    },
    initInfoWinfow() {
      this.InfoWindow = new this.google.maps.InfoWindow()
    },
    closeInfoWindow() {
      this.InfoWindow.close()
    }
  }
}
</script>

<style scoped>
#map {
  height: 520px;
  width: 100%;
}

@media (max-width: 768px) {
  #map {
    height: 420px;
  }
}
</style>