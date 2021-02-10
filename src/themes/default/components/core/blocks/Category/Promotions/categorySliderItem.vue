<template>
  <div class="category-filter-item" :class="{ 'active': isActive }" @click="changeFilter(variant)">
    <div class="category-filter-icon" v-html="ico[956]"></div>
    <div class="category-filter-label">{{variant.label}}</div>
  </div>
</template>

<script>
import SidebarMenu from '../../SidebarMenu/SidebarMenu';
import filterMixin from 'theme/mixins/filterMixin.ts';
import { mapGetters } from 'vuex';

export default {
  mixins: [filterMixin],
  components: {
    SidebarMenu
  },
  computed: {
    ...mapGetters({
      getAvailableFilters: 'category-next/getAvailableFilters'
    }),
    ico () {
      return SidebarMenu.data().ico
    }
  },
  methods: {
    async changeFilter (filterVariant) {
      this.$store.dispatch('category-next/switchSearchFilters', [filterVariant])
    }
  }
}
</script>

<style lang="scss" scoped>
.category-filter {
  &-item{
    &.active{
      background-image: url('data:image/jpeg;base64,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');
    }
    margin: 0 auto;
    padding: 12px;
    background: #F6F7FA;
    border-radius: 4px;
    width: 138px;
    height: 100px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }
  &-icon{
    margin-bottom: auto;
  }
  &-label{
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 20px;
    color: #1A1919;
  }
}
</style>
