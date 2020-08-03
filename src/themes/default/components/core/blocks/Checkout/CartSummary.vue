<template>
  <div class="cart-summary">
    <h3 class="summary-title">
      Мой заказ
      <span class="summary-title__count">{{ getItemsTotalQuantity }}</span>
    </h3>
    <product
      v-for="product in productsInCart"
      :key="product.server_item_id || product.id"
      :product="product"
    />
    <promo-code isToggled />
    <div class="summary-price">
      <span>Всего:</span>
      {{ totalPrice }} ₴
    </div>
  </div>
</template>

<script>
import { CartSummary } from '@vue-storefront/core/modules/checkout/components/CartSummary'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import Product from 'theme/components/core/blocks/Checkout/Product'
import { mapGetters } from 'vuex'
import PromoCode from 'theme/components/core/blocks/Microcart/PromoCode'

export default {
  mixins: [CartSummary],
  components: {
    Product,
    PromoCode
  },
  computed: {
    ...mapGetters('cart', ['getItemsTotalQuantity']),
    storeView () {
      return currentStoreView ();
    },
    totalPrice () {
      return this.productsInCart.reduce((acc, it) => acc + it.price * it.qty, 0)
    }
  }
};
</script>

<style lang="scss" scoped>
.summary-price {
  display: flex;
  justify-content: space-between;
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #1a1919;
}
.cart-summary {
  width: 100%;
  padding: 0 0 0px 32px;
  border-left: 1px solid #ededed;
}

.summary-title {
  display: flex;
  align-items: center;
  margin: 0 0 32px 0;
  font-family: DIN Pro;
  font-style: normal;
  font-size: 24px;
  line-height: 30px;

  &__count {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 16px;
    width: 24px;
    height: 24px;
    color: #fff;
    font-size: 12px;
    line-height: 13px;
    border-radius: 50%;
    background: #23be20;
  }
  @media (max-width: 767px) {
    margin-left: 0;
  }
}
</style>
