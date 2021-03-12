<template>
  <div class="trade-wrapper">
    <product-stock-status v-if="screenResolution === 'mobile'" class="mb10" />
    <div class="flex trade-price-wrapper">
      <product-cart-price
        v-if="getCurrentProduct.type_id !== 'grouped'"
        :product="getCurrentProduct"
        :nameVisibility="false"
        class="product-item-price"/>
      <div class="product-actions flex">
        <AddToCompare :product="getCurrentProduct" />
        <AddToWishlist :product="getCurrentProduct" />
      </div>
    </div>
    <div>
      <div v-if="!['ComingSoon', 'NotAvailable'].includes(ProductStock)" class="flex trade-actions">
        <add-to-cart :product="getCurrentProduct">
          <template v-if="ProductStock === 'PendingDelivery'" v-slot:text>{{$t('pre order')}}</template>
        </add-to-cart>
        <button-white v-if="getBanks.length" @click.native="showModal">
          <span>{{ $t('In credit') }}</span>
        </button-white>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCartPrice from '../ProductCartPrice';
import AddToCompare from '../../Compare/AddToCompare';
import AddToWishlist from '../../Wishlist/AddToWishlist';
import ButtonWhite from '../ButtonWhite';
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
    ButtonWhite,
    AddToCart,
    ProductStockStatus
  },
  computed: {
    ...mapGetters({
      getBanks: 'themeCredit/getBanks'
    })
  },
  methods: {
    showModal () {
      this.$bus.$emit('modal-show', 'modal-credits')
    }
  }
}
</script>

<style scoped lang="scss">
.trade-wrapper{
  box-sizing: border-box;
  padding: 16px;
}
.trade-price-wrapper{
  align-items: center;
}
.product-item-price{
  margin-right: auto;
}
.product-actions{
  grid-gap: 8px;
  align-items: flex-end;
  position: relative;
  bottom: 3px;
}
.trade-actions{
  @media (max-width: 575px) {
    flex-direction: column;
    button{
      min-width: 100%;
    }
  }
  @media (min-width: 576px) {
    grid-gap: 16px;
  }
  margin-top: 32px;
  button{
    @media (min-width: 576px) {
      flex: 1;
    }
    @media (max-width: 575px) {
      &:not(:last-child){
        margin-bottom: 16px;
      }
    }
    height: 40px;
  }
}
</style>
