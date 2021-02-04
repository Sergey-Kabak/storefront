<template>
  <div class="product">
    <div class="product-body" v-if="!product.count">
      <div class="product-cover">
        <router-link :to="localizedRoute(product.url)" class="product-link" >
          <product-image class="product-image" :image="productImage" />
        </router-link>
      </div>
      <div class="product-name">{{ product.name }}</div>
      <div class="product-actions">
        <router-link :to="localizedRoute(product.url)" class="product-link">
          <button-full class="product-button buy">{{ $t('Buy') }}</button-full>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ProductImage from 'theme/components/core/ProductImage'
import ButtonFull from 'theme/components/theme/ButtonFull'
import {
  getThumbnailPath,
  productThumbnailPath,
  processURLAddress
} from '@vue-storefront/core/helpers';
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { formatProductLink, formatProductLinkNoSku } from '@vue-storefront/core/modules/url/helpers'
import { getThumbnailForProduct } from '@vue-storefront/core/modules/cart/helpers'
import ProductCartPrice from 'theme/components/core/blocks/Product/ProductCartPrice'

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  components: {
    ProductImage,
    ButtonFull,
    ProductCartPrice
  },
  computed: {
    productImage() {
      return {
        src: this.getThumbnail(this.product.thumbnail, 152, 152, 'brand'),
        alt: this.thumbnail
      }
    }
  },
  methods: {
    formatLink(product) {
      if (product.url_path) {
        return formatProductLinkNoSku(product, currentStoreView().storeCode)
      }
      return {}
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.product-image {
  display: flex;
  margin: auto;
}

.product {
  position: relative;
  width: 100%;
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
}

.product-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
}

.product-name {
  font-family: DIN Pro;
  text-align: center;
  padding: 0 16px;
  font-weight: 600;
  font-size: 15px;
  line-height: 24px;
  color: #1A1919;
  padding: 0 16px;
  margin-bottom: 20px;
  transition: 0.3s ease-in-out;
}

.product-actions {
  margin-top: auto;
  padding: 0 16px;
  width: 100%;
  padding: 0 16px 16px;
}

.product-link {
  display: block;
}

.product-button {
  max-width: 100%!important;
  height: 32px!important;
}

.product-cover {
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  will-change: opacity, transform;
  transition: 0.3s ease-in-out;
  margin: 26px 0;

  &:hover {
    transform: scale(1.1);
  }
}

::v-deep {
  .product-image__thumb,
  .product-image__placeholder {
    display: block;
    margin: auto;
    max-height: 150px!important;
  }
}
</style>
