<template>
  <div>
    <h3 class="mt0">{{ heading }}</h3>
    <product-listing :columns="+cols" :products="getCurrentRelatedProducts" />
  </div>
</template>

<script>
import ProductListing from 'theme/components/core/ProductListing';
import { mapGetters } from 'vuex';
import { prepareRelatedQuery } from '@vue-storefront/core/modules/catalog/queries/related';
import ResizeMixin from './Mixins/ResizeMixin';
import i18n from '@vue-storefront/i18n';
import config from 'config';

export default {
  name: 'Related',
  props: {
    type: {
      type: String,
      required: true
    },
    heading: {
      type: String,
      required: false,
      default: i18n.t('Similar products')
    }
  },
  mixins: [ResizeMixin],
  components: {
    ProductListing
  },
  beforeMount () {
    this.$bus.$on('product-after-load', this.refreshList)

    if (config.usePriceTiers) {
      this.$bus.$on('user-after-loggedin', this.refreshList)
      this.$bus.$on('user-after-logout', this.refreshList)
    }

    this.refreshList()
  },
  beforeDestroy () {
    if (config.usePriceTiers) {
      this.$bus.$off('user-after-loggedin', this.refreshList)
      this.$bus.$off('user-after-logout', this.refreshList)
    }
  },
  destroyed () {
    this.$bus.$off('product-after-load', this.refreshList)
  },
  methods: {
    async refreshList () {
      let sku = this.productLinks ? this.productLinks
        .filter(pl => pl.link_type === this.type)
        .map(pl => pl.linked_product_sku) : null

      let key = 'sku'
      if (sku === null || (sku.length === 0)) {
        sku = this.getCurrentProduct.category_ids
        key = 'category_ids'
      }
      let relatedProductsQuery = prepareRelatedQuery(key, sku)
      const sort = 'stock.is_in_stock:desc'
      const response = await this.$store.dispatch('product/list', {
        query: relatedProductsQuery,
        sort,
        size: 5,
        prefetchGroupProducts: false,
        updateState: false
      })
      if (response) {
        this.$store.dispatch('product/related', {
          key: this.type,
          items: response.items
        })
        this.$forceUpdate()
      }
    }
  },
  computed: {
    ...mapGetters({
      getProductRelated: 'product/getProductRelated',
      getCurrentProduct: 'product/getCurrentProduct'
    }),
    getCurrentRelatedProducts () {
      return this.getProductRelated[this.type] || []
    },
    productLinks () {
      return this.getCurrentProduct.product_links
    },
    cols () {
      const columnCount = {
        5: this.width >= 1280,
        4: this.width >= 992 && this.width < 1280,
        3: this.width >= 768 && this.width < 992,
        2: this.width < 768
      }
      return Object.keys(columnCount).find(s => !!columnCount[s])
    }
  }
}
</script>

<style scoped lang="scss">
h3{
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 0;
  font-size: 24px;
  line-height: 30px;
  color: #1A1919;
  margin-bottom: 32px;
}
</style>
