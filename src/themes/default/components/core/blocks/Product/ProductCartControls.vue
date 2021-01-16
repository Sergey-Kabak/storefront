<template>
  <div>
      <span
        v-if="!product.stock.is_in_stock && !isPreorder"
        class="product-is-not-available product-card-bottom-options"
      >
        <slot name="wishlist" />
        {{ $t('Not available') }}
      </span>
    <div
      v-else
      class="d-flex btw product-card-bottom-options"
    >
      <slot name="wishlist" />
      <router-link :to="productLink" class="ml-auto">
        <button-full
          data-testid="addToCart" class="add-to-cart"
          :class="{'pre_order': !!isPreorder}"
          :aria-label="$t('Buy')"
        >
          <template v-if="!isPreorder">
            <svg class="basket--icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.5 22C11.3284 22 12 21.3284 12 20.5C12 19.6716 11.3284 19 10.5 19C9.67157 19 9 19.6716 9 20.5C9 21.3284 9.67157 22 10.5 22Z"
                fill="white"/>
              <path
                d="M16.5 22C17.3284 22 18 21.3284 18 20.5C18 19.6716 17.3284 19 16.5 19C15.6716 19 15 19.6716 15 20.5C15 21.3284 15.6716 22 16.5 22Z"
                fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M14 5H2V7H4.3L7.582 16.025C7.79362 16.6029 8.1773 17.1021 8.68134 17.4552C9.18539 17.8083 9.78556 17.9985 10.401 18H19V16H10.401C9.982 16 9.604 15.735 9.461 15.342L8.973 14H18.246C19.136 14 19.926 13.402 20.169 12.549L21.0187 9.57574C20.4013 9.84851 19.7184 10 19 10C16.2386 10 14 7.76142 14 5Z"
                    fill="white"/>
              <path d="M18.25 8.16L15.5 5.16L16.66 4L18.25 5.59L21.84 2L23 3.41L18.25 8.16Z" fill="white"/>
            </svg>
          </template>
          <span class="add-to-cart-text">{{ isPreorder ? $t('pre order') : $t('Buy') }}</span>
        </button-full>
      </router-link>
    </div>
  </div>
</template>

<script>
import ButtonFull from '../../../theme/ButtonFull';
import { ProductTile } from '@vue-storefront/core/modules/catalog/components/ProductTile.ts';

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  mixins: [ProductTile],
  components: {
    ButtonFull
  },
  computed: {
    isPreorder () {
      return this.product.stock.is_in_stock && !!this.product.preorder
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-wishlist{
  margin-top: 20px;
  .add-to-cart{
    @media (min-width: 768px){
      min-width: 131px;
    }
    width: auto;
    padding: 0 13px;
  }
}
.cart-default {
  margin-top: 20px;
  .add-to-cart{
    @media (min-width: 768px){
      min-width: 131px;
    }
    width: auto;
    padding: 0 13px;
    margin-left: auto;
  }
}
.product__icon{
  position: absolute;
  left: 28px;
}
.basket--icon{
  @media (min-width: 768px) {
    display: none;
  }
}
.add-to-cart{
  height: 32px;
  @media (max-width: 767px) {
    width: auto;
    max-width: 100%;
    margin-left: auto;
    padding: 0 13px;
    .add-to-cart-text{
      display: block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
.add-to-cart.available{
  .add-to-cart-text{
    @media (max-width: 767px) {
      display: none;
    }
  }
}
.add-to-cart.pre_order{
  background-color: #fff;
  color: #1A1919;
  border: 1px solid #23be20;
}
.product-is-not-available{
  min-height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: #000000;
  text-align: center;
  margin-top: auto;
}
</style>
