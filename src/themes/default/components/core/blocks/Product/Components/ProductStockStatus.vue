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
      'PendingDelivery': `<svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.2222 1.8H10.5067C10.1333 0.756 9.15556 0 8 0C6.84444 0 5.86667 0.756 5.49333 1.8H1.77778C1.30628 1.8 0.854097 1.98964 0.520699 2.32721C0.187301 2.66477 0 3.12261 0 3.6V16.2C0 16.6774 0.187301 17.1352 0.520699 17.4728C0.854097 17.8104 1.30628 18 1.77778 18H14.2222C14.6937 18 15.1459 17.8104 15.4793 17.4728C15.8127 17.1352 16 16.6774 16 16.2V3.6C16 3.12261 15.8127 2.66477 15.4793 2.32721C15.1459 1.98964 14.6937 1.8 14.2222 1.8ZM8 1.8C8.23575 1.8 8.46184 1.89482 8.62854 2.0636C8.79524 2.23239 8.88889 2.46131 8.88889 2.7C8.88889 2.93869 8.79524 3.16761 8.62854 3.3364C8.46184 3.50518 8.23575 3.6 8 3.6C7.76425 3.6 7.53816 3.50518 7.37146 3.3364C7.20476 3.16761 7.11111 2.93869 7.11111 2.7C7.11111 2.46131 7.20476 2.23239 7.37146 2.0636C7.53816 1.89482 7.76425 1.8 8 1.8ZM3.55556 5.4H12.4444V3.6H14.2222V16.2H1.77778V3.6H3.55556V5.4ZM4 11.25L5.33333 9.9L7.11111 11.7L11.1111 7.65L12.4444 9L7.11111 14.4L4 11.25Z" fill="#F2994A"/>
        </svg>`,
      'ComingSoon': `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.992 0C3.576 0 0 3.584 0 8C0 12.416 3.576 16 7.992 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 7.992 0ZM8 14.4C4.464 14.4 1.6 11.536 1.6 8C1.6 4.464 4.464 1.6 8 1.6C11.536 1.6 14.4 4.464 14.4 8C14.4 11.536 11.536 14.4 8 14.4ZM8.4 4H7.2V8.8L11.4 11.32L12 10.336L8.4 8.2V4Z" fill="#BE207A"/>
        </svg>`,
      'NotAvailable': `<svg width="16" height="16" viewBox="0 0 16 16" fill="#1A1919" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.072 4.8L8 6.872L5.928 4.8L4.8 5.928L6.872 8L4.8 10.072L5.928 11.2L8 9.128L10.072 11.2L11.2 10.072L9.128 8L11.2 5.928L10.072 4.8ZM8 0C3.576 0 0 3.576 0 8C0 12.424 3.576 16 8 16C12.424 16 16 12.424 16 8C16 3.576 12.424 0 8 0ZM8 14.4C4.472 14.4 1.6 11.528 1.6 8C1.6 4.472 4.472 1.6 8 1.6C11.528 1.6 14.4 4.472 14.4 8C14.4 11.528 11.528 14.4 8 14.4Z"/>
        </svg>`,
      'OutOfProduction': `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.3156 0H4.68444L0 4.68444V11.3156L4.68444 16H11.3156L16 11.3156V4.68444L11.3156 0ZM14.2222 10.5778L10.5778 14.2222H5.42222L1.77778 10.5778V5.42222L5.42222 1.77778H10.5778L14.2222 5.42222V10.5778Z" fill="#5F5E5E"/>
        <path d="M8 12.4444C8.49092 12.4444 8.88889 12.0465 8.88889 11.5556C8.88889 11.0646 8.49092 10.6667 8 10.6667C7.50908 10.6667 7.11111 11.0646 7.11111 11.5556C7.11111 12.0465 7.50908 12.4444 8 12.4444Z" fill="#5F5E5E"/>
        <path d="M7.11111 3.55556H8.88889V9.77778H7.11111V3.55556Z" fill="#5F5E5E"/>
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
}
.PendingDelivery {
  color: orange;
}
.ComingSoon{
  color: #BE207A;
}
.InStock{
  color: #23BE20;
}
.OutOfProduction {
  color: #5F5E5E;
}
.product-status-icon{
  margin-right: 8px;
}
.product-status{
  font-family: 'DIN Pro';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 3px;
  line-height: 16px;

  &:before{
    position: absolute;
    background: currentColor;
    opacity: 0.12;
    content: '';
    width: 100%;
    height: 8px;
    bottom: 0;
    left: -4px;
  }
}
.product-stock-status {
  display: flex;
  align-items: flex-end;
}
</style>
