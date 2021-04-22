<template>
  <div class="shop-sidebar">
    <div class="close-sidebar" @click="closeSidebar()">
      <svg class="close-sidebar-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.293 17.707L7.58603 12L13.293 6.29297L14.707 7.70697L10.414 12L14.707 16.293L13.293 17.707Z" fill="#23BE20"/>
      </svg>
      <span class="close-sidebar-text">{{ $t('Back') }}</span>
    </div>
    <div class="sidebar-top">
      <span class="title">{{ $t('Our stores') }}</span>
      <div class="switch-visibility">
        <button @click="switchActiveTab('list')" :class="{'active': activeTab === 'list'}" class="visibility-button">{{ $t('List') }}</button>
        <button @click="switchActiveTab('map')" :class="{'active': activeTab === 'map'}" class="visibility-button">{{ $t('On map') }}</button>
      </div>
    </div>
    <div class="sidebar-bottom">
      <div class="shop-listing" v-if="activeTab === 'list'">
        <shop v-for="(shop, index) in shops" :key="shop.id" :shop="shop" :index="index" class="shop">
          <template v-slot:shop-actions>
            <div class="shop-actions">
              <button-full @click.native="selectShop(shop)">{{ $t("Pick up here") }}</button-full>
            </div>
          </template>
        </shop>
      </div>
      <shop-map :shops="shops" v-if="activeTab === 'map'" class="map" @select="selectShop($event)"/>
    </div>
  </div>
</template>

<script>
import Shop from 'theme/components/core/blocks/Shop/Shop.vue'
import ShopMap from 'theme/components/core/blocks/Checkout/Shipping/ShopShipping/ShopMap.vue'
import ButtonFull from 'theme/components/theme/ButtonFull'
import { mapState } from 'vuex'

export default {
  components: {
    Shop,
    ShopMap,
    ButtonFull
  },
  data: () => ({
    activeTab: 'list'
  }),
  computed: {
    ...mapState({
      shops: (state) => state.checkoutPage.shops
    })
  },
  methods: {
    closeSidebar() {
      this.$store.commit('ui/setShopSidebar', false)
    },
    selectShop(shop) {
      this.closeSidebar()
      this.$store.commit('checkoutPage/SET_SELECTED_SHOP', shop)
      this.$emit('onSelectShipping')
    },
    switchActiveTab(activeTab) {
      this.activeTab = activeTab
    }
  }
};
</script>

<style lang="scss" scoped>
.close-sidebar {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 16px 10px;
  border-bottom: 1px solid #E0E0E0;
  margin-bottom: 9px;
}

.close-sidebar-text {
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #23BE20;
}

.sidebar-top {
  padding-block: 12px;
  box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, .1);
}

.sidebar-bottom {
  padding: 0 16px;
}

.title {
  padding: 0 16px;
  display: block;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #1A1919;
  margin-bottom: 16px;
}

.switch-visibility {
  margin: 0 16px;
  display: flex;
  align-items: center;
  background-color: #F2F2F2;
  border-radius: 4px;

  .visibility-button {
    background: none;
    border: none;
    width: 100%;
    height: 32px;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    color: #000000;

    &.active {
      background: #FFFFFF;  
      border: 1px solid #23BE20;
      border-radius: 4px;
    }
  }
}

.shop {
  padding: 16px 0;
  flex-direction: column;
  border-bottom: 1px solid #E0E0E0;

  ::v-deep {
    .shop-info {
      width: 100%;
      margin-bottom: 16px;
    }

    .shop-actions {
      width: 100%;
    }

    .button-full {
      max-width: 100%;
      height: 32px;
    }
  }
}

.map {
  margin-top: 16px;
}
</style>