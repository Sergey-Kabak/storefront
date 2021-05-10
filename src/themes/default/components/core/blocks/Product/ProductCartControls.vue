<template>
  <div class="product-card-bottom-options" v-if="getProductStockStatusIcon">
    <router-link :to="productLink" class="ml-auto">
      <button-full
        data-testid="addToCart"
        class="product-action"
        :class="stockStatus"
      >
        <img v-if="isProductInCart && stockStatus === 'InStock'" src="/assets/product-statuses/in-busket.svg" alt="product-action">
        <img v-else alt="product-action" :src="getProductStockStatusIcon">
      </button-full>
    </router-link>
  </div>
</template>

<script>
import ButtonFull from '../../../theme/ButtonFull';
import { mapGetters } from 'vuex';
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { formatProductLinkNoSku } from '@vue-storefront/core/modules/url/helpers'

export default {
  props: {
    product: {
      type: Object,
      required: true
    },
    stockStatus: {
      type: String,
      default: ''
    }
  },
  components: {
    ButtonFull,
  },
  computed: {
    ...mapGetters({
      getBanks: 'themeCredit/getBanks',
      productsInCart: 'cart/getCartItems'
    }),
    isProductInCart () {
      return this.productsInCart && this.productsInCart.find(it => it.sku === this.product.sku)
    },
    productLink () {
      return formatProductLinkNoSku(this.product, currentStoreView().storeCode)
    },
    getProductStockStatusIcon () {
      const path = '/assets/product-statuses/'
      return {
        NotAvailable: null,
        OutOfProduction: null,
        PendingDelivery: path + 'preorder.svg',
        InStock: path + 'busket.svg',
        ComingSoon: path + 'coming-soon.svg'
      }[this.stockStatus]
    }
  }
}
</script>

<style lang="scss" scoped>
.product-card-bottom-options {
  margin-left: auto;
}

.product-action.button-full {
  padding: 8px 16px;

  &:not(.InStock) {
    background-color: #E5F7E4;

    &:hover {
      background-color: #ddeedc;
    }

    &:active {
      background-color: #cddccc;
    }
  }
}

@media (max-width: 768px) {
  .product-action.button-full {
    padding: 8px;
  }
}
</style>
