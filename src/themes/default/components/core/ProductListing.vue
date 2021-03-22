<template>
  <div class="product-listing">
    <product-tile
      v-for="(product, key) in products"
      :key="key"
      :product="product"
      :isShowCompareAndFavorite="isShowCompareAndFavorite"
      :gtm-list="gtmList"
    />
  </div>
</template>

<script>
import ProductTile from 'theme/components/core/ProductTile'
import ResizeMixin from './blocks/Product/Mixins/ResizeMixin';

export default {
  name: 'ProductListing',
  mixins: [ResizeMixin],
  components: {
    ProductTile
  },
  props: {
    isShowCompareAndFavorite: {
      type: Boolean,
      required: false,
      default: true
    },
    products: {
      type: null,
      required: true
    },
    gtmList: {
      type: String,
      default: 'category'
    },
    columns: {
      type: Number | String,
      default: () => 3
    }
  }
}
</script>

<style lang="scss" scoped>
  .product-listing {
    @media (max-width: 768px){
      grid-template-columns: 1fr 1fr;
      grid-gap: 0;
      ::v-deep :nth-child(even) {
        border-right: none;
        border-left: none;
        padding-right: 0;
      }
      ::v-deep :nth-child(odd) {
        border-left: none;
        padding-left: 0;
      }
      ::v-deep .product{
        border-radius: 0;
      }
    }
    width: 100%;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))
  }

  ::v-deep .product-image__thumb {
    max-height: 250px!important;
  }
</style>