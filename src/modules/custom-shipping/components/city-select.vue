<template>
  <div class="col-sm-12 mb10 city-select">
    <div class="row">
      <div class="col-sm-12">
        <v-select
            class="vue-select"
            :searchable="true"
            name="cities"
            :options="options"
            :value="selected"
            @search="fetchOptions"
            @input="changeCity"
        >
          <template slot="option" slot-scope="option">
            <span
                class="custom-option"
                :key="option.toString()"
                :class="{'id': option.id}"
                v-html="highlight(search, option.value)"
            ></span>
          </template>
          <template slot="no-options">
            {{ $t('no cities') }}
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
import vSelect from 'vue-select'

export default {
  components: {
    vSelect
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
      search: ''
    }
  },
  methods: {
    changeCity (val) {
      this.$emit('onCityChange', val.value)
    },
    highlight (search, text) {
      let highlight = text.substring(0, search.length);
      let last = text.substring(search.length);
      return `<span class='highlight'>${highlight}</span>${last}`;
    },
    fetchOptions (search, loading) {
      loading(true);
      this.search = search;
      this.$emit('onSearch', {loading, search});
    }
  },
  computed: {
    // bigCity () {
    //   return this.options.filter(o => this.filter.find(f => f.value === o.value)).map(o => {
    //     if (this.filter.find(f => f.value === o.value)) {
    //       o = {...o, ...this.filter.find(f => f.value === o.value)}
    //       return o
    //     }
    //   }).sort((a, b) => a.id - b.id)
    // },
    // cOptions () {
    //   return [...this.bigCity, ...this.options.filter(o => !this.filter.find(f => f.value === o.value))]
    // }
  }
}
</script>

<style lang="scss" scoped>
  @import '~bootstrap';

</style>

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
        font-family: DIN Pro;
        font-style: normal;
        font-size: 14px;
        line-height: 16px;
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
  .vs__dropdown-toggle {
    background: #FFFFFF;
    border: 1px solid #23BE20;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 0;
  }
  .city-select {
    padding: 0;
    .vs__dropdown-option {
      &:hover, &.vs__dropdown-option--selected, &.vs__dropdown-option--highlight {
        background: #F9F9F9;
        .custom-option {
          color: #000;
        }
      }
    }
    .vs--open .vs__search {
      height: 40px;
      background: #ffffff;
      margin: 0;
      border: none;
    }
    .vs__search {
      margin-top: 0;
    }
    .vs__selected {
      margin: 0;
      padding: 0;
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 0;
      font-size: 13px;
      line-height: 16px;
      color: #1A1919;
    }
    .vs__selected-options {
      padding: 0 16px;
    }
    .vs__dropdown-menu {
      background: #fff !important;
      border: 1px solid #E0E0E0;
      box-sizing: border-box;
      border-radius: 4px;
      padding: 8px 0;
    }
    .custom-option {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 0;
      font-size: 14px;
      line-height: 16px;
      .highlight {
        color: #23BE20;
      }
    }
  }
</style>
