<template>
  <div class="product-listing" :style="{'grid-template-columns': `repeat(${columns}, 1fr)`}">
    <product-tile
      v-for="(product, key) in products"
      :key="key"
      :product="product"
      :isShowCompareAndFavorite="isShowCompareAndFavorite"
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
      default: false
    },
    products: {
      type: null,
      required: true
    },
    columns: {
      type: Number | String,
      required: false,
      default: 4
    }
  }
}
</script>

<style lang="scss" scoped>
  .product-listing {
    width: 100%;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  
  ::v-deep .product-image__thumb {
    max-height: 200px!important;
  }
</style>
