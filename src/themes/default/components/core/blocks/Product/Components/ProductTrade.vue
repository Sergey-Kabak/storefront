<template>
  <div class="trade-wrapper">
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
      <div v-if="ProductStock !== 'NotAvailable'" class="flex trade-actions">
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

export default {
  mixins: [ProductMixin],
  components: {
    ProductCartPrice,
    AddToCompare,
    AddToWishlist,
    ButtonWhite,
    AddToCart
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
  },
  beforeDestroy () {
    this.$bus.$emit('modal-hide', 'modal-credits')
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
  margin-top: 32px;
  grid-gap: 16px;
  button{
    flex: 1;
    height: 40px;
  }
}
</style>
