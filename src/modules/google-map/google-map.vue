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
        :icon="{url: cUrl(m)}"
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
      marker: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAhCAYAAAAoNdCeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAoZJREFUeNq8lj9I3FAcx18irYhXCYgcBRFacZWzmw5yDlKwS65LF2k5HCx1UBFc2sEDXQRBB8FFrODQTneLXW4wONStBscW6gliPQp6aET8U9PfN753xNzFu1wSf/B4yV3y+7zf7/3ye1+JVWGmaSo0xWnEyvyt09AkSSpU8iNVgAAwSkPF/dWfPLs+zBf/lyMRVt/xXNxmaCwQVPME45GkEQ0AR8tr7Hx7x4I5DcBIbzdretXPGro6BTRZLlKpDAip2rgxzpS/80vs5FuWVWuR3h4W/TRBC2gEqI+AuitMgC5+/Vb2RybZjWEwr4ZIWxdnkd4SoORI3a4fkAvwmUipbHtmhfbENwiG92/9nCGAleIibFWn5mfmfIPswPz0HC5V7r8Y2Siq7fzHDgvSjM3vVhXzz4fJfK/UwtcMC8NO1rMiOkUWXQGrCMOMzS1xGQcszkMNxbB3VOG4jMmiDYVpougs2HXIsDul/7ij/cFghbonjQ8G09Ct0WJCAZBffhroMm+UORwTYZjNryY6SAbnURjG/X5GMxawBYTa8KIzUNCjp1GRwtViNRI1B3rz0GCgMBykXJ9oziMmFWR08MOjSt35zmzRzUc/TviuTLwPP3yvtBKYiI7ynGsZG/YFw3aQH5zO4yUdxBYdHkg2DfQzjNpKvYcpbyzll3AqLLlEbt2GnWoZe08awlsbw/O8KFLl9KN0j0BNk4ZQd1+/q0oqYJ/aVheRvgyBEq6N2MWSpP90qKRKBSPUFIHQjZK1ym+F68iYm+qyyTad68RCTbBKQC+gqg1AGtuXB4fm3tsP5s/ul9aMe/zOFxScceDGv1PDPP6SNjGjiAIHOaBTgGL2+u5/AQYABv46QVSV82wAAAAASUVORK5CYII=',
      checkedMarker: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAhCAYAAAAoNdCeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAmdJREFUeNq8ljFM20AUhs8eShkquaILmUgXpKKqltoJlkRiBGQkmMELY1MmxtZjp5CpEkuSoRMDFqxI8UC2VlggkLo07tJOLVY7AF3c95s7dHHiJo7tPOl0tnN+n9+7l3e/woawIAg0mko09D4/uzQcRVH8QX6UARAAKjQM3Ht/rsIhTJuYZPrUtLi1adQI6iSC8UgOEA2cW5+OmfP9axdIBhozz9jG7EtWKjwVULNfpEofEFLV8v/eaNvtI9b48pkNa0ZxjtXL60x78BCgMgHdWJgAuT9/aOXDPebfXrOkhkhbK1tIbw9QiaSukwYUAyyKlKrSmjrtSWoQDO+Hfmgr4Fc8V6WqM8zWfmqQDIQ/+OX+7yOroNowsjS7cyF8VkIY3yujdt5meVjzrpoRnaaKroCvyMNs71JclgArZZ2+6N5RheNSV0UbytNE0YWwbznDukr/xZPC2GA+9bKxwRx0a7SYPAx++WngqrxRejgm8jDJryM6iI3zKA/jfhtoxgJWQ6g83Mxs5tFj4bN5X41E9UB/+2oxUxgOUq5PnOgRY2UZneTL6vqfSdHthsd6ysrE+zyqhiyA1Mg6i/LsVeeXUsGwHeQHp/N2TweRosMCc5MqaHPE6oToefN8AZerUYWl9situ7Ct6sIy0xO2Mazn6bP66UflPwL1gDSEUfz4fiipgH06XXuN9NkEWo1txDFmUs90oZIGFYxQUwRCNzJHld8a15F6nOqSZJvLdaI/EmwQMAloaAOQxmnn969A368F7MNOOOMez/kHZWcc2Lq6vQ6qZycBZhRR5qAI9B2gmJO++0+AAQBgCzscXjEeUAAAAABJRU5ErkJggg==',
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
      filterLength: 0
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
      return (this.getChecked || this.shippingDetails.id) === drp.id ? this.checkedMarker : (drp.missing && drp.missing.length) ? this.notAllMarker : this.checkedMarker
    },
    onClick (m, index) {
      this.$store.dispatch('shipping/updateChecked', m.id)
      this.toggleInfoWindow(m, index)
      this.hideProducts
        ? this.toFavorite(m)
        : (this.isProduct ? this.openPopup(m) : this.toCheckout(m))
    },
    toggleInfoWindow (marker, idx) {
      this.zoom = 17
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
