<template>
  <div class="product-wrap">
    <div class="product">
      <router-link :to="productLink" class="product-image">
        <img :src="image.src" alt="product" />
      </router-link>
      <div class="flex">
        <router-link :to="productLink" class="product-info-top">
          <span class="product-name">{{ product.name }}</span>
        </router-link>
        <div class="product-info-bottom">
          <product-info :calculateWithPromo="false" :product="product" :nameVisibility="false"/>
          <!--        <product-cart-price :calculateWithPromo="false" :product="product" :nameVisibility="false"/>-->
        </div>
      </div>
    </div>
    <div>
      <strong>{{productStatus}}</strong>

    </div>
    <microcart-product-bundle-options v-if="product.bundle_options" :product="product" class="product-bundle-options" />
  </div>
</template>

<script>
import MicrocartProductBundleOptions from 'theme/components/core/blocks/Microcart/MicrocartProductBundleOptions.vue';
import { onlineHelper } from '@vue-storefront/core/helpers';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { Product } from '@vue-storefront/core/modules/checkout/components/Product';
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers';
import ProductInfo from './ProductInfo';

export default {
  mixins: [Product],
  props: {
    source: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    ProductInfo,
    MicrocartProductBundleOptions
  },
  computed: {
    alerts () {
      if (this.productStatus === 'partial_available') {
        return
      }
    },
    currentShop () {
      if (this.source && this.source.msi_source) {
        return this.source.msi_source
      } return null
    },
    productStatus () {
      if (!!this.currentShop && this.product.qty <= this.currentShop.salable_quantity) {
        return 'available'
      } else if (!!this.currentShop && this.product.qty > this.currentShop.salable_quantity) {
        return 'partial_available'
      } else {
        return 'not_available'
      }
    },
    image () {
      return {
        loading: this.thumbnail,
        src: this.thumbnail
      };
    },
    isOnline (value) {
      return onlineHelper.isOnline
    },
    storeView () {
      return currentStoreView();
    },
    productLink () {
      return formatProductLink(this.product, currentStoreView().storeCode)
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.product-wrap {
  margin-bottom: 16px;
  border: 1px solid #E0E0E0;
}

.product {
  padding: 15px 12px 15px 15px;
  display: grid;
  grid-row-gap: 8px;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    "image top-info actions"
    "image bottom-info actions";
  align-items: flex-start;
}

.more {
  display: none;
}

.product-right {
  margin-left: auto;
  max-width: 205px;
  width: 100%;
}

.price-sale {
  margin-top: 4px;
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 700;
  font-size: 11px;
  line-height: 16px;
  text-transform: uppercase;
  color: #FFFFFF;
  background: #EE2C39;
  border-radius: 30px;
  padding: 1px 7px;
  margin-left: 10px;
}

.product-remove {
  margin-right: 12px;
  cursor: pointer;

  svg {
    width: 14px;
    height: 18px;
  }
}

.product-image {
  grid-area: image;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 88px;
  height: 88px;
  font-family: DIN Pro;
  font-style: normal;
  margin-right: 16px;

  img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }
}

.product-price {
  width: 100%;
  font-family: DIN Pro;
  font-style: normal;
  font-size: 18px;
  line-height: 24px;
  font-weight: 600;
  color: #1A1919;
}

.product-qty {
  margin-right: 8px;
}

img {
  width: 100%;
}

.original-price {
  &.disabled {
    text-decoration: line-through;
    color: #595858;
  }
}

.price-special {
  color: #1A1919;
}

.product-name {
  display: block;
  font-family: DIN Pro;
  font-size: 15px;
  line-height: 18px;
  color: #1A1919;

  @media only screen and (max-width: 520px) {
    font-size: 13px;
    line-height: 15px;
  }
}

.product-data {
  display: flex;
  margin-left: 18px;
  flex: 1;
}
.product-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: stretch;
}

.product-info-top {
  align-items: flex-start;
  grid-area: top-info;
  padding-right: 20px;
  margin-bottom: 5px;
}

.product-info-bottom {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  grid-area: bottom-info;
}

.more-item {
  display: flex;
  align-items: center;
  padding: 4px 16px;

  svg {
    padding: 4px;
    box-sizing: content-box;
    margin-right: 20px;
  }

  span {
    font-family: DIN Pro;
    font-style: normal;
    font-size: 14px;
    line-height: 24px;
    color: #595858;
  }
}

.actions {
  grid-area: actions;
  display: flex;
  align-items: center;
  align-self: flex-start;
  align-self: flex-start;
}

.product-icon {
  margin-right: 6px;

  &:last-child {
    margin-right: 0;
  }
}

.remove {
  display: flex;
  cursor: pointer;

  svg {
    padding: 4px;
    box-sizing: content-box;
  }

  &:hover {
    background-color: #F9F9F9;
  }
}

.product-bundle-options ::v-deep {
  .bundle-option {
    .options {
      .option {
        padding-bottom: 15px;
      }
    }

    &:last-child {
      .options {
        padding: 16px;

        .option {
          border-bottom: none;
          padding-bottom: 0;
        }
      }
    }

  }
}

@media (max-width: 768px) {
  .product {
    grid-template-areas:
      "image top-info actions"
      "bottom-info bottom-info bottom-info";
  }

  .product-info-bottom {
    justify-content: space-between;
    align-items: flex-end;
  }

  .product-info-top {
    padding-right: 12px;
  }

  .actions {
    display: none;
  }

  .more {
    display: block;
  }

  .product-image {
    width: 56px;
    height: 56px;
  }
}

</style>
