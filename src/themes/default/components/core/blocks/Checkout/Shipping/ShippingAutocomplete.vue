<template>
  <div class="shipping-autocomplete">
    <div class="new-post-top" v-click-outside="clearAutocomplete">
      <button class="autocomplete-button" @click="activateAutocomplete($event)">
        <span class="autocomplete-button-text">{{ resultValue(selected) }}</span>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="#BDBDBD" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.25 7.5L9 11.25L12.75 7.5H5.25Z" />
        </svg>
      </button>
      <div class="autocomplete-wrapper">
        <autocomplete ref="autocomplete" class="autocomplete" v-if="isShowAutocomplete" :placeholder="$t('Number or address of New Post')" :debounce-time="300" :search="options" @submit="onChooseCity">
          <template #result="{ result, props }">
            <li v-bind="props" class="autocomplete-result" :class="{ 'selected': resultValue(result) === resultValue(selected) }">
              <span class="result-title">{{ resultValue(result) }}</span>
            </li>
          </template>
        </autocomplete>
        <div class="clear-autocomplete" v-if="value && isShowAutocomplete" @click="clearAutocomplete()">
          <svg class="clear-icon" width="24" height="24" viewBox="0 0 24 24" fill="#BDBDBD" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"/>
          </svg>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'

export default {
  components: {
    Autocomplete
  },
  props: {
    options: {
      type: [Array, Promise, Function],
      required: true
    },
    value: {
      type: String,
      required: false
    },
    selected: {
      type: [Object, String],
      default: null
    },
    resultValue: {
      type: [Function],
      default: (it) => it
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    isShowAutocomplete: false
  }),
  methods: {
    onChooseCity(it) {
      this.$emit('select', it)
      this.clearAutocomplete()
    },
    activateAutocomplete(event) {
      event.stopPropagation()
      this.isShowAutocomplete = !this.isShowAutocomplete
      if (this.isShowAutocomplete) {
        this.$nextTick(() => {
          const inputElement = document.querySelector('.autocomplete-input')
          if (inputElement) {
            inputElement.focus()
          }
        })
      }
    },
    clearAutocomplete() {
      this.isShowAutocomplete = false
      this.$emit('change', null)
    }
  }
}
</script>

<style lang="scss" scoped>
.autocomplete-button {
  display: grid;
  grid-template-columns: 1fr auto;
  font-family: DIN Pro;
  font-size: 14px;
  line-height: 16px;
  padding: 12px 12px 12px 16px;
  color: #1A1919;
  margin-bottom: 3px;
  max-height: 40px;
  width: 100%;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  background: none;
}

.autocomplete-button-text {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: left;
  font-family: DIN Pro;
  font-size: 14px;
  line-height: 16px;
  color: #1A1919;
}

.autocomplete-wrapper {
  position: relative;
}

.clear-autocomplete {
  padding: 4px;
  display: flex;
  cursor: pointer;
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
}

::v-deep {
  .autocomplete-input {
    &:focus {
      border-bottom-color: #23be20!important;
      border-top-color: #23be20!important;
    }
  }
  .autocomplete-result-list {
    border-top-color: #e0e0e0!important;
    margin-top: 0px!important;
    padding-top: 8px;
  }

  .autocomplete[data-loading="true"]:after {
    right: 36px;
  }

  .autocomplete-result {
    &.selected {
      background-color: #E4F9E4!important;
    }
  }
}

.shipping-autocomplete ::v-deep {
  .autocomplete {
    margin-bottom: 32px;
  }

  ::-webkit-scrollbar {
    width: 4px;
  }
  
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #bfbfbf;
  }

  .autocomplete[data-loading="true"]:after {
    border-right-color: #23be20;
  }

  .highlight {
    color: #23be20;
  }

  .autocomplete-input {
    width: 100%;
    height: 40px;
    border: 1px solid #e0e0e0;
    background: #ffffff;
    border-radius: 4px;
    padding: 12px 16px;
    font-family: DIN Pro;
    font-size: 14px;
    line-height: 16px;
    color: #1a1919;
    outline: none;

    &:focus {
      box-shadow: none;
      border-color: #23be20;
    }
  }

  .autocomplete-result-list {
    margin-top: 3px;
    box-shadow: none;
    border: 1px solid #e0e0e0;
    border-radius: 0px 0px 4px 4px;
  }

  .autocomplete-result {
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
}

.clear-icon {
  &:hover {
    fill: #aeaeae;
  }

  &:active {
    fill: #9f9f9f;
  }
}

</style>