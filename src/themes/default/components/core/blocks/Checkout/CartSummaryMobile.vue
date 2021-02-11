<template>
  <div class="cart-summary-mobile-details selected">
    <div class="title">
      <span>{{ $t("Your order") }}</span>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.0003 1.6665C5.40033 1.6665 1.66699 5.39984 1.66699 9.99984C1.66699 14.5998 5.40033 18.3332 10.0003 18.3332C14.6003 18.3332 18.3337 14.5998 18.3337 9.99984C18.3337 5.39984 14.6003 1.6665 10.0003 1.6665ZM7.74199 13.5748L4.75033 10.5832C4.42533 10.2582 4.42533 9.73317 4.75033 9.40817C5.07533 9.08317 5.60033 9.08317 5.92533 9.40817L8.33366 11.8082L14.067 6.07484C14.392 5.74984 14.917 5.74984 15.242 6.07484C15.567 6.39984 15.567 6.92484 15.242 7.24984L8.91699 13.5748C8.60033 13.8998 8.06699 13.8998 7.74199 13.5748Z" fill="#23BE20"/>
      </svg>
      <div class="change">
        <span @click="openMicrocart">{{ $t("Edit") }}</span>
      </div>
    </div>
    <div class="selected-info">
      <span class="product-count">{{ $tc("products", getItemsTotalQuantity) }}</span>
      <no-ssr>
        <span class="grand-total">{{ grandTotal | price(storeView) }}</span>
      </no-ssr>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import NoSSR from 'vue-no-ssr';

export default {
  components: {
    'no-ssr': NoSSR
  },
  computed: {
    ...mapGetters({
      totals: 'cart/getTotals',
      getItemsTotalQuantity: 'cart/getItemsTotalQuantity'
    }),
    grandTotal() {
      return this.totals.find(it => it.code === 'grand_total').value
    },
    storeView () {
      return currentStoreView()
    }
  },
  methods: {
    ...mapActions({
      openMicrocart: 'ui/toggleMicrocart'
    }),
    activateSection() {
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-summary-mobile-details {
  padding: 15px;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
}

.title {
  display: flex;
  align-items: center;
  margin-bottom: 24px;

  span {
    font-family: DIN Pro;
    font-size: 18px;
    line-height: 24px;
    font-weight: 500;
    color: #1A1919;
    margin-right: 12px;
  }
}

.selected-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.grand-total {
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 18px;
  line-height: 20px;
  color: #1A1919;
}

.product-count {
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #1A1919;
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
</style>