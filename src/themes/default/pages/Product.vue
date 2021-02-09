<template>
  <div id="product" itemscope itemtype="http://schema.org/Product">
    <section class=" px20 product-top-section">
      <div class="container">
        <section class="row m0 between-xs">
          <div class="col-xs-12">
            <breadcrumbs class="pb20"/>
          </div>
          <div class="mobile-header hidden-md mt10">
            <h2
              class="mb20 mt0 cl-mine-shaft product-name"
              data-testid="productName"
              itemprop="name"
            >
              {{ getCurrentProduct.name | htmlDecode }}
              <web-share
                :title="getCurrentProduct.name | htmlDecode"
                text="Check this product!"
                class="web-share"
              />
            </h2>
            <div
              class="product-in-stock"
              :class="{ 'not-available': isAddToCartDisabled }"
            >
              {{ isAddToCartDisabled ? $t('Not available') : $t('In stock') }}
            </div>
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
            <Promo v-if="isProductRma" :label-value="getLabelValue()" />
            <div
              class="product-in-stock hidden-xs block"
            >
              <div v-html="productStatusIcon" class="product-status-icon"></div>
              <span class="product-status" :class="getProductStock">{{ $t(getProductStock) }}</span>
            </div>
            <h1
              class="mb20 mt0 cl-mine-shaft product-name hidden-xs block"
              data-testid="productName"
              itemprop="name"
            >
              {{ getCurrentProduct.name | htmlDecode }}
              <web-share
                :title="getCurrentProduct.name | htmlDecode"
                text="Check this product!"
                class="web-share"
              />
            </h1>
            <div
              class="mb20 cl-secondary sku"
              itemprop="sku"
              :content="getCurrentProduct.sku"
            >
              {{ $t('SKU: {sku}', { sku: getCurrentProduct.sku }) }}
            </div>
            <div itemprop="offers" class="product-prices" itemscope itemtype="http://schema.org/Offer">
              <meta itemprop="priceCurrency" :content="$store.state.storeView.i18n.currencyCode">
              <meta itemprop="price" :content="parseFloat(getCurrentProduct.price_incl_tax).toFixed(2)">
              <meta itemprop="availability" :content="structuredData.availability">
              <meta itemprop="url" :content="getCurrentProduct.url_path">
              <product-cart-price
                v-if="getCurrentProduct.type_id !== 'grouped'"
                :product="getCurrentProduct"
                :nameVisibility="false"
                class="product-item-price"/>
              <div class="cl-primary variants" v-if="getCurrentProduct.type_id =='configurable'">
                <div
                  class="error"
                  v-if="getCurrentProduct.errors && Object.keys(getCurrentProduct.errors).length > 0"
                >
                  {{ getCurrentProduct.errors | formatProductMessages }}
                </div>
                <div class="h5" v-for="option in getProductOptions" :key="option.id">
                  <div class="variants-label" data-testid="variantsLabel">
                    {{ option.label }}
                    <span
                      class="weight-700"
                    >{{ $t(getOptionLabel(option)) }}</span>
                  </div>
                  <div class="row top-xs m0 pt15 pb40 variants-wrapper">
                    <div v-if="option.attribute_code == 'color'">
                      <color-selector
                        v-for="filter in getAvailableFilters[option.attribute_code]"
                        :key="filter.id"
                        :variant="filter"
                        :selected-filters="getSelectedFilters"
                        @change="changeFilter"
                      />
                    </div>
                    <div v-else>
                      <button-selector
                        context="product"
                        :code="option.attribute_code"
                        class="size-select mr10 mb10"
                        v-for="filter in getAvailableFilters[option.attribute_code]"
                        :key="filter.id"
                        :variant="filter"
                        :selected-filters="getSelectedFilters"
                        @change="changeFilter"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <product-links
              v-if="getCurrentProduct.type_id =='grouped'"
              :products="getCurrentProduct.product_links"
            />
            <product-bundle-options
              v-if="getCurrentProduct.bundle_options && getCurrentProduct.bundle_options.length > 0"
              :product="getCurrentProduct"
            />
            <product-custom-options
              v-else-if="getCurrentProduct.custom_options && getCurrentProduct.custom_options.length > 0"
              :product="getCurrentProduct"
            />
            <product-quantity-new
              class="row m0 mb35"
              v-model="getCurrentProduct.qty"
              :max-quantity="maxQuantity"
              :loading="isStockInfoLoading"
              :show-quantity="manageQuantity"
              :check-max-quantity="manageQuantity"
              @error="handleQuantityError"
            />
            <div
              v-if="getCurrentProduct.stock.is_in_stock"
              class="row m0 action-block-buttons"
            >
              <add-to-cart
                :product="getCurrentProduct"
                class="col-xs-12 col-sm-4 col-md-6">
              >
                <template v-if="preorder" v-slot:text>{{$t('pre order')}}</template>
              </add-to-cart>
              <button-white v-if="getBanks.length" @click.native="showModalCredits" class="buy_in_credit h40 flex1">
                <span>{{ $t('In credit') }}</span>
              </button-white>
            </div>
            <div class="row py40 add-to-buttons">
              <div class="col-xs-6 col-sm-3 col-md-6">
                <AddToCompare :product="getCurrentProduct" showDescription />
              </div>
              <div class="col-xs-6 col-sm-3 col-md-6">
                <AddToWishlist :product="getCurrentProduct" showDescription />
              </div>
            </div>
            <div class="seller-name-row" @click="showCustomSeller" v-if="parseInt(getCurrentProduct.marketplace)">
              <template v-if="customSeller">
                <div class="seller-name-col">
                  <div class="seller-name">
                    {{ $t("Seller:") }} <span>{{ $t(customSeller.name) }}</span>
                  </div>
                  <div class="seller-rating">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.6315 5.11934C13.5896 4.99592 13.5125 4.88747 13.4096 4.80738C13.3068 4.72729 13.1828 4.67908 13.0528 4.66868L9.25218 4.36668L7.60751 0.72601C7.55514 0.608751 7.46994 0.509157 7.36221 0.439248C7.25448 0.369339 7.12882 0.332102 7.0004 0.332031C6.87197 0.331961 6.74627 0.36906 6.63846 0.438851C6.53066 0.508642 6.44535 0.608142 6.39285 0.725343L4.74818 4.36668L0.947514 4.66868C0.819817 4.67879 0.697739 4.72548 0.595884 4.80316C0.494028 4.88084 0.416709 4.98622 0.373176 5.1067C0.329643 5.22717 0.321739 5.35763 0.35041 5.48248C0.379082 5.60733 0.443114 5.72127 0.534847 5.81068L3.34351 8.54868L2.35018 12.85C2.32002 12.9802 2.32969 13.1165 2.37793 13.2411C2.42617 13.3657 2.51076 13.473 2.62072 13.549C2.73067 13.6249 2.86093 13.6661 2.99457 13.6671C3.12821 13.6681 3.25908 13.629 3.37018 13.5547L7.00018 11.1347L10.6302 13.5547C10.7437 13.6301 10.8777 13.6689 11.0139 13.6659C11.1502 13.6629 11.2823 13.6183 11.3924 13.538C11.5026 13.4577 11.5855 13.3456 11.63 13.2167C11.6746 13.0879 11.6786 12.9485 11.6415 12.8173L10.4222 8.55068L13.4462 5.82934C13.6442 5.65068 13.7168 5.37201 13.6315 5.11934Z" fill="#FFCA41"/>
                    </svg>
                    <span class="seller-data">{{ customSeller.rate }} ({{ customSeller.marks }} {{ $t("marks") }})</span>
                  </div>
                </div>
                <div class="seller-logo">
                  <img v-lazy="customSeller.logo" alt="custom-seller-logo">
                </div>
              </template>
            </div>
          </div>
        </section>
      </div>
    </section>
    <section class="container px15 pt50 pb35 cl-accent details">
      <h2 class="h3 m0 mb10 serif lh20 details-title">
        {{ $t('Product details') }}
      </h2>
      <div class="h4 details-wrapper" :class="{'details-wrapper--open': detailsOpen}">
        <div class="row between-md m0">
          <div class="col-xs-12 col-sm-6">
            <div class="lh30 h5" itemprop="description" v-html="getCurrentProduct.description" />
          </div>
          <div class="col-xs-12 col-sm-5">
            <ul class="attributes p0 pt5 m0">
              <product-attribute
                :key="attr.attribute_code"
                v-for="attr in getCustomAttributes"
                :product="getCurrentProduct"
                :attribute="attr"
                empty-placeholder="N/A"
              />
            </ul>
          </div>
          <div class="details-overlay" @click="showDetails" />
        </div>
      </div>
    </section>
    <lazy-hydrate when-idle>
      <reviews
        :product-name="getOriginalProduct.name"
        :product-id="getOriginalProduct.id"
        v-show="isOnline"
      />
    </lazy-hydrate>
    <lazy-hydrate when-idle>
      <related-products type="upsell" :heading="$t('We found other products you might like')" />
    </lazy-hydrate>
<!--    <lazy-hydrate when-idle>-->
<!--      <promoted-offers single-banner />-->
<!--    </lazy-hydrate>-->
    <div class="banner flex my30">
      <picture>
        <source srcset="/assets/promo/delivery_promo_288x260.jpg" media="(max-width: 400px)">
        <source srcset="/assets/promo/delivery_promo_1324x260.jpg">
        <img src="/assets/promo/delivery_promo_1324x260.jpg" class="promo-image">
      </picture>
    </div>
    <lazy-hydrate when-idle>
      <related-products type="related" />
    </lazy-hydrate>
  </div>
</template>

<script>
import config from 'config';
import RelatedProducts from 'theme/components/core/blocks/Product/Related.vue';
import Reviews from 'theme/components/core/blocks/Reviews/Reviews.vue';
import AddToCart from 'theme/components/core/AddToCart.vue';
import GenericSelector from 'theme/components/core/GenericSelector';
import ColorSelector from 'theme/components/core/ColorSelector.vue';
import Breadcrumbs from 'theme/components/core/Breadcrumbs.vue';
import ProductAttribute from 'theme/components/core/ProductAttribute.vue';
import ProductQuantityNew from 'theme/components/core/ProductQuantityNew.vue';
import ProductLinks from 'theme/components/core/ProductLinks.vue';
import ProductCustomOptions from 'theme/components/core/ProductCustomOptions.vue';
import ProductBundleOptions from 'theme/components/core/ProductBundleOptions.vue';
import ProductGallery from 'theme/components/core/ProductGallery';
import PromotedOffers from 'theme/components/theme/blocks/PromotedOffers/PromotedOffers';
import focusClean from 'theme/components/theme/directives/focusClean';
import WebShare from 'theme/components/theme/WebShare';
import AddToWishlist from 'theme/components/core/blocks/Wishlist/AddToWishlist';
import AddToCompare from 'theme/components/core/blocks/Compare/AddToCompare';
import ButtonWhite from 'theme/components/core/blocks/Product/ButtonWhite';
import ButtonSelector from 'theme/components/core/ButtonSelector';
import { mapGetters } from 'vuex';
import LazyHydrate from 'vue-lazy-hydration';
import { ProductOption } from '@vue-storefront/core/modules/catalog/components/ProductOption.ts';
import {
  getAvailableFiltersByProduct,
  getSelectedFiltersByProduct
} from '@vue-storefront/core/modules/catalog/helpers/filters';
import { isOptionAvailableAsync } from '@vue-storefront/core/modules/catalog/helpers/index';
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
import ProductPrice from 'theme/components/core/ProductPrice.vue';
import ProductCartPrice from "../components/core/blocks/Product/ProductCartPrice";
import Promo from "../components/core/blocks/Product/Promo";
import Spinner from "../components/core/Spinner";
import { filterChangedProduct } from '@vue-storefront/core/modules/catalog/events'
import GTM from 'theme/mixins/GTM/dataLayer'
import { ProductStock } from 'theme/helpers';

export default {
  components: {
    AddToCart,
    AddToCompare,
    AddToWishlist,
    Breadcrumbs,
    ColorSelector,
    GenericSelector,
    ProductAttribute,
    ProductBundleOptions,
    ProductCustomOptions,
    ProductGallery,
    ProductLinks,
    PromotedOffers,
    RelatedProducts,
    Reviews,
    WebShare,
    LazyHydrate,
    ProductQuantityNew,
    ProductPrice,
    Promo,
    ButtonWhite,
    Spinner,
    ProductCartPrice,
    ButtonSelector
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
      prevRoute: null,
      icons: {
        'InStock': `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.672 4.464L6.4 9.736L3.528 6.872L2.4 8L6.4 12L12.8 5.6L11.672 4.464ZM8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM8 14.4C4.464 14.4 1.6 11.536 1.6 8C1.6 4.464 4.464 1.6 8 1.6C11.536 1.6 14.4 4.464 14.4 8C14.4 11.536 11.536 14.4 8 14.4Z" fill="#23BE20"/>
        </svg>`,
        'PendingDelivery': `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.11111 12.4444C7.11111 12.9333 7.51111 13.3333 8 13.3333C8.48889 13.3333 8.88889 12.9333 8.88889 12.4444C8.88889 11.9556 8.48889 11.5556 8 11.5556C7.51111 11.5556 7.11111 11.9556 7.11111 12.4444ZM7.11111 0V3.55556H8.88889V1.84889C11.9022 2.28444 14.2222 4.86222 14.2222 8C14.2222 11.44 11.44 14.2222 8 14.2222C4.56 14.2222 1.77778 11.44 1.77778 8C1.77778 6.50667 2.30222 5.13778 3.18222 4.07111L8 8.88889L9.25333 7.63556L3.20889 1.59111V1.60889C1.26222 3.06667 0 5.37778 0 8C0 12.4178 3.57333 16 8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 3.16163e-08 8 0H7.11111ZM13.3333 8C13.3333 7.51111 12.9333 7.11111 12.4444 7.11111C11.9556 7.11111 11.5556 7.51111 11.5556 8C11.5556 8.48889 11.9556 8.88889 12.4444 8.88889C12.9333 8.88889 13.3333 8.48889 13.3333 8ZM2.66667 8C2.66667 8.48889 3.06667 8.88889 3.55556 8.88889C4.04444 8.88889 4.44444 8.48889 4.44444 8C4.44444 7.51111 4.04444 7.11111 3.55556 7.11111C3.06667 7.11111 2.66667 7.51111 2.66667 8Z" fill="#F2994A"/>
        </svg>`,
        'ComingSoon': `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.992 0C3.576 0 0 3.584 0 8C0 12.416 3.576 16 7.992 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 7.992 0ZM8 14.4C4.464 14.4 1.6 11.536 1.6 8C1.6 4.464 4.464 1.6 8 1.6C11.536 1.6 14.4 4.464 14.4 8C14.4 11.536 11.536 14.4 8 14.4ZM8.4 4H7.2V8.8L11.4 11.32L12 10.336L8.4 8.2V4Z" fill="#BE207A"/>
        </svg>`,
        'NotAvailable': `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.072 4.8L8 6.872L5.928 4.8L4.8 5.928L6.872 8L4.8 10.072L5.928 11.2L8 9.128L10.072 11.2L11.2 10.072L9.128 8L11.2 5.928L10.072 4.8ZM8 0C3.576 0 0 3.576 0 8C0 12.424 3.576 16 8 16C12.424 16 16 12.424 16 8C16 3.576 12.424 0 8 0ZM8 14.4C4.472 14.4 1.6 11.528 1.6 8C1.6 4.472 4.472 1.6 8 1.6C11.528 1.6 14.4 4.472 14.4 8C14.4 11.528 11.528 14.4 8 14.4Z" fill="#EE2C39"/>
        </svg>`
      }
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
    getProductStock () {
      return ProductStock(this.getCurrentProduct)
    },
    productStatusIcon () {
      return this.icons[this.getProductStock]
    },
    preorder () {
      return !!this.getCurrentProduct.preorder
    },
    isProductRma () {
      return this.getCurrentProduct.hasOwnProperty("rma") && config.rma[this.getLabelValue()]
    },
    getOptionLabel () {
      return (option) => {
        const configName = option.attribute_code ? option.attribute_code : option.label.toLowerCase()
        return this.getCurrentProductConfiguration[configName] ? this.getCurrentProductConfiguration[configName].label : configName
      }
    },
    isOnline (value) {
      return onlineHelper.isOnline
    },
    structuredData () {
      return {
        availability: this.getCurrentProduct.stock && this.getCurrentProduct.stock.is_in_stock ? 'InStock' : 'OutOfStock'
      }
    },
    getProductOptions () {
      if (
        this.getCurrentProduct.errors &&
        Object.keys(this.getCurrentProduct.errors).length &&
        Object.keys(this.getCurrentProductConfiguration).length
      ) {
        return []
      }
      return this.getCurrentProduct.configurable_options
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
    getAvailableFilters () {
      return getAvailableFiltersByProduct(this.getCurrentProduct)
    },
    getSelectedFilters () {
      return getSelectedFiltersByProduct(this.getCurrentProduct, this.getCurrentProductConfiguration)
    },
    isAddToCartDisabled () {
      if (this.quantityError || this.isStockInfoLoading) {
        return false
      }

      return this.isOnline && !this.maxQuantity && this.manageQuantity
    },
    customSeller () {
      return config && config.customSeller
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
    showModalCredits () {
      this.$bus.$emit('modal-show', 'modal-credits')
    },
    getLabelValue () {
      let attributes = this.getCurrentProduct.attributes_metadata;
      let attribute = attributes.find((attr) => {
        return attr.attribute_code === 'rma';
      });
      if (!(attribute && attribute.options && attribute.options.length)) {
        return false;
      }
      return attribute.options[0].label;
    },
    showDetails (event) {
      this.detailsOpen = true
      event.target.classList.add('hidden')
    },
    notifyOutStock () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t(
          'The product is out of stock and cannot be added to the cart!'
        ),
        action1: { label: this.$t('OK') }
      })
    },
    notifyWrongAttributes () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t(
          'No such configuration for the product. Please do choose another combination of attributes.'
        ),
        action1: { label: this.$t('OK') }
      })
    },
    async changeFilter (variant) {
      const selectedConfiguration = Object.assign({ attribute_code: variant.type }, variant)
      await filterChangedProduct(selectedConfiguration, this.$store, this.$router)
      this.$bus.$emit( 'filter-changed-product', Object.assign({ attribute_code: variant.type }, variant))
      this.getQuantity();
    },
    isOptionAvailable (option) { // check if the option is available
      const currentConfig = Object.assign({}, this.getCurrentProductConfiguration)
      currentConfig[option.type] = option
      return isOptionAvailableAsync(this.$store, { product: this.getCurrentProduct, configuration: currentConfig })
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
    handleQuantityError (error) {
      this.quantityError = error
    },
    showCustomSeller () {
      this.$bus.$emit('modal-show', 'modal-custom-seller-product')
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
.seller-name-row {
  cursor: pointer;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  padding: 16px;
  align-items: center;

  .seller-name-col {
    display: flex;
    align-items: center;
  }
  .seller-name span {
    border-bottom: 1px dashed #1A1919;
    padding-bottom: 4px;
  }
  .seller-rating {
    margin-top: 0!important;
    margin-left: 10px;
  }
  .seller-data {
    margin-left: 10px;
    padding-bottom: 0;
    border-bottom: none;
  }
  .seller-logo {
    max-width: 50%;
    max-height: 60px;
    width: auto;
    img {
      display: block;
      width: auto;
      height: 100%;
      max-height: 60px;
    }
  }
}

.NotAvailable {
  color: #ee2c39;
  &:before{
    background: #EE2C39;
    opacity: 0.12;
  }
}
.PendingDelivery {
  color: orange;
  &:before{
    background: #F2994A;
    opacity: 0.12;
  }
}
.ComingSoon{
  color: #BE207A;
  &:before{
    background: #BE207A;
    opacity: 0.12;
  }
}
.InStock{
  color: #23BE20;
  &:before{
    background: #23BE20;
    opacity: 0.12;
  }
}
.product-status-icon{
  margin-right: 8px;
}
.product-status{
  font-family: 'DIN Pro';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  position: relative;
  &:before{
    position: absolute;
    content: '';
    width: 100%;
    height: 8px;
    bottom: 3px;
    left: -4px;
  }
}
.product-in-stock {
  display: inline-flex;
}
.product {
  &__add-to-compare {
    display: none;
    @media (min-width: 767px) {
      display: block;
    }
  }
}

.product-item-price ::v-deep {
  .product-price-wrapper {
    justify-content: flex-start;
    margin: -4px 0 0 0;
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
.product-prices {
  .price {
    font-family: 'DIN Pro';
    font-size: 24px;
    line-height: 30px;
    color: #1A1919;
  }
}

.product-name {
  font-family: 'DIN Pro';
  font-weight: 800;
  font-size: 24px;
  line-height: 30px;
  color: #1A1919;
  @media (max-width: 767px) {
    font-size: 36px;
  }
}

.variants-label {
  font-family: 'DIN Pro';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #4F4F4F;
  @media (max-width: 767px) {
    font-size: 14px;
  }
}

.variants-wrapper {
  @media (max-width: 767px) {
    padding-bottom: 30px;
  }

  .sizes {
    @media (max-width: 767px) {
      width: 100%;
    }
  }

  .size-guide {
    height: 40px;
    @media (max-width: 767px) {
      width: 100%;
      margin-left: 0;
    }
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
