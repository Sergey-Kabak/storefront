<template>
  <modal name="modal-city-picker" class="modal">
    <div class="city-picker">
      <div class="city-picker-top">
        <span class="city-picker-title">{{ $t('Choose your city') }}</span>
        <svg @click="closePopup()" class="close-icon" fill="#BDBDBD" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" />
        </svg>
      </div>
      <city-list :cities="cities" :selectedCity="selectedCity" @onSelectCity="onChooseCity($event)" />
      <div class="search">
        <span class="search-title">{{ $t('Search') }}</span>
        <autocomplete :placeholder="$t('Choose your city')" class="search-autocomplete" :debounce-time="500" :search="getCities" :get-result-value="getResultValue" @submit="onChooseCity">
          <template #result="{ result, props }">
            <li
              v-bind="props"
              class="city-result"
            >
              <span class="city-title" v-html="highlight(result)" />
            </li>
          </template>
        </autocomplete>
        <button-full @click.native="changeCity()">{{ $t('To apply') }}</button-full>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from 'theme/components/core/Modal.vue';
import CityList from 'theme/components/core/blocks/CityPicker/CityList'
import vSelect from 'vue-select'
import ButtonFull from 'theme/components/theme/ButtonFull'
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
import { mapState } from 'vuex'

export default {
  components: {
    Modal,
    CityList,
    vSelect,
    ButtonFull,
    Autocomplete
  },
  data: () => ({
    cities: ['Київ', 'Бровари', 'Львів', 'Івано-Франківськ', 'Одеса', 'Николаев', 'Полтава', 'Рівне', 'Суми', 'Кропивницкий', 'Черкаси'],
    query: null,
    selectedCity: null
  }),
  computed: {
    ...mapState({
      defaultCity: (state) => state.ui.defaultCity
    })
  },
  mounted: function() {
    this.selectedCity = this.defaultCity
  },
  methods: {
    closePopup() {
      this.$bus.$emit('modal-hide', 'modal-city-picker')
    },
    getCities(query) {
      this.query = query
      if (query && query.length >= 3) {
        return this.$store.dispatch('shop/getCities', query)
      }
      return []
    },
    getResultValue(it) {
      return it
    },
    highlight(result) {
      let query = this.query.toLowerCase()

      if (!result.search(new RegExp(query, 'gi'))) {
        query = query.charAt(0).toUpperCase() + query.slice(1)
      }
      return result.replace(new RegExp(query, 'gi'), `<span class='highlight'>${query}</span>`)
    },
    onChooseCity(event) {
      this.selectedCity = typeof event === 'object' ? event.city : event
    },
    async changeCity() {
      this.closePopup()
      this.$store.commit('shop/SET_SELECTED_SHOP', null)
      this.$store.commit('ui/setDefaultCity', this.selectedCity)
      await this.$store.dispatch('shop/getShops', this.selectedCity)
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
  padding: 0 24px 24px;
}

.search-title {
  display: block;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #1A1919;
  margin-bottom: 24px;
}

.search-autocomplete {
  margin-bottom: 32px;

  ::v-deep {
    .autocomplete[data-loading=true]:after {
      border-right-color: #23BE20;
    }

    .highlight {
      color: #23BE20;
    }

    .autocomplete-input {
      border: 1px solid #E0E0E0;
      background: #FFFFFF;
      border-radius: 4px;
      padding: 12px 16px;
      font-family: DIN Pro;
      font-size: 14px;
      line-height: 16px;
      color: #1A1919;


      &:focus {
        box-shadow: none;
        border-color: #23BE20;
      }
    }

    .autocomplete-result-list {
      margin-top: 3px;
      box-shadow: none;
      border: 1px solid #E0E0E0;
      border-radius: 4px;
    }
  }
}

.city-result {
  cursor: pointer;
  padding: 8px 16px;
  background: transparent;
  font-family: DIN Pro;
  font-size: 14px;
  line-height: 16px;
  color: #1A1919;

  &:hover {
    background-color: #F9F9F9;
  }
}

.button-full {
  max-width: 131px;
}

</style>