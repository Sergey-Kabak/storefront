import { mapState } from 'vuex'
import i18n from '@vue-storefront/i18n'
import onEscapePress from '@vue-storefront/core/mixins/onEscapePress'
import { prepareQuickSearchQuery } from '@vue-storefront/core/modules/catalog/queries/searchPanel'
import RootState from '@vue-storefront/core/types/RootState'
import { Logger } from '@vue-storefront/core/lib/logger'
import { debounce } from 'debounce'
import config from 'config'
import GTM from 'theme/mixins/GTM/dataLayer'

export const Search = {
  name: 'SearchPanel',
  mixins: [onEscapePress, GTM],
  data () {
    return {
      products: [],
      search: '',
      size: 18,
      start: 0,
      placeholder: i18n.t('Type what you are looking for...'),
      emptyResults: false,
      readMore: true,
      componentLoaded: false
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
      if (this.search !== '' && this.search !== undefined) {
        let query = this.buildSearchQuery(this.search)
        let startValue = 0;
        this.start = startValue
        this.readMore = true
        try {
          const { items } = await this.$store.dispatch('product/findProducts', {
            query,
            start: this.start,
            size: this.size,
            options: {
              populateRequestCacheTags: false,
              prefetchGroupProducts: false
            },
            includeFields: [...config.entities.productList.includeFields, 'category_ids', 'category'],
            excludeFIelds: config.entities.productList.excludeFields
          })
          this.products = items
          this.start = startValue + this.size
          this.emptyResults = items.length < 1
          if (this.emptyResults && !this.recommend.products.length) {
            this.loadRecommends()
          }
          await this.GTM_PRODUCT_IMPRESSION(this.products, 'search results', this.$store.getters['custom-attr/getFilter'])
        } catch (err) {
          Logger.error(err, 'components-search')()
        }
      } else {
        this.products = []
        this.emptyResults = 0
      }
    }, 300),
    loadRecommends(start = 0) {
      this.$store.dispatch('search/getRecommends', start)
    },
    async seeMore () {
      if (this.search !== '' && this.search !== undefined) {
        let query = this.buildSearchQuery(this.search)
        let startValue = this.start;
        try {
          const { items, total, start } = await this.$store.dispatch('product/findProducts', {
            query,
            start: startValue,
            size: this.size,
            options: {
              populateRequestCacheTags: false,
              prefetchGroupProducts: false
            }
          })
          let page = Math.floor(total / this.size)
          let exceeed = total - this.size * page
          if (start === total - exceeed) {
            this.readMore = false
          }
          this.products = this.products.concat(items)
          this.start = startValue + this.size
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