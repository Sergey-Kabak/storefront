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
            <div class="compare-nav">
              <div class="compare-nav__text font weight-400">
                {{ $tc(`added {count} items`, getCompareItems.length) }}
              </div>
              <div class="compare-nav__link font">{{ $t('add more to compare') }}</div>
              <div class="compare-nav__text font underline">
                {{ $t('Remove all') }}
              </div>
              <div class="compare-nav__buttons">
                <span>{{ $t('indicate') }}</span>
                <div class="buttons-group">
                  <button :class="{'active' : !isDifference}" type="button" :aria-label="$t('All parameters')">
                    {{ $t('All parameters') }}
                  </button>
                  <button :class="{'active' : isDifference}" type="button" :aria-label="$t('Differences')">
                    {{ $t('Differences') }}
                  </button>
                </div>
              </div>
            </div>
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
          <compare-grid :data="GroupsByActiveCategory" :active="activeCategory" :products="ProductsByCategory[activeCategory]" />
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
import { mapGetters, mapState } from 'vuex';

export default {
  components: {
    Breadcrumbs,
    MobileBreadcrumbs,
    CompareProductTile,
    CompareGrid
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
    }
  },
  methods: {
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
              let condition = product.attributes_metadata.find(a => a.attribute_code === attr && a.is_visible_on_front && a.options)
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
      for (let k in attrsInCategories) {
        if (!Object.keys(attrsInCategories[k]).length) {
          delete attrsInCategories[k]
        }
      }
      console.log(attrsInCategories);
      return attrsInCategories
    }
  },
  mounted() {
    this.$store.dispatch('attribute/list', { filterValues: [], size: 1000 })
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
.font {
  font-family: DIN Pro;
  font-style: normal;
  font-size: 13px;
  line-height: 16px;
}
.compare-nav{
  width: 336px;
  min-width: 336px;
  padding-right: 20px;
  &__text {
    color: #1A1919;
    display: inline-block;
    margin-bottom: 29px;

    &.underline {
      cursor: pointer;
      padding-bottom: 3px;
      border-bottom: 1px dashed;

      &:hover {
        border-bottom-color: transparent;
      }
    }
  }

  &__link {
    cursor: pointer;
    color: #23BE20;
    display: inline-block;
    padding-bottom: 3px;
    border-bottom: 1px dashed #23BE20;
    margin-bottom: 16px;

    &:hover {
      border-bottom-color: transparent;
    }
  }
}
.compare-nav__buttons {
  @media (max-width: 767px) {
    padding: 0 16px;
  }
  margin-top: auto;
  width: 100%;

  & > span {
    font-family: DIN Pro;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    color: #1A1919;
    display: block;
    margin-bottom: 16px;
  }

  .buttons-group {
    @media (max-width: 767px) {
      margin-bottom: 16px;
    }
    display: flex;
    background: #F2F2F2;
    border-radius: 4px;
    height: 32px;

    button {
      flex: 1;
      background-color: transparent;
      border: 1px solid transparent;
      border-radius: 4px;
      outline: none;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;
      text-align: center;
      color: #1A1919;

      &.active {
        border-color: #23BE20;
        background-color: #fff;
      }
    }
  }
}
</style>
