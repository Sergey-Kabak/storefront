<template>
  <div class="product-wrap">
    <div class="product">
      <router-link :to="productLink" class="product-image">
        <img :src="image.src" alt="product" />
      </router-link>
      <div class="flex flex-column">
        <div class="flex">
          <router-link :to="productLink" class="product-info-top">
            <span class="product-name">{{ product.name }}</span>
            <div class="product-status" :class="productStatus.status.replace(/\s+/g, '')">
              <i v-html="productStatus.icon"></i>
              <div>
                <span>{{ $t(productStatus.statusText) }}</span>
                <span>{{productStatus.subInfo}}</span>
              </div>
            </div>
          </router-link>
          <div class="product-info-bottom">
            <product-info :calculateWithPromo="false" :product="product" :nameVisibility="false"/>
          </div>
        </div>
        <div class="product-notification" v-if="alerts">
          {{alerts}}
        </div>
      </div>
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
      if (this.productStatus.status === 'InStock') {
        return ''
      }
      return this.$t('Remaining item will arrive in 3 days')
    },
    currentShop () {
      if (this.source && this.source.msi_source) {
        return this.source.msi_source
      } return null
    },
    productStatus () {
      if (!!this.currentShop && this.product.qty <= this.currentShop.salable_quantity) {
        return {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M11.672 4.464L6.4 9.736L3.528 6.872L2.4 8L6.4 12L12.8 5.6L11.672 4.464ZM8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM8 14.4C4.464 14.4 1.6 11.536 1.6 8C1.6 4.464 4.464 1.6 8 1.6C11.536 1.6 14.4 4.464 14.4 8C14.4 11.536 11.536 14.4 8 14.4Z" fill="#23BE20"/>
</svg>`,
          status: 'InStock',
          statusText: 'InStock',
          subInfo: ''
        }
      } else if (!!this.currentShop && this.product.qty > this.currentShop.salable_quantity && this.currentShop.salable_quantity > 0) {
        return {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M11.392 4.608C10.456 3.672 9.232 3.2 8 3.2V8L4.608 11.392C6.48 13.264 9.52 13.264 11.4 11.392C13.272 9.52 13.272 6.48 11.392 4.608ZM8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM8 14.4C4.464 14.4 1.6 11.536 1.6 8C1.6 4.464 4.464 1.6 8 1.6C11.536 1.6 14.4 4.464 14.4 8C14.4 11.536 11.536 14.4 8 14.4Z" fill="#F2994A"/>
</svg>`,
          status: 'partial availability',
          statusText: 'InStock',
          subInfo: ` (${this.source.msi_source.salable_quantity} ${this.$t('items from')} ${this.source.qty})`
        }
      } else {
        return {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M10.072 4.8L8 6.872L5.928 4.8L4.8 5.928L6.872 8L4.8 10.072L5.928 11.2L8 9.128L10.072 11.2L11.2 10.072L9.128 8L11.2 5.928L10.072 4.8ZM8 0C3.576 0 0 3.576 0 8C0 12.424 3.576 16 8 16C12.424 16 16 12.424 16 8C16 3.576 12.424 0 8 0ZM8 14.4C4.472 14.4 1.6 11.528 1.6 8C1.6 4.472 4.472 1.6 8 1.6C11.528 1.6 14.4 4.472 14.4 8C14.4 11.528 11.528 14.4 8 14.4Z" fill="#EE2C39"/>
</svg>`,
          status: 'Not available',
          statusText: 'Not available',
          subInfo: ''
        }
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
  },
  mounted() {
    console.log(this.source);
  }
};
</script>

<style lang="scss" scoped>
.flex-column{
  flex-direction: column;
}
.product-notification{
  margin-top: 10px;
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 0;
  font-size: 13px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: #1A1919;
}
.product-status{
  &.InStock{
    span{
      color: #23BE20;
    }
  }
  &.partialavailability{
    span{
      color: #F2994A;
    }
  }
  &.Notavailable{
    span{
      color: #EE2C39;
    }
  }
  display: flex;
  align-items: flex-start;
  i{
    margin-right: 8px;
    position: relative;
    top: 2px;
  }
  div{
    white-space: nowrap;
    position: relative;
    span{
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
    }
    span:first-child{
      white-space: nowrap;
    }
  }
}
.product-wrap {
  border: 1px solid #E0E0E0;
}

.product {
  padding: 15px 12px 15px 15px;
  display: grid;
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
  margin-bottom: 9px;
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
  margin-right: 32px;
  max-width: 161px;
  width: 100%;
  margin-bottom: 5px;
}

.product-info-bottom {
  flex: 1;
  display: flex;
  align-items: flex-start;
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
