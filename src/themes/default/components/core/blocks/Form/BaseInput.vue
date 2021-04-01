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
      <svg v-if="isVisibleIcon" width="24" height="24" viewBox="0 0 24 24" fill="#BDBDBD" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 6.00001C15.79 6.00001 19.17 8.13001 20.82 11.5C20.23 12.72 19.4 13.77 18.41 14.62L19.82 16.03C21.21 14.8 22.31 13.26 23 11.5C21.27 7.11001 17 4.00001 12 4.00001C10.73 4.00001 9.51 4.20001 8.36 4.57001L10.01 6.22001C10.66 6.09001 11.32 6.00001 12 6.00001ZM10.93 7.14001L13 9.21001C13.57 9.46001 14.03 9.92001 14.28 10.49L16.35 12.56C16.43 12.22 16.49 11.86 16.49 11.49C16.5 9.01001 14.48 7.00001 12 7.00001C11.63 7.00001 11.28 7.05001 10.93 7.14001ZM2.01 3.87001L4.69 6.55001C3.06 7.83001 1.77 9.53001 1 11.5C2.73 15.89 7 19 12 19C13.52 19 14.98 18.71 16.32 18.18L19.74 21.6L21.15 20.19L3.42 2.45001L2.01 3.87001ZM9.51 11.37L12.12 13.98C12.08 13.99 12.04 14 12 14C10.62 14 9.5 12.88 9.5 11.5C9.5 11.45 9.51 11.42 9.51 11.37ZM6.11 7.97001L7.86 9.72001C7.63 10.27 7.5 10.87 7.5 11.5C7.5 13.98 9.52 16 12 16C12.63 16 13.23 15.87 13.77 15.64L14.75 16.62C13.87 16.86 12.95 17 12 17C8.21 17 4.83 14.87 3.18 11.5C3.88 10.07 4.9 8.89001 6.11 7.97001Z" />
      </svg>
      <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="#BDBDBD" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 6C15.79 6 19.17 8.13 20.82 11.5C19.17 14.87 15.79 17 12 17C8.21 17 4.83 14.87 3.18 11.5C4.83 8.13 8.21 6 12 6ZM12 4C7 4 2.73 7.11 1 11.5C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 11.5C21.27 7.11 17 4 12 4ZM12 9C13.38 9 14.5 10.12 14.5 11.5C14.5 12.88 13.38 14 12 14C10.62 14 9.5 12.88 9.5 11.5C9.5 10.12 10.62 9 12 9ZM12 7C9.52 7 7.5 9.02 7.5 11.5C7.5 13.98 9.52 16 12 16C14.48 16 16.5 13.98 16.5 11.5C16.5 9.02 14.48 7 12 7Z"/>
      </svg>
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
      isVisibleIcon: true
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
        this.isVisibleIcon = false
      } else {
        this.passType = 'password'
        this.isVisibleIcon = true
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
    display: flex;
    right: 8px;
    top: 20px;
    transform: translateY(-50%);

    &:hover {
      svg {
        fill: #aeaeae;
      }
    }

    &:active {
      svg: {
        fill: #9f9f9f;
      }
    }
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
