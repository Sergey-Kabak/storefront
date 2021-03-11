import {prepareQuery} from '@vue-storefront/core/modules/catalog/queries/common'
import config from 'config'

export const homepageStore = {
  namespaced: true,
  state: {
    new_collection: [],
    bestsellers: [],
    stock_goods: [],
    sales_leaders: [],
    new_products: [],
    recommends: []
  },
  actions: {
    async fetchNewCollection({commit, dispatch}) {
      const newProductsQuery = prepareQuery({queryConfig: 'newProducts'})

      const newProductsResult = await dispatch('product/list', {
        query: newProductsQuery,
        size: 5,
        sort: 'created_at:desc',
        includeFields: config.entities.productList.includeFields,
        excludeFields: config.entities.productList.excludeFields
      }, {root: true})
      const configuredProducts = await dispatch(
          'category-next/configureProducts',
          {products: newProductsResult.items},
          {root: true}
      )
      commit('SET_NEW_COLLECTION', configuredProducts)
    },
    async loadBestsellers({commit, dispatch}) {
      const response = await dispatch('product/list', {
        query: prepareQuery({queryConfig: 'bestSellers'}),
        size: 5,
        sort: 'created_at:desc',
        includeFields: config.entities.productList.includeFields,
        excludeFields: config.entities.productList.excludeFields
      }, {root: true})

      commit('SET_BESTSELLERS', response.items)
    },
    async loadStockGoods({commit, dispatch}) {
      const response = await dispatch('product/list', {
        query: prepareQuery({queryConfig: 'stockGoods'}),
        size: 5,
        sort: 'created_at:desc',
        includeFields: config.entities.productList.includeFields,
        excludeFields: config.entities.productList.excludeFields
      }, {root: true})

      commit('SET_STOCK_GOODS', response.items)
    },
    async loadSalesLeaders({commit, dispatch}) {
      const response = await dispatch('product/list', {
        query: prepareQuery({queryConfig: 'salesLeaders'}),
        size: 5,
        sort: 'created_at:desc',
        includeFields: config.entities.productList.includeFields,
        excludeFields: config.entities.productList.excludeFields
      }, {root: true})

    commit('SET_SALES_LEADERS', response.items)
    },
    async loadNew({commit, dispatch}) {
      const response = await dispatch('product/list', {
        query: prepareQuery({queryConfig: 'new'}),
        size: 5,
        sort: 'created_at:desc',
        includeFields: config.entities.productList.includeFields,
        excludeFields: config.entities.productList.excludeFields
      }, {root: true})

      commit('SET_NEW', response.items)
    },
    async loadRecommends({commit, dispatch}) {
      const response = await dispatch('product/list', {
        query: prepareQuery({queryConfig: 'recommends'}),
        size: 5,
        sort: 'created_at:desc',
        includeFields: config.entities.productList.includeFields,
        excludeFields: config.entities.productList.excludeFields
      }, {root: true})

      commit('SET_RECOMMENDS', response.items)
    },
  },
  mutations: {
    SET_NEW_COLLECTION(state, products) {
      state.new_collection = products || []
    },
    SET_BESTSELLERS(state, bestsellers) {
      state.bestsellers = bestsellers
    },
    SET_STOCK_GOODS(state, products) {
      state.stock_goods = products || []
    },
    SET_SALES_LEADERS(state, products) {
      state.sales_leaders = products || []
    },
    SET_NEW(state, products) {
      state.new_products = products || []
    },
    SET_RECOMMENDS(state, products) {
      state.recommends = products || []
    },
  },
  getters: {
    getEverythingNewCollection(state) {
      return state.new_collection
    },
    getBestsellers(state) {
      return state.bestsellers
    },
    getStockGoods(state) {
      return state.stock_goods
    },
    getSalesLeaders(state) {
      return state.sales_leaders
    },
    getNew(state) {
      return state.new_products
    },
    getRecommends(state) {
      return state.recommends
    },
  }
}
