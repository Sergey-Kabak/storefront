import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import { Logger } from '@vue-storefront/core/lib/logger'

export const uiStore = {
  namespaced: true,
  state: {
    sidebar: false,
    sidebar_categories: false,
    sidebar_category_active: null,
    microcart: false,
    wishlist: false,
    signUp: false,
    compare_sidebar: false,
    searchpanel: false,
    consultation: false,
    newsletterPopup: false,
    overlay: false,
    loader: false,
    authElem: 'login',
    shopCity: 'Київ',
    city: 'Київ',
    checkoutMode: false,
    openMyAccount: false,
    headerIndex: 3,
    isSearchActive: false,
    submenu: {
      depth: false,
      path: []
    }
  },
  mutations: {
    setCheckoutMode (state, action) {
      state.checkoutMode = action === true
    },
    setMicrocart (state, action) {
      state.isSearchActive = false
      state.microcart = action === true
      state.overlay = action === true
    },
    setSidebarCategories (state, action) {
      console.log('MUTATION -> setSidebarCategories');
      state.sidebar_categories = action === true
    },
    setActiveCaterory(state, id) {
      console.log('MUTATION -> setActiveCaterory');
      state.sidebar_category_active = id
    },
    setSidebar (state, action) {
      state.isSearchActive = false
      state.sidebar = action === true
      state.overlay = action === true
    },
    setConsultation (state, action) {
      state.isSearchActive = false
      state.consultation = action === true
      state.overlay = action === true
    },
    setSubmenu (state, { id, depth }) {
      if (id) {
        state.submenu.path.push(id)
      } else if (state.submenu.path.length) {
        setTimeout(() => {
          state.submenu.path.pop()
        }, 300)
      }
      state.submenu.depth = state.submenu.depth > 0 && depth
    },
    setSearchpanel (state, action) {
      state.searchpanel = action === true
      state.overlay = action === true
    },
    setCompareSidebar (state, action) {
      state.compare_sidebar = action === true
      state.overlay = action === true
    },
    setWishlist (state, action) {
      state.isSearchActive = false
      state.wishlist = action === true
      state.overlay = action === true
    },
    setOverlay (state, action) {
      state.overlay = action === true
    },
    setLoader (state, action) {
      state.loader = action === true
    },
    setAuthElem (state, action) {
      state.isSearchActive = false
      state.authElem = action
    },
    setSignUp (state, action) {
      state.signUp = action === true
      state.overlay = action === true
    },
    setSearch (state, action) {
      state.isSearchActive = action === true
      state.overlay = action === true
    },
    setShopCity (state, action) {
      state.shopCity = action
    },
    setCity (state, city) {
      StorageManager.get('checkout').setItem('city', city).catch((reason) => {
        Logger.error(reason)()
      })
      state.city = city
    }
  },
  actions: {
    toggleMicrocart ({ commit, state }) {
      commit('setMicrocart', !state.microcart)
    },
    toggleWishlist ({ commit, state }) {
      commit('setWishlist', !state.wishlist)
    },
    toggleConsultation ({ commit, state }) {
      commit('setConsultation', !state.consultation)
    },
    closeMicrocart ({ commit, state }) {
      if (state.microcart) commit('setMicrocart', false)
    },
    closeWishlist ({ commit, state }) {
      if (state.wishlist) commit('setWishlist', false)
    },
    closeSignUp ({ commit, state }) {
      if (state.signUp) commit('setSignUp', false)
    }
  }
}
