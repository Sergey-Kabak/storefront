<template>
  <div class="options">
    <div class="option" v-for="option in option.product_links" :key="option.id">
      <div class="option-type" v-if="!index">
        <span class="option-type-text">{{ $t('Gift') }}</span>
        <img src="/assets/custom/Gift.svg" alt="gift">
      </div>
      <div class="product-option">
        <router-link :to="productLink(option)" class="product-option-image">
          <img :src="getThumbnail(option.product.image, 56, 56)" alt="option-image">
        </router-link>
        <div class="product-option-info">
          <router-link :to="productLink(option)" class="product-option-name">{{ option.product.name }}</router-link>
          <div class="prices">
            <span class="old-price">{{ option.product.price | price(storeView) }}</span>
            <span class="price">{{ option.price | price(storeView) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers'

export default {
  props: {
    option: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    storeView () {
      return currentStoreView()
    }
  },
  methods: {
    productLink (option) {
      return formatProductLink(option.product, currentStoreView().storeCode)
    }
  }
};
</script>

<style lang="scss" scoped>
.options {
  padding: 15px 15px 0 15px;
  background: #F9F9F8;
}

.option {
  border-bottom: 1px solid #E0E0E0;
}

.product-option {
  display: flex;
  align-items: flex-start;
}

.product-option-image {
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  min-width: 56px;
  min-height: 56px;
  max-width: 56px;
  max-height: 56px;
  width: 100%;
  margin-right: 12px;
}

.option-type {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.option-type-text {
  margin-right: 7px;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: #1A1919;
}

.product-option-name {
  display: block;
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #1A1919;
  margin-bottom: 8px;
}

.prices {
  display: flex;
  align-items: baseline;

  .old-price {
    font-family: DIN Pro;
    font-size: 11px;
    line-height: 11px;
    color: #5F5E5E;
    margin-right: 5px;
    text-decoration: line-through;
  }

  .price {
    font-family: DIN Pro;
    font-weight: 600;
    font-size: 15px;
    line-height: 16px;
    color: #1A1919;
  }
}
</style>