<template>
  <div class="product-listing">
    <product-tile
      v-for="(product, key) in products"
      :key="key"
      :product="product"
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
  width: 100%;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))
}

@media (max-width: 768px){
  .product-listing {
    grid-template-columns: 1fr 1fr;
    grid-gap: 0;
  }
}
</style>