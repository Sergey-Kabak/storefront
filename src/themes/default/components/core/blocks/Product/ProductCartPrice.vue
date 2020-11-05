<template>
  <div class="flex flex-column product-price-block">
        <span v-if="isDiscount"
              class="price-sale only-mobile">
          -{{discount}} %
        </span>
    <div class="mb0 name mt0 relative w-100" v-if="!onlyImage">
      {{ product.name | htmlDecode }}
    </div>
    <div class="product-price-wrapper">
          <span
            class="price-original mr5 lh30 cl-secondary"
            v-if="product.special_price && parseFloat(product.original_price_incl_tax) > 0 && !onlyImage"
          >
            {{ product.original_price_incl_tax | price(storeView) }}
          </span>
      <span
        class="price-special lh30 cl-accent weight-700"
        v-if="product.special_price && parseFloat(product.special_price) > 0 && !onlyImage"
      >
          {{ product.price_incl_tax | price(storeView) }}
          </span>
      <span
        class="lh30 cl-secondary price-special"
        v-if="!product.special_price && parseFloat(product.price_incl_tax) > 0 && !onlyImage"
      >
            {{ product.price_incl_tax | price(storeView) }}
          </span>
      <span
        v-if="isDiscount"
        class="price-sale not-mobile"
      >
        -{{discount}} %
      </span>
    </div>
  </div>
</template>

<script>
import { currentStoreView } from '@vue-storefront/core/lib/multistore';

export default {
  props: {
    product: {
      type: Object,
      required: true
    },
    onlyImage: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    storeView () {
      return currentStoreView()
    },
    discount () {
      return parseInt(((this.product.original_price_incl_tax - this.product.special_price) / (this.product.original_price_incl_tax / 100)))
    },
    isDiscount () {
      return this.product.original_price_incl_tax && this.product.special_price && this.discount > 0
    }
  }
}
</script>

<style lang="scss" scoped>
.only-mobile {
  @media (min-width: 768px) {
    display: none;
  }
}

.not-mobile {
  @media (max-width: 767px) {
    display: none !important;
  }
}

.price-sale.only-mobile {
  position: absolute;
  top: 25px;
  left: 0;
}

.price-sale {
  text-align: center;
  margin-left: 8px;
  background: #EE2C39;
  border-radius: 30px;
  width: 40px;
  height: 16px;
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 0;
  font-size: 11px;
  line-height: 16px;
  text-transform: uppercase;
  color: #FFFFFF;
}

.product-price-wrapper {
  display: flex;
  align-items: center !important;
}

.name {
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 0;
  font-size: 15px;
  line-height: 18px;
  color: #1A1919;
  display: block;
  text-align: left;
  margin-bottom: 8px;
  @media(max-width: 767px) {
    height: 34px;
    overflow: hidden;
    font-size: 13px;
    line-height: 16px;
  }
}

.product-price-block {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  @media (max-width: 767px) {
    flex-direction: column;
    .price-sale {
      margin-left: 0;
      margin-top: 5px;
    }
  }
}

.price {
  &-discount {
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 16px;
    text-transform: uppercase;
    color: #FFFFFF;
    background: #EE2C39;
    border-radius: 30px;
    padding: 0 3px;
    @media (max-width: 991px) {
      margin-left: -10px;
      margin-top: -22px;
    }
  }

  &-original {
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    text-decoration-line: line-through;
    color: #595858;
    margin-right: 4px;
  }

  &-special {
    font-weight: 700;
    font-family: DIN Pro;
    font-style: normal;
    font-size: 18px;
    line-height: 20px;
    color: #1A1919;
  }

  &-by-promo-code {
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 13px;
    display: flex;
    align-items: center;
    color: #1A1919;
    border-bottom: 1px dashed #1A1919;
    box-sizing: border-box;
    padding-bottom: 3px;
    margin-bottom: -8px;
  }
}
</style>
