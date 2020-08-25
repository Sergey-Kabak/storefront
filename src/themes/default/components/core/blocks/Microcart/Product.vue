<template>
  <li class="row py10 bg-cl-white product-item-row" :class="{ 'relative': editMode }">
    <div class="mx10 w-100 py10 mb15 edit-mode flex between-xs middle-xs" v-if="editMode">
      Edit mode
      <button class="brdr-none bg-cl-transparent" @click="closeEditMode">
        <span class="cl-accent">
          <i class="material-icons cl-accent mr5">
            close
          </i>
        </span>
      </button>
    </div>
    <div class="flex middle-xs actions product-item-btns-wrapper" v-if="!editMode">
      <remove-button class="mx5 product-item-btns" @click="removeItem" />
      <!--      <edit-button class="mx5 product-item-btns" @click="openEditMode" v-if="productsAreReconfigurable && !editMode" />-->
    </div>
    <div class="blend">
      <div class="ml10">
        <product-image :image="image" />
      </div>
    </div>
    <div class="col-xs flex flex-wrap">
      <div class="flex flex-nowrap details">
        <div class="flex w-100 flex-wrap between-xs main-info">
          <div class="product-info">
            <router-link
              class="serif h4 name"
              :to="productLink"
              data-testid="productLink"
              @click.native="$store.commit('ui/setMicrocart', false)"
            >
              {{ product.name | htmlDecode }}
            </router-link>
            <div class="flex mr10 align-right start-xs between-sm prices">
              <div class="prices" v-if="!displayItemDiscounts || !isOnline">
                <span class="h4 serif cl-error price-special" v-if="product.special_price">
                   {{ product.price_incl_tax * product.qty | price(storeView) }}
                </span>
                <span class="h6 serif price-original" v-if="product.special_price">
                  {{ product.original_price_incl_tax * product.qty | price(storeView) }}
                </span>
                <span class="h4 serif price-regular" v-else data-testid="productPrice">
                  {{ (product.original_price_incl_tax ? product.original_price_incl_tax : product.price_incl_tax) * product.qty | price(storeView) }}
                </span>
              </div>
              <div class="prices" v-else-if="isOnline && product.totals">
                <span class="h4 serif cl-error price-special" v-if="product.totals.discount_amount">
                  {{ product.totals.row_total - product.totals.discount_amount + product.totals.tax_amount | price(storeView) }}
                </span>
                <span class="h6 serif price-original" v-if="product.totals.discount_amount">
                  {{ product.totals.row_total_incl_tax | price(storeView) }}
                </span>
                <span class="h4 serif price-regular" v-if="!product.totals.discount_amount">
                  {{ product.totals.row_total_incl_tax | price(storeView) }}
                </span>
              </div>
              <div class="prices" v-else>
                <span class="h4 serif price-regular">
                  {{ (product.regular_price || product.price_incl_tax) * product.qty | price(storeView) }}
                </span>
              </div>
            </div>
            <!--<div class="h6 pt5 cl-error" v-if="hasProductErrors">-->
              <!--{{ product.errors | formatProductMessages }}-->
            <!--</div>-->
            <!--<div class="h6 pt5 cl-success" v-if="hasProductInfo && !hasProductErrors">-->
              <!--{{ product.info | formatProductMessages }}-->
            <!--</div>-->
          </div>
          <div class="flex mr10 align-right start-xs between-sm prices">
            <div class="prices">
              <product-quantity
                  class="h5 cl-accent lh25"
                  :value="productQty"
                  :max-quantity="maxQuantity"
                  :loading="isStockInfoLoading"
                  :is-simple-or-configurable="isSimpleOrConfigurable"
                  @input="updateProductQty"
                  @error="handleQuantityError"
              />
              <!--<span class="h4 serif price-special" v-if="product.totals.discount_amount">-->
              <!--{{ product.totals.row_total - product.totals.discount_amount + product.totals.tax_amount }}-->
            <!--</span>-->
            </div>
          </div>
        </div>
      </div>
      <div class="w-100 pb15 flex flex-wrap bottom-xs" v-if="editMode">
        <div class="ml0 flex flex-wrap filters" v-if="productsAreReconfigurable">
          <div class="h5 pt5 w-100" v-for="(option, index) in product.configurable_options" :key="index">
            <div class="h6 cl-bg-tertiary mr10">
              {{ option.label }}:
            </div>
            <div class="flex flex-wrap pt5" v-if="option.label == 'Color' && editMode">
              <color-selector
                v-for="filter in getAvailableFilters[option.attribute_code]"
                v-if="isOptionAvailable(filter)"
                :key="filter.id"
                :variant="filter"
                :selected-filters="getSelectedOptions"
                @change="changeEditModeFilter"
              />
            </div>
            <div class="flex flex-wrap pt5" v-else-if="option.label == 'Size' && editMode">
              <size-selector
                class="mr10 mb10"
                v-for="filter in getAvailableFilters[option.attribute_code]"
                v-if="isOptionAvailable(filter)"
                :key="filter.id"
                :variant="filter"
                :selected-filters="getSelectedOptions"
                @change="changeEditModeFilter"
              />
            </div>
          </div>
        </div>
        <button-full
          class="update-button mb10 mr10"
          @click.native="updateProductVariant"
          :disabled="isUpdateCartDisabled"
        >
          {{ $t('Update item') }}
        </button-full>
      </div>
    </div>
  </li>
</template>

<script>
import { mapState } from 'vuex';
import config from 'config';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers';
import Product from '@vue-storefront/core/compatibility/components/blocks/Microcart/Product';

import ProductQuantity from 'theme/components/core/ProductQuantityNew';
import ProductImage from 'theme/components/core/ProductImage';
import ColorSelector from 'theme/components/core/ColorSelector.vue';
import SizeSelector from 'theme/components/core/SizeSelector.vue';
import RemoveButton from './RemoveButton';
import EditButton from './EditButton';
import { onlineHelper } from '@vue-storefront/core/helpers';
import { ProductOption } from '@vue-storefront/core/modules/catalog/components/ProductOption';
import {
  getProductConfiguration,
  getThumbnailForProduct
} from '@vue-storefront/core/modules/cart/helpers';
import ButtonFull from 'theme/components/theme/ButtonFull';
import EditMode from './EditMode';

export default {
    data () {
      return {
        maxQuantity: 0,
        quantityError: false,
        isStockInfoLoading: false
      }
    },
    props: {
      product: {
        type: Object,
        required: true
      }
    },
    components: {
      RemoveButton,
      ProductImage,
      ColorSelector,
      SizeSelector,
      EditButton,
      ButtonFull,
      ProductQuantity
    },
    mixins: [Product, ProductOption, EditMode],
    computed: {
      ...mapState({
        isMicrocartOpen: state => state.ui.microcart
      }),
      hasProductInfo () {
        return this.product.info && Object.keys(this.product.info).length > 0
      },
      hasProductErrors () {
        const errors = this.product.errors || {}
        const errorsValuesExists = Object.keys(errors).filter(errorKey => errors[errorKey]).length > 0
        return errorsValuesExists
      },
      isTotalsActive () {
        return this.isOnline && !this.editMode && this.product.totals && this.product.totals.options
      },
      isOnline () {
        return onlineHelper.isOnline
      },
      productsAreReconfigurable () {
        return config.cart.productsAreReconfigurable && this.product.type_id === 'configurable' && this.isOnline
      },
      displayItemDiscounts () {
        return config.cart.displayItemDiscounts
      },
      image () {
        return {
          loading: this.thumbnail,
          src: this.thumbnail
        }
      },
      thumbnail () {
        return getThumbnailForProduct(this.product)
      },
      configuration () {
        return getProductConfiguration(this.product)
      },
      productLink () {
        return formatProductLink(this.product, currentStoreView().storeCode)
      },
      editMode () {
        return this.getEditingProductId === this.product.id
      },
      productQty () {
        return this.editMode ? this.getEditingQty : this.product.qty
      },
      isSimpleOrConfigurable () {
        return ['simple', 'configurable'].includes(this.product.type_id)
      },
      isUpdateCartDisabled () {
        return this.quantityError ||
          this.isStockInfoLoading ||
          (this.isOnline && !this.maxQuantity && this.isSimpleOrConfigurable)
      },
      storeView () {
        return currentStoreView()
      }
    },
    methods: {
      updateProductVariant () {
        this.updateVariant()
        this.closeEditMode()
      },
      updateProductQty (qty) {
        if (this.editMode) {
          this.editModeSetQty(qty)
          return
        }

        this.updateQuantity(qty)
      },
      removeFromCart () {
        this.$store.dispatch('cart/removeItem', { product: this.product })
      },
      updateQuantity (quantity) {
        this.$store.dispatch('cart/updateQuantity', { product: this.product, qty: quantity })
      },
      async getQuantity (product) {
        if (this.isStockInfoLoading) return // stock info is already loading
        this.isStockInfoLoading = true
        try {
          const validProduct = product || this.product
          const res = await this.$store.dispatch('stock/check', {
            product: validProduct,
            qty: this.productQty
          })
          return res.qty
        } finally {
          this.isStockInfoLoading = false
        }
      },
      handleQuantityError (error) {
        this.quantityError = error
      },
      async changeEditModeFilter (filter) {
        const editedProduct = this.getEditedProduct(filter)
        const maxQuantity = await this.getQuantity(editedProduct)
        if (!maxQuantity) {
          this.$store.dispatch('notification/spawnNotification', {
            type: 'error',
            message: this.$t(
              'The product is out of stock and cannot be added to the cart!'
            ),
            action1: { label: this.$t('OK') }
          })
        } else if (maxQuantity < this.productQty) {
          this.$store.dispatch('notification/spawnNotification', {
            type: 'error',
            message: this.$t('Only {maxQuantity} products of this type are available!', { maxQuantity }),
            action1: { label: this.$t('OK') }
          })
        } else {
          this.maxQuantity = maxQuantity
          this.editModeSetFilters(filter)
        }
      }
    },
    watch: {
      isOnline: {
        async handler (isOnline) {
          if (isOnline) {
            const maxQuantity = await this.getQuantity()
            this.maxQuantity = maxQuantity
          }
        }
      },
      isMicrocartOpen: {
        async handler (isOpen) {
          if (isOpen) {
            const maxQuantity = await this.getQuantity()
            this.maxQuantity = maxQuantity
          }
        },
        immediate: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  .blend {
    flex: 0 0 150px;
    width: 50px;
    height: 50px;
    max-width: 50px;
    max-height: 50px;
  }

  .image {
    mix-blend-mode: multiply;
    vertical-align: top;
    width: 150px;
    @media (max-width: 767px) {
      width: 100px;
    }
  }

  .product-info {
    max-width: 300px;
    @media (max-width: 767px) {
      max-width: 140px;
    }
  }

  .details {
    flex: 1 1 auto;
    display: flex;
    flex-flow: row wrap;
  }

  .name {
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }

  .product-item-row {
    border-bottom: 1px solid #E0E0E0;
    margin: 0;
  }

  .product-item-btns {
    color: #bdbdbd;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    &-wrapper {
      display: flex;
      flex-direction: column-reverse;
      justify-content: center;
      align-items: center;
      height: 50px;
    }
  }

  .product-prices {
    &-final-price {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 200;
      font-size: 11px;
      line-height: 11px;
      text-decoration-line: line-through;
      color: #5F5E5E;
      margin-right: 5px;
    }
    &-old-price {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 16px;
      color: #1A1919;
    }
  }

  .options, .sku {
    @media (max-width: 767px) {
      font-size: 10px;
    }
  }

  .qty {
    padding-right: 30px;

    @media (max-width: 767px) {
      font-size: 12px;
    }
  }

  .actions {
    margin: 0 -5px;
  }

  .main-info {
    min-width: 150px;
  }

  .prices {
    padding: 0;
    font-size: 12px;
    display: flex;
    flex-direction: inherit;

    .price-regular {
      color: #1A1919;
      font-family: 'DIN Pro';
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;
    }

    @media (max-width: 767px) {
      padding: 0;
      font-size: 12px;
    }

    @media (max-width: 767px) {
      display: block;
      flex-direction: unset;
      width: auto;
    }

    span {
      white-space: nowrap;
      display: flex;
      padding: 10px 0px;
      align-items: center;
      font-family: 'DIN Pro';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
    }
  }

  .price-special {
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }

  .price-original {
    text-decoration: line-through;
  }

  input {
    width: 30px;
  }

  .flex-nowrap {
    flex-wrap: nowrap;
  }

  .flex-wrap {
    flex-wrap: wrap;
  }

  .edit-mode {
    border-bottom: 1px solid color(white-smoke);
  }

  .filters {
    flex: 1 1 200px;
  }

  .update-button {
    font-size: 14px;
    min-width: 150px;
    width: 150px;
    padding: 10px;
  }
</style>
