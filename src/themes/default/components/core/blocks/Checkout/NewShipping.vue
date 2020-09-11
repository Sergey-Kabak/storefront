<template>
  <div class="new-shipping">
    <div class="checkout-title">
      <h1>
        {{ $t('How do you want to receive your order?') }}
      </h1>
    </div>
    <div class="checkout-subtitle">
      <div class="checkout-number-block">
        <div class="number align-center">1</div>
      </div>
      <div class="text d-flex align-items-center w-100">
        <span class="shipping-title">{{ $t('Delivery to') }}</span>
        <div class="picked-city" @click="onShowModal">
          <span>{{ city }}</span>
          <svg width="8" height="5" viewBox="0 0 8 5" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.25 0.5L4 4.25L7.75 0.5H0.25Z"/>
          </svg>
        </div>
      </div>
    </div>
    <ul class="nav nav-tabs custom-tabs">

      <li class="nav-item"
          @click="changeType(method.method_code)"
          v-if="getActivePaymentSystem !== 'credit'"
          v-for="method in shippingMethods">
          <new-shipping-item-body :method="method" :type="type" />
      </li>

      <li class="nav-item"
          @click="changeType(method.method_code)"
          v-if="getActivePaymentSystem === 'credit' && method.method_code === 'flatrate'"
          v-for="method in shippingMethods">
          <new-shipping-item-body :method="method" :type="type" />
      </li>

<!--      <li class="nav-item" @click="changeType('shop')">-->
<!--        <div class="nav-link" :class="{active: type === 'shop'}">-->
<!--          <div class="icon">-->
<!--            <svg width="20" height="18" viewBox="0 0 20 18" xmlns="http://www.w3.org/2000/svg">-->
<!--              <path d="M19 10V17C19 17.2652 18.8946 17.5196 18.7071 17.7071C18.5196 17.8946 18.2652 18 18 18H2C1.73478 18 1.48043 17.8946 1.29289 17.7071C1.10536 17.5196 1 17.2652 1 17V10H0V8L1 3H19L20 8V10H19ZM3 10V16H17V10H3ZM2.04 8H17.96L17.36 5H2.64L2.04 8ZM4 11H12V14H4V11ZM1 0H19V2H1V0Z"/>-->
<!--            </svg>-->
<!--          </div>-->
<!--          <div class="text">-->
<!--            <p class="main">{{ $t('Pickup from the store') }}</p>-->
<!--            <p class="desc">{{ $t('is free') }}</p>-->
<!--          </div>-->
<!--        </div>-->
<!--      </li>-->
<!--      <li class="nav-item" v-if="getActivePaymentSystem !== 'credit'" @click="changeType('new_post')">-->
<!--        <div class="nav-link" :class="{active: type === 'new_post'}">-->
<!--          <div class="icon">-->
<!--            <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">-->
<!--              <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0254 5.92128C16.0859 5.902 16.1655 5.94056 16.2451 6.04658C16.2451 6.04658 16.2451 6.04658 19.8421 9.6C20.0522 9.81204 20.0522 10.1333 19.8421 10.2908C19.8421 10.2908 19.8421 10.2908 16.2451 13.8988C16.1655 14.0048 16.0859 14.0305 16.0254 13.9984C15.965 13.9663 15.9268 13.8731 15.9268 13.7381V6.15261C15.9268 6.02088 15.965 5.94056 16.0254 5.92128Z" />-->
<!--              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.87238 0H10.127L10.3721 0.102812C10.3721 0.102812 10.3721 0.102811 14.0742 3.81687C14.2334 4.02892 14.1793 4.18956 13.9151 4.18956C13.9151 4.18956 13.9151 4.18956 12.3808 4.18956C12.1166 4.18956 11.9065 4.40161 11.9065 4.66827C11.9065 4.66827 11.9065 4.66827 11.9065 7.4249C11.9065 7.69157 11.6932 7.90362 11.3749 7.90362C11.3749 7.90362 11.3749 7.90362 8.67867 7.90362C8.41447 7.90362 8.20119 7.69157 8.20119 7.4249C8.20119 7.4249 8.20119 7.4249 8.20119 4.66827C8.20119 4.40161 7.9911 4.18956 7.72371 4.18956H6.08435C5.82014 4.18956 5.76603 4.02892 5.92519 3.81687C5.92519 3.81687 5.92519 3.81687 9.63046 0.102812L9.87238 0Z" />-->
<!--              <path fill-rule="evenodd" clip-rule="evenodd" d="M4.07293 5.84107C4.13978 5.87319 4.18116 5.96637 4.18116 6.10131V13.8443C4.18116 13.9792 4.13978 14.0595 4.07293 14.0852C4.00927 14.1109 3.91696 14.0852 3.80873 14.0049C3.80873 14.0049 3.80873 14.0049 0.15757 10.2909C-0.0525232 10.1334 -0.0525232 9.81215 0.15757 9.6001C0.15757 9.6001 0.15757 9.6001 3.80873 5.94066C3.91696 5.83464 4.00927 5.80894 4.07293 5.84107Z" />-->
<!--              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.67924 11.9358C8.67924 11.9358 8.67924 11.9358 11.3754 11.9358C11.6938 11.9358 11.907 12.1478 11.907 12.4145C11.907 12.4145 11.907 12.4145 11.907 15.3318C11.907 15.6498 12.1171 15.8619 12.3813 15.8619H13.8106C14.0748 15.8619 14.1799 16.0193 13.9698 16.18C13.9698 16.18 13.9698 16.18 10.3727 19.8394C10.2645 19.9454 10.134 20 10.0003 20C9.86977 20 9.73607 19.9454 9.63103 19.8394C9.63103 19.8394 9.63103 19.8394 6.03399 16.18C5.82071 16.0193 5.92576 15.8619 6.18996 15.8619C6.18996 15.8619 6.18996 15.8619 7.72428 15.8619C7.99167 15.8619 8.20176 15.6498 8.20176 15.3318C8.20176 15.3318 8.20176 15.3318 8.20176 12.4145C8.20176 12.1478 8.41504 11.9358 8.67924 11.9358Z" />-->
<!--            </svg>-->
<!--          </div>-->
<!--          <div class="text">-->
<!--            <p class="main">{{ $t('Novaya Pochta(Branch)') }}</p>-->
<!--            <p class="desc">{{ $t('from 35 uah') }}</p>-->
<!--          </div>-->
<!--        </div>-->
<!--      </li>-->
<!--      <li class="nav-item" v-if="getActivePaymentSystem !== 'credit'" @click="changeType('currier')">-->
<!--        <div class="nav-link" :class="{active: type === 'currier'}">-->
<!--          <div class="icon">-->
<!--            <svg width="22" height="17" viewBox="0 0 22 17" xmlns="http://www.w3.org/2000/svg">-->
<!--              <path d="M7.965 13C7.84612 13.8343 7.43021 14.5977 6.79368 15.1499C6.15714 15.7022 5.34272 16.0063 4.5 16.0063C3.65728 16.0063 2.84286 15.7022 2.20632 15.1499C1.56979 14.5977 1.15388 13.8343 1.035 13H0V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0H15C15.2652 0 15.5196 0.105357 15.7071 0.292893C15.8946 0.48043 16 0.734784 16 1V3H19L22 7.056V13H19.965C19.8461 13.8343 19.4302 14.5977 18.7937 15.1499C18.1571 15.7022 17.3427 16.0063 16.5 16.0063C15.6573 16.0063 14.8429 15.7022 14.2063 15.1499C13.5698 14.5977 13.1539 13.8343 13.035 13H7.965ZM14 2H2V10.05C2.39456 9.6472 2.8806 9.34568 3.41675 9.17112C3.9529 8.99655 4.52329 8.95411 5.07938 9.04739C5.63546 9.14068 6.16077 9.36693 6.61061 9.7069C7.06044 10.0469 7.42148 10.4905 7.663 11H13.337C13.505 10.647 13.73 10.326 14 10.05V2ZM16 8H20V7.715L17.992 5H16V8ZM16.5 14C16.898 14 17.2796 13.8419 17.561 13.5605C17.8424 13.2791 18.0005 12.8975 18.0005 12.4995C18.0005 12.1015 17.8424 11.7199 17.561 11.4385C17.2796 11.1571 16.898 10.999 16.5 10.999C16.102 10.999 15.7204 11.1571 15.439 11.4385C15.1576 11.7199 14.9995 12.1015 14.9995 12.4995C14.9995 12.8975 15.1576 13.2791 15.439 13.5605C15.7204 13.8419 16.102 14 16.5 14ZM6 12.5C6 12.303 5.9612 12.108 5.88582 11.926C5.81044 11.744 5.69995 11.5786 5.56066 11.4393C5.42137 11.3001 5.25601 11.1896 5.07403 11.1142C4.89204 11.0388 4.69698 11 4.5 11C4.30302 11 4.10796 11.0388 3.92597 11.1142C3.74399 11.1896 3.57863 11.3001 3.43934 11.4393C3.30005 11.5786 3.18956 11.744 3.11418 11.926C3.0388 12.108 3 12.303 3 12.5C3 12.8978 3.15804 13.2794 3.43934 13.5607C3.72064 13.842 4.10218 14 4.5 14C4.89782 14 5.27936 13.842 5.56066 13.5607C5.84196 13.2794 6 12.8978 6 12.5Z" />-->
<!--            </svg>-->
<!--          </div>-->
<!--          <div class="text">-->
<!--            <p class="main">{{ $t('Courier delivery') }}</p>-->
<!--            <p class="desc">{{ $t('from 55 uah') }}</p>-->
<!--          </div>-->
<!--        </div>-->
<!--      </li>-->

    </ul>
    <custom-shipping :type="type" v-if="!loading" :city="city" />
    <checkout-microcart />
  </div>
</template>

<script>
import {
  minLength,
  required
} from 'vuelidate/lib/validators';
import {
  unicodeAlpha,
  unicodeAlphaNum
} from '@vue-storefront/core/helpers/validators';
import { Shipping } from '@vue-storefront/core/modules/checkout/components/Shipping';
import CustomShipping from 'src/modules/custom-shipping/custom-shipping';
import CheckoutMicrocart from 'theme/components/core/blocks/Checkout/CheckoutMicrocart';
import NewPost from 'src/modules/nova-poshta/index';
import { mapState, mapGetters } from 'vuex';
import { debounce } from 'debounce';
import NewShippingItemBody from "./NewShippingItemBody";

export default {
  components: {
    CustomShipping,
    CheckoutMicrocart,
    NewShippingItemBody
  },
  mixins: [Shipping, NewPost],
  beforeMount () {
    this.$bus.$on('checked-location', this.sendDataToCheckout)
    this.$bus.$on('change-city', this.changeCity)
    // this.cities = new_post.map(dp => dp.city).filter((value, index, self) => self.indexOf(value) === index)
    this.getCityList()
  },
  beforeDestroy () {
    this.$bus.$off('checked-location', this.sendDataToCheckout)
    this.$bus.$off('change-city', this.changeCity)
  },
  data () {
    return {
      loading: false,
      cities: [],
      city: 'Київ',
      showCityPicker: false
    }
  },
  computed: {
    ...mapState({
      type: state => state.customShipping.type,
    }),
    ...mapGetters({
      payment_system: 'themePayment/getActivePaymentMethod',
    }),
    getActivePaymentSystem() {
      return this.payment_system;
    },
    countryOptions() {
      return this.countries.map((item) => {
        return {
          value: item.code,
          label: item.name
        };
      });
    },
    citiesOptions () {
      return this.cities.map(item => {
        return {
          value: item,
          label: item,
          text: item
        }
      })
    },
  },
  methods: {
    changeType (type) {
      this.loading = true
      this.$store.commit('customShipping/changeShippingType', type)
      setTimeout(() => {this.loading = false})
    },
    changeCity (city = this.city) {
      this.showCityPicker = false;
      this.city = city
    },
    deb: debounce((self, data) => {
      self.searchByString(data)
    }, 300),
    onSearch (data) {
      this.deb(this, data)
    },
    onShowModal () {
      this.$bus.$emit('modal-show', 'modal-custom-city-picker')
    }
  },
  validations: {
    shipping: {
      firstName: {
        required,
        minLength: minLength(2),
        unicodeAlpha
      },
      lastName: {
        required,
        unicodeAlpha
      },
      country: {
        required
      },
      streetAddress: {
        required,
        unicodeAlphaNum
      },
      apartmentNumber: {
        required,
        unicodeAlphaNum
      },
      shippingMethod: {
        required
      },
      zipCode: {
        required,
        minLength: minLength(3),
        unicodeAlphaNum
      },
      city: {
        required,
        unicodeAlpha
      }
    }
  }
};
</script>

<style lang="sass" scoped>
  @import '~bootstrap'

</style>

<style lang="sass" scoped>
  .new-shipping
    .number-block
      position: relative
      span
        min-width: 130px
    .city-select__wrapper
      position: absolute
      top: 36px
      left: 100px
      width: 300px
      .v-select
        background: #ffffff
        box-shadow: 0 0 15px rgba(0,0,0, .1)
  .nav-tabs.custom-tabs
    margin-bottom: 32px
    width: 100%
    @media (max-width: 768px)
      margin-bottom: 30px
    .nav-item
      margin-bottom: 0
      &:first-child
        .nav-link
          border-top-left-radius: 5px
      &:last-child
        .nav-link
          border-top-right-radius: 5px
          border-right: 1px solid #E0E0E0
    .nav-link
      border-radius: 0
      display: flex
      align-items: center
      background: #F9F9F9
      border: none
      border-top: 1px solid #E0E0E0
      border-left: 1px solid #E0E0E0
      cursor: pointer
      .icon
        margin-right: 16px
        .material-icons
          color: #23BE20
        svg
          fill: #BDBDBD
      .text
        p
          font-family: 'DIN Pro'
          font-size: 13px
          line-height: 16px
          margin: 0
        .main
          color: #5F5E5E
        .desc
          color: #BDBDBD
      &.active
        position: relative
        cursor: auto
        border-top-color: #23be20
        background: #fff
        border-bottom: none

        &::after
          content: ""
          position: absolute
          left: 0
          top: 100%
          height: 1px
          width: 100%
          background: #fff
        svg
          fill: #23BE20
  .shipping-title
    font-family: DIN Pro
    font-style: normal
    font-weight: 0
    font-size: 13px
    line-height: 20px
    color: #000000
    font-weight: 600
    margin-right: 8px
  .picked-city
    font-weight: 600
    font-family: DIN Pro
    font-size: 14px
    line-height: 20px
    color: #1A1919
    position: relative
    cursor: pointer
    svg
      margin-left: 5px
      fill: #BDBDBD
    span
      border-bottom: 1px dashed #1A1919
  .checkout-title
    margin-bottom: 24px
    h1
      font-family: DIN Pro
      margin: 0
      font-weight: 600
      font-size: 24px
      line-height: 30px
  @media (max-width: 768px)
    .nav-tabs.custom-tabs
      border:none
      .nav-item
        width: 100%
        &:first-child
          .nav-link
            border-top-right-radius: 5px
        &:last-child
          .nav-link
            border-bottom: 1px solid #E0E0E0
            border-radius: 0px 0px 5px 5px
    .nav-tabs.custom-tabs
      border: none
      .nav-link
        border: 1px solid #E0E0E0
        border-bottom: none
        &.active
          &::after
            content: none
</style>
