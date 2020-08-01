<template>
  <div id="home">
    <section class="container px15">
      <no-ssr>
        <home-carousel />
      </no-ssr>
    </section>
    <!--<head-image />-->

    <section class="container px15 offer-gallery">
      <div class="gallery-title">
        {{ $t('Popular categories') }}
      </div>
      <div class="banner-group">
        <div class="col-md-4 col-xs-6 mt15">
          <div class="banner">
            <div class="text">
              <div class="title">{{getCategoryData(0) && $t(getCategoryData(0).title)}}</div>
              <div class="description">{{getCategoryData(0) && $t(getCategoryData(0).description)}}</div>
            </div>
            <div class="image">
              <img :src="getCategoryData(0) && getCategoryData(0).image" alt="">
            </div>
            <router-link class="custom-category-link" :to="categoryLink(0)" />
          </div>
        </div>
        <div class="col-md-4 col-xs-6 mt15">
          <div class="banner">
            <div class="text">
              <div class="title">{{getCategoryData(1) && $t(getCategoryData(1).title)}}</div>
              <div class="description">{{getCategoryData(1) && $t(getCategoryData(1).description)}}</div>
            </div>
            <div class="image">
              <img :src="getCategoryData(1) && getCategoryData(1).image" alt="">
            </div>
            <router-link class="custom-category-link" :to="categoryLink(1)" />
          </div>
        </div>
        <div class="col-md-4 col-xs-6 mt15">
          <div class="banner">
            <div class="text">
              <div class="title">{{getCategoryData(2) && $t(getCategoryData(2).title)}}</div>
              <div class="description">{{getCategoryData(2) && $t(getCategoryData(2).description)}}</div>
            </div>
            <div class="image">
              <img :src="getCategoryData(2) && getCategoryData(2).image" alt="">
            </div>
            <router-link class="custom-category-link" :to="categoryLink(2)" />
          </div>
        </div>
        <div class="col-md-6 col-xs-6 mt15">
          <div class="banner">
            <div class="text">
              <div class="title">{{getCategoryData(3) && $t(getCategoryData(3).title)}}</div>
              <div class="description">{{getCategoryData(3) && $t(getCategoryData(3).description)}}</div>
            </div>
            <div class="image mr75">
              <img :src="getCategoryData(3) && getCategoryData(3).image" alt="">
            </div>
            <router-link class="custom-category-link" :to="categoryLink(3)" />
          </div>
        </div>
        <div class="col-md-6 col-xs-12 mt15">
          <div class="banner">
            <div class="text">
              <div class="title">{{getCategoryData(4) && $t(getCategoryData(4).title)}}</div>
              <div class="description">{{getCategoryData(4) && $t(getCategoryData(4).description)}}</div>
            </div>
            <div class="image mr75">
              <img :src="getCategoryData(4) && getCategoryData(4).image" alt="">
            </div>
            <router-link class="custom-category-link" :to="categoryLink(4)" />
          </div>
        </div>
      </div>
    </section>
    <!--<head-image />-->
    <!--<promoted-offers />-->

    <section class="container px15">
      <div>
        <header class="col-md-12">
          <h2 class="cl-accent">
            {{ $t('Promotions') }}
          </h2>
        </header>
      </div>
      <div class="row center-xs">
        <lazy-hydrate :trigger-hydration="!loading" v-if="isLazyHydrateEnabled">
          <product-listing columns="4" :products="stockGoodsProduct" />
        </lazy-hydrate>
        <product-listing v-else columns="4" :products="stockGoodsProduct" />

        <button-full
            class="mt35 show-all"
            type="submit"
            @click.native="goToCategory('stockGoods')"
        >
          {{ $t('See all') }}
        </button-full>
      </div>
    </section>

    <section class="container px15">
      <div>
        <header class="col-md-12">
          <h2 class="cl-accent">
            {{ $t('Sales leaders') }}
          </h2>
        </header>
      </div>
      <div class="row center-xs">
        <lazy-hydrate :trigger-hydration="!loading" v-if="isLazyHydrateEnabled">
          <product-listing columns="4" :products="salesLeadersProduct" />
          <!--<product-listing columns="4" :products="products" />-->
        </lazy-hydrate>
        <product-listing v-else columns="4" :products="salesLeadersProduct" />
        <!--<product-listing v-else columns="4" :products="products" />-->
        <button-full
            class="mt35 show-all"
            type="submit"
            @click="goToCategory('salesLeaders')"
        >
          {{ $t('See all') }}
        </button-full>
      </div>
    </section>

    <section class="container px15 pb60">
      <div class="banner">
        <img src="https://info.ringoo.ua/images/mag/main_baner.png" alt="banner">
      </div>
    </section>

    <section v-if="isOnline" class="container pb60 px15">
      <div class="row">
        <header class="col-md-12" :class="{ pt40: getEverythingNewCollection && getEverythingNewCollection.length }">
          <h2 class="cl-accent">
            {{ $t('Our shares') }}
          </h2>
        </header>
      </div>
      <section class="container px15">
        <no-ssr>
          <home-carousel />
        </no-ssr>
      </section>
    </section>

    <section class="container px15">
      <div>
        <header class="col-md-12">
          <h2 class="cl-accent">
            {{ $t('Everything new') }}
          </h2>
        </header>
      </div>
      <div class="row center-xs">
        <lazy-hydrate :trigger-hydration="!loading" v-if="isLazyHydrateEnabled">
          <product-listing columns="4" :products="newProduct" />
        </lazy-hydrate>
        <product-listing v-else columns="4" :products="newProduct" />

        <button-full
            class="mt35 show-all"
            type="submit"
            @click="goToCategory('new')"
        >
          {{ $t('See all') }}
        </button-full>
      </div>
    </section>

    <section class="container px15">
      <div>
        <header class="col-md-12">
          <h2 class="cl-accent">
            {{ $t('May suit you') }}
          </h2>
        </header>
      </div>
      <div class="row center-xs">
        <lazy-hydrate :trigger-hydration="!loading" v-if="isLazyHydrateEnabled">
          <!--<product-listing columns="4" :products="getBestsellers" />-->
          <product-listing columns="4" :products="recommendsProduct" />
        </lazy-hydrate>
        <!--<product-listing v-else columns="4" :products="getBestsellers" />-->
        <product-listing v-else columns="4" :products="recommendsProduct" />
        <button-full
            class="mt35 show-all"
            type="submit"
            @click="goToCategory('recommends')"
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
import { isServer, onlineHelper } from '@vue-storefront/core/helpers'
import LazyHydrate from 'vue-lazy-hydration'

// Core pages
import Home from '@vue-storefront/core/pages/Home'
// Theme core components
import ProductListing from 'theme/components/core/ProductListing'
// Theme local components
import Onboard from 'theme/components/theme/blocks/Home/Onboard'
import TileLinks from 'theme/components/theme/blocks/TileLinks/TileLinks'
import { Logger } from '@vue-storefront/core/lib/logger'
import { mapGetters } from 'vuex'
import config from 'config'
import { registerModule } from '@vue-storefront/core/lib/modules'
import { RecentlyViewedModule } from '@vue-storefront/core/modules/recently-viewed'

import { disableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import { prepareQuery } from '@vue-storefront/core/modules/catalog/queries/common'
import NoSSR from 'vue-no-ssr'
import HomeCarousel from 'theme/components/theme/blocks/HomeCarousel'

import { formatCategoryLink } from '@vue-storefront/core/modules/url/helpers'

import { ProductOption } from '@vue-storefront/core/modules/catalog/components/ProductOption.ts'

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
    }
  },
  mixins: [Home, ProductOption],
  components: {
    'no-ssr': NoSSR,
    HomeCarousel,
    Onboard,
    ProductListing,
    TileLinks,
    LazyHydrate,
    ButtonFull
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
    ...mapGetters('homepage', ['getEverythingNewCollection', 'getBestsellers']),
    categories () {
      return this.getCategories
    },
    isOnline () {
      return onlineHelper.isOnline
    },
    isLazyHydrateEnabled () {
      return config.ssr.lazyHydrateFor.some(
        field => ['homepage', 'homepage.new_collection', 'homepage.bestsellers'].includes(field)
      )
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
    let stockGoodsQuery = prepareQuery({queryConfig: 'stockGoods'})
    let salesLeadersQuery = prepareQuery({queryConfig: 'salesLeaders'})
    let newQuery = prepareQuery({queryConfig: 'new'})
    let recommendsQuery = prepareQuery({queryConfig: 'recommends'})

    try {
      let res = await Promise.all([
        this.$store.dispatch('product/list', {
          query: stockGoodsQuery,
          size: 4,
          sort: 'created_at:desc'
        }),
        this.$store.dispatch('product/list', {
          query: salesLeadersQuery,
          size: 4,
          sort: 'created_at:desc'
        }),
        this.$store.dispatch('product/list', {
          query: newQuery,
          size: 4,
          sort: 'created_at:desc'
        }),
        this.$store.dispatch('product/list', {
          query: recommendsQuery,
          size: 4,
          sort: 'created_at:desc'
        })
      ])
      this.stockGoodsProduct = res && res[0] && res[0].items
      this.salesLeadersProduct = res && res[1] && res[1].items
      this.newProduct = res && res[2] && res[2].items
      this.recommendsProduct = res && res[3] && res[3].items
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    navigate (key) {
      console.log(this.$refs)
      // this.$refs.zoomCarousel.goToPage(key)
    },
    increaseCarouselTransitionSpeed () {
      this.carouselTransitionSpeed = 500
    },
    pageChange (index) {
      this.currentPage = index
      this.hideImageAtIndex = null
    },
    onVideoStarted (index) {
      this.hideImageAtIndex = index
    },
    categoryLink (category) {
      return formatCategoryLink(config && config.actualCategory && config.actualCategory[category])
    },
    goToCategory (cat) {
      let link = formatCategoryLink(config && config[cat])
      return this.$router.push(link)
    },
    getCategoryData (category) {
      return config && config.actualCategory && config.actualCategory[category]
    }
  },
  mounted () {
    if (!this.isLoggedIn && localStorage.getItem('redirect')) this.$bus.$emit('modal-show', 'modal-signup')
    console.log('sdhflkajksdhdfflaksjdklfjalsd====> ', this.getEverythingNewCollection, this.getBestsellers)
  },
  destroyed () {
    clearAllBodyScrollLocks()
  },
  watch: {
    isLoggedIn () {
      const redirectObj = localStorage.getItem('redirect')
      if (redirectObj) this.$router.push(redirectObj)
      localStorage.removeItem('redirect')
    }
  },
  async asyncData ({ store, route }) { // this is for SSR purposes to prefetch data
    Logger.info('Calling asyncData in Home (theme)')()

    await Promise.all([
      store.dispatch('homepage/fetchNewCollection'),
      store.dispatch('homepage/loadBestsellers'),
      store.dispatch('promoted/updateHeadImage'),
      store.dispatch('promoted/updatePromotedOffers')
    ])
  },

  beforeRouteEnter (to, from, next) {
    if (!isServer && !from.name) { // Loading products to cache on SSR render
      next(vm => {
        vm.$store.dispatch('homepage/fetchNewCollection').then(res => {
          vm.loading = false
        })
        vm.$store.dispatch('homepage/loadBestsellers').then(res => {
          vm.loading = false
        })
      })
    } else {
      next()
    }
  }
}
</script>

<style lang="sass">
  .mr75
    margin-right: 75px
  #home
    h2
      font-family: 'DIN Pro'
      font-size: 24px
      line-height: 30px
      color: #1A1919
    .show-all
      margin: 32px 0 68px
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
    img
      display: block
      height: 320px
      width: 100%
    .banner-group
      display: flex
      flex-wrap: wrap
      & > div
        &:nth-child(even) .banner
          background: #ecf4dd
        &:last-child .banner
          @media (max-width: 767px)
            height: 135px
            .text
              width: 200px
              margin-top: 0
            .image
              top: 17px
              position: absolute
        .banner
          box-sizing: border-box
          background: #F6F7FA
          border-radius: 4px
          padding: 40px
          position: relative
          height: 320px
          display: flex
          overflow: hidden
          .custom-category-link
            position: absolute
            width: 100%
            height: 100%
            left: 0
            top: 0
            z-index: 1
          @media (max-width: 767px)
            flex-direction: column
            padding: 16px
            height: 265px
          .text
            width: 200px
            overflow: hidden
            @media (max-width: 767px)
              width: 100%
              order: 1
              margin-top: 35px
          .title
            font-family: DIN Pro
            font-style: normal
            font-weight: bold
            font-size: 24px
            line-height: 30px
            color: #1A1919
            @media (max-width: 767px)
              font-size: 14px
              line-height: 18px
          .description
            font-family: DIN Pro;
            font-style: normal
            font-weight: normal
            font-size: 16px
            line-height: 24px
            color: #5F5E5E
            margin-top: 16px
            @media (max-width: 767px)
              font-size: 14px
              line-height: 18px
          .image
            position: absolute
            right: 0
            top: 50px
            width: 200px
            img
              width: 100%
              height: auto
            svg
              position: absolute
              right: 0
              @media (max-width: 767px)
                width: 100px
                height: 100px
            @media (max-width: 767px)
              width: 100px
              height: 100px
              position: relative
              top: 0
              display: block
              margin: 0 auto


  .gallery-title
    margin: 32px 0
    font-family: 'DIN Pro'
    font-style: normal
    font-weight: bold
    font-size: 24px
    line-height: 30px
    color: #1A1919
  .banner
    img
      width: 100%
      display: block
</style>

<style lang="scss" scoped>
  .new-collection {
    @media (max-width: 767px) {
      padding-top: 0;
    }
  }
</style>
