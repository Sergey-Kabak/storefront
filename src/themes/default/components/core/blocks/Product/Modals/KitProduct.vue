<template>
  <div class="kit-product-wrapper flex">
    <div class="kit-product-block">
      <router-link
        class="flex kit-product-link"
        :to="productLink"
        data-testid="productLink"
      >
        <div class="product-cover">
          <product-image
            class="product-cover__thumb"
            :image="thumbnailObj"
            :alt="product.name"
            :calc-ratio="false"
            data-testid="productImage"
          />
        </div>
        <product-cart-price :product="product" class="kit-product-price"/>
      </router-link>

      <div class="kit-product-action">
        <kit-action :product="product"/>
      </div>
    </div>
    <div class="kit-product-icons">
      <AddToWishlist :product="product" class="product-icon" :class="{'active': isOnWishlist }" />
      <AddToCompare :product="product" class="product-icon" :class="{'active': isOnCompare }" />
    </div>
  </div>
</template>

<script>
import { ProductTile } from '@vue-storefront/core/modules/catalog/components/ProductTile';
import { IsOnWishlist } from '@vue-storefront/core/modules/wishlist/components/IsOnWishlist';
import { IsOnCompare } from '@vue-storefront/core/modules/compare/components/IsOnCompare';
import AddToWishlist from 'theme/components/core/blocks/Wishlist/AddToWishlist';
import AddToCompare from 'theme/components/core/blocks/Compare/AddToCompare';
import ProductCartPrice from '../ProductCartPrice';
import ProductImage from '../../../ProductImage';
import KitAction from './KitAction';

export default {
  mixins: [ProductTile, IsOnWishlist, IsOnCompare],
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  components: {
    ProductImage,
    AddToWishlist,
    AddToCompare,
    ProductCartPrice,
    KitAction
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
.kit-product {
  &-wrapper{
    padding: 16px 12px 16px 16px;
  }
  &-price{
    flex-direction: column;
  }
  &-icons{
    margin-top: -5px;
    padding-left: 20px;
    margin-left: auto;
    display: flex;
    align-items: flex-start;
    grid-gap: 7px;
  }
  &-link{
    margin-bottom: 20px;
  }
  &-action{
    display: flex;
    margin-left: 68px;
  }
}
.product-cover{
  min-width: 56px;
  width: 56px;
  height: 56px;
  margin-right: 12px;
}
</style>
