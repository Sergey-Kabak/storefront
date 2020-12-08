<template></template>
<script>
export default {
  props: {
    google: Object,
    map: Object,
    position: Object,
    item: Object,
    icons: Object,
    activeMarker: Object,
    id: String
  },
  data: () => ({
    marker: null,
    active: false
  }),
  watch: {
    activeMarker: {
      handler(value) {
        if (value && value[this.id] === this.item[this.id]) {
          this.marker.setIcon(this.icons.active)
          this.active = true
        } else if (this.active === true){
          this.marker.setIcon(this.icons.default)
          this.active = false
        }
      },
      deep: true
    }
  },
  mounted() {
    const { Marker } = this.google.maps
    this.marker = new Marker({
      position: this.position,
      map: this.map,
      icon: this.icons.default
    })
    this.marker.addListener('click', () => {
      this.$emit('onSelectMarker', this.item)
    })
  },
  beforeDestroy() {
    this.marker.setMap(null)
  }
}
</script>
