<template>
  <div class="gradient-wrapper" @click="changeFilter(variant)">
    <div class="category-filter-item" :class="{ 'active': isActive }">
      <div class="category-filter-icon" v-if="ico[variant.id]" v-html="ico[variant.id]"></div>
      <div class="category-filter-label">{{variant.label}}</div>
    </div>
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
.gradient-wrapper{
  background: linear-gradient(180deg, #EE2C39 0%, #FF5D81 55.73%);
  border-radius: 4px;
  padding: 1px;
  margin: 0 auto;
  cursor: pointer;
  width: 138px;
  height: 100px;
}
.category-filter {
  &-item{
    &.active{
      background: linear-gradient(180deg, #EE2C39 0%, #FF5D81 55.73%);
      .category-filter-label{
        color: #fff;
      }
      category-filter-icon{
        fill: #fff;
      }
    }
    padding: 12px;
    background: #fff;
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 4px;
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
    margin-top: auto;
  }
}
</style>
