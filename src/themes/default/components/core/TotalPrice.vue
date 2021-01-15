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
      <no-ssr>
        <div
          class="total-price-value"
          :class="{ discount: segment.code === 'discount' }"
        >
          {{ Math.abs(segment.value) | price(storeView) }}
        </div>
      </no-ssr>
    </div>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr';
import { mapGetters } from 'vuex';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';

export default {
  components: {
    'no-ssr': NoSSR
  },
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
</style>
