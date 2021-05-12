<template>
  <div class="trade-wrapper">
    <product-stock-status v-if="screenResolution === 'mobile'" class="mb10" />
    <div class="flex trade-price-wrapper">
      <product-cart-price
        v-if="getCurrentProduct.type_id !== 'grouped' && !['OutOfProduction'].includes(ProductStock)"
        :product="getCurrentProduct"
        :nameVisibility="false"
        class="product-item-price"/>
      <div class="product-actions flex">
        <AddToCompare :product="getCurrentProduct" />
        <AddToWishlist :product="getCurrentProduct" v-if="!['OutOfProduction'].includes(ProductStock)" />
      </div>
    </div>
    <div>
      <div v-if="!['ComingSoon', 'NotAvailable', 'OutOfProduction'].includes(ProductStock)"  class="flex trade-actions">
        <button-secondary class="coming-soon-button" v-if="ProductStock === 'ComingSoon'"> {{ $t('I will be the first') }} </button-secondary>
        <button-secondary class="preorder-button" v-if="ProductStock === 'PendingDelivery'" @click.native="openPreorderModal()"> {{ $t('To order') }} </button-secondary>
        <div v-if="['InStock'].includes(ProductStock)" class="flex trade-actions">
          <add-to-cart :product="getCurrentProduct" />
          <button-outline v-if="creditCondition" @click.native="showModal">{{ $t('In credit') }}</button-outline>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCartPrice from '../ProductCartPrice';
import AddToCompare from '../../Compare/AddToCompare';
import AddToWishlist from '../../Wishlist/AddToWishlist';
import ButtonOutline from 'theme/components/theme/ButtonOutline.vue';
import ButtonSecondary from 'theme/components/theme/ButtonSecondary.vue';
import ProductMixin from '../Mixins/ProductMixin';
import AddToCart from 'theme/components/core/AddToCart.vue';
import { mapGetters } from 'vuex';
import ProductStockStatus from './ProductStockStatus';
import ResizeMixin from '../Mixins/ResizeMixin';

export default {
  mixins: [ProductMixin, ResizeMixin],
  components: {
    ProductCartPrice,
    AddToCompare,
    AddToWishlist,
    ButtonOutline,
    AddToCart,
    ProductStockStatus,
    ButtonSecondary
  },
  computed: {
    ...mapGetters({
      getBanks: 'themeCredit/getBanks'
    }),
    creditCondition () {
      return this.getBanks.length && this.getCurrentProduct.stock.is_in_stock && this.ProductStock !== 'PendingDelivery'
    }
  },
  methods: {
    showModal () {
      this.$bus.$emit('modal-show', 'modal-credits')
    },
    openPreorderModal() {
      this.$bus.$emit('modal-show', 'modal-preorder')
    }
  }
}
</script>

<style scoped lang="scss">
.trade-price-wrapper {
  margin-bottom: 16px;
}

.trade-wrapper{
  box-sizing: border-box;
  padding: 16px;
}

.product-trade-top {
  display: flex;
  align-items: center;
}

.product-trade-bottom {
  width: 100%;
  margin-top: 32px;
}

.coming-soon {
  display: flex;
  flex-direction: row-reverse;

  .button-full.coming-soon-button {
    font-family: DIN Pro;
    font-size: 15px;
    line-height: 16px;
    color: #1A1919;
    background: #E5F7E4;
    max-width: 100%;
    margin-right: 16px;
  }
}

.product-item-price{
  margin-right: auto;
}
.product-actions{
  margin-left: auto;
  grid-gap: 8px;
  align-items: flex-end;
  position: relative;
  bottom: 3px;
}
.trade-actions{
  width: 100%;
  grid-gap: 16px;
  @media (max-width: 575px) {
    flex-direction: column;
  }
  button{
    flex: 1;
    min-height: 40px;
    width: auto;
    max-width: 100%;
  }
}
</style>
