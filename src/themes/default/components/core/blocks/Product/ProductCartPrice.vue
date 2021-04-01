<template>
  <div class="flex flex-column product-price-block">
    <div class="mb0 name mt0 relative w-100" v-if="nameVisibility">
      {{ product.name | htmlDecode }} <span v-if="showProductColor">{{getColor}}</span>
    </div>
    <template v-if="specialPrice && !onlyImage && (getStockStatus !== 'ComingSoon' && product.price !== 0)">
      <div class="product-price-wrapper">
        <div class="main-price">
          <span
            class="price-original mr5"
          >
            {{ originalPrice | price(storeView) }}
          </span>
          <span
            class="price-special">
            {{ specialPrice | price(storeView) }}
          </span>
        </div>
        <span
          v-if="isDiscount"
          class="price-sale"
        >
        -{{ discount }} %
      </span>
      </div>
    </template>
    <template v-else-if="!onlyImage && getStockStatus !== 'ComingSoon'">
      <div class="product-price-wrapper">
        <span class="price-special">
          {{ originalPrice | price(storeView) }}
        </span>
      </div>
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
    onlyImage: {
      type: Boolean,
      default: false
    },
    nameVisibility: {
      type: Boolean,
      default: true
    },
    showProductColor: {
      type: Boolean,
      default: false
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
    getColor () {
      if (this.product.type_id === 'configurable' && this.showProductColor ) {
        return this.product.attributes_metadata.find(it => it.attribute_code === 'color').options.find(option => +option.value === this.product.color).label || null
      }
      return null
    },
    storeView () {
      return currentStoreView()
    },
    discount () {
      return parseInt(((this.product.original_price - this.product.special_price) / (this.product.original_price / 100)))
    },
    isDiscount () {
      return this.product.original_price && this.product.special_price && this.discount > 0
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
.product-item-price{
  .product-price-wrapper{
    flex-direction: column;
    align-items: flex-end;
  }
  .price-sale{
    order: -1;
    margin: 0;
  }
  .price-original{
    font-size: 18px;
    line-height: 20px;
    color: #5F5E5E;
    position: relative;
  }
  .price-special{
    font-size: 30px;
    line-height: 1;
    font-weight: 900;
  }
  .main-price{
    margin-top: 0;
  }
}
.main-price {
  display: flex;
  align-items: baseline;
  white-space: nowrap;
  margin-top: 4px;
}

.price-sale {
  margin-top: 4px;
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
  margin: -4px 0 0 0;
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: flex-end;
  align-items: center;

  @media only screen and (max-width: 520px) {
    // flex-wrap: nowrap;
  }
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
}

.price {
  &-discount {
    font-family: DIN Pro;
    font-style: normal;
    margin-top: 4px;
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
    font-size: 12px;
    line-height: 12px;
    text-decoration-line: line-through;
    color: #595858;
    margin-right: 4px;
  }

  &-special {
    font-weight: 600;
    font-family: DIN Pro;
    font-style: normal;
    font-size: 18px;
    line-height: 24px;
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
