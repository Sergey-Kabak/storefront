<template>
  <div class="product-listing">
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
      default: true
    },
    products: {
      type: null,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .product-listing {
    width: 100%;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(250px,1fr));

    @media only screen and (max-width: 768px) {
      grid-template-columns: repeat(auto-fill, minmax(45% ,1fr));
      grid-gap: 16px;
    }
    @media only screen and (max-width: 540px) {
      grid-gap: 0;
    }
  }

  ::v-deep .product-image__thumb {
    max-height: 250px!important;
  }
</style>
