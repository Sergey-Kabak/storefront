<template>
  <modal name="modal-msi" class="modal-msi" :width="533">
    <h3 slot="header" class="modal-msi_header align-center">
      Наличие товаров в магазине
    </h3>
    <div slot="content" class="modal-msi_content">
      <div v-if="shopShipping" class="modal-msi_wrapper">
        <div class="flex shop-name">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
               xmlns="http://www.w3.org/2000/svg" class="shop-icon">
            <circle cx="10" cy="10" r="8" fill="#1A1919"></circle>
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M11.4308 5.5C10.4084 5.5 9.44373 5.85479 8.66961 6.50721V5.99891H7V14.5H8.66684V14.4963H8.66961V9.91834C8.72536 8.28321 9.89325 7.06492 11.4308 7.06492C11.7163 7.06492 11.9895 7.10697 12.2449 7.18658C12.2496 7.18781 12.2595 7.19107 12.2595 7.19107L13 5.796C12.507 5.60207 11.9772 5.5 11.4308 5.5Z"
                  fill="#23BE20"></path>
          </svg>
          <span>{{shopShipping.street}}</span>
        </div>
        <div class="shop-notification">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17" fill="none">
            <path d="M0.833252 16.5001H19.1666L9.99992 0.666748L0.833252 16.5001ZM10.8333 14.0001H9.16658V12.3334H10.8333V14.0001ZM10.8333 10.6667H9.16658V7.33341H10.8333V10.6667Z" fill="#EE2C39"/>
          </svg>
          <span>{{ shopNotification }}</span>
        </div>

        <div v-if="productsInCart.length" class="product-container">
          <product v-for="product in productsInCart" :key="product.server_item_id || product.id"
                   :product="product"
                   :source="getSource(product)" />
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from 'theme/components/core/Modal.vue'
import Product from './MsiProduct'
import {mapGetters, mapState} from 'vuex';

export default {
  components: {
    Modal,
    Product
  },
  computed: {
    ...mapGetters({
      productsInCart: 'cart/getCartItems'
    }),
    ...mapState({
      shopShipping: (state) => state.checkoutPage.shopShipping
    }),
    productsWithQty () {
      return this.productsInCart.reduce((acc, p) => acc += p.qty, 0)
    },
    availableProducts () {
      return this.shopShipping.products.reduce((acc, p) => {
        if (p.msi_source && p.msi_source.salable_quantity - p.qty >= 0) {
          acc += p.qty
          return acc;
        }
      }, 0)
    },
    shopNotification () {
      console.log(this.shopShipping);
      return `Только ${this.availableProducts} товара из ${this.productsWithQty} доступны для самовывоза из этого магазина!`
    }
  },
  methods: {
    getSource (product) {
      if (this.shopShipping && this.shopShipping.products) {
        return this.shopShipping.products.find(p => p.sku === product.sku)
      } return null
    }
  }
}
</script>

<style lang="scss" scoped>
.shop-notification{
  padding: 12px 24px;
  background: #F9F9F9;
  display: flex;
  align-items: center;
  svg{
    margin-right: 12px;
  }
  span{
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 0;
    font-size: 14px;
    line-height: 16px;
    color: #5F5E5E;
  }
}
.shop-name{
  padding: 26px;
  align-items: center;
  svg{
    margin-right: 13px;
  }
  span{
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 0;
    font-size: 14px;
    line-height: 16px;
    color: #1A1919;
  }
}
.product-container{
  padding: 32px 24px;
}
::v-deep .product-wrap{
  &:first-child{
    border-radius: 4px 4px 0 0;
  }
  &:last-child{
    border-radius: 0 0 4px 4px;
  }
  &:not(:first-child) {
    border-top: none;
  }
}
</style>
