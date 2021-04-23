<template>
  <div class="map">
    <map-loader :mapConfig="mapConfig" :markers="shops">
      <template slot-scope="scopeProps">
        <div>
          <child-marker
            v-for="marker in shops"
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
            @select="onSelectMarker($event)"
            @close="closePopup()"
          />
        </div>
      </template>
    </map-loader>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ShopInfoWindow from 'theme/components/core/blocks/Checkout/Shipping/ShopShipping/ShopInfoWindow'
import MapLoader from 'src/modules/map/MapLoader'
import ChildMarker from 'src/modules/map/ChildMarker'
import InfoWindow from 'src/modules/map/InfoWindow'

export default {
  components: {
    MapLoader,
    InfoWindow,
    ChildMarker
  },
  props: {
    shops: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    ShopInfoWindow,
    mapConfig: {
      maxZoom: 16
    },
    icons: {
      default: '/assets/google-map/default-pin.svg',
      active: '/assets/google-map/active-pin.svg'
    },
    selectedMarker: null
  }),
  methods: {
    selectMarker(marker) {
      this.selectedMarker = marker
    },
    onSelectMarker(marker) {
      this.$emit('select', marker)
    },
    closePopup() {
      this.selectedMarker = null
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
    max-height: none!important;
  }

  .gm-style-iw-d {
    overflow: auto!important;
    max-height: none!important;
  }

  .gm-ui-hover-effect {
    display: none!important;
  }
}
</style>