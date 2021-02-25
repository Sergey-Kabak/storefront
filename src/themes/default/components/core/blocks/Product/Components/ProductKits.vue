<template>
  <div class="product_kit__block">
    <h3 class="product_kit__block-title">{{ $t('Your kit') }}</h3>
    <div class="product_kit">
      <kit-selected-products :label="false" />
      <kit-totals>
        <template v-slot:nav>
          <div class="flex kit-nav">
            <button-white @click.native="showModal">
              {{ $t('Assemble your kit') }}
            </button-white>
            <add-to-cart :product="getCurrentProduct" :show-icon="false">
              <template v-slot:text>
                <span>{{ $t('Buy kit') }}</span>
              </template>
            </add-to-cart>
          </div>
        </template>
      </kit-totals>
    </div>
  </div>
</template>

<script>
import KitSelectedProducts from '../Kits/KitSelectedProducts';
import KitTotals from '../Kits/KitTotals';
import ButtonWhite from '../ButtonWhite';
import AddToCart from '../../../AddToCart';
import { mapGetters, mapState } from 'vuex';

export default {
  components: {
    AddToCart,
    ButtonWhite,
    KitSelectedProducts,
    KitTotals
  },
  computed: {
    ...mapGetters({
      getCurrentProduct: 'product/getCurrentProduct'
    }),
    ...mapState({
      kitProducts: (state) => state.kits.products
    })
  },
  methods: {
    showModal () {
      this.$bus.$emit('modal-show', 'modal-kits')
    },
    addProductToKit (product) {
      const shortPath = this.getCurrentProduct.product_option.extension_attributes.product_kits
      const kitOptions = {
        KitGroup: shortPath.find(kit => kit.kit_id === product.kit_id),
        kitGroupIndex: shortPath.findIndex(kit => kit.kit_id === product.kit_id)
      }
      if (kitOptions.KitGroup) {
        this.getCurrentProduct.product_option.extension_attributes.product_kits[kitOptions.kitGroupIndex].items.push({ kit_item_id: product.kit_item_id });
      } else {
        this.getCurrentProduct.product_option.extension_attributes.product_kits.push({
          kit_id: product.kit_id,
          items: [{ kit_item_id: product.kit_item_id }]
        });
      }
    }
  },
  mounted () {
    if (this.kitProducts.length && !this.getCurrentProduct.product_option.extension_attributes.product_kits.length) {
      this.kitProducts.filter(product => !!product.stock.is_in_stock)
        .slice(0, 2)
        .forEach(product => {
          this.addProductToKit(product)
        });
    }
  }
}
</script>

<style lang="scss" scoped>
.kit-nav{
  @media (min-width: 768px) and (max-width: 1024px) {
    flex-direction: column-reverse;
  }
  @media (max-width: 440px) {
    flex-direction: column-reverse;
  }
  grid-gap: 20px;
  button{
    @media (min-width: 768px) and (max-width: 1024px) {
      max-width: 100%;
      min-width: 100%;
    }
    @media (max-width: 440px) {
      max-width: 100%;
      min-width: 100%;
    }
    max-width: calc(50% - 10px);
    min-width: calc(50% - 10px);
    height: 40px;
  }
}
.product_kit{
  &__block{
    @media (min-width: 1025px) {
      max-width: 490px;
    }
    &-title{
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 0;
      font-size: 24px;
      line-height: 30px;
      color: #1A1919;
      margin: 0 0 32px 0;
    }
  }
  border: 1px solid #E0E0E0;
  box-sizing: border-box;
  border-radius: 4px;
  ::v-deep .kits-selected-block{
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #E0E0E0;
  }
}
</style>
