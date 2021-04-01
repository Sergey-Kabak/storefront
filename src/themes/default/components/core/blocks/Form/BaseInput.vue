<template>
  <div
    class="relative base-input"
    :class="[containerClass]"
  >
    <div class="relative">
      <input
        class="
         py10 w-100 border-box brdr-none brdr-bottom-1
         brdr-cl-primary h4 sans-serif
        "
        v-bind="attributes"
        :class="{pr30: type === 'password', empty: !value, 'disabled' : disabled , 'fixed-label': fixedLabel}"
        :type="type === 'password' ? passType : type"
        :name="name"
        :autocomplete="autocomplete"
        :disabled="disabled"
        :value="value"
        :ref="name"
        @blur="$emit('blur')"
        @keyup.enter="$emit('keyup.enter', sanitize($event))"
        @keyup="$emit('keyup', $event)"
        v-on="listeners"
      >
      <label :class="[labelClass]">{{ placeholder }} <span class="placeholer-symbol" v-if="required">*</span></label>
    </div>
    <button
      v-if="iconActive"
      type="button"
      tabindex="-1"
      class="
        icon material-icons absolute brdr-none no-outline
        p0 bg-cl-transparent cl-brdr-secondary pointer
      "
      @click="togglePassType()"
      :aria-label="$t('Toggle password visibility')"
      :title="$t('Toggle password visibility')"
    >
      {{ icon }}
    </button>
    <ValidationMessages v-if="validations" :validations="validations" :errorClass="errorClass" />
  </div>
</template>

<script>
import ValidationMessages from './ValidationMessages.vue';
import DOMPurify from 'dompurify';

export default {
  name: 'BaseInput',
  components: {
    ValidationMessages
  },
  data () {
    return {
      passType: 'password',
      iconActive: false,
      icon: 'visibility_off'
    }
  },
  props: {
    type: {
      type: String,
      default: 'text'
    },
    fixedLabel: {
      type: Boolean,
      default: false
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
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    autocomplete: {
      type: String,
      required: false,
      default: ''
    },
    focus: {
      type: Boolean,
      required: false,
      default: false
    },
    autofocus: {
      type: Boolean,
      required: false,
      default: false
    },
    validations: {
      type: Array,
      default: () => []
    },
    containerClass: {
      type: String,
      default: ""
    },
    inputClass: {
      type: String,
      default: ""
    },
    labelClass: {
      type: String,
      default: ""
    },
    errorClass: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    inputListeners: {
      type: Object
    },
    attributes: {
      type: Object
    }
  },
  computed: {
    listeners: function () {
      var vm = this
      return Object.assign({},
        {
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        },
        this.inputListeners
      )
    }
  },
  methods: {
    sanitize(e) {
      const v = DOMPurify.sanitize(e.target.value);
      e.target.value = v;
      return v;
    },
    togglePassType () {
      if (this.passType === 'password') {
        this.passType = 'text'
        this.icon = 'visibility'
      } else {
        this.passType = 'password'
        this.icon = 'visibility_off'
      }
    },
    // setFocus sets focus on a field which has a value of 'ref' tag equal to fieldName
    setFocus (fieldName) {
      if (this.name === fieldName) {
        this.$refs[this.name].focus()
      }
    }
  },
  created () {
    if (this.type === 'password') {
      this.iconActive = true
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.autofocus) {
        this.$refs[this.name].focus()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .base-input {
    &.error {
      input:focus ~ label,
      input:not(.empty) ~ label,
      label {
        color: #EE2C39;
      }

      &:not(:focus):not(.empty) ~ label {
        color: #5F5E5E;
      }

      &:focus {
        border-color: #23BE20;
      }
    }

    &.error {
      input {
        border-color: #EE2C39;

        & ~ label {
          color: #EE2C39!important;
        }
      }
    }
  }

  input {
    &:disabled,
    &:disabled + label {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
  }

  label {
    font-family: DIN Pro;
    font-size: 13px;
    line-height: 16px;
    color:#999;
    position:absolute;
    left: 15px;
    top: 50%;
    font-size: 14px;
    transform: translateY(-50%);
    transition: 0.2s ease all;
    pointer-events: none;
  }
  input:focus ~ label, input:not(.empty) ~ label{
    top: 0;
    font-size:14px;
  }
  
  input.fixed-label ~ label {
    top: 0;
    font-size:14px;
    padding: 0 10px;
    background: #ffffff;
    opacity: 1;
    margin-top: 0;
  }

  .icon {
    right: 6px;
    top: 10px;
  }

.base-input {
  width: 100%;
  min-width: 40px;
  max-width: 316px;

  input {
    outline: none;
    font-family: DIN Pro;
    font-size: 14px;
    color: #1A1919;
    line-height: 16px;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 16px;

    &:focus {
      border-color: #23BE20;
    }

    &:not(.empty) ~ label {
      padding: 0 4px;
      transform: translate(-3px, -50%);
      background: #ffffff;
      opacity: 1;
      margin-top: 0;
      color: #61616199;
    }

    &:focus ~ label {
      padding: 0 10px;
      background: #ffffff;
      opacity: 1;
      margin-top: 0;
      color: #23BE20;
    }

    &.disabled ~ label {
      color: #5f5e5e99;;
    }
  }

  label {
    font-family: 'DIN Pro';
    font-size: 14px;
    line-height: 16px;
    color: #9f9e9e;
  }
}

.base-input {
  &.error {
    label {
      color: #EE2C39;
    }

    input {
      border-color: #EE2C39;
    }
  }
}
</style>
