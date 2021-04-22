<template>
  <modal name="modal-city-picker-shop" class="modal">
    <city-picker :search="getCities" :cities="cities" :selectedCity="shopCity" @onChangeCity="changeCity($event)"/>
  </modal>
</template>

<script>
import Modal from 'theme/components/core/Modal.vue';
import CityPicker from "theme/components/core/blocks/CityPicker/CityPicker.vue";
import { mapState } from 'vuex'

export default {
  components: {
    Modal,
    CityPicker
  },
  computed: {
    ...mapState({
      shopCity: (state) => state.ui.shopCity,
      cities: (state) => state.shop.cities
    })
  },
  methods: {
    async changeCity(city) {
      this.$store.commit('shop/SET_SELECTED_SHOP', null)
      this.$store.commit('ui/setShopCity', city)
      this.$bus.$emit('modal-hide', 'modal-city-picker-shop')
      await this.$store.dispatch('shop/getShops', { city, isAllowPickupLocation: false })
      this.$bus.$emit('fit-bounds')
      this.$bus.$emit('close-info-window')
    },
    getCities(city) {
      if (city && city.trim() && city.length >= 3) {
        return this.$store.dispatch('shop/getCities', { city })
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  width: auto;
}
</style>
