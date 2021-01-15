import { htmlDecode } from '@vue-storefront/core/filters/html-decode';
import Composite from '@vue-storefront/core/mixins/composite';
import { Logger } from '@vue-storefront/core/lib/logger';

export default {
  name: 'CmsPage',
  mixins: [Composite],
  computed: {
    pageTitle () {
      return this.$store.state.cmsPage.current ? this.$store.state.cmsPage.current.meta_title || this.$store.state.cmsPage.current.title : ''
    },
    pageDescription () {
      return this.$store.state.cmsPage.current ? this.$store.state.cmsPage.current.meta_description : ''
    },
    pageKeywords () {
      return this.$store.state.cmsPage.current ? this.$store.state.cmsPage.current.meta_keywords : ''
    }
  },
  async asyncData ({ store, route, context }) {
    if (context) context.output.cacheTags.add(`cmsPage`)
    const requests = [
      store.dispatch('cmsPage/single', { value: route.params.slug, setCurrent: true }),
      store.dispatch('cms/getCmsMenu')
    ]
    if (route.params.slug === 'shops') {
      requests.push(store.dispatch('shop/getShops', { city: store.state.ui.shopCity }))
    }
    try {
      await Promise.all(requests)
    } catch (e) {
      Logger.error(e)()
      throw e
    }
  },
  metaInfo () {
    return {
      title: htmlDecode(this.pageTitle || this.$route.meta.title),
      meta: [
        { vmid: 'description', name: 'description', content: htmlDecode(this.pageDescription || this.$route.meta.description) },
        { vmid: 'keywords', name: 'keywords', content: htmlDecode(this.pageKeywords) }
      ]
    }
  }
}
