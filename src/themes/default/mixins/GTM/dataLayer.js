import { mapGetters } from 'vuex';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager';
export default {
  computed: {
    ...mapGetters({
      getAvailableFilters: 'category-next/getAvailableFilters',
      getBreadcrumbsRoutes: 'breadcrumbs/getBreadcrumbsRoutes',
      getBreadcrumbsCurrent: 'breadcrumbs/getBreadcrumbsCurrent'
    })
  },
  methods: {
    getBrand (product, attr) {
      if (product.manufacturer && attr.manufacturer.find(el => el.value === product.manufacturer + '')) {
        return attr.manufacturer.find(el => el.value === product.manufacturer + '').label;
      }
    },
    getProductColor (product, attr) {
      return product.color ? attr.color.find(it => +it.value === product.color).label : undefined;
    },
    getCategory (product) {
      return product.breadcrumbs[product.breadcrumbs.length - 1].name;
    },
    getPage (page) {
      if (!page) {
        return this.$route.meta.name || null;
      }
      return page;
    },
    async PrepareProducts ({ products, showQty = false }) {
      if (!this.$store.getters['custom-attr/getFilter']) {
        await this.$store.dispatch('custom-attr/getCustomAttribute', ['manufacturer', 'color']);
      }
      return products.map(it => {
        let { sku, name, price, qty } = it;
        const attr = this.$store.getters['custom-attr/getFilter'];
        const brand = this.getBrand(it, attr);
        const category = this.getCategory(it);
        const color = this.getProductColor(it, attr);
        const product = { id: sku, name, price, brand, category, variant: color };
        showQty && Object.assign(product, { quantity: qty });
        return product;
      });
    },
    async GTM_PRODUCT_IMPRESSION (products, page) {
      const result = await this.PrepareProducts({ products });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'ecommerce.impression',
        ecommerce: {
          impressions: result
        }
      });
    },
    async GTM_PRODUCT_CLICK (products, page) {
      StorageManager.get('gtm').setItem('gtm_' + products[0].sku, page);
      const result = await this.PrepareProducts({ products });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'ecommerce.click',
        ecommerce: {
          click: {
            actionField: {
              list: this.getPage(page)
            },
            products: result
          }
        }
      });
    },
    async GTM_PRODUCT_VIEW (products, page) {
      const result = await this.PrepareProducts({ products });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'ecommerce.view',
        ecommerce: {
          detail: {
            actionField: {
              list: this.getPage(page)
            },
            products: result
          }
        }
      });
    },
    async GTM_ADD_TO_CART (products, page) {
      const list = await StorageManager.get('gtm').getItem('gtm_' + products[0].sku);
      const result = await this.PrepareProducts({ products, showQty: true });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'ecommerce.add',
        ecommerce: {
          add: {
            actionField: {
              list: this.getPage(list)
            },
            products: result
          }
        }
      });
    },
    async GTM_REMOVE_FROM_CART (products, page) {
      const list = await StorageManager.get('gtm').getItem('gtm_' + products[0].sku);
      const result = await this.PrepareProducts({ products, showQty: true });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'ecommerce.remove',
        ecommerce: {
          remove: {
            actionField: {
              list: this.getPage(list)
            },
            products: result
          }
        }
      });
      StorageManager.get('gtm').removeItem('gtm_' + products[0].sku);
    },
    async GTM_CHECKOUT (products, page) {
      const result = await this.PrepareProducts({ products });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'ecommerce.checkout',
        ecommerce: {
          checkout: {
            actionField: {
              step: 1
            },
            products: result
          }
        }
      });
    },
    async GTM_DELIVERY (option) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'ecommerce.checkout_option',
        ecommerce: {
          checkout: {
            actionField: {
              step: 2,
              option
            }
          }
        }
      });
    },
    async GTM_CONTACT_DATA () {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'ecommerce.checkout_option',
        ecommerce: {
          checkout: {
            actionField: {
              step: 3
            }
          }
        }
      });
    },
    async GTM_PAYMENT (option) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'ecommerce.checkout_option',
        ecommerce: {
          checkout: {
            actionField: {
              step: 4,
              option
            }
          }
        }
      });
    },
    async GTM_TRANSACTION ({ id, revenue, products }) {
      const result = await this.PrepareProducts({ products, showQty: true });
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'ecommerce.transaction',
        ecommerce: {
          currencyCode: 'UAH',
          purchase: {
            actionField: {
              id,
              revenue
            },
            products: result
          }
        }
      });
    }
  }
};
