<template>
  <modal name="modal-custom-city-picker" class="modal-custom-city-picker" :width="550">
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
        <h4>{{ $t('Search') }}</h4>
        <city-select
            class="city-select__wrapper"
            :options="citiesOptions"
            :selected="city"
            @onCityChange="changeCity"
            @onSearch="onSearch"
        />
      </div>
      <div class="action-block">
        <button @click="onSubmit" class="action">{{ $t('To apply') }}</button>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from 'theme/components/core/Modal.vue'
import CitySelect from 'src/modules/custom-shipping/components/city-select'
import NewPost from 'src/modules/nova-poshta/index';
import {debounce} from 'debounce';

export default {
  mixins: [NewPost],
  components: {
    Modal,
    CitySelect
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
    this.getCityList()
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
  }
}
</script>
<style lang="scss">
  .modal-custom-city-picker {
    .modal-container {
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      -webkit-box-shadow: 0 0 15px rgba(0,0,0,.3);
      -moz-box-shadow: 0 0 15px rgba(0,0,0,.3);
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
    h4 {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      color: #000000;
      margin: 30px 0 10px;
      padding: 0;
    }
    .modal-header {
      padding: 0;
    }
    .modal-content {
      padding: 0;
    }
    &_content {
      padding: 24px;
      .city-select__wrapper {
        padding: 0;
      }
      .areas-block {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        margin: 0 -5px;
        .badge {
          cursor: pointer;
          margin: 5px;
          padding: 8px;
          background: #F2F2F2;
          border-radius: 4px;
          font-family: DIN Pro;
          font-weight: 700;
          font-size: 14px;
          line-height: 16px;
          color: #000000;
          border: 1px solid transparent;
          &.active {
            background-color: transparent;
            border: 1px solid #23BE20;
          }
        }
      }
      .action {
        background: #23BE20;
        border-radius: 4px;
        font-family: DIN Pro;
        font-style: normal;
        font-weight: 0;
        font-size: 15px;
        line-height: 16px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #FFFFFF;
        padding: 12px 26px;
        border: 1px solid transparent;
        margin-top: 20px;
        &:hover {
          border-color: #23BE20;
          background-color: transparent;
          color: #23BE20;
        }
      }
    }
  }
</style>
