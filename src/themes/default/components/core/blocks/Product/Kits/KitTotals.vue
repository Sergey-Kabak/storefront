<template>
  <div class="totals-wrapper">
    <slot name="count" />
    <div v-if="total.special_price > total.final_price" class="discount space-between">
      <span>{{ $t('Saving') }}:</span>
      <span>{{ total.special_price - total.final_price | price }}</span>
    </div>
    <div class="total space-between">
      <strong class="bold">{{ $t('Total') }}:</strong>
      <div>
        <small v-if="total.special_price > total.final_price">{{ total.special_price | price }}</small>
        <strong class="bold">{{ total.final_price | price }}</strong>
      </div>
    </div>
    <slot name="nav">
      <add-to-cart :product="getCurrentProduct" :show-icon="false">
        <template v-slot:text>
          <span>{{ $t('Buy kit') }}</span>
        </template>
      </add-to-cart>
    </slot>
  </div>
</template>

<script>
import KitMixin from './KitMixin';
import AddToCart from '../../../AddToCart';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';

export default {
  mixins: [KitMixin],
  components: {
    AddToCart
  },
  computed: {
    total () {
      return {
        special_price: this.getSelectedProducts.reduce((acc, product) => acc += product.original_price, 0) + this.getCurrentProduct.original_price,
        final_price: this.getSelectedProducts.reduce((acc, product) => acc += product.final_price || product.original_price, 0) + this.getCurrentProduct.final_price
      }
    },
    storeView () {
      return currentStoreView()
    }
  }
}
</script>

<style lang="scss" scoped>
.mb-auto{
  margin-bottom: auto !important;
}
.space-between{
  display: flex;
  justify-content: space-between;
}
.totals-wrapper{
  flex: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
}
.added-products{
  display: block;
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #5F5E5E;
}
.discount{
  margin-bottom: 24px;
  span{
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #23BE20;
  }
}
.total{
  margin-bottom: 24px;
  .bold{
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 0;
    font-size: 24px;
    line-height: 30px;
    color: #1A1919;
  }
  small{
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 0;
    font-size: 15px;
    line-height: 16px;
    text-align: right;
    text-decoration-line: line-through;
    color: #5F5E5E;
    margin-right: 4px;
  }
}
::v-deep .button-full{
  min-width: 100%;
}
</style>
