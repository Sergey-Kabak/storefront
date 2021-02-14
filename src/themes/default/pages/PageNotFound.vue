w<template>
  <div id="page_not_found">
    <div class="v-container">
      <div class="error-info">
        <span class="title"> <span class="highlighted"> 404 </span> - {{ $t('Page not found') }}</span>
        <span class="info-title">{{ $t('Please check the spelling of the address in the browser bar') }}</span>
        <div class="emojis">
          <img src="/assets/emojis/surprised_2.png" alt="surprised" class="emoji">
          <img src="/assets/emojis/rolling_eyes.png" alt="rolling_eyes" class="emoji">
          <img src="/assets/emojis/point.png" alt="point" class="emoji">
        </div>
        <router-link :to="localizedRoute('/')" class="link">
          <button-full class="not-found">{{ $t('to main') }}</button-full>
        </router-link>
      </div>
      <div class="product-info">
        <span class="product-info-title">{{ $t('Recommend to buy') }}</span>
        <lazy-hydrate :trigger-hydration="!loading">
          <product-listing :products="getStockGoods" />
        </lazy-hydrate>
      </div>
      <div class="product-info" v-if="items.length">
        <span class="product-info-title">{{ $t('Recently viewed') }}</span>
        <product-listing :products="recentlyViewed" />
      </div>
    </div>
  </div>
</template>

<script>
import { Logger } from '@vue-storefront/core/lib/logger';
import { isServer } from '@vue-storefront/core/helpers';
import { mapGetters, mapState } from 'vuex'
import i18n from '@vue-storefront/i18n';
import ButtonFull from 'theme/components/theme/ButtonFull';
import LazyHydrate from 'vue-lazy-hydration';
import ProductListing from 'theme/components/core/ProductListing';
import { RecentlyViewedModule } from '@vue-storefront/core/modules/recently-viewed';
import { registerModule } from '@vue-storefront/core/lib/modules';

export default {
  name: 'PageNotFound',
  components: {
    LazyHydrate,
    ProductListing,
    ButtonFull
  },
  data: () => ({
    loading: true
  }),
  beforeCreate () {
    registerModule(RecentlyViewedModule)
  },
  async asyncData ({ store, route, context }) {
    Logger.log('Entering asyncData for PageNotFound ' + new Date())()
    if (context) {
      context.output.cacheTags.add(`page-not-found`)
      context.server.response.statusCode = 404
    }
    await store.dispatch('homepage/loadStockGoods')
  },
  beforeRouteEnter (to, from, next) {
    if (!isServer && !from.name) { // Loading products to cache on SSR render
      next(vm => {
        vm.$store.dispatch('homepage/loadStockGoods').then(res => {
          vm.loading = false
        })
      })
    } else {
      next()
    }
  },
  computed: {
    ...mapGetters({
      getStockGoods: 'homepage/getStockGoods'
    }),
    ...mapState('recently-viewed', [
      'items'
    ]),
    recentlyViewed() {
      return this.items.slice(0, 4)
    }
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || i18n.t('404 Page Not Found'),
      meta: this.$route.meta.description ? [{ vmid: 'description', name: 'description', content: this.$route.meta.description }] : []
    }
  }
}
</script>

<style lang="scss" scoped>
#page_not_found {
  margin-top: 40px;
}

.error-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 68px;
  padding: 0 16px;
  border-radius: 4px;
}

.title {
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #1A1919;
  margin-bottom: 16px;

  .highlighted {
    color: #ee2c39;
  }
}

.info-title {
  font-family: DIN Pro;
  font-size: 15px;
  line-height: 24px;
  color: #5F5E5E;
  margin-bottom: 16px;
}

.emojis {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;

  .emoji {
    margin-right: 12px;

    &:last-child {
      margin-right: 0;
    }
  }
}

.button-full.not-found {
  max-width: 131px;
}

.link {
  display: flex;
  justify-content: center;
  width: 100%;
}

.product-info {
  margin-bottom: 68px;
}

.product-info-title {
  display: block;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #1A1919;
  margin-bottom: 32px;
}

@media (max-width: 768px) {
  #page_not_found {
    margin-top: 0px;
  }

  .error-info {
    margin-bottom: 48px;
  }

  .title,
  .info-title {
    text-align: center;
  }

  .button-full.not-found {
    max-width: 320px;
  }

  .product-info {
    margin-bottom: 48px;
  }

  .product-info-title {
    margin-bottom: 24px;
  }
}
</style>
