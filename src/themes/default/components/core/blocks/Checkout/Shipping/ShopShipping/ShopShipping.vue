<template>
  <div class="shops-wrapper" v-if="shops.length">
    <div class="shops">
      <shop-controls class="shop-controls" :activeTab="activeTab" @onActiveTabChange="changeActiveTab($event)" />
      <div class="shop-listing" v-if="activeTab === 'list'">
        <shop v-for="(shop, index) in shops" :key="shop.id" :shop="shop" :index="index" class="shop">
          <template v-slot:shop-actions>
            <div class="shop-actions">
              <button-full v-if="buttonVisible" @click.native="selectShop(shop)">{{ $t("Pick up here") }}</button-full>
            </div>
          </template>
        </shop>
      </div>
      <shop-map v-if="activeTab === 'map'" :shops="shops"  @select="selectShop($event)" class="map"/>
    </div>
    <div class="shop-mobile">
      <shop-mobile @selectShop="selectShop($event)" @onOpenShopSidebar="openSidebar()"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Shop from 'theme/components/core/blocks/Shop/Shop.vue'
import ShopControls from 'theme/components/core/blocks/Checkout/Shipping/ShopShipping/ShopControls.vue'
import ShopMobile from 'theme/components/core/blocks/Checkout/Shipping/ShopShipping/ShopMobile.vue'
import ShopMap from 'theme/components/core/blocks/Checkout/Shipping/ShopShipping/ShopMap.vue'
import ButtonFull from 'theme/components/theme/ButtonFull'
import ShopTitle from 'theme/components/core/blocks/Shop/ShopTitle.vue'

export default {
  props: {
    buttonVisible: {
      type: Boolean,
      default: () => true
    },
    shops: {
      type: Array,
      default: () => []
    }
  },
  components: {
    ShopMap,
    Shop,
    ShopControls,
    ButtonFull,
    ShopTitle,
    ShopMobile
  },
  beforeMount() {
    this.$store.dispatch('checkoutPage/getShops', { city: this.city })
  },
  data: () => ({
    activeTab: 'list'
  }),
  computed: {
    ...mapState({
      city: (state) => state.ui.city
    })
  },
  methods: {
    changeActiveTab(activeTab) {
      this.activeTab = activeTab
    },
    selectShop(shop) {
      this.$store.commit('checkoutPage/SET_SELECTED_SHOP', shop)
      this.$emit('onSelectShipping')
    },
    activateShopOnMap(shop) {
      this.$store.commit('shop/SET_SELECTED_SHOP', shop)
      this.activeTab = 'map'
    },
    openSidebar() {
      this.$store.commit('ui/setShopSidebar', true)
    }
  }
};
</script>

<style lang="scss" scoped>
.shop-listing {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 375px;
  margin: 0 32px;
}

.shop {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 1px solid #E0E0E0;

  &:last-child {
    border-bottom: none;
  }

  ::v-deep {
    .shop-name {
      line-height: 20px;
      cursor: text;
    }
  }
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #bfbfbf;
}

.map {
  padding: 16px 32px;

  &::v-deep {
    #map {
      border-radius: 4px;
      height: 340px;
    }
  }
}

.shop-actions {
  max-width: 131px;
  width: 100%;
  margin-top: auto;
  margin-left: auto;

  .button-full {
    height: 31px;
  }
}

.shop-item {
  cursor: pointer;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
}

.shop-mobile {
  display: none;
}

@media  (max-width: 560px) {
  .shop-listing {
    margin: 0;
    height: 340px;
  }

  .map {
    padding: 0;
  }

  .shops {
    display: none;
  }

  .shop-mobile {
    display: block;
  }
}

@media  (max-width: 460px) {
  .shop {
    grid-template-columns: 1fr;
  }

  .shop-actions {
    max-width: 100%;
    margin-top: 16px;

    .button-full {
      max-width: 100%;
    }
  }
}
</style>
