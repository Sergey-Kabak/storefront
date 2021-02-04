<template>
  <footer :class="{ 'brdr-top-1 brdr-cl-secondary': isCheckoutPage }">
    <div
      class="footer-links"
      v-if="!isCheckoutPage"
    >
      <div class="v-container footer-wrap">
        <div class="start-md footer__cta-section">
          <logo width="89" height="auto"/>
          <social></social>
        </div>
        <div class="start-md footer__category" :class="{'footer__category--last': index===footerColumns.length-1}" v-for="(footerColumn, index) in footerColumns" :key="index">
          <div class="footer-title footer__category-title-wrapper"  :role="notDesktop ? 'button': 'presentation'" @click="catalogToggleState[footerColumn.title] = !catalogToggleState[footerColumn.title]">
            <template v-if="notDesktop">
              <span class="footer__category-title" :class="{ unfolded: !catalogToggleState[footerColumn.title] }">{{ $t(footerColumn.title) }}</span>
              <svg v-if="catalogToggleState[footerColumn.title]" class="footer__category-btn" :class="{ folded: catalogToggleState[footerColumn.title] }" width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="#E0E0E0"/>
              </svg>
              <svg v-else class="footer__category-btn" :class="{ folded: catalogToggleState[footerColumn.title] }" width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H0V0H14V2Z" fill="#E0E0E0"/>
              </svg>
            </template>
            <span v-else class="footer__category-title">{{ $t(footerColumn.title) }}</span>
          </div>
          <transition name="slide">
            <div class="footer-routes" v-if="!catalogToggleState[footerColumn.title]">
              <div :key="index" v-for="(cat, index) in footerColumn.routes" class="route">
                <router-link class="cl-secondary" :to="localizedRoute(`${cat.url_path}`)" exact>
                  {{ $t(cat.name) }}
                </router-link>
              </div>
            </div>
          </transition>
        </div>
        <div class="start-md">
          <h2 class="footer-title footer-title--contact">
            {{ $t('Contact') }}
          </h2>
          <div class="phone">
            <a href="tel:380970908707">+38 097 090 87 07</a>
            <a href="tel:380730908707">+38 073 090 87 07</a>
          </div>
          <div class="work_time">
            {{$t('work_time')}}
          </div>
          <div class="info">
            <span>{{ $t('Calls according to the tariffs of your operator') }}</span>
          </div>
          <h2 class="footer-title footer-title--accept">
            {{ $t('We accept') }}
          </h2>
          <div>
            <div class="payment">
              <img v-lazy="'/assets/payments/mastercard.svg'" alt="mastercard" class="payment-icon">
              <img v-lazy="'/assets/payments/visa.svg'" alt="visa" class="payment-icon">
              <img v-lazy="'/assets/payments/liqpay.svg'" alt="liqpay" class="payment-icon">
            </div>
          </div>
        </div>
      </div>
      <div class="v-container">
        <div class="copyright">{{ $t('All rights reserved.') }} “ringoo” Copyright © {{ new Date().getFullYear() }}</div>
      </div>
    </div>
    <back-to-top bottom="60px" right="20px" visibleoffset="200">
      <button type="button" class="btn-top button no-outline brdr-none cl-white py10 px10" aria-label="back-to-top">
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M5.83301 10.5L7.47801 12.145L12.833 6.80162V25.6666H15.1663V6.80162L20.5213 12.1566L22.1663 10.5L13.9997 2.33329L5.83301 10.5Z" fill="#23BE20"/>
        </svg>
      </button>
    </back-to-top>
  </footer>
</template>

<script>
import { localizedRoute } from '@vue-storefront/core/lib/multistore';
import CurrentPage from 'theme/mixins/currentPage';
import BackToTop from 'theme/components/core/BackToTop';
import config from 'config';
import Logo from 'theme/components/core/Logo';
import Social from 'theme/components/core/blocks/Footer/Social'
import { mapGetters } from 'vuex';
import mobileResolution from 'theme/mixins/mobileResolution'

const CATALOG = "Catalog"
const HELP = "Help"

export default {
  mixins: [CurrentPage, mobileResolution],
  components: {
    Logo,
    BackToTop,
    Social
  },
  name: 'MainFooter',
  data() {
    return {
      catalogToggleState: {
        [CATALOG]: true,
        [HELP]: true
      }
    }
  },
  methods: {
    fold(column) {
      column.folded = !column.folded
    },
    goToAccount () {
      this.$bus.$emit('modal-toggle', 'modal-signup')
    }
  },
  computed: {
    ...mapGetters('category-next', ['getMenuCategories']),
    ...mapGetters({
      isLogged: 'user/isLoggedIn'
    }),
    notDesktop() {
      return !this.isDesktop
    },
    multistoreEnabled () {
      return config.storeViews.multistore
    },
    getCategories () {
      return this.getMenuCategories
    },
    visibleCategories () {
      return this.categories.filter(category => {
        return category.include_in_menu && (category.product_count > 0 || category.children_count > 0)
      })
    },
    categories () {
      return this.getCategories.filter((op) => {
        return op.level === (config.entities.category.categoriesDynamicPrefetchLevel >= 0 ? config.entities.category.categoriesDynamicPrefetchLevel : 2) // display only the root level (level =1 => Default Category), categoriesDynamicPrefetchLevel = 2 by default
      })
    },
    footerColumns () {
      return [{
        title: CATALOG,
        routes: this.visibleCategories
      }, {
        title: HELP,
        routes: [{
          name: 'Payment and delivery',
          url_path: '/info/delivery'
        }, {
          name: 'Payments and loans',
          url_path: '/info/payments-and-loans'
        }, {
          name: 'Warranty, Exchange, Return',
          url_path: '/info/warranty-exchange-return'
        }, {
          name: 'Service centres',
          url_path: '/info/service-centers'
        }, {
          name: 'Use promotional code',
          url_path: '/info/using-a-promo-code'
        }, {
          name: 'Public offer',
          url_path: '/info/public-offer'
        }, {
          name: 'The shops',
          url_path: '/info/shops'
        }, {
          name: 'Company',
          url_path: '/info/company'
        }, {
          name: 'Vacancies',
          url_path: '/info/vacancy'
        }, {
          name: 'Own account',
          url_path: '/info/own-account'
        }, {
          name: 'To landlords',
          url_path: '/info/landlords'
        }]
      }]
    }
  },
  mounted() {
    for (const key in this.catalogToggleState) {
      this.catalogToggleState[key] = this.notDesktop
    }
  }
}
</script>

<style lang="scss" scoped>
%reset-button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;

    background: transparent;
    color: inherit;
    font: inherit;
    line-height: normal;
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;
    -webkit-appearance: none;
}

@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
@import '~theme/css/helpers/mixins';
$grey: #E0E0E0;
$border: 1px solid $grey;

$color-secondary: color(secondary);

.v-container {
  width: 92%;
  padding: 32px 0;

  @include tablet-view {
    padding: 16px 0;
    width: 100%
  }
}

.footer-wrap {
  display: flex;
  flex-wrap: wrap;
  
  & > * {
    flex: 1;
    margin-right: 15px;
  }
  & > *:last-child {
    flex: 1.3;
    margin-right: 0;
  }

  @include tablet-view {
    margin-bottom: 0;
    flex-direction: column;
    
    & > * {
      margin-right: 0;
    }
  }

}

.start-md {
  display: flex;
  flex-direction: column;

  @include tablet-view {
    padding: 0 16px;
  }
}

.footer {
  &__cta-section {
    @include tablet-view {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
    }
  }

  &__category {

    @include tablet-view {
      cursor: pointer;
    }
    &--last {
      @include tablet-view {
        margin-bottom: 24px;
      }
    }

    @include tablet-view {
      border-top: $border;
      border-bottom: $border;
      padding-top: 12px;
      padding-bottom: 12px;
    }
  }
  &__category-title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__category-title {
    &.unfolded {
      margin-bottom: 16px;
    }
  }
  &__category-btn {
    @extend %reset-button;

    font-size: 14px;
    color: $grey;

    &.folded {
      color: #23BE20;
    }

    &:hover path {
      color: #23BE20;
    }
  }
}
.custom-logo {
  max-width: 89px;
  margin: 0 0 32px 0px;

  @include tablet-view {
    margin: 0;
  }
}

.copyright {
  margin-top: auto;

  @media only screen and (max-width: 768px) {
    margin-top: 0;
  }
}

.footer-routes {
  .route {
    margin-bottom: 2px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.social {
  margin-bottom: 20px;
}

.footer-title {
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 0;
  font-size: 18px;
  line-height: 24px;
  margin: 0 0 16px 0;
  color: #FFFFFF;

  &--contact {
    @include tablet-view {
      margin-bottom: 16px !important;
    }
  }
  &--accept {
    @include tablet-view {
      margin-bottom: 16px !important;
    }
  }
  &.unfolded {
    margin: 0 0 16px 0;
  }
  @include tablet-view {
    margin: 0;
    // margin-bottom: 16px;
  }
}

.payment {
  display: flex;

  &-icon {
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }
  }
}

footer {
  margin-top: auto;
  border-top: $border;
  background-color: #1A1919;

  .color-white {
    color: white;
  }

  .copyright {
    margin-top: auto;
    font-family: 'DIN Pro';
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 16px;
    color: #fff;
    text-align: left;

    @media only screen and (max-width: 768px) {
      padding: 0 16px;
    }
  }
  h3 {
    font-family: 'DIN Pro';
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 24px;
    color: #1a1919;
  }
  h4 {
    font-family: 'DIN Pro';
    font-style: normal;
  }
  a.cl-secondary {
    font-family: 'DIN Pro';
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 24px;
    color: #BDBDBD;
    &:hover{
      &:after{
        display: none;
      }
      color: #FFFFFF;
    }
  }
  .phone {
    margin-bottom: 16px;

    a {
      display: block;
      font-family: 'DIN Pro';
      font-weight: 600;
      font-size: 15px;
      line-height: 16px;
      color: #23BE20;
      margin-bottom: 12px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .work_time{
    font-family: DIN Pro;
    font-size: 13px;
    line-height: 16px;
    color: #fff;
    margin-bottom: 12px;
  }

  .info {
    font-family: 'DIN Pro';
    font-size: 13px;
    line-height: 16px;
    color: #BDBDBD;
    padding-bottom: 16px;
    margin-bottom: 24px;
    border-bottom: $border;
  }
}

.icon {
  transition: 0.3s all;
}

.links {
  list-style-type: none;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-end;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }
}

.bottom-links {
  @media (max-width: 767px) {
    padding: 0;
  }
}

.footer__version-info {
  display: flex;
  color: $color-secondary;
  font-size: 0.7rem;
  @media (min-width: 768px) {
    margin-right: 1rem;
    font-size: 0.8rem;
  }
}

.underline {
  &:hover {
    color: $color-secondary;
    &:after {
      background-color: $color-secondary;
    }
  }
}
.legal-entity-link {
  text-align: center;
  @media (min-width: 768px) {
    display: none;
  }
}

.privacy-policy-link {
  text-align: right;
  @media (min-width: 768px) {
    display: none;
  }
}

@media (max-width: 595px) {
  .no-mobile {
    display: none;
  }

  .social {
    margin-top: 0;
  }

}
</style>
