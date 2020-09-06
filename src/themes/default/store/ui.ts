export const uiStore = {
  namespaced: true,
  state: {
    sidebar: false,
    sidebar_categories: false,
    sidebar_category_active: null,
    microcart: false,
    wishlist: false,
    searchpanel: false,
    consultation: false,
    newsletterPopup: false,
    overlay: false,
    loader: false,
    authElem: 'login',
    checkoutMode: false,
    openMyAccount: false,
    headerIndex: 3,
    mobileSearch: false,
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
      state.headerIndex = 3
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
      state.headerIndex = 3
      state.sidebar = action === true
      state.overlay = action === true
    },
    setConsultation (state, action) {
      state.headerIndex = 3
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
      state.headerIndex = 3
      state.searchpanel = action === true
      state.overlay = action === true
    },
    setWishlist (state, action) {
      state.headerIndex = 3
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
      state.authElem = action
    },
    setHeaderIndex (state, action) {
      state.headerIndex = action
    },
    setMobileSearch (state, action) {
      state.mobileSearch = action
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
    }
  }
}
