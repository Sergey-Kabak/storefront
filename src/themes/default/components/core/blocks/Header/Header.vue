<template>
  <div class="header">
    <header
      class="fixed w-100 brdr-bottom-1 bg-cl-primary brdr-cl-secondary"
      :class="{ 'is-visible': navVisible }"
    >
      <div class="header-black-line">
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
          <li>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.36 1.33333C2.4 1.92667 2.5 2.50667 2.66 3.06L1.86 3.86C1.58667 3.06 1.41333 2.21333 1.35333 1.33333H2.36ZM8.93333 9.34667C9.5 9.50667 10.08 9.60667 10.6667 9.64667V10.64C9.78667 10.58 8.94 10.4067 8.13333 10.14L8.93333 9.34667ZM3 0H0.666667C0.3 0 0 0.3 0 0.666667C0 6.92667 5.07333 12 11.3333 12C11.7 12 12 11.7 12 11.3333V9.00667C12 8.64 11.7 8.34 11.3333 8.34C10.5067 8.34 9.7 8.20667 8.95333 7.96C8.88667 7.93333 8.81333 7.92667 8.74667 7.92667C8.57333 7.92667 8.40667 7.99333 8.27333 8.12L6.80667 9.58667C4.92 8.62 3.37333 7.08 2.41333 5.19333L3.88 3.72667C4.06667 3.54 4.12 3.28 4.04667 3.04667C3.8 2.3 3.66667 1.5 3.66667 0.666667C3.66667 0.3 3.36667 0 3 0Z" fill="#BDBDBD"/>
            </svg>
            <a href="tel:+380970908707">
              +38 097 090 87 07
            </a>
<!--            <span>-->
<!--              <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                <path d="M0.94 0.726667L4 3.78L7.06 0.726667L8 1.66667L4 5.66667L0 1.66667L0.94 0.726667Z" fill="#BDBDBD"/>-->
<!--              </svg>-->
<!--            </span>-->
          </li>
        </ul>
      </div>
      <div class="container px15">
        <div class="row between-xs middle-xs" v-if="!isCheckoutPage || isThankYouPage">
          <div class="col-md-4 col-xs-2 middle-xs">
            <div>
              <hamburger-icon class="p15 icon" />
            </div>
          </div>
          <div class="col-xs-2 visible-xs">
            <search-icon class="p15 icon pointer" />
          </div>
          <div class="col-md-4 col-xs-4 center-xs">
            <div>
              <logo width="auto" height="41px" />
            </div>
          </div>
          <div class="col-xs-2 visible-xs">
            <wishlist-icon class="p15 icon pointer" />
          </div>
          <div class="col-md-4 col-xs-2 end-xs">
            <div class="inline-flex right-icons">
              <search-icon class="p15 icon hidden-xs pointer" />
              <wishlist-icon class="p15 icon hidden-xs pointer" />
              <compare-icon class="p15 icon hidden-xs pointer" />
              <microcart-icon class="p15 icon pointer" />
              <account-icon class="p15 icon hidden-xs pointer" />
            </div>
          </div>
        </div>
        <div class="row between-xs middle-xs px15" v-if="isCheckoutPage && !isThankYouPage">
          <div class="col-xs-2 col-md-3 middle-xs">
            <div>
              <router-link
                :to="localizedRoute('/')"
              >
                <span class="return-to-shopping__text">{{ $t('Return to shopping') }}</span>
                <svg class="return-to-shopping__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.293 17.707L7.58603 12L13.293 6.293L14.707 7.707L10.414 12L14.707 16.293L13.293 17.707Z" fill="#BDBDBD"/>
                </svg>
              </router-link>
            </div>
          </div>
          <div class="col-xs-5 col-md-6 center-xs">
            <logo width="auto" height="41px" />
          </div>
          <div class="col-xs-2 col-md-3 end-xs">
            <div>
              <a
                v-if="!currentUser"
                href="#"
                @click.prevent="gotoAccount"
                class="cl-tertiary links"
              >
                <span class="account__text">{{ $t('Login to your account') }}</span>
                <svg class="account__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.579 2 2 6.579 2 12C2 15.189 3.592 18.078 6 19.924V20H6.102C7.77 21.245 9.813 22 12 22C14.187 22 16.23 21.245 17.898 20H18V19.924C20.408 18.078 22 15.19 22 12C22 6.579 17.421 2 12 2ZM8.074 18.927C8.22136 18.2604 8.59154 17.6639 9.12347 17.236C9.6554 16.808 10.3173 16.5742 11 16.573H13C13.6827 16.5744 14.3445 16.8083 14.8764 17.2362C15.4082 17.6641 15.7785 18.2605 15.926 18.927C14.758 19.604 13.416 20 12 20C10.584 20 9.242 19.604 8.074 18.927ZM17.61 17.641C17.2286 16.7329 16.5877 15.9574 15.7677 15.4117C14.9477 14.866 13.985 14.5742 13 14.573H11C10.015 14.5742 9.05227 14.866 8.23227 15.4117C7.41227 15.9574 6.77144 16.7329 6.39 17.641C4.923 16.182 4 14.176 4 12C4 7.663 7.663 4 12 4C16.337 4 20 7.663 20 12C20 14.176 19.077 16.182 17.61 17.641Z" fill="#828282"/>
                  <path d="M12 6C9.72 6 8 7.72 8 10C8 12.28 9.72 14 12 14C14.28 14 16 12.28 16 10C16 7.72 14.28 6 12 6ZM12 12C10.822 12 10 11.178 10 10C10 8.822 10.822 8 12 8C13.178 8 14 8.822 14 10C14 11.178 13.178 12 12 12Z" fill="#828282"/>
                </svg>
              </a>
              <span v-else>{{ $t('You are logged in as {firstname}', currentUser) }}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div class="header-placeholder" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CurrentPage from 'theme/mixins/currentPage'
import AccountIcon from 'theme/components/core/blocks/Header/AccountIcon'
import CompareIcon from 'theme/components/core/blocks/Header/CompareIcon'
import HamburgerIcon from 'theme/components/core/blocks/Header/HamburgerIcon'
import Logo from 'theme/components/core/Logo'
import MicrocartIcon from 'theme/components/core/blocks/Header/MicrocartIcon'
import SearchIcon from 'theme/components/core/blocks/Header/SearchIcon'
import WishlistIcon from 'theme/components/core/blocks/Header/WishlistIcon'

export default {
  name: 'Header',
  components: {
    AccountIcon,
    CompareIcon,
    HamburgerIcon,
    Logo,
    MicrocartIcon,
    SearchIcon,
    WishlistIcon
  },
  mixins: [CurrentPage],
  data () {
    return {
      navVisible: true,
      isScrolling: false,
      scrollTop: 0,
      lastScrollTop: 0,
      navbarHeight: 54,
    }
  },
  computed: {
    ...mapState({
      isOpenLogin: state => state.ui.signUp,
      currentUser: state => state.user.current
    }),
    isThankYouPage () {
      return this.$store.state.checkout.isThankYouPage
        ? this.$store.state.checkout.isThankYouPage
        : false
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
  methods: {
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
        transition: 300ms;
        transform: rotate(0deg);

        a {
          color: #BDBDBD;
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
      }
    }
  }
}

header {
  height: 84px;
  top: -85px;
  z-index: 3;
  transition: top 0.2s ease-in-out;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

  &.is-visible {
    top: 0;
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

.icon {
  opacity: 1;
  &:hover,
  &:focus {
    background-color: $color-icon-hover;
    opacity: 1;
  }
}
.right-icons {
  //for edge
  float: right;
}
.header-placeholder {
  height: 54px;
}
.links {
  text-decoration: underline;
}
.return-to-shopping {
  &__text {
    display: block;
  }
  &__icon {
    display: none;
  }
}
.account {
  &__text {
    display: block;
  }
  &__icon {
    display: none;
  }
}
@media (max-width: 767px) {
  .return-to-shopping {
    &__text {
      display: none;
    }
    &__icon {
      display: block;
    }
  }
  .account {
    &__text {
      display: none;
    }
    &__icon {
      display: block;
    }
  }
  .row.middle-xs {
    margin: 0 -15px;

    &.py5 {
      margin: 0;
    }
  }
  .col-xs-2:first-of-type {
    padding-left: 0;
  }
  .col-xs-2:last-of-type {
    padding-right: 0;
  }
  a,
  span {
    font-size: 12px;
  }
}
</style>
