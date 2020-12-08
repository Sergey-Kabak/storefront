<template>
  <div class="shop-wrapper">
    <div class="tab-wrapper">
      <button class="shop-tab" :class="{'active': shopSwitch === 'list'}" @click="switchShopVisible('list')">{{ $t('List') }}</button>
      <button class="shop-tab" :class="{'active': shopSwitch === 'map'}" @click="switchShopVisible('map')">{{ $t('On map') }}</button>
    </div>
    <div class="shop-page">
      <div class="shops" :class="{'active': shopSwitch === 'list'}">
        <shop-tabs @onTabChange="changeActiveComponent($event)" :activeTab="component"/>
        <component :is="component" />
      </div>
      <shop-map v-if="isShowMap" :class="{'active': shopSwitch === 'map'}"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ShopTabs from 'theme/components/core/blocks/Shop/ShopTabs.vue'
import ShopListing from 'theme/components/core/blocks/Shop/ShopListing.vue'
import ShopFavourites from 'theme/components/core/blocks/Shop/ShopFavourites.vue'
import ShopMap from 'theme/components/core/blocks/Shop/ShopMap.vue'
import mobileResolution from 'theme/mixins/mobileResolution'

export default {
  mixins: [mobileResolution],
  components: {
    ShopTabs,
    ShopListing,
    ShopFavourites,
    ShopMap
  },
  data: () => ({
    component: 'shop-listing'
  }),
  computed: {
    ...mapState({
      cmsPageContent: (state) => state.cmsPage.current,
      shopSwitch: (state) => state.shop.shopSwitch
    }),
    isShowMap() {
      return this.shopSwitch === 'map' || this.isDesktop
    }
  },
  methods: {
    changeActiveComponent(component) {
      this.component = component
    },
    switchShopVisible(type) {
      this.$store.commit('shop/SET_SHOP_SWITCH', type)
    }
  },
  beforeDestroy: function() {
    this.$store.commit('shop/SET_SELECTED_SHOP', null)
  }
}
</script>

<style lang="scss" scoped>
.shop-page {
  display: flex;
  align-items: flex-start;
}

.shops,
.vue-map-container {
  height: 520px;
  width: 100%;
}

.shops {
  display: flex;
  flex-direction: column;
  height: 520px;
  max-width: 336px;
  width: 100%;
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
}

.tab-wrapper {
  display: none;
  border-radius: 4px;
  background: #F2F2F2;
  align-items: center;
  margin-bottom: 16px;
}

.shop-tab {
  height: 32px;
  width: 100%;
  box-sizing: border-box;
  border-style: none;
  border-radius: 4px;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #1A1919;

  &.active {
    border: 1px solid #23BE20;
    background: #FFFFFF;
  }
}

@media (max-width: 768px) {
  .shops,
  .vue-map-container {
    height: 420px;
    width: 100%;
  }

  .tab-wrapper {
    display: flex;
  }

  .shops {
    display: none;
    max-width: 100%;

    &.active {
      display: flex;
    }
  }

  .vue-map-container {
    display: none;

    &.active {
      display: block;
    }
  }

  .shop-tabs {
    display: none;
  }
}
</style>