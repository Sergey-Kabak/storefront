<template>
  <modal name="modal-shop-shipping" class="modal-shop-shipping" :width="900" v-if="availableShops">
    <h3 slot="header" class="modal-shop-shipping_header">
      {{$t('All stores')}}
    </h3>
    <div slot="content" class="modal-shop-shipping">
      <shop-shipping :shops="availableShops" :button-visible="false" />
    </div>
  </modal>
</template>

<script>
import Modal from 'theme/components/core/Modal.vue'
import ShopShipping from './Checkout/Shipping/ShopShipping/ShopShipping'
import { mapState, mapGetters } from 'vuex'

export default {
  components: {
    Modal,
    ShopShipping
  },
  computed: {
    ...mapGetters({
      getCurrentProduct: 'product/getCurrentProduct'
    }),
    ...mapState({
      shops: (state) => state.checkoutPage.shops
    }),
    availableShops () {
      return this.shops.filter(it => {
        return this.getCurrentProduct && this.getCurrentProduct.msi_sources.some(store => store.source_code.includes(it.source_code) && store.salable_quantity)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  ::v-deep .modal-container{
    position: relative;
    z-index: 4;
  }
  h3{
    margin: 16px 0 4px;
    padding: 0 16px;
    font-family: 'DIN Pro';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
  }
</style>
