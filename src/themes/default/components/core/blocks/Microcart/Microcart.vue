<template>
  <div
    class="microcart cl-accent relative"
    :class="[productsInCart.length ? 'bg-cl-secondary' : 'bg-cl-primary']"
    data-testid="microcart"
  >
    <transition name="fade">
      <div v-if="isEditMode" class="overlay" @click="closeEditMode" />
    </transition>

    <button
      type="button"
      class="p0 brdr-none bg-cl-transparent close"
      @click="closeMicrocartExtend"
      data-testid="closeMicrocart"
    >
      <i class="material-icons py20 cl-accent">
        close
      </i>
    </button>

    <div class="row middle-xs bg-cl-primary top-sm px40 actions">
      <div class="col-xs-12 col-sm microcart-top">
        <h2 class="microcart-top-title cl-accent" v-if="productsInCart.length">
          {{ $t('Your cart') }}
        </h2>

        <h2 class="microcart-top-title cl-accent" v-if="!productsInCart.length">
          {{ $t('Your shopping cart is empty.') }}
        </h2>

        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 4H2V6H4.3L7.582 15.025C7.79362 15.6029 8.1773 16.1021 8.68134 16.4552C9.18539 16.8083 9.78556 16.9985 10.401 17H19V15H10.401C9.982 15 9.604 14.735 9.461 14.342L8.973 13H18.246C19.136 13 19.926 12.402 20.169 11.549L21.962 5.275C22.0039 5.12615 22.0109 4.96962 21.9823 4.81763C21.9537 4.66565 21.8904 4.52234 21.7973 4.39889C21.7041 4.27544 21.5837 4.1752 21.4454 4.106C21.3071 4.0368 21.1546 4.00053 21 4ZM18.246 11H8.246L6.428 6H19.675L18.246 11Z" fill="#23BE20"/>
          <path d="M10.5 21C11.3284 21 12 20.3284 12 19.5C12 18.6716 11.3284 18 10.5 18C9.67157 18 9 18.6716 9 19.5C9 20.3284 9.67157 21 10.5 21Z" fill="#23BE20"/>
          <path d="M16.5 21C17.3284 21 18 20.3284 18 19.5C18 18.6716 17.3284 18 16.5 18C15.6716 18 15 18.6716 15 19.5C15 20.3284 15.6716 21 16.5 21Z" fill="#23BE20"/>
        </svg>

        <span class="microcart-top-total-count" v-if="productsInCart.length">
          {{ totalProducts }}
        </span>

        <span 
          v-if="productsInCart.length"
          @click="clearCart()"
          class="microcart-top-remove"> 
          {{ $t('Remove all') }}
        </span>
        <!--<div class="mt0 end-sm clearcart-col">-->
          <!--<clear-cart-button-->
              <!--v-if="productsInCart.length"-->
              <!--@click.native="clearCart"-->
          <!--/>-->
        <!--</div>-->

      </div>
<!--      <div class="col-xs-12 col-sm mt35 mb35 mt0 end-sm clearcart-col">-->
<!--        <clear-cart-button-->
<!--          v-if="productsInCart.length"-->
<!--          @click.native="clearCart"-->
<!--        />-->
<!--      </div>-->
    </div>

<!--    <h4 v-if="!productsInCart.length" class="cl-accent ml30">-->
<!--      {{ $t('Ваша корзина пуста.') }}-->
<!--    </h4>-->

<!--    <div v-if="!productsInCart.length" class="ml30" @click="closeMicrocartExtend">-->
<!--      {{ $t("Don't hesitate and") }}-->
<!--      <router-link :to="localizedRoute('/')">-->
<!--        {{ $t('browse our catalog') }}-->
<!--      </router-link>-->
<!--      {{ $t('to find something beautiful for You!') }}-->
<!--    </div>-->
    <div  v-if="!productsInCart.length" class="row middle-xs bg-cl-primary top-sm px40">
      <div class="col-xs-12 col-sm">
        <p>{{ $t('Add your favorite products to the basket!') }}</p>
      </div>
    </div>
    <div class="microcart-scroll-content px40" v-if="productsInCart.length">
      <ul v-if="productsInCart.length" class="bg-cl-primary m0 products">
        <product v-for="product in productsInCart" :key="product.server_item_id || product.id" :product="product" />
      </ul>
      <promo-code v-if="OnlineOnly" />
      <!-- <div >
        <div class="coupon-input">
          <label class="h6 cl-secondary">{{ $t('Enter promotional code') }}</label>
          <base-input type="text" id="couponinput" class="promocode-input" :autofocus="true" v-model.trim="couponCode" @keyup.enter="setCoupon" />
        </div>
        <button-outline color="dark" class="promocode-btn" :disabled="!couponCode" @click.native="setCoupon">
          {{ $t('Add discount code') }}
        </button-outline>
      </div> -->
    </div>

    <!--<microcart-buttom v-if="productsInCart.length" />-->

    <div v-if="productsInCart.length" class="summary cl-accent px40 serif">
      <!-- <h3 class="m0 pt40 mb30 weight-400 summary-heading">
        {{ $t('Shopping summary') }}
      </h3>
      <div v-for="(segment, index) in totals" :key="index" class="row py20" v-if="segment.code !== 'grand_total'">
        <template v-if="segment.code !== 'tax'">
          <div class="col-xs" >
            {{ segment.title }}
            <button v-if="appliedCoupon && segment.code === 'discount'" type="button" class="p0 brdr-none bg-cl-transparent close delete-button ml10" @click="clearCoupon">
              <i class="material-icons cl-accent">
                close
              </i>
            </button>
          </div>
          <div v-if="segment.value != null" class="col-xs align-right">
            {{ segment.value | price(storeView) }}
          </div>
        </template>
      </div> -->
      <!--<div class="row py20">-->
      <!--<div v-if="OnlineOnly && !addCouponPressed" class="col-xs-12">-->
      <!--<button-->
      <!--class="p0 brdr-none serif fs-medium-small cl-accent bg-cl-transparent"-->
      <!--type="button"-->
      <!--@click="addDiscountCoupon"-->
      <!--&gt;-->
      <!--{{ $t('Add a discount code') }}-->
      <!--</button>-->
      <!--</div>-->
      <!--<div v-if="OnlineOnly && addCouponPressed" class="col-xs-12 pt30 coupon-wrapper">-->
      <!--<div class="coupon-input">-->
      <!--<label class="h6 cl-secondary">{{ $t('Discount code') }}</label>-->
      <!--<base-input type="text" id="couponinput" :autofocus="true" v-model.trim="couponCode" @keyup.enter="setCoupon" />-->
      <!--</div>-->
      <!--<button-outline color="dark" :disabled="!couponCode" @click.native="setCoupon">-->
      <!--{{ $t('Add discount code') }}-->
      <!--</button-outline>-->
      <!--</div>-->
      <!--</div>-->

      <div class="row weight-700 middle-xs prices" v-for="(segment, index) in totals" :key="index" v-if="segment.code === 'grand_total'">
        <div class="col-xs h4 total-price-label">
          {{ segment.title }}
        </div>
        <div class="col-xs align-right h2 total-price-value">
          {{ segment.value | price(storeView) }}
        </div>
      </div>
    </div>

    <div
      class="row px40 middle-xs actions actions-button"
      v-if="productsInCart.length && !isCheckoutMode"
    >
      <!-- <div class="col-xs-12 col-sm-6 first-sm">
        <router-link :to="localizedRoute('/')" class="no-underline cl-secondary link">
          <span @click="closeMicrocartExtend">
            {{ $t('Return to shopping') }}
          </span>
        </router-link>
      </div> -->
      <div class="col-xs-12 first-xs col-sm-6 end-sm">
        <button-outline
          class="credit-button"
        >
          {{ $t('Buy in credit') }}
        </button-outline>
        <!-- <instant-checkout v-if="isInstantCheckoutRegistered" class="no-outline button-full block brdr-none w-100 px10 py20 bg-cl-mine-shaft :bg-cl-th-secondary ripple weight-400 h4 cl-white sans-serif fs-medium mt20" /> -->
      </div>
      <div class="col-xs-12 first-xs col-sm-6 end-sm">
        <button-full
          :link="{ name: 'checkout' }"
          @click.native="closeMicrocartExtend"
          class="checkout-button"
        >
          {{ $t('Go to checkout') }}
        </button-full>
        <!-- <instant-checkout v-if="isInstantCheckoutRegistered" class="no-outline button-full block brdr-none w-100 px10 py20 bg-cl-mine-shaft :bg-cl-th-secondary ripple weight-400 h4 cl-white sans-serif fs-medium mt20" /> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import i18n from '@vue-storefront/i18n'
import { isModuleRegistered } from '@vue-storefront/core/lib/modules'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

import VueOfflineMixin from 'vue-offline/mixin'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import InstantCheckout from 'src/modules/instant-checkout/components/InstantCheckout.vue'
import { registerModule } from '@vue-storefront/core/lib/modules'

import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import ClearCartButton from 'theme/components/core/blocks/Microcart/ClearCartButton'
import ButtonFull from 'theme/components/theme/ButtonFull'
import ButtonOutline from 'theme/components/theme/ButtonOutline'
import Product from 'theme/components/core/blocks/Checkout/Product'
import EditMode from './EditMode'
import { InstantCheckoutModule } from 'src/modules/instant-checkout'
import PromoCode from "./PromoCode";
import MicrocartButtom from "./MicrocartButtom";

export default {
  components: {
    MicrocartButtom,
    PromoCode,
    Product,
    ClearCartButton,
    ButtonFull,
    ButtonOutline,
    BaseInput,
    InstantCheckout
  },
  mixins: [
    VueOfflineMixin,
    EditMode,
    onEscapePress
  ],
  data () {
    return {
      addCouponPressed: false,
      couponCode: '',
      componentLoaded: false,
      isInstantCheckoutRegistered: isModuleRegistered('InstantCheckoutModule')
    }
  },
  props: {
    isCheckoutMode: {
      type: Boolean,
      required: false,
      default: () => false
    }
  },
  beforeCreate () {
    registerModule(InstantCheckoutModule)
  },
  mounted () {
    this.$nextTick(() => {
      this.componentLoaded = true
    })
  },
  computed: {
    ...mapGetters({
      productsInCart: 'cart/getCartItems',
      appliedCoupon: 'cart/getCoupon',
      totals: 'cart/getTotals',
      isOpen: 'cart/getIsMicroCartOpen',
      totalProducts: 'cart/getItemsTotalQuantity'
    }),
    storeView () {
      return currentStoreView()
    }
  },
  methods: {
    ...mapActions({
      applyCoupon: 'cart/applyCoupon'
    }),
    addDiscountCoupon () {
      this.addCouponPressed = true
    },
    clearCoupon () {
      this.$store.dispatch('cart/removeCoupon')
      this.addCouponPressed = false
    },
    toggleMicrocart () {
      this.$store.dispatch('ui/toggleMicrocart')
    },
    async setCoupon () {
      const couponApplied = await this.applyCoupon(this.couponCode)
      this.addCouponPressed = false
      this.couponCode = ''
      if (!couponApplied) {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'warning',
          message: i18n.t("You've entered an incorrect coupon code. Please try again."),
          action1: { label: i18n.t('OK') }
        })
      }
    },
    closeMicrocartExtend () {
      this.toggleMicrocart()
      this.$store.commit('ui/setSidebar', false)
      this.addCouponPressed = false
    },
    onEscapePress () {
      this.$store.dispatch('ui/closeMicrocart')
    },
    clearCart () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: i18n.t('Are you sure you would like to remove all the items from the shopping cart?'),
        action1: { label: i18n.t('Cancel'), action: 'close' },
        action2: { label: i18n.t('OK'),
          action: async () => {
            // We just need to clear cart on frontend and backend.
            // but cart token can be reused
            await this.$store.dispatch('cart/clear', { disconnect: false })
          }
        },
        hasNoTimeout: true
      })
    }
  }
}
</script>

<style lang="scss">
  .microcart {
    display: flex;
    flex-direction: column;

    .promocode-input {
      input {
        background: #FFFFFF;
        border: 1px solid #E0E0E0;
        box-sizing: border-box;
        border-radius: 4px;
        padding: 0 10px;
        height: 45px;
      }
    }

    .summary {
      margin-top: auto;
    }

    .promocode-btn {
      margin-bottom: -6px;
      border: 1px solid #23BE20;
      box-sizing: border-box;
      border-radius: 4px;
      height: 45px;
      width: 100%;
      background-color: white;
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 16px;
      color: #1A1919;
      &:hover {
        background: #23BE20;
        border-color: #23BE20;
        color: #ffffff;
      }
    }
    .credit-button {
      width: 100%;
      box-sizing: border-box;
      padding: 12px 0;
      text-align: center;
      color: #1A1919;
      font-weight: 500;
      display: block;
      font-family: DIN Pro;
      font-style: normal;
      color: #1A1919;
      font-size: 15px;
      line-height: 16px;
      background: #FFFFFF;
      border: 1px solid #23BE20;
      box-sizing: border-box;
      border-radius: 4px;

      &:hover {
        background: #23BE20;
        border-color: #23BE20;
        color: #ffffff;
      }
    }

    .checkout-button {
      font-size: 15px; 
    }
    .actions-button {
      padding-bottom: 32px;
    }
    .prices {
      margin-bottom: 24px;
    }
  }
</style>

<style lang="scss" scoped>
  @import "~theme/css/animations/transitions";
  .microcart {
    /*&-scroll-content {*/
    overflow-y: auto;
    overflow-x: hidden;
    /*}*/

    height: 100%;
    background-color: white;
    box-sizing: border-box;

    @media (max-width: 549px) {
      width: 100%;
    }

    .close {
      position: absolute;
      right: 0;
      top: 0;

      i {
        opacity: 0.6;
        padding: 13px;
        margin: 0;
      }

      &:hover,
      &:focus {
        i {
          opacity: 1;
        }
      }
    }

    &-top {
      display: flex;
      align-items: center;
      padding-top: 50px;
      padding-bottom: 30px;

      &-title {
        font-family: DIN Pro;
        font-style: normal;
        font-size: 18px;
        line-height: 18px;
        display: inline-block;
        margin: 0 15px 0 0;
      }

      svg {
        margin-right: 10px;
        width: 24px;
        height: 24px;
      }

      &-total-count {
        font-family: DIN Pro;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 13px;

        background-color: #22be21;
        padding: 5px;
        width: 24px;
        height: 24px;
        color: white;
        display: inline-flex;
        justify-content: center;
        cursor: pointer;
        align-items: center;
        border-radius: 50%;
      }

      &-remove {
        margin-left: auto;
        cursor: pointer;
        font-family: DIN Pro;
        font-style: normal;
        font-size: 13px;
        line-height: 16px;
        color: #1A1919;
        padding-bottom: 4px;
        border-bottom: 1px dashed #1A1919;;
      }
    }
  }

  .mt0 {
    @media (max-width: 767px) {
      margin-top: 0;
    }
  }

  .clearcart {
    &-col {
      display: flex;
      align-self: center;
    }
  }

  .products {
    padding-left: 0;
    @media (max-width: 767px) {
      padding: 30px 15px;
    }
  }

  .actions {
    // @media (max-width: 767px) {
    //   padding: 0 15px;
    // }
    .link {
      @media (max-width: 767px) {
        display: flex;
        justify-content: center;
        padding: 20px 70px;
        &.checkout {
          margin-top: 55px;
          padding: 0;
        }
      }
    }
  }

  .summary {
    @media (max-width: 767px) {
      padding:  0 15px;
      font-size: 12px;
    }
  }

  .summary-heading {
    @media (max-width: 767px) {
      font-size: 18px;
    }
  }

  .total-price-label {
    font-family: 'DIN Pro';
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 30px;
    color: #19223D;
    @media (max-width: 767px) {
      font-size: 18px;
    }
  }

  .total-price-value {
    font-family: 'DIN Pro';
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 30px;
    text-align: right;
    color: #19223D;
    @media (max-width: 767px) {
      font-size: 24px;
    }
  }

  .delete-button {
    vertical-align: middle;
  }

  .coupon-wrapper {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #E0E0E0;

    .button-outline {
      text-transform: inherit;
      width: 50%;
    }

    .coupon-input {
      margin-right: 20px;
      width: 100%;

      label {
        font-family: 'DIN Pro';
        font-style: normal;
        font-weight: 100;
        font-size: 13px;
        line-height: 16px;
        padding-bottom: 4px;
        margin-bottom: 10px;
        border-bottom: 1px dashed #1A1919;
        color: #1A1919;
        display: inline-block;
      }
    }
  }

  .overlay {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    z-index: 0;
    height: 100%;
    background:rgba(0, 0, 0, 0.4);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

<style lang="scss" scoped>
  .microcart-buttom {
    &-wrapper {
      position: absolute;
      background-color: white;
      bottom: 0;
      box-sizing: border-box;
      padding-bottom: 20px;
    }
    &-top-row {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: bold;
      font-size: 24px;
      line-height: 30px;
      margin-bottom: 10px;

      display: flex;
      justify-content: space-between;
    }
    &-body-row {
      &-left {
        button {
          margin-bottom: 10px;
          padding: 10px 20px;
          height: 45px;

          background: #FFFFFF;
          border: 1px solid #23BE20;
          box-sizing: border-box;
          border-radius: 4px;

          font-family: DIN Pro;
          font-style: normal;
          font-weight: bold;
          font-size: 15px;
          line-height: 16px;
          align-items: center;
          text-align: center;
        }
      }
      &-right {
        button {
          padding: 11px 20px;
          height: 45px;

          border: none;
          box-sizing: border-box;
          background: #23BE20;
          border-radius: 4px;
          font-family: DIN Pro;
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          line-height: 16px;
          align-items: center;
          text-align: center;
        }
      }
    }
  }
</style>
