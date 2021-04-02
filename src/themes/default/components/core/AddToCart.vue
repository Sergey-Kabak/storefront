<template>
  <button-full
    @click.native="addToCart(product)"
    :disabled="isProductDisabled"
    data-testid="addToCart"
    class="add-to-cart"
    :aria-label="$t('Buy')"
    :class="{ 'preorder-button': productStock === 'PendingDelivery' }"
  >
    <svg v-if="showIcon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="add-to-cart-ico">
      <path d="M21 4H2V6H4.3L7.582 15.025C7.79362 15.6029 8.1773 16.1021 8.68134 16.4552C9.18539 16.8083 9.78556 16.9985 10.401 17H19V15H10.401C9.982 15 9.604 14.735 9.461 14.342L8.973 13H18.246C19.136 13 19.926 12.402 20.169 11.549L21.962 5.275C22.0039 5.12615 22.0109 4.96962 21.9823 4.81763C21.9537 4.66565 21.8904 4.52234 21.7973 4.39889C21.7041 4.27544 21.5837 4.1752 21.4454 4.106C21.3071 4.0368 21.1546 4.00053 21 4ZM18.246 11H8.246L6.428 6H19.675L18.246 11Z" fill="#ffffff"/>
      <path d="M10.5 21C11.3284 21 12 20.3284 12 19.5C12 18.6716 11.3284 18 10.5 18C9.67157 18 9 18.6716 9 19.5C9 20.3284 9.67157 21 10.5 21Z" fill="#ffffff"/>
      <path d="M16.5 21C17.3284 21 18 20.3284 18 19.5C18 18.6716 17.3284 18 16.5 18C15.6716 18 15 18.6716 15 19.5C15 20.3284 15.6716 21 16.5 21Z" fill="#ffffff"/>
    </svg>
    <slot name="text">
      <span class="add-to-cart-text">{{ $t('Buy') }}</span>
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
import { CartService } from '@vue-storefront/core/data-resolver';

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
    showIcon: {
      type: Boolean,
      default: true
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
      } finally {
        await this.$store.dispatch('cart/syncPull', { getCartItems: this.getCartItems })
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
      getCartItems: 'cart/getCartItems'
    }),
    ...mapState({
      kitProducts: (state) => state.kits.products
    }),
    isProductDisabled () {
      return this.disabled || formatProductMessages(this.product.errors) !== '' || this.isAddingToCart
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
    &-ico {
      margin-right: 10px;
    }
  }
  .preorder-button {
    color: #000000;
    background-color: #FFFFFF;
    border: 1px solid #23BE20;
  }
</style>
