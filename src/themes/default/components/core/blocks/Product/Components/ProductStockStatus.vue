<template>
  <div class="product-stock-status block">
    <div v-html="productStockIcon" class="product-status-icon"></div>
    <span class="product-status relative" :class="getProductStock">{{ $t(getProductStock) }}</span>
  </div>
</template>

<script>
import ProductMixin from '../Mixins/ProductMixin';
import { ProductStock } from 'theme/helpers'

export default {
  mixins: [ProductMixin],
  data: () => ({
    icons: {
      'InStock': `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.672 4.464L6.4 9.736L3.528 6.872L2.4 8L6.4 12L12.8 5.6L11.672 4.464ZM8 0C3.584 0 0 3.584 0 8C0 12.416 3.584 16 8 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 8 0ZM8 14.4C4.464 14.4 1.6 11.536 1.6 8C1.6 4.464 4.464 1.6 8 1.6C11.536 1.6 14.4 4.464 14.4 8C14.4 11.536 11.536 14.4 8 14.4Z" fill="#23BE20"/>
        </svg>`,
      'PendingDelivery': `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.11111 12.4444C7.11111 12.9333 7.51111 13.3333 8 13.3333C8.48889 13.3333 8.88889 12.9333 8.88889 12.4444C8.88889 11.9556 8.48889 11.5556 8 11.5556C7.51111 11.5556 7.11111 11.9556 7.11111 12.4444ZM7.11111 0V3.55556H8.88889V1.84889C11.9022 2.28444 14.2222 4.86222 14.2222 8C14.2222 11.44 11.44 14.2222 8 14.2222C4.56 14.2222 1.77778 11.44 1.77778 8C1.77778 6.50667 2.30222 5.13778 3.18222 4.07111L8 8.88889L9.25333 7.63556L3.20889 1.59111V1.60889C1.26222 3.06667 0 5.37778 0 8C0 12.4178 3.57333 16 8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 3.16163e-08 8 0H7.11111ZM13.3333 8C13.3333 7.51111 12.9333 7.11111 12.4444 7.11111C11.9556 7.11111 11.5556 7.51111 11.5556 8C11.5556 8.48889 11.9556 8.88889 12.4444 8.88889C12.9333 8.88889 13.3333 8.48889 13.3333 8ZM2.66667 8C2.66667 8.48889 3.06667 8.88889 3.55556 8.88889C4.04444 8.88889 4.44444 8.48889 4.44444 8C4.44444 7.51111 4.04444 7.11111 3.55556 7.11111C3.06667 7.11111 2.66667 7.51111 2.66667 8Z" fill="#F2994A"/>
        </svg>`,
      'ComingSoon': `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.992 0C3.576 0 0 3.584 0 8C0 12.416 3.576 16 7.992 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 7.992 0ZM8 14.4C4.464 14.4 1.6 11.536 1.6 8C1.6 4.464 4.464 1.6 8 1.6C11.536 1.6 14.4 4.464 14.4 8C14.4 11.536 11.536 14.4 8 14.4ZM8.4 4H7.2V8.8L11.4 11.32L12 10.336L8.4 8.2V4Z" fill="#BE207A"/>
        </svg>`,
      'NotAvailable': `<svg width="16" height="16" viewBox="0 0 16 16" fill="#1A1919" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.072 4.8L8 6.872L5.928 4.8L4.8 5.928L6.872 8L4.8 10.072L5.928 11.2L8 9.128L10.072 11.2L11.2 10.072L9.128 8L11.2 5.928L10.072 4.8ZM8 0C3.576 0 0 3.576 0 8C0 12.424 3.576 16 8 16C12.424 16 16 12.424 16 8C16 3.576 12.424 0 8 0ZM8 14.4C4.472 14.4 1.6 11.528 1.6 8C1.6 4.472 4.472 1.6 8 1.6C11.528 1.6 14.4 4.472 14.4 8C14.4 11.528 11.528 14.4 8 14.4Z"/>
        </svg>`
    }
  }),
  computed: {
    getProductStock () {
      return ProductStock(this.getCurrentProduct)
    },
    productStockIcon () {
      return this.icons[this.getProductStock]
    }
  }
}
</script>

<style lang="scss" scoped>
.NotAvailable {
  color: #1A1919;
  &:before{
    background: #1A1919;
    opacity: 0.12;
  }
}
.PendingDelivery {
  color: orange;
  &:before{
    background: #F2994A;
    opacity: 0.12;
  }
}
.ComingSoon{
  color: #BE207A;
  &:before{
    background: #BE207A;
    opacity: 0.12;
  }
}
.InStock{
  color: #23BE20;
  &:before{
    background: #23BE20;
    opacity: 0.12;
  }
}
.product-status-icon{
  margin-right: 8px;
}
.product-status{
  font-family: 'DIN Pro';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  margin-bottom: 8px;
  &:before{
    position: absolute;
    content: '';
    width: 100%;
    height: 8px;
    bottom: -3px;
    left: -4px;
  }
}
.product-stock-status {
  display: inline-flex;
}
</style>
