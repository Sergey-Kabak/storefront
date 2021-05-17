<template>
  <button-full
    @click.native="addToCart(product)"
    :disabled="isProductDisabled"
    data-testid="addToCart"
    class="add-to-cart"
    :aria-label="$t('Buy')"
    :class="{ 'preorder-button': productStock === 'PendingDelivery' }"
  >
    <slot name="text">
      <svg class="loading" v-if="isProductDisabled" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 4V2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12H20C20 16.41 16.41 20 12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4Z" fill="#23BE20"/>
      </svg>
      <svg v-if="isProductInCart && !isProductDisabled" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="add-to-cart-icon">
        <path d="M10.5 22C11.3284 22 12 21.3284 12 20.5C12 19.6716 11.3284 19 10.5 19C9.67157 19 9 19.6716 9 20.5C9 21.3284 9.67157 22 10.5 22Z" fill="#ffffff"/>
        <path d="M16.5 22C17.3284 22 18 21.3284 18 20.5C18 19.6716 17.3284 19 16.5 19C15.6716 19 15 19.6716 15 20.5C15 21.3284 15.6716 22 16.5 22Z" fill="#ffffff"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M14 5H2V7H4.3L7.582 16.025C7.79362 16.6029 8.1773 17.1021 8.68134 17.4552C9.18539 17.8083 9.78556 17.9985 10.401 18H19V16H10.401C9.982 16 9.604 15.735 9.461 15.342L8.973 14H18.246C19.136 14 19.926 13.402 20.169 12.549L21.0187 9.57574C20.4013 9.84851 19.7184 10 19 10C16.2386 10 14 7.76142 14 5Z" fill="#ffffff"/>
        <path d="M18.25 8.16L15.5 5.16L16.66 4L18.25 5.59L21.84 2L23 3.41L18.25 8.16Z" fill="#ffffff"/>
      </svg>
      <svg v-if="!isProductInCart && !isProductDisabled" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="add-to-cart-icon">
        <path d="M21 4H2V6H4.3L7.582 15.025C7.79362 15.6029 8.1773 16.1021 8.68134 16.4552C9.18539 16.8083 9.78556 16.9985 10.401 17H19V15H10.401C9.982 15 9.604 14.735 9.461 14.342L8.973 13H18.246C19.136 13 19.926 12.402 20.169 11.549L21.962 5.275C22.0039 5.12615 22.0109 4.96962 21.9823 4.81763C21.9537 4.66565 21.8904 4.52234 21.7973 4.39889C21.7041 4.27544 21.5837 4.1752 21.4454 4.106C21.3071 4.0368 21.1546 4.00053 21 4ZM18.246 11H8.246L6.428 6H19.675L18.246 11Z" fill="#ffffff"/>
        <path d="M10.5 21C11.3284 21 12 20.3284 12 19.5C12 18.6716 11.3284 18 10.5 18C9.67157 18 9 18.6716 9 19.5C9 20.3284 9.67157 21 10.5 21Z" fill="#ffffff"/>
        <path d="M16.5 21C17.3284 21 18 20.3284 18 19.5C18 18.6716 17.3284 18 16.5 18C15.6716 18 15 18.6716 15 19.5C15 20.3284 15.6716 21 16.5 21Z" fill="#ffffff"/>
      </svg>
      <span class="add-to-cart-text">{{ getAddToCartText }}</span>
    </slot>
  </button-full>
</template>

<script>
import { formatProductMessages } from '@vue-storefront/core/filters/product-messages';
import { notifications } from '@vue-storefront/core/modules/cart/helpers';
import focusClean from 'theme/components/theme/directives/focusClean';
import ButtonFull from 'theme/components/theme/ButtonFull.vue';
import { mapGetters, mapState } from 'vuex';
import GTM from 'theme/mixins/GTM/dataLayer'

export default {
  mixins: [GTM],
  directives: { focusClean },
  components: { ButtonFull },
  props: {
    product: {
      required: true,
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    },
    productStock: {
      type: String,
      default: ''
    }
  },
  methods: {
    onAfterRemovedVariant () {
      this.$forceUpdate()
    },
    async addToCart (product) {
      try {
        const diffLog = await this.$store.dispatch('cart/addProduct', { productToAdd: product })
        await this.GTM_ADD_TO_CART([product], 'product page')
        diffLog.clientNotifications.forEach(notificationData => {
          this.notifyUser(notificationData)
        })
      } catch (message) {
        this.notifyUser(notifications.createNotification({ type: 'error', message }))
      }
    },
    notifyUser (notificationData) {
      this.$store.dispatch('notification/spawnNotification', notificationData, { root: true })
    }
  },
  computed: {
    ...mapGetters({
      isAddingToCart: 'cart/getIsAdding',
      getCurrentCustomOptions: 'product/getCurrentCustomOptions',
      getCurrentProductConfiguration: 'product/getCurrentProductConfiguration',
      getCartItems: 'cart/getCartItems',
      productsInCart: 'cart/getCartItems'
    }),
    ...mapState({
      kitProducts: (state) => state.kits.products
    }),
    isProductDisabled () {
      return this.disabled || formatProductMessages(this.product.errors) !== '' || this.isAddingToCart
    },
    isProductInCart () {
      return this.productsInCart && this.productsInCart.find(it => it.sku === this.product.sku)
    },
    getAddToCartText () {
      if (this.isProductDisabled) {
        return this.$t('Loading')
      } else if (this.isProductInCart) {
        return this.$t('In cart')
      } else {
        return this.$t('Buy')
      }
    }
  },
  beforeMount () {
    this.$bus.$on('product-after-removevariant', this.onAfterRemovedVariant)
  },
  beforeDestroy () {
    this.$bus.$off('product-after-removevariant')
  }
}
</script>

<style scoped lang="scss">
.add-to-cart {
  line-height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-right: 10px;
  }
}

.preorder-button {
  color: #000000;
  background-color: #FFFFFF;
  border: 1px solid #23BE20;
}

.loading {
  animation: rotating 2s linear infinite;
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
