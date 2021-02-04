<template>
  <footer :class="{ 'brdr-top-1 brdr-cl-secondary': isCheckoutPage }">
    <div
      class="footer-links"
      v-if="!isCheckoutPage"
    >
      <div class="v-container footer-wrap">
        <div class="start-md">
          <logo width="89" height="auto"/>
          <social></social>
          <div class="copyright">{{ $t('All rights reserved.') }} <br> “ringoo” Copyright {{ new Date().getFullYear() }}</div>
        </div>
        <div class="start-md" v-for="(footerColumn, index) in footerColumns" :key="index">
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
        </div>
        <div class="start-md">
          <h2 class="footer-title">
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
          <h2 class="footer-title">
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

export default {
  mixins: [CurrentPage],
  components: {
    Logo,
    BackToTop,
    Social
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
      return [{
        title: 'Catalog',
        routes: this.visibleCategories
      }, {
        title: 'To customers',
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
          name: 'Use promotional code',
          url_path: '/info/using-a-promo-code'
        }, {
          name: 'Public offer',
          url_path: '/info/public-offer'
        }]
      }, {
        title: 'About Us',
        routes: [{
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
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-secondary: color(secondary);

.v-container {
  width: 90%;
  padding: 16px 0;
}

.footer-wrap {
  display: grid;
  grid-gap: 48px;
  grid-template-columns: repeat(auto-fill, minmax(205px, 1fr));
}

.start-md {
  display: flex;
  flex-direction: column;
}

.custom-logo {
  max-width: 89px;
  margin: 0 0 32px 0px;
}

.copyright {
  margin-top: auto;
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
      font-size: 18px;
      line-height: 24px;
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
