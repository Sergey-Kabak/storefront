<template>
  <li class="product-wrapper">

    <div class="mobile-nav-menu">
        <svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M6 8C7.1 8 8 7.1 8 6C8 4.9 7.1 4 6 4C4.9 4 4 4.9 4 6C4 7.1 4.9 8 6 8ZM6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM6 16C4.9 16 4 16.9 4 18C4 19.1 4.9 20 6 20C7.1 20 8 19.1 8 18C8 16.9 7.1 16 6 16Z" fill="#BDBDBD"/>
        </svg>
        <div class="mobile-nav-menu-container">
          <div class="mobile-nav-menu-row">
            <AddToCompare :product="product" v-slot="isOnCompare">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M19.9984 12.7007C20.0045 12.5941 19.9894 12.4846 19.9489 12.3783L17.0326 4.71673L12.0483 3.63723C11.8851 2.97321 11.4067 2.43215 10.7814 2.18184V0H9.21885V2.18188C8.86182 2.32481 8.55268 2.56231 8.32272 2.86364L3.05446 1.75407L0.0512179 9.64388C0.0126241 9.74533 -0.00339158 9.84978 0.000592799 9.95177C0.000553736 9.95482 0.000124048 9.95779 0.000124048 9.96087C0.000124048 11.921 1.59474 13.5156 3.55478 13.5156C5.51486 13.5156 7.10947 11.921 7.10947 9.96091C7.10947 9.85017 7.08611 9.74498 7.04455 9.64951C7.04385 9.64767 7.04346 9.6458 7.04275 9.64392L4.78615 3.71555L7.90369 4.37208C7.98994 5.15837 8.51006 5.8156 9.21885 6.09935V18.4374H5.23447V19.9999H14.7657V18.4374H10.7814V6.09935C11.2246 5.92192 11.5938 5.59848 11.8296 5.18856L15.3998 5.96181L12.9574 12.3783C12.9364 12.4335 12.9227 12.4895 12.9146 12.5456C12.8996 12.6062 12.8907 12.6691 12.8907 12.7343C12.8907 14.6944 14.4853 16.289 16.4453 16.289C18.4054 16.289 20 14.6944 20 12.7343C20 12.7229 19.9988 12.7119 19.9984 12.7007ZM3.55482 11.9531C2.73349 11.9531 2.02661 11.4534 1.7222 10.7421H5.38736C5.08298 11.4534 4.37611 11.9531 3.55482 11.9531ZM5.19416 9.17962H1.89985L3.547 4.85231L5.19416 9.17962ZM10.0001 4.68747C9.69854 4.68747 9.45323 4.44216 9.45323 4.14059C9.45323 3.83903 9.69854 3.59372 10.0001 3.59372C10.3017 3.59372 10.547 3.83903 10.547 4.14059C10.547 4.44216 10.3017 4.68747 10.0001 4.68747ZM16.4532 7.58665L18.1153 11.9531H14.7912L16.4532 7.58665ZM16.4454 14.7265C15.6241 14.7265 14.9172 14.2268 14.6128 13.5155H18.2779C17.9736 14.2268 17.2667 14.7265 16.4454 14.7265Z"
                    fill="#BDBDBD"/>
              </svg>
            </AddToCompare>
            <span>{{ $t('Add to compare') }}</span>
          </div>

          <div @click="removeProductFromWhishList(product)" class="mobile-nav-menu-row">
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3.5 8.9L4.9 7.5L7 9.6L9.1 7.5L10.5 8.9L8.4 11L10.5 13.1L9.1 14.5L7 12.4L4.9 14.5L3.5 13.1L5.6 11L3.5 8.9ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z"
                  fill="#BDBDBD"/>
            </svg>
            <span>{{ $t('Remove') }}</span>
          </div>
        </div>
      </div>

    <span class="icon-compare xs-hide">
      <AddToCompare :product="product" v-slot="isOnCompare">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M19.9984 12.7007C20.0045 12.5941 19.9894 12.4846 19.9489 12.3783L17.0326 4.71673L12.0483 3.63723C11.8851 2.97321 11.4067 2.43215 10.7814 2.18184V0H9.21885V2.18188C8.86182 2.32481 8.55268 2.56231 8.32272 2.86364L3.05446 1.75407L0.0512179 9.64388C0.0126241 9.74533 -0.00339158 9.84978 0.000592799 9.95177C0.000553736 9.95482 0.000124048 9.95779 0.000124048 9.96087C0.000124048 11.921 1.59474 13.5156 3.55478 13.5156C5.51486 13.5156 7.10947 11.921 7.10947 9.96091C7.10947 9.85017 7.08611 9.74498 7.04455 9.64951C7.04385 9.64767 7.04346 9.6458 7.04275 9.64392L4.78615 3.71555L7.90369 4.37208C7.98994 5.15837 8.51006 5.8156 9.21885 6.09935V18.4374H5.23447V19.9999H14.7657V18.4374H10.7814V6.09935C11.2246 5.92192 11.5938 5.59848 11.8296 5.18856L15.3998 5.96181L12.9574 12.3783C12.9364 12.4335 12.9227 12.4895 12.9146 12.5456C12.8996 12.6062 12.8907 12.6691 12.8907 12.7343C12.8907 14.6944 14.4853 16.289 16.4453 16.289C18.4054 16.289 20 14.6944 20 12.7343C20 12.7229 19.9988 12.7119 19.9984 12.7007ZM3.55482 11.9531C2.73349 11.9531 2.02661 11.4534 1.7222 10.7421H5.38736C5.08298 11.4534 4.37611 11.9531 3.55482 11.9531ZM5.19416 9.17962H1.89985L3.547 4.85231L5.19416 9.17962ZM10.0001 4.68747C9.69854 4.68747 9.45323 4.44216 9.45323 4.14059C9.45323 3.83903 9.69854 3.59372 10.0001 3.59372C10.3017 3.59372 10.547 3.83903 10.547 4.14059C10.547 4.44216 10.3017 4.68747 10.0001 4.68747ZM16.4532 7.58665L18.1153 11.9531H14.7912L16.4532 7.58665ZM16.4454 14.7265C15.6241 14.7265 14.9172 14.2268 14.6128 13.5155H18.2779C17.9736 14.2268 17.2667 14.7265 16.4454 14.7265Z"
              fill="#BDBDBD"/>
        </svg>
      </AddToCompare>
    </span>

    <span class="icon-trash-box xs-hide" @click="removeProductFromWhishList(product)">
      <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3.5 8.9L4.9 7.5L7 9.6L9.1 7.5L10.5 8.9L8.4 11L10.5 13.1L9.1 14.5L7 12.4L4.9 14.5L3.5 13.1L5.6 11L3.5 8.9ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z"
            fill="#BDBDBD"/>
      </svg>
    </span>

    <div class="blend product-wrapper-image" @click="closeWishlist">
      <router-link :to="productLink">
        <product-image :image="image" :class="{ 'img-gray': !(product.stock && product.stock.is_in_stock) }"/>
      </router-link>
    </div>

    <div class="product-wrapper-container">
      <div class="between-xs flex pl20 py5 w-100 product-wrapper-body">
        <div class="title">
          <span @click="closeWishlist">
            <router-link :to="productLink" :class="{ 'text-gray': !(product.stock && product.stock.is_in_stock) }">
              {{ product.name | htmlDecode }}
            </router-link>
          </span>
        </div>

        <div class="flex py5 w-100 prices-wrapper">
          <div class="prices">
            <span class="price price-old" v-if="(product.stock && product.stock.is_in_stock) && !product.special_price">
              {{ product.original_price_incl_tax | price(storeView) }}
            </span>
            <span
                :class="{ 'text-gray': !(product.stock && product.stock.is_in_stock) }"
                class="price price-current"
                v-if="!product.special_price"
            >
              {{ product.price_incl_tax | price(storeView) }}
            </span>
          </div>
        </div>

        <div class="flex py5 w-100 product-wrapper-body-bottom" v-if="product.stock && product.stock.is_in_stock">

          <!-- <button v-if="product.stock && product.stock.is_in_stock" class="to_credit xs-hide weight-700">Купити в кредит</button> -->
          <!-- <button v-if="product.stock && product.stock.is_in_stock" class="to_credit weight-700">В кредит</button> -->
          <add-to-cart class="btn btn-successful" v-if="(product.stock && product.stock.is_in_stock)" :product="product"
                       :showIcon="isMobile"/>
        </div>

        <div class="flex py5 w-100 product-wrapper-body-bottom" v-if="!(product.stock && product.stock.is_in_stock)">
          <span class="btn btn-default">
            {{ (product.stock && product.stock.is_in_stock) ? $t('In stock') : $t('Not available') }}
          </span>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import Product from '@vue-storefront/core/compatibility/components/blocks/Wishlist/Product';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers';
import ProductImage from 'theme/components/core/ProductImage';
import RemoveButton from './RemoveButton';
import i18n from '@vue-storefront/i18n';
import { htmlDecode } from '@vue-storefront/core/lib/store/filters';
import AddToCart from 'theme/components/core/AddToCart';
import AddToCompare from 'theme/components/core/blocks/Compare/AddToCompare';
import mobileResolution from 'theme/mixins/mobileResolution'

export default {
  components: {
    RemoveButton,
    ProductImage,
    AddToCart,
    AddToCompare
  },
  mixins: [Product , mobileResolution],
  props: {
    showAddToCart: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    productLink () {
      return formatProductLink(this.product, currentStoreView().storeCode)
    },
    image () {
      return {
        loading: this.thumbnail,
        src: this.thumbnail
      }
    },
    storeView () {
      return currentStoreView()
    }
  },
  methods: {
    removeProductFromWhishList (product) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('Product {productName} has been removed from wishlist!', { productName: htmlDecode(product.name) }),
        action1: { label: i18n.t('OK') }
      }, { root: true })
      this.removeFromWishlist(product)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/animations/transitions';
.xs-hide{
  @media (max-width : 549px) {
    display: none !important;
  }
}
.mobile-nav-menu{
  position: absolute;
  right: 0px;
  top: 20px;
}
.icon-compare {
  /deep/ svg{
    padding: 8px;
    border-radius: 4px;
    &:hover{
      background-color: #F9F9F9;
    }
    &:active{
      background-color: #efefef;
    }
  }
}
.blend {
  flex: 0 0 121px;
  opacity: .8;
  will-change: opacity;
  transition: .3s opacity $motion-main;
  &:hover{
     opacity: 1;
   }
}
.col-xs {
  flex-direction: column;
}
input {
  width: 30px;
}
.price-original {
  text-decoration: line-through;
  color: #828282;
  font-size: .95rem;
}
.wishlist-add-to-cart {
  padding: 10px;
  margin: 15px 0;
  min-width: 100px;
  font-size: 14px;
  text-align: center;
}
.price-original {
  text-decoration: line-through;
  color: #828282;
  font-size: .95rem;
}
.price-original {
  text-decoration: line-through;
  color: #828282;
  font-size: .95rem;
}

.product-container {
  flex: 1;
}

.product-wrapper {
  display: flex;
  position: relative;
  max-width: 485px;
  padding: 16px 0 ;
  .icon-trash-box {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 12px;
  }
  &-image {
    max-width: 50px;
    max-height: 50px;
    img {
      max-width: 50px;
      max-height: 50px;
    }
    .product-image{
      display: flex;
      justify-content: center;
    }
  }



  @media (max-width: 549px) {

    .product-wrapper {
      margin-right: 9px;
      background-color: grey;
      position: relative;
      &-container {
        margin-right: 9px;
      }
    }

    .icon-trash-box {
      left: 9px;
      margin-right: 5px;
    }

    .title {
      position: relative;
      margin-right: 28px;
    }

  }

  .img-gray {
    filter: grayscale(100%) !important;
  }

  .icon-compare {
    position: absolute;
    right: 0px;
    top: 20px;
  }

  &-body {
    /*width: 100%;*/
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    position: relative;

    &-bottom {
      display: flex;
      align-items: center;
      .btn {
        &-clean {
          font-family: DIN Pro;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 15px;
          display: flex;
          align-items: center;
          color: #1A1919;
          border-bottom: 1px dashed #1A1919;
          box-sizing: border-box;
          margin-right: 10px;
          height: max-content;
          padding-bottom: 4px;
          cursor: pointer;
        }
        &-successful {
          padding: 8px 41px;
          font-family: DIN Pro;
          font-style: normal;
          font-weight: 600;
          font-size: 15px;
          line-height: 16px;
          display: flex;
          align-items: center;
          color: #FFFFFF;
          border-radius: 4px;
          cursor: pointer;
          width: auto;
          min-width: auto;
          @media (max-width : 549px){
            padding: 4px 7px;
            /deep/ svg{
              margin-right: 0px;
            }
            /deep/ .add-to-cart-text{
              display: none;
            }
          }
        }

        &-default {
          background: #FFFFFF;
          border: 1px solid #E0E0E0;
          box-sizing: border-box;
          border-radius: 4px;
          padding: 8px 16px;
          text-align: center;
          cursor: pointer;
          width: 175px;
        }

        &-wf {
          width: 100%;
        }

      }
    }

    .text-gray {
      font-family: 'DIN Pro';   
      color: #1A1919 !important;
      font-size: 13px;
    }

    div {
      min-height: 16px;
    }

    .prices-wrapper {
      display: flex;
      flex-direction: column;
    }

    .prices {
      display: flex;
      align-items: center;
      margin-right: 10px;
      /*width: 100%;*/
      .price {
        margin-right: 4px;
        &-old {
          font-family: DIN Pro;
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 15px;
          text-decoration-line: line-through;
          color: #5F5E5E;

        }
        &-current {
          font-family: DIN Pro;
          font-style: normal;
          font-weight: 600;
          font-size: 18px;
          line-height: 20px;
          color: #1A1919;
        }
        &-proc {
          background: #EE2C39;
          border-radius: 30px;
          padding: 0 5px;
          font-family: DIN Pro;
          font-style: normal;
          font-weight: 600;
          font-size: 11px;
          line-height: 16px;
          /* identical to box height, or 145% */

          text-transform: uppercase;

          color: #FFFFFF;
        }
        &-by-promo-code {
          font-family: DIN Pro;
          font-style: normal;
          font-weight: 400;
          font-size: 13px;
          line-height: 16px;
          display: flex;
          align-items: center;
          color: #EE2C39;
          &-text {
            border-bottom: 1px dashed darkgrey;
            font-family: DIN Pro;
            font-style: normal;
            font-weight: 400;
            font-size: 13px;
            line-height: 13px;
            cursor: pointer;
          }
        }
      }
    }

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .tags {
      ul {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        li {
          padding: 5px 10px;
          /*background-color: gold;*/
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 22px;
        }
      }
      .tag {
        margin-right: 4px;
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        line-height: 16px;

        span {
          display: flex;
          align-items: center;
          svg {
            padding-right: 4px;
            margin-right: 0px;
          }

          color: #1A1919;
          font-family: Roboto;
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;
        }

        &-warning {
          background-color: #FFF9E8;
        }

        &-danger {
          background-color: #FDE6E7;
        }
      }
    }
  }
}
.to_credit{
  all: unset;
  appearance: none;
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 0;
  font-size: 14px;
  line-height: 15px;
  display: flex;
  align-items: center;
  color: #1A1919;
  border-bottom: 1px dashed #1A1919;
  box-sizing: border-box;
  padding-bottom: 4px;
  margin-right: 24px;
  text-decoration: none;
  font-weight: 700;
  &:hover{
    cursor: pointer;
    border-color: transparent;
  }
}
</style>
