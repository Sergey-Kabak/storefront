<template>
  <modal name="modal-city-picker-product" class="modal">
    <city-picker :search="getCities" :cities="cities" :selectedCity="city" @onChangeCity="changeCity($event)" />
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
      city: (state) => state.ui.city,
      cities: (state) => state.checkoutPage.cities
    })
  },
  methods: {
    changeCity(city) {
      this.$bus.$emit('modal-hide', 'modal-city-picker-product')
      this.$store.commit('ui/setCity', city)
    //   this.$store.dispatch('checkoutPage/init')
    },
    getCities(city) {
      if (city && city.trim() && city.length >= 3) {
        return this.$store.dispatch('checkoutPage/getCities', { city })
      }
      return []
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  width: auto;
}
</style>
