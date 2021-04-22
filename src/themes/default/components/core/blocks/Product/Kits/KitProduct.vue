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
      <slot name="kit-product-action" />
    </div>
    <slot name="kit-product-reaction">
      <div class="kit-product-icons">
        <button @click="showMobileIcons = !showMobileIcons" type="button" class="show-more-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="24" viewBox="0 0 12 24" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6 8C7.1 8 8 7.1 8 6C8 4.9 7.1 4 6 4C4.9 4 4 4.9 4 6C4 7.1 4.9 8 6 8ZM6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM6 16C4.9 16 4 16.9 4 18C4 19.1 4.9 20 6 20C7.1 20 8 19.1 8 18C8 16.9 7.1 16 6 16Z" fill="#BDBDBD"/>
          </svg>
        </button>
        <div v-if="showMobileIcons" class="kit-icons-mobile">
          <AddToWishlist :product="product" showDescription class="product-icon" :class="{'active': isOnWishlist }" />
          <AddToCompare :product="product" showDescription class="product-icon" :class="{'active': isOnCompare }" />
        </div>
        <div class="kit-icons">
          <AddToWishlist :product="product" class="product-icon" :class="{'active': isOnWishlist }" />
          <AddToCompare :product="product" class="product-icon" :class="{'active': isOnCompare }" />
        </div>
      </div>
    </slot>
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
import ResizeMixin from '../Mixins/ResizeMixin';

export default {
  mixins: [ProductTile, IsOnWishlist, IsOnCompare, ResizeMixin],
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
    ProductCartPrice
  },
  data () {
    return {
      showMobileIcons: false
    }
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
    position: relative;
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
.show-more-button{
  @media (min-width: 768px) {
    display: none;
  }
  width: 24px;
  display: flex;
  justify-content: center;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}
.kit-icons{
  @media (max-width: 767px) {
    display: none;
  }
  @media (min-width: 768px) {
    display: flex;
    grid-gap: 7px;
  }
  &-mobile{
    @media (min-width: 768px) {
      display: none;
    }
    position: absolute;
    right: 6px;
    top: 26px;
    background-color: #fff;
    width: 242px;
    padding: 8px 0;
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14);
    display: flex;
    flex-direction: column;
    ::v-deep .item{
      width: 100%;
      padding: 4px 16px 4px 12px;
      svg{
        min-width: 32px;
        height: 32px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
