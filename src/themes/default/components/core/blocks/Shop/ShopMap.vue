<template>
  <div class="map">
    <map-loader :mapConfig="mapConfig" :markers="shops">
      <template slot-scope="scopeProps">
        <div>
          <child-marker
            v-for="marker in filteredShops"
            :key="marker.source_code"
            :position="{ lat: +marker.latitude, lng: +marker.longitude }" 
            :google="scopeProps.google"
            :item="marker"
            :map="scopeProps.map"
            :icons="icons"
            @onSelectMarker="selectMarker($event)"
            :activeMarker="selectedMarker"
            id="source_code"
          />
        </div>
        <div>
          <info-window
            v-if="selectedMarker"
            :key="selectedMarker.source_code"
            :google="scopeProps.google"
            :map="scopeProps.map"
            :InfoWindow="scopeProps.InfoWindow"
            :infoWindowComponent="ShopInfoWindow"
            :activeMarker="selectedMarker"
          />
        </div>
      </template>
    </map-loader>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import ShopInfoWindow from 'theme/components/core/blocks/Shop/ShopInfoWindow.vue'
import MapLoader from 'src/modules/map/MapLoader'
import ChildMarker from 'src/modules/map/ChildMarker'
import InfoWindow from 'src/modules/map/InfoWindow'

export default {
  components: {
    MapLoader,
    InfoWindow,
    ChildMarker
  },
  data: () => ({
    ShopInfoWindow,
    mapConfig: {
      maxZoom: 16
    },
    icons: {
      default: '/assets/google-map/default-pin.svg',
      active: '/assets/google-map/active-pin.svg'
    }
  }),
  computed: {
    ...mapState({
      shops: (state) => state.shop.shops
    }),
    filteredShops() {
      return this.shops.filter(it => it.street)
    },
    selectedMarker: {
      get() {
        return this.$store.state.shop.selectedShop
      },
      set(shop) {
        this.$store.commit('shop/SET_SELECTED_SHOP', shop)
      }
    }
  },
  methods: {
    selectMarker(shop) {
      this.$store.commit('shop/SET_SELECTED_SHOP', shop)
      this.scrollToActiveElement()
    },
    
    scrollToActiveElement() {
      if (this.selectedMarker) {
        this.$nextTick(() => {
          const activeLink = document.querySelector('.shop.active')
          if (activeLink) {
            activeLink.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
}

.shop-marker-info {
  max-width: 280px;
}

::v-deep {
  .gm-style .gm-style-iw-c {
    padding: 0!important;
    max-width: 280px!important;
    width: 100%!important;
    max-height: none!important;
  }

  .gm-style-iw-d {
    overflow: auto!important;
  }

  .gm-ui-hover-effect {
    display: none!important;
  }
}
</style>