export default {
  computed: {
    isAvailible () {
      return !(this.product && (this.product.price_incl_tax && this.product.price_incl_tax > 0) && (this.product.stock && this.product.stock.is_in_stock));
    },
    ButtonDisabled () {
      return !(this.product && this.product.stock && this.product.stock.is_in_stock)
    }
  }
}
