<template>
  <div class="pharmacy-list">
    <div @scroll="handleScroll">
    <!--<div :class="['scrollme', hideProducts ? 'favorite' : '', !mobNavShow ? 'full' : '']" @scroll="handleScroll">-->
      <!--<h4 class="mt-4" v-if="!favoritFilter || (favoritFilter && filteredDrp.length)">-->
        <!--{{ $t('All pharmacies: ') }} <span>{{ filteredDrp.length }}</span>-->
      <!--</h4>-->
      <!--<h5 v-if="!(filteredDrp && filteredDrp.length) && favoritFilter">-->
      <!--<h5>-->
        <!--{{ $t('You don\'t have any favorite pharmacies. To add a pharmacy to your favorite list, go to') }}-->
        <!--<router-link to="/find-pharmacy">-->
          <!--{{ $t('All pharmacies') }}-->
        <!--</router-link>-->
      <!--</h5>-->
      <availability-sheet
        :key="m.id + index" v-for="(m, index) in droppoints"
        @toggle:favorite="toggleFavorite"
        :id="m.id"
        :stock-id="m.city_id"
        :item="m"
        :hide-products="hideProducts"
        :city="city"
        :products="products"
        :is-favorite="isFavorite(m.id)"
        :items="items"
        :droppoints="droppoints"
        :missing="m.missing"
        :checked="getChecked || shippingDetails.id || ''"
      />
    </div>
  </div>
</template>

<script>
import AvailabilitySheet from '@vue-storefront/theme-default/components/theme/blocks/AvailabilitySheet/AvailabilitySheet'
import { mapGetters } from 'vuex'
import Vue from 'vue'

Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})

export default {
  name: 'PharmacyList',
  props: {
    droppoints: {
      type: Array,
      required: true
    },
    stockId: {
      required: true
    },
    hideProducts: {
      type: Boolean,
      default: false,
      required: false
    },
    city: {
      required: true,
      type: String
    },
    items: {
      type: Array,
      required: true
    },
    products: {
      type: Array,
      required: true
    },
    isProduct: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  components: {AvailabilitySheet},
  data () {
    return {
      shipping: this.$store.state.checkout.shippingDetails,
      hidden: [],
      loading: true,
      filters: [],
      ava: [],
      favorite: [],
      mobNavShow: true
    }
  },
  computed: {
    ...mapGetters({
      shippingDetails: 'checkout/getShippingDetails',
      getFavorite: 'checkout/getFavorite',
      getChecked: 'shipping/getChecked',
      availabilityData: 'availability-sheet/availability'
    }),
    cDroppoints () {
      return this.droppoints.map(this.findMissing)
    },
    filteredDrp () {
      return this.filterDrp()
    },
    favoritFilter () {
      return this.filters.find(f => (f.id === 'favorite' && f.value))
    }
  },
  methods: {
    handleScroll: function (evt, el) {
      if (evt.currentTarget.scrollTop > 50 && window.innerWidth < 420) {
        this.mobNavShow = false
        this.$emit('onScrollShowNav', false)
      } else {
        this.mobNavShow = true
        this.$emit('onScrollShowNav', true)
      }
    },
    isFavorite (id) {
      // return !!this.getFavorite.find(f => f.id === id)
      return false
    },
    findMissing (dp) {
      if (this.hideProducts) {
        dp.missing = []
        return dp
      }

      let skuArr = this.availabilityData ? this.availabilityData.filter(i => i.sku && i.source_code === dp.id).map(i => i.sku) : []
      let currentStock = this.availabilityData ? this.availabilityData.filter(i => i.sku && i.source_code === dp.id) : []
      let outOfStock = this.products.filter(i => !skuArr.includes(i.sku)) || []
      let low = this.products.filter(i => {
        if (currentStock.find(p => p.sku === i.sku)) {
          return currentStock.find(p => p.sku === i.sku)['qty_available'] < i.qty
        }
      }) || []

      dp.favorit = !!(this.getFavorite.length && this.getFavorite.find(f => f.id === dp.id))
      dp.missing = [...new Set([...outOfStock, ...low])]
      return dp
    },
    filterDrp () {
      let result = this.cDroppoints
      this.filters.forEach(filter => {
        if (filter.id === 'round_the_clock') {
          result = [...new Set([...(filter.value ? result.filter(dp => dp.round_the_clock) : this.cDroppoints)])]
        }
        if (filter.id === 'favorite') {
          result = [...new Set([...(filter.value ? result.filter(dp => dp.favorit) : this.cDroppoints)])]
        }
        if (filter.id === 'all_available') {
          result = [...new Set([...(filter.value ? result.filter(dp => !dp.missing.length) : this.cDroppoints)])]
        }
      })

      this.$bus.$emit('drp-after-filtered', {filterLength: this.filters.length, result})
      return result
    },
    filterChanged ({id, value}) {
      const curFilter = this.filters.findIndex(f => f.id === id)
      if (curFilter > -1 && !value) return this.filters.splice(curFilter, 1)
      this.filters.push({id, value})
    },
    getData () {
      let data = {
        inventoryRequest: {
          stockId: this.stockId,
          items: this.items
        },
        algorithmCode: 'priority'
      }
      this.$store.dispatch('availability-sheet/get', data)
    },
    toggleFavorite (params) {
      this[params.action](params.item)
    },
    toFavorite (m) {
      this.$store.dispatch('checkout/saveFavorite', m)
    },
    fromFavorite (m) {
      this.$store.dispatch('checkout/removeFavorite', m)
    }
  },
  async mounted () {
    this.$store.dispatch('checkout/fetchFavorite')
    if (this.items.length && !this.hideProducts && this.stockId) await this.getData()
  },
  watch: {
    getFavorite (val, old) {
      this.favorite = val
    },
    stockId (val, old) {
      this.loading = true
      if (val && (val !== old)) this.getData()
    },
    availabilityData (val, old) {
      this.loading = false
    }
  },
  beforeMount () {
    this.$bus.$on('on-filter-changed', this.filterChanged)
  },
  beforeDestroy () {
    this.$bus.$off('on-filter-changed', this.filterChanged)
  }
}
</script>

<style lang="scss">
  .my-scrollbar {
    position: relative;
    overflow-y: hidden;
    margin: auto;
    width: 100%;
    min-height: 250px;
    max-height: 300px;
  }
  /*The Content*/
  .scrollme{
    overflow-y: auto;
    position: relative;
    margin: auto;
    width: 100%;
    min-height: 250px;
    max-height: 330px;

    @media screen and (max-height: 768px) and (max-width: 420px) {
      .mt-4 {
        display: none;
      }
    }

    &.favorite {
      max-height: 430px;
    }

    h4 {
      font-size: 14px;
      line-height: 21px;
      font-weight: 700;
      color: #19223D;

      span {
        color: #009777;
      }
    }
    h5 {
      a {
        color: #911326;
        border-bottom: 1px dashed #911326;
      }
    }

    .availability-sheet {
      padding: 20px 0 10px;
      border-top: 1px solid #e5e6eb;
      &:nth-child(even) {
        background: #fafafa;
      }
      &:last-child {
        border-bottom: 1px solid #e5e6eb;
      }
      @media screen and (max-height: 768px) and (max-width: 420px) {
        padding: 5px 0;
      }
    }

    & * {
      -webkit-transition: all .3s;
      -moz-transition: all .3s;
      -ms-transition: all .3s;
      -o-transition: all .3s;
      transition: all .3s;
    }

    &::-webkit-scrollbar {
      -webkit-transition: all .3s;
      -moz-transition: all .3s;
      -ms-transition: all .3s;
      -o-transition: all .3s;
      transition: all .3s;
      width: 10px;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      height: 100%;
    }

    &::-webkit-scrollbar-track {
      -webkit-transition: all .3s;
      -moz-transition: all .3s;
      -ms-transition: all .3s;
      -o-transition: all .3s;
      transition: all .3s;
      width: 10px;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      height: 100%;
      &:hover {
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -ms-transition: all .3s;
        -o-transition: all .3s;
        transition: all .3s;
        background: rgba(0,0,0,.1);
      }
    }

    &::-webkit-scrollbar-thumb {
      cursor: pointer;
      -webkit-transition: all .3s;
      -moz-transition: all .3s;
      -ms-transition: all .3s;
      -o-transition: all .3s;
      transition: all .3s;
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      background-color: rgba(0,0,0,.2);
      &:hover {
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -ms-transition: all .3s;
        -o-transition: all .3s;
        transition: all .3s;
        background-color: rgba(0,0,0,.8);
      }
    }
  }
  @media all and (max-width: 550px) {
    .pharmacy-list {
      .scrollme {
        max-height: 350px;
      }
    }
    .availability-sheet {
      .flex-container {
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-align-content: center;
        -ms-flex-line-pack: center;
        align-content: center;
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
      }
      .content {
        .title, .address {
          text-align: center;
        }
        .work-time {
          text-align: center;
          padding-left: 0;
          i {
            position: relative;
            top: 5px;
          }
        }
      }
    }
  }
  @media all and (max-width: 360px) {
    .pharmacy-list {
      .scrollme {
        max-height: 250px;
        &.full {
          max-height: calc(100vh - 350px);
        }
      }
    }
  }
  @media all and (max-height: 820px) {
    .pharmacy-list {
      .scrollme {
        max-height: calc(100vh - 350px);
        &.full {
          max-height: calc(100vh - 210px);
        }
      }
    }
  }
</style>
