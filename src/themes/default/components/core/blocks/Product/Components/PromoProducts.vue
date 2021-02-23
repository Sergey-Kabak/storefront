<template>
  <router-link :to="productLink" class="promo-product flex">
    <div class="promo-product-img">
      <product-image
        class="product-cover__thumb"
        :image="thumbnailObj"
        :alt="product.name | htmlDecode"
        :calc-ratio="false"
        data-testid="productImage"
      />
    </div>
    <div>
      <div class="text">
        {{product.name}}
      </div>
      <div>
        <small class="price-origin">{{product.final_price | price}}</small>
        <strong class="price-final">{{options.price | price}}</strong>
      </div>
    </div>
  </router-link>
</template>

<script>
import ProductImage from '../../../ProductImage';
import { productThumbnailPath } from '@vue-storefront/core/helpers'
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers';
import config from 'config'

export default {
  components: {
    ProductImage
  },
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  computed: {
    product () {
      return this.options.product
    },
    productLink () {
      return formatProductLink(this.product, currentStoreView().storeCode)
    },
    thumbnail () {
      // todo: play with the image based on category page filters - eg. when 'red' color is chosen, the image is going to be 'red'
      let thumbnail = productThumbnailPath(this.product)
      return this.getThumbnail(thumbnail, config.products.thumbnails.width, config.products.thumbnails.height)
    },
    thumbnailObj () {
      return {
        src: this.thumbnail,
        loading: this.placeholder,
        error: this.placeholder
      }
    },
    storeView () {
      return currentStoreView()
    }
  }
}
</script>

<style lang="scss" scoped>
.promo{
  &-product{
    padding: 16px;
  }
  &-product-img{
    max-width: 48px;
    margin-right: 16px;
  }
}
.text{
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 0;
  font-size: 13px;
  line-height: 16px;
  color: #1A1919;
  display: block;
  margin-bottom: 12px;
}
.price{
  &-origin{
    text-decoration: line-through;
    color: #5F5E5E;
    font-size: 11px;
    line-height: 11px;
    font-family: DIN Pro;
  }
  &-final{
    font-family: DIN Pro;
    font-size: 15px;
    line-height: 16px;
    color: #1A1919;
  }
}
</style>
