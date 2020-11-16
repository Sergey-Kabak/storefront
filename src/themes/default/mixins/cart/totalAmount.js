export default {
  methods: {
    bundleFinalPrice (product) {
      if (product.special_price) {
        return (this.bundlePrice(product) - ((this.bundlePrice(product) / 100) * (100 - product.special_price)));
      } else {
        return this.bundlePrice(product);
      }
    },
    bundlePrice (product) {
      if (product.bundle_options) {
        // eslint-disable-next-line no-return-assign
        return product.bundle_options.reduce((acc, it) => acc += it.product_links.reduce((acc2, it2) => acc2 += it2.price, 0), 0) + product.original_price_incl_tax;
      } else {
        return product.original_price_incl_tax;
      }
    },
    finalPrice (product) {
      const productTypes = {
        bundle: this.bundleFinalPrice(product)
      };
      return productTypes[product.type_id] || product.price_incl_tax;
    }
  }
}
