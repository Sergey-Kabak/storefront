<template>
  <div class="product w-100 pb20 d-flex-column btw mt20" v-observe-visibility="visibilityChanged">
    <div class="product__icons">
      <AddToWishlist :product="product">
        <div
          class="product__icon"
          :class="{'product__icon--active': isOnWishlist }"
          :title="isOnWishlist ? $t('Remove') : $t('Add to favorite') "
        >
          <!--          <i class="material-icons">{{ favoriteIcon }}</i>-->

          <svg v-if="!isOnWishlist" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0005 1.595C8.91087 0.593103 7.48468 0.0370453 6.00447 0.0369987C5.22101 0.0378145 4.44544 0.193558 3.72241 0.495267C2.99937 0.796976 2.34313 1.23869 1.79147 1.795C-0.561531 4.158 -0.560531 7.854 1.79347 10.207L9.12547 17.539C9.29547 17.838 9.62347 18.031 10.0005 18.031C10.1553 18.0295 10.3076 17.9917 10.4451 17.9207C10.5827 17.8496 10.7016 17.7473 10.7925 17.622L18.2075 10.207C20.5615 7.853 20.5615 4.158 18.2055 1.791C17.6541 1.23572 16.9984 0.794896 16.276 0.493882C15.5537 0.192868 14.779 0.0375984 13.9965 0.0369987C12.5163 0.0372407 11.0902 0.593271 10.0005 1.595ZM16.7915 3.205C18.3545 4.776 18.3555 7.23 16.7935 8.793L10.0005 15.586L3.20747 8.793C1.64547 7.23 1.64647 4.776 3.20547 3.209C3.96547 2.453 4.95947 2.037 6.00447 2.037C7.04947 2.037 8.03947 2.453 8.79347 3.207L9.29347 3.707C9.38626 3.79994 9.49646 3.87368 9.61778 3.92399C9.73909 3.9743 9.86914 4.0002 10.0005 4.0002C10.1318 4.0002 10.2618 3.9743 10.3832 3.92399C10.5045 3.87368 10.6147 3.79994 10.7075 3.707L11.2075 3.207C12.7195 1.698 15.2815 1.702 16.7915 3.205Z" fill="#828282"/>
          </svg>

          <svg v-if="isOnWishlist" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0005 1.59499C8.91087 0.593091 7.48468 0.0370339 6.00447 0.0369873C5.22101 0.037803 4.44544 0.193547 3.72241 0.495256C2.99937 0.796965 2.34313 1.23868 1.79147 1.79499C-0.561531 4.15799 -0.560531 7.85399 1.79347 10.207L9.12547 17.539C9.29547 17.838 9.62347 18.031 10.0005 18.031C10.1553 18.0295 10.3076 17.9917 10.4451 17.9207C10.5827 17.8496 10.7016 17.7473 10.7925 17.622L18.2075 10.207C20.5615 7.85299 20.5615 4.15799 18.2055 1.79099C17.6541 1.2357 16.9984 0.794884 16.276 0.49387C15.5537 0.192857 14.779 0.0375869 13.9965 0.0369873C12.5163 0.0372293 11.0902 0.59326 10.0005 1.59499ZM16.7915 3.20499C18.3545 4.77599 18.3555 7.22999 16.7935 8.79299L10.0005 15.586L3.20747 8.79299C1.64547 7.22999 1.64647 4.77599 3.20547 3.20899C3.96547 2.45299 4.95947 2.03699 6.00447 2.03699C7.04947 2.03699 8.03947 2.45299 8.79347 3.20699L9.29347 3.70699C9.38626 3.79993 9.49646 3.87367 9.61778 3.92398C9.73909 3.97429 9.86914 4.00019 10.0005 4.00019C10.1318 4.00019 10.2618 3.97429 10.3832 3.92398C10.5045 3.87367 10.6147 3.79993 10.7075 3.70699L11.2075 3.20699C12.7195 1.69799 15.2815 1.70199 16.7915 3.20499Z" fill="#23BE20"/>
          </svg>

        </div>
      </AddToWishlist>
      <AddToCompare :product="product">
        <div
          class="product__icon"
          :class="{'product__icon--active':isOnCompare } "
          :title="isOnCompare ? $t('Remove from compare') : $t('Add to compare')"
        >

          <svg v-if="!isOnCompare" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.9984 14.7007C22.0045 14.5941 21.9894 14.4846 21.9489 14.3783L19.0326 6.71673L14.0483 5.63723C13.8851 4.97321 13.4067 4.43215 12.7814 4.18184V2H11.2188V4.18188C10.8618 4.32481 10.5527 4.56231 10.3227 4.86364L5.05446 3.75407L2.05122 11.6439C2.01262 11.7453 1.99661 11.8498 2.00059 11.9518C2.00055 11.9548 2.00012 11.9578 2.00012 11.9609C2.00012 13.921 3.59474 15.5156 5.55478 15.5156C7.51486 15.5156 9.10947 13.921 9.10947 11.9609C9.10947 11.8502 9.08611 11.745 9.04455 11.6495C9.04385 11.6477 9.04346 11.6458 9.04275 11.6439L6.78615 5.71555L9.90369 6.37208C9.98994 7.15837 10.5101 7.8156 11.2188 8.09935V20.4374H7.23447V21.9999H16.7657V20.4374H12.7814V8.09935C13.2246 7.92192 13.5938 7.59848 13.8296 7.18856L17.3998 7.96181L14.9574 14.3783C14.9364 14.4335 14.9227 14.4895 14.9146 14.5456C14.8996 14.6062 14.8907 14.6691 14.8907 14.7343C14.8907 16.6944 16.4853 18.289 18.4453 18.289C20.4054 18.289 22 16.6944 22 14.7343C22 14.7229 21.9988 14.7119 21.9984 14.7007ZM5.55482 13.9531C4.73349 13.9531 4.02661 13.4534 3.7222 12.7421H7.38736C7.08298 13.4534 6.37611 13.9531 5.55482 13.9531ZM7.19416 11.1796H3.89985L5.547 6.85231L7.19416 11.1796ZM12.0001 6.68747C11.6985 6.68747 11.4532 6.44216 11.4532 6.14059C11.4532 5.83903 11.6985 5.59372 12.0001 5.59372C12.3017 5.59372 12.547 5.83903 12.547 6.14059C12.547 6.44216 12.3017 6.68747 12.0001 6.68747ZM18.4532 9.58665L20.1153 13.9531H16.7912L18.4532 9.58665ZM18.4454 16.7265C17.6241 16.7265 16.9172 16.2268 16.6128 15.5155H20.2779C19.9736 16.2268 19.2667 16.7265 18.4454 16.7265Z" fill="#828282"/>
          </svg>

          <!--          <svg v-if="!isOnCompare" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">-->
          <!--            <path d="M19.9984 12.7007C20.0045 12.5941 19.9894 12.4846 19.9489 12.3783L17.0326 4.71673L12.0483 3.63723C11.8851 2.97321 11.4067 2.43215 10.7814 2.18184V0H9.21885V2.18188C8.86182 2.32481 8.55268 2.56231 8.32272 2.86364L3.05446 1.75407L0.0512179 9.64388C0.0126241 9.74533 -0.00339158 9.84978 0.000592799 9.95177C0.000553736 9.95482 0.000124048 9.95779 0.000124048 9.96087C0.000124048 11.921 1.59474 13.5156 3.55478 13.5156C5.51486 13.5156 7.10947 11.921 7.10947 9.96091C7.10947 9.85017 7.08611 9.74498 7.04455 9.64951C7.04385 9.64767 7.04346 9.6458 7.04275 9.64392L4.78615 3.71555L7.90369 4.37208C7.98994 5.15837 8.51006 5.8156 9.21885 6.09935V18.4374H5.23447V19.9999H14.7657V18.4374H10.7814V6.09935C11.2246 5.92192 11.5938 5.59848 11.8296 5.18856L15.3998 5.96181L12.9574 12.3783C12.9364 12.4335 12.9227 12.4895 12.9146 12.5456C12.8996 12.6062 12.8907 12.6691 12.8907 12.7343C12.8907 14.6944 14.4853 16.289 16.4453 16.289C18.4054 16.289 20 14.6944 20 12.7343C20 12.7229 19.9988 12.7119 19.9984 12.7007ZM3.55482 11.9531C2.73349 11.9531 2.02661 11.4534 1.7222 10.7421H5.38736C5.08298 11.4534 4.37611 11.9531 3.55482 11.9531ZM5.19416 9.17962H1.89985L3.547 4.85231L5.19416 9.17962ZM10.0001 4.68747C9.69854 4.68747 9.45323 4.44216 9.45323 4.14059C9.45323 3.83903 9.69854 3.59372 10.0001 3.59372C10.3017 3.59372 10.547 3.83903 10.547 4.14059C10.547 4.44216 10.3017 4.68747 10.0001 4.68747ZM16.4532 7.58665L18.1153 11.9531H14.7912L16.4532 7.58665ZM16.4454 14.7265C15.6241 14.7265 14.9172 14.2268 14.6128 13.5155H18.2779C17.9736 14.2268 17.2667 14.7265 16.4454 14.7265Z" fill="#23BE20"/>-->
          <!--          </svg>-->

          <svg v-if="isOnCompare" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0332 3.5794C11.857 2.94186 11.3884 2.42484 10.7814 2.18184V0H9.21885V2.18188C8.86182 2.32481 8.55268 2.56231 8.32272 2.86364L3.05446 1.75407L0.0512179 9.64388C0.0126241 9.74533 -0.00339158 9.84978 0.000592799 9.95177C0.00057425 9.95322 0.000467618 9.95465 0.000360739 9.95608C0.000242544 9.95767 0.000124048 9.95925 0.000124048 9.96087C0.000124048 11.921 1.59474 13.5156 3.55478 13.5156C5.51486 13.5156 7.10947 11.921 7.10947 9.96091C7.10947 9.85017 7.08611 9.74498 7.04455 9.64951L7.04275 9.64392L4.78615 3.71555L7.90369 4.37208C7.98994 5.15837 8.51006 5.8156 9.21885 6.09935V18.4374H5.23447V19.9999H14.7657V18.4374H10.7814V6.09935C11.2246 5.92192 11.5938 5.59848 11.8296 5.18856L12.5869 5.35259C12.2987 4.81297 12.1065 4.21429 12.0332 3.5794ZM17 8C17.4226 8 17.8329 7.94758 18.2249 7.84888L19.9489 12.3783C19.9894 12.4845 20.0045 12.5941 19.9984 12.7007C19.9985 12.7049 19.9988 12.709 19.9991 12.7131C19.9996 12.7202 20 12.7272 20 12.7343C20 14.6944 18.4054 16.289 16.4453 16.289C14.4853 16.289 12.8907 14.6944 12.8907 12.7343C12.8907 12.6691 12.8996 12.6062 12.9146 12.5456C12.9227 12.4895 12.9364 12.4335 12.9574 12.3783L14.8149 7.49852C15.2789 7.72431 15.783 7.88043 16.3137 7.95328L14.7912 11.9531H18.1153L16.6047 7.9846C16.7351 7.9948 16.867 8 17 8ZM1.89985 9.17962H5.19416L3.547 4.85231L1.89985 9.17962ZM9.45323 4.14059C9.45323 4.44215 9.69854 4.68747 10.0001 4.68747C10.3017 4.68747 10.547 4.44215 10.547 4.14059C10.547 3.83903 10.3017 3.59372 10.0001 3.59372C9.69854 3.59372 9.45323 3.83903 9.45323 4.14059Z" fill="#23BE20"/>
            <path d="M16.25 6.16L13.5 3.16L14.66 2L16.25 3.59L19.84 0L21 1.41L16.25 6.16Z" fill="#23BE20"/>
          </svg>

        </div>
      </AddToCompare>
    </div>

    <router-link
      class="flex flex-column no-underline product-link"
      :to="productLink"
      data-testid="productLink"
    >

      <!--      <div class="product-tag-wrapper">-->
      <!--        <tag text="0.01%" color-type="warning">-->
      <!--          <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--            <path d="M3.06369 11.9368L7.69231 3.96706C7.7971 3.78662 7.64848 3.56457 7.44172 3.5927L4.36287 4.01117L5.09851 0.149093C5.1233 0.0188981 4.95544 -0.0557035 4.87543 0.0499293L0.324475 6.0572C0.191912 6.23216 0.332279 6.48095 0.550576 6.45798L3.94498 6.10067L2.83219 11.8501C2.80536 11.9888 2.99274 12.059 3.06369 11.9368Z" fill="#FFCA41"/>-->
      <!--          </svg>-->
      <!--        </tag>-->
      <!--      </div>-->

      <div
        class="product-cover bg-cl-secondary"
        :class="[{ sale: labelsActive && isOnSale }, { new: labelsActive && isNew }]"
      >
        <product-image
          class="product-cover__thumb"
          :image="thumbnailObj"
          :alt="product.name | htmlDecode"
          :calc-ratio="false"
          data-testid="productImage"
        />
      </div>

      <div class="product-tag-bottom">
        <tag :text="$t('Discount on accessories')" color-type="danger">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.7342 4.16719L9.77793 2.73281C9.69356 2.60625 9.53186 2.54295 9.38418 2.59219C9.2365 2.63437 9.13106 2.775 9.13106 2.92971C9.13106 3.61875 9.02556 4.30781 8.82871 4.97578C8.65996 4.49062 8.33652 4.06172 7.89353 3.77341C7.11306 3.2531 6.90215 2.23591 7.42246 1.45547L8.03418 0.541406C8.10447 0.435914 8.11152 0.295289 8.04822 0.182813C7.99199 0.0702891 7.87244 0 7.73884 0C7.12017 0 6.53655 0.119508 5.99514 0.337477C4.34282 0.998414 3.14749 2.52891 3.03501 4.39216C2.92249 4.08982 2.85923 3.76638 2.85923 3.43591V2.05781C2.85923 1.90315 2.75374 1.76252 2.60608 1.72034C2.45845 1.67112 2.29671 1.73442 2.21233 1.86096L1.74126 2.57112C0.869385 3.87893 0.412354 5.39766 0.412354 6.96565C0.412307 9.74294 2.66936 12 5.4467 12H6.54358C9.32088 12 11.5873 9.74294 11.5873 6.96565C11.5873 5.96716 11.2897 4.99685 10.7342 4.16719Z" fill="#FF5B66"/>
          </svg>
        </tag>
      </div>

      <span v-if="product.original_price_incl_tax && product.original_special_price" class="lh30 cl-secondary price-sale mobile">
          -{{ (product.original_price_incl_tax - product.original_special_price) | price(storeView) }}
      </span>

      <p class="mb0 cl-accent name mt10" v-if="!onlyImage">
        {{ product.name | htmlDecode }}
      </p>

      <div class="flex center-xs start-md mt-auto product-price-block">

        <span
          class="lh30 cl-secondary price-original"
          v-if="product.special_price && parseFloat(product.original_price_incl_tax) > 0 && !onlyImage"
        >
<!--        <span class="lh30 cl-secondary price-original">-->
          {{ product.original_price_incl_tax | price(storeView) }}
        </span>

        <span
          class="lh30 cl-secondary price-special"
          v-if="!product.special_price && parseFloat(product.price_incl_tax) > 0 && !onlyImage"
        >
          {{ product.price_incl_tax | price(storeView) }}
        </span>

        <!--        <span class="lh30 cl-secondary price-discount">-->
        <!--          -30%-->
        <!--        </span>-->

      </div>

      <!--      <div-->
      <!--        class="flex center-xs start-md mt-auto product-price-block"-->
      <!--        v-if="product.original_price_incl_tax && product.original_special_price"-->
      <!--      >-->
      <!--        <span class="lh30 cl-secondary price-sale">-->
      <!--          {{ (product.original_price_incl_tax - product.original_special_price) | price(storeView) }}-->
      <!--        </span>-->
      <!--        <span class="lh30 cl-secondary price-by-promo-code">-->
      <!--          {{ $t('price by promotional code') }}-->
      <!--        </span>-->
      <!--      </div>-->

      <!--      <div class="flex center-xs start-md mt-auto product-price-block">-->
      <!--        -->
      <!--        <span-->
      <!--            class="price-original mr5 lh30 cl-secondary"-->
      <!--            v-if="product.special_price && parseFloat(product.original_price_incl_tax) > 0 && !onlyImage"-->
      <!--        >{{ product.original_price_incl_tax | price(storeView) }}</span>-->

      <!--        <span-->
      <!--            class="price-special lh30 cl-accent weight-700"-->
      <!--            v-if="product.special_price && parseFloat(product.special_price) > 0 && !onlyImage"-->
      <!--        >{{ product.price_incl_tax | price(storeView) }}</span>-->

      <!--        <span-->
      <!--            class="lh30 cl-secondary price-special"-->
      <!--            v-if="!product.special_price && parseFloat(product.price_incl_tax) > 0 && !onlyImage"-->
      <!--        >{{ product.price_incl_tax | price(storeView) }}</span>-->

      <!--        <span v-if="product.original_price_incl_tax && product.original_special_price" class="lh30 cl-secondary price-sale">-->
      <!--          -{{ (product.original_price_incl_tax - product.original_special_price) | price(storeView) }}-->
      <!--        </span>-->

      <!--      </div>-->

    </router-link>

    <span
      class="product-is-not-available"
      v-if="!((product && product.stock && product.stock.is_in_stock) && (product && (product.price_incl_tax || product.original_price_incl_tax)))"
    >
      {{ $t('Not available') }}
    </span>

    <div
      class="d-flex btw w-100 product-card-bottom-options"
      v-if="(product && product.stock && product.stock.is_in_stock) && (product && (product.price_incl_tax || product.original_price_incl_tax))"
    >
      <!--<add-to-cart-->
      <!--:product="product"-->
      <!--:disabled="!(product && product.stock && product.stock.is_in_stock)"-->
      <!--class="col-xs-12 col-sm-4 col-md-6 add-to-cart"-->
      <!--/>-->

      <!--      <span class="product-on-credit">{{ $t('In credit') }}</span>-->

      <button-full @click.native="toProduct()" :disabled="!(product && product.stock && product.stock.is_in_stock)" data-testid="addToCart" class="add-to-cart">
        <span class="add-to-cart-text">{{ $t('Buy') }}</span>
      </button-full>
    </div>
    <div class="flex between-md mt15" v-if="isShowCompareAndFavorite">
      <AddToCompare :product="product" />
      <AddToWishlist :product="product" />
    </div>
  </div>
</template>

<script>
  import rootStore from '@vue-storefront/core/store'
  import { ProductTile } from '@vue-storefront/core/modules/catalog/components/ProductTile.ts'
  import config from 'config'
  import ProductImage from './ProductImage'
  import AddToWishlist from 'theme/components/core/blocks/Wishlist/AddToWishlist'
  import AddToCart from 'theme/components/core/AddToCart.vue'
  import AddToCompare from 'theme/components/core/blocks/Compare/AddToCompare'
  import { IsOnWishlist } from '@vue-storefront/core/modules/wishlist/components/IsOnWishlist'
  import { IsOnCompare } from '@vue-storefront/core/modules/compare/components/IsOnCompare'
  import { currentStoreView } from '@vue-storefront/core/lib/multistore'
  import ButtonFull from 'theme/components/theme/ButtonFull.vue'
  import Tag from "theme/components/core/Tag";

  export default {
    mixins: [ProductTile, IsOnWishlist, IsOnCompare],
    components: {
      ButtonFull,
      ProductImage,
      AddToWishlist,
      AddToCompare,
      AddToCart,
      Tag
    },
    props: {
      isShowCompareAndFavorite: {
        type: Boolean,
        required: false,
        default: false
      },
      labelsActive: {
        type: Boolean,
        default: true
      },
      onlyImage: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      qwe() {
        return this.IsOnWishlist
      },
      thumbnailObj () {
        return {
          src: this.thumbnail,
          loading: this.thumbnail
        }
      },
      favoriteIcon () {
        return this.isOnWishlist ? 'favorite' : 'favorite_border'
      },
      storeView () {
        return currentStoreView()
      }
    },
    methods: {
      toProduct () {
        this.$router.push(this.productLink)
      },
      onProductPriceUpdate (product) {
        if (product.sku === this.product.sku) {
          Object.assign(this.product, product)
        }
      },
      productPercent () {
        let a = this.product.original_price_incl_tax / 100
        let b = this.product.original_special_price / a
        return 100 - b
      },
      visibilityChanged (isVisible, entry) {
        if (
          isVisible &&
          config.products.configurableChildrenStockPrefetchDynamic &&
          config.products.filterUnavailableVariants &&
          this.product.type_id === 'configurable' &&
          this.product.configurable_children &&
          this.product.configurable_children.length > 0
        ) {
          const skus = [this.product.sku]
          for (const confChild of this.product.configurable_children) {
            const cachedItem = rootStore.state.stock.cache[confChild.id]
            if (typeof cachedItem === 'undefined' || cachedItem === null) {
              skus.push(confChild.sku)
            }
          }
          if (skus.length > 0) {
            rootStore.dispatch('stock/list', { skus: skus }) // store it in the cache
          }
        }
      },
    },
    beforeMount () {
      this.$bus.$on('product-after-priceupdate', this.onProductPriceUpdate)
    },
    beforeDestroy () {
      this.$bus.$off('product-after-priceupdate', this.onProductPriceUpdate)
    }
  }
</script>

<style lang="scss">
  .product {
    .add-to-cart {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    @media (max-width: 767px) {
      .add-to-cart {
        padding: 8px 0 !important;
      }
      .add-to-cart-text {
        display: none !important;
      }
      .add-to-cart-ico {
        margin: 0 !important;
      }
    }
  }
</style>

<style lang="scss" scoped>
  @import '~theme/css/animations/transitions';
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';

  $bg-secondary: color(secondary, $colors-background);
  $border-secondary: color(secondary, $colors-border);
  $color-white: color(white);

  .product {
    position: relative;
    border: 1px solid #E0E0E0;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 16px;

    &-tag {
      &-bottom {
        z-index: 3;
        margin-top: 3px;
      }
      &-wrapper {
        position: absolute;
        z-index: 3;
        display: flex;
      }
    }

    &.d-flex-column {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .flex-column {
      flex-direction: column;
    }

    .product-link {
      align-items: flex-start;
      .mt-auto {
        margin-top: auto;
      }
    }

    .name {
      /*margin: 12px 0 16px;*/
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 400;
      font-size: 15px;
      line-height: 24px;
      color: #1A1919;
      @media (max-width: 991px) {
        margin-bottom: 10px;
      }
    }
    @media (max-width: 767px) {
      padding-bottom: 10px;
    }
    &__icons {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      padding-right: 20px;
      padding-top: 10px;
    }
    &__icon {
      padding-top: 10px;
      opacity: 0;
      z-index: 2;
      transition: 0.3s opacity $motion-main;
      @media (max-width: 767px) {
        opacity: 1;
      }
      &--active {
        opacity: 1;
      }
    }
    &:hover {
      .product__icon {
        opacity: 1;
      }
    }
    .btw {
      justify-content: space-between;
      text-align: right;
      margin-top: 20px;
    }
    .add-to-cart {
      padding: 8px 10px;
      border-radius: 4px;
      width: 50%;
      display: inline-flex;
      margin-top: auto;
      margin-left: auto;
      min-width: auto;
      font-weight: bold;
    }

    .product-price-block {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;

      @media (max-width: 767px) {
        .price-sale {
          margin-left: 0;
          margin-top: 5px;
        }
      }
    }

    &-is-not-available {
      width: 100%;
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 16px;
      color: #000000;
      cursor: pointer;
      padding: 24px 0;
      text-align: center;
    }

    &-on-credit {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 15px;
      display: flex;
      align-items: center;
      color: #1A1919;
      border-bottom: 1px dashed #1A1919;
      box-sizing: border-box;
      padding-bottom: 3px;
      cursor: pointer;
    }

    .add-to-cart {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 600;
      font-size: 15px;
      line-height: 16px;
      display: flex;
      align-items: center;
      color: #FFFFFF;
      flex: none;
      order: 0;
      align-self: center;
      margin: 10px 0;
      &-text {
        display: block !important;
      }
    }

    &-card-bottom-options {
      justify-content: space-between;
      text-align: right;
      margin-top: 20px;
      display: flex;
      align-items: center;
    }
  }

  .price {
    &-discount {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 400;
      font-size: 11px;
      line-height: 16px;
      text-transform: uppercase;
      color: #FFFFFF;
      background: #EE2C39;
      border-radius: 30px;
      padding: 0 3px;
      @media (max-width: 991px) {
        margin-left: -10px;
        margin-top: -22px;
      }
    }
    &-original {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 16px;
      text-decoration-line: line-through;
      color: #5F5E5E;
      margin-right: 4px;
    }
    &-special {
      font-weight: 600;
      font-family: DIN Pro;
      font-style: normal;
      font-size: 22px;
      line-height: 30px;
      color: #1A1919;
      margin-right: 4px;
    }
    &-sale {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      display: flex;
      align-items: center;
      color: #EE2C39;
      margin-right: 4px;
      /*@media (max-width: 787px) {*/
      /*  display: none;*/
      /*}*/

      /*&.mobile {*/
      /*  display: none;*/
      /*  @media (max-width: 787px) {*/
      /*    width: auto;*/
      /*    margin: 10px 0 0;*/
      /*    display: flex;*/
      /*  }*/
      /*}*/
    }
    &-by-promo-code {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 13px;
      display: flex;
      align-items: center;
      color: #1A1919;
      border-bottom: 1px dashed #1A1919;
      box-sizing: border-box;
      padding-bottom: 3px;
      margin-bottom: -8px;
    }
  }

  %label {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: $border-secondary;
    text-transform: uppercase;
    color: $color-white;
    font-size: 12px;
  }

  .product-cover {
    overflow: hidden;
    width: 100%;

    &__thumb {
      padding: 0;
      opacity: 0.8;
      will-change: opacity, transform;
      transition: 0.3s opacity $motion-main, 0.3s transform $motion-main;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    @media screen and (min-width: 768px) {
      &:hover {
        .product-cover__thumb {
          opacity: 1;
          transform: scale(1.1);
        }
        &.sale::after,
        &.new::after {
          opacity: 0.8;
        }
      }
    }

    &.sale {
      &::after {
        @extend %label;
        content: 'Sale';
      }
    }
    &.new {
      &::after {
        @extend %label;
        content: 'New';
      }
    }
  }
</style>
<template>
  <div class="product w-100 pb20 d-flex-column btw mt20" v-observe-visibility="visibilityChanged">
    <div class="product__icons">
      <AddToWishlist :product="product">
        <div
          class="product__icon"
          :class="{'product__icon--active': isOnWishlist }"
          :title="isOnWishlist ? $t('Remove') : $t('Add to favorite') "
        >
          <!--          <i class="material-icons">{{ favoriteIcon }}</i>-->

          <svg v-if="!isOnWishlist" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0005 1.595C8.91087 0.593103 7.48468 0.0370453 6.00447 0.0369987C5.22101 0.0378145 4.44544 0.193558 3.72241 0.495267C2.99937 0.796976 2.34313 1.23869 1.79147 1.795C-0.561531 4.158 -0.560531 7.854 1.79347 10.207L9.12547 17.539C9.29547 17.838 9.62347 18.031 10.0005 18.031C10.1553 18.0295 10.3076 17.9917 10.4451 17.9207C10.5827 17.8496 10.7016 17.7473 10.7925 17.622L18.2075 10.207C20.5615 7.853 20.5615 4.158 18.2055 1.791C17.6541 1.23572 16.9984 0.794896 16.276 0.493882C15.5537 0.192868 14.779 0.0375984 13.9965 0.0369987C12.5163 0.0372407 11.0902 0.593271 10.0005 1.595ZM16.7915 3.205C18.3545 4.776 18.3555 7.23 16.7935 8.793L10.0005 15.586L3.20747 8.793C1.64547 7.23 1.64647 4.776 3.20547 3.209C3.96547 2.453 4.95947 2.037 6.00447 2.037C7.04947 2.037 8.03947 2.453 8.79347 3.207L9.29347 3.707C9.38626 3.79994 9.49646 3.87368 9.61778 3.92399C9.73909 3.9743 9.86914 4.0002 10.0005 4.0002C10.1318 4.0002 10.2618 3.9743 10.3832 3.92399C10.5045 3.87368 10.6147 3.79994 10.7075 3.707L11.2075 3.207C12.7195 1.698 15.2815 1.702 16.7915 3.205Z" fill="#828282"/>
          </svg>

          <svg v-if="isOnWishlist" width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0005 1.59499C8.91087 0.593091 7.48468 0.0370339 6.00447 0.0369873C5.22101 0.037803 4.44544 0.193547 3.72241 0.495256C2.99937 0.796965 2.34313 1.23868 1.79147 1.79499C-0.561531 4.15799 -0.560531 7.85399 1.79347 10.207L9.12547 17.539C9.29547 17.838 9.62347 18.031 10.0005 18.031C10.1553 18.0295 10.3076 17.9917 10.4451 17.9207C10.5827 17.8496 10.7016 17.7473 10.7925 17.622L18.2075 10.207C20.5615 7.85299 20.5615 4.15799 18.2055 1.79099C17.6541 1.2357 16.9984 0.794884 16.276 0.49387C15.5537 0.192857 14.779 0.0375869 13.9965 0.0369873C12.5163 0.0372293 11.0902 0.59326 10.0005 1.59499ZM16.7915 3.20499C18.3545 4.77599 18.3555 7.22999 16.7935 8.79299L10.0005 15.586L3.20747 8.79299C1.64547 7.22999 1.64647 4.77599 3.20547 3.20899C3.96547 2.45299 4.95947 2.03699 6.00447 2.03699C7.04947 2.03699 8.03947 2.45299 8.79347 3.20699L9.29347 3.70699C9.38626 3.79993 9.49646 3.87367 9.61778 3.92398C9.73909 3.97429 9.86914 4.00019 10.0005 4.00019C10.1318 4.00019 10.2618 3.97429 10.3832 3.92398C10.5045 3.87367 10.6147 3.79993 10.7075 3.70699L11.2075 3.20699C12.7195 1.69799 15.2815 1.70199 16.7915 3.20499Z" fill="#23BE20"/>
          </svg>

        </div>
      </AddToWishlist>
      <AddToCompare :product="product">
        <div
          class="product__icon"
          :class="{'product__icon--active':isOnCompare } "
          :title="isOnCompare ? $t('Remove from compare') : $t('Add to compare')"
        >

          <svg v-if="!isOnCompare" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.9984 14.7007C22.0045 14.5941 21.9894 14.4846 21.9489 14.3783L19.0326 6.71673L14.0483 5.63723C13.8851 4.97321 13.4067 4.43215 12.7814 4.18184V2H11.2188V4.18188C10.8618 4.32481 10.5527 4.56231 10.3227 4.86364L5.05446 3.75407L2.05122 11.6439C2.01262 11.7453 1.99661 11.8498 2.00059 11.9518C2.00055 11.9548 2.00012 11.9578 2.00012 11.9609C2.00012 13.921 3.59474 15.5156 5.55478 15.5156C7.51486 15.5156 9.10947 13.921 9.10947 11.9609C9.10947 11.8502 9.08611 11.745 9.04455 11.6495C9.04385 11.6477 9.04346 11.6458 9.04275 11.6439L6.78615 5.71555L9.90369 6.37208C9.98994 7.15837 10.5101 7.8156 11.2188 8.09935V20.4374H7.23447V21.9999H16.7657V20.4374H12.7814V8.09935C13.2246 7.92192 13.5938 7.59848 13.8296 7.18856L17.3998 7.96181L14.9574 14.3783C14.9364 14.4335 14.9227 14.4895 14.9146 14.5456C14.8996 14.6062 14.8907 14.6691 14.8907 14.7343C14.8907 16.6944 16.4853 18.289 18.4453 18.289C20.4054 18.289 22 16.6944 22 14.7343C22 14.7229 21.9988 14.7119 21.9984 14.7007ZM5.55482 13.9531C4.73349 13.9531 4.02661 13.4534 3.7222 12.7421H7.38736C7.08298 13.4534 6.37611 13.9531 5.55482 13.9531ZM7.19416 11.1796H3.89985L5.547 6.85231L7.19416 11.1796ZM12.0001 6.68747C11.6985 6.68747 11.4532 6.44216 11.4532 6.14059C11.4532 5.83903 11.6985 5.59372 12.0001 5.59372C12.3017 5.59372 12.547 5.83903 12.547 6.14059C12.547 6.44216 12.3017 6.68747 12.0001 6.68747ZM18.4532 9.58665L20.1153 13.9531H16.7912L18.4532 9.58665ZM18.4454 16.7265C17.6241 16.7265 16.9172 16.2268 16.6128 15.5155H20.2779C19.9736 16.2268 19.2667 16.7265 18.4454 16.7265Z" fill="#828282"/>
          </svg>

          <!--          <svg v-if="!isOnCompare" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">-->
          <!--            <path d="M19.9984 12.7007C20.0045 12.5941 19.9894 12.4846 19.9489 12.3783L17.0326 4.71673L12.0483 3.63723C11.8851 2.97321 11.4067 2.43215 10.7814 2.18184V0H9.21885V2.18188C8.86182 2.32481 8.55268 2.56231 8.32272 2.86364L3.05446 1.75407L0.0512179 9.64388C0.0126241 9.74533 -0.00339158 9.84978 0.000592799 9.95177C0.000553736 9.95482 0.000124048 9.95779 0.000124048 9.96087C0.000124048 11.921 1.59474 13.5156 3.55478 13.5156C5.51486 13.5156 7.10947 11.921 7.10947 9.96091C7.10947 9.85017 7.08611 9.74498 7.04455 9.64951C7.04385 9.64767 7.04346 9.6458 7.04275 9.64392L4.78615 3.71555L7.90369 4.37208C7.98994 5.15837 8.51006 5.8156 9.21885 6.09935V18.4374H5.23447V19.9999H14.7657V18.4374H10.7814V6.09935C11.2246 5.92192 11.5938 5.59848 11.8296 5.18856L15.3998 5.96181L12.9574 12.3783C12.9364 12.4335 12.9227 12.4895 12.9146 12.5456C12.8996 12.6062 12.8907 12.6691 12.8907 12.7343C12.8907 14.6944 14.4853 16.289 16.4453 16.289C18.4054 16.289 20 14.6944 20 12.7343C20 12.7229 19.9988 12.7119 19.9984 12.7007ZM3.55482 11.9531C2.73349 11.9531 2.02661 11.4534 1.7222 10.7421H5.38736C5.08298 11.4534 4.37611 11.9531 3.55482 11.9531ZM5.19416 9.17962H1.89985L3.547 4.85231L5.19416 9.17962ZM10.0001 4.68747C9.69854 4.68747 9.45323 4.44216 9.45323 4.14059C9.45323 3.83903 9.69854 3.59372 10.0001 3.59372C10.3017 3.59372 10.547 3.83903 10.547 4.14059C10.547 4.44216 10.3017 4.68747 10.0001 4.68747ZM16.4532 7.58665L18.1153 11.9531H14.7912L16.4532 7.58665ZM16.4454 14.7265C15.6241 14.7265 14.9172 14.2268 14.6128 13.5155H18.2779C17.9736 14.2268 17.2667 14.7265 16.4454 14.7265Z" fill="#23BE20"/>-->
          <!--          </svg>-->

          <svg v-if="isOnCompare" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0332 3.5794C11.857 2.94186 11.3884 2.42484 10.7814 2.18184V0H9.21885V2.18188C8.86182 2.32481 8.55268 2.56231 8.32272 2.86364L3.05446 1.75407L0.0512179 9.64388C0.0126241 9.74533 -0.00339158 9.84978 0.000592799 9.95177C0.00057425 9.95322 0.000467618 9.95465 0.000360739 9.95608C0.000242544 9.95767 0.000124048 9.95925 0.000124048 9.96087C0.000124048 11.921 1.59474 13.5156 3.55478 13.5156C5.51486 13.5156 7.10947 11.921 7.10947 9.96091C7.10947 9.85017 7.08611 9.74498 7.04455 9.64951L7.04275 9.64392L4.78615 3.71555L7.90369 4.37208C7.98994 5.15837 8.51006 5.8156 9.21885 6.09935V18.4374H5.23447V19.9999H14.7657V18.4374H10.7814V6.09935C11.2246 5.92192 11.5938 5.59848 11.8296 5.18856L12.5869 5.35259C12.2987 4.81297 12.1065 4.21429 12.0332 3.5794ZM17 8C17.4226 8 17.8329 7.94758 18.2249 7.84888L19.9489 12.3783C19.9894 12.4845 20.0045 12.5941 19.9984 12.7007C19.9985 12.7049 19.9988 12.709 19.9991 12.7131C19.9996 12.7202 20 12.7272 20 12.7343C20 14.6944 18.4054 16.289 16.4453 16.289C14.4853 16.289 12.8907 14.6944 12.8907 12.7343C12.8907 12.6691 12.8996 12.6062 12.9146 12.5456C12.9227 12.4895 12.9364 12.4335 12.9574 12.3783L14.8149 7.49852C15.2789 7.72431 15.783 7.88043 16.3137 7.95328L14.7912 11.9531H18.1153L16.6047 7.9846C16.7351 7.9948 16.867 8 17 8ZM1.89985 9.17962H5.19416L3.547 4.85231L1.89985 9.17962ZM9.45323 4.14059C9.45323 4.44215 9.69854 4.68747 10.0001 4.68747C10.3017 4.68747 10.547 4.44215 10.547 4.14059C10.547 3.83903 10.3017 3.59372 10.0001 3.59372C9.69854 3.59372 9.45323 3.83903 9.45323 4.14059Z" fill="#23BE20"/>
            <path d="M16.25 6.16L13.5 3.16L14.66 2L16.25 3.59L19.84 0L21 1.41L16.25 6.16Z" fill="#23BE20"/>
          </svg>

        </div>
      </AddToCompare>
    </div>

    <router-link
      class="flex flex-column no-underline product-link"
      :to="productLink"
      data-testid="productLink"
    >

      <!--      <div class="product-tag-wrapper">-->
      <!--        <tag text="0.01%" color-type="warning">-->
      <!--          <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--            <path d="M3.06369 11.9368L7.69231 3.96706C7.7971 3.78662 7.64848 3.56457 7.44172 3.5927L4.36287 4.01117L5.09851 0.149093C5.1233 0.0188981 4.95544 -0.0557035 4.87543 0.0499293L0.324475 6.0572C0.191912 6.23216 0.332279 6.48095 0.550576 6.45798L3.94498 6.10067L2.83219 11.8501C2.80536 11.9888 2.99274 12.059 3.06369 11.9368Z" fill="#FFCA41"/>-->
      <!--          </svg>-->
      <!--        </tag>-->
      <!--      </div>-->

      <div
        class="product-cover bg-cl-secondary"
        :class="[{ sale: labelsActive && isOnSale }, { new: labelsActive && isNew }]"
      >
        <product-image
          class="product-cover__thumb"
          :image="thumbnailObj"
          :alt="product.name | htmlDecode"
          :calc-ratio="false"
          data-testid="productImage"
        />
      </div>

<!--      <div class="product-tag-bottom">-->
<!--        <tag :text="$t('Discount on accessories')" color-type="danger">-->
<!--          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--            <path d="M10.7342 4.16719L9.77793 2.73281C9.69356 2.60625 9.53186 2.54295 9.38418 2.59219C9.2365 2.63437 9.13106 2.775 9.13106 2.92971C9.13106 3.61875 9.02556 4.30781 8.82871 4.97578C8.65996 4.49062 8.33652 4.06172 7.89353 3.77341C7.11306 3.2531 6.90215 2.23591 7.42246 1.45547L8.03418 0.541406C8.10447 0.435914 8.11152 0.295289 8.04822 0.182813C7.99199 0.0702891 7.87244 0 7.73884 0C7.12017 0 6.53655 0.119508 5.99514 0.337477C4.34282 0.998414 3.14749 2.52891 3.03501 4.39216C2.92249 4.08982 2.85923 3.76638 2.85923 3.43591V2.05781C2.85923 1.90315 2.75374 1.76252 2.60608 1.72034C2.45845 1.67112 2.29671 1.73442 2.21233 1.86096L1.74126 2.57112C0.869385 3.87893 0.412354 5.39766 0.412354 6.96565C0.412307 9.74294 2.66936 12 5.4467 12H6.54358C9.32088 12 11.5873 9.74294 11.5873 6.96565C11.5873 5.96716 11.2897 4.99685 10.7342 4.16719Z" fill="#FF5B66"/>-->
<!--          </svg>-->
<!--        </tag>-->
<!--      </div>-->

      <span v-if="product.original_price_incl_tax && product.original_special_price" class="lh30 cl-secondary price-sale mobile">
          -{{ (product.original_price_incl_tax - product.original_special_price) | price(storeView) }}
      </span>

      <p class="mb0 cl-accent name mt10" v-if="!onlyImage">
        {{ product.name | htmlDecode }}
      </p>

      <div class="flex center-xs start-md mt-auto product-price-block">

        <span
          class="lh30 cl-secondary price-original"
          v-if="product.special_price && parseFloat(product.original_price_incl_tax) > 0 && !onlyImage"
        >
<!--        <span class="lh30 cl-secondary price-original">-->
          {{ product.original_price_incl_tax | price(storeView) }}
        </span>

        <span
          class="lh30 cl-secondary price-special"
          v-if="!product.special_price && parseFloat(product.price_incl_tax) > 0 && !onlyImage"
        >
          {{ product.price_incl_tax | price(storeView) }}
        </span>

        <!--        <span class="lh30 cl-secondary price-discount">-->
        <!--          -30%-->
        <!--        </span>-->

      </div>

      <!--      <div-->
      <!--        class="flex center-xs start-md mt-auto product-price-block"-->
      <!--        v-if="product.original_price_incl_tax && product.original_special_price"-->
      <!--      >-->
      <!--        <span class="lh30 cl-secondary price-sale">-->
      <!--          {{ (product.original_price_incl_tax - product.original_special_price) | price(storeView) }}-->
      <!--        </span>-->
      <!--        <span class="lh30 cl-secondary price-by-promo-code">-->
      <!--          {{ $t('price by promotional code') }}-->
      <!--        </span>-->
      <!--      </div>-->

      <!--      <div class="flex center-xs start-md mt-auto product-price-block">-->
      <!--        -->
      <!--        <span-->
      <!--            class="price-original mr5 lh30 cl-secondary"-->
      <!--            v-if="product.special_price && parseFloat(product.original_price_incl_tax) > 0 && !onlyImage"-->
      <!--        >{{ product.original_price_incl_tax | price(storeView) }}</span>-->

      <!--        <span-->
      <!--            class="price-special lh30 cl-accent weight-700"-->
      <!--            v-if="product.special_price && parseFloat(product.special_price) > 0 && !onlyImage"-->
      <!--        >{{ product.price_incl_tax | price(storeView) }}</span>-->

      <!--        <span-->
      <!--            class="lh30 cl-secondary price-special"-->
      <!--            v-if="!product.special_price && parseFloat(product.price_incl_tax) > 0 && !onlyImage"-->
      <!--        >{{ product.price_incl_tax | price(storeView) }}</span>-->

      <!--        <span v-if="product.original_price_incl_tax && product.original_special_price" class="lh30 cl-secondary price-sale">-->
      <!--          -{{ (product.original_price_incl_tax - product.original_special_price) | price(storeView) }}-->
      <!--        </span>-->

      <!--      </div>-->

    </router-link>

    <span
      class="product-is-not-available"
      v-if="!((product && product.stock && product.stock.is_in_stock) && (product && (product.price_incl_tax || product.original_price_incl_tax)))"
    >
      {{ $t('Not available') }}
    </span>

    <div
      class="d-flex btw w-100 product-card-bottom-options"
      v-if="(product && product.stock && product.stock.is_in_stock) && (product && (product.price_incl_tax || product.original_price_incl_tax))"
    >
      <!--<add-to-cart-->
      <!--:product="product"-->
      <!--:disabled="!(product && product.stock && product.stock.is_in_stock)"-->
      <!--class="col-xs-12 col-sm-4 col-md-6 add-to-cart"-->
      <!--/>-->

      <!--      <span class="product-on-credit">{{ $t('In credit') }}</span>-->

      <button-full @click.native="toProduct()" :disabled="!(product && product.stock && product.stock.is_in_stock)" data-testid="addToCart" class="add-to-cart">
        <span class="add-to-cart-text">{{ $t('Buy') }}</span>
      </button-full>
    </div>
    <div class="flex between-md mt15" v-if="isShowCompareAndFavorite">
      <AddToCompare :product="product" />
      <AddToWishlist :product="product" />
    </div>
  </div>
</template>

<script>
  import rootStore from '@vue-storefront/core/store'
  import { ProductTile } from '@vue-storefront/core/modules/catalog/components/ProductTile.ts'
  import config from 'config'
  import ProductImage from './ProductImage'
  import AddToWishlist from 'theme/components/core/blocks/Wishlist/AddToWishlist'
  import AddToCart from 'theme/components/core/AddToCart.vue'
  import AddToCompare from 'theme/components/core/blocks/Compare/AddToCompare'
  import { IsOnWishlist } from '@vue-storefront/core/modules/wishlist/components/IsOnWishlist'
  import { IsOnCompare } from '@vue-storefront/core/modules/compare/components/IsOnCompare'
  import { currentStoreView } from '@vue-storefront/core/lib/multistore'
  import ButtonFull from 'theme/components/theme/ButtonFull.vue'
  import Tag from "theme/components/core/Tag";

  export default {
    mixins: [ProductTile, IsOnWishlist, IsOnCompare],
    components: {
      ButtonFull,
      ProductImage,
      AddToWishlist,
      AddToCompare,
      AddToCart,
      Tag
    },
    props: {
      isShowCompareAndFavorite: {
        type: Boolean,
        required: false,
        default: false
      },
      labelsActive: {
        type: Boolean,
        default: true
      },
      onlyImage: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      qwe() {
        return this.IsOnWishlist
      },
      thumbnailObj () {
        return {
          src: this.thumbnail,
          loading: this.thumbnail
        }
      },
      favoriteIcon () {
        return this.isOnWishlist ? 'favorite' : 'favorite_border'
      },
      storeView () {
        return currentStoreView()
      }
    },
    methods: {
      toProduct () {
        this.$router.push(this.productLink)
      },
      onProductPriceUpdate (product) {
        if (product.sku === this.product.sku) {
          Object.assign(this.product, product)
        }
      },
      productPercent () {
        let a = this.product.original_price_incl_tax / 100
        let b = this.product.original_special_price / a
        return 100 - b
      },
      visibilityChanged (isVisible, entry) {
        if (
          isVisible &&
          config.products.configurableChildrenStockPrefetchDynamic &&
          config.products.filterUnavailableVariants &&
          this.product.type_id === 'configurable' &&
          this.product.configurable_children &&
          this.product.configurable_children.length > 0
        ) {
          const skus = [this.product.sku]
          for (const confChild of this.product.configurable_children) {
            const cachedItem = rootStore.state.stock.cache[confChild.id]
            if (typeof cachedItem === 'undefined' || cachedItem === null) {
              skus.push(confChild.sku)
            }
          }
          if (skus.length > 0) {
            rootStore.dispatch('stock/list', { skus: skus }) // store it in the cache
          }
        }
      },
    },
    beforeMount () {
      this.$bus.$on('product-after-priceupdate', this.onProductPriceUpdate)
    },
    beforeDestroy () {
      this.$bus.$off('product-after-priceupdate', this.onProductPriceUpdate)
    }
  }
</script>

<style lang="scss">
  .product {
    .add-to-cart {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    @media (max-width: 767px) {
      .add-to-cart {
        padding: 8px 0 !important;
      }
      .add-to-cart-text {
        display: none !important;
      }
      .add-to-cart-ico {
        margin: 0 !important;
      }
    }
  }
</style>

<style lang="scss" scoped>
  @import '~theme/css/animations/transitions';
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';

  $bg-secondary: color(secondary, $colors-background);
  $border-secondary: color(secondary, $colors-border);
  $color-white: color(white);

  .product {
    position: relative;
    border: 1px solid #E0E0E0;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 16px;

    &-tag {
      &-bottom {
        z-index: 3;
        margin-top: 3px;
      }
      &-wrapper {
        position: absolute;
        z-index: 3;
        display: flex;
      }
    }

    &.d-flex-column {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .flex-column {
      flex-direction: column;
    }

    .product-link {
      align-items: flex-start;
      .mt-auto {
        margin-top: auto;
      }
    }

    .name {
      /*margin: 12px 0 16px;*/
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 400;
      font-size: 15px;
      line-height: 24px;
      color: #1A1919;
      @media (max-width: 991px) {
        margin-bottom: 10px;
      }
    }
    @media (max-width: 767px) {
      padding-bottom: 10px;
    }
    &__icons {
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      flex-direction: column;
      padding-right: 20px;
      padding-top: 10px;
    }
    &__icon {
      padding-top: 10px;
      opacity: 0;
      z-index: 2;
      transition: 0.3s opacity $motion-main;
      @media (max-width: 767px) {
        opacity: 1;
      }
      &--active {
        opacity: 1;
      }
    }
    &:hover {
      .product__icon {
        opacity: 1;
      }
    }
    .btw {
      justify-content: space-between;
      text-align: right;
      margin-top: 20px;
    }
    .add-to-cart {
      padding: 8px 10px;
      border-radius: 4px;
      width: 50%;
      display: inline-flex;
      margin-top: auto;
      margin-left: auto;
      min-width: auto;
      font-weight: bold;
    }

    .product-price-block {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;

      @media (max-width: 767px) {
        .price-sale {
          margin-left: 0;
          margin-top: 5px;
        }
      }
    }

    &-is-not-available {
      width: 100%;
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 16px;
      color: #000000;
      cursor: pointer;
      padding: 24px 0;
      text-align: center;
    }

    &-on-credit {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 15px;
      display: flex;
      align-items: center;
      color: #1A1919;
      border-bottom: 1px dashed #1A1919;
      box-sizing: border-box;
      padding-bottom: 3px;
      cursor: pointer;
    }

    .add-to-cart {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 600;
      font-size: 15px;
      line-height: 16px;
      display: flex;
      align-items: center;
      color: #FFFFFF;
      flex: none;
      order: 0;
      align-self: center;
      margin: 10px 0;
      &-text {
        display: block !important;
      }
    }

    &-card-bottom-options {
      justify-content: space-between;
      text-align: right;
      margin-top: 20px;
      display: flex;
      align-items: center;
    }
  }

  .price {
    &-discount {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 400;
      font-size: 11px;
      line-height: 16px;
      text-transform: uppercase;
      color: #FFFFFF;
      background: #EE2C39;
      border-radius: 30px;
      padding: 0 3px;
      @media (max-width: 991px) {
        margin-left: -10px;
        margin-top: -22px;
      }
    }
    &-original {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 16px;
      text-decoration-line: line-through;
      color: #5F5E5E;
      margin-right: 4px;
    }
    &-special {
      font-weight: 600;
      font-family: DIN Pro;
      font-style: normal;
      font-size: 22px;
      line-height: 30px;
      color: #1A1919;
      margin-right: 4px;
    }
    &-sale {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 400;
      font-size: 12px;
      line-height: 16px;
      display: flex;
      align-items: center;
      color: #EE2C39;
      margin-right: 4px;
      /*@media (max-width: 787px) {*/
      /*  display: none;*/
      /*}*/

      /*&.mobile {*/
      /*  display: none;*/
      /*  @media (max-width: 787px) {*/
      /*    width: auto;*/
      /*    margin: 10px 0 0;*/
      /*    display: flex;*/
      /*  }*/
      /*}*/
    }
    &-by-promo-code {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 13px;
      display: flex;
      align-items: center;
      color: #1A1919;
      border-bottom: 1px dashed #1A1919;
      box-sizing: border-box;
      padding-bottom: 3px;
      margin-bottom: -8px;
    }
  }

  %label {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: $border-secondary;
    text-transform: uppercase;
    color: $color-white;
    font-size: 12px;
  }

  .product-cover {
    overflow: hidden;
    width: 100%;

    &__thumb {
      padding: 0;
      opacity: 0.8;
      will-change: opacity, transform;
      transition: 0.3s opacity $motion-main, 0.3s transform $motion-main;

      display: flex;
      justify-content: center;
      align-items: center;
    }

    @media screen and (min-width: 768px) {
      &:hover {
        .product-cover__thumb {
          opacity: 1;
          transform: scale(1.1);
        }
        &.sale::after,
        &.new::after {
          opacity: 0.8;
        }
      }
    }

    &.sale {
      &::after {
        @extend %label;
        content: 'Sale';
      }
    }
    &.new {
      &::after {
        @extend %label;
        content: 'New';
      }
    }
  }
</style>
