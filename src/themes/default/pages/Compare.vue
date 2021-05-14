<template>
  <div v-if="canCompare && compareGroups">
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
        <div class="col-12">
          <div class="products-wrapper">
            <compare-nav @difference="eventHandler"/>
            <div class="products-nav">
              <div class="flex products-category">
                <template v-for="(products, category) in ProductsByCategory">
                  <div :key="category" @click="activeCategory = category">
                    {{category}} : {{products.length}}
                  </div>
                </template>
              </div>
              <div class="flex products-row">
                <template v-for="(product, key) in ProductsByCategory[activeCategory]">
                  <compare-product-tile :key="key" :product="product"/>
                </template>
              </div>
            </div>
          </div>
          <compare-grid
            :data="Specifications"
            :products="ProductsByCategory[activeCategory]" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumbs from '../components/core/Breadcrumbs';
import MobileBreadcrumbs from '../components/core/MobileBreadcrumbs.vue';
import CompareProductTile from '../components/core/blocks/Compare/CompareProductTile';
import CompareGrid from '../components/core/blocks/Compare/CompareGrid';
import CompareNav from '../components/core/blocks/Compare/CompareNav';
import { mapGetters, mapState } from 'vuex';

export default {
  components: {
    Breadcrumbs,
    MobileBreadcrumbs,
    CompareProductTile,
    CompareGrid,
    CompareNav
  },
  data () {
    return {
      activeCategory: null,
      isDifference: false
    }
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
      if (Object.keys(categories).length) {
        this.activeCategory = Object.keys(categories)[0]
      }
      return categories
    },
    GroupsByActiveCategory () {
      return this.findGroupAndAttrs(this.ProductsByCategory[this.activeCategory])
    },
    Specifications () {
      return this.isDifference ? this.GroupsByActiveCategory.uniqAttrsInCategories : this.GroupsByActiveCategory.attrsInCategories
    }
  },
  methods: {
    eventHandler (val) {
      this.isDifference = val
    },
    onlyUnique (value, index, self) {
      return self.indexOf(value) === index;
    },
    getGroups (products) {
      const ids = products.map(p => p.attribute_set_id).filter(this.onlyUnique)
      return ids.reduce((acc, id) => acc.concat(this.compareGroups[id]), [])
    },
    findGroupAndAttrs (products) {
      const groups = this.getGroups(products)
      const attrsInCategories = {}
      groups.forEach(group => {
        for (let k in group) {
          attrsInCategories[k] = {}
          group[k].forEach(attr => {
            let label = ''
            let productAttrs = []
            products.forEach(product => {
              let condition = product.attributes_metadata.find(a => a.attribute_code === attr && a.is_visible_on_front && a.options && a.options.length)
              if (condition && condition.default_frontend_label) {
                label = condition.default_frontend_label;
                productAttrs.push(condition)
              } else {
                productAttrs.push(null)
              }
            })
            if (label !== '') {
              attrsInCategories[k][label] = productAttrs;
            }
          })
        }
      })

      return {
        attrsInCategories: this.removeEmptyGroups(attrsInCategories),
        uniqAttrsInCategories: this.getUniqGroups(attrsInCategories)
      }
    },
    removeEmptyGroups (groups) {
      for (let k in groups) {
        if (!Object.keys(groups[k]).length) {
          delete groups[k]
        }
      }
      return groups
    },
    compareAttributes (attrs) {
      const allItemsHasObject = attrs.every(attr => attr !== null && attr.options && attr.options.length)
      if (allItemsHasObject) {
        let label = attrs[0].options[0].label
        return attrs.every(attr => attr.options[0].label === label)
      }
      return false
    },
    getUniqGroups (groups) {
      const uniqAttrsInCategories = JSON.parse(JSON.stringify(groups))
      Object.keys(uniqAttrsInCategories).forEach(group => {
        Object.keys(uniqAttrsInCategories[group]).forEach(attrs => {
          const isUniq = this.compareAttributes(uniqAttrsInCategories[group][attrs])
          if (isUniq) {
            delete uniqAttrsInCategories[group][attrs]
          }
        })
      })

      return this.removeEmptyGroups(uniqAttrsInCategories)
    }
  }
}
</script>

<style lang="scss" scoped>
.products{
  &-category{
    div{
      cursor: pointer;
    }
  }
  &-nav{
    display: flex;
    flex-direction: column;
  }
  &-row{
    display: flex;
  }
}
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
.products-wrapper{
  display: flex;
}
</style>
