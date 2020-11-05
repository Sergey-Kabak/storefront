<template>
  <modal name="modal-custom-city-picker" class="modal-custom-city-picker" :width="533">
    <h3 slot="header" class="align-center px25">
      {{ $t('Choose your city') }}
    </h3>
    <div slot="content" class="modal-custom-city-picker_content">
      <div class="areas-block" v-if="citiesOptions && citiesOptions.length && areasCitiesOptions && areasCitiesOptions.length">
        <div
          class="badge"
          :class="{active: city === item.value}"
          v-for="(item, index) in areasCitiesOptions"
          :key="index"
          @click="onCityClick(item.value)"
        >
          {{ item.value }}
        </div>
      </div>
      <div class="search-block">
        <h4 class="search-block-title">{{ $t('Search') }}</h4>
        <city-select
            class="city-select__wrapper"
            :options="citiesOptions"
            :selected="city"
            @onCityChange="changeCity"
            @onSearch="onSearch"
        />
      </div>
      <div class="action-block">
        <button-full @click.native="onSubmit" :aria-label="$t('To apply')">{{ $t('To apply') }}</button-full>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from 'theme/components/core/Modal.vue';
import CitySelect from 'src/modules/custom-shipping/components/city-select';
import NewPost from 'src/modules/nova-poshta/index';
import { debounce } from 'debounce';
import ButtonFull from 'theme/components/theme/ButtonFull'

export default {
  mixins: [NewPost],
  components: {
    Modal,
    CitySelect,
    ButtonFull
  },
  data () {
    return {
      loading: false,
      cities: [],
      city: 'Київ',
      areasCities: []
    }
  },
  computed: {
    citiesOptions () {
      return this.cities.map(item => {
        return {
          value: item,
          label: item,
          text: item
        }
      })
    },
    areasCitiesOptions () {
      return this.areasCities.map(item => {
        return {
          value: item,
          label: item,
          text: item
        }
      })
    }
  },
  mounted () {
    if (this.$route.name === 'checkout') this.getCityList()
  },
  methods: {
    close () {
      this.$bus.$emit('modal-hide', 'modal-custom-city-picker')
    },
    changeCity (city) {
      this.city = city
    },
    onCityClick(city) {
      this.city = city
    },
    deb: debounce((self, data) => {
      self.searchByString(data)
    }, 300),
    onSearch (data) {
      this.deb(this, data)
    },
    onSubmit () {
      this.close()
      this.$bus.$emit('change-city', this.city)
    }
  },
  watch: {
    '$route.name': function (val, old) {
      if (val === 'checkout') this.getCityList()
    }
  }
}
</script>
<style lang="scss" scoped>
.search-block-title {
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #1A1919;
  margin: 0 0 24px 0;
}

.modal-custom-city-picker {
  .modal-container {
    box-shadow: 0 0 15px rgba(0,0,0,.3);
  }
  h3 {
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    padding: 13px 24px;
    
    margin: 0;
  }

  .modal-header {
    padding: 0;
    border-radius: 4px 4px 0 0;
    background: #fff;
    border-bottom: 1px solid #E0E0E0;
  }
  .modal-content {
    padding: 0;
    border-radius: 0 0 4px 4px;
  }
  &_content {
    padding: 17px 24px 24px 24px;
    .city-select__wrapper {
      padding: 0;
      margin-bottom: 32px;
    }
    .areas-block {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin: 0 -6px 26px -6px;

      .badge {
        cursor: pointer;
        margin: 6px;
        padding: 7px 10px;
        background: #F2F2F2;
        border-radius: 4px;
        font-family: DIN Pro;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        color: #000000;
        border: 1px solid transparent;

        &.active {
          background-color: #fff;
          border: 1px solid #23BE20;
        }

        &:hover:not(.active) {
          border-color: #bdbdbd;
        }

        &:active:not(.active) {
          border-color: #b0b0b0;
        }
      }
    }
  }
}

.button-full {
  max-width: 131px!important;
}
</style>
