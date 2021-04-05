<template>
  <modal name="modal-city-shop-picker" class="modal">
    <div class="city-picker">
      <div class="city-picker-top">
        <span class="city-picker-title">{{ $t('Choose your city') }}</span>
        <svg @click="closePopup()" class="close-icon" fill="#BDBDBD" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
        </svg>
      </div>
      <city-list 
        :cities="defaultCities"
        :selectedCity="selectedCity"
        @onSelectCity="onChooseCity($event)"
      />
      <span class="search-title">{{ $t('Search') }}</span>
      <div class="search">
        <autocomplete 
          :placeholder="$t('Choose your city')" 
          class="search-autocomplete"
          :options="cities"
          :selectedValue="selectedCity"
          :search="getCities"
          @submit="onChooseCity($event, false)"
        />
        <button-full @click.native="changeCity()">{{ $t('To apply') }}</button-full>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from 'theme/components/core/Modal.vue';
import CityList from 'theme/components/core/blocks/CityShopPicker/CityList'
import ButtonFull from 'theme/components/theme/ButtonFull'
import Autocomplete from 'theme/components/core/blocks/Form/Autocomplete'
import { mapState } from 'vuex'

export default {
  components: {
    Modal,
    CityList,
    ButtonFull,
    Autocomplete
  },
  data: () => ({
    defaultCities: ['Київ', 'Бровари', 'Львів', 'Івано-Франківськ', 'Одеса', 'Миколаїв', 'Полтава', 'Рівне', 'Суми', 'Кропивницький', 'Черкаси'],
    query: null,
    selectedCity: null
  }),
  computed: {
    ...mapState({
      shopCity: (state) => state.ui.shopCity,
      cities: (state) => state.shop.cities
    })
  },
  mounted: function() {
    this.selectedCity = this.shopCity
  },
  methods: {
    closePopup() {
      this.$bus.$emit('modal-hide', 'modal-city-shop-picker')
    },
    getCities(query) {
      this.query = query
      if (query && query.trim() && query.length >= 3) {
        return this.$store.dispatch('shop/getCities', { city: query })
      }
      return []
    },
    onChooseCity(result, closeSidebar = true) {
      this.selectedCity = result.value || result
      this.$store.commit('shop/SET_CITIES', [])
      if (closeSidebar) {
        this.changeCity()
      }
    },
    async changeCity() {
      this.closePopup()
      this.$store.commit('shop/SET_SELECTED_SHOP', null)
      this.$store.commit('ui/setShopCity', this.selectedCity)
      await this.$store.dispatch('shop/getShops', { city: this.selectedCity, isAllowPickupLocation: false })
      this.$bus.$emit('fit-bounds')
      this.$bus.$emit('close-info-window')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  width: auto;
}

.search-autocomplete {
  margin-right: 16px;
  width: 100%;
}

.city-picker {
  margin: auto;
  max-width: 533px;
  min-width: 320px;
  width: 100%;
  background: #fff;
}

.city-picker-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #E0E0E0;
  padding: 16px 24px;
}

.city-picker-title {
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #1A1919;
}

.close-icon {
  transition: .2s ease-in-out;
  cursor: pointer;

  &:hover {
    fill: #1A1919;
  }
}

.search {
  padding: 0 24px 24px 24px;
  display: flex;
  align-items: baseline;
}

.search-title {
  padding: 0 24px 24px;
  display: block;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #1A1919;
  margin-bottom: 24px;
}

.button-full {
  max-width: 153px;
  width: 100%;
}

@media (max-width: 768px) {
  .search {
    flex-direction: column;
    padding: 0 16px 16px 16px;
  }

  .search-title {
    padding: 0 16px 16px;
  }

  .search-autocomplete {
    margin-bottom: 24px;
  }

  .button-full {
    max-width: 100%;
  }
}
</style>
