<template>
  <div class="cart-summary-container">
    <div class="pb60">
      <div class="summary-title">
        {{ $t('My Order') }}

        <div class="products-count">{{ productsCount }}</div>
      </div>
      <product v-for="product in productsInCart" :key="product.server_item_id || product.id" :product="product" />

      <div v-if="productsInCart && productsInCart.length" class="checkout serif cl-accent cart-total-details">
        <div v-for="(segment, index) in totals" :key="index" class="cart-row" v-if="segment.code !== 'grand_total'">
          <div class="cart-row-item item-left">
            {{ $t(segment.title) }}:
          </div>
          <div v-if="segment.value != null" class="cart-row-item item-right">
            {{ segment.value }} ₴
          </div>
        </div>

        <div class="cart-row total-row" v-for="(segment, index) in totals" :key="index" v-if="segment.code === 'grand_total'">
          <div class="cart-row-item item-left total">
            {{ $t(segment.title) }}:
          </div>
          <div class="cart-row-item item-right total">
            {{ segment.value }} ₴
          </div>
        </div>
      </div>
    </div>
<!--    <div class="py50 px25">-->
<!--      <h4 class="h3 m0">-->
<!--        {{ $t('Safety') }}-->
<!--      </h4>-->
<!--      <p class="cl-tertiary lh20">-->
<!--        Lorem ipsum dolor sit amet, consectetur adipiscing elit.-->
<!--        Nullam sed tempor lorem. Vivamus volutpat eros id est semper accumsan.-->
<!--      </p>-->
<!--      <h4 class="h3 mb0" v-if="!isVirtualCart">-->
<!--        {{ $t('Shipping') }}-->
<!--      </h4>-->
<!--      <p class="cl-tertiary lh20" v-if="!isVirtualCart">-->
<!--        Lorem ipsum dolor sit amet, consectetur adipiscing elit.-->
<!--        Nullam sed tempor lorem. Vivamus volutpat eros id est semper accumsan.-->
<!--      </p>-->
<!--      <h4 class="h3 mb0">-->
<!--        {{ $t('Returns') }}-->
<!--      </h4>-->
<!--      <p class="cl-tertiary lh20">-->
<!--        Lorem ipsum dolor sit amet, consectetur adipiscing elit.-->
<!--        Nullam sed tempor lorem. Vivamus volutpat eros id est semper accumsan.-->
<!--      </p>-->
<!--    </div>-->
  </div>
</template>

<script>
import { CartSummary } from '@vue-storefront/core/modules/checkout/components/CartSummary'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import Product from './Product'

export default {
  components: {
    Product
  },
  computed: {
    storeView () {
      return currentStoreView()
    },
    productsCount () {
      return this.productsInCart.reduce((val, currVal) => {
        return Number(val) + Number(currVal.qty);
      }, 0);
    }
  },
  mixins: [CartSummary],
  mounted () {
    console.log("this.productsInCart", this.productsInCart);
  }
}
</script>

<style lang="scss" scoped>
  .summary-title {
    font-family: "DIN Pro";
    font-size: 24px;
    line-height: 30px;
    color: #000000;
    display: flex;
    align-items: center;

    .products-count {
      margin-left: 15px;
      background: #23BE20;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      color: #fff;
      font-size: 12px;
      line-height: 13px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
  }

  .cart-summary-container {
    border-left: 1px solid #EDEDED;
    padding: 30px 0 0 30px;
  }

  .cart-total-details {
    padding-top: 30px;
  }
  .cart-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 15px;

    &.total-row {
      margin-top: 10px;
    }

    .cart-row-item {
      font-family: "DIN Pro";
      font-size: 14px;
      line-height: 16px;
      color: #1A1919;

      &.item-left {
        flex: 1;
        margin-right: 15px;
      }

      &.total {
        font-size: 24px;
        line-height: 30px;
        font-weight: bold;
      }
    }
  }
</style>
