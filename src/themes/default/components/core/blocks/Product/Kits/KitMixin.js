import { mapGetters, mapState } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      getCurrentProduct: 'product/getCurrentProduct'
    }),
    ...mapState({
      kitProducts: (state) => state.kits.products
    }),
    isInKit () {
      return this.kitGroup && this.kitGroup.items.find(item => item.kit_item_id === this.product.kit_item_id);
    },
    kitGroup () {
      return this.getCurrentProduct.product_option.extension_attributes.product_kits.find(kit => kit.kit_id === this.product.kit_id);
    },
    kitGroupIndex () {
      return this.getCurrentProduct.product_option.extension_attributes.product_kits.findIndex(kit => kit.kit_id === this.product.kit_id);
    },
    itemsIndex () {
      return this.getCurrentProduct.product_option.extension_attributes.product_kits[this.kitGroupIndex].items;
    },
    getSelectedKitIds () {
      return this.getCurrentProduct.product_option.extension_attributes.product_kits.reduce((acc, kit) => {
        acc.push(kit.items.reduce((ids, option) => {
          ids.push(option.kit_item_id);
          return ids;
        }, []));
        return acc;
      }, []).reduce((acc, kit) => {
        acc.push(kit);
        return acc;
      }, []);
    },
    getSelectedProducts () {
      const products = [];
      if (this.getSelectedKitIds.length) {
        this.getSelectedKitIds[0].forEach(id => {
          products.push(this.kitProducts.find(p => p.kit_item_id === id));
        });
      }
      return products;
    }
  },
  methods: {
    addToKit () {
      if (this.kitGroup) {
        this.getCurrentProduct.product_option.extension_attributes.product_kits[this.kitGroupIndex].items.push({ kit_item_id: this.product.kit_item_id });
      } else {
        this.getCurrentProduct.product_option.extension_attributes.product_kits.push({
          kit_id: this.product.kit_id,
          items: [{ kit_item_id: this.product.kit_item_id }]
        });
      }
    },
    removeFromKit () {
      if (this.kitGroup.items.length === 1) {
        this.getCurrentProduct.product_option.extension_attributes.product_kits.splice(this.kitGroupIndex, 1);
      } else {
        this.getCurrentProduct.product_option.extension_attributes.product_kits[this.kitGroupIndex].items.splice(this.itemsIndex.findIndex(e => e.kit_item_id === this.product.kit_item_id), 1);
      }
    }
  }
};
