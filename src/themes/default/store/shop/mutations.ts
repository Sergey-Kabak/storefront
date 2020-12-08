const mutations = {
  SET_SHOPS (state, shops) {
    state.shops = shops
  },

  SET_SELECTED_SHOP (state, selectedShop) {
    state.selectedShop = selectedShop
  },

  SET_CITIES (state, cities) {
    state.cities = cities
  },

  SET_SHOP_SWITCH (state, shopSwitch) {
    state.shopSwitch = shopSwitch
  }
}

export default mutations
