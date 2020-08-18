<template>
  <div id="category">
    <header class="pl20">
      <div class="container">
        <breadcrumbs />
        <div class="row middle-sm">
          <h1 class="col-sm-8 category-title mb10">
            {{ getCurrentCategory.name }}
          </h1>
          <div class="sorting col-sm-2 align-right mt50">
            <label class="mr10">{{ $t('Columns') }}:</label>
            <columns @change-column="columnChange" />
          </div>
          <!--<div class="sorting col-sm-2 align-right mt50">-->
          <!--<sort-by-->
          <!--:has-label="true"-->
          <!--@change="changeFilter"-->
          <!--:value="getCurrentSearchQuery.sort"-->
          <!--/>-->
          <!--</div>-->
        </div>
      </div>
      <div class="container">
        <div class="row m0">
          <div class="mobile-sorting col-xs-6 mt25">
            <sort-by
              @change="changeFilter"
              :value="getCurrentSearchQuery.sort"
            />
          </div>
          <button
            class="col-xs-5 mt25 mr15 p15 mobile-filters-button bg-cl-th-accent brdr-none cl-white h5 sans-serif fs-medium-small"
            @click="openFilters"
          >
            {{ $t('Filters') }}
            <span>{{ Object.keys(getCurrentSearchQuery && getCurrentSearchQuery.filters).length }}</span>
          </button>
        </div>
      </div>
    </header>
    <div class="container pb60">
      <div class="row m0 pt15">
        <div class="col-md-3 start-xs category-filters">
          <!--<div>-->
            <!--<p class="products-count">-->
              <!--{{ $t('Selected {count} items', { count: getCategoryProductsTotal }) }}-->
            <!--</p>-->
          <!--</div>-->
          <sidebar :filters="getAvailableFilters" @changeFilter="changeFilter" />
        </div>
        <div class="col-md-3 start-xs mobile-filters" v-show="mobileFilters">
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
            <div class="relative pb20 pt15">
              <div class="brdr-top-1 brdr-cl-primary absolute divider w-100" />
            </div>
            <div
              v-if="Object.keys(getCurrentSearchQuery.filters).length > 0"
              class="active-filters-mobile"
            >
              <div class="selected-products">
                Выбрано {{getCategoryProductsTotal}} товар
              </div>

              <div class="buttons-group">
                <button-full
                    class="buttons-group"
                    @click.native="resetAllFilters"
                  >
                  Очистить все
                </button-full>
                <button-full
                    class="buttons-group"
                    @click.native="closeFilters"
                  >
                  Показать
                </button-full>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-9 px10 border-box products-list">
          <p class="col-md-12 hidden-xs start-md mt0 cl-secondary category-sort">
            <span class="product-sorting">{{ $t('First') }}: </span>
            <new-sort-by
              :has-label="true"
              @change="changeFilter"
              :value="getCurrentSearchQuery.sort"
            />
          </p>
          <div v-if="isCategoryEmpty" class="hidden-xs">
            <h4 data-testid="noProductsInfo">
              {{ $t('No products found!') }}
            </h4>
            <p>{{ $t('Please change Your search criteria and try again. If still not finding anything relevant, please visit the Home page and try out some of our bestsellers!') }}</p>
          </div>
          <lazy-hydrate :trigger-hydration="!loading" v-if="isLazyHydrateEnabled">
            <product-listing :columns="defaultColumn" :products="getCategoryProducts" />
          </lazy-hydrate>
          <product-listing v-else :columns="defaultColumn" :products="getCategoryProducts" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'
import Sidebar from '../components/core/blocks/Category/Sidebar.vue'
import ProductListing from '../components/core/ProductListing.vue'
import Breadcrumbs from '../components/core/Breadcrumbs.vue'
import NewSortBy from '../components/core/NewSortBy.vue'
import SortBy from '../components/core/SortBy.vue'
import { isServer } from '@vue-storefront/core/helpers'
import { getSearchOptionsFromRouteParams } from '@vue-storefront/core/modules/catalog-next/helpers/categoryHelpers'
import config from 'config'
import Columns from '../components/core/Columns.vue'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import { mapGetters } from 'vuex'
import onBottomScroll from '@vue-storefront/core/mixins/onBottomScroll'
import rootStore from '@vue-storefront/core/store';
import { catalogHooksExecutors } from '@vue-storefront/core/modules/catalog-next/hooks'
import { localizedRoute, currentStoreView } from '@vue-storefront/core/lib/multistore'
import { htmlDecode } from '@vue-storefront/core/filters'
const THEME_PAGE_SIZE = 50
const composeInitialPageState = async (store, route, forceLoad = false) => {
  try {
    const filters = getSearchOptionsFromRouteParams(route.params)
    const cachedCategory = store.getters['category-next/getCategoryFrom'](route.path)
    const currentCategory = cachedCategory && !forceLoad ? cachedCategory : await store.dispatch('category-next/loadCategory', { filters })
    const pageSize = store.getters['url/isBackRoute'] ? store.getters['url/getCurrentRoute'].categoryPageSize : THEME_PAGE_SIZE
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
    LazyHydrate,
    ButtonFull,
    ProductListing,
    Breadcrumbs,
    Sidebar,
    SortBy,
    NewSortBy,
    Columns
  },
  mixins: [onBottomScroll],
  data () {
    return {
      mobileFilters: false,
      defaultColumn: 3,
      loadingProducts: false,
      loading: true
    }
  },
  computed: {
    ...mapGetters({
      getCurrentSearchQuery: 'category-next/getCurrentSearchQuery',
      getCategoryProducts: 'category-next/getCategoryProducts',
      getCurrentCategory: 'category-next/getCurrentCategory',
      getCategoryProductsTotal: 'category-next/getCategoryProductsTotal',
      getAvailableFilters: 'category-next/getAvailableFilters'
    }),
    isLazyHydrateEnabled () {
      return config.ssr.lazyHydrateFor.includes('category-next.products')
    },
    isCategoryEmpty () {
      return this.getCategoryProductsTotal === 0
    }
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
    columnChange (column) {
      this.defaultColumn = column
    },
    async onBottomScroll () {
      if (this.loadingProducts) return
      this.loadingProducts = true
      try {
        await this.$store.dispatch('category-next/loadMoreCategoryProducts')
      } catch (e) {
        console.error('Problem with fetching more products', e)
      } finally {
        this.loadingProducts = false
      }
    }
  },
  metaInfo () {
    const storeView = currentStoreView()
    const { meta_title, meta_description, name, slug } = this.getCurrentCategory
    const meta = meta_description ? [
      { vmid: 'description', name: 'description', content: htmlDecode(meta_description) }
    ] : []
    /* const categoryLocaliedLink = localizedRoute({
      name: 'category-amp',
      params: { slug }
    }, storeView.storeCode)
    const ampCategoryLink = this.$router.resolve(categoryLocaliedLink).href */
    return {
      // link: [ { rel: 'amphtml', href: ampCategoryLink } ],
      title: htmlDecode(meta_title || name),
      meta
    }
  }
}
</script>

<style lang="scss" scoped>
$mobile_screen : 768px;
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
    width: 242px;

    .products-count {
      margin: 0 0 30px 0;
      font-family: DIN Pro;
      font-style: normal;
      font-size: 13px;
      line-height: 16px;
      color: #1A1919;
    }
  }

  .product-sorting {
    font-family: DIN Pro;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    color: #1A1919;
  }

  .mobile-filters {
    display: none;
    overflow: auto;
    padding: 0;
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
      font-family: DIN Pro;
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      color: #FFFFFF;
      background: #23BE20;
      border-radius: 100%;
      width: 16px;
      height: 16px;
      margin-left: 7px;
    }
  }

  .mobile-sorting {
    display: none;
  }

  .category-title {
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 800;
    font-size: 36px;
    line-height: 46px;
    color: #1A1919;
  }

  .sorting {
    label {
      margin-right: 10px;
    }
  }

  .category-sort {
    margin-bottom: 6px;
  }

  @media (max-width: 64em) {
    .products-list {
      max-width: 530px;
    }
  }

  @media (max-width: 770px) {
    .category-title {
      margin: 0;
      /*font-size: 36px;*/
      /*line-height: 40px;*/
    }

    .products-list {
      width: 100%;
      max-width: none;
    }

    .mobile-filters {
      display: block;
    }

    .mobile-filters-button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 45px;
    }

    .sorting {
      display: none;
    }

    .mobile-sorting {
      display: block;
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
          padding-bottom: 70px;
        }
        min-height: 100vh;
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
      height: 100vh;
      top: 0;
      box-sizing: border-box;
    }

    .mobile-filters-body {
      padding-top: 50px;
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
.product-image {
  max-height: unset !important;
}
</style>
