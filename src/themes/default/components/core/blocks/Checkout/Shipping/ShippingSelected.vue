<template>
  <div class="shipping selected">
    <div class="title">
      <span>2. {{ $t("Delivery") }}</span>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.0003 1.6665C5.40033 1.6665 1.66699 5.39984 1.66699 9.99984C1.66699 14.5998 5.40033 18.3332 10.0003 18.3332C14.6003 18.3332 18.3337 14.5998 18.3337 9.99984C18.3337 5.39984 14.6003 1.6665 10.0003 1.6665ZM7.74199 13.5748L4.75033 10.5832C4.42533 10.2582 4.42533 9.73317 4.75033 9.40817C5.07533 9.08317 5.60033 9.08317 5.92533 9.40817L8.33366 11.8082L14.067 6.07484C14.392 5.74984 14.917 5.74984 15.242 6.07484C15.567 6.39984 15.567 6.92484 15.242 7.24984L8.91699 13.5748C8.60033 13.8998 8.06699 13.8998 7.74199 13.5748Z" fill="#23BE20"/>
      </svg>
      <div class="change">
        <span @click="activateSection()">{{ $t("Edit") }}</span>
      </div>
    </div>
    <div class="selected-info">
      <span>{{ shippingInfo }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      selectedShipping: (state) => state.checkoutPage.selectedShipping,
      courierShipping: (state) => state.checkoutPage.courierShipping,
      shopShipping: (state) => state.checkoutPage.shopShipping,
      newPostShipping: (state) => state.checkoutPage.newPostShipping,
      justinShipping: (state) => state.checkoutPage.justinShipping,
      city: (state) => state.ui.city
    }),
    shippingInfo() {
      const methods = {
        'nova_poshta_to_door': `${this.$t(this.selectedShipping.method_code)}: ${this.city}, ${this.courierShipping.address.Description}, ${this.courierShipping.house}, ${this.courierShipping.apartmentNumber}`,
        'freeshipping': this.shopShipping && `${this.$t(this.selectedShipping.method_code)}: ${this.city}, ${this.shopShipping.street}`,
        'nova_poshta_to_warehouse': this.newPostShipping && `${this.$t(this.selectedShipping.method_code)}: ${this.city}, ${this.newPostShipping.Description}`,
        'justin_to_department': this.justinShipping && `${this.$t(this.selectedShipping.method_code)}: ${this.justinShipping.address_ua}`,
      }
      return methods[this.selectedShipping.method_code]
    }
  },
  methods: {
    activateSection() {
      this.$store.commit('checkoutPage/SET_SHIPPING_STATUS', 'active')
      this.$store.commit('checkoutPage/SET_PAYMENT_STATUS', 'disabled')
    }
  }
}
</script>

<style lang="scss" scoped>
.shipping {
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  padding: 16px;
}

.title {
  display: flex;
  align-items: center;
  margin-bottom: 32px;

  span {
    display: block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: DIN Pro;
    font-size: 18px;
    line-height: 24px;
    font-weight: 500;
    color: #1A1919;
    margin-right: 12px;
  }
}

.selected-info {
  span {
    display: block;
    font-family: DIN Pro;
    font-style: normal;
    font-size: 13px;
    line-height: 16px;
    color: #5F5E5E;
    opacity: 0.6;
  }
}

.change {
  margin-left: auto;

  &:hover {
    span {
      border-color: transparent;
    }
  }

  span {
    transition: .2s ease-in-out;
    cursor: pointer;
    display: block;
    font-family: DIN Pro;
    font-size: 13px;
    padding-bottom: 4px;
    line-height: 16px;
    color: #1A1919;
    border-bottom: 1px dashed #1A1919;
  }
}

@media  (max-width: 576px) {
  .title {
    margin-bottom: 24px;
  }
}
</style>