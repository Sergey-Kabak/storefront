<template>
  <div class="product">
    <div class="product-remove" @click="removeFromCart()">
      <img src="assets/custom/Delete.svg" alt="remove" />
    </div>
    <div class="product-image">
      <img :src="image.src" alt="product" />
    </div>
    <div class="product-info">
      <div class="product-info-name">
        {{ product.name }}
      </div>
      <div class="product-info-price">{{ product.price }} ₴</div>
    </div>
    <div class="product-quantity" v-if="product.type_id !== 'grouped' && product.type_id !== 'bundle'">
      <product-quantity-new
        class="row m0"
        v-model="product.qty"
        @input="update($event)"
        :max-quantity="product.stock.qty"
        :is-simple-or-configurable="isSimpleOrConfigurable"
        :show-quantity="manageQuantity"
        :check-max-quantity="manageQuantity"
      />
    </div>
    <div class="product-price">
      <span> {{ product.price * product.qty }} ₴ </span>
    </div>
  </div>
</template>

<script>
import { Product } from "@vue-storefront/core/modules/checkout/components/Product";
import ProductQuantityNew from "theme/components/core/ProductQuantityNew.vue";
import { onlineHelper } from "@vue-storefront/core/helpers";
import ProductImage from "theme/components/core/ProductImage";
import { currentStoreView } from "@vue-storefront/core/lib/multistore";
import { mapState } from "vuex";

export default {
  mixins: [Product],
  components: {
    ProductImage,
    ProductQuantityNew
  },
  data: () => ({
    maxQuantity: 0,
    detailsOpen: false,
    quantityError: false,
    isStockInfoLoading: false,
    hasAttributesLoaded: false,
    manageQuantity: true
  }),
  computed: {
    image() {
      return {
        loading: this.thumbnail,
        src: this.thumbnail
      };
    },
    isSimpleOrConfigurable () {
      return ['simple', 'configurable'].includes(this.product.type_id)
    },
    isOnline (value) {
      return onlineHelper.isOnline
    },
    storeView() {
      return currentStoreView();
    }
  },
  methods: {
    removeFromCart () {
      this.$store.dispatch('cart/removeItem', { product: this.product })
    },
    removeFromCart() {
      this.$store.dispatch('cart/removeItem', { product: this.product })
    }
  }
};
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 15px;
}

.product-remove {
  margin-right: 10px;
  cursor: pointer;
  
  img {
    width: 14px;
    height: 18px;
  }
}

.product-image {
  margin-right: 10px;
  display: flex;
  align-items: center;
  max-width: 40px;
  width: 100%;
  font-family: DIN Pro;
  font-style: normal;
}

.product-info {
  margin-right: 15px;
}

.product-info-name {
  font-size: 13px;
  line-height: 16px;
}

.product-info-price {
  font-size: 15px;
  font-weight: 600;
  line-height: 16px;
  color: #1a1919;
}

.product-price {
  font-family: DIN Pro;
  font-style: normal;
  font-size: 18px;
  line-height: 24px;
  white-space: nowrap;
  font-weight: 600;
  margin-left: 8px;
  max-width: 70px;
  width: 100%;
  text-align: right;
}

.product-quantity {
  margin-left: auto;
}

img {
  width: 100%;
}

.price-original {
  text-decoration: line-through;
}
.blend {
  flex: 0 0 121px;
}
</style>
