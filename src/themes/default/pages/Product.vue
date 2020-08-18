<template>
  <div id="product" itemscope itemtype="http://schema.org/Product">
    <section class=" px20 product-top-section">
      <div class="container">
        <section class="row m0 between-xs">
          <div class="col-xs-12">
            <breadcrumbs class="pt40 pb20"/>
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
            <!--<product-quantity-->
              <!--class="row m0 mb35"-->
              <!--v-if="getCurrentProduct.type_id !== 'grouped' && getCurrentProduct.type_id !== 'bundle'"-->
              <!--v-model="getCurrentProduct.qty"-->
              <!--:max-quantity="maxQuantity"-->
              <!--:loading="isStockInfoLoading"-->
              <!--:is-simple-or-configurable="isSimpleOrConfigurable"-->
              <!--:show-quantity="manageQuantity"-->
              <!--:check-max-quantity="manageQuantity"-->
              <!--@error="handleQuantityError"-->
            <!--/>-->
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

            <div class="seller-name-row" @click="showCustomSeller">
              <div class="seller-name-col">
                <div class="seller-name">
                  {{ $t("Seller:") }} <span>S-DIGIT</span>
                </div>
                <div class="seller-rating">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.6315 5.11934C13.5896 4.99592 13.5125 4.88747 13.4096 4.80738C13.3068 4.72729 13.1828 4.67908 13.0528 4.66868L9.25218 4.36668L7.60751 0.72601C7.55514 0.608751 7.46994 0.509157 7.36221 0.439248C7.25448 0.369339 7.12882 0.332102 7.0004 0.332031C6.87197 0.331961 6.74627 0.36906 6.63846 0.438851C6.53066 0.508642 6.44535 0.608142 6.39285 0.725343L4.74818 4.36668L0.947514 4.66868C0.819817 4.67879 0.697739 4.72548 0.595884 4.80316C0.494028 4.88084 0.416709 4.98622 0.373176 5.1067C0.329643 5.22717 0.321739 5.35763 0.35041 5.48248C0.379082 5.60733 0.443114 5.72127 0.534847 5.81068L3.34351 8.54868L2.35018 12.85C2.32002 12.9802 2.32969 13.1165 2.37793 13.2411C2.42617 13.3657 2.51076 13.473 2.62072 13.549C2.73067 13.6249 2.86093 13.6661 2.99457 13.6671C3.12821 13.6681 3.25908 13.629 3.37018 13.5547L7.00018 11.1347L10.6302 13.5547C10.7437 13.6301 10.8777 13.6689 11.0139 13.6659C11.1502 13.6629 11.2823 13.6183 11.3924 13.538C11.5026 13.4577 11.5855 13.3456 11.63 13.2167C11.6746 13.0879 11.6786 12.9485 11.6415 12.8173L10.4222 8.55068L13.4462 5.82934C13.6442 5.65068 13.7168 5.37201 13.6315 5.11934Z" fill="#FFCA41"/>
                  </svg>
                  <span class="seller-data">4.9 (24 {{ $t("marks") }})</span>
                </div>
              </div>
              <div class="seller-logo">
                <svg width="64" height="24" viewBox="0 0 64 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <rect width="64" height="24" fill="url(#pattern0)"/>
                  <defs>
                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlink:href="#image0" transform="translate(-0.00105932) scale(0.00105932 0.00282486)"/>
                    </pattern>
                    <image id="image0" width="946" height="354" xlink:href="data:image/png;base64,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"/>
                  </defs>
                </svg>
              </div>
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
import i18n from '@vue-storefront/i18n'
import VueOfflineMixin from 'vue-offline/mixin'
import config from 'config'
import RelatedProducts from 'theme/components/core/blocks/Product/Related.vue'
import Reviews from 'theme/components/core/blocks/Reviews/Reviews.vue'
import AddToCart from 'theme/components/core/AddToCart.vue'
import GenericSelector from 'theme/components/core/GenericSelector'
import ColorSelector from 'theme/components/core/ColorSelector.vue'
import SizeSelector from 'theme/components/core/SizeSelector.vue'
import Breadcrumbs from 'theme/components/core/Breadcrumbs.vue'
import ProductAttribute from 'theme/components/core/ProductAttribute.vue'
import ProductQuantity from 'theme/components/core/ProductQuantity.vue'
import ProductQuantityNew from 'theme/components/core/ProductQuantityNew.vue'
import ProductLinks from 'theme/components/core/ProductLinks.vue'
import ProductCustomOptions from 'theme/components/core/ProductCustomOptions.vue'
import ProductBundleOptions from 'theme/components/core/ProductBundleOptions.vue'
import ProductGallery from 'theme/components/core/ProductGallery'
import Spinner from 'theme/components/core/Spinner'
import PromotedOffers from 'theme/components/theme/blocks/PromotedOffers/PromotedOffers'
import focusClean from 'theme/components/theme/directives/focusClean'
import WebShare from 'theme/components/theme/WebShare'
import BaseInputNumber from 'theme/components/core/blocks/Form/BaseInputNumber'
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
    ProductQuantity,
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
