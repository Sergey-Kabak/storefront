<template>
  <div>
    <label class="checkbox-selector">
      <input type="checkbox" :checked="value" @change="$emit('change', $event.target.checked)">
      <span class="checkbox" :class="{ 'active': value }" />
      <slot />
    </label>
    <ValidationMessages v-if="validations" :validations="validations" />
  </div>
</template>

<script>
import ValidationMessages from './ValidationMessages.vue';

export default {
  name: 'BaseCheckbox',
  components: {
    ValidationMessages
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    validations: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.checkbox {
  transition: ease-in 0.1s;
  display: flex;
  position: relative;
  display: inline-block;
  width: 18px;
  height: 18px;
  cursor: pointer;
  border: 2px solid #E0E0E0;
  box-sizing: border-box;
  margin-right: 12px;
  border-radius: 3px;

  &.active {
    background: #23BE20;
    border: none;

    &:after {
      content: url('/assets/custom/Correct.svg');
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 20px;
      height: 15px;
    }
  }
}

.checkbox-selector {

  &:hover{
    .checkbox-amount {
      opacity: 1;
    }
    span.checkbox{
      border-color : #cecece;
    }
    span.checkbox.active {
      background-color: #20af1d;
    }
  }

  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 10px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
}

input[type="checkbox"] {
  display: none;
}
</style>
