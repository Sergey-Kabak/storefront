<template>
  <div class="radio-button">
    <div class="relative">
      <input
        type="radio"
        :id="id"
        :value="value"
        :name="name"
        @change="$emit('change', $event.target.value)"
        :checked="isChecked"
      >
      <label
        :for="id"
        class="radio-label"
      >
        <div class="radio" />
        <span class="radio-label"><slot /></span>
      </label>
    </div>
    <ValidationMessages v-if="validations" :validations="validations" />
  </div>
</template>

<script>
import ValidationMessages from './ValidationMessages.vue';

export default {
  name: 'BaseRadiobutton',
  components: {
    ValidationMessages
  },
  model : {
  	prop:'checked',
    event:'change'
  },
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      default: ''
    },
    name: {
      type: String,
      required: false,
      default: ''
    },
    checked: {
      default: ''
    },
    validations: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    isChecked() {
      return this.checked == this.value
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

input {
  display: none;

  &:checked + label .radio {
    border-color: #23BE20;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      background-color: #23BE20;
      border-radius: 50%;
    }
  }
}

.radio {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #E0E0E0;
  margin-right: 16px;
}

label {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
