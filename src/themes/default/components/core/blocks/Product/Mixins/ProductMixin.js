import { mapGetters } from 'vuex';
import { ProductStock } from '../../../../../helpers';

export default {
  computed: {
    ...mapGetters({
      getCurrentProduct: 'product/getCurrentProduct'
    }),
    ProductStock () {
      return ProductStock(this.getCurrentProduct);
    }
  }
}
