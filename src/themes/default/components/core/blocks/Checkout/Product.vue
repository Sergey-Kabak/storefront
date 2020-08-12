<template>
  <div class="product">
    <div class="blend">
      <product-image className="product-image" :image="image" />
    </div>
    <div class="product-data">
      <div class="product-info">
        <div class="product-name">
          {{ product.name | htmlDecode }}
        </div>
<!--        <div class="error mb6" v-if="product.errors && Object.keys(product.errors).length > 0">-->
<!--          {{ product.errors | formatProductMessages }}-->
<!--        </div>-->
<!--        <div class="h5 cl-tertiary product-name">-->
<!--          {{ product.sku }}-->
<!--        </div>-->
<!--        <div class="h6 cl-bg-tertiary options mb6" v-if="product.totals && product.totals.options">-->
<!--          <div v-for="opt in product.totals.options" :key="opt.label">-->
<!--            <span class="opn">{{ opt.label }}: </span>-->
<!--            <span class="opv" v-html="opt.value" />-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="h6 cl-bg-tertiary options mb6" v-else-if="product.options">-->
<!--          <div v-for="opt in product.options" :key="opt.label">-->
<!--            <span class="opn">{{ opt.label }}: </span>-->
<!--            <span class="opv" v-html="opt.value" />-->
<!--          </div>-->
<!--        </div>-->
        <span class="product-name">
          {{ $t('Qty') }}
          <span class="weight-700">
            {{ product.qty }}
          </span>
        </span>
        <div class="product-price">
          {{ product.price }} ₴
        </div>
      </div>
      <div class="product-price-container">
        <div v-if="isOnline && product.totals">
          <span class="h4 cl-error total-price" v-if="product.totals.discount_amount">{{ product.totals.row_total - product.totals.discount_amount + product.totals.tax_amount }} ₴</span>
          <span class="price-original h5 total-price" v-if="product.totals.discount_amount">{{ product.totals.row_total_incl_tax }} ₴</span>
          <span v-if="!product.totals.discount_amount" class="h4 total-price">{{ product.totals.row_total_incl_tax }} ₴</span>
        </div>
        <div v-else>
          <span class="h4 cl-error total-price" v-if="product.special_price">{{ product.price_incl_tax * product.qty }} ₴</span>
          <span class="price-original h5 total-price" v-if="product.special_price">{{ product.original_price_incl_tax * product.qty }} ₴</span>
          <span v-if="!product.special_price" class="h4 total-price">{{ product.price_incl_tax * product.qty }} ₴</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Product } from '@vue-storefront/core/modules/checkout/components/Product'
import { onlineHelper } from '@vue-storefront/core/helpers'
import ProductImage from 'theme/components/core/ProductImage'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export default {
  computed: {
    storeView () {
      return currentStoreView()
    },
    isOnline () {
      return onlineHelper.isOnline
    },
    image () {
      return {
        loading: this.thumbnail,
        src: this.thumbnail
      }
    }
  },
  mixins: [Product],
  components: {
    ProductImage
  }
}
</script>

<style lang="scss" scoped>
.price-original {
  text-decoration: line-through;
}
.blend {
  //flex: 0 0 121px;
}
.mb6 {
  margin-bottom: 6px;
}
.product {
  border-bottom: 1px solid #E0E0E0;
  padding: 17px 0;
  width: 100%;
  margin-bottom: 6px;
  display: flex;
}

.product-name {
  font-family: "DIN Pro";
  font-size: 13px;
  line-height: 16px;
  color: #1A1919;
  margin-bottom: 6px;
}

.product-data {
  display: flex;
  margin-left: 18px;
  flex: 1;
}
.product-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.product-price-container {
  display: flex;
  align-items: center;
}
.product-price {
  font-family: "DIN Pro";
  font-size: 15px;
  line-height: 16px;
  color: #1A1919;
  margin-top: 5px;
  font-weight: bold;
}
.total-price {
  font-family: "DIN Pro";
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  text-align: right;
  color: #1A1919;
}
.product-image {
  width: 50px;
  height: 50px;
}
</style>
