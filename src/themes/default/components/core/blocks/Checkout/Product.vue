<template>
  <div class="product">
    <div class="remove-button-container">
      <remove-button class="mx5 product-item-btns checkout-remove-button" @click="removeItem" />
    </div>
    <div class="blend">
      <product-image className="product-image" :image="image" />
    </div>
    <div class="product-data">
      <div class="product-info">
        <div class="product-name">
          {{ product.name | htmlDecode }}
        </div>
<!--        <div class="error mb6" v-if="product.errors && Object.keys(product.errors).length > 0">-->
<!--          {{ product.errors | formatProductMessages }}-->
<!--        </div>-->
<!--        <div class="h5 cl-tertiary product-name">-->
<!--          {{ product.sku }}-->
<!--        </div>-->
<!--        <div class="h6 cl-bg-tertiary options mb6" v-if="product.totals && product.totals.options">-->
<!--          <div v-for="opt in product.totals.options" :key="opt.label">-->
<!--            <span class="opn">{{ opt.label }}: </span>-->
<!--            <span class="opv" v-html="opt.value" />-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="h6 cl-bg-tertiary options mb6" v-else-if="product.options">-->
<!--          <div v-for="opt in product.options" :key="opt.label">-->
<!--            <span class="opn">{{ opt.label }}: </span>-->
<!--            <span class="opv" v-html="opt.value" />-->
<!--          </div>-->
<!--        </div>-->

        <div class="product-price">
          {{ product.price }} ₴
        </div>
      </div>

      <div class="checkout-product-quantity">
        <product-quantity
          class="h5 cl-accent lh25"
          :value="product.qty"
          :max-quantity="maxQuantity"
          :loading="quantityIsLoading"
          :is-simple-or-configurable="true"
          @input="updateQuantity"
          @error="handleQuantityError"
        />
      </div>

      <div class="product-price-container">
        <div v-if="isOnline && product.totals">
          <span class="h4 cl-error total-price" v-if="product.totals.discount_amount">{{ product.totals.row_total - product.totals.discount_amount + product.totals.tax_amount }} ₴</span>
          <span class="price-original h5 total-price" v-if="product.totals.discount_amount">{{ product.totals.row_total_incl_tax }} ₴</span>
          <span v-if="!product.totals.discount_amount" class="h4 total-price">{{ product.totals.row_total_incl_tax }} ₴</span>
        </div>
        <div v-else>
          <span class="h4 cl-error total-price" v-if="product.special_price">{{ product.price_incl_tax * product.qty }} ₴</span>
          <span class="price-original h5 total-price" v-if="product.special_price">{{ product.original_price_incl_tax * product.qty }} ₴</span>
          <span v-if="!product.special_price" class="h4 total-price">{{ product.price_incl_tax * product.qty }} ₴</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Product } from '@vue-storefront/core/modules/checkout/components/Product';
import { onlineHelper } from '@vue-storefront/core/helpers';
import ProductImage from 'theme/components/core/ProductImage';
import ProductQuantity from 'theme/components/core/ProductQuantityNew';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import ProductMixin from '@vue-storefront/core/compatibility/components/blocks/Microcart/Product';
import RemoveButton from '../Microcart/RemoveButton';

export default {
  computed: {
    storeView () {
      return currentStoreView()
    },
    isOnline () {
      return onlineHelper.isOnline
    },
    image () {
      return {
        loading: this.thumbnail,
        src: this.thumbnail
      }
    }
  },
  data () {
    return {
      maxQuantity: this.product.qty,
      quantityIsLoading: true,
    }
  },
  methods: {
    updateQuantity (quantity) {
      this.quantityIsLoading = true;
      this.$store.dispatch('cart/updateQuantity', { product: this.product, qty: quantity })
        .finally(() => {
          this.quantityIsLoading = false;
        });
    },
    handleQuantityError (error) {
      console.log("Quantity error", error);
    },
    removeFromCart () {
      setTimeout(() => {
        this.$store.dispatch('cart/removeItem', { product: this.product });
      }, 250);
    },
  },
  async mounted () {
    const maxQuantity = await this.$store.dispatch('stock/check', {
      product: this.product,
      qty: this.product.qty
    })
    this.maxQuantity = maxQuantity.qty;
    this.quantityIsLoading = false;
  },
  mixins: [Product, ProductMixin],
  components: {
    ProductImage,
    ProductQuantity,
    RemoveButton
  }
}
</script>

<style lang="scss" scoped>
.remove-button-container {
  display: flex;
  align-items: center;
  margin-right: 12px;
  .checkout-remove-button {
    svg {
      width: 14px;
      height: 18px;
    }
  }
}
.price-original {
  text-decoration: line-through;
}
.blend {
  //flex: 0 0 121px;
}
.mb6 {
  margin-bottom: 6px;
}
.product {
  border-bottom: 1px solid #E0E0E0;
  padding: 17px 0;
  width: 100%;
  margin-bottom: 6px;
  display: flex;
}

.product-name {
  font-family: "DIN Pro";
  font-size: 13px;
  line-height: 16px;
  color: #1A1919;
  margin-bottom: 2px;
}

.product-data {
  display: flex;
  margin-left: 18px;
  flex: 1;
}
.product-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.product-price-container {
  display: flex;
  align-items: center;
  min-width: 75px;
}
.product-price {
  font-family: "DIN Pro";
  font-size: 15px;
  line-height: 16px;
  color: #1A1919;
  font-weight: bold;
}
.total-price {
  font-family: "DIN Pro";
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
  text-align: right;
  color: #1A1919;
}
.product-image {
  width: 50px;
  height: 50px;
}
</style>
<style>
  .checkout-product-quantity {
    padding: 0 20px;
  }
</style>
