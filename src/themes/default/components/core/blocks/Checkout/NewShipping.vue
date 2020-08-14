<template>
  <div class="new-shipping">
    <div class="row">
      <div class="col-xs-12 col-md-7">
        <div class="checkout-title mb-3">
          <h1>
            {{ $t('How do you want to receive your order?') }}
          </h1>
        </div>
        <div class="subtitle">
          <div class="number-block">
            <div class="number align-center">1</div>
          </div>
          <div class="text d-flex align-items-center w-100">
            <span class="shipping-title">Доставка в городе :</span>
            <!--<div class="picked-city" @click="showCityPicker = !showCityPicker">-->
            <div class="picked-city" @click="onShowModal">
              {{ city }}
              <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.25 0.5L4 4.25L7.75 0.5H0.25Z" fill="#BDBDBD"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12">
        <ul class="nav nav-tabs custom-tabs">
          <li class="nav-item" @click="changeType('shop')">
            <div class="nav-link d-flex" :class="{active: type === 'shop'}">
              <div class="icon">
                <span class="material-icons">house</span>
              </div>
              <div class="text">
                <p class="main">{{ $t('Pickup from the store') }}</p>
                <p class="desc">{{ $t('is free') }}</p>
              </div>
            </div>
          </li>
          <li class="nav-item" @click="changeType('new_post')">
            <div class="nav-link d-flex" :class="{active: type === 'new_post'}">
              <div class="icon">
                <span class="material-icons">control_camera</span>
              </div>
              <div class="text">
                <p class="main">{{ $t('Novaya Pochta(Branch)') }}</p>
                <p class="desc">{{ $t('from 35 uah') }}</p>
              </div>
            </div>
          </li>
          <li class="nav-item" @click="changeType('currier')">
            <div class="nav-link d-flex" :class="{active: type === 'currier'}">
              <div class="icon">
                <span class="material-icons">local_shipping</span>
              </div>
              <div class="text">
                <p class="main">{{ $t('Courier delivery') }}</p>
                <p class="desc">{{ $t('from 55 uah') }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <custom-shipping :type="type" v-if="!loading" :city="city" />
    </div>
  </div>
</template>

<script>
import {required, minLength} from 'vuelidate/lib/validators';
import {unicodeAlpha, unicodeAlphaNum} from '@vue-storefront/core/helpers/validators';
import {Shipping} from '@vue-storefront/core/modules/checkout/components/Shipping';
import CustomShipping from 'src/modules/custom-shipping/custom-shipping'
import NewPost from 'src/modules/nova-poshta/index';
import { mapState } from 'vuex';
import { debounce } from 'debounce';

export default {
  components: {
    CustomShipping,
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
      type: state => state.customShipping.type
    }),
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
    margin-bottom: 36px
    width: 100%
    @media (max-width: 768px)
      width: calc(100% - 20px)
      margin-bottom: 30px
    .nav-item
      @media (max-width: 768px)
        width: 100%
        .nav-link
          border: 1px solid #E0E0E0
          background: #F9F9F9
          &.active
            background: #ffffff
    .nav-link
      border-top: 2px solid transparent
      &:not(.disabled)
        cursor: pointer
      .icon
        margin-right: 10px
        .material-icons
          color: #23BE20
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
        border-top-color: #23be20
      &.disabled
        background: #f9f9f9
        border-top: 1px solid #bdbdbd
        border-right: 1px solid #bdbdbd
        .text .main
          color: #BDBDBD
        .icon .material-icons
          color: #BDBDBD
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
    border-bottom: 1px dashed #1A1919
    cursor: pointer
    svg
      margin-left: 5px
</style>
