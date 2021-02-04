<template>
  <div id="product" itemscope itemtype="http://schema.org/Product">
    <section class=" px20 product-top-section">
      <div class="container">
        <section class="row m0 between-xs">
          <div class="col-xs-12">
            <breadcrumbs class="pb20"/>
          </div>
          <div class="col-xs-12 col-md-6 center-xs middle-xs image">
            <product-gallery
              :offline="getOfflineImage"
              :gallery="getProductGallery"
              :configuration="getCurrentProductConfiguration"
              :product="getCurrentProduct"
            />
          </div>
          <div class="col-xs-12 col-md-5 data">
<!--            <Promo v-if="getCurrentProduct.type_id === 'bundle'" />-->
            <product-info/>
            <product-filters v-if="getCurrentProduct.type_id === 'configurable'" @change="changeFilter"/>
            <product-trade />
            <product-seller v-if="parseInt(getCurrentProduct.marketplace)" @click.native="showCustomSeller"/>
            <product-instruction v-if="getCurrentProduct.instruction" />
            <product-delivery />
<!--            <div itemprop="offers" class="product-prices" itemscope itemtype="http://schema.org/Offer">-->
<!--              <meta itemprop="priceCurrency" :content="$store.state.storeView.i18n.currencyCode">-->
<!--              <meta itemprop="price" :content="parseFloat(getCurrentProduct.price_incl_tax).toFixed(2)">-->
<!--              <meta itemprop="availability" :content="structuredData.availability">-->
<!--              <meta itemprop="url" :content="getCurrentProduct.url_path">-->
<!--            </div>-->
          </div>
        </section>
      </div>
    </section>
<!--    <section class="container px15 pt50 pb35 cl-accent details">-->
<!--      <h2 class="h3 m0 mb10 serif lh20 details-title">-->
<!--        {{ $t('Product details') }}-->
<!--      </h2>-->
<!--      <div class="h4 details-wrapper" :class="{'details-wrapper&#45;&#45;open': detailsOpen}">-->
<!--        <div class="row between-md m0">-->
<!--          <div class="col-xs-12 col-sm-6">-->
<!--            <div class="lh30 h5" itemprop="description" v-html="getCurrentProduct.description" />-->
<!--          </div>-->
<!--          <div class="col-xs-12 col-sm-5">-->
<!--            <ul class="attributes p0 pt5 m0">-->
<!--              <product-attribute-->
<!--                :key="attr.attribute_code"-->
<!--                v-for="attr in getCustomAttributes"-->
<!--                :product="getCurrentProduct"-->
<!--                :attribute="attr"-->
<!--                empty-placeholder="N/A"-->
<!--              />-->
<!--            </ul>-->
<!--          </div>-->
<!--          <div class="details-overlay" @click="showDetails" />-->
<!--        </div>-->
<!--      </div>-->
<!--    </section>-->
<!--    <lazy-hydrate when-idle>-->
<!--      <reviews-->
<!--        :product-name="getOriginalProduct.name"-->
<!--        :product-id="getOriginalProduct.id"-->
<!--        v-show="isOnline"-->
<!--      />-->
<!--    </lazy-hydrate>-->
<!--    <lazy-hydrate when-idle>-->
<!--      <related-products type="upsell" :heading="$t('We found other products you might like')" />-->
<!--    </lazy-hydrate>-->
<!--&lt;!&ndash;    <lazy-hydrate when-idle>&ndash;&gt;-->
<!--&lt;!&ndash;      <promoted-offers single-banner />&ndash;&gt;-->
<!--&lt;!&ndash;    </lazy-hydrate>&ndash;&gt;-->
<!--    <div class="banner flex my30">-->
<!--      <picture>-->
<!--        <source srcset="/assets/promo/delivery_promo_288x260.jpg" media="(max-width: 400px)">-->
<!--        <source srcset="/assets/promo/delivery_promo_1324x260.jpg">-->
<!--        <img src="/assets/promo/delivery_promo_1324x260.jpg" class="promo-image">-->
<!--      </picture>-->
<!--    </div>-->
<!--    <lazy-hydrate when-idle>-->
<!--      <related-products type="related" />-->
<!--    </lazy-hydrate>-->
  </div>
</template>

<script>
import config from 'config';
import RelatedProducts from 'theme/components/core/blocks/Product/Related.vue';
import Reviews from 'theme/components/core/blocks/Reviews/Reviews.vue';
import Breadcrumbs from 'theme/components/core/Breadcrumbs.vue';
import ProductAttribute from 'theme/components/core/ProductAttribute.vue';
import ProductGallery from 'theme/components/core/ProductGallery';
import focusClean from 'theme/components/theme/directives/focusClean';
import WebShare from 'theme/components/theme/WebShare';
import { mapGetters } from 'vuex';
import LazyHydrate from 'vue-lazy-hydration';
import { ProductOption } from '@vue-storefront/core/modules/catalog/components/ProductOption.ts';
import {
  currentStoreView,
  localizedRoute
} from '@vue-storefront/core/lib/multistore';
import { htmlDecode } from '@vue-storefront/core/filters';
import { ReviewModule } from '@vue-storefront/core/modules/review';
import { RecentlyViewedModule } from '@vue-storefront/core/modules/recently-viewed';
import { registerModule } from '@vue-storefront/core/lib/modules';
import {
  isServer,
  onlineHelper
} from '@vue-storefront/core/helpers';
import { catalogHooksExecutors } from '@vue-storefront/core/modules/catalog-next/hooks';
import Promo from "../components/core/blocks/Product/Components/Promo";
import { filterChangedProduct } from '@vue-storefront/core/modules/catalog/events'
import GTM from 'theme/mixins/GTM/dataLayer'
import ProductInfo from '../components/core/blocks/Product/Components/ProductInfo';
import ProductFilters from '../components/core/blocks/Product/Components/ProductFilters';
import ProductTrade from '../components/core/blocks/Product/Components/ProductTrade';
import ProductSeller from '../components/core/blocks/Product/Components/ProductSeller';
import ProductInstruction from '../components/core/blocks/Product/Components/ProductInstruction';
import ProductDelivery from '../components/core/blocks/Product/Components/ProductDelivery';
export default {
  components: {
    Breadcrumbs,
    ProductAttribute,
    ProductGallery,
    RelatedProducts,
    Reviews,
    WebShare,
    LazyHydrate,
    Promo,
    ProductInfo,
    ProductFilters,
    ProductTrade,
    ProductSeller,
    ProductInstruction,
    ProductDelivery
  },
  mixins: [ProductOption, GTM],
  directives: { focusClean },
  beforeCreate () {
    registerModule(ReviewModule)
    registerModule(RecentlyViewedModule)
  },
  data () {
    return {
      detailsOpen: false,
      maxQuantity: 0,
      quantityError: false,
      isStockInfoLoading: false,
      hasAttributesLoaded: false,
      manageQuantity: true,
      show_modal_credits_loading: false,
      prevRoute: null
    }
  },
  computed: {
    ...mapGetters({
      getCurrentCategory: 'category-next/getCurrentCategory',
      getCurrentProduct: 'product/getCurrentProduct',
      getProductGallery: 'product/getProductGallery',
      getCurrentProductConfiguration: 'product/getCurrentProductConfiguration',
      getOriginalProduct: 'product/getOriginalProduct',
      attributesByCode: 'attribute/attributeListByCode',
      getCurrentCustomOptions: 'product/getCurrentCustomOptions',
      getBanks: 'themeCredit/getBanks'
    }),
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
    getCustomAttributes () {
      return this.getCurrentProduct.attributes_metadata && this.getCurrentProduct.attributes_metadata.filter(a => {
        return a.is_visible && a.is_user_defined && (parseInt(a.is_visible_on_front) || a.is_visible_on_front === true) && this.getCurrentProduct[a.attribute_code]
      })
    },
    structuredData () {
      return {
        availability: this.getCurrentProduct.stock && this.getCurrentProduct.stock.is_in_stock ? 'InStock' : 'OutOfStock'
      }
    }
  },
  async beforeMount () {
    this.$bus.$on('product-after-configure', (data) => {
      this.getQuantity()
    });
  },
  async mounted () {
    await this.$store.dispatch('recently-viewed/addItem', this.getCurrentProduct);
    console.log(this.getCurrentProduct);
  },
  async asyncData ({ store, route, context }) {
    if (context) context.output.cacheTags.add('product')
    const product = await store.dispatch('product/loadProduct', { parentSku: route.params.parentSku, childSku: route && route.params && route.params.childSku ? route.params.childSku : null })
    const loadBreadcrumbsPromise = store.dispatch('product/loadProductBreadcrumbs', { product })
    if (isServer) await loadBreadcrumbsPromise
    catalogHooksExecutors.productPageVisited(product)
  },
  beforeRouteEnter (to, from, next) {
    if (isServer) {
      next((vm) => {
        vm.prevRoute = from;
      })
    } else {
      next((vm) => {
        vm.getQuantity();
        vm.prevRoute = from;
      })
    }
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
  methods: {
    showCustomSeller () {
      this.$bus.$emit('modal-show', 'modal-custom-seller-product')
    },
    showModalCredits () {
      this.$bus.$emit('modal-show', 'modal-credits')
    },
    showDetails (event) {
      this.detailsOpen = true
      event.target.classList.add('hidden')
    },
    async changeFilter (variant) {
      const selectedConfiguration = Object.assign({ attribute_code: variant.type }, variant)
      await filterChangedProduct(selectedConfiguration, this.$store, this.$router)
      this.$bus.$emit( 'filter-changed-product', Object.assign({ attribute_code: variant.type }, variant))
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

        this.manageQuantity = res.isManageStock
        this.maxQuantity = res.isManageStock ? res.qty : null
      } finally {
        this.isStockInfoLoading = false
        await this.$store.dispatch('themeCredit/fetchBanks', this.getCurrentProduct.sku)
      }
    },
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
        }
      ],
      title: htmlDecode(this.getCurrentProduct.meta_title || this.getCurrentProduct.name),
      meta: this.getCurrentProduct.meta_description ? [{ vmid: 'description', name: 'description', content: htmlDecode(this.getCurrentProduct.meta_description) }] : []
    }
  },
  beforeDestroy () {
    this.$bus.$emit('modal-hide', 'modal-custom-seller-product')
  }
}
</script>

<style lang="scss" scoped>
.banner.flex{
  justify-content: center;
  picture{
    max-width: 1324px;
    padding: 0 15px;
  }
  img{
    width: 100%;
  }
}
  #product {
    .add-to-cart {
      /*width: 25px;*/
      @media (max-width: 767px) {
        .add-to-cart-text {
          display: block !important;
          margin-left: 15px;
          font-weight: 800;
        }
      }
    }
    .product .add-to-cart {
      @media (max-width: 767px) {
        .add-to-cart-text {
          display: none !important
        }
      }
    }
  }
</style>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-primary: color(primary);
$color-tertiary: color(tertiary);
$color-secondary: color(secondary);
$color-white: color(white);
$bg-secondary: color(secondary, $colors-background);
.product {
  &__add-to-compare {
    display: none;
    @media (min-width: 767px) {
      display: block;
    }
  }
}
.breadcrumbs {
  @media (max-width: 767px) {
    margin: 15px 0;
    padding: 15px 0 0 15px;
  }
}
.error {
  color: red;
  font-weight: bold;
  padding-bottom: 15px;
}
.data {
  @media (max-width: 767px) {
    border-bottom: 1px solid $bg-secondary;
  }
}

.image {
  @media (max-width: 1023px) {
    margin-bottom: 20px;
  }
}
.product-top-section {
  @media (max-width: 767px) {
    padding: 0;
    background-color: $color-white;
  }
}

.add-to-buttons {
  @media (max-width: 767px) {
    padding-top: 30px;
    margin-bottom: 40px;
  }
}

.details {
  @media (max-width: 767px) {
    padding: 50px 15px 15px;
  }
}

.details-title {
  padding: 0 8px;

  @media (max-width: 767px) {
    font-size: 18px;
    margin: 0;
  }
}

.details-wrapper {
  @media (max-width: 767px) {
    position: relative;
    max-height: 140px;
    overflow: hidden;
    transition: all 0.3s ease;
    font-size: 14px;
  }

  &--open {
    max-height: none;
  }
}

.details-overlay {
  @media (max-width: 767px) {
    position: absolute;
    height: 75%;
    bottom: 0;
    left: 0;
    width: 100%;
    margin: 0;
    cursor: pointer;
    background: linear-gradient(rgba($color-white, 0), rgba($color-white, 1));
    &.hidden {
      display: none;
    }
  }
}

.action {
  &:hover {
    color: $color-tertiary;
  }
}

.attributes {
  list-style-type: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.product-image {
  mix-blend-mode: multiply;
  width: 460px;
}

.web-share {
  float: right;
}

#product {
  .mobile-header {
    @media (max-width: 767px) {
      padding: 0 8px 10px;
      .product-name {
        font-size: 24px;
        line-height: 30px;
        margin-bottom: 8px;
      }
    }
  }
  @media (max-width: 767px) {
    .breadcrumbs {
      padding-left: 0;
    }
    .sku {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: normal;
      font-size: 13px;
      line-height: 16px;
      text-align: right;
      color: #595858;
    }
    .product-price {
      margin-bottom: 16px;
    }
    .variants-wrapper {
      padding-bottom: 16px;
    }
  }
}
.action-block-buttons{
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  .buy_in_credit{
    max-width: 260px;
    height: 40px;
    width: auto;
    justify-content: center;
    border-color: #20af1d;
  }
}
</style>
