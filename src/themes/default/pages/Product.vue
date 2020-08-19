<template>
  <div id="product" itemscope itemtype="http://schema.org/Product">
    <section class=" px20 product-top-section">
      <div class="container">
        <section class="row m0 between-xs">
          <div class="col-xs-12">
            <breadcrumbs class="pb20"/>
          </div>
          <div class="mobile-header hidden-md mt10">
            <h1
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
            </h1>
            <div
              class="product-in-stock"
              :class="{ 'not-available': !(getCurrentProduct.stock && getCurrentProduct.stock.is_in_stock) }"
            >
              {{(getCurrentProduct.stock && getCurrentProduct.stock.is_in_stock) ? $t('In stock') : $t('Not available')}}
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
            <div
              class="product-in-stock hidden-xs block"
              :class="{ 'not-available': !(getCurrentProduct.stock && getCurrentProduct.stock.is_in_stock) }"
            >
              {{(getCurrentProduct.stock && getCurrentProduct.stock.is_in_stock) ? $t('In stock') : $t('Not available')}}
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
              class="mb20 uppercase cl-secondary sku"
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
              <product-price
                class="mb40 product-price"
                v-if="getCurrentProduct.type_id !== 'grouped'"
                :product="getCurrentProduct"
                :custom-options="getCurrentCustomOptions"
              />

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
                    <div class="sizes" v-else-if="option.label == 'Size'">
                      <size-selector
                        class="mr10 mb10"
                        v-for="filter in getAvailableFilters[option.attribute_code]"
                        :key="filter.id"
                        :variant="filter"
                        :selected-filters="getSelectedFilters"
                        @change="changeFilter"
                      />
                    </div>
                    <div :class="option.attribute_code" v-else>
                      <generic-selector
                        class="mr10 mb10"
                        v-for="filter in getAvailableFilters[option.attribute_code]"
                        :key="filter.id"
                        :variant="filter"
                        :selected-filters="getSelectedFilters"
                        @change="changeFilter"
                      />
                    </div>
                    <span
                      v-if="option.label == 'Size'"
                      @click="openSizeGuide"
                      class="p0 ml30 inline-flex middle-xs no-underline h5 action size-guide pointer cl-secondary"
                    >
                      <i class="pr5 material-icons">accessibility</i>
                      <span>{{ $t('Size guide') }}</span>
                    </span>
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
                v-if="getCurrentProduct.type_id !== 'grouped' && getCurrentProduct.type_id !== 'bundle'"
                v-model="getCurrentProduct.qty"
                :max-quantity="maxQuantity"
                :loading="isStockInfoLoading"
                :is-simple-or-configurable="isSimpleOrConfigurable"
                :show-quantity="manageQuantity"
                :check-max-quantity="manageQuantity"
                @error="handleQuantityError"
            />
            <div
                v-if="getCurrentProduct && ((getCurrentProduct.stock && getCurrentProduct.stock.is_in_stock) && (getCurrentProduct.price_incl_tax || getCurrentProduct.original_price_incl_tax))"
                class="row m0"
            >
              <add-to-cart
                :product="getCurrentProduct"
                :disabled="isAddToCartDisabled"
                class="col-xs-12 col-sm-4 col-md-6"
              />
            </div>
            <div class="row py40 add-to-buttons">
              <div class="col-xs-6 col-sm-3 col-md-6">
                <AddToCompare :product="getCurrentProduct" />
              </div>
              <div class="col-xs-6 col-sm-3 col-md-6">
                <AddToWishlist :product="getCurrentProduct" />
              </div>
            </div>

            <div class="seller-name-row" @click="showCustomSeller" v-if="getCurrentProduct.marketplace">
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
                  <img :src="customSeller.logo" alt="custom-seller-logo">
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
    <lazy-hydrate when-idle>
      <promoted-offers single-banner />
    </lazy-hydrate>
    <lazy-hydrate when-idle>
      <related-products type="related" />
    </lazy-hydrate>
    <SizeGuide />
  </div>
</template>

<script>
import config from 'config'
import RelatedProducts from 'theme/components/core/blocks/Product/Related.vue'
import Reviews from 'theme/components/core/blocks/Reviews/Reviews.vue'
import AddToCart from 'theme/components/core/AddToCart.vue'
import GenericSelector from 'theme/components/core/GenericSelector'
import ColorSelector from 'theme/components/core/ColorSelector.vue'
import SizeSelector from 'theme/components/core/SizeSelector.vue'
import Breadcrumbs from 'theme/components/core/Breadcrumbs.vue'
import ProductAttribute from 'theme/components/core/ProductAttribute.vue'
import ProductQuantityNew from 'theme/components/core/ProductQuantityNew.vue'
import ProductLinks from 'theme/components/core/ProductLinks.vue'
import ProductCustomOptions from 'theme/components/core/ProductCustomOptions.vue'
import ProductBundleOptions from 'theme/components/core/ProductBundleOptions.vue'
import ProductGallery from 'theme/components/core/ProductGallery'
import PromotedOffers from 'theme/components/theme/blocks/PromotedOffers/PromotedOffers'
import focusClean from 'theme/components/theme/directives/focusClean'
import WebShare from 'theme/components/theme/WebShare'
import SizeGuide from 'theme/components/core/blocks/Product/SizeGuide'
import AddToWishlist from 'theme/components/core/blocks/Wishlist/AddToWishlist'
import AddToCompare from 'theme/components/core/blocks/Compare/AddToCompare'
import { mapGetters } from 'vuex'
import LazyHydrate from 'vue-lazy-hydration'
import { ProductOption } from '@vue-storefront/core/modules/catalog/components/ProductOption.ts'
import { getAvailableFiltersByProduct, getSelectedFiltersByProduct } from '@vue-storefront/core/modules/catalog/helpers/filters'
import { isOptionAvailableAsync } from '@vue-storefront/core/modules/catalog/helpers/index'
import { localizedRoute, currentStoreView } from '@vue-storefront/core/lib/multistore'
import { htmlDecode } from '@vue-storefront/core/filters'
import { ReviewModule } from '@vue-storefront/core/modules/review'
import { RecentlyViewedModule } from '@vue-storefront/core/modules/recently-viewed'
import { registerModule, isModuleRegistered } from '@vue-storefront/core/lib/modules'
import { onlineHelper, isServer } from '@vue-storefront/core/helpers'
import { catalogHooksExecutors } from '@vue-storefront/core/modules/catalog-next/hooks'
import ProductPrice from 'theme/components/core/ProductPrice.vue'

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
    SizeSelector,
    WebShare,
    SizeGuide,
    LazyHydrate,
    ProductQuantityNew,
    ProductPrice
  },
  mixins: [ProductOption],
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
      manageQuantity: true
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
      getCurrentCustomOptions: 'product/getCurrentCustomOptions'
    }),
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
      return Object.values(this.attributesByCode).filter(a => {
        return a.is_visible && a.is_user_defined && (parseInt(a.is_visible_on_front) || a.is_visible_on_front === true) && this.getCurrentProduct[a.attribute_code]
      }).sort((a, b) => { return a.attribute_id > b.attribute_id })
    },
    getAvailableFilters () {
      return getAvailableFiltersByProduct(this.getCurrentProduct)
    },
    getSelectedFilters () {
      return getSelectedFiltersByProduct(this.getCurrentProduct, this.getCurrentProductConfiguration)
    },
    isSimpleOrConfigurable () {
      return ['simple', 'configurable'].includes(this.getCurrentProduct.type_id)
    },
    isAddToCartDisabled () {
      if (this.quantityError || this.isStockInfoLoading) {
        return false
      }

      return this.isOnline && !this.maxQuantity && this.manageQuantity && this.isSimpleOrConfigurable
    },
    customSeller () {
      return config && config.customSeller
    }
  },
  async mounted () {
    await this.$store.dispatch('recently-viewed/addItem', this.getCurrentProduct)
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
      next()
    } else {
      next((vm) => {
        vm.getQuantity()
      })
    }
  },
  watch: {
    isOnline: {
      handler (isOnline) {
        if (isOnline) {
          this.getQuantity()
        }
      }
    }
  },
  methods: {
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
    changeFilter (variant) {
      this.$bus.$emit(
        'filter-changed-product',
        Object.assign({ attribute_code: variant.type }, variant)
      )
      this.getQuantity()
    },
    openSizeGuide () {
      this.$bus.$emit('modal-show', 'modal-sizeguide')
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
        })

        this.manageQuantity = res.isManageStock
        this.maxQuantity = res.isManageStock ? res.qty : null
      } finally {
        this.isStockInfoLoading = false
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
      title: htmlDecode(this.getCurrentProduct.meta_title || this.getCurrentProduct.name),
      meta: this.getCurrentProduct.meta_description ? [{ vmid: 'description', name: 'description', content: htmlDecode(this.getCurrentProduct.meta_description) }] : []
    }
  },
  beforeDestroy () {
    this.$bus.$emit('modal-hide', 'modal-custom-seller-product')
  }
}
</script>

<style lang="scss">
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

.not-available {
  color: #ee2c39 !important;
}

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
.product-prices {
  .price {
    font-family: 'DIN Pro';
    font-size: 24px;
    line-height: 30px;
    color: #1A1919;
  }
}

.product-in-stock {
  font-family: 'DIN Pro';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: #23BE20;
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
      color: #5F5E5E;
    }
    .product-price {
      margin-bottom: 16px;
    }
    .variants-wrapper {
      padding-bottom: 16px;
    }
  }
}
</style>
