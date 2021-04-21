<template>
  <modal name="modal-msi" class="modal-msi" :width="533">
    <h3 slot="header" class="modal-msi_header align-center">
      Наличие товаров в магазине
    </h3>
    <div slot="content" class="modal-msi_content">
      <div v-if="shopShipping">
        {{shopShipping.street}} <br>
        <div class="div">alert</div>
        <br>

        <div v-if="productsInCart.length" class="product-container">
          <product v-for="product in productsInCart" :key="product.server_item_id || product.id"
                   :product="product"
                   :source="getSource(product)" />
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from 'theme/components/core/Modal.vue'
import Product from './MsiProduct'
import { mapGetters, mapState } from 'vuex';
export default {
  components: {
    Modal,
    Product
  },
  computed: {
    ...mapGetters({
      productsInCart: 'cart/getCartItems'
    }),
    ...mapState({
      shopShipping: (state) => state.checkoutPage.shopShipping
    })
  },
  methods: {
    getSource (product) {
      if (this.shopShipping && this.shopShipping.products) {
        return this.shopShipping.products.find(p => p.sku === product.sku)
      } return null
    }
  }
}
</script>
