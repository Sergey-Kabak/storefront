<template>
  <div class="small-product">
    <div class="small-product-carriage">
      <div class="flex">
        <product-image
          class="product-cover__thumb"
          :image="thumbnailObj"
          :alt="getCurrentProduct.name | htmlDecode"
          :calc-ratio="false"
          data-testid="productImage"
        />
        <span class="small-product-name">{{getCurrentProduct.name}}</span>
      </div>
    </div>
    <product-trade />
  </div>
</template>

<script>
import ProductTrade from '../Components/ProductTrade';
import ProductImage from '../../../ProductImage';
import ProductMixin from '../Mixins/ProductMixin';

export default {
  mixins: [ProductMixin],
  components: {
    ProductTrade,
    ProductImage
  },
  computed: {
    thumbnailObj () {
      return {
        src: this.getThumbnail(this.getCurrentProduct.image, 88, 88),
        loading: this.getThumbnail(this.getCurrentProduct.image, 88, 88)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.small-product{
  @media (min-width: 1025px) {
    max-width: 490px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    max-width: 320px;
  }
  width: 100%;
  &-carriage{
    border-top: 1px solid #E0E0E0;
    border-left: 1px solid #E0E0E0;
    border-right: 1px solid #E0E0E0;
    border-radius: 4px 4px 0 0;
    padding: 16px;
  }
  &-name{
    font-family: DIN Pro;
    font-size: 18px;
    line-height: 24px;
    color: #1A1919;
  }
}
::v-deep .product-stock-status{
  margin-bottom: 8px;
}
::v-deep .product-image {
  margin-right: 12px;
  width: 88px;
  img {
    max-width: 88px;
    max-height: 88px;
  }
}
.trade-wrapper{
  border: 1px solid #23BE20;
  border-radius: 0 0 4px 4px;
}
</style>
