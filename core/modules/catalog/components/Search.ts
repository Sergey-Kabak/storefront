import { mapState } from 'vuex'
import i18n from '@vue-storefront/i18n'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import { prepareQuickSearchQuery } from '@vue-storefront/core/modules/catalog/queries/searchPanel'
import RootState from '@vue-storefront/core/types/RootState'
import { Logger } from '@vue-storefront/core/lib/logger'
import { debounce } from 'debounce'
import config from 'config'
import GTM from 'theme/mixins/GTM/dataLayer'
import { SearchService } from 'theme/services/SearchService'
import { SearchQuery } from 'storefront-query-builder'

export const Search = {
  name: 'SearchPanel',
  mixins: [onEscapePress, GTM],
  data () {
    return {
      products: [],
      categories: [],
      search: '',
      emptyResults: false
    }
  },
  computed: {
    ...mapState({
      isOpen: (state: RootState) => state.ui.searchpanel,
      recommend: (state: RootState) => state.search.recommend
    }),
    items () {
      return this.$store.state.search
    }
  },
  mounted () {
    this.search = localStorage.getItem(`shop/user/searchQuery`) || ''
    this.makeSearch()
  },
  methods: {
    onEscapePress () {
      this.closeSearchpanel()
    },
    closeSearchpanel () {
      this.$store.commit('ui/setSidebar', false)
      this.$store.commit('ui/setMicrocart', false)
      this.$store.commit('ui/setSearchpanel', false)
    },
    buildSearchQuery (queryText) {
      return prepareQuickSearchQuery(queryText)
    },
    makeSearch: debounce(async function () {
      localStorage.setItem(`shop/user/searchQuery`, this.search ? this.search : '');
      if (this.search && this.search.trim()) {
        let query = new SearchQuery()
        let startValue = 0;
        this.start = startValue
        try {
          const { products, categories } = await SearchService.getProducts({ SearchQuery: this.search })
          const skus = products.map(it => it.code)
          query.applyFilter({ key: 'sku', value: { 'in': skus } })
  
          const { items } = await this.$store.dispatch('product/findProducts', {
            query,
            start: this.start,
            size: this.size,
            options: {
              populateRequestCacheTags: false,
              prefetchGroupProducts: false
            },
            includeFields: config.entities.productList.includeFields,
            excludeFIelds: config.entities.productList.excludeFields
          })
          const mergedProducts = products.map(it => {
            const product = items.find(item => item.sku === it.code) 
            return { ...it, ...product }
          })
          this.products = mergedProducts
          this.categories = categories.slice(0, 6)
          this.emptyResults = items.length < 1
          if (this.emptyResults && !this.recommend.products.length) {
            this.loadRecommends()
          }
        } catch (err) {
          Logger.error(err, 'components-search')()
        }
      } else {
        this.products = []
        this.categories = []
        this.emptyResults = 0
      }
    }, 300),
    loadRecommends(start = 0) {
      this.$store.dispatch('search/getRecommends', start)
    },
    async seeMore () {
      if (this.search && this.search.trim()) {
        let query = this.buildSearchQuery(this.search)
        try {
          const { items, total, start } = await this.$store.dispatch('product/findProducts', {
            query,
            options: {
              populateRequestCacheTags: false,
              prefetchGroupProducts: false
            }
          })
          this.emptyResults = this.products.length < 1
        } catch (err) {
          Logger.error(err, 'components-search')()
        }
      } else {
        this.products = []
        this.emptyResults = 0
      }
    }
  }
}
