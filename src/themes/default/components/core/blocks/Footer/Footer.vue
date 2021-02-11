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
          <template v-if="!isMobile">
            <h2 class="footer-title">
              {{ $t(footerColumn.title) }}
            </h2>
            <div class="footer-routes">
              <div :key="index" v-for="(cat, index) in footerColumn.routes" class="route">
                <router-link class="cl-secondary" :to="localizedRoute(`${cat.url_path}`)" exact>
                  {{ $t(cat.name) }}
                </router-link>
              </div>
            </div>
          </template>
          <CategoryFilter
            v-else
            class="footer-title"
            :label="$t(footerColumn.title)"
            noscroll
            :openByDefault="false"
          >
            <template #label="{ isActive }">
               <h2 class="footer-title" :class="{ open:isActive }" >
                {{ $t(footerColumn.title) }}
              </h2> 
            </template>
            <div class="footer-routes">
              <div :key="index" v-for="(cat, index) in footerColumn.routes" class="route">
                <router-link class="cl-secondary" :to="localizedRoute(`${cat.url_path}`)" exact>
                  {{ $t(cat.name) }}
                </router-link>
              </div>
            </div>  
          </CategoryFilter>
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
      <div class="v-container copyright__container">
        <div class="start-md copyright">{{ $t('All rights reserved.') }} “ringoo” Copyright © {{ new Date().getFullYear() }}</div>
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
import mobileResolution from 'theme/mixins/mobileResolution'
import { mapGetters } from 'vuex';
import CategoryFilter from 'theme/components/core/blocks/Category/CategoryFilter';

export default {
  mixins: [CurrentPage, mobileResolution],
  components: {
    Logo,
    BackToTop,
    Social,
    CategoryFilter
  },
  name: 'MainFooter',
  methods: {
    goToAccount () {
      this.$bus.$emit('modal-toggle', 'modal-signup')
    }
  },
  computed: {
    ...mapGetters('category-next', ['getMenuCategories']),
    ...mapGetters({
      isLogged: 'user/isLoggedIn'
    }),
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
      return [
        {
          title: 'Catalog',
          routes: this.visibleCategories
        },
        {
          title: 'To customers',
          routes: [
            {
              name: 'Payment and delivery',
              url_path: '/info/delivery'
            },
            {
              name: 'Payments and loans',
              url_path: '/info/payments-and-loans'
            },
            {
              name: 'Warranty, Exchange, Return',
              url_path: '/info/warranty-exchange-return'
            },
            {
              name: 'Use promotional code',
              url_path: '/info/using-a-promo-code'
            },
            {
              name: 'Public offer',
              url_path: '/info/public-offer'
            },
            {
              name: 'The shops',
              url_path: '/info/shops'
            },
            {
              name: 'Company',
              url_path: '/info/company'
            },
            {
              name: 'Vacancies',
              url_path: '/info/vacancy'
            },
            {
              name: 'Own account',
              url_path: '/info/own-account'
            },
            {
              name: 'To landlords',
              url_path: '/info/landlords'
            }
          ]
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
@import '~theme/css/helpers/mixins';

::v-deep .filter-header {
  padding: 0;
}
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
$grey: #E0E0E0;
$border: 1px solid $grey;

$color-secondary: color(secondary);

.v-container {
  width: 95%;
  padding: 32px 0;

  @media only screen and (max-width: 576px) {
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

  @media only screen and (max-width: 576px) {
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
  min-width: 250px;
  @media only screen and (max-width: 1200px) {
    min-width: 200px;
  }
  @media only screen and (max-width: 768px) {
    min-width: unset;
  }
  @media only screen and (max-width: 576px) {
    padding: 0 16px;
  }
}


.footer {
  &__cta-section {
    flex: unset;
    min-width: unset;
    margin-right: 129px;
    @media only screen and (max-width: 1200px) {
      margin-right: 0;
      min-width: 250px;
      flex: 1;
    }
    @media only screen and (max-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
      flex: 0 0 100%;
      margin-bottom: 12px;
    }
  }

  &__category {
    @media only screen and (max-width: 768px) {
      margin-bottom: 24px;
    }
    @media only screen and (max-width: 576px) {
      cursor: pointer;
      margin-bottom: 0;
      padding-right: 21px;
    }
    &--last {
      @media only screen and (max-width: 576px) {
        margin-bottom: 24px;
      }
    }

    @media only screen and (max-width: 576px) {
      border-top: $border;
      border-bottom: $border;
      padding-top: 12px;
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

  @media only screen and (max-width: 768px) {
    margin: 0;
  }
}

.copyright {
  margin-top: auto;

  &__container {
    @media only screen and (max-width: 768px) {
      padding: 8px 0;
    }
  }
}

.footer-routes {

  @media only screen and (max-width: 1200px) {
    margin-bottom: 20px;
  }
  @media only screen and (max-width: 768px) {
    margin-bottom: 0;
  }
  .route {
    margin-bottom: 2px;

    @media only screen and (max-width: 768px) {
      margin-bottom: 8px;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.social {
  margin-bottom: 20px;

  @media only screen and (max-width: 768px) {
    margin-bottom: 0;
  }
}

.footer-title {
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 0;
  font-size: 18px;
  line-height: 24px;
  margin: 0 0 16px 0;
  color: #FFFFFF;

  &.open {
    margin-bottom: 16px;
  }
  &--contact {
    @media only screen and (max-width: 576px) {
      margin-bottom: 16px !important;
    }
  }
  &--accept {
    @media only screen and (max-width: 576px) {
      margin-bottom: 16px !important;
    }
  }

  @media only screen and (max-width: 576px) {
    margin: 0;
  }
  @include mobile-view {
    font-size: 15px;
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
  border-top: 1px solid #E0E0E0;
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
      line-height: 18px;
      color: #23BE20;
      margin-bottom: 8px;

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
    border-bottom: 1px solid #fff;
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

  .footer-links {
    padding-bottom: 30px;
  }
}
</style>
