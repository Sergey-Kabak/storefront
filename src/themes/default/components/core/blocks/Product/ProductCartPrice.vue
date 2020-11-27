<template>
  <div class="flex flex-column product-price-block">
    <span v-if="isDiscount"
          class="price-sale only-mobile">
      -{{discount}} %
    </span>
    <div class="mb0 name mt0 relative w-100" v-if="nameVisibility">
      {{ product.name | htmlDecode }} <span v-if="showProductColor">{{getColor}}</span>
    </div>
    <template v-if="product.special_price && !onlyImage">
      <div class="product-price-wrapper">
        <span
          class="price-original mr5 lh30 cl-secondary"
        >
          {{ originalPrice | price(storeView) }}
        </span>
        <span
          class="price-special lh30 cl-accent weight-700">
          {{ finalPrice | price(storeView) }}
        </span>
        <span
          v-if="isDiscount"
          class="price-sale not-mobile"
        >
        -{{ discount }} %
      </span>
      </div>
    </template>
    <template v-else-if="!onlyImage">
      <div class="product-price-wrapper">
        <span class="lh30 cl-secondary price-special">
          {{ finalPrice | price(storeView) }}
        </span>
      </div>
    </template>
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
    },
    nameVisibility: {
      type: Boolean,
      default: true
    },
    showProductColor: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getColor () {
      if (this.product.type_id === 'configurable' && this.showProductColor) {
        return this.product.attributes_metadata.find(it => it.attribute_code === 'color').options.find(option => +option.value === this.product.color).label || null
      }
      return null
    },
    storeView () {
      return currentStoreView()
    },
    discount () {
      const productTypes = {
        bundle: parseInt(100 - this.product.special_price)
      }
      return productTypes[this.product.type_id] || parseInt(((this.product.original_price - this.product.special_price) / (this.product.original_price / 100)))
    },
    isDiscount () {
      return this.product.original_price && this.product.special_price && this.discount > 0
    },
    bundleFinalPrice () {
      if (this.product.special_price > 0) {
        let baseDiscount = 100 - this.product.special_price,
          onePercent = this.bundlePrice / 100;
        return (this.bundlePrice - (onePercent * baseDiscount))
      } else {
        return this.bundlePrice
      }
    },
    bundlePrice () {
      if (this.isBundleProduct && this.product.bundle_options) {
        let bundleProductsPrice = this.product.bundle_options.reduce((acc, it) => {
          return acc += it.product_links.reduce((acc2, it2) => acc2 += it2.price, 0)
        }, 0)
        return bundleProductsPrice + this.product.original_price
      }
    },
    isBundleProduct () {
      return this.product.type_id === 'bundle'
    },
    originalPrice () {
      const productTypes = {
        bundle: this.bundlePrice
      }
      return productTypes[this.product.type_id] || this.product.original_price
    },
    finalPrice () {
      const productTypes = {
        bundle: this.bundleFinalPrice
      }
      return productTypes[this.product.type_id] || this.product.price_incl_tax
    }
  },
  mounted () {
    console.log(this.getColor);
    console.log(this.product);
  }
}
</script>

<style lang="scss" scoped>
.product-item-price{
  .price-original{
    font-size: 24px;
    line-height: 20px;
    color: #5F5E5E;
    position: relative;
    top: 4px;
  }
  .price-special{
    font-size: 36px;
    line-height: 1;
    font-weight: 900;
  }
}
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
  white-space: nowrap;
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
