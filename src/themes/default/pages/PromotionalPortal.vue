<template>
  <div class="promotional-portal">
    <div class="v-container">
      <mobile-breadcrumbs withHomepage class="mobile-breadcrumbs" />
      <breadcrumbs class="breadcrumbs" :with-homepage="true" :routes="[]" :active-route="$t('promo')"/>
      <h1 class="title">{{ $t('promo') }}</h1>
      <div class="mobile-actions">
        <sort-by-mobile @change="changeFilter"/>
        <button-full class="mobile-filters-button" @click.native="openFilters">{{ $t('Filters') }}<span v-if="filtersLength">{{ filtersLength }}</span> </button-full>
      </div>
      <div class="promotional-content">
        <div class="promotional-filters">
          <span class="products-count">{{ $tc('{count} promo', getPromotionalsTotal) }}</span>
          <sidebar class="sidebar" @changeFilter="changeFilter"/>
        </div>
        <div class="promo-list">
          <sort-by class="sort" @change="changeFilter" />
          <promotional-listing :promotionals="promotionals" class="listing"/>
          <button-full v-if="isAllPromotionalsLoaded" @click.native="loadMore()" class="load-more">{{ $t('Load more') }}</button-full>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from 'theme/components/core/Breadcrumbs.vue';
import PromoSidebar from 'theme/components/core/blocks/PromotionalPortal/PromotionalSidebar.vue';
import PromotionalListing from 'theme/components/core/blocks/PromotionalPortal/PromotionalListing.vue';
import Sidebar from 'theme/components/core/blocks/PromotionalPortal/Sidebar.vue';
import NewSortBy from 'theme/components/core/NewSortBy.vue';
import { mapGetters, mapState } from 'vuex';
import SortBy from 'theme/components/core/blocks/PromotionalPortal/SortBy.vue'
import SortByMobile from 'theme/components/core/blocks/PromotionalPortal/SortByMobile.vue'
import ButtonFull from 'theme/components/theme/ButtonFull'
import MobileBreadcrumbs from 'theme/components/core/MobileBreadcrumbs.vue';

export default {
  components: {
    Breadcrumbs,
    PromoSidebar,
    PromotionalListing,
    Sidebar,
    NewSortBy,
    SortBy,
    SortByMobile,
    ButtonFull,
    MobileBreadcrumbs
  },
  async asyncData ({ store, context, route }) {
    if (context) context.output.cacheTags.add(`promotional`)
    await store.dispatch('promotional/loadPromotionalAttributes')
    await store.dispatch('promotional/loadPromotionalList', route)
  },
  computed: {
    ...mapState({
      promotionals: (state) => state.promotional.promotionals
    }),
    ...mapGetters({
      getCurrentSearchQuery: 'promotional/getCurrentSearchQuery',
      getPromotionalsTotal: 'promotional/getPromotionalsTotal',
      getPromotionalSearchStats: 'promotional/getPromotionalSearchStats'
    }),
    filtersLength() {
      return Object.keys(this.getCurrentSearchQuery.filters).length
    },
    isAllPromotionalsLoaded () {
      return this.getPromotionalSearchStats.perPage + this.getPromotionalSearchStats.start < this.getPromotionalSearchStats.total
    }
  },
  methods: {
    changeFilter(filterVariant) {
      this.$store.dispatch('promotional/switchSearchFilters', [filterVariant])
    },
    openFilters() {
      this.$store.commit('ui/setPromotionalFilterSidebarMobile', true)
    },
    loadMore() {
      this.$store.dispatch('promotional/loadMorePromotionals')
    }
  }
}
</script>

<style lang="scss" scoped>
.v-container {
  padding-bottom: 68px;
}

.mobile-actions {
  display: none;

  .sort-by {
    margin-right: 16px;
  }

  .button-full {
    background: #fff;
    border: 1px solid #23BE20;
    color: #000000;
  }

  .sort-by,
  .button-full {
    width: 50%;
    max-width: 100%;
  }
}

.promo-list {
  width: 100%;
}

.breadcrumbs {
  margin-bottom: 24px;
}

.title {
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 36px;
  line-height: 46px;
  color: #1A1919;
  margin: 0 0 24px 0;
}

.promotional-content {
  display: flex;
  align-items: flex-start;
}

.promotional-filters {
  box-sizing: border-box;
  max-width: 319px;
  min-width: 240px;
  width: 100%;
  margin-right: 20px;
}

.sidebar {
  margin-right: 20px;
}

.products-count {
  display: block;
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #1A1919;
  margin-bottom: 29px;
}

.mobile-filters-button.button-full {
  background: #FFFFFF;
  border: 1px solid #23BE20;
  box-sizing: border-box;
  font-weight: 700;
  border-radius: 4px;
  font-family: DIN Pro;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #000000;
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: DIN Pro;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: #FFFFFF;
    background: #23BE20;
    border-radius: 100%;
    min-width: 24px;
    min-height: 24px;
    margin-left: 7px;
  }
}

.button-full.load-more {
  margin: 32px auto 0 auto;
  background: #FFFFFF;
  border: 1px solid #23BE20;
  font-family: DIN Pro;
  font-size: 15px;
  line-height: 16px;
  color: #000000;
  
  &:hover {
    background-color: #23BE20;
    color: #fff;
  }
}

.mobile-breadcrumbs {
  display: none;
}

@media (max-width: 768px) {
  .title {
    font-size: 24px;
    line-height: 30px;
  }

  .mobile-breadcrumbs.breadcrumbs {
    display: block;
  }

  .breadcrumbs {
    display: none;
  }

  .promotional-filters {
    display: none!important;
  }

  .promo-sort.sort {
    display: none;
  }

  .mobile-actions {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .listing.promotional-listing {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 470px) {
  .listing.promotional-listing {
    grid-template-columns: 1fr;
  }
}

</style>
