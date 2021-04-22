<template>
  <div v-if="isActive" class="lang_switcher">
    <div class="lang_switcher-list">
      <ul>
        <li v-for="(storeView, storeCode) in storeViews" :key="storeCode" :class="{'active' : buildUrl(storeView.url) === $route.fullPath}">
          <a @click="changeMultiStore(storeCode, storeView.url)" >{{ $t(storeView.i18n.slug) }}</a>
        </li>
        <li :class="{'active' : buildUrl('/') === $route.fullPath}">
          <a @click="changeMultiStore('', '/')" >{{ $t(LanguageSlug) }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { currentStoreView, prepareStoreView, localizedDispatcherRoute, localizedRoute } from '@vue-storefront/core/lib/multistore';
import config from 'config';
import { quickSearchByQuery } from '@vue-storefront/core/lib/search';
import { mapGetters } from 'vuex';

export default {
  data () {
    const storeView = currentStoreView()
    return {}
  },
  computed: {
    ...mapGetters({
      getCurrentProduct: 'product/getCurrentProduct',
      getCurrentCategory: 'category-next/getCurrentCategory'
    }),
    isActive () {
      return config.storeViews.multistore
    },
    LanguageSlug () {
      return config.i18n.slug
    },
    storeViews () {
      return Object.keys(config.storeViews).reduce((storeViews, storeCode) => {
        if (this.isValidStoreCode(storeCode)) {
          storeViews[storeCode] = config.storeViews[storeCode]
        }
        return storeViews
      }, {})
    }
  },
  methods: {
    async changeMultiStore (storeCode, url) {
      await prepareStoreView(storeCode)
      await this.defineCurrentPage(storeCode, url)
    },
    async defineCurrentPage (storeCode, url) {
      const pages = {
        'product page': () => {
          return {
            search: true,
            entityType: 'product',
            query: {
              query: {
                bool: {
                  should: [{ 'term': { 'sku': this.getCurrentProduct.sku } }]
                }
              }
            }
          }
        },
        'category': () => {
          return {
            search: true,
            entityType: 'category',
            query: {
              query: {
                bool: {
                  should: [{ 'term': { 'id': this.getCurrentCategory.id } }]
                }
              }
            }
          }
        }
      }
      const meta = Object.keys(pages).find(p => p === this.$route.meta.name);
      const options = pages[meta]
      options ? await this.buildSearchQuery(options().query, options().entityType, storeCode) : this.lazyRedirect(url)
    },
    async buildSearchQuery (query, entityType, storeCode) {
      const { items } = await quickSearchByQuery({
        entityType: entityType,
        query: query
      })
      const route = localizedDispatcherRoute({
        path: items[0].url_path
      }, storeCode);
      location.href = location.origin + route
    },
    lazyRedirect (url) {
      location.href = location.origin + this.buildUrl(url)
    },
    buildUrl (url) {
      let path = this.$route.fullPath;

      Object.keys(this.storeViews).forEach(el => {
        let condition = path.match(new RegExp('^' + ('/' + el) ));
        if (condition) {
          path = path.replace(condition[0], '')
        }
      });
      return url === '/' ? path : url + path;
    },
    isValidStoreCode (storeCode) {
      const storeView = config.storeViews[storeCode]
      return !!(storeView && typeof storeView === 'object' && storeView.i18n)
    }
  }
}
</script>

<style lang="scss" scoped>
.lang_switcher{
  display: flex;
  position: absolute;
  right: 8px;
  top: 0;

  ul {
    display: flex;
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  li {
    cursor: pointer;
    display: block;
    padding: 7px;
    font-size: 13px;

    a {
      font-family: DIN Pro;
      font-weight: 600;
      font-size: 13px;
      line-height: 16px;
      color: #BDBDBD;
    }

    &.active {
      background-color: #fff;
      a {
        color: #1A1919;
      }
    }
  }
}
</style>
