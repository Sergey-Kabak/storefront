export const compareStore = {
  namespaced: true,
  state: {
    currentCategory: null
  },
  mutations: {
    setCurrentCategory (state, payload) {
      state.currentCategory = payload;
    }
  },
  getters: {
    currentCategory: state => state.currentCategory
  },
  actions: {}
}
