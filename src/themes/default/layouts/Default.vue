<template>
  <div class="default-layout">
    <overlay v-if="overlayActive"/>
    <div id="viewport" class="w-100 relative">
      <main-header/>
      <async-sidebar
          :async-component="SearchPanel"
          :is-open="isSearchPanelOpen"
          @close="$store.commit('ui/setSearchpanel')"
      />
      <async-sidebar
          :async-component="Microcart"
          :is-open="isMicrocartOpen"
          @close="$store.commit('ui/setMicrocart')"
      />
      <async-sidebar
          :async-component="SidebarMenu"
          :is-open="isSidebarOpen"
          @close="$store.commit('ui/setSidebar')"
          direction="left"
      />
      <async-sidebar
          :async-component="Consultation"
          :is-open="isConsultationOpen"
          @close="$store.commit('ui/setConsultation')"
          class="consultation-sidebar"
      />
      <async-sidebar
        :async-component="PromotionalFilterSidebarMobile"
        :is-open="isPromotionalFilterSidebarMobileOpen"
        @close="$store.commit('ui/setPromotionalFilterSidebar')"
        class="promotional-filter-sidebar"
      />

      <sidebar-categories v-if="isSidebarCategoriesOpen"/>

      <async-sidebar
          :async-component="Wishlist"
          :is-open="isWishlistOpen"
          @close="$store.commit('ui/setWishlist')"
      />

      <async-sidebar
        :async-component="SignUp"
        :is-open="isSignUpOpen"
        @close="$store.commit('ui/setSignUp')"
      />
      <async-sidebar
        :async-component="CompareSidebar"
        :is-open="isCompareOpen"
        @close="isCompareOpen = false"
      />

      <notification/>

      <slot/>
      <iframe frameborder="0" src="https://secure.esputnik.com/A1zAnbN8WOs" width="100%" height="208px" scrolling="no" class="esputnik-section" ></iframe>
      <main-footer/>
      <custom-seller-product />
      <credit-modal />
      <cookie-notification/>
      <offline-badge/>
      <city-picker-shop />
      <city-picker-product />
      <shop-shipping-modal />
      <kits-modal v-if="kitProducts.length" class="kits-modal" />
      <main-modal />
      <esputnik-modal />
    </div>
    <client-credentials-for-esputnik />
    <vue-progress-bar/>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import AsyncSidebar from 'theme/components/theme/blocks/AsyncSidebar/AsyncSidebar.vue';
import MainHeader from 'theme/components/core/blocks/Header/Header.vue';
import MainFooter from 'theme/components/core/blocks/Footer/Footer.vue';
import Overlay from 'theme/components/core/Overlay.vue';
import Loader from 'theme/components/core/Loader.vue';
import Notification from 'theme/components/core/Notification.vue';
import CookieNotification from 'theme/components/core/CookieNotification.vue';
import OfflineBadge from 'theme/components/core/OfflineBadge.vue';
import CreditModal from 'theme/components/core/blocks/CreditModal.vue';
import MainModal from 'theme/components/core/blocks/MainModal.vue';
import EsputnikModal from 'theme/components/core/blocks/EsputnikModal.vue';
import ShopShippingModal from '../components/core/blocks/ShopShippingModal';
import ClientCredentialsForEsputnik from '../components/core/blocks/ClientCredentialsForEsputnik'
import { isServer } from '@vue-storefront/core/helpers';
import Head from 'theme/head';
import config from 'config';
import KitsModal from '../components/core/blocks/Product/Modals/KitsModal';
const SidebarMenu = () => import(/* webpackChunkName: "vsf-sidebar-menu" */ 'theme/components/core/blocks/SidebarMenu/SidebarMenu.vue');
const Microcart = () => import(/* webpackChunkName: "vsf-microcart" */ 'theme/components/core/blocks/Microcart/Microcart.vue');
const Wishlist = () => import(/* webpackChunkName: "vsf-wishlist" */ 'theme/components/core/blocks/Wishlist/Wishlist.vue');
const SearchPanel = () => import(/* webpackChunkName: "vsf-search-panel" */ 'theme/components/core/blocks/SearchPanel/SearchPanel.vue');
const CustomSellerProduct = () => import(/* webpackChunkName: "vsf-custom-city-picker-modal" */ 'theme/components/core/blocks/CustomSellerProduct/CustomSellerProduct.vue');
const Consultation = () => import(/* webpackChunkName: "vsf-custom-city-picker-modal" */ 'theme/components/core/blocks/Consultation/Consultation.vue');
const CompareSidebar = () => import(/* webpackChunkName: "vsf-sidebar-menu" */ 'theme/components/core/blocks/Compare/CompareSidebar.vue');
const CityPickerShop = () => import(/* webpackChunkName: "vsf-custom-city-picker-modal" */ 'theme/components/core/blocks/CityPicker/CityPickerShop.vue');
const CityPickerProduct = () => import(/* webpackChunkName: "vsf-custom-city-picker-modal" */ 'theme/components/core/blocks/CityPicker/CityPickerProduct.vue');
const PromotionalFilterSidebarMobile = () => import(/* webpackChunkName: "vsf-custom-city-picker-modal" */ 'theme/components/core/blocks/PromotionalPortal/PromotionalFilterSidebarMobile.vue');
const SignUp = () => import(/* webpackChunkName: "vsf-custom-city-picker-modal" */ 'theme/components/core/blocks/Auth/SignUp.vue');

export default {
  data() {
    return {
      Microcart,
      Wishlist,
      SearchPanel,
      SidebarMenu,
      Consultation,
      CompareSidebar,
      SignUp,
      PromotionalFilterSidebarMobile
    };
  },
  computed: {
    ...mapGetters({
      getCurrentProduct: 'product/getCurrentProduct'
    }),
    ...mapState({
      overlayActive: state => state.ui.overlay,
      isSearchPanelOpen: state => state.ui.searchpanel,
      isSidebarOpen: state => state.ui.sidebar,
      isSidebarCategoriesOpen: state => state.ui.sidebar_categories,
      isMicrocartOpen: state => state.ui.microcart,
      isWishlistOpen: state => state.ui.wishlist,
      isConsultationOpen: state => state.ui.consultation,
      isCompareOpen: state => state.ui.compare_sidebar,
      kitProducts: (state) => state.kits.products,
      isPromotionalFilterSidebarMobileOpen: state => state.ui.isPromotionalFilterSidebarMobileOpen,
      isSignUpOpen: state => state.ui.signUp
    })
  },
  methods: {
    fetchMenuData() {
      return Promise.all([
        this.$store.dispatch('category-next/fetchMenuCategories', {
          level: config.entities.category.categoriesDynamicPrefetch && config.entities.category.categoriesDynamicPrefetchLevel >= 0
            ? config.entities.category.categoriesDynamicPrefetchLevel
            : null,
          skipCache: isServer
        }),
        this.$store.dispatch('bannerGroup/getBannerGroups')
      ])
    },
    attachOnClosePageEsputnikHandler() {
      window.addEventListener('beforeunload', (e) => {
        this.$store.dispatch('esputnik/triggerAbandonProducts')
        this.$store.dispatch('esputnik/triggerAbandonCart')
      }, false);
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(v) {
        if (v.query.subscribed) {
          this.$nextTick(() => {
            this.$bus.$emit('modal-toggle', 'modal-esputnik')
            this.$store.dispatch('esputnik/setSubscribed')
          })
        }
      }
    }
  },
  serverPrefetch() {
    this.$store.dispatch('bannerGroup/getBannerGroups')
    return this.fetchMenuData();
  },
  beforeMount() {
    this.attachOnClosePageEsputnikHandler()
    this.$router.beforeEach((to, from, next) => {
      // Progress bar on top of the page
      this.$Progress.start();
      this.$Progress.increase(40);
      next();
    });
    this.$router.afterEach((to, from) => {
      this.$Progress.finish();
    });
    this.$bus.$on('offline-order-confirmation', this.onOrderConfirmation);
  },
  beforeDestroy() {
    this.$bus.$off('offline-order-confirmation', this.onOrderConfirmation);
  },
  destroyed() {
    window.removeEventListener('beforeunload', this.attachOnClosePageEsputnikHandler);
  },
  metaInfo: Head,
  components: {
    MainHeader,
    MainFooter,
    SidebarMenu,
    Overlay,
    Loader,
    Notification,
    SignUp,
    CookieNotification,
    OfflineBadge,
    AsyncSidebar,
    CustomSellerProduct,
    CityPickerShop,
    CityPickerProduct,
    CreditModal,
    ShopShippingModal,
    KitsModal,
    MainModal,
    PromotionalFilterSidebarMobile,
    EsputnikModal,
    ClientCredentialsForEsputnik
  }
}
</script>

<style lang="scss" src="theme/css/main.scss"></style>
<style lang="scss" scoped>
.modal.kits-modal{
  ::v-deep .modal-container{
    display: flex;
    flex-direction: column;
    @media (min-width: 768px) {
      max-height: calc(100% - 48px);
      height: 100%;
    }
  }
  ::v-deep .modal-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  ::v-deep .modal-close{
    margin-right: 0 !important;
  }
  ::v-deep .modal-header{
    padding: 13px 29px 13px 24px;
    box-sizing: border-box;
    border-bottom: 1px solid #E0E0E0 !important;
    h3{
      margin: 0;
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 700;
      font-size: 24px;
      line-height: 30px;
      color: #1A1919;
    }
  }
}
.esputnik-section {
  height: 208px;

  @media only screen and (max-width: 785px) {
    height: 368px;
  }
}
</style>
