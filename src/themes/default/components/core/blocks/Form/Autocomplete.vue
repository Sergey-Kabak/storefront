<template>
  <div class="autocomplete">
    <v-select 
      :label="label"
      :value="selectedValue"
      :clearable="clearable"
      :options="options"
      @input="onSelect($event)"
      @search="onSearch"
      @search:blur="blur"
      class="search-autocomplete"
    >
      <template #search="{ attributes, events }">
        <base-input
          maxlength="1"
          v-bind="attributes"
          :inputListeners="events"
          :disabled="disabled"
          :class="{ error: isError }"
          :placeholder="placeholder"
          :fixedLabel="!!selectedValue"
        />
      </template>
      <template #option="option">
        <span class="option-label">{{ option[label] || option.label }}</span>
      </template>
    </v-select>
    <ValidationMessages v-if="validations.length" :validations="validations" />
  </div>
</template>

<script>
import BaseInput from 'theme/components/core/blocks/Form/BaseInput';
import ValidationMessages from 'theme/components/core/blocks/Form/ValidationMessages';
import vSelect from 'vue-select'
import { debounce } from 'debounce';

export default {
  components: {
    BaseInput,
    ValidationMessages,
    vSelect
  },
  data: () => ({
    focused: false,
    value: '',
    results: []
  }),
  props: {
    isError: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: false
    },
    blur: {
      type: Function,
      default: () => {}
    },
    validations: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selectedValue: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: true
    },
    clearable: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      required: false
    },
    search: {
      type: Function,
      required: true
    },
    options: {
      type: Array,
      required: false,
      default: _ => []
    },
    debounceTime: {
      type: [Number, Boolean],
      required: false,
      default: false
    },
    defaultValue: {
      type: String,
      defeault: ''
    }
  },
  computed: {
    noResults() {
      return this.value && this.results.length === 0
    }
  },
  methods: {
    handleFocus() {
      this.focused = true
    },
    handleBlur() {
      this.$emit('blur', this.value)
    },
    highlight(result) {
      // result = this.getResultValue(result)
      // let value = this.value.toLowerCase()
      // if (!result.search(new RegExp(value, 'gi'))) {
      //   value = value.charAt(0).toUpperCase() + value.slice(1)
      // }
      // return result.replace(new RegExp(value, 'gi'), `<span class='highlight'>${value}</span>`)
    },
    onSearch: debounce(function (data) {
      this.search(data)
    }, 300),
    onSelect(value) {
      this.$emit('submit', { value, index: this.index })
    }
  }
};
</script>

<style lang="scss" scoped>
.base-input {
  max-width: 100%;
}

[data-position=below] .autocomplete-result-list {
  margin-top: 3px;
}

.autocomplete-result-list {
  border-top-color: #e0e0e0;
  border-radius: 4px;
}

.option-label {
  font-family: DIN Pro;
  display: block;
  font-size: 14px;
  line-height: 16px;
  color: #1A1919;
  padding: 8px 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.search-autocomplete ::v-deep {
  .vs__selected {
    position: absolute;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    left: 18px;
    right: 18px;
    z-index: 1;
    top: 50%;
    transform: translateY(-50%);
    margin: 0;
    padding: 0;
    font-family: DIN Pro;
    font-size: 14px;
    line-height: 16px;
    color: #1A1919;
  }

  .vs__selected-options {
    padding: 0;
  }

  .vs__dropdown-toggle {
    padding: 0;
    border: none;
    overflow-x: unset;
  }

  .vs__dropdown-menu {
    padding: 0;
    border: none;
    top: calc(100% + 4px);
  }

  .vs__dropdown-option {
    padding: 0;
  }

  .vs__actions {
    display: none;
  }

  .vs__no-options {
    display: none!important;
  }

  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    display: none;
  }

  .vs__dropdown-option--highlight  {
    transition: .2s ease-in-out;
    background-color: #E4F9E4;;
  }
}

</style>
