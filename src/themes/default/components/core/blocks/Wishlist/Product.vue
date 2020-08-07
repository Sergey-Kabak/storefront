<template>
  <li class="row mr35 py20 product-wrapper">

    <span class="icon-compare">
      <AddToCompare :product="product" v-slot="isOnCompare">

        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.9984 12.7007C20.0045 12.5941 19.9894 12.4846 19.9489 12.3783L17.0326 4.71673L12.0483 3.63723C11.8851 2.97321 11.4067 2.43215 10.7814 2.18184V0H9.21885V2.18188C8.86182 2.32481 8.55268 2.56231 8.32272 2.86364L3.05446 1.75407L0.0512179 9.64388C0.0126241 9.74533 -0.00339158 9.84978 0.000592799 9.95177C0.000553736 9.95482 0.000124048 9.95779 0.000124048 9.96087C0.000124048 11.921 1.59474 13.5156 3.55478 13.5156C5.51486 13.5156 7.10947 11.921 7.10947 9.96091C7.10947 9.85017 7.08611 9.74498 7.04455 9.64951C7.04385 9.64767 7.04346 9.6458 7.04275 9.64392L4.78615 3.71555L7.90369 4.37208C7.98994 5.15837 8.51006 5.8156 9.21885 6.09935V18.4374H5.23447V19.9999H14.7657V18.4374H10.7814V6.09935C11.2246 5.92192 11.5938 5.59848 11.8296 5.18856L15.3998 5.96181L12.9574 12.3783C12.9364 12.4335 12.9227 12.4895 12.9146 12.5456C12.8996 12.6062 12.8907 12.6691 12.8907 12.7343C12.8907 14.6944 14.4853 16.289 16.4453 16.289C18.4054 16.289 20 14.6944 20 12.7343C20 12.7229 19.9988 12.7119 19.9984 12.7007ZM3.55482 11.9531C2.73349 11.9531 2.02661 11.4534 1.7222 10.7421H5.38736C5.08298 11.4534 4.37611 11.9531 3.55482 11.9531ZM5.19416 9.17962H1.89985L3.547 4.85231L5.19416 9.17962ZM10.0001 4.68747C9.69854 4.68747 9.45323 4.44216 9.45323 4.14059C9.45323 3.83903 9.69854 3.59372 10.0001 3.59372C10.3017 3.59372 10.547 3.83903 10.547 4.14059C10.547 4.44216 10.3017 4.68747 10.0001 4.68747ZM16.4532 7.58665L18.1153 11.9531H14.7912L16.4532 7.58665ZM16.4454 14.7265C15.6241 14.7265 14.9172 14.2268 14.6128 13.5155H18.2779C17.9736 14.2268 17.2667 14.7265 16.4454 14.7265Z" fill="#23BE20"/>
        </svg>

<!--        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--          <path d="M21.9984 14.7007C22.0045 14.5941 21.9894 14.4846 21.9489 14.3783L19.0326 6.71673L14.0483 5.63723C13.8851 4.97321 13.4067 4.43215 12.7814 4.18184V2H11.2188V4.18188C10.8618 4.32481 10.5527 4.56231 10.3227 4.86364L5.05446 3.75407L2.05122 11.6439C2.01262 11.7453 1.99661 11.8498 2.00059 11.9518C2.00055 11.9548 2.00012 11.9578 2.00012 11.9609C2.00012 13.921 3.59474 15.5156 5.55478 15.5156C7.51486 15.5156 9.10947 13.921 9.10947 11.9609C9.10947 11.8502 9.08611 11.745 9.04455 11.6495C9.04385 11.6477 9.04346 11.6458 9.04275 11.6439L6.78615 5.71555L9.90369 6.37208C9.98994 7.15837 10.5101 7.8156 11.2188 8.09935V20.4374H7.23447V21.9999H16.7657V20.4374H12.7814V8.09935C13.2246 7.92192 13.5938 7.59848 13.8296 7.18856L17.3998 7.96181L14.9574 14.3783C14.9364 14.4335 14.9227 14.4895 14.9146 14.5456C14.8996 14.6062 14.8907 14.6691 14.8907 14.7343C14.8907 16.6944 16.4853 18.289 18.4453 18.289C20.4054 18.289 22 16.6944 22 14.7343C22 14.7229 21.9988 14.7119 21.9984 14.7007ZM5.55482 13.9531C4.73349 13.9531 4.02661 13.4534 3.7222 12.7421H7.38736C7.08298 13.4534 6.37611 13.9531 5.55482 13.9531ZM7.19416 11.1796H3.89985L5.547 6.85231L7.19416 11.1796ZM12.0001 6.68747C11.6985 6.68747 11.4532 6.44216 11.4532 6.14059C11.4532 5.83903 11.6985 5.59372 12.0001 5.59372C12.3017 5.59372 12.547 5.83903 12.547 6.14059C12.547 6.44216 12.3017 6.68747 12.0001 6.68747ZM18.4532 9.58665L20.1153 13.9531H16.7912L18.4532 9.58665ZM18.4454 16.7265C17.6241 16.7265 16.9172 16.2268 16.6128 15.5155H20.2779C19.9736 16.2268 19.2667 16.7265 18.4454 16.7265Z" fill="#828282"/>-->
<!--        </svg>-->

      </AddToCompare>
    </span>

    <span class="icon-trash-box" @click="removeProductFromWhishList(product)">
      <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3.5 8.9L4.9 7.5L7 9.6L9.1 7.5L10.5 8.9L8.4 11L10.5 13.1L9.1 14.5L7 12.4L4.9 14.5L3.5 13.1L5.6 11L3.5 8.9ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z" fill="#BDBDBD"/>
      </svg>
    </span>

    <div class="blend bg-cl-secondary product-wrapper-image" @click="closeWishlist">
      <router-link :to="productLink">
        <product-image :image="image" :class="{ 'img-gray': !(product.stock && product.stock.is_in_stock) }" />
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

          <!--        <div class="h6 cl-bg-tertiary pt5 sku">-->
          <!--          {{ product.sku }}-->
          <!--        </div>-->

          <!--        <div v-if="showAddToCart">-->
          <!--          <add-to-cart-->
          <!--            v-if="product.type_id === 'simple'"-->
          <!--            :product="product"-->
          <!--            class="wishlist-add-to-cart col-xs-12 col-sm-4 col-md-6"-->
          <!--          />-->
          <!--          <router-link-->
          <!--            v-else-->
          <!--            :to="productLink"-->
          <!--            class="wishlist-add-to-cart no-outline button-full block brdr-none w-100 px10 py20 bg-cl-mine-shaft :bg-cl-th-secondary ripple weight-400 h4 cl-white sans-serif fs-medium col-xs-12 col-sm-4 col-md-6"-->
          <!--          >-->
          <!--            {{ $t('Configure') }}-->
          <!--          </router-link>-->
          <!--        </div>-->
        </div>

<!--        <div v-if="product.stock && product.stock.is_in_stock" class="col-sflex py5 w-100 tags">-->
<!--          <ul>-->
<!--            <li class="mr-10 tag tag-danger">-->
<!--            <span>-->
<!--              <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                <path d="M3.06417 11.9368L7.6928 3.96706C7.79759 3.78662 7.64897 3.56457 7.4422 3.5927L4.36336 4.01117L5.09899 0.149093C5.12379 0.0188981 4.95593 -0.0557035 4.87592 0.0499293L0.324963 6.0572C0.1924 6.23216 0.332768 6.48095 0.551064 6.45798L3.94547 6.10067L2.83268 11.8501C2.80585 11.9888 2.99323 12.059 3.06417 11.9368Z" fill="#FFCA41"/>-->
<!--                <path d="M1.74813 5.63157C1.66313 5.63837 1.60667 5.54544 1.65185 5.47313L5.05449 0.0289297C5.00386 -0.011125 4.92417 -0.0137031 4.87592 0.0500001L0.324963 6.05727C0.1924 6.23225 0.332768 6.48102 0.551064 6.45805L3.94547 6.10074L2.83268 11.8501C2.81768 11.9277 2.86999 11.9823 2.93114 11.9953L4.838 5.96141C4.92739 5.67859 4.70187 5.39525 4.40621 5.41892L1.74813 5.63157Z" fill="#FFBB0B"/>-->
<!--              </svg>-->
<!--              0.01%-->
<!--            </span>-->
<!--            </li>-->
<!--            <li class="mr-10 tag tag-warning">-->
<!--            <span>-->
<!--              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--              <g clip-path="url(#clip0)">-->
<!--                <path d="M10.7339 4.16719L9.77769 2.73281C9.69331 2.60625 9.53162 2.54295 9.38394 2.59219C9.23626 2.63437 9.13081 2.775 9.13081 2.92971C9.13081 3.61875 9.02532 4.30781 8.82847 4.97578C8.65972 4.49062 8.33628 4.06172 7.89329 3.77341C7.11282 3.2531 6.90191 2.23591 7.42222 1.45547L8.03394 0.541406C8.10423 0.435914 8.11128 0.295289 8.04798 0.182813C7.99175 0.0702891 7.87219 0 7.7386 0C7.11992 0 6.5363 0.119508 5.9949 0.337477C4.34258 0.998414 3.14724 2.52891 3.03477 4.39216C2.92224 4.08982 2.85898 3.76638 2.85898 3.43591V2.05781C2.85898 1.90315 2.75349 1.76252 2.60584 1.72034C2.4582 1.67112 2.29646 1.73442 2.21209 1.86096L1.74102 2.57112C0.869141 3.87893 0.412109 5.39766 0.412109 6.96565C0.412063 9.74294 2.66912 12 5.44646 12H6.54334C9.32063 12 11.5871 9.74294 11.5871 6.96565C11.5871 5.96716 11.2894 4.99685 10.7339 4.16719Z" fill="#FF5B66"/>-->
<!--                <path d="M6.29805 6.24121C6.23479 6.1217 6.11524 6.06543 5.99571 6.06543C5.8762 6.06543 5.76365 6.1217 5.69336 6.24121C4.23789 8.76545 3.90039 9.08887 3.90039 9.90452C3.90039 11.0576 4.84256 11.9998 5.99568 11.9998C7.14881 11.9998 8.09098 11.0576 8.09098 9.90452C8.091 9.01152 7.49337 8.31543 6.29805 6.24121Z" fill="#FFDC81"/>-->
<!--                <path d="M11.5883 6.96565C11.5883 9.74294 9.32186 12 6.54456 12H5.99609V0.337477C6.53752 0.119508 7.12112 0 7.73982 0C7.87342 0 7.99297 0.0702891 8.0492 0.182813C8.1125 0.295289 8.10547 0.435938 8.03516 0.541406L7.42344 1.45547C6.90313 2.23594 7.11406 3.25312 7.89451 3.77341C8.33748 4.06172 8.66094 4.49062 8.82969 4.97578C9.02654 4.30781 9.13203 3.61875 9.13203 2.92971C9.13203 2.775 9.23748 2.63437 9.38516 2.59219C9.53284 2.54297 9.69454 2.60627 9.77891 2.73281L10.7352 4.16719C11.2907 4.99685 11.5883 5.96716 11.5883 6.96565Z" fill="#EE2C39"/>-->
<!--                <path d="M8.09139 9.90452C8.09139 11.0576 7.14922 11.9998 5.99609 11.9998V6.06543C6.1156 6.06543 6.23518 6.1217 6.29844 6.24121C7.49376 8.31543 8.09139 9.01152 8.09139 9.90452Z" fill="#FFCA41"/>-->
<!--              </g>-->
<!--              <defs>-->
<!--                <clipPath id="clip0">-->
<!--                  <rect width="12" height="12" fill="white"/>-->
<!--                </clipPath>-->
<!--              </defs>-->
<!--            </svg>-->
<!--            Скидка на аксессуары-->
<!--            </span>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </div>-->

        <div class="flex py5 w-100 prices-wrapper">
          <div class="prices">
            <!--          <span class="price-special" v-if="product.special_price">-->
            <!--            {{ product.price_incl_tax | price(storeView) }}-->
            <!--          </span>&nbsp;-->
            <!--          <span class="price-original" v-if="product.special_price">-->
            <!--            {{ product.original_price_incl_tax | price(storeView) }}-->
            <!--          </span>-->
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
<!--          <span class="price price-proc" v-if="!product.special_price">-->
<!--            -25%-->
<!--          </span>-->
          </div>
<!--          <div class="prices">-->
<!--            <span class="price price-by-promo-code" v-if="!product.special_price">-->
<!--              {{ product.original_price_incl_tax | price(storeView) }}-->
<!--            </span>-->
<!--            <span class="price price-by-promo-code-text" v-if="!product.special_price">-->
<!--              цена по промокоду-->
<!--            </span>-->
<!--          </div>-->
          <!--        <div>-->
          <!--          <div class="mt5">-->
          <!--            <span @click="removeProductFromWhishList(product)"><remove-button class="cl-accent" /></span>-->
          <!--          </div>-->
          <!--        </div>-->
        </div>

        <div class="flex py5 w-100 product-wrapper-body-bottom" v-if="product.stock && product.stock.is_in_stock">
<!--          <span class="btn btn-clean" v-if="product.stock && product.stock.is_in_stock">Купить в кредит</span>-->

<!--          <span class="btn btn-successful" v-if="product.stock && product.stock.is_in_stock">Купить</span>-->

          <add-to-cart class="btn btn-successful" v-if="(product.stock && product.stock.is_in_stock)" :product="product" :showIcon="false"/>

        </div>

        <div class="flex py5 w-100 product-wrapper-body-bottom" v-if="!(product.stock && product.stock.is_in_stock)">
          <span class="btn btn-default">
            {{ (product.stock && product.stock.is_in_stock) ? $t('In stock') : $t('Not available') }}
          </span>
        </div>

      </div>
    </div>

<!--    <div class="col-xs flex py15 align-right">-->

  </li>
</template>

<script>
import config from 'config'
import Product from '@vue-storefront/core/compatibility/components/blocks/Wishlist/Product'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers'
import ProductImage from 'theme/components/core/ProductImage'
import RemoveButton from './RemoveButton'
import i18n from '@vue-storefront/i18n'
import { htmlDecode } from '@vue-storefront/core/lib/store/filters'
import AddToCart from 'theme/components/core/AddToCart'
import AddToCompare from 'theme/components/core/blocks/Compare/AddToCompare'

export default {
  components: {
    RemoveButton,
    ProductImage,
    AddToCart,
    AddToCompare
  },
  mixins: [Product],
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
  .icon-trash-box {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
  }
  &-image {
    max-width: 60px;
    max-height: 80px;
    img {
      max-width: 60px;
      max-height: 80px;
    }
  }



  @media (max-width: 549px) {

    /*.icon-compare {}*/

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
      margin-left: -25px;
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
    right: 9px;
    top: 20px;
  }

  &-body {
    /*width: 100%;*/
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    position: relative;

    width: min-content;

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
          background-color: #23BE20;
          border-radius: 4px;
          cursor: pointer;
          width: auto;
          min-width: auto;
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
      color: gray !important;
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
        margin-right: 5px;
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
</style>
