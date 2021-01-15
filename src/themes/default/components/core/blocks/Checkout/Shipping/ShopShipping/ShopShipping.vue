<template>
  <div class="shops" v-if="shops.length">
    <shop-controls :activeTab="activeTab" @onActiveTabChange="changeActiveTab($event)" />
    <div class="shop-listing" v-if="activeTab === 'list'">
      <shop v-for="(shop, index) in shops" :key="shop.id" :shop="shop" :index="index" class="shop">
        <template v-slot:shop-actions>
          <div class="shop-actions">
            <button-full @click.native="selectShop(shop)">{{ $t("Pick up here") }}</button-full>
          </div>
        </template>
      </shop>
    </div>
    <shop-map v-if="activeTab === 'map'" class="map" @select="selectShop($event)"/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Shop from 'theme/components/core/blocks/Shop/Shop.vue'
import ShopControls from 'theme/components/core/blocks/Checkout/Shipping/ShopShipping/ShopControls.vue'
import ShopMap from 'theme/components/core/blocks/Checkout/Shipping/ShopShipping/ShopMap.vue'
import ButtonFull from 'theme/components/theme/ButtonFull'
import ShopTitle from 'theme/components/core/blocks/Shop/ShopTitle.vue'

export default {
  components: {
    ShopMap,
    Shop,
    ShopControls,
    ButtonFull,
    ShopTitle
  },
  beforeMount() {
    this.$store.dispatch('checkoutPage/getShops', { city: this.city })
  },
  data: () => ({
    activeTab: 'list'
  }),
  computed: {
    ...mapState({
      city: (state) => state.ui.city,
      shops: (state) => state.checkoutPage.shops
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
    }
  }
};
</script>

<style lang="scss" scoped>
.shop-listing {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 372px;
  margin: 0 32px;
}

.shop {
  border-bottom: 1px solid #E0E0E0;

  &:last-child {
    border-bottom: none;
  }

  ::v-deep {
    .shop-name {
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

@media  (max-width: 560px) {
  .shop-listing {
    margin: 0;
    height: 340px;
  }

  .map {
    padding: 0;
  }
}

@media  (max-width: 460px) {
  .shop {
    flex-direction: column;
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