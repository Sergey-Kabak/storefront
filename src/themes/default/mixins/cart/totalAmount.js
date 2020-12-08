export default {
  methods: {
    bundleFinalPrice (product) {
      if (product.special_price > 0) {
        return product.special_price + this.BundleOptionsPrice(product);
      } else {
        return this.bundlePrice(product);
      }
    },
    bundlePrice (product) {
      return this.BundleOptionsPrice(product) + product.original_price;
    },
    BundleOptionsPrice (product) {
      if (product.bundle_options) {
        let bundleProductsPrice = product.bundle_options.reduce((acc, it) => {
          // eslint-disable-next-line no-return-assign
          return acc += it.product_links.reduce((acc2, it2) => acc2 += it2.price, 0);
        }, 0);
        return bundleProductsPrice;
      }
      return 0;
    },
    finalPrice (product) {
      const productTypes = {
        bundle: this.bundleFinalPrice(product)
      };
      return productTypes[product.type_id] || product.price_incl_tax;
    }
  }
};
