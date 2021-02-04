import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      getCurrentProduct: 'product/getCurrentProduct'
    }),
    ProductStock () {
      const status = {
        InStock: (() => this.getCurrentProduct.stock.is_in_stock && !this.getCurrentProduct.preorder)(),
        PendingDelivery: (() => this.getCurrentProduct.stock.is_in_stock && !!this.getCurrentProduct.preorder)(),
        NotAvailable: (() => !this.getCurrentProduct.stock.is_in_stock)()
      }
      return Object.keys(status).find(s => !!status[s])
    }
  }
}
