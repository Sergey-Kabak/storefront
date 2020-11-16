<template>
  <div ref="creditProduct" class="product-wrapper flex">
    <product-image
      class="product-cover__thumb"
      :image="thumbnailObj"
      :alt="product.name | htmlDecode"
      :calc-ratio="false"
      data-testid="productImage"
    />
    <div>
      <product-cart-price :product="product" />
      <div>
        Добавить в заказ
      </div>
    </div>
  </div>
</template>

<script>
import ProductImage from '../../../ProductImage';
import ProductCartPrice from 'theme/components/core/blocks/Product/ProductCartPrice';
import { ProductTile } from '@vue-storefront/core/modules/catalog/components/ProductTile.ts';

export default {
  mixins: [ProductTile],
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  components: {
    ProductImage,
    ProductCartPrice
  },
  computed: {
    thumbnailObj () {
      return {
        src: this.thumbnail,
        loading: this.thumbnail
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.product-wrapper{
  padding: 0 16px;
  width: calc(100% / 3);
  min-width: calc(100% / 3);
  box-sizing: border-box;
}
::v-deep .product-image{
  min-width: 56px;
  max-width: 56px;
  max-height: 56px;
  margin-right: 12px;
}
::v-deep .product-price-block{
  flex-direction: column;
}
::v-deep .name{
  font-size: 13px;
  line-height: 16px;
}
</style>
