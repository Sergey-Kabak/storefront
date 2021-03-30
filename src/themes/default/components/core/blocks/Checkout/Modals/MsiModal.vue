<template>
  <modal name="modal-msi" class="modal-msi" :width="533">
    <h3 slot="header" class="modal-msi_header align-center">
      Наличие товаров в магазине
    </h3>
    <div slot="content" class="modal-msi_content">
      content

      <div v-if="productsInCart.length" class="product-container">
        <product v-for="product in productsInCart" :key="product.server_item_id || product.id" :product="product" />
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from 'theme/components/core/Modal.vue'
import Product from 'theme/components/core/blocks/Checkout/Product';
import { mapGetters } from 'vuex';
export default {
  components: {
    Modal,
    Product
  },
  computed: {
    ...mapGetters({
      productsInCart: 'cart/getCartItems'
    })
  }
}
</script>
