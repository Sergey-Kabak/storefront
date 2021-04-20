import store from '@vue-storefront/core/store';
import { ProductService } from '@vue-storefront/core/data-resolver/ProductService';

export default function (products) {
  return ProductService.getProductsSkippingCache({ products }).then(responseProducts => {
    for (let el of responseProducts) {
      let item = products.find(({ sku }) => sku === el.sku);
      let newItem = { ...(item || {}), ...el, qty: item.qty };
      const currentProduct = store.getters['product/getCurrentProduct'];
      if (currentProduct && el.sku === currentProduct.sku) {
        store.dispatch('product/loadProduct', { parentSku: el.sku, childSku: el.sku });
      }

      if (newItem.old_original_price) {
        newItem.price_decreased = newItem.old_original_price > el.original_price;
      } else {
        newItem.old_original_price = el.original_price;
        newItem.price_decreased = newItem.original_price > el.original_price;
      }
      const updatedCurrentItem = { ...currentProduct, ...newItem, qty: currentProduct ? currentProduct.qty : newItem.qty };
      store.dispatch('wishlist/updateItem', { product: updatedCurrentItem });
      store.dispatch('cart/updateItem', { product: updatedCurrentItem });
    }
  });
}
