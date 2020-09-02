<template>
  <div class="wishlist cl-accent">

    <div class="row options-panel">
      <div class="col-md-12 end-xs">
        <i class="material-icons p15 pointer cl-accent" @click="closeWishlist">close</i>
      </div>
    </div>

    <div class="row middle-xs px40 wishlist-header wishlist-header-wrapper">
      <h2 v-if="productsInWishlist.length" class="cl-accent">
        {{ $t('Wishlist') }}
      </h2>
      <div v-if="productsInWishlist.length" class="wishlist-header-wrapper-icons">
        <span>
          <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0005 1.59511C8.91087 0.593213 7.48468 0.0371559 6.00447 0.0371094C5.22101 0.0379251 4.44544 0.193669 3.72241 0.495378C2.99937 0.797087 2.34313 1.2388 1.79147 1.79511C-0.561531 4.15811 -0.560531 7.85411 1.79347 10.2071L9.12547 17.5391C9.29547 17.8381 9.62347 18.0311 10.0005 18.0311C10.1553 18.0296 10.3076 17.9918 10.4451 17.9208C10.5827 17.8498 10.7016 17.7475 10.7925 17.6221L18.2075 10.2071C20.5615 7.85311 20.5615 4.15811 18.2055 1.79111C17.6541 1.23583 16.9984 0.795006 16.276 0.493993C15.5537 0.192979 14.779 0.037709 13.9965 0.0371094C12.5163 0.0373513 11.0902 0.593382 10.0005 1.59511ZM16.7915 3.20511C18.3545 4.77611 18.3555 7.23011 16.7935 8.79311L10.0005 15.5861L3.20747 8.79311C1.64547 7.23011 1.64647 4.77611 3.20547 3.20911C3.96547 2.45311 4.95947 2.03711 6.00447 2.03711C7.04947 2.03711 8.03947 2.45311 8.79347 3.20711L9.29347 3.70711C9.38626 3.80006 9.49646 3.87379 9.61778 3.9241C9.73909 3.97441 9.86914 4.00031 10.0005 4.00031C10.1318 4.00031 10.2618 3.97441 10.3832 3.9241C10.5045 3.87379 10.6147 3.80006 10.7075 3.70711L11.2075 3.20711C12.7195 1.69811 15.2815 1.70211 16.7915 3.20511Z" fill="#FFCA41"/>
          </svg>
        </span>
          <span class="icon-count-circle">
          {{ productsInWishlist.length }}
        </span>
      </div>
      <clear-wishlist-button v-if="productsInWishlist.length" @click="clearWishlist" class="end-sm clear-btn xs-hide" />
      
      <div v-if="productsInWishlist.length" class="mobile-nav-menu">
        <svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6 8C7.1 8 8 7.1 8 6C8 4.9 7.1 4 6 4C4.9 4 4 4.9 4 6C4 7.1 4.9 8 6 8ZM6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM6 16C4.9 16 4 16.9 4 18C4 19.1 4.9 20 6 20C7.1 20 8 19.1 8 18C8 16.9 7.1 16 6 16Z" fill="#BDBDBD"/>
        </svg>
        <div class="mobile-nav-menu-container">
          <div @click="clearWishlist" class="mobile-nav-menu-row">
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3.5 8.9L4.9 7.5L7 9.6L9.1 7.5L10.5 8.9L8.4 11L10.5 13.1L9.1 14.5L7 12.4L4.9 14.5L3.5 13.1L5.6 11L3.5 8.9ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z"
                  fill="#BDBDBD"/>
            </svg>
            <span>{{ $t('Clear wishlist') }}</span>
          </div>
        </div>
      </div>

    </div>

    <div v-if="!productsInWishlist.length" class="wishlist-empty-wrapper">
      <h4 v-if="!productsInWishlist.length" class="cl-accent ml30">
        {{ $t('Your wishlist is empty.') }}
      </h4>
      <div v-if="!productsInWishlist.length" class="wishlist-header-wrapper-icons">
        <span>
          <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0005 1.59511C8.91087 0.593213 7.48468 0.0371559 6.00447 0.0371094C5.22101 0.0379251 4.44544 0.193669 3.72241 0.495378C2.99937 0.797087 2.34313 1.2388 1.79147 1.79511C-0.561531 4.15811 -0.560531 7.85411 1.79347 10.2071L9.12547 17.5391C9.29547 17.8381 9.62347 18.0311 10.0005 18.0311C10.1553 18.0296 10.3076 17.9918 10.4451 17.9208C10.5827 17.8498 10.7016 17.7475 10.7925 17.6221L18.2075 10.2071C20.5615 7.85311 20.5615 4.15811 18.2055 1.79111C17.6541 1.23583 16.9984 0.795006 16.276 0.493993C15.5537 0.192979 14.779 0.037709 13.9965 0.0371094C12.5163 0.0373513 11.0902 0.593382 10.0005 1.59511ZM16.7915 3.20511C18.3545 4.77611 18.3555 7.23011 16.7935 8.79311L10.0005 15.5861L3.20747 8.79311C1.64547 7.23011 1.64647 4.77611 3.20547 3.20911C3.96547 2.45311 4.95947 2.03711 6.00447 2.03711C7.04947 2.03711 8.03947 2.45311 8.79347 3.20711L9.29347 3.70711C9.38626 3.80006 9.49646 3.87379 9.61778 3.9241C9.73909 3.97441 9.86914 4.00031 10.0005 4.00031C10.1318 4.00031 10.2618 3.97441 10.3832 3.9241C10.5045 3.87379 10.6147 3.80006 10.7075 3.70711L11.2075 3.20711C12.7195 1.69811 15.2815 1.70211 16.7915 3.20511Z" fill="#FFCA41"/>
          </svg>
        </span>
      </div>
    </div>

    <div v-if="!productsInWishlist.length" class="ml30 wishlist-empty-wrapper-text">
      {{ $t("Don't hesitate and") }}
      <router-link :to="localizedRoute('/')">
        {{ $t('browse our catalog') }}
      </router-link>
      {{ $t('to find something beautiful for You!') }}
    </div>

    <div class="wishlist-body-wrapper">
      <ul class="products">
        <product v-for="wishlistProduct in productsInWishlist" :key="wishlistProduct.id" :product="wishlistProduct" />
      </ul>
    </div>

    <div v-if="productsInWishlist.length" class="wishlist-footer-wrapper">
      <div class="wishlist-footer-wrapper-row footer-info">
        <span class="wishlist-footer-wrapper-row-count-by-amount">
          {{ productsInWishlist.length }}&nbsp;
          <span v-if="productsInWishlist.length <= 1"> {{ $t("the_product_for_price") }}</span>
          <span v-if="productsInWishlist.length > 1 && productsInWishlist.length < 5"> {{ $t("product_for_price") }}</span>
          <span v-if="productsInWishlist.length > 4"> {{ $t("products_for_price") }}</span>
          :
        </span>
        <span class="wishlist-footer-wrapper-row-total-amount">
          {{ totalAmount | price(storeView) }}
        </span>
      </div>
      <div class="wishlist-footer-wrapper-row footer-options">
        <span class="wishlist-footer-wrapper-row-add-all-products" @click="addAllProductsToCart">
          {{ $t('Add all products to cart') }}
        </span>

        <button
          class="wishlist-footer-wrapper-row-make-an-order-btn"
          @click="redirectionToCheckout"
        >
          {{ $t('Go to checkout') }}
        </button>
      </div>
    </div>
  </div>

</template>

<script>
import Wishlist from '@vue-storefront/core/compatibility/components/blocks/Wishlist/Wishlist';
import Product from 'theme/components/core/blocks/Wishlist/Product';
import ClearWishlistButton from 'theme/components/core/blocks/Wishlist/ClearWishlistButton';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import ButtonFull from 'theme/components/theme/ButtonFull';
import { notifications } from '@vue-storefront/core/modules/cart/helpers';

export default {
  props: {
    product: {
      type: Object,
      required: false,
      default: () => { }
    }
  },
  components: {
    Product,
    ClearWishlistButton,
    ButtonFull
  },
  computed: {
    storeView () {
      return currentStoreView()
    },
    totalAmount() {

      let totalAmount = 10;

      this.productsInWishlist.forEach((item) => {
        totalAmount = totalAmount + item.price_incl_tax;
      });

      return totalAmount;
    }
  },
  methods: {
    async addAllProductsToCart() {
      this.closeWishlist();
      try {
        const diffLog = await this.$store.dispatch('cart/addItems', { productsToAdd: this.productsInWishlist })
        diffLog.clientNotifications.forEach(notificationData => {
          this.notifyUser(notificationData)
        })
      } catch (message) {
        this.notifyUser(notifications.createNotification({ type: 'error', message }))
      }
      console.log('END END END');
    },
    notifyUser (notificationData) {
      this.$store.dispatch('notification/spawnNotification', notificationData, { root: true })
    },
    closeWishlist () {
      this.$store.commit('ui/setWishlist', false)
    },
    redirectionToCheckout () {
      this.closeWishlist();
      this.$router.push('checkout')
    },
    clearWishlist () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('Are you sure you would like to remove all the items from the wishlist?'),
        action1: { label: this.$t('OK'),
          action: () => {
            this.$store.dispatch('wishlist/clear')
          }
        },
        action2: { label: this.$t('Cancel'), action: 'close' },
        hasNoTimeout: true
      })
    }
  },
  mixins: [Wishlist]
}
</script>

<style lang="scss">
  .xs-hide{
    @media (max-width : 549px) {
      display: none;
    }
  }
  .mobile-nav-menu{
    margin-left: auto;
    &:hover{
      .mobile-nav-menu-container{
        display: block;
      }
    }
    @media (min-width : 550px){
      display: none;
    }
    @media (max-width : 549px){
      position: relative;
      cursor: pointer;
      &-container{
        display: none;
        right: 0;
        top: 100%;
        position: absolute;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.14);
        background-color: #fff;
        padding: 8px 0;
        width: 242px;
        border-radius: 4px;
        z-index: 1;
      }
      &-row{
        display: flex;
        padding: 7px 21px;
        svg{
          margin-right: 25px;
          width: 20px;
        }
        span{
          font-family: DIN Pro;
          font-style: normal;
          font-weight: 0;
          font-size: 14px;
          line-height: 24px;
          color: #5F5E5E;
        }
      }
    }
  }
</style>
<style lang="scss" scoped>
@import "~theme/css/animations/transitions";
  i {
    opacity: 0.6;
    &:hover {
      opacity: 1;
    }
  }
  @media (min-width : 550px){
    .wishlist {
      &-body-wrapper {
        .products {
          padding: 0 32px;
        }
      }
    }
  }

  @media (max-width: 549px) {

    .wishlist {
      width: 100% !important;
      &-header-wrapper {
        h2 {
          margin: 10px 0;
        }
        .clear-btn {
          margin-bottom: 10px;
        }
      }

      &-body-wrapper {

        .products {
          margin: 0;
          padding: 0 16px;
        }
      }

      &-footer {
        &-wrapper {
          &-row {
            &.footer-info {
              padding: 0 32px;
            }

            &.footer-options {
              flex-direction: column;
            }

            &-add-all-products {
              margin-bottom: 10px !important;
              justify-content: center;
            }
            &-make-an-order-btn {
              justify-content: center;
            }
          }
        }
      }
    }
  }
  .wishlist {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    &-empty-wrapper {
      display: flex;
      h4 {
        font-family: DIN Pro;
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 30px;
        color: #1A1919;
      }
      &-text {
        font-family: DIN Pro;
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 24px;
        color: #1A1919;
      }
    }
    .options-panel {
      position: absolute;
      padding: 0;
      margin: 0;
      width: 100%;

      div {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0;
        margin: 0;

        i {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 50px;
          padding: 0;
          margin: 0;
          background-color: #F9F9F9;
          color: #BDBDBD;
        }
      }
    }
    &-header-wrapper {
      margin: 0;
      padding: 56px 32px 0 32px;
      @media (max-width : 549px){
        padding: 56px 16px 0;
      }
      h2 {
        margin: 5px 0 13px;
        font-family: DIN Pro;
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        line-height: 30px;
        color: #1A1919;
      }
      &-icons {
        margin: 0 16px;
        display: flex;
        align-items: center;
        span {
          display: flex;
        }
        &>svg{
          padding: 3px 0 2px;
        }
        .icon-count-circle {
          background-color: #23BE20;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          margin-left: 8px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: DIN Pro;
          font-style: normal;
          font-weight: 600;
          font-size: 12px;
          line-height: 13px;
          color: white;
        }
      }
      .clear-btn {
        @media (max-width : 600px){
          position: absolute;
          top: 16px;
          left: 16px;
        }
        margin-left: auto;
      }
    }
    &-footer-wrapper {
      margin-top: auto;
      box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.25);
      &-row {
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 12px 32px;
        box-sizing: border-box;

        &-count-by-amount {
          font-family: DIN Pro;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 16px;
          color: #5F5E5E;

          display: flex;
          align-items: center;
        }

        &-total-amount {
          font-family: DIN Pro;
          font-style: normal;
          font-weight: 600;
          font-size: 24px;
          line-height: 30px;
          color: #1A1919;

          display: flex;
          align-items: center;
        }

        &-add-all-products {
          font-family: DIN Pro;
          font-style: normal;
          font-weight: 500;
          font-size: 14px;
          line-height: 15px;
          color: #1A1919;

          display: flex;
          align-items: center;

          border-bottom: 1px dashed #1A1919;
          box-sizing: border-box;

          height: 25px;
          margin: auto 0;

          cursor: pointer;
        }

        &-make-an-order-btn {
          font-family: DIN Pro;
          font-style: normal;
          font-weight: 600;
          font-size: 15px;
          line-height: 16px;
          display: flex;
          align-items: center;
          text-align: center;
          color: #FFFFFF;
          background: #23BE20;
          border-radius: 4px;
          padding: 12px 40px;
          border: none;
          display: flex;
          align-items: center;
        }
      }
    }
  }
</style>
