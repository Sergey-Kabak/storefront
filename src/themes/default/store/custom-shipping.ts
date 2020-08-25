export const customShipping = {
    namespaced: true,
    state: {
      type: 'shop'
    },
    mutations: {
      changeShippingType (state, action) {
        state.type = action
      },
    },
  }
  