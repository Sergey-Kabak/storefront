<template>
  <div class="header-wrap" ref="headerWrap">
    <header
    ref="header"
    :class="{ 'is-visible': navVisible, 'search-active': isSearchActive }"
  >
    <div class="promo" v-if="isShowHeader" :style="{'background-color': promo.background}">
      <router-link class="promo-link" :to="promo.link">
        <picture class="flex">
          <source :srcset="promo.imgTablet" media="(min-width: 567px) and (max-width: 768px)">
          <source :srcset="promo.imgMobile" media="(max-width: 567px)">
          <source :srcset="promo.img">
          <img v-lazy="promo.img" alt="promo" class="promo-image">
        </picture>
      </router-link>
    </div>
    <div class="header-black-line" v-if="isShowHeader">
      <ul>
        <li>
          <router-link class="cl-secondary" :to="localizedRoute('/info/shops')" exact>
            {{ $t('The shops') }}
          </router-link>
        </li>
        <li>
          <router-link class="cl-secondary" :to="localizedRoute('/info/payment')" exact>
            {{ $t('the Payment') }}
          </router-link>
        </li>
        <li>
          <router-link class="cl-secondary" :to="localizedRoute('/info/delivery')" exact>
            {{ $t('Delivery') }}
          </router-link>
        </li>
        <li class="phone-wrap">
          <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.36 1.33333C2.4 1.92667 2.5 2.50667 2.66 3.06L1.86 3.86C1.58667 3.06 1.41333 2.21333 1.35333 1.33333H2.36ZM8.93333 9.34667C9.5 9.50667 10.08 9.60667 10.6667 9.64667V10.64C9.78667 10.58 8.94 10.4067 8.13333 10.14L8.93333 9.34667ZM3 0H0.666667C0.3 0 0 0.3 0 0.666667C0 6.92667 5.07333 12 11.3333 12C11.7 12 12 11.7 12 11.3333V9.00667C12 8.64 11.7 8.34 11.3333 8.34C10.5067 8.34 9.7 8.20667 8.95333 7.96C8.88667 7.93333 8.81333 7.92667 8.74667 7.92667C8.57333 7.92667 8.40667 7.99333 8.27333 8.12L6.80667 9.58667C4.92 8.62 3.37333 7.08 2.41333 5.19333L3.88 3.72667C4.06667 3.54 4.12 3.28 4.04667 3.04667C3.8 2.3 3.66667 1.5 3.66667 0.666667C3.66667 0.3 3.36667 0 3 0Z"/>
          </svg>
          <div class="phone">
            <a href="tel:+380674666111">
              +38 073 090 87 07
            </a>
            <phone-info v-show="navVisible"></phone-info>
          </div>
          <svg class="phone-wrap__arrow" width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.94 0.726667L4 3.78L7.06 0.726667L8 1.66667L4 5.66667L0 1.66667L0.94 0.726667Z"/>
          </svg>
        </li>
      </ul>
    </div>
    <div class="header-container-wrap border" v-if="!isCheckoutPage || isThankYouPage">
      <div class="v-container header-top-container">
        <div class="header-top">
          <div class="header-left">
            <hamburger-icon class="icon menu" />
            <mobile-hamburger-icon class="mobile-menu" />
          </div>

          <div class="header-middle">
            <logo width="auto" class="logo"/>
          </div>
          <div class="header-right">
            <consultation-icon class="icon icon-consultation" />
            <search-icon class="icon pointer icon-search" />
            <compare-icon class="icon pointer icon-compare" />
            <microcart-icon class="icon pointer icon-microcart" />
            <wishlist-icon class="icon pointer icon-wishlist" />
            <account-icon class="icon pointer icon-account" />
          </div>
        </div>
      </div>
    </div>
    <div class="header-container-wrap" v-if="!isCheckoutPage || isThankYouPage">
      <div class="header-container">
        <div class="header-bottom" v-if="isShowHeader">
          <search-panel mobile class="mobile"/>
        </div>
      </div>
    </div>
    </header>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import CurrentPage from 'theme/mixins/currentPage';
import AccountIcon from 'theme/components/core/blocks/Header/AccountIcon';
import CompareIcon from 'theme/components/core/blocks/Header/CompareIcon';
import HamburgerIcon from 'theme/components/core/blocks/Header/HamburgerIcon';
import Logo from 'theme/components/core/Logo';
import MicrocartIcon from 'theme/components/core/blocks/Header/MicrocartIcon';
import SearchIcon from 'theme/components/core/blocks/Header/SearchIcon';
import WishlistIcon from 'theme/components/core/blocks/Header/WishlistIcon';
import SearchPanel from 'theme/components/core/blocks/SearchPanel/SearchPanel';
import MobileHamburgerIcon from 'theme/components/core/blocks/Header/MobileHamburgerIcon';
import PhoneInfo from 'theme/components/core/PhoneInfo';
import ConsultationIcon from 'theme/components/core/blocks/Header/ConsultationIcon';
export default {
  name: 'Header',
  components: {
    AccountIcon,
    CompareIcon,
    HamburgerIcon,
    Logo,
    MicrocartIcon,
    SearchIcon,
    WishlistIcon,
    SearchPanel,
    MobileHamburgerIcon,
    PhoneInfo,
    ConsultationIcon,
  },
  mixins: [CurrentPage],
  data () {
    return {
      isPromoLoaded: false,
      navVisible: true,
      isScrolling: false,
      scrollTop: 0,
      lastScrollTop: 0,
      navbarHeight: 142,
      promos: {
        samsung: {
          img: '/assets/promo/samsung/md.jpg',
          imgTablet: '/assets/promo/samsung/lg.jpg',
          imgMobile: '/assets/promo/samsung/md.jpg',
          link: '/samsung-s21',
          background: '#fff'
        },
        keepInTouch: {
          img: '/assets/promo/iphone-desktop.jpg',
          imgTablet: '/assets/promo/iphone-tablet.jpg',
          imgMobile: '/assets/promo/iphone-mobile.jpg',
          link: '/smartfoni-i-telefoni/smartfoni?manufacturer=Apple',
          background: '#08101b'
        },
        ValentinesDay: {
          img: '/assets/promo/ValentinesDay/desktop.jpg',
          imgTablet: '/assets/promo/ValentinesDay/laptop.jpg',
          imgMobile: '/assets/promo/ValentinesDay/mobile.jpg',
          link: '/valentines-day',
          background: '#47bdef'
        }
      }
    }
  },
  computed: {
    ...mapState({
      isOpenLogin: state => state.ui.signUp,
      currentUser: state => state.user.current,
      isSearchActive: state => state.ui.isSearchActive
    }),
    isThankYouPage () {
      return this.$store.state.checkout.isThankYouPage
        ? this.$store.state.checkout.isThankYouPage
        : false
    },
    isShowHeader () {
      return this.$route.name !== 'checkout'
    },
    promoPages () {
      return [
        {
          path: '/',
          options: this.promos.samsung
        },
        {
          path: '/valentines-day',
          options: this.promos.keepInTouch
        }
      ]
    },
    promo () {
      const defaultPromo = this.promos.ValentinesDay
      const promo = this.promoPages.find(promo => this.$route.path === promo.path)
      return (promo && promo.options) || defaultPromo;
    }
  },
  beforeMount () {
    window.addEventListener(
      'scroll',
      () => {
        this.isScrolling = true
      },
      { passive: true }
    )

    setInterval(() => {
      if (this.isScrolling) {
        this.hasScrolled()
        this.isScrolling = false
      }
    })
  },
  mounted: function() {
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    imageLoaded () {
      this.isPromoLoaded = true
    },
    gotoAccount () {
      this.$bus.$emit('modal-toggle', 'modal-signup')
    },
    hasScrolled () {
      this.scrollTop = window.scrollY
      if (
        this.scrollTop > this.lastScrollTop &&
        this.scrollTop > this.navbarHeight
      ) {
        this.navVisible = false
      } else {
        this.navVisible = true
      }
      this.lastScrollTop = this.scrollTop
    },
    onResize() {
      if (window.innerWidth >= 768 && this.isSearchActive) {
        this.$store.commit('ui/setOverlay', false)
        this.$store.commit('ui/setSearch', false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-icon-hover: color(secondary, $colors-background);

@media (max-width: 549px) {
  .header-black-line ul li {
    margin: 0 15px !important;
  }
}

@media (max-width: 549px) {
  .header-black-line ul li {
    margin: 0 6px !important;
  }
}
.promo {
  picture{
    margin: 0 auto;
  }

  .promo-link {
    display: flex;
    max-height: 45px;
    min-height: 32px;

    @media (max-width: 768px) {
      height: 32px;
    }
  }

  .promo-image {
    max-width: 1440px;
    margin: auto;
    width: 100%;
    display: block;
    @media (max-width: 1440px) {
      width: auto;
      max-width: 100%;
      object-fit: contain;
      object-position: center;
    }
    @media (max-width: 768px) {
      height: 30px;
    }
  }
}

header {
  position: fixed;
  background: #fff;
  overflow-anchor: none;
  right: 0;
  left: 0;
  &.search-active {
    z-index: 4;
    overflow: auto;
  }
  &.fixed {
    position: fixed;
  }
}
.header-wrap {
  height: 144px;
}
.minimal {
  height: 67px;
}
.header-black-line {
  display: block;
}
.header-top {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  height: 67px;
  justify-content: center;
  @media only screen and (max-width: 768px) {
      display: flex;
      align-items: center;
  }
  @media (max-width : 575px){
    padding-right: 6px !important;
  }
}
.header {
  &-black-line {
    background-color: #1A1919;
    height: 30px;
    width: 100%;
    position: relative;
    box-sizing: border-box;
    ul {
      padding: 0;
      list-style: none;
      display: flex;
      margin: 0;
      height: 30px;
      justify-content: center;
      align-items: center;
      li {
        color: #BDBDBD;
        font-family: DIN Pro;
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 16px;
        margin-right: 47px;
        display: flex;
        align-items: center;
        position: relative;
        transform: rotate(0deg);
        &:last-child {
          margin-right: 0;
        }

        &:hover {
          a {
            color: #ffffff
          }
        }

        svg {
          fill: #BDBDBD;
          margin: 0 6px;
        }

        .list-phones-pop-up {
          z-index: 9;
          background-color: #ffffff;
          position: absolute;
          max-width: 100%;
          width: 100%;
          top: 23px;
          border-radius: 0 0 4px 4px;
          border: 1px solid gainsboro;
        }

        a {
          transition: .2s ease-in-out;
          color: #BDBDBD;
        }
      }
    }
  }
}

.mobile-menu {
  display: none;
}

.header-left {
  height: 100%;
  width: 100%;
  max-width: 260px;
  align-items: center;
  justify-self: flex-start;
  @media only screen and (max-width: 768px) {
    width: unset;
    margin-right: 20px;
  }
}

.header-middle {
  justify-self: center;


  .logo {
    height: 41px;
    margin-top: 7px;
    @media only screen and (max-width: 768px) {
      margin-top: 17px;
    }
    img {
      width: 100%;
    }
  }
}

.header-right {
  display: flex;
  align-items: center;
  justify-self: flex-end;

  @media only screen and (max-width: 768px) {
    margin-left: auto;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 23px;
    // padding: 8px;
    border-radius: 4px;
    transition: .2s ease-in-out;

    &:hover {
      background-color: #f9f9f9!important;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  .icon-consultation {
    display: none;
  }
}

header {
  top: -142px;
  box-sizing: border-box;
  max-height: 100vh;
  overflow: unset;
  z-index: 3;
  transition: top 0.2s ease-in-out;

  &.is-visible {
    top: 0!important;
  }
}

.header-container-wrap {
  background: #fff;

  &.border {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  }
}


.header-right {
  .question-mark {
    margin-right: 14px;
  }

  &-wrap {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
  }

  &-text {
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 0;
    font-size: 15px;
    line-height: 24px;
    color: #595858;
  }
}

.header-back {
  display: flex;
  align-items: center;
  width: fit-content;
  cursor: pointer;

  .icon {
    cursor: pointer;
    color: #BDBDBD;
    margin-right: 25px;
    &:hover {
      background: none;
    }
  }

  a {
    font-family: DIN Pro;
    font-style: normal;
    font-size: 15px;
    line-height: 24px;
    color: #595858;

    &:hover {
      text-decoration: none;

      &::after {
        content: none;
      }
    }
  }
}

.phone-wrap {
  z-index: 1;
  cursor: pointer;

  &:hover &__arrow {
    transform: rotate(180deg);
  }
  
  &:hover {
    .phone {
      color: #fff;
    }

    svg {
      fill: #fff
    }
  }

  .phone, svg {
    transition: .2s ease-in-out;
  }

  &:hover {
    .phone-tooltip {
      display: flex;
      animation: slideDown .2s ease-in-out;
    }
  }

  .phone-tooltip {
    transform: translateX(-50%);
  }
}

.phone {
  position: relative;
}

.phone-tooltip {
  cursor: auto;
  box-sizing: border-box;
  display: none;
  padding: 16px;
  width: 280px;
  position: absolute;
  font-family: DIN Pro;
  font-style: normal;
  font-size: 14px;
  line-height: 16px;
  flex-direction: column;
  top: calc(100% + 10px);
  left: 50%;
  background: #fff;
  border-radius: 4px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);

  &:after {
    top: -10px;
    content: " ";
    height: 10px;
    position: absolute;
    width: 100%;
  }
}

.header-placeholder {
  height: 54px;
}

.account {
  &__text {
    display: block;
  }
  &__icon {
    display: none;
  }
}

.header-bottom {
  display: none;
}

@media (max-width: 768px) {
  .header-top {
    padding: 0 16px;
  }

  .header-black-line {
    display: none;
  }

  .header-bottom {
    display: block;
  }

  .header-container {
    width: 100%;

    .checkout {
      width: 100%;
    }
  }

  .custom-menu__button {
    display: none;
  }

  .header-right {
    .icon-search,
    .icon-compare {
      display: none;
    }

    .icon-consultation {
      display: block;
      cursor: pointer;
    }
  }

  .mobile-menu {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    cursor: pointer;
  }

  .header-left {
    height: auto;
  }

  .header-middle {
    .logo {
      height: 36px;
      width: 80px;
    }
  }

  .header-top {
    height: 55px;
  }

  .header-wrap {
    margin-bottom: 15px;
  }

  .header-help-desktop {
    display: none;
  }

  .header-help-mobile {
    display: flex;
    align-items: center;

    .icon-consultation {
      cursor: pointer;
    }

    .icon-microcart {
      margin-right: 16px;
    }
  }

  .return-to-shopping {
    &__text {
      line-height: 16px;
      font-size: 13px;
    }

    &__icon {
      margin-right: 10px;
    }
  }

  .header-container {
    &.checkout {
      width: 100%;
      padding: 0 16px;
      .custom-logo {
        margin: 10px auto 0px auto;
      }
    }
  }
}

@media (max-width: 500px) {
  .header-top {
    grid-template-columns: auto 1fr auto
  }

  .header-right {
    .icon {
      margin-right: 21px;
    }
  }

  .header-middle {
    .logo {
      width: 80px;
    }
  }
}
@keyframes slide {
  from {
    opacity: .7;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideDown {
  from {
    opacity: .7;
    transform: translateY(-10px) translateX(-50%);
  }
  to {
    opacity: 1;
    transform: translateY(0) translateX(-50%);
  }
}

.header-top {
  .phone-wrap {
    @media (min-width : 576px){
      display: none;
    }
    padding: 8px;
    border-radius: 4px;
    box-sizing: border-box;
    height: 40px;
    width: 40px;
    position: relative;
  }
}
</style>
