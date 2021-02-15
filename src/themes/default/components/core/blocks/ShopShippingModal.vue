<template>
  <modal name="modal-shop-shipping" class="modal-shop-shipping" :width="900">
    <h3 slot="header" class="modal-shop-shipping_header">
      {{$t('All stores')}}
    </h3>
    <div slot="content" class="modal-credits_content">
      <shop-shipping :button-visible="false" />
    </div>
  </modal>
</template>

<script>
import Modal from 'theme/components/core/Modal.vue'
import ShopShipping from './Checkout/Shipping/ShopShipping/ShopShipping';

export default {
  components: {
    Modal,
    ShopShipping
  }
}
</script>

<style lang="scss" scoped>
  h3{
    margin: 16px 0 4px;
    padding: 0 16px;
    font-family: 'DIN Pro';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
  }
</style>
