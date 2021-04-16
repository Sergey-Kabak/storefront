<template>
  <div id="product" itemscope itemtype="http://schema.org/Product" :data-productKey="getCurrentProduct.sku">
    <div class="v-container">
      <div class="row">
        <div class="col-12">
          <breadcrumbs v-if="!['mobile'].includes(screenResolution)" class="breadcrumbs"/>
          <mobile-breadcrumbs v-else />
        </div>
        {{groups}}
        <div class="col-12">
          <section class="product-top-info">
            <no-ssr>
              <h1 v-if="screenResolution === 'mobile'" class="product-name-mobile" data-testid="productName" itemprop="name">
                {{ getCurrentProduct.name | htmlDecode }}
              </h1>
            </no-ssr>
            <product-gallery
              :offline="getOfflineImage"
              :gallery="getProductGallery"
              :configuration="getCurrentProductConfiguration"
              :product="getCurrentProduct"
            />
            <div class="product-info-container">
              <template v-for="(block, index) in visibleBlocks">
                <component :is="block" :key="index" class="product-block-wrapper"/>
              </template>
            </div>
          </section>
        </div>
      </div>
    </div>
    <hr class="tab-underline" ref="separator">
    <product-tabs :class="{'fixed-row' : fixedContent}" :active-tab="ActiveTab" ref="pageTabs" />
    <div class="v-container">
      <div class="row">
        <div class="col-12 tab-row">
          <component v-if="tabContainer" :is="tabContainer">
            <component :is="ActiveTab" />
          </component>
          <div class="carriage-wrapper" :class="{'carriage-fixed' : fixedContent, 'carriage-absolute' : absoluteContent > 112}">
            <component :is="activeCarriage" :style="{'top' : absoluteContent + 'px'}" />
          </div>
        </div>
      </div>
    </div>
    <similar-products />
  </div>
</template>

<script>
import config from 'config';
import Breadcrumbs from 'theme/components/core/Breadcrumbs.vue';
import MobileBreadcrumbs from '../components/core/MobileBreadcrumbs.vue';
import ProductGallery from 'theme/components/core/ProductGallery';
import Promo from '../components/core/blocks/Product/Components/Promo';
import ProductInfo from '../components/core/blocks/Product/Components/ProductInfo';
import ProductTrade from '../components/core/blocks/Product/Components/ProductTrade';
import ProductSeller from '../components/core/blocks/Product/Components/ProductSeller';
import ProductInstruction from '../components/core/blocks/Product/Components/ProductInstruction';
import ProductDelivery from '../components/core/blocks/Product/Components/ProductDelivery';
import ProductTabs from '../components/core/blocks/Product/Components/ProductTabs';
import AboutTab from '../components/core/blocks/Product/Tabs/AboutTab';
import SpecificationsTab from '../components/core/blocks/Product/Tabs/SpecificationsTab';
import VideoReviewTab from '../components/core/blocks/Product/Tabs/VideoReviewTab';
import AccessoriesTab from '../components/core/blocks/Product/Tabs/AccessoriesTab';
import ReviewsTab from '../components/core/blocks/Product/Tabs/ReviewsTab';
import SmallProductCart from '../components/core/blocks/Product/Tabs/SmallProductCart';
import GTM from 'theme/mixins/GTM/dataLayer'
import { mapGetters, mapState } from 'vuex';
import { currentStoreView, localizedRoute } from '@vue-storefront/core/lib/multistore';
import { htmlDecode } from '@vue-storefront/core/filters';
import { ReviewModule } from '@vue-storefront/core/modules/review';
import { RecentlyViewedModule } from '@vue-storefront/core/modules/recently-viewed';
import { registerModule } from '@vue-storefront/core/lib/modules';
import { isServer, onlineHelper } from '@vue-storefront/core/helpers';
import { catalogHooksExecutors } from '@vue-storefront/core/modules/catalog-next/hooks';
import { filterChangedProduct } from '@vue-storefront/core/modules/catalog/events'
import ProductScrolls from 'theme/components/core/blocks/Product/Mixins/ProductScrolls';
import SimilarProducts from 'theme/components/core/blocks/Product/Sections/SimilarProducts';
import ResizeMixin from '../components/core/blocks/Product/Mixins/ResizeMixin';
import TabContainer from '../components/core/blocks/Product/Tabs/TabContainer';
import TabContainerMobile from '../components/core/blocks/Product/Tabs/TabContainerMobile';
import ProductKits from '../components/core/blocks/Product/Components/ProductKits';
import NoSSR from 'vue-no-ssr'
import { absoluteProductLink } from '@vue-storefront/core/modules/url/helpers'

function EndDateInvalid (dateTo) {
  return (dateTo && new Date(dateTo) < Date.now())
}

export default {
  mixins: [GTM, ProductScrolls, ResizeMixin],
  components: {
    Breadcrumbs,
    MobileBreadcrumbs,
    ProductGallery,
    Promo,
    ProductInfo,
    ProductTrade,
    ProductSeller,
    ProductInstruction,
    ProductDelivery,
    ProductTabs,
    AboutTab,
    SpecificationsTab,
    VideoReviewTab,
    AccessoriesTab,
    ReviewsTab,
    SmallProductCart,
    SimilarProducts,
    TabContainer,
    TabContainerMobile,
    ProductKits,
    'no-ssr': NoSSR
  },
  data () {
    return {
      maxQuantity: 0,
      quantityError: false,
      isStockInfoLoading: false,
      hasAttributesLoaded: false,
      manageQuantity: true,
      show_modal_credits_loading: false,
      prevRoute: null,
      ActiveTab: 'about-tab',
      fixedContent: false,
      absoluteContent: 112,
      isMobileSidebar: false
    }
  },
  computed: {
    ...mapGetters({
      getCurrentCategory: 'category-next/getCurrentCategory',
      getCurrentProduct: 'product/getCurrentProduct',
      getProductGallery: 'product/getProductGallery',
      getCurrentProductConfiguration: 'product/getCurrentProductConfiguration',
    }),
    ...mapState({
      kitProducts: (state) => state.kits.products
    }),
    isInCart () {
      return this.$store.getters['microcart/isCurrentProductInCart']
    },
    visibleBlocks () {
      const blocks = {
        'promo': this.getCurrentProduct.type_id === 'bundle',
        'product-info': true,
        'product-trade': true,
        'product-seller': parseInt(this.getCurrentProduct.marketplace),
        'product-instruction': this.getCurrentProduct.instruction,
        'product-delivery': true
      }
      return Object.keys(blocks).filter(it => !!blocks[it])
    },
    tabContainer () {
      const blocks = {
        'tab-container': !['mobile'].includes(this.screenResolution),
        'tab-container-mobile': ['mobile'].includes(this.screenResolution) && this.isMobileSidebar
      }
      return Object.keys(blocks).find(it => !!blocks[it])
    },
    activeCarriage () {
      const condition = this.getCurrentProduct.product_kits && this.kitProducts.length
      const blocks = {
        'product-kits': condition,
        'small-product-cart': !condition
      }
      return Object.keys(blocks).find(it => !!blocks[it])
    },
    isOnline (value) {
      return onlineHelper.isOnline
    },
    getOfflineImage () {
      return {
        src: this.getThumbnail(this.getCurrentProduct.image, config.products.thumbnails.width, config.products.thumbnails.height),
        error: this.getThumbnail(this.getCurrentProduct.image, config.products.thumbnails.width, config.products.thumbnails.height),
        loading: this.getThumbnail(this.getCurrentProduct.image, config.products.thumbnails.width, config.products.thumbnails.height)
      }
    },
    productLink () {
      return absoluteProductLink(this.getCurrentProduct, currentStoreView().storeCode)
    }
  },
  methods: {
    async changeFilter (variant) {
      const selectedConfiguration = Object.assign({ attribute_code: variant.type }, variant)
      await filterChangedProduct(selectedConfiguration, this.$store, this.$router)
      const newUrl = this.getCurrentProduct.configurable_children.find(p => p.sku === this.getCurrentProduct.sku).url_path
      if (newUrl) {
        history.pushState(
          {},
          null,
          newUrl
        )
      }
      this.$bus.$emit('filter-changed-product', Object.assign({ attribute_code: variant.type }, variant))
      this.getQuantity();
    },
    async getQuantity () {
      if (this.isStockInfoLoading) return // stock info is already loading
      this.isStockInfoLoading = true
      try {
        const res = await this.$store.dispatch('stock/check', {
          product: this.getCurrentProduct,
          qty: this.getCurrentProduct.qty
        });
      } finally {
        this.isStockInfoLoading = false
        await this.$store.dispatch('themeCredit/fetchBanks', this.getCurrentProduct.sku)
      }
    }
  },
  async asyncData ({ store, route, context }) {
    if (context) context.output.cacheTags.add('product')
    const product = await store.dispatch('product/loadProduct', { parentSku: route.params.parentSku, childSku: route && route.params && route.params.childSku ? route.params.childSku : null })
    const loadBreadcrumbsPromise = store.dispatch('product/loadProductBreadcrumbs', { product })
    await store.dispatch('attribute/getAttributeGroups', { attribute_set_id: product.attribute_set_id })
    await store.dispatch('themeCredit/fetchBanks', product.sku)
    if (product.product_kits && product.product_kits.length) {
      const kitProducts = product.product_kits.filter(kit => !EndDateInvalid(kit.to_date)).reduce((acc, kit) => {
        return acc.concat([...kit.items].map(p => p.sku))
      }, []);
      await store.dispatch('kits/fetchKitProducts', { products: kitProducts, parentProduct: product })
    }
    if (isServer) await loadBreadcrumbsPromise
    catalogHooksExecutors.productPageVisited(product)
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch('user/addToProductHistory', this.getCurrentProduct)
    next();
  },
  beforeRouteEnter (to, from, next) {
    if (isServer) {
      next((vm) => {
        vm.prevRoute = from;
      })
    } else {
      next((vm) => {
        vm.fixedContent = false
        vm.absoluteContent = 112
        vm.getQuantity();
        vm.prevRoute = from;
      })
    }
  },
  beforeCreate () {
    registerModule(ReviewModule)
    registerModule(RecentlyViewedModule)
  },
  async beforeMount () {
    this.$bus.$on('filter-on-change', (variant) => this.changeFilter(variant))
    this.$bus.$on('change-tab', (tab) => {
      this.ActiveTab = tab
      const separator = this.$refs.separator.offsetTop
      if (this.screenResolution !== 'mobile' && window.pageYOffset > separator) {
        window.scrollTo(0, separator - 65)
      }
      if (['mobile'].includes(this.screenResolution)) {
        this.isMobileSidebar = true
      }
    })
  },
  mounted () {
    this.$store.dispatch('recently-viewed/addItem', this.getCurrentProduct);
    this.GTM_REMARKETING({ sku: this.getCurrentProduct.sku, price: this.getCurrentProduct.finalPrice })
  },
  beforeDestroy () {
    this.$bus.$emit('modal-hide', 'modal-kits')
    this.$bus.$off('filter-on-change')
    this.$bus.$off('change-tab')
    this.$store.state.kits.products = []
  },
  watch: {
    prevRoute: function (val) {
      let page = val.meta.name || 'product page';
      this.GTM_PRODUCT_VIEW([this.getCurrentProduct], page)
    },
    isOnline: {
      handler (isOnline) {
        if (isOnline) {
          this.getQuantity()
        }
      }
    }
  },
  metaInfo () {
    const storeView = currentStoreView()
    return {
      link: [
        {
          rel: 'canonical',
          href: 'https://ringoo.ua' + this.$route.path
        },
        { rel: 'amphtml',
          href: this.$router.resolve(localizedRoute({
            name: this.getCurrentProduct.type_id + '-product-amp',
            params: {
              parentSku: this.getCurrentProduct.parentSku ? this.getCurrentProduct.parentSku : this.getCurrentProduct.sku,
              slug: this.getCurrentProduct.slug,
              childSku: this.getCurrentProduct.sku
            }
          }, storeView.storeCode)).href
        }
      ],
      script: [
        {
          innerHTML: `(function(f,g,l){function d(a){console.error(a);(new Image).src="https://go.rcvlinks.com/err/?setr="+g+"&ms="+((new Date).getTime()-m)+"&ver="+n+"&text="+encodeURIComponent(a)}try{var e=function(){var a=f.createElement("script"),p=(new Date).getTime();a.type="text/javascript";a.src=c;a.onerror=function(){!h&&300>(new Date).getTime()-p?(h=!0,c=q+k,setTimeout(e,10)):(b++,5>b?setTimeout(e,10):d(b+"!"+c))};a.onload=function(){b&&d(b+"!"+c)};f.getElementsByTagName("head")[0].appendChild(a)},n="200804-1622",m=(new Date).getTime(),h=!1,q=atob("aHR0cHM6Ly93d3cucmN2Z29vZHMuY29t"),k="/setr/"+g+"/?"+l+"&rnd="+Math.floor(999*Math.random()),c="https://go.rcvlink.com"+k,b=0;e()}catch(a){d(a.name+": "+a.message+"\t"+(a.stack?a.stack.replace(a.name+": "+a.message,""):""))}})(document,"3604","offer=${this.getCurrentProduct.sku}");`
        },
        {
          async: true,
          type: 'text/javascript',
          body: true,
          innerHTML: `
            window.ad_product = ${JSON.stringify(
              {
                id: this.getCurrentProduct.sku,
                vendor: this.getCurrentProduct.manufacturer,
                price: this.getCurrentProduct.finalPrice,
                url: this.productLink,
                picture: this.getThumbnail(this.getCurrentProduct.thumbnail),
                name: this.getCurrentProduct.name,
                category: this.getCurrentProduct.breadcrumbs && this.getCurrentProduct.breadcrumbs[0].category_id
              })}; window._retag = window._retag || []; window._retag.push({code: "9ce8884ee4", level: 2}); (function () { var id = "admitad-retag"; if (document.getElementById(id)) {return;} var s = document.createElement("script"); s.async = true; s.id = id; var r = (new Date).getDate(); s.src = (document.location.protocol == "https:" ? "https:" : "http:") + "//cdn.lenmit.com/static/js/retag.js?r="+r; var a = document.getElementsByTagName("script")[0]; a.parentNode.insertBefore(s, a); })()`
        }
      ],
      title: htmlDecode(this.getCurrentProduct.meta_title || this.getCurrentProduct.name),
      meta: this.getCurrentProduct.meta_description ? [{ vmid: 'description', name: 'description', content: htmlDecode(this.getCurrentProduct.meta_description) }] : []
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~theme/css/pages/Product/Product";
</style>
