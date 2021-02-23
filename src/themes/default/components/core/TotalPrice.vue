<template>
  <div class="total-prices">
    <div class="total-price discount" v-if="discount">
      <span class="total-price-label discount">{{ $t('discount') }}</span>
      <span class="total-price-value discount">{{ Math.abs(discount) | price(storeView) }}</span>
    </div>
    <div class="grand-total">
      <div class="total-price">
        <span class="total-price-label">{{ $t('grand_total') }}</span>
        <div class="price">
<!--          <span class="original-price" :class="{'old-price': subtotal > grandTotal}" >{{ subtotal | price(storeView) }}</span>-->
<!--          <span class="special-price" v-if="subtotal > grandTotal">{{ grandTotal | price(storeView) }}</span>-->
          <span class="special-price">{{ grandTotal | price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';

export default {
  computed: {
    ...mapGetters({
      totals: 'cart/getTotals'
    }),
    subtotal () {
      const subtotal = this.totals.find(it => it.code === 'subtotal_original')
      return subtotal && subtotal.value
    },
    discount () {
      const discount = this.totals.find(it => it.code === 'discount')
      return discount && discount.value
    },
    grandTotal () {
      const grandTotal = this.totals.find(it => it.code === 'grand_total')
      return grandTotal && grandTotal.value
    },
    storeView () {
      return currentStoreView()
    }
  }
};
</script>

<style lang="scss" scoped>
.total-price {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
}

.total-price-label {
  font-family: "DIN Pro";
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
  color: #19223d;

  &.discount {
    font-size: 14px;
    line-height: 16px;
    color: #23be20;
  }
}

.total-price-value {
  font-family: "DIN Pro";
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 30px;
  text-align: right;
  color: #19223d;

  &.discount {
    font-size: 14px;
    line-height: 16px;
    color: #23be20;
  }
}

.price {
  display: flex;
  align-items: baseline;
}

.original-price {
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #1A1919;

  &.old-price {
    font-size: 15px;
    line-height: 16px;
    font-weight: 400;
    text-decoration-line: line-through;
    color: #5F5E5E;
    margin-right: 4px;
  }
}

.special-price {
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #1A1919;
}

</style>
