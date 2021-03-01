<template>
  <div class="product-listing" :style="{'grid-template-columns': `repeat(${cols}, 1fr)`}">
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
  },
  computed: {
    cols () {
      const cols = {
        'desktop': this.columns,
        'table': 3,
        'mobile': 2
      }
      return cols[this.screenResolution]
    }
  },
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
