<template>
  <div class="product_kit">
    <div class="product-list">
      <div class="main_product product-row">
        <div class="list_space">
          Ваш товар
        </div>
        <div class="product-list-item">
          <product-image
            class="product-cover__thumb"
            :image="thumbnailObj(getCurrentProduct)"
            :alt="getCurrentProduct.name | htmlDecode"
            :calc-ratio="false"
            data-testid="productImage"
          />
          <product-cart-price :product="getCurrentProduct" />
        </div>
      </div>
      <div v-for="(product, index) in selectedProducts" :key="index" class="product-row">
        <div class="list_space">
          circle
        </div>
        <div class="product-list-item">
          <product-image
            class="product-cover__thumb"
            :image="thumbnailObj(product)"
            :alt="product.name | htmlDecode"
            :calc-ratio="false"
            data-testid="productImage"
          />
          <product-cart-price :product="product" />
        </div>
      </div>
    </div>
    <div>
      <button @click="showModal">Собрать свой комплект</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import ProductCartPrice from '../ProductCartPrice';
import ProductImage from '../../../ProductImage';
import { productThumbnailPath } from '@vue-storefront/core/helpers';
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers';

export default {
  components: {
    ProductCartPrice,
    ProductImage
  },
  data () {
    return {
      selectedProducts: []
    }
  },
  computed: {
    ...mapGetters({
      getCurrentProduct: 'product/getCurrentProduct'
    }),
    ...mapState({
      kitProducts: (state) => state.kits.products
    }),
    selectedKitProducts () {
      return this.selectedProducts
    }
  },
  methods: {
    showModal () {
      this.$bus.$emit('modal-show', 'modal-kits')
    },
    thumbnail (product) {
      // todo: play with the image based on category page filters - eg. when 'red' color is chosen, the image is going to be 'red'
      let thumbnail = productThumbnailPath(product)
      return this.getThumbnail(thumbnail, 56, 56)
    },
    thumbnailObj (product) {
      return {
        src: this.thumbnail(product),
        loading: this.placeholder,
        error: this.placeholder
      }
    }
  },
  async mounted () {
    this.getCurrentProduct.product_option.extension_attributes.product_kits.push({
      'kit_id': this.getCurrentProduct.product_kits[0].id,
      'items': [{'kit_item_id': 2 }]
    })
    // 'items': this.getCurrentProduct.product_kits[0].items.map(it => {
    //   return { kit_item_id: it.id }
    // })
    console.log(this.getCurrentProduct)
    console.log(this.kitProducts);
    this.selectedProducts = this.kitProducts

    // "product_option": {
    //   "extension_attributes": {
    //     "product_kits": [
    //       {
    //         "kit_id": 4,
    //         "items": [
    //           {
    //             "kit_item_id": 5
    //           },
    //           {
    //             "kit_item_id": 7
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // }
  }
}
</script>

<style lang="scss" scoped>
.product_kit{
  border: 1px solid #E0E0E0;
  box-sizing: border-box;
  border-radius: 4px;
}
.product-list{
  padding: 16px 0 16px 16px;
}
.main_product{

}
.list_space{

}
.product-list-item{
  display: flex;
  ::v-deep .product-image{
    width: 56px;
    height: 56px;
    margin-right: 12px;
  }
  ::v-deep .product-price-block{
    flex-direction: column;
    .name{
      font-size: 13px;
    }
  }
}
.product-row{
  display: flex;
}
</style>
