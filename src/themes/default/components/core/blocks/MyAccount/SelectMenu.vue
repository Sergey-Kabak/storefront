<template>
  <v-select 
    @input="onSelectChange($event)"
    :reduce="it => it.link"
    :value="$route.path"
    :options="menu"
    :clearable="false"
    :searchable="false" 
  >
    <template #selected-option="{ title }">
      <div class="option selected">
        <span class="option-name">{{ $t(title) }}</span>
      </div>
    </template>
    <template #option="{ title }">
      <div class="option">
        <span class="option-name">{{ $t(title) }}</span>
        <div class="selected-option-image">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.50016 13.5001L4.00016 10.0001L2.8335 11.1667L7.50016 15.8334L17.5002 5.83341L16.3335 4.66675L7.50016 13.5001Z" fill="#23BE20"/>
          </svg>
        </div>
      </div>
    </template>
    <template #open-indicator="{ attributes }">
      <svg v-bind="attributes" width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.25 0.5L4 4.25L7.75 0.5H0.25Z" fill="#BDBDBD"/>
      </svg>
    </template>
  </v-select>
</template>

<script>
import vSelect from 'vue-select'

export default {
  components: {
    vSelect
  },
  props: {
    menu: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    onSelectChange(link) {
      this.$router.push(link)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-select {
  width: 100%;
}

::v-deep  {
  .vs__selected {
    position: relative!important;
  }

  .vs__dropdown-menu {
    border-radius: 4px;
    top: calc(100% + 3px)
  }

  .vs__dropdown-toggle {
    border-color: #e0e0e0;
  }

  &.vs--open {
    .vs__dropdown-toggle {
      border-radius: 4px;
      border-color: #23BE20!important;
    }
  }

  .vs__actions {
    padding: 0 16px;
  }

  .vs__dropdown-toggle,
  .vs__search,
  .vs__selected-options,
  .vs__selected {
    height: 40px;
    margin: 0;
    padding: 0;
  }

  .vs__selected {
    opacity: 1!important;
  }

  .vs__dropdown-option {
    &:hover,
    &:active {
      background: #E4F9E4;
    }

    &--selected,
    &--highlight {
      background: #E4F9E4;
    }

    &--selected {
      .selected-option-image {
        display: block!important;
      }
    }
  }

}

.option {
  display: flex;
  padding: 4px 0;
  align-items: center;

  &.selected {
    padding: 0 16px;
  }

  .option-image {
    max-width: 24px;
    margin-right: 12px;
  }

  .option-name {
    font-family: DIN Pro;
    font-size: 14px;
    line-height: 16px;
    color: #1A1919;
  }

  .selected-option-image {
    display: none;
    margin-left: auto;
  }
}
</style>
