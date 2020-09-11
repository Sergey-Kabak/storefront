export const customShipping = {
    namespaced: true,
    state: {
      type: 'flatrate'
    },
    mutations: {
      changeShippingType (state, action) {
        state.type = action
      },
    },
  }
