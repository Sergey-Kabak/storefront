<template>
  <div v-if="canCompare">
    <div v-for="(products, category) in ProductsByCategory" :key="category">
      {{category}} : {{products.length}}
    </div>
    <div class="v-container">
      <div class="row">
        <div class="col-12">
          <breadcrumbs class="device-desktop" :with-homepage="true" :routes="[]" active-route="Compare" />
          <mobile-breadcrumbs class="device-mobile" withHomepage/>
        </div>
        <div class="col-12">
          <h2 class="page-title font h2 relative">
            {{ $t(title) }}
          </h2>
        </div>
        <div v-if="activeCategory" class="col-12">
          <compare-grid :data="GroupsByCategory" :active="activeCategory" :products="ProductsByCategory[activeCategory]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '../components/core/Breadcrumbs';
import MobileBreadcrumbs from '../components/core/MobileBreadcrumbs.vue';
import CompareGrid from '../components/core/blocks/Compare/CompareGrid';
import { mapGetters, mapState } from 'vuex';

export default {
  components: {
    Breadcrumbs,
    MobileBreadcrumbs,
    CompareGrid
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getCompareItems: 'compare/getCompareItems',
      isCompareLoaded: 'compare/isCompareLoaded'
    }),
    ...mapState({
      compareGroups: state => state.attribute.compareGroups
    }),
    canCompare () {
      if (this.isCompareLoaded && this.getCompareItems.length) {
        const ids = this.getCompareItems.map(p => p.attribute_set_id);
        this.$store.dispatch('attribute/getProductGroups', { ids: ids.filter(this.onlyUnique) })
        return true
      }
    },
    ProductsByCategory () {
      const categories = {}
      this.getCompareItems.forEach(p => {
        typeof categories[p.breadcrumbs[0].name] === 'undefined' && (categories[p.breadcrumbs[0].name] = []);
        categories[p.breadcrumbs[0].name].push(p)
      })
      return categories
    },
    activeCategory () {
      return typeof this.ProductsByCategory !== 'undefined' ? Object.keys(this.ProductsByCategory)[0] : null
    },
    GroupsByCategory () {
      const groups = {}
      if (typeof this.ProductsByCategory === 'object') {
        Object.keys(this.ProductsByCategory).forEach(category => {
          groups[category] = this.findGroupAndAttrs(this.ProductsByCategory[category])
        })
      }
      return groups
    }
  },
  methods: {
    onlyUnique (value, index, self) {
      return self.indexOf(value) === index;
    },
    mergeGroups (groups) {
      const common = {}
      groups.forEach(group => {
        for (let k in group) {
          typeof common[k] === 'undefined' && (common[k] = [])
          Object.assign(common[k], group[k])
        }
      })
      return common
    },
    findGroupAndAttrs (products) {
      if (Object.keys(this.compareGroups).length) {
        const ids = products.map(p => p.attribute_set_id).filter(this.onlyUnique)
        const groups = ids.reduce((acc, id) => acc.concat(this.compareGroups[id]), [])
        const merge = this.mergeGroups(groups);
        const attrsInCategories = []
        products.forEach(p => {
          let productGroup = {}
          for (let k in merge) {
            productGroup[k] = merge[k].map(attr => p.attributes_metadata.find(p => p.attribute_code === attr))
          }
          attrsInCategories.push(productGroup)
        })
        return attrsInCategories
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.device{
  &-desktop{
    @media (max-width: 767px) {
      display: none;
    }
  }
  &-mobile{
    @media (min-width: 768px) {
      display: none;
    }
  }
}
.font {
  font-family: DIN Pro;
  font-style: normal;
  color: #1A1919;
}
.page-title {
  @media (max-width: 767px) {
    line-height: 30px;
    margin: 23px 0 13px 0;
  }
  font-weight: 700;
  line-height: 46px;
  margin: 24px 0;
}
</style>
