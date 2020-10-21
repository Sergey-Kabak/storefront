<template>
  <div
    class="microcart cl-accent relative"
    :class="{'is-empty': !productsInCart.length}"
    data-testid="microcart"
  >
    <div class="scroll-bar">
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
      <div class="microcart-top">
        <div class="microcart-left">
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
            {{ countProducts }}
          </span>
          <more-icon class="more" v-if="productsInCart.length">
            <div class="more-item" @click="clearCart()">
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3.5 8.9L4.9 7.5L7 9.6L9.1 7.5L10.5 8.9L8.4 11L10.5 13.1L9.1 14.5L7 12.4L4.9 14.5L3.5 13.1L5.6 11L3.5 8.9ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z" fill="#BDBDBD"/>
              </svg>
              <span>{{ $t('Remove all') }}</span>
            </div>
          </more-icon>
        </div>
        <div class="microcart-right" v-if="productsInCart.length">
          <button-text @click.native="clearCart()">{{ $t('Remove all') }}</button-text>
        </div>
      </div>
      <div class="microcart-empty" v-if="!productsInCart.length">
        <p>{{ $t('Add your favorite products to the basket!') }}</p>
      </div>
      <div class="microcart-scroll-content" v-if="productsInCart.length">
        <ul v-if="productsInCart.length" class="products">
          <product v-for="product in productsInCart" :key="product.server_item_id || product.id" :product="product" />
        </ul>
        <promo-code
          :isActive.sync="isShowPromocode"
          class="promo-code"
          v-if="OnlineOnly"
        />
      </div>
      <div v-if="productsInCart.length" class="summary cl-accent serif microcart-footer">
        <total-price />
        <div
          class="actions-button"
          v-if="productsInCart.length && !isCheckoutMode"
        >
          <!-- <button-outline
            class="button"
            disabled
          >
            {{ $t('Buy in credit') }}
          </button-outline> -->
          <button-full
            :link="{ name: 'checkout' }"
            class="button"
            @click.native="closeMicrocartExtend"
          >
            {{ $t('Go to checkout') }}
          </button-full>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex';
import {
  isModuleRegistered,
  registerModule
} from '@vue-storefront/core/lib/modules';
import i18n from '@vue-storefront/i18n';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';

import VueOfflineMixin from 'vue-offline/mixin';
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress';

import ButtonFull from 'theme/components/theme/ButtonFull';
import ButtonOutline from 'theme/components/theme/ButtonOutline';
import ButtonText from 'theme/components/theme/ButtonText';
import Product from 'theme/components/core/blocks/Checkout/Product';
import EditMode from './EditMode';
import { InstantCheckoutModule } from 'src/modules/instant-checkout';
import PromoCode from './PromoCode';
import MoreIcon from 'theme/components/core/MoreIcon';
import TotalPrice from 'theme/components/core/TotalPrice';

export default {
  components: {
    PromoCode,
    Product,
    ButtonFull,
    ButtonOutline,
    ButtonText,
    MoreIcon,
    TotalPrice
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
      isInstantCheckoutRegistered: isModuleRegistered('InstantCheckoutModule'),
      isShowPromocode: false
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
    },
    countProducts () {
      return this.productsInCart.reduce((acc, it) => acc + it.qty, 0)
    },
    isPromocodeActive () {
      return this.totals.find(it => it.code === 'discount')
    }
  },
  methods: {
    clearCoupon () {
      this.$store.dispatch('cart/removeCoupon')
      this.addCouponPressed = false
    },
    toggleMicrocart () {
      this.$store.dispatch('ui/toggleMicrocart')
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

<style lang="scss" scoped>
  @import "~theme/css/animations/transitions";
  .microcart {
    min-height: 100vh;
    height: 100%;
    &-footer{
      @media (max-width: 550px){
        position: fixed;
        bottom: 0;
        right: 0;
        width: 100%;
        box-sizing: border-box;
        background: #fff;
        margin-top: 0;
      }
    }
    .summary {
      box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.25);
      margin-top: auto;
      padding: 32px;
    }

    .close {
      position: absolute;
      right: 0;
      top: 0;
      background-color: #F9F9F9;

      i {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 14px;
        height: 14px;
        opacity: 0.6;
        padding: 18px;
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
      padding: 50px 32px 0 32px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 32px;

      &-title {
        display: inline-block;
        margin: 0 16px 0 0;
        font-family: DIN Pro;
        font-style: normal;
        font-weight: 600;
        font-size: 24px;
        color: #1A1919;
        line-height: 30px;
      }

      svg {
        margin-right: 8px;
        width: 24px;
        height: 24px;
      }

      &-total-count {
        box-sizing: border-box;
        font-family: DIN Pro;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
        line-height: 13px;
        background-color: #22be21;
        padding: 5px;
        min-width: 24px;
        min-height: 24px;
        color: white;
        display: inline-flex;
        justify-content: center;
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

    &-scroll-content {
      padding: 0 32px;
    }

    &-left {
      display: flex;
      align-items: center;
    }
  }

  .microcart-empty {
    padding: 0 32px;
    p {
      font-family: DIN Pro;
      font-style: normal;
      font-size: 15px;
      line-height: 24px;
      color: #1A1919;
      margin: 0;
    }
  }

  .scroll-bar {
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    transform: translateZ(0);
  }

  .actions-button {
    justify-content: space-between;
    display: flex;
    min-height: 40px;

    .button {
      box-sizing: border-box;
      max-width: 100%;

      // &:first-child {
      //   margin-right: 2%;
      // }
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
    margin: 0;
  }

  .promo-code {
    margin-bottom: 20px;
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

  .more {
    display: none;
  }

  @media (max-width: 500px) {
    .microcart {
      width: 100%;

      &-left {
        padding: 9px 0px;
        width: 100%;
      }

      &-top {
        padding: 56px 16px 0px 16px;
        flex-direction: column-reverse;
        align-items: flex-start;
        margin-bottom: 16px;
      }

      .more {
        margin-left: auto;

        &-item {
          padding: 12px 16px;
          display: flex;
          align-items: center;

          svg {
            margin-right: 20px;
          }

          span {
            font-family: DIN Pro;
            font-style: normal;
            font-size: 14px;
            line-height: 24px;
            color: #5F5E5E;
          }
        }
      }

      &-scroll-content {
        padding: 0 16px;
      }

      &-right {
        display: none;
      }

      .close {
        i {
          padding: 21px;
        }
      }

      .summary {
        padding: 16px;
      }

      &-empty {
        padding: 0 16px;
      }

      .more {
        display: block;
      }
    }

    ::v-deep .promo-code {

      &-left {
        margin-right: 16px;
      }

      &-input {
        min-width: 174px;
      }
    }

    ::v-deep .product  {
      flex-direction: column;
      align-items: flex-start;

      &-left {
        align-items: flex-start;
        margin-bottom: 16px;
      }

      &-remove {
        display: none;
      }

      &-right {
        max-width: 100%;
        justify-content: space-between;
      }

      &-qty {
        margin: 0;
      }

      .more {
        display: block;
      }
    }

    .actions-button {
      .button {
        &:first-child {
          margin-right: 16px;
        }
      }
    }
  }
</style>
