<template>
  <div class="mobile-shop">
    <shop :shop="defaultShop">
      <template v-slot:shop-actions>
        <button-full @click.native="selectShop()">{{ $t('Pick up here') }}</button-full>
        <button-full class="button-outline" @click.native="openShopSidebar()">{{ $t('Select another shop') }}</button-full>
      </template>
    </shop>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Shop from 'theme/components/core/blocks/Shop/Shop.vue'
import ButtonFull from 'theme/components/theme/ButtonFull'

export default {
  components: {
    Shop,
    ButtonFull
  },
  computed:{
    ...mapState({
      shops: (state) => state.checkoutPage.shops,
      shopShipping: (state) => state.checkoutPage.shopShipping,
    }),
    defaultShop() {
      return this.shopShipping || (this.shops && this.shops[0]) // selected or first shop
    }
  },
  methods: {
    selectShop() {
      this.$emit('selectShop', this.defaultShop)
    },
    openShopSidebar() {
      this.$emit('onOpenShopSidebar')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .shop-items {
    flex-direction: column;
  }

  .shop-info {
    margin-bottom: 16px;
  }
}

.button-full {
  max-width: 100%;
  height: 32px;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
}

.button-outline {
  background-color: #fff;
  font-family: DIN Pro;
  border: 1px solid #23BE20;
  color: #1A1919;
}
</style>