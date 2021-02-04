<template>
  <div ref="creditProduct" class="product-wrapper">
    <router-link :to="productLink" target="_blank" class="flex">
      <product-image
        class="product-cover__thumb"
        :image="thumbnailObj"
        :alt="product.name | htmlDecode"
        :calc-ratio="false"
        data-testid="productImage"
      />
      <div>
        <product-cart-price :product="product" />
      </div>
    </router-link>
    <div @click="addToCart(product)" class="to-cart pointer">
      {{!isInCart ? 'Добавить в заказ' : 'Удалить с заказа'}}
    </div>
  </div>
</template>

<script>
import ProductImage from '../../../ProductImage';
import ProductCartPrice from 'theme/components/core/blocks/Product/ProductCartPrice';
import { ProductTile } from '@vue-storefront/core/modules/catalog/components/ProductTile.ts';
import { formatProductLink, formatProductLinkNoSku } from '@vue-storefront/core/modules/url/helpers';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { notifications, prepareProductsToAdd } from '@vue-storefront/core/modules/cart/helpers';
import * as types from '@vue-storefront/core/modules/cart/store/mutation-types';
import { mapGetters } from 'vuex';
import i18n from "@vue-storefront/i18n";

export default {
  mixins: [ProductTile],
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  components: {
    ProductImage,
    ProductCartPrice
  },
  computed: {
    ...mapGetters({
      productsInCart: 'cart/getCartItems'
    }),
    thumbnailObj () {
      return {
        src: this.thumbnail,
        loading: this.thumbnail
      }
    },
    productLink () {
      return formatProductLinkNoSku(this.product, currentStoreView().storeCode)
    },
    isInCart () {
      return !!this.productsInCart.find(it => it.sku === this.product.sku)
    }
  },
  methods: {
    async addToCart (product) {
      try {
        if (!this.isInCart) {
          const diffLog = await this.$store.dispatch('cart/addItem', { productToAdd: product })
          diffLog.clientNotifications.forEach(notificationData => {
            this.notifyUser(notificationData)
          })
        } else {
          await this.$store.dispatch('notification/spawnNotification', {
            type: 'warning',
            message: i18n.t('Are you sure you would like to remove this item from the shopping cart?'),
            action1: { label: i18n.t('Cancel'), action: 'close' },
            action2: { label: i18n.t('OK'),
              action: async () => {
                this.$store.dispatch('cart/removeItem', { product: this.product })
              }
            },
            hasNoTimeout: true
          })
        }
        // const { status, onlineCheckTaskId } = await this.$store.dispatch('cart/checkProductStatus', { product })
        // console.log(status, onlineCheckTaskId);
        // this.$store.state.cart.cartItems.push(product);
      } catch (message) {
        this.notifyUser(notifications.createNotification({ type: 'error', message }))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.product-wrapper{
  padding: 0 16px;
  width: calc(100% / 3);
  min-width: calc(100% / 3);
  box-sizing: border-box;
}
::v-deep .product-image{
  min-width: 56px;
  max-width: 56px;
  max-height: 56px;
  margin-right: 12px;
}
::v-deep .product-price-block{
  flex-direction: column;
}
::v-deep .name{
  font-size: 13px;
  line-height: 16px;
  height: 32px;
  overflow: hidden;
}
.to-cart{
  font-family: DIN Pro;
  margin-top: 20px;
  margin-left: 68px;
  font-size: 13px;
  line-height: 16px;
  color: #23BE20;
  font-weight: 700;
  padding-bottom: 4px;
  border-bottom: 1px dashed #23BE20;
}
</style>
