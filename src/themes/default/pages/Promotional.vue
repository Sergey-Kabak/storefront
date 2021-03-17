<template>
  <div class="promotional">
    <div class="v-container">
      <mobile-breadcrumbs withHomepage class="mobile-breadcrumbs" />
      <breadcrumbs withHomepage :routes="[{ name: $t('promo'), route_link: '/promo'}]" :activeRoute="promotional.name" />
      <span class="promotional-title">{{ promotional.name }}</span>
       <div class="promotional-description" itemprop="description" v-html="promotional.description" />
       <recently-viewed :maxLength="5" />
    </div>
  </div>
</template>

<script>
import { Logger } from '@vue-storefront/core/lib/logger';
import { mapState } from 'vuex';
import Breadcrumbs from 'theme/components/core/Breadcrumbs.vue'
import RecentlyViewed from 'theme/components/core/blocks/PromotionalPortal/RecentlyViewed.vue'
import { RecentlyViewedModule } from '@vue-storefront/core/modules/recently-viewed';
import { registerModule } from '@vue-storefront/core/lib/modules';
import MobileBreadcrumbs from 'theme/components/core/MobileBreadcrumbs.vue';

export default {
  components: {
    Breadcrumbs,
    RecentlyViewed,
    MobileBreadcrumbs
  },
  beforeCreate () {
    registerModule(RecentlyViewedModule)
  },
  async asyncData({ context, store, route }) {
    if (context) context.output.cacheTags.add('promotional')
    try {
      await store.dispatch('promotional/loadPromotional', route.params.link)
    } catch (e) {
      Logger.error(e)()
      throw e
    }
  },
  computed: {
    ...mapState({
      promotional: (state) => state.promotional.promotional
    })
  }
}
</script>

<style lang="scss" scoped>
.breadcrumbs {
  margin-bottom: 24px;
}

.promotional-title {
  display: block;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 36px;
  line-height: 46px;
  color: #1A1919;
  margin-bottom: 24px;
}

.promotional-description ::v-deep {
  h1,h2,h3,h4,h5,h6 {
    font-family: DIN Pro;
    font-size: 24px;
    line-height: 30px;
    color: #1A1919;
    margin: 68px 0 32px 0;
  }

  p {
    font-family: DIN Pro;
    font-size: 15px;
    line-height: 24px;
    color: #5F5E5E;
    margin-bottom: 32px;

    &:last-child {
      margin: 0 0 32px 0;
    }
  }

  img {
    display: block;
    margin: auto;
  }
}

.mobile-breadcrumbs {
  display: none;
}

@media (max-width: 768px) {
  .mobile-breadcrumbs.breadcrumbs {
    display: block;
  }

  .breadcrumbs {
    display: none;
  }

  .promotional-title {
    font-size: 24px;
    line-height: 30px;
  }
}
</style>