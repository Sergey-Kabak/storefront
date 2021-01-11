import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters({
      getAvailableFilters: 'category-next/getAvailableFilters',
      getBreadcrumbsRoutes: 'breadcrumbs/getBreadcrumbsRoutes',
      getBreadcrumbsCurrent: 'breadcrumbs/getBreadcrumbsCurrent'
    })
  },
  methods: {
    getPage (page) {
      if (!page) {
        return this.$route.meta.name || null;
      }
      return page;
    },
    async PrepareProducts (products, page = null, attr = null) {
      if (!this.$store.getters['custom-attr/getFilter']) {
        await this.$store.dispatch('custom-attr/getCustomAttribute', ['manufacturer', 'color']);
      }
      attr = this.$store.getters['custom-attr/getFilter'];
      if (!page) {
        page = this.getPage(page);
      }
      return products.map(it => {
        let { sku, name, price, manufacturer, brand = null, category = null, list = page } = it;
        if (manufacturer && attr.manufacturer.find(el => el.value === manufacturer + '')) {
          brand = attr.manufacturer.find(el => el.value === manufacturer + '').label
        }
        if (this.getBreadcrumbsRoutes.length || this.getBreadcrumbsCurrent) {
          // eslint-disable-next-line no-return-assign
          category = this.getBreadcrumbsRoutes.reduce((acc, route) => acc += route.name + ' /', '') + this.getBreadcrumbsCurrent;
        }
        if (it.qty && it.color) {
          let { color, qty } = it;
          if (attr.color.find(it => +it.value === color)) {
            color = attr.color.find(it => +it.value === color).label;
          }
          return { id: sku, name, price, brand, category, list, variant: color, quantity: qty };
        } else {
          return { id: sku, name, price, brand, category, list };
        }
      });
    },
    async GTM_PRODUCT_IMPRESSION (products, page) {
      const result = await this.PrepareProducts(products, page);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'ecommerce.impression',
        ecommerce: {
          impressions: result
        }
      });
    },
    async GTM_PRODUCT_CLICK (product, page) {
      const result = await this.PrepareProducts(product, page);
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
    async GTM_PRODUCT_VIEW (product, page) {
      const result = await this.PrepareProducts(product, page);
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
    async GTM_ADD_TO_CART (product, page) {
      const result = await this.PrepareProducts(product, page);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'ecommerce.add',
        ecommerce: {
          add: {
            actionField: {
              list: this.getPage(page)
            },
            products: result
          }
        }
      });
    },
    async GTM_REMOVE_FROM_CART (product, page) {
      const result = await this.PrepareProducts(product, page);
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'ecommerce.remove',
        ecommerce: {
          remove: {
            actionField: {
              list: this.getPage(page)
            },
            products: result
          }
        }
      });
    },
    async GTM_CHECKOUT (product, page) {
      const result = await this.PrepareProducts(product, page);
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
      const result = await this.PrepareProducts(products);
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