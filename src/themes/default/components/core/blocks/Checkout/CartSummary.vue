<template>
  <no-ssr>
    <div class="cart-summary" v-if="productsInCart.length">
      <div class="cart-title">
        <span class="cart-title-top">{{ $t("Your order") }}</span>
        <div class="cart-title-bottom">
          <span class="product-count">{{ $tc("products", getItemsTotalQuantity) }}</span>
          <button-text class="remove-button" @click.native="clearCart()">{{ $t('Remove all') }}</button-text>
        </div>
      </div>

      <product
        v-for="product in productsInCart"
        :key="product.server_item_id || product.id"
        :product="product"
      />
      <promo-code
        class="promo-code"
        :isActive.sync="isShowPromocode"
      />
      <div class="shipping-price">
        <span>{{ $t('shipping cost') }}:</span>
        <span>{{ shippingPrice | price(storeView) }}</span>
      </div>
      <total-price class="total-prices"/>
    </div>
  </no-ssr>
</template>

<script>
import { CartSummary } from '@vue-storefront/core/modules/checkout/components/CartSummary';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import Product from 'theme/components/core/blocks/Checkout/Product';
import { mapGetters, mapState } from 'vuex';
import PromoCode from 'theme/components/core/blocks/Microcart/PromoCode';
import TotalPrice from 'theme/components/core/TotalPrice';
import GTM from 'theme/mixins/GTM/dataLayer'
import NoSSR from 'vue-no-ssr';
import ButtonText from 'theme/components/theme/ButtonText'

export default {
  mixins: [CartSummary, GTM],
  components: {
    Product,
    PromoCode,
    TotalPrice,
    ButtonText,
    'no-ssr': NoSSR
  },
  data: () => ({
    isShowPromocode: false
  }),
  computed: {
    ...mapGetters({
      getItemsTotalQuantity: 'cart/getItemsTotalQuantity',
      totals: 'cart/getTotals'
    }),
    ...mapState({
      selectedShipping: (state) => state.checkoutPage.selectedShipping,
    }),
    storeView () {
      return currentStoreView();
    },
    totalPrice () {
      return this.productsInCart.reduce((acc, it) => acc + it.price * it.qty, 0)
    },
    shippingPrice () {
      const total = this.totals.find(it => it.code === 'shipping')
      return total && total.value || this.$t('is free')
    }
  },
  mounted () {
    this.GTM_CHECKOUT(this.productsInCart, 'checkout')
  },
  methods: {
    clearCart () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('Are you sure you would like to remove all the items from the shopping cart?'),
        title: `${this.$t('Remove all')}?`,
        action1: { label: this.$t('Cancel'), action: 'close' },
        action2: { label: this.$t('OK'),
          action: async () => {
            // We just need to clear cart on frontend and backend.
            // but cart token can be reused
            this.$router.push('/')
            await this.$store.dispatch('cart/clear', { disconnect: false })
          }
        },
        hasNoTimeout: true
      })
    }
  },
  watch: {
    productsInCart: async function (v) {
      let products = await this.$store.dispatch('cart/sync', { forceClientState: true, dryRun: true })
      await this.$store.dispatch('cart/merge', { serverItems: products.items, clientItems: products.items })
    }
  }
};
</script>

<style lang="scss" scoped>
.cart-summary {
  width: 100%;
  border: 1px solid #ededed;
  border-radius: 4px;
}

.promo-code {
  padding: 0 16px;
}

.cart-title {
  padding: 16px 16px 24px 16px;
}

.cart-title-top {
  display: block;
  margin-bottom: 16px;
  font-family: DIN Pro;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #1A1919;
}

.cart-title-bottom {
  margin-top: 2px;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.total-prices {
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.product-count {
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #1A1919;
}

.shipping-price {
  padding: 0 16px 8px 16px;
  display: flex;
  justify-content: space-between;

  span {
    font-family: DIN Pro;
    font-size: 14px;
    line-height: 16px;
    color: #1A1919;
  }
}
</style>
