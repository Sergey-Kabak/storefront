<template></template>
<script>
import Vue from 'vue'

export default {
  props: {
    google: Object,
    map: Object,
    activeMarker: Object,
    InfoWindow: Object,
    infoWindowComponent: Object
  },
  mounted() {
    if (this.activeMarker) {
      const info = Vue.extend(this.infoWindowComponent)
      this.InfoWindow.setOptions({
        content: '<div id="info-window"></div>',
        position: { lat: +this.activeMarker.latitude, lng: +this.activeMarker.longitude },
        pixelOffset: {
          width: 0,
          height: -35
        }
      })
      this.InfoWindow.open(this.map)
      this.$nextTick(() => {
        const instance = new info({ store: this.$store, propsData: { marker: this.activeMarker }}).$mount('#info-window')
        instance.$on('close-popup', () => this.InfoWindow.close())
      })
    }
  }
}
</script>
