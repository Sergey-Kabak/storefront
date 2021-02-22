<template>
  <div id="home">
    <section class="v-container">
      <home-carousel />
    </section>
    <!--<head-image />-->

    <section class="v-container offer-gallery">
      <div class="gallery-title">
        {{ $t('Popular categories') }}
      </div>
      <div class="banner-group">
        <router-link class="banner" :to="formatCategoryLink(category)"  v-for="(category, index) in categoriesData" :key="index">
          <div class="text">
            <div class="title">{{ $t(category.title) }}</div>
            <div class="description">{{ $t(category.description) }}</div>
          </div>
          <img :src="category.image" alt="index" class="image">
        </router-link>
      </div>
    </section>
    <!--<head-image />-->
    <!--<promoted-offers />-->

    <section class="v-container ">
      <div>
        <header class="col-md-12">
          <h2 class="cl-accent">
            {{ $t('Promotions') }}
          </h2>
        </header>
      </div>
      <div class="center-xs">
        <lazy-hydrate :trigger-hydration="!loading" v-if="isLazyHydrateEnabled">
          <product-listing columns="4" :products="getStockGoods" gtm-list="home page" />
        </lazy-hydrate>
        <product-listing v-else columns="4" :products="getStockGoods" gtm-list="home page" />
        <button-full
          class="mt35 show-all"
          type="submit"
          @click.native="goToCategory('stockGoods')"
          :aria-label="$t('See all')"
        >
          {{ $t('See all') }}
        </button-full>
      </div>
    </section>

    <section class="v-container ">
      <header class="col-md-12">
        <h2 class="cl-accent">
          {{ $t('Audio equipment') }}
        </h2>
      </header>
      <div class="center-xs">
        <lazy-hydrate :trigger-hydration="!loading" v-if="isLazyHydrateEnabled">
          <product-listing columns="4" :products="getSalesLeaders" gtm-list="home page" />
          <!--<product-listing columns="4" :products="products" />-->
        </lazy-hydrate>
        <product-listing v-else columns="4" :products="getSalesLeaders" gtm-list="home page" />
        <!--<product-listing v-else columns="4" :products="products" />-->
        <button-full
          class="mt35 show-all"
          type="submit"
          @click.native="goToCategory('salesLeaders')"
          :aria-label="$t('See all')"
        >
          {{ $t('See all') }}
        </button-full>
      </div>
    </section>

    <section class="v-container section__banner">
      <div class="banner">
        <picture>
          <source srcset="/assets/promo/delivery_promo_288x260.jpg" media="(max-width: 400px)">
          <source srcset="/assets/promo/delivery_promo_1324x260.jpg">
          <img v-lazy="'/assets/promo/delivery_promo_1324x260.jpg'" class="promo-image" alt="delivery promo image">
        </picture>
      </div>
    </section>

    <section v-if="isOnline" class="v-container section__shares">
      <header class="col-md-12">
        <h2 class="cl-accent">
          {{ $t('Our shares') }}
        </h2>
      </header>
      <section>
        <home-carousel />
      </section>

    <section class="v-container ">
      <div>
        <header class="col-md-12">
          <h2 class="cl-accent">
            {{ $t('Everything new') }}
          </h2>
        </header>
      </div>
      <div class="center-xs">
          <lazy-hydrate :trigger-hydration="!loading" v-if="isLazyHydrateEnabled">
            <product-listing columns="4" :products="getNew" gtm-list="home page" />
          </lazy-hydrate>
          <product-listing v-else columns="4" :products="getNew" gtm-list="home page" />

          <button-full
            class="mt35 show-all"
            type="submit"
            @click.native="goToCategory('new')"
            :aria-label="$t('See all')"
        >
          {{ $t('See all') }}
        </button-full>
      </div>
    </section>
    <section class="v-container ">
      <div>
        <header class="col-md-12">
          <h2 class="cl-accent">
            {{ $t('May suit you') }}
          </h2>
        </header>
      </div>
      <div class="center-xs">
        <lazy-hydrate :trigger-hydration="!loading" v-if="isLazyHydrateEnabled">
          <!--<product-listing columns="4" :products="getBestsellers" />-->
          <product-listing columns="4" :products="getRecommends" gtm-list="home page" />
        </lazy-hydrate>
        <!--<product-listing v-else columns="4" :products="getBestsellers" />-->
        <product-listing v-else columns="4" :products="getRecommends" gtm-list="home page" />
          <button-full
            class="mt35 show-all"
            type="submit"
            @click.native="goToCategory('recommends')"
            :aria-label="$t('See all')"
          >
            {{ $t('See all') }}
          </button-full>
      </div>
    </section>
    <Onboard />
  </div>
</template>

<script>
// query constructor
import {
  isServer,
  onlineHelper
} from '@vue-storefront/core/helpers';
import LazyHydrate from 'vue-lazy-hydration';

// Core pages
import Home from '@vue-storefront/core/pages/Home';
// Theme core components
import ProductListing from 'theme/components/core/ProductListing';
// Theme local components
import Onboard from 'theme/components/theme/blocks/Home/Onboard';
import TileLinks from 'theme/components/theme/blocks/TileLinks/TileLinks';
import { Logger } from '@vue-storefront/core/lib/logger';
import { mapGetters } from 'vuex';
import config from 'config';
import { registerModule } from '@vue-storefront/core/lib/modules';
import { RecentlyViewedModule } from '@vue-storefront/core/modules/recently-viewed';
import { clearAllBodyScrollLocks } from 'body-scroll-lock';
import ButtonFull from 'theme/components/theme/ButtonFull.vue';
import NoSSR from 'vue-no-ssr';
import HomeCarousel from 'theme/components/theme/blocks/HomeCarousel';
import { formatCategoryLink } from '@vue-storefront/core/modules/url/helpers';
import { ProductOption } from '@vue-storefront/core/modules/catalog/components/ProductOption.ts';
import GTM from '../mixins/GTM/dataLayer'

export default {
  data () {
    return {
      loading: true,
      carouselTransitionSpeed: 300,
      currentPage: 0,
      hideImageAtIndex: null,
      currentSlide: 0,
      gallery: [],
      productName: '',
      products: [],
      stockGoodsProduct: [],
      salesLeadersProduct: [],
      newProduct: [],
      recommendsProduct: [],
      formatCategoryLink
    }
  },
  mixins: [Home, ProductOption, GTM],
  components: {
    'no-ssr': NoSSR,
    HomeCarousel,
    Onboard,
    ProductListing,
    LazyHydrate,
    ButtonFull
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
    ...mapGetters(
      'homepage',
      ['getStockGoods', 'getSalesLeaders', 'getNew', 'getRecommends'],
      {
        getAvailableFilters: 'category-next/getAvailableFilters',
        getFilter: 'custom-attr/getFilter'
      }
    ),
    categories () {
      return this.getCategories
    },
    isOnline () {
      return onlineHelper.isOnline
    },
    isLazyHydrateEnabled () {
      return config.ssr.lazyHydrateFor.some(
        field => ['homepage', 'homepage.stock_goods', 'homepage.sales_leaders', 'homepage.new_products', 'homepage.recommends'].includes(field)
      )
    },
    categoriesData() {
      return config && config.actualCategory
    }
  },
  beforeCreate () {
    registerModule(RecentlyViewedModule)
  },
  async beforeMount () {
    if (this.$store.state.__DEMO_MODE__) {
      const onboardingClaim = await this.$store.dispatch('claims/check', { claimCode: 'onboardingAccepted' })
      if (!onboardingClaim) { // show onboarding info
        this.$bus.$emit('modal-toggle', 'modal-onboard')
        this.$store.dispatch('claims/set', { claimCode: 'onboardingAccepted', value: true })
      }
    }
  },
  methods: {
    goToCategory (cat) {
      let link = formatCategoryLink(config && config.catLinks[cat])
      return this.$router.push(link)
    }
  },
  destroyed () {
    clearAllBodyScrollLocks()
  },
  watch: {
    getStockGoods: function (val) {
      this.GTM_PRODUCT_IMPRESSION(val, 'homepage', this.$store.getters['custom-attr/getFilter'])
    },
    getSalesLeaders: function (val) {
      this.GTM_PRODUCT_IMPRESSION(val, 'homepage', this.$store.getters['custom-attr/getFilter'])
    },
    getNew: function (val) {
      this.GTM_PRODUCT_IMPRESSION(val, 'homepage', this.$store.getters['custom-attr/getFilter'])
    },
    getRecommends: function (val) {
      this.GTM_PRODUCT_IMPRESSION(val, 'homepage', this.$store.getters['custom-attr/getFilter'])
    },
    isLoggedIn () {
      const redirectObj = localStorage.getItem('redirect')
      if (redirectObj) this.$router.push(redirectObj)
      localStorage.removeItem('redirect')
    }
  },
  async asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
    Logger.info('Calling asyncData in Home (theme)')()

    await Promise.all([
      store.dispatch('homepage/loadStockGoods'),
      store.dispatch('homepage/loadSalesLeaders'),
      store.dispatch('homepage/loadNew'),
      store.dispatch('homepage/loadRecommends'),
      store.dispatch('slider/getHomeCarousel')
    ])
  },

  beforeRouteEnter (to, from, next) {
    if (!isServer && !from.name) { // Loading products to cache on SSR render
      next(vm => {
        vm.$store.dispatch('homepage/loadStockGoods').then(res => {
          vm.loading = false
        })
        vm.$store.dispatch('homepage/loadSalesLeaders').then(res => {
          vm.loading = false
        })
        vm.$store.dispatch('homepage/loadNew').then(res => {
          vm.loading = false
        })
        vm.$store.dispatch('homepage/loadRecommends').then(res => {
          vm.loading = false
        })
        vm.$store.dispatch('slider/getHomeCarousel').then(res => {
          vm.loading = false
        })
      })
    } else {
      next()
    }
  }
}
</script>

<style lang="sass" scoped>
  #home
    h2
      font-family: 'DIN Pro'
      font-size: 24px
      line-height: 30px
      color: #1A1919
      margin-top: 0;
      margin-bottom: 33px;
      padding-left: 0;
    .show-all
      min-width: 233px
      margin: 31px auto 68px auto
      width: auto
      background-color: transparent
      border: 1px solid #23BE20
      box-sizing: border-box
      border-radius: 4px
      color: #1A1919
      padding: 12px 60px
      font-family: 'DIN Pro'
      font-style: normal
      font-weight: bold
      font-size: 15px
      line-height: 16px
  .main-carousel
    .VueCarousel
      &-slide
        padding: 0 3px
        box-sizing: border-box
        border: none
        img
          display: block
          width: 100%
          height: 500px
      &-dot
        &-button
          background: #E0E0E0 !important
        &--active
          .VueCarousel-dot-button
            background: #23BE20 !important
  .offer-gallery
    margin-bottom: 68px;

  .gallery-title
    margin: 68px 0px 32px 0px
    font-family: 'DIN Pro'
    font-style: normal
    font-weight: bold
    font-size: 24px
    line-height: 30px
    color: #1A1919
</style>

<style lang="scss" scoped>
@import '~theme/css/helpers/mixins';

  .v-container {
    width: 95%;

    @media only screen and (max-width: 600px) {
      width: 90%;
    }
  }

  .promo-image {
    width: 100%;

    @media only screen and (max-width: 400px) {
      border-radius: 4px;
    }
  }

  .banner-group {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 20px;

    .banner {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap-reverse;
      align-items: space-between;
      grid-column: span 2;
      box-sizing: border-box;
      background: #F6F7FA;
      border-radius: 4px;
      padding: 24px;
      padding-right: 40px;
      position: relative;
      height: 320px;
      
      &:last-child {
        @media only screen and (max-width: 768px) {
          padding-right: 64px;
          padding: 10px 16px 26px 16px;
        }
      }
      &:nth-child(3n + 2) {
        background: #E4F9E4;
      }

      &:nth-child(n + 4) {
        grid-column: span 3;
      }

      .image {
        display: block;
        max-width: 50%;
        height: auto;
        max-height: 270px;
        object-fit: contain;
      }

      .title {
        font-family: DIN Pro;
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 23px;
        color: #1A1919;
      }

      .description {
        font-family: DIN Pro;
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        line-height: 18px;
        color: #595858;
        margin-top: 8px;

        @media only screen and (max-width: 768px) {
          margin: 0;
          margin-top: 8px;
        }
      }

      .text {
        width: 50%;
      }
    }
  }


  .new-collection {
    @media (max-width: 767px) {
      padding-top: 0;
    }
  }

  @media (max-width: 1024px) {
    .banner-group {
      .banner {
        padding: 16px;
        flex-direction: column-reverse;
        align-items: center;
        justify-content: space-between;
        height: 100%;

        .text {
          width: 100%;
        }

        .image {
          max-width: 100%;
          margin-bottom: 16px;
          width: auto;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .gallery-title {
      margin: 48px 0px 24px 0px;
    }

    .text {
      margin-top: auto;
      // height: 68px;

    }
    
    .banner-group {
      grid-gap: 16px;
      .banner {
        grid-column: span 3;
        height: auto;
        justify-content: flex-end;

        &:last-child {
          grid-column: span 6;
          flex-direction: row;
          align-items: center;
          justify-content: flex-end;
          flex-wrap: nowrap;

          .text {
            width: auto;
            margin-right: 6px;
          }
        }

        .title {
          font-size: 15px;
          line-height: 19px;
        }

        .description {
          font-size: 13px;
          line-height: 16px;
          @include maxLines(3);
        }

        &:last-child {
          .image {
            margin-bottom: 0;
          }
          .text {
            width: 100%;
          }
        }
      }
    }

    @media (max-width: 540px) {
      .banner-group {
        .banner {
          .image {
            width: auto;
            height: 100px;
            margin-bottom: 37px;
          }
          .text {
            margin-top: unset;
          }
        }
      }

      #home {
        .show-all {
          max-width: 100%;
          width: 100%;
        }
      }
    }
  }

  .section {
    &__shares {
      padding-bottom: 31px;
    }
    &__banner {
      margin-bottom: 68px;

      @media only screen and (max-width: 768px) {
        margin-bottom: 54px;
      }
    }
  }

  .offer-gallery {
    @media only screen and (max-width: 768px) {
      margin-bottom: 49px;
    }
  }
  #home h2 {
    @media only screen and (max-width: 768px) {
      margin-bottom: 23px;
    }
  }

</style>
