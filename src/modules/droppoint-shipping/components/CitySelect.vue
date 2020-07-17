<template>
  <div class="col-sm-12 mb10 city-select">
    <div class="row">
      <div class="col-sm-12">
        <!--<label class="form-label">{{ $t('Choose your city') }}</label>-->
        <!--<base-select-->
        <!--class="col-12"-->
        <!--name="cities"-->
        <!--:label="$t('Choose your city')"-->
        <!--:options="options"-->
        <!--:selected="selected"-->
        <!--@input="changeCity"-->
        <!--/>-->
        <!--{{ error }}-->
        <v-select class="vue-select"
                  :searchable="true"
                  name="cities"
                  :options="cOptions"
                  :value="selected"
                  @input="changeCity"
        >
          <template slot="option" slot-scope="option">
            <span :class="{'id': option.id}">
              {{ option.value }}
            </span>
          </template>
        </v-select>
      </div>
      <!--<div class="col-sm-6">-->
      <!--<label class="form-label">{{ $t('Street, metro') }}</label>-->
      <!--<base-input type="text" value="" name="metro" class="col-12 input-wrapper" />-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
import BaseSelect from '@vue-storefront/theme-default/components/core/blocks/Form/BaseSelect'
import vSelect from 'vue-select'

export default {
  components: {
    vSelect,
    BaseSelect
  },
  props: {
    options: {
      required: true,
      type: Array
    },
    selected: {
      required: true,
      type: String
    },
    error: {
      required: false,
      type: String,
      default: ''
    }
  },
  data () {
    return {
      city: this.selected || '',
      filter: [
        {id: 1, value: 'Київ'},
        {id: 2, value: 'Львів'},
        {id: 3, value: 'Дніпро'},
        {id: 4, value: 'Одеса'},
        {id: 5, value: 'Харків'},
        {id: 6, value: 'Івано-Франківськ'},
        {id: 7, value: 'Чернігів'},
        {id: 8, value: 'Суми'},
        {id: 9, value: 'Тернопіль'},
        {id: 10, value: 'Ужгород'},
        {id: 11, value: 'Луцьк'},
        {id: 12, value: 'Вінниця'},
        {id: 13, value: 'Житомир'},
        {id: 14, value: 'Кропивницький'},
        {id: 15, value: 'Миколаїв'},
        {id: 16, value: 'Херсон'}
      ]
    }
  },
  methods: {
    changeCity (val) {
      this.$emit('onCityChange', val.value)
    }
  },
  computed: {
    bigCity () {
      return this.options.filter(o => this.filter.find(f => f.value === o.value)).map(o => {
        if (this.filter.find(f => f.value === o.value)) {
          o = {...o, ...this.filter.find(f => f.value === o.value)}
          return o
        }
      }).sort((a, b) => a.id - b.id)
    },
    cOptions () {
      return [...this.bigCity, ...this.options.filter(o => !this.filter.find(f => f.value === o.value))]
    }
  }
}
</script>

<style lang="scss">
  @import "vue-select/src/scss/vue-select.scss";
  .city-select {
    .input-wrapper {
      margin-top: 5px;
      input {
        border: 1px solid #bdbdbd;
        border-radius: 5px;
        padding: 10px;
        font-size: 14px;
        background: #f2f3f7;
        &:focus {
          background: #ffffff;
        }
      }
    }
    .vs__clear {
      display: none !important;
    }
    .vs--open {
      background: #f7f7f9;
      .vs__selected {
        display: none;
      }
      .vs__search {
        background: #ffffff;
        margin: 5px 10px;
        border: 1px solid #bdbdbd;
      }
      .vs__dropdown-toggle {
        padding: 0;
      }
      .vs__actions {
        display: none;
      }
      .vs__dropdown-menu {
        background: #f7f7f9;
        .vs__dropdown-option {
          .id {
            font-weight: bold;
          }
        }
      }
    }
  }
</style>
