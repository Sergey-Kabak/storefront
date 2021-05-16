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
        <div class="col-12 scroll">
          <div class="compare-container">
            <div class="products-wrapper">
              <compare-nav @difference="eventHandler"/>
              <div class="products-nav">
                <div class="device-mobile mobile-select">
                  <select @change="onChange($event)">
                    <option v-for="option in Object.keys(ProductsByCategory)"
                            :key="option"
                            :value="option"
                    >{{option}}</option>
                  </select>
                </div>
                <div class="flex products-category device-desktop">
                  <strong>{{$t('compare')}}:</strong>
                  <template v-for="(products, category) in ProductsByCategory">
                    <div :key="category" @click="activeCategory = category" :class="{active: activeCategory === category}">
                      {{category}} ({{products.length}})
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
              :products="ProductsByCategory[activeCategory]"
              @difference="eventHandler"
              class="compare-grid" />
          </div>
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
import Compare from '@vue-storefront/core/pages/Compare';
import i18n from '@vue-storefront/i18n';

export default {
  mixins: [Compare],
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
      isCompareLoaded: 'compare/isCompareLoaded',
      isEmpty: 'compare/getCompareProductsCount'
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
    onChange (val) {
      this.activeCategory = val.target.value;
    },
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
              // let condition = product.attributes_metadata.find(a => a.attribute_code === attr && a.is_visible_on_front && a.options && a.options.length)
              let condition = product.attributes_metadata.find(a => a.attribute_code === attr)
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
      const res = []
      attrs.forEach((attr, index) => {
        if (attr !== null) {
          res.push(this.getAttrValue(attr, this.ProductsByCategory[this.activeCategory][index]));
        } else {
          res.push(null);
        }
      })
      return res.filter(this.onlyUnique).length === 1
    },
    getAttrValue (attribute, product) {
      let parsedValues = product[attribute.attribute_code]

      if (!parsedValues) {
        return 'N/A'
      } else if (attribute.frontend_input !== 'multiselect' && attribute.frontend_input !== 'select') {
        return parsedValues.toString()
      } else {
        parsedValues = typeof parsedValues === 'string' ? parsedValues.split(',') : parsedValues

        if (!Array.isArray(parsedValues)) {
          parsedValues = [parsedValues]
        }

        let results = []
        for (let parsedVal of parsedValues) {
          if (attribute.options) {
            let option = attribute.options.find(av => {
              /* eslint eqeqeq: "off" */
              return av.value == parsedVal
            })
            if (option) {
              results.push(option.label)
            } else {
              results.push(parsedVal)
            }
          } else {
            results.push(parsedVal)
          }
        }
        return results.join(', ')
      }
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
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || this.title || i18n.t('Compare Products'),
      meta: this.$route.meta.description
        ? [{ vmid: 'description', description: this.$route.meta.description }]
        : []
    }
  },
  async asyncData ({ store }) {
    const products = store.getters['compare/getCompareItems']
    if (products.length) {
      for (let k in products) {
        await store.dispatch('product/loadProductAttributes', { product: products[k] })
      }
    }
  },
  watch: {
    'isEmpty': function (val) {
      if (!val) {
        this.$router.push({ name: 'home' });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.products-nav{
  position: relative;
}
.mobile-select{
  position: sticky;
  left: 0;
  width: calc(100vw - 44px);
  select{
    width: 100%;
    border: 1px solid #E0E0E0;
    border-radius: 4px;
    margin-bottom: 16px;
  }
}
.scroll{
  overflow: auto;
  margin-bottom: 68px;
}
.compare-container{
  width: auto;
  max-width: max-content !important;
}
.compare-grid{
  position: relative;
  width: max-content;
}
.products-row{
  ::v-deep .product{
    @media (max-width: 768px) {
      width: calc(50vw - 22px);
      min-width: calc(50vw - 22px);
    }
    width: 330px;
    min-width: 330px;
    box-sizing: border-box;
    &:not(:first-child){
      border-left: none;
    }
  }
}
.products-category{
  display: flex;
  align-items: flex-start;
  margin-bottom: 24px;
  *{
    font-family: DIN Pro;
    font-style: normal;
  }
  strong{
    margin-right: 12px;
    font-size: 14px;
    line-height: 16px;
    color: #1A1919;
  }
  div{
    font-weight: 0;
    font-size: 13px;
    line-height: 16px;
    color: #5F5E5E;
    opacity: 0.6;
    padding-bottom: 4px;
    border-bottom: 1px solid transparent;
    &:not(:last-child){
      margin-right: 20px;
    }
    &:not(.active):hover{
      opacity: 1;
    }
    &.active{
      opacity: 1;
      color: #1A1919;
      border-bottom-color: #1A1919;
    }
  }
}
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
    @media (max-width: 768px) {
      display: none;
    }
  }
  &-mobile{
    @media (min-width: 769px) {
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
  margin-bottom: 24px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
}
</style>
