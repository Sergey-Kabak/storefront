<template>
  <div class="header">
    <header
      class="fixed w-100 brdr-bottom-1 bg-cl-primary brdr-cl-secondary"
      :class="{ 'is-visible': navVisible }"
    >
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
                class="cl-tertiary links"
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
      navbarHeight: 54
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

header {
  height: 54px;
  top: -55px;
  z-index: 3;
  transition: top 0.2s ease-in-out;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  &.is-visible {
    top: 0;
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
