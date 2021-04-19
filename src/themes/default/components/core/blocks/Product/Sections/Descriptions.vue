<template>
  <div class="content">
    <h3 class="tab-title">{{ $t('AboutTab') }}</h3>
    <div class="product-description" v-if="getCurrentProduct.description" v-html="getCurrentProduct.description"></div>
  </div>
</template>

<script>
import ProductMixin from '../Mixins/ProductMixin';
export default {
  mixins: [ProductMixin]
}
</script>

<style scoped lang="scss">
@import "~theme/css/pages/Product/Tabs";
::v-deep .product-description{
  font-family: DIN Pro;
  font-style: normal;
  * {
    font-family: DIN Pro;
    font-style: normal;
  }

  p {
    font-size: 15px;
    line-height: 24px;
  }

  strong {
    font-size: 15px;
    line-height: 16px;
    color: #1A1919;
  }

  img{
    max-width: 100%;
  }
  .description-title{
    font-size: 24px;
  }
}
</style>
