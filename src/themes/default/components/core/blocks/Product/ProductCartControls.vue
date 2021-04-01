<template>
  <div class="product-card-bottom-options">
    <router-link :to="productLink" class="ml-auto">
      <button-full
        data-testid="addToCart" class="add-to-cart"
        :class="{
          'pre_order': isPreorder,
          'not-available': isNotAvailable || isComingSoon,
          'in-cart': isProductInCart
        }"
        :aria-label="buttonName"
      >
        <svg v-show="!isProductInCart" class="basket-icon" width="24" height="24" viewBox="0 0 24 24" fill="#23BE20;" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 4H2V6H4.3L7.582 15.025C7.79362 15.6029 8.1773 16.1021 8.68134 16.4552C9.18539 16.8083 9.78556 16.9985 10.401 17H19V15H10.401C9.982 15 9.604 14.735 9.461 14.342L8.973 13H18.246C19.136 13 19.926 12.402 20.169 11.549L21.962 5.275C22.0039 5.12615 22.0109 4.96962 21.9823 4.81763C21.9537 4.66565 21.8904 4.52234 21.7973 4.39889C21.7041 4.27544 21.5837 4.1752 21.4454 4.106C21.3071 4.0368 21.1546 4.00053 21 4ZM18.246 11H8.246L6.428 6H19.675L18.246 11Z" fill="#23BE20"/>
          <path d="M10.5 21C11.3284 21 12 20.3284 12 19.5C12 18.6716 11.3284 18 10.5 18C9.67157 18 9 18.6716 9 19.5C9 20.3284 9.67157 21 10.5 21Z" fill="#23BE20"/>
          <path d="M16.5 21C17.3284 21 18 20.3284 18 19.5C18 18.6716 17.3284 18 16.5 18C15.6716 18 15 18.6716 15 19.5C15 20.3284 15.6716 21 16.5 21Z" fill="#23BE20"/>
        </svg>
        <svg v-show="isProductInCart" class="basket-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.5 22C11.3284 22 12 21.3284 12 20.5C12 19.6716 11.3284 19 10.5 19C9.67157 19 9 19.6716 9 20.5C9 21.3284 9.67157 22 10.5 22Z" fill="#23BE20"/>
          <path d="M16.5 22C17.3284 22 18 21.3284 18 20.5C18 19.6716 17.3284 19 16.5 19C15.6716 19 15 19.6716 15 20.5C15 21.3284 15.6716 22 16.5 22Z" fill="#23BE20"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M14 5H2V7H4.3L7.582 16.025C7.79362 16.6029 8.1773 17.1021 8.68134 17.4552C9.18539 17.8083 9.78556 17.9985 10.401 18H19V16H10.401C9.982 16 9.604 15.735 9.461 15.342L8.973 14H18.246C19.136 14 19.926 13.402 20.169 12.549L21.0187 9.57574C20.4013 9.84851 19.7184 10 19 10C16.2386 10 14 7.76142 14 5Z" fill="#23BE20"/>
          <path d="M18.25 8.16L15.5 5.16L16.66 4L18.25 5.59L21.84 2L23 3.41L18.25 8.16Z" fill="#23BE20"/>
        </svg>
        <span class="add-to-cart-text">{{ buttonName }}</span>
        <svg v-show="isProductInCart" class="check-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.50013 13.4749L4.02513 9.99987L2.8418 11.1749L7.50013 15.8332L17.5001 5.8332L16.3251 4.6582L7.50013 13.4749Z" fill="white"/>
        </svg>
      </button-full>
    </router-link>
  </div>
</template>

<script>
import ButtonFull from '../../../theme/ButtonFull';
import { ProductTile } from '@vue-storefront/core/modules/catalog/components/ProductTile.ts';
import { mapGetters } from 'vuex';
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  mixins: [ProductTile],
  components: {
    ButtonFull,
  },
  methods: {
    showModalCredits () {
      this.$bus.$emit('modal-show', 'modal-credits')
    }
  },
  computed: {
    ...mapGetters({
      getBanks: 'themeCredit/getBanks',
      productsInCart: 'cart/getCartItems'
    }),
    isPreorder () {
      return this.product.stock.is_in_stock && !!this.product.preorder
    },
    isNotAvailable () {
      return !this.product.stock.is_in_stock && !this.product.preorder
    },
    isComingSoon () {
      return !this.product.stock.is_in_stock && !!this.product.coming_soon
    },
    isProductInCart () {
      return this.productsInCart && this.productsInCart.find(it => it.sku === this.product.sku)
    },
    buttonName () {
      if (this.isPreorder) {
        return this.$t('pre order')
      } else if (this.isComingSoon) {
        return this.$t('coming_soon')
      } else if (this.isNotAvailable) {
        return this.$t('Not available')
      } else if (this.isProductInCart) {
        return this.$t('In cart')
      } else {
        return this.$t('Buy')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-default {
  margin-top: 20px;
}

.basket-icon {
  display: none;
}

.button-full.add-to-cart {
  min-width: 0;
  height: 32px;
  max-width: 131px;
  width: 100%;
  margin-left: auto;

  &.pre_order {
    background-color: #fff;
    color: #1A1919;
    border: 1px solid #23be20;
    max-width: 100%;
    width: 100%;

    &:hover {
      background-color: #23BE20;
      color: #fff;
    }

    &:active {
      background-color: #1fa71c;
    }
  }

  &.not-available {
    background: none;

    .add-to-cart-text  {
      position: relative;
      color: #000000;
      font-family: DIN Pro;
      font-weight: 600;
      font-size: 14px;
      line-height: 16px;

       &:before{
        position: absolute;
        content: '';
        width: 100%;
        height: 8px;
        bottom: 0px;
        left: -4px;
        background-color: #1A1919;
        opacity: 0.12;
      }
    }
  }
}

.add-to-cart-text {
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: color ease-in 0.2s;
  overflow: hidden;
}

.check-icon {
  margin-left: 8px;
}

@media (max-width: 576px) {
  .button-full.add-to-cart {
    width: auto;
    background: none;

    .check-icon {
      display: none;
    }

    &:not(.pre_order):not(.not-available) {
      .basket-icon {
        display: block;
      }

      .add-to-cart-text {
        display: none!important;
      }
    }
  }
}
.wishlist-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
