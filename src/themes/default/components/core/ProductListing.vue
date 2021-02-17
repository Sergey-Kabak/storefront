<template>
  <div class="product-listing" :style="{'grid-template-columns': `repeat(${columns}, 1fr)`}">
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

export default {
  name: 'ProductListing',
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
    @media (max-width: 767px){
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
        margin-bottom: -1px;
      }
    }
    width: 100%;
    display: grid;
    grid-gap: 20px;
  }

  ::v-deep .product-image__thumb {
    max-height: 250px!important;
  }
</style>
