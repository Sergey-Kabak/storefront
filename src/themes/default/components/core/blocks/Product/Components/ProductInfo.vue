<template>
  <div class="product-wrapper">
    <div class="product-meta">
      <product-stock-status v-if="screenResolution !== 'mobile'" />
      <h1
        v-if="screenResolution !== 'mobile'"
        class="mt0 product-name block font"
        data-testid="productName"
        itemprop="name"
      >
        {{ getCurrentProduct.name | htmlDecode }}
      </h1>
      <div
        class="product-block sku font"
        itemprop="sku"
        :content="getCurrentProduct.sku"
      >
        {{ $t('SKU: {sku}', { sku: getCurrentProduct.sku }) }}
      </div>
    </div>
    <product-filters v-if="getCurrentProduct.type_id === 'configurable'" />
  </div>
</template>

<script>
import ProductMixin from '../Mixins/ProductMixin';
import ResizeMixin from '../Mixins/ResizeMixin';
import ProductFilters from './ProductFilters';
import ProductStockStatus from './ProductStockStatus';

export default {
  mixins: [ProductMixin, ResizeMixin],
  components: {
    ProductFilters,
    ProductStockStatus
  }
}
</script>

<style lang="scss" scoped>
.product-wrapper{
  padding: 16px;
  box-sizing: border-box;
}
.font {
  font-family: 'DIN Pro';
  font-style: normal;
}
.product-name {
  font-weight: 500;
  font-size: 24px;
  line-height: 30px;
  color: #1A1919;
  margin-bottom: 16px;
  @media (max-width: 767px) {
    font-size: 36px;
  }
}
.sku{
  font-size: 13px;
  line-height: 16px;
  text-align: right;
  color: #5F5E5E;
}
</style>
