<template>
  <modal name="modal-msi" class="modal-msi" :width="533">
    <h3 slot="header" class="modal-msi_header align-center">
      {{ $t('Availability of goods in the store') }}
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
        <div v-if="!!shopNotification" class="shop-notification">
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
      <div class="modal_footer">
        <span @click="hideModal()">{{ $t("Select another shop") }}</span>
        <button @click.prevent="selectShop()">{{ $t("Pick up here") }}</button>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from 'theme/components/core/Modal.vue'
import Product from './MsiProduct'
import { mapGetters, mapState } from 'vuex';

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
      if (this.shopShipping && this.shopShipping.products) {
        return this.shopShipping.products.reduce((acc, p) => {
          if (p.msi_source && p.msi_source.salable_quantity > 0) {
            acc += Math.abs(p.qty > p.msi_source.salable_quantity ? p.qty - p.msi_source.salable_quantity : p.qty );
          }
          return acc;
        }, 0)
      }
    },
    shopNotification () {
      if (this.availableProducts !== this.productsWithQty) {
        return this.$tc(`Only {product} product out of {products} are available for pickup from this store!`, this.availableProducts, { product: this.availableProducts, products: this.productsWithQty });
      }
      return ''
    }
  },
  methods: {
    hideModal () {
      this.$bus.$emit('modal-hide', 'modal-msi')
    },
    selectShop () {
      this.$bus.$emit('shopSelected', true);
      this.hideModal();
    },
    getSource (product) {
      if (this.shopShipping && this.shopShipping.products) {
        return this.shopShipping.products.find(p => p.sku === product.sku)
      } return null
    }
  }
}
</script>

<style lang="scss" scoped>
.modal_footer{
  padding: 24px;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: flex-end;
  span{
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 0;
    font-size: 14px;
    line-height: 18px;
    color: #1A1919;
    padding-bottom: 3px;
    border-bottom: 1px dashed #000;
    margin-right: 32px;
    align-self: center;
    cursor: pointer;
  }
  button{
    padding: 12px 16px;
    border-radius: 4px;
    margin: 0;
    border: none;
    background: #23BE20;
    outline: none;
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 0;
    font-size: 15px;
    line-height: 16px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #FFFFFF;
    transition: ease 0.2s;
    &:hover{
      background-color: #20af1d;
    }
    &:active{
      background-color: #1d9f1b;
    }
  }
}
.modal {
  ::v-deep .modal-header{
    padding: 13px 0 13px 24px;
    .modal-msi_header{
      margin: 0;
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 30px;
      color: #1A1919;
    }
  }
}
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
.modal-msi_wrapper{
  max-height: 80vh;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 4px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #E0E0E0;
    border-radius: 4px;
  }
}
</style>
