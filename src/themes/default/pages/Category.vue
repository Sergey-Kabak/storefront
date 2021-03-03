<template>
  <div id="category" :class="{march: isMarchPromo}">
    <March8 v-if="isMarchPromo" />
    <header>
      <div class="v-container">
        <breadcrumbs v-if="!isMarchPromo" withHomepage />
        <mobile-breadcrumbs v-if="!isMarchPromo" withHomepage />
        <category-promo v-if="!isMarchPromo && (getCurrentCategory.image || getCurrentCategory.description)" />
        <div class="title">
          <h1 class="category-title">
            {{ getCurrentCategory.name }}
          </h1>
          <span class="products-count mobile">
            {{ $tc('{count} items', getCategoryProductsTotal) }}
          </span>
        </div>
      </div>
      <div class="v-container">
        <div class="mobile-actions">
          <div class="mobile-sorting">
            <sort-by
              @change="changeFilter"
              :value="getCurrentSearchQuery.sort"
            />
          </div>
          <button
            class="mobile-filters-button"
            @click="openFilters"
          >
            {{ $t('Filters') }}
            <span v-if="filterLength">{{ filterLength }}</span>
          </button>
        </div>
      </div>
    </header>
    <div class="v-container">
      <div class="category">
        <div class="category-filters">
          <p class="products-count">
            {{ $tc('{count} items chosen', getCategoryProductsTotal) }}
          </p>
          <sidebar :filters="getAvailableFilters" @changeFilter="changeFilter" />
          <img v-if="isMarchPromo" class="march-promo-image" src="/assets/promo/march-8-bg-image.jpg" alt="">
        </div>
        <div class="mobile-filters" v-show="mobileFilters">
          <div class="filter-overlay" :class="{'hasFilters' : Object.keys(getCurrentSearchQuery.filters).length > 0}">
            <div
              @click="closeFilters"
              class="close-container w-100"
            >
              <span class="material-icons">
                keyboard_arrow_left
              </span>
              <span class="close-text">Назад</span>
            </div>
            <sidebar :filters="getAvailableFilters" @changeFilter="changeFilter" />
            <div
              v-if="Object.keys(getCurrentSearchQuery.filters).length > 0"
              class="active-filters-mobile"
            >
              <div class="selected-products">
                {{ $tc('{count} items', getCategoryProductsTotal) }}
              </div>

              <div class="buttons-group">
                <button-full
                  class="buttons-group"
                  @click.native="resetAllFilters"
                  :aria-label="$t('Clear all')"
                >
                  {{$t('Clear all')}}
                </button-full>
                <button-full
                  class="buttons-group"
                  @click.native="closeFilters"
                  :aria-label="$t('show')"
                >
                  {{$t('show')}}
                </button-full>
              </div>
            </div>
          </div>
        </div>
        <div class="products-list">
          <div class="category-sort">
            <span class="product-sorting">{{ $t('First') }}: </span>
            <new-sort-by
              :has-label="true"
              @change="changeFilter"
              :value="getCurrentSearchQuery.sort"
            />
          </div>
          <div v-if="isCategoryEmpty" class="hidden-xs">
            <h4 data-testid="noProductsInfo">
              {{ $t('No products found!') }}
            </h4>
            <p>{{ $t('Please change Your search criteria and try again. If still not finding anything relevant, please visit the Home page and try out some of our bestsellers!') }}</p>
          </div>
          <lazy-hydrate :trigger-hydration="!loading" v-if="isLazyHydrateEnabled">
            <product-listing :products="getCategoryProducts" />
          </lazy-hydrate>
          <product-listing v-else :products="getCategoryProducts" gtm-list="category" />
          <button-white
            v-if="!allProductsLoaded" @click.native="onBottomScroll"
            class="load">
            {{ $t('Load more') }}
            <spinner class="spinner" v-if="loadingProducts && !allProductsLoaded" />
          </button-white>
          <div class="march-description-wrapper promo-description-wrapper" v-if="isMarchPromo && getCurrentCategory.description">
            <h3 class="march-title promo-title font">{{ $t('Description of the action') }}</h3>
            <div class="march-description promo-description font">
              <div class="" v-html="getCurrentCategory.description"></div>
            </div>
            <promo-expiry-date
              class="march-expiry-date promo-expiry-date"
              v-if="getCurrentCategory.custom_design_from && getCurrentCategory.custom_design_from"
              :to="getCurrentCategory.custom_design_to"
              :from="getCurrentCategory.custom_design_from" />
          </div>
          <no-ssr>
            <description v-if="isDescription" />
          </no-ssr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PromoExpiryDate from '../components/core/blocks/Category/PromoExpiryDate';
import LazyHydrate from 'vue-lazy-hydration';
import Sidebar from '../components/core/blocks/Category/Sidebar.vue';
import ProductListing from '../components/core/ProductListing.vue';
import Breadcrumbs from '../components/core/Breadcrumbs.vue';
import MobileBreadcrumbs from '../components/core/MobileBreadcrumbs.vue';
import NewSortBy from '../components/core/NewSortBy.vue';
import SortBy from '../components/core/SortBy.vue';
import { isServer } from '@vue-storefront/core/helpers';
import { getSearchOptionsFromRouteParams } from '@vue-storefront/core/modules/catalog-next/helpers/categoryHelpers';
import config from 'config';
import ButtonFull from 'theme/components/theme/ButtonFull.vue';
import { mapGetters } from 'vuex';
import onBottomScroll from '@vue-storefront/core/mixins/onBottomScroll';
import { catalogHooksExecutors } from '@vue-storefront/core/modules/catalog-next/hooks';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { htmlDecode } from '@vue-storefront/core/filters';
import CountDown from "../components/core/CountDown";
import Spinner from "../components/core/Spinner";
import GTM from '../mixins/GTM/dataLayer'
import Description from "../components/core/blocks/Category/Description";
import ButtonWhite from "../components/core/blocks/Product/ButtonWhite";
import NoSSR from 'vue-no-ssr';
import March8 from '../components/core/blocks/Category/Promotions/March8';
import CategoryPromo from '../components/core/blocks/Category/CategoryPromo';
const THEME_PAGE_SIZE = 32
const composeInitialPageState = async (store, route, forceLoad = false) => {
  try {
    const filters = getSearchOptionsFromRouteParams(route.params)
    const cachedCategory = store.getters['category-next/getCategoryFrom'](route.path)
    const currentCategory = cachedCategory && !forceLoad ? cachedCategory : await store.dispatch('category-next/loadCategory', { filters })
    const pageSize = store.getters['url/isBackRoute'] ? store.getters['url/getCurrentRoute'].categoryPageSize : THEME_PAGE_SIZE
    // TODO: REMOVE
    if (currentCategory.id === 911) {
      currentCategory.filterable_attributes.unshift('kategorija', 'znizhka')
    }
    let options = []
    // 961 - 8 March (promotion)
    if (currentCategory.id === 961) {
      options.concat(['category_ids', 'kategorija'])
    }
    await store.dispatch('attribute/list', { filterValues: [...currentCategory.filterable_attributes, ...options], size: [...currentCategory.filterable_attributes, ...options].length })
    await store.dispatch('category-next/loadCategoryProducts', { route, category: currentCategory, pageSize })
    const breadCrumbsLoader = store.dispatch('category-next/loadCategoryBreadcrumbs', { category: currentCategory, currentRouteName: currentCategory.name, omitCurrent: true })
    if (isServer) await breadCrumbsLoader
    catalogHooksExecutors.categoryPageVisited(currentCategory)
  } catch (e) {
    console.error('Problem with setting Category initial data!', e)
  }
}

export default {
  components: {
    CountDown,
    LazyHydrate,
    ButtonFull,
    ProductListing,
    Breadcrumbs,
    MobileBreadcrumbs,
    Sidebar,
    SortBy,
    NewSortBy,
    Spinner,
    Description,
    ButtonWhite,
    'no-ssr': NoSSR,
    March8,
    PromoExpiryDate,
    CategoryPromo
  },
  mixins: [onBottomScroll, GTM],
  data () {
    return {
      mobileFilters: false,
      loadingProducts: false,
      loading: true,
      timerData: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      },
      expired: null,
      interval: null,
      isDescriptionActive: false,
      touchX: 0,
      touchY: 0
    }
  },
  computed: {
    ...mapGetters({
      getCurrentSearchQuery: 'category-next/getCurrentSearchQuery',
      getCategoryProducts: 'category-next/getCategoryProducts',
      getCurrentCategory: 'category-next/getCurrentCategory',
      getCategoryProductsTotal: 'category-next/getCategoryProductsTotal',
      getAvailableFilters: 'category-next/getAvailableFilters',
      getCategorySearchProductsStats: 'category-next/getCategorySearchProductsStats'
    }),
    isMarchPromo () {
      return this.$route.path.search('/8-march') >= 0
    },
    isDescription () {
      return !!this.getCurrentCategory
    },
    allProductsLoaded () {
      return this.getCategorySearchProductsStats.perPage + this.getCategorySearchProductsStats.start >= this.getCategorySearchProductsStats.total
    },
    isLazyHydrateEnabled () {
      return config.ssr.lazyHydrateFor.includes('category-next.products')
    },
    isCategoryEmpty () {
      return this.getCategoryProductsTotal === 0
    },
    filterLength () {
      return Object.keys(this.getCurrentSearchQuery && this.getCurrentSearchQuery.filters).length
    }
  },
  mounted () {
    window.addEventListener('touchstart', this.touchStart)
    window.addEventListener('touchend', this.touchEnd)
  },
  async asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data - and it's always executed before parent component methods
    if (context) context.output.cacheTags.add('category')
    await composeInitialPageState(store, route)
  },
  async beforeRouteEnter (to, from, next) {
    if (isServer) next() // SSR no need to invoke SW caching here
    else if (!from.name) { // SSR but client side invocation, we need to cache products and invoke requests from asyncData for offline support
      next(async vm => {
        vm.loading = true
        await composeInitialPageState(vm.$store, to, true)
        await vm.$store.dispatch('category-next/cacheProducts', { route: to }) // await here is because we must wait for the hydration
        vm.loading = false
      })
    } else { // Pure CSR, with no initial category state
      next(async vm => {
        vm.loading = true
        vm.$store.dispatch('category-next/cacheProducts', { route: to })
        vm.loading = false
      })
    }
  },
  methods: {
    touchStart (e) {
      this.touchX = e.targetTouches[0].clientX
      this.touchY = e.targetTouches[0].clientY
    },
    touchEnd (e) {
      if (e.changedTouches[0].clientX - this.touchX > 200 && (e.changedTouches[0].clientY + 75 > this.touchY && e.changedTouches[0].clientY - 75 < this.touchY)) {
        this.mobileFilters = false
        document.querySelector('body').style.overflow = ''
      }
    },
    resetAllFilters () {
      this.$store.dispatch('category-next/resetSearchFilters')
    },
    openFilters () {
      document.querySelector('body').style.overflow = 'hidden'
      this.mobileFilters = true
    },
    closeFilters () {
      document.querySelector('body').style.overflow = ''
      this.mobileFilters = false
    },
    async changeFilter (filterVariant) {
      this.$store.dispatch('category-next/switchSearchFilters', [filterVariant])
    },
    async onBottomScroll () {
      let scrollBarPosition = window.pageYOffset
      if (this.loadingProducts) return
      this.loadingProducts = true
      try {
        await this.$store.dispatch('category-next/loadMoreCategoryProducts')
      } catch (e) {
        console.error('Problem with fetching more products', e)
      } finally {
        window.scrollTo(0, scrollBarPosition)
        this.loadingProducts = false
      }
    }
  },
  beforeDestroy () {
    this.closeFilters()
    window.removeEventListener('touchstart', this.touchStart)
    window.removeEventListener('touchend', this.touchEnd)
  },
  metaInfo () {
    const storeView = currentStoreView()
    const { meta_title, meta_description, name, slug } = this.getCurrentCategory
    const meta = meta_description ? [
      { vmid: 'description', name: 'description', content: htmlDecode(meta_description) }
    ] : []
    return {
      title: htmlDecode(meta_title || name),
      meta,
      link: [
        {
          rel: 'canonical',
          href: 'https://ringoo.ua' + this.$route.path
        }
      ]
    }
  },
  watch: {
    getCategoryProducts: function (val) {
      this.GTM_PRODUCT_IMPRESSION(val, 'category')
    }
  }
}
</script>

<style lang="scss" scoped>
.font{
  font-family: 'DIN Pro';
  font-style: normal;
  display: block;
  margin-bottom: 16px;
}
.march{
  @media (min-width: 768px) {
    background-image: url('/assets/promo/march-8-bg-dots.jpg');
    background-repeat: no-repeat;
    background-position: 97% 94%;
    background-attachment: fixed;
  }
  &-description{
    &-wrapper{
      position: relative;
      background: linear-gradient(0deg, transparent, #fff, transparent);
      margin: 68px auto 68px;
      max-width: 988px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    font-size: 15px;
    line-height: 24px;
    text-align: center;
    color: #5F5E5E;
    ::v-deep p {
      margin: 0 !important;
      text-align: left;
    }
  }
  &-title{
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    color: #1A1919;
    margin-top: 0;
  }
  &-expiry-date{
    width: auto;
    padding: 0;
    position: static;
  }
}
.march-promo-image{
  max-width: 100%;
}
$mobile_screen : 768px;
  ::v-deep .spinner{
    display: flex;
    justify-content: center;
    position: relative;
    top: 30px;
  }
  .active-filters-mobile{
    position: fixed;
    bottom: 0;
    right: 0;
    width: calc(100% - 32px);
    padding: 16px;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.25);
    .selected-products{
      display: block;
      text-align: center;
      font-size: 13px;
      line-height: 16px;
      color: #1A1919;
      margin-bottom: 16px;
    }
    .buttons-group{
      display: flex;
      button{
        &:first-child{
          background-color: #fff;
          color: #1A1919;
        }
        &:not(:last-child){
          margin-right: 16px;
        }
        padding-top: 10px;
        padding-bottom: 10px;
        max-height: 40px;
        font-weight: 700;
        min-width: 1px;
        flex: 1;
        display: block;
        text-align: center;
        font-size: 15px;
        max-width: 50%;
        border: 1px solid #23BE20;
        box-sizing: border-box;
        border-radius: 4px;
      }
    }
  }

  .category {
    @media (max-width: 767px) {
      padding-bottom: 48px;
    }
    display: flex;
    padding-bottom: 68px;
  }

  .products-list {
    width: 100%;
  }

  .breadcrumbs {
    margin-bottom: 24px;
    &.mobile {
      display: none;
    }
  }

  .divider{
      @media (max-width : $mobile_screen){
        left: 0 !important;
        width: 100% !important;
      }
  }
  .btn {
    &__filter {
      min-width: 100px;
    }
  }
  .divider {
    width: calc(100vw - 8px);
    bottom: 20px;
    left: -36px;
  }
  .category-filters {
    box-sizing: border-box;
    max-width: 319px;
    min-width: 240px;
    width: 100%;
    margin-right: 20px;
  }

  .products-count {
    margin: 0 0 29px 0;
    font-family: DIN Pro;
    font-style: normal;
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    color: #1A1919;

    &.mobile {
      display: none;
    }
  }

  .product-sorting {
    font-family: DIN Pro;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    color: #1A1919;
    margin-right: 12px;
  }

  .mobile-filters {
    display: none;
    overflow: auto;
    padding: 0;
    /deep/ .filter{
      &:last-child{
        .filter-body{
          border:none;
          .price-selector{
            margin-bottom: 0;
            .inputs{
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }

  .mobile-filters-button {
    display: none;
    background: #FFFFFF;
    border: 1px solid #23BE20;
    box-sizing: border-box;
    font-weight: 700;
    border-radius: 4px;
    font-family: DIN Pro;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #000000;
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: DIN Pro;
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      color: #FFFFFF;
      background: #23BE20;
      border-radius: 100%;
      min-width: 24px;
      min-height: 24px;
      margin-left: 7px;
    }
  }

  .mobile-sorting {
    display: none;
  }

  .title {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    margin: 0px 0px 24px 0;

    .category-title {
      display: inline;
      margin: 0;
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 600;
      font-size: 36px;
      line-height: 46px;
      display: inline-block;
      color: #1A1919;
    }
  }

  .sorting {
    label {
      margin-right: 10px;
    }
  }

  .category-sort {
    display: flex;
    align-items: center;
    margin: 0px 0px 28px 0;
  }

  @media (max-width: 768px) {
    .title {
      .category-title {
        display: flex;
        align-items: flex-end;
        font-size: 24px;
        line-height: 30px;
        margin: 0px 8px 8px 0px;
      }
    }

    .products-list {
      width: 100%;
      max-width: none;
      padding: 0 !important;
    }

    .mobile-filters {
      display: block;
    }

    .mobile-filters-button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
    }

    .sorting {
      display: none;
    }

    .mobile-sorting {
      display: block;
      flex: 0 0 40%;
    }

    .category-filters {
      display: none;
    }

    .product-listing {
      justify-content: center;;
    }

    .mobile-filters {
      .filter-overlay{
        &.hasFilters{
          padding-bottom: 130px;
        }
        min-height: 100%;
        padding: 16px;
        display: flex;
        flex-direction: column;
        background-color: #fff;
        width: calc(100% - 32px);
        margin-left: auto;
        box-sizing: border-box;
        .close-container{
          cursor: pointer;
          display: flex;
          align-items: center;
          position: relative;
          left: -7px;
          .material-icons{
            color: #23BE20;
            margin-right: 3px;
          }
          .close-text{
            color: #23BE20;
            font-size: 13px;
            line-height: 16px;
          }
        }
      }
      position: fixed;
      background-color: rgba(0,0,0,0.38);
      z-index: 5;
      left: 0;
      width: 100%;
      height: 100%;
      top: 0;
      box-sizing: border-box;
    }

    .mobile-filters-body {
      padding-top: 50px;
    }

    .products-count {
      margin: 0px;
      line-height: 18px;

      &.mobile {
        display: inline;
      }
    }

    .mobile-actions {
      justify-content: space-between;
      display: flex;
      & > * {
        flex: 0 0 48%;
      }
    }

    .category-sort {
      display: none;
    }

    header {
      margin-bottom: 16px;
    }

    .breadcrumbs {
      display: none;
      &.mobile {
        display: block;
      }
    }
  }

  .next-button {
    display: inline-block;
    margin-top: 16px;
    cursor: pointer;
    padding: 4px 0px;
    font-family: DIN Pro;
    font-size: 13px;
    line-height: 16px;
    color: #1A1919;
    border-bottom: 1px dashed #1A1919;

    &--close {
      margin-top: 24px;
    }
  }

  @media (max-width: 576px) {
    .next-button {
      display: inline-block;
    }


  }

  .close-container {
    left: 0;
  }

  .close {
    margin-left: auto;
  }

</style>
<style lang="scss">

.load{
  @media(max-width: 575px) {
    width: 100% !important;
  }
  margin: 32px auto 0;
}


@media (max-width: 950px) {
  .product-listing {
    grid-template-columns: 1fr 1fr!important;
  }
  .category-filters {
    max-width: 250px!important;
  }
}


@media (max-width: 500px) {
  .products-list {
    .product-listing  {
      .product {
        min-width: auto;

        &:nth-child(2n) {
          border-left: none;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }

        &:nth-child(2n-1) {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      }
    }
  }
}
</style>
