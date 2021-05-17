<template>
  <div class="product-price-block" v-if="!['ComingSoon', 'OutOfProduction'].includes(getStockStatus)">
    <template v-if="specialPrice">
      <slot name="special-price" :originalPrice="originalPrice" :specialPrice="specialPrice" :discount="discount">
        <div class="product-price-wrapper">
          <span class="price-discount"> -{{ discount }} %</span>
          <div class="main-price">
            <span class="price-original">{{ originalPrice | price(storeView) }}</span>
            <span class="price-special">{{ specialPrice | price(storeView) }}</span>
          </div>
        </div>
      </slot>
    </template>
    <template v-else>
      <slot name="original-price" :originalPrice="originalPrice">
        <div class="product-price-wrapper">
          <span class="price-special">
            {{ originalPrice | price(storeView) }}
          </span>
        </div>
      </slot>
    </template>
  </div>
</template>

<script>
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { price, ProductStock } from 'theme/helpers';

export default {
  props: {
    product: {
      type: Object,
      required: true
    },
    calculateWithPromo: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    getStockStatus () {
      return ProductStock(this.product)
    },
    storeView () {
      return currentStoreView()
    },
    discount () {
      return parseInt(((this.product.original_price - this.product.special_price) / (this.product.original_price / 100)))
    },
    originalPrice() {
      return this.calculateWithPromo ? price(this.product, 'original_price') : this.product.original_price
    },
    specialPrice() {
      return this.calculateWithPromo ? price(this.product, 'special_price') : this.product.special_price
    }
  }
}
</script>

<style lang="scss" scoped>
.main-price {
  display: flex;
  align-items: baseline;
  white-space: nowrap;
}

.product-price-wrapper {
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &.vertical {
    .price-special {
      margin-top: 4px!important;
    }
  }
}

.product-price-block {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}

.price {
  &-original {
    font-family: DIN Pro;
    font-style: normal;
    font-size: 15px;
    line-height: 16px;
    text-decoration-line: line-through;
    color: #595858;
    margin-right: 8px;
  }

  &-special {
    font-weight: 600;
    font-family: DIN Pro;
    font-style: normal;
    font-size: 24px;
    line-height: 24px;
    color: #1A1919;
  }
}
</style>
