<template>
  <div>
    <div class="relative">
      <input
        class="m0 no-outline"
        type="radio"
        :id="id"
        :checked="checked"
        :value="value"
        :name="name"
        @keyup.enter="$emit('click')"
        @click="$emit('click')"
        @blur="$emit('blur')"
        @change="$emit('change', $event.target.checked)"
        :disabled="disabled"
      >
      <label
        class="pl35 lh30 h4 pointer"
        :for="id"
      >
        <slot />
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
  model: {
    prop: 'value',
    event: 'change'
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
    checked: {
      type: Boolean,
      required: false,
      default: false
    },
    name: {
      type: String,
      required: false,
      default: ''
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
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-silver: #E0E0E0;
$color-active: #23BE20;
$color-white: color(white);
$hover : #cecece;
$focus : #c5c5c5;
$active : #bcbcbc;

$hover_checked : #20af1d;
$focus_checked : #1fa71c;
$active_checked : #1d9f1b;;

label {
  &:before {
    content: '';
    position: absolute;
    top: 3px;
    left: 0;
    width: 20px;
    height: 20px;
    background-color: $color-white;
    border: 2px solid $color-silver;
    border-radius: 50%;
    box-sizing: border-box;
    cursor: pointer;
  }
}
input {
  display: none;
  position: absolute;
  top: 3px;
  left: 0;
  &:checked + label {
    &:hover{
      &:before{
        border-color: $hover_checked;
      }
      &:after{
        background-color: $hover_checked;
      }
    }
    &:focus{
      &:before{
        border-color: $focus_checked;
      }
      &:after{
        background-color: $focus_checked;
      }
    }
    &:active{
      &:before{
        border-color: $active_checked;
      }
      &:after{
        background-color: $active_checked;
      }
    }
    &:before {
      background-color: $color-silver;
      border-color: $color-active;
      cursor: pointer;
    }
    &:after {
      content: '';
      position: absolute;
      top: 5px;
      left: 2px;
      width: 16px;
      height: 16px;
      border: 3px solid #fff;
      border-radius: 50%;
      background-color: $color-active;
      box-sizing: border-box;
    }
  }
  &:hover {
    + label {
      &:before {
        border-color: $hover;
      }
    }
  }
  &:focus {
    + label {
      &:before {
        border-color: $focus;
      }
    }
  }
  &:active {
    + label {
      &:before {
        border-color: $active;
      }
    }
  }
  &:disabled + label {
    cursor: not-allowed;
    opacity: 0.38;
  }
}
</style>
