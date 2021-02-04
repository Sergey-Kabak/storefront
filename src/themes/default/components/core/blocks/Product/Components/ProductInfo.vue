<template>
  <div>
    <div
      class="product-in-stock hidden-xs block"
      :class="ProductStock"
    >
      {{ $t(ProductStock) }}
    </div>
    <h1
      class="mt0 cl-mine-shaft product-name block font"
      data-testid="productName"
      itemprop="name"
    >
      {{ getCurrentProduct.name | htmlDecode }}
    </h1>
    <div
      class="mb20 cl-secondary sku font"
      itemprop="sku"
      :content="getCurrentProduct.sku"
    >
      {{ $t('SKU: {sku}', { sku: getCurrentProduct.sku }) }}
    </div>
  </div>
</template>

<script>
import ProductMixin from '../Mixins/ProductMixin';

export default {
  mixins: [ProductMixin]
}
</script>

<style lang="scss" scoped>
.NotAvailable {
  color: #ee2c39;
}
.PendingDelivery {
  color: orange;
}
.InStock{
  color: #23BE20;
}
.font {
  font-family: 'DIN Pro';
  font-style: normal;
}
.product-in-stock {
  font-size: 14px;
  line-height: 16px;
  display: block;
  margin-bottom: 8px;
  &:before{
    content: '●';
    color: inherit;
  }
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
