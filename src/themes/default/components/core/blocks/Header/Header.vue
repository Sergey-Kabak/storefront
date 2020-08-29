<template>
  <div class="header-wrap" :style="{ height: headerHeight + 'px' }">
    <header
      ref="header"
      class="w-100"
      :class="{ 'is-visible': navVisible }"
      :style="{ 'z-index': headerIndex }"
    >
      <div class="header-black-line" v-if="isShowHeader">
        <ul>
          <li>
            <a href="#">
              <router-link class="cl-secondary" :to="localizedRoute('/shops')" exact>
                {{ $t('The shops') }}
              </router-link>
            </a>
          </li>
          <li>
            <a href="#">
              <router-link class="cl-secondary" :to="localizedRoute('/payments-and-loans')" exact>
                {{ $t('the Payment') }}
              </router-link>
            </a>
          </li>
          <li>
            <a href="#">
              <router-link class="cl-secondary" :to="localizedRoute('/delivery')" exact>
                {{ $t('Delivery') }}
              </router-link>
            </a>
          </li>
          <li class="phone-wrap">
            <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.36 1.33333C2.4 1.92667 2.5 2.50667 2.66 3.06L1.86 3.86C1.58667 3.06 1.41333 2.21333 1.35333 1.33333H2.36ZM8.93333 9.34667C9.5 9.50667 10.08 9.60667 10.6667 9.64667V10.64C9.78667 10.58 8.94 10.4067 8.13333 10.14L8.93333 9.34667ZM3 0H0.666667C0.3 0 0 0.3 0 0.666667C0 6.92667 5.07333 12 11.3333 12C11.7 12 12 11.7 12 11.3333V9.00667C12 8.64 11.7 8.34 11.3333 8.34C10.5067 8.34 9.7 8.20667 8.95333 7.96C8.88667 7.93333 8.81333 7.92667 8.74667 7.92667C8.57333 7.92667 8.40667 7.99333 8.27333 8.12L6.80667 9.58667C4.92 8.62 3.37333 7.08 2.41333 5.19333L3.88 3.72667C4.06667 3.54 4.12 3.28 4.04667 3.04667C3.8 2.3 3.66667 1.5 3.66667 0.666667C3.66667 0.3 3.36667 0 3 0Z"/>
            </svg>
            <div class="phone">
              <a href="tel:+380674666111">
                +38 067 466 61 11
              </a>
              <div class="phone-tooltip" v-show="navVisible">
                <span class="phone-tooltip-title">{{ $t('Consultation by telephone') }}</span>
                <a class="phone-tooltip-number" href="tel:+380674666111">+38 067 466 61 11</a>
                <span class="phone-tooltip-date">Пн-Пт: 9:00-18:00; Сб-Вс: {{ $t('Weekend') }}</span>
                <span class="phone-tooltip-description">{{ $t('Free of charge from landlines and mobile phones in Ukraine') }}</span>
              </div>
            </div>
            <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              <search-icon class="icon pointer icon-search" />
              <compare-icon class="icon pointer icon-compare" />
              <microcart-icon class="icon pointer icon-microcart" />
              <wishlist-icon class="icon pointer icon-wishlist" />
              <account-icon class="icon pointer icon-account" />
            </div>
          </div>
        </div>
      </div>
      <div class="header-container-wrap border" v-if="!isCheckoutPage || isThankYouPage">
        <div class="header-container">
          <div class="header-bottom" v-if="isShowHeader">
            <header-search />
          </div>
        </div>
      </div>
      <div class="header-container-wrap border">
        <div class="header-container minimal" v-if="isCheckoutPage && !isThankYouPage">
          <router-link
            :to="localizedRoute('/')"
            class="links"
          >
            <svg class="return-to-shopping__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.293 17.707L7.58603 12L13.293 6.293L14.707 7.707L10.414 12L14.707 16.293L13.293 17.707Z" fill="#BDBDBD"/>
            </svg>
            <span class="return-to-shopping__text">{{ $t('Return to shopping') }}</span>
          </router-link>
          <logo width="auto" height="41px" />
          <div class="header-account">
            <a
              v-if="!currentUser"
              href="#"
              @click.prevent="gotoAccount"
              class="links"
            >
              <svg class="account__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.579 2 2 6.579 2 12C2 15.189 3.592 18.078 6 19.924V20H6.102C7.77 21.245 9.813 22 12 22C14.187 22 16.23 21.245 17.898 20H18V19.924C20.408 18.078 22 15.19 22 12C22 6.579 17.421 2 12 2ZM8.074 18.927C8.22136 18.2604 8.59154 17.6639 9.12347 17.236C9.6554 16.808 10.3173 16.5742 11 16.573H13C13.6827 16.5744 14.3445 16.8083 14.8764 17.2362C15.4082 17.6641 15.7785 18.2605 15.926 18.927C14.758 19.604 13.416 20 12 20C10.584 20 9.242 19.604 8.074 18.927ZM17.61 17.641C17.2286 16.7329 16.5877 15.9574 15.7677 15.4117C14.9477 14.866 13.985 14.5742 13 14.573H11C10.015 14.5742 9.05227 14.866 8.23227 15.4117C7.41227 15.9574 6.77144 16.7329 6.39 17.641C4.923 16.182 4 14.176 4 12C4 7.663 7.663 4 12 4C16.337 4 20 7.663 20 12C20 14.176 19.077 16.182 17.61 17.641Z" fill="#828282"/>
                <path d="M12 6C9.72 6 8 7.72 8 10C8 12.28 9.72 14 12 14C14.28 14 16 12.28 16 10C16 7.72 14.28 6 12 6ZM12 12C10.822 12 10 11.178 10 10C10 8.822 10.822 8 12 8C13.178 8 14 8.822 14 10C14 11.178 13.178 12 12 12Z" fill="#828282"/>
              </svg>
              <span class="account__text">{{ $t('Login to your account') }}</span>
            </a>
            <span v-else>{{ $t('You are logged in as {firstname}', currentUser) }}</span>
          </div>
        </div>
      </div>
    </header>
    <div class="header-placeholder" />
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
import HeaderSearch from 'theme/components/core/blocks/Header/HeaderSearch';
import MobileHamburgerIcon from 'theme/components/core/blocks/Header/MobileHamburgerIcon';

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
    HeaderSearch,
    MobileHamburgerIcon
  },
  mixins: [CurrentPage],
  data () {
    return {
      navVisible: true,
      isScrolling: false,
      scrollTop: 0,
      lastScrollTop: 0,
      headerHeight: null
    }
  },
  watch:{
    $route (){
      this.$nextTick(() => {
        this.headerHeight = this.$refs.header.clientHeight
      })
    }
  },
  computed: {
    ...mapState({
      isOpenLogin: state => state.ui.signUp,
      currentUser: state => state.user.current,
      headerIndex: state => state.ui.headerIndex,
      mobileSearch: state => state.ui.mobileSearch
    }),
    isThankYouPage () {
      return this.$store.state.checkout.isThankYouPage
        ? this.$store.state.checkout.isThankYouPage
        : false
    },
    isShowHeader () {
      return this.$route.name !== 'checkout'
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
    }, 250)
  },
  mounted: function() {
    this.headerHeight = this.$refs.header.clientHeight
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    gotoAccount () {
      this.$bus.$emit('modal-toggle', 'modal-signup')
    },
    hasScrolled () {
      this.scrollTop = window.scrollY
      if (
        this.scrollTop > this.lastScrollTop &&
        this.scrollTop > this.headerHeight
      ) {
        this.navVisible = false
      } else {
        this.navVisible = true
      }
      this.lastScrollTop = this.scrollTop
    },
    onResize() {
      if (window.innerWidth >= 768 && this.mobileSearch) {
        this.$store.commit('ui/setOverlay', false)
        this.$store.commit('ui/setMobileSearch', false)
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

header {
  background: #fff;
}

.header-wrap {
  margin-bottom: 18px;
}

.minimal {
  height: 67px;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;

  font-family: DIN Pro;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 24px;
  color: #5F5E5E;

  .custom-logo {
    margin: 0;
  }

  .links {
    display: flex;
  }

  .return-to-shopping {
    &__text {
      font-family: DIN Pro;
      font-style: normal;
      font-size: 15px;
      line-height: 24px;
      display: block;
      color: #5F5E5E;
      @media (max-width: 768px) {
        display: none;
      }
    }
    &__icon {
      margin-right: 20px;
      @media (max-width: 768px) {
        margin-right: 0;
      }
    }
  }

  .account {
    &__text {
      display: block;
      @media (max-width: 768px) {
        display: none;
      }
    }
    &__icon {
      margin-right: 20px;
      @media (max-width: 768px) {
        margin-right: 0;
      }
    }
  }

}

.header-black-line {
  display: block;
}

.v-container {
  &.minimal {
    display: flex;
    align-items: center;
    height: 67px;
  }
}

.header-top {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  height: 67px;
  justify-content: center;
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
        margin: 0 25px;
        display: flex;
        align-items: center;
        position: relative;
        transform: rotate(0deg);

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
}

.header-middle {
  justify-self: center;

  .logo {
    height: 41px;
    margin-top: 7px;
  }
}

.header-right {
  display: flex;
  align-items: center;
  justify-self: flex-end;

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 14px;
    padding: 8px;
    border-radius: 4px;
    transition: .2s ease-in-out;

    &:hover {
      background-color: #f9f9f9!important;
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

header {
  box-sizing: border-box;
  position: fixed;
  top: -115px;
  max-height: 100vh;
  overflow: unset;
  z-index: 3;
  transition: top 0.2s ease-in-out;

  &.is-visible {
    top: 0;
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
    color: #5F5E5E;
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
    color: #5F5E5E;

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
  transform: translateX(-50%);
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

  &-title {
    font-size: 18px;
    line-height: 20px;
    color: #1A1919;
    margin-bottom: 16px;
  }

  &-number {
    width: fit-content;
    color: #23BE20!important;
    font-size: 15px;
    margin-bottom: 16px;
    text-decoration: none;

    &:after {
      content: none;
    }
  }

  &-date {
    font-size: 14px;
    color: #5F5E5E;
    margin-bottom: 12px;
  }

  &-description {
    color: rgba(95, 94, 94, 0.6);
  }
}

.icon {
  opacity: 1;
  &:hover,
  &:focus {
    background-color: $color-icon-hover;
    opacity: 1;
  }
}
.header-placeholder {
  height: 54px;
}
.links {
  text-decoration: underline;
}

.header-account {
  text-align: right;
}

.header-bottom {
  display: none;
}

@media (max-width: 768px) {
  header {
    overflow: auto;
  }

  .header-top {
    padding: 0 18px;
  }

  .header-black-line {
    display: none;
  }

  .header-bottom {
    display: block;
  }

  .header-container {
    width: 100%;
  }

  .custom-menu__button {
    display: none;
  }

  .header-right {
    .icon-search {
      display: none;
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
      height: 35px;
    }
  }

  .header-top {
    height: 56px;
  }

  .header-wrap {
    margin-bottom: 15px;
  }

  .header-container-wrap {
    &.border {
      border-bottom: 1px solid #e0e0e0;
      box-shadow: none;

      &:last-child {
        border-bottom: none;
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
      margin-right: 0;
    }
  }

  .header-middle {
    .logo {
      margin-top: 12px;
      width: 80px;
    }
  }
}

a.underline:after, a:not(.no-underline):hover:after {
  content: none;
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
</style>
