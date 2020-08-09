<template>
  <div class="google-map">
    <gmap-map
      class="map-container"
      :lang="'ua'"
      :center="centered ? centered.position : center"
      :zoom="zoom"
      :key="mathRandom"
      v-if="(droppoints && droppoints.length) || (cDroppoints && cDroppoints.length)"
      :options="{streetViewControl:false, fullscreenControl: false}"
    >
      <gmap-marker
        v-for="(m, index) in droppoints"
        :key="index"
        :position="m.position"
        :clickable="true"
        :marker="m"
        :icon="{
          url: cUrl(m)
        }"
        @click="onClick(m,index)"
      />
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
        <info-popup
          :marker="infoContent"
          :checked="getChecked || shippingDetails.id || ''"
          :hide-products="hideProducts"
          @close="infoWinOpen=false"
        />
      </gmap-info-window>
    </gmap-map>

  </div>
</template>

<script>

import Vue from 'vue'
import { once } from '@vue-storefront/core/helpers'
import { required, minLength } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

import InfoPopup from '@vue-storefront/theme-default/components/theme/blocks/InfoPopup/InfoPopup'

// GoogleMaps cannot be included while in SSR
if (typeof window !== 'undefined') {
  const VueGoogleMaps = require('vue2-google-maps')
  once('__VUE_EXTEND_DROPPOINT__', () => {
    Vue.use(VueGoogleMaps, {
      load: {
        key: 'AIzaSyBNfA38HlGRbKD4vL5_Y8el1dp0o8NC3Tc',
        libraries: 'places',
        region: 'UA',
        language: 'ua'
      }
    })
  })
}

export default {
  name: 'GoogleMap',
  components: {InfoPopup},
  props: {
    droppoints: {
      type: Array,
      required: true
    },
    hideProducts: {
      type: Boolean,
      default: false,
      required: false
    },
    center: {
      type: Object,
      required: true
    },
    isProduct: {
      required: false,
      type: Boolean,
      default: false
    },
    stockId: {
      required: true
    }
  },
  data () {
    return {
      marker: 'data:image/svg+xml,%3Csvg width=\'31\' height=\'40\' viewBox=\'0 0 31 40\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M15.5 0C6.95333 0 0 6.88618 0 15.3504C0 18.937 1.2485 22.2399 3.33759 24.856L15.5 40L27.6624 24.856C29.7515 22.2399 31 18.937 31 15.3504C31 6.88618 24.0467 0 15.5 0Z\' fill=\'%231A1919\'/%3E%3Cpath fill-rule=\'evenodd\' clip-rule=\'evenodd\' d=\'M18.8847 10C17.1807 10 15.5729 10.5913 14.2827 11.6787V10.8315H11.5V25H14.2781V24.9939H14.2827V17.3639C14.3756 14.6387 16.3221 12.6082 18.8847 12.6082C19.3604 12.6082 19.8158 12.6783 20.2414 12.811C20.2493 12.813 20.2658 12.8185 20.2658 12.8185L21.5 10.4933C20.6783 10.1701 19.7953 10 18.8847 10Z\' fill=\'%2323BE20\'/%3E%3C/svg%3E%0A',
      checkedMarker: 'data:image/svg+xml,%3Csvg width=\'31\' height=\'40\' viewBox=\'0 0 31 40\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M15.5 0C6.95333 0 0 6.88618 0 15.3504C0 18.937 1.2485 22.2399 3.33759 24.856L15.5 40L27.6624 24.856C29.7515 22.2399 31 18.937 31 15.3504C31 6.88618 24.0467 0 15.5 0Z\' fill=\'%2323BE20\'/%3E%3Cpath fill-rule=\'evenodd\' clip-rule=\'evenodd\' d=\'M18.8847 10C17.1807 10 15.5729 10.5913 14.2827 11.6787V10.8315H11.5V25H14.2781V24.9939H14.2827V17.3639C14.3756 14.6387 16.3221 12.6082 18.8847 12.6082C19.3604 12.6082 19.8158 12.6783 20.2414 12.811C20.2493 12.813 20.2658 12.8185 20.2658 12.8185L21.5 10.4933C20.6783 10.1701 19.7953 10 18.8847 10Z\' fill=\'%23ffffff\'/%3E%3C/svg%3E',
      notAllMarker: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAiCAYAAACuoaIwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAmFJREFUeNq8lz1P21AUhl9HgqFShQdYWOiAhLpUSE3XKvkDTTK3QywmpoqFiQ6oW5eqU6cqMHQO9A8QsTAQhMWCkBjCwkKHtEgMdHDPez+IY6wkzrU50pWvEvt97jnnfpwLPKF5WV6OoqgiD1/aqvkplNb3PK+Ty2gIkNaOrN3/jaKbY93YH1jbDCa7Z/IhR/9VWgW/u8DVPnB9APy7HX7x2SKwUAaWasB8mb/Qyw3xNpwIJqCmAv258HH2BbjpThYGQl9tAnMrfQPcGQkzoBYuf0KBpjECl9+zF8SBXgJUl0cbJ58kbL/ckk0YoUBDgHvslGIgX3lEiCuIxshonZbRHsBUju6u/alDl2bUoqaeaBom5BfyaOL8++PZ5mLUoqZok2E9q8sI8glf0qipHahbWE2toaJMa9csTBbucXEwrV0pDcW3KGOKOEEe9rNJdwkHo2c91ZtbKR4mq1vDZp8/iWdQ3s2/KY6itUML62CxWhxMa3csbFfljGdT3kZdPR/2Fcwc6z28XM8ftvxBhZCM+Ea8jaV3+XpHLWoC34Z2fXPI9cwZlI9prZ49QEuJvwOVzIWyO4gaemIEyamPWO728PozMOOw7vgtNUQrXuaVUl4NJNZ9p3ASRI2YV6kwGQlfaqjE6uRmrz10+BpGC6M8s+HcViPMkj9CdEQ20qpkb0w13JKjp4nDNUgNOX7xvv3BfO0IKJiq1hfgqQBXRwIHoI6AquM24lFWFZFQiaUdQwNQqHLteosxdd/BIw+HQdXkhHC5zfjqpsKby9HHKOpu2VvMQxGauxlxa60s3/4XYADv+hKMdM2+mQAAAABJRU5ErkJggg==',
      infoContent: {},
      infoWindowPos: {
        lat: 50.448089,
        lng: 30.529123
      },
      infoWinOpen: false,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      shipping: {},
      zoom: 12,
      id: '',
      filteredDrp: [],
      filterLength: 0,
      selectedMarker: null
    }
  },
  beforeDestroy () {
    this.filteredDrp = null
    this.filterLength = 0
    this.$bus.$off('drp-after-filtered')
    this.$bus.$off('zoom')
  },
  computed: {
    ...mapGetters({
      getChecked: 'shipping/getChecked',
      shippingDetails: 'checkout/getShippingDetails'
    }),
    centered () {
      return this.cDroppoints.find(d => d.id === (this.id || this.getChecked)) || this.droppoints[0]
    },
    cDroppoints () {
      return this.droppoints
    },
    mathRandom () {
      return Math.random() * 1000000
    }
  },
  methods: {
    cUrl (drp) {
      return this.selectedMarker && this.selectedMarker.id === drp.id ? this.checkedMarker : (drp.missing && drp.missing.length) ? this.notAllMarker : this.marker
    },
    onClick (m, index) {
      this.$store.dispatch('shipping/updateChecked', m.id)
      this.toggleInfoWindow(m, index);
      this.selectedMarker = this.selectedMarker && this.selectedMarker.id === m.id ? null : m;
      this.hideProducts
        ? this.toFavorite(m)
        : (this.isProduct ? this.openPopup(m) : this.toCheckout(m))
    },
    toggleInfoWindow (marker, idx) {
      // this.zoom = 17
      this.infoWindowPos = marker.position
      this.infoContent = marker
      // check if its the same marker that was selected if yes toggle
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    },
    openPopup (val) {
      const shipping = {
        droppoint: val,
        shippingMethod: this.shippingMethod
      }

      this.$store.dispatch('checkout/saveShippingDetails', shipping)

      this.$bus.$emit('modal-show', 'modal-take-in-pharmacy')
    },
    selectDroppoint (m) {
      let nameArr = m.name.split(' ')
      let first = nameArr[0]
      let last = nameArr[1]

      if (!last || last.length === 0) {
        last = first
      }
      let country = (m.country === 'Україна') ? 'Ukraine' : m.country
      this.shipping = {
        id: m.id,
        company: m.id,
        firstName: first,
        lastName: last,
        country,
        streetAddress: m.streetname,
        apartmentNumber: m.streetname2,
        city: m.city,
        state: '',
        region_id: 0,
        zipCode: m.zipcode,
        phoneNumber: '',
        droppoint: m,
        shippingMethod: this.shippingMethod
      }
    },
    toCheckout (m) {
      this.selectDroppoint(m)
      this.$v.$touch()
      this.setShipping()
    },
    setShipping (invalidate = false) {
      if (!this.$v.$invalid && !invalidate) {
        this.$bus.$emit('checkout-after-shippingset', this.shipping)
      }
    },
    toFavorite (m) {
      this.selectDroppoint(m)
      this.$store.dispatch('checkout/saveShippingDetails', this.shipping)
    }
  },
  beforeMount () {
    this.$bus.$on('zoom', (id) => { this.id = id })
    this.$bus.$on('drp-after-filtered', ({filterLength, result}) => {
      this.filteredDrp = result;
      this.filterLength = filterLength
    })
    if (this.getChecked || this.shippingDetails.id || this.id) this.zoom = 17
  },
  watch: {
    getChecked () {
      this.zoom = 12
      this.$nextTick(() => {
        this.zoom = 17
      })
    },
    stockId (val, old) {
      if (val !== old) this.zoom = 12
    },
    id (val, old) {
      this.zoom = 12
      this.$nextTick(() => {
        this.zoom = 17
      })
    }
  },
  validations () {
    let val = {
      shipping: {
        phoneNumber: {
          required,
          minLength: minLength(8)
        },
        city: {
          required
        }
      }
    }
    if (this.extraFields) {
      val.shipping.extraFields = {}
      for (const [key, value] of Object.entries(this.extraFields)) {
        val.shipping.extraFields[key] = {}
        if (value.required) {
          val.shipping.extraFields[key] = {required}
        }
      }
    }
    return val
  }
}
</script>

<style lang="scss" scoped>
  @import '~bootstrap';

</style>

<style lang="scss">
  .map-container {
    background: #ebebeb;
    width: 100%;
    height: 470px;

    .gm-style img {
      cursor: pointer;
    }
  }
</style>
