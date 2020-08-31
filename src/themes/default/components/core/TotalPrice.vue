<template>
  <div class="total-prices">
    <div
      class="total-price"
      v-for="(segment, index) in totalsUsed"
      :key="index"
    >
      <div
        class="total-price-label"
        :class="{ discount: segment.code === 'discount' }"
      >
        {{ $t(segment.code) }}:
      </div>
      <div
        class="total-price-value"
        :class="{ discount: segment.code === 'discount' }"
      >
        {{ Math.abs(segment.value) | price(storeView) }}
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
      totals: "cart/getTotals"
    }),
    totalsUsed() {
      return this.totals.filter(it =>
        ["grand_total", "discount"].includes(it.code)
      );
		},
		storeView () {
      return currentStoreView()
    },
  }
};
</script>

<style lang="scss" scoped>
.total-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
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
</style>
