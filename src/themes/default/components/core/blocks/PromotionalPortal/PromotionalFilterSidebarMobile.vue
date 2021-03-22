<template>
  <div class="mobile-filters">
    <div class="close-sidebar" @click="closeSidebar()">
      <svg class="close-sidebar-icon" width="24" height="24" viewBox="0 0 24 24" fill="#23BE20" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.293 17.707L7.58603 12L13.293 6.293L14.707 7.707L10.414 12L14.707 16.293L13.293 17.707Z"/>
      </svg>
      <span class="close-sidebar-text">{{ $t('Back') }}</span>
    </div>
    <sidebar @changeFilter="changeFilter" class="filters"  :class="{'active': filterLength}"/>
    <div
      v-if="filterLength"
      class="active-filters-mobile"
    >
      <span class="selected-products">{{ $tc('{count} promo', getPromotionalsTotal) }}</span>

      <div class="buttons-group">
        <button-full class="buttons-group" @click.native="resetAllFilters()" :aria-label="$t('Clear all')"> {{ $t('Clear all') }}</button-full>
        <button-full class="buttons-group" @click.native="closeSidebar()" :aria-label="$t('show')"> {{ $t('show') }} </button-full>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from 'theme/components/core/blocks/PromotionalPortal/Sidebar.vue';
import ButtonFull from 'theme/components/theme/ButtonFull.vue';
import { mapState, mapGetters } from 'vuex';

export default {
  components: {
    Sidebar,
    ButtonFull
  },
  computed: {
    ...mapState({
      availableFilters: (state) => state.promotional.filtersMap
    }),
    ...mapGetters({
      getCurrentFilters: 'promotional/getCurrentFilters',
      getPromotionalsTotal: 'promotional/getPromotionalsTotal'
    }),
    filterLength () {
      return Object.keys(this.getCurrentFilters).length > 0
    }
  },
  methods: {
    closeSidebar() {
      this.$store.commit('ui/setPromotionalFilterSidebarMobile', false)
    },
    changeFilter(filterVariant) {
      this.$store.dispatch('promotional/switchSearchFilters', [filterVariant])
    },
    resetAllFilters () {
      this.$store.dispatch('promotional/resetSearchFilters')
    }
  }
}
</script>

<style scoped lang="scss">
.mobile-filters {
  height: 100%;
}

.close-sidebar {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 16px 10px;
  border-bottom: 1px solid #E0E0E0;
}

.close-sidebar-icon {
  margin-right: 1px;
}

.close-sidebar-text {
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #23BE20;
}

.sidebar.filters {
  position: relative;
  padding: 16px;
  max-width: 100%;
  height: auto;
  overflow-y: auto;

  &.active {
    height: calc(100% - 165px);
  }

  &::v-deep {
    .sidebar__header {
      &::before {
        content: none!important;
      }
    }
  }
}

.active-filters-mobile {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.25);
  .selected-products{
    display: block;
    text-align: center;
    font-size: 13px;
    line-height: 16px;
    color: #1A1919;
    margin-bottom: 16px;
  }
  .buttons-group{
    display: flex;

    .button-full {
      &:first-child{
        background-color: #fff;
        color: #1A1919;
      }
      &:not(:last-child){
        margin-right: 16px;
      }
      padding-top: 10px;
      padding-bottom: 10px;
      max-height: 40px;
      font-weight: 700;
      min-width: 1px;
      flex: 1;
      display: block;
      text-align: center;
      font-size: 15px;
      max-width: 50%;
      border: 1px solid #23BE20;
      box-sizing: border-box;
      border-radius: 4px;
    }
  }
}
</style>