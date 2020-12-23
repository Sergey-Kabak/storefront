import { mapGetters, mapState } from 'vuex';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import totalAmount from '../../../../../mixins/cart/totalAmount';

export default {
  mixins: [totalAmount],
  computed: {
    ...mapState({
      productSku: state => state.themeCredit.productSku,
      creditExtraAttributes: state => state.themeCredit.creditExtraAttributes
    }),
    ...mapGetters({
      productsInCart: 'cart/getCartItems',
      getBanks: 'themeCredit/getBanks',
      selectedCredit: 'themeCredit/getSelectedCredit',
      getSelectedBank: 'themeCredit/getSelectedBank'
    }),
    storeView () {
      return currentStoreView();
    },
    accessoriesMinPrice () {
      return this.totals.find(it => it.code === 'grand_total').value / 100 * +this.selectedCredit.extra_items_part;
    },
    requiredExtraPrice () {
      const products = this.productsInCart.filter(it => this.productSku.includes(it.sku));
      if (products.length && +this.selectedCredit.extra_items_part > 0) {
        const total = products.reduce((acc, product) => {
          // eslint-disable-next-line no-return-assign
          return acc += this.finalPrice(product);
        }, 0);
        return total / 100 * +this.selectedCredit.extra_items_part;
      }
      return 0;
    },
    isExtraItemsPart () {
      return !!+this.selectedCredit.extra_items_part;
    },
    getAccessoriesPriceFromCart () {
      const extraProducts = this.productsInCart.filter(it => !!it.credit_extra_tag && it.credit_extra_tag !== 7436)
      // eslint-disable-next-line no-return-assign
      return extraProducts.length ? extraProducts.reduce((accumulator, product) => accumulator += this.finalPrice(product) * product.qty, 0) : 0;
    },
    alertStatus () {
      if (this.getAccessoriesPriceFromCart === 0 && this.isExtraItemsPart) {
        return {
          class: 'error',
          icon: `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 13H11V15H9V13ZM9 5H11V11H9V5ZM9.99 0C4.47 0 0 4.48 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 9.99 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18Z" fill="#EE2C39"/>
        </svg>`,
          message: this.$t('To complete this credit offer, add product (s) and / or service (s) to the order in the amount of'),
          accentMessage: `${parseInt(this.requiredExtraPrice)} ₴!`
        };
      } else if (this.requiredExtraPrice > this.getAccessoriesPriceFromCart) {
        return {
          class: 'warning',
          icon: `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 13H11V15H9V13ZM9 5H11V11H9V5ZM9.99 0C4.47 0 0 4.48 0 10C0 15.52 4.47 20 9.99 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 9.99 0ZM10 18C5.58 18 2 14.42 2 10C2 5.58 5.58 2 10 2C14.42 2 18 5.58 18 10C18 14.42 14.42 18 10 18Z" fill="#EE8128"/>
        </svg>`,
          message: this.$t('To complete this credit offer, add product (s) and / or service (s)'),
          accentMessage: `${this.$t('still on')} ${parseInt(this.requiredExtraPrice - this.getAccessoriesPriceFromCart)} ₴!`
        };
      } else {
        return {
          class: 'success',
          icon: `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM14.59 5.58L8 12.17L5.41 9.59L4 11L8 15L16 7L14.59 5.58Z" fill="#23BE20"/>
        </svg>`,
          message: this.$t('Condition is met') + ' - ',
          accentMessage: this.$t('product (s) and / or service (s) added to the order :)')
        };
      }
    }
  }
}
