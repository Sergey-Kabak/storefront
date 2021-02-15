<template>
  <modal name="modal-shop-shipping" class="modal-shop-shipping" :width="900">
    <h3 slot="header" class="modal-shop-shipping_header">
      Shop shipping
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

</style>
