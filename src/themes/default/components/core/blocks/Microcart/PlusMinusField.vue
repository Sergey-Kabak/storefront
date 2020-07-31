<template>
  <div class="minusplusnumber">
    <div class="mpbtn minus" :class="{'active': isMinusActive}" @click="mpminus()" >
      <svg width="12" height="2" viewBox="0 0 12 2" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.8337 1.83333H0.166992V0.166664H11.8337V1.83333Z" />
      </svg>
    </div>
    <div id="field_container">
      <input
        :id="getInputId"
        type="number"
        :min="min"
        :max="max"
        :disabled="disabled"
        :focus="autofocus"
        v-model.number="inputValue"
        @blur="$emit('blur', $event.target.value)"
      />
    </div>
    <div class="mpbtn plus" v-on:click="mpplus()" :class="{'active': isPlusActive}">
      <svg width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.8337 6.83333H6.83366V11.8333H5.16699V6.83333H0.166992V5.16666H5.16699V0.166664H6.83366V5.16666H11.8337V6.83333Z" />
      </svg>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: [String, Number],
        default: 0
      },
      name: {
        type: String,
        required: false,
        default: ''
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: undefined
      },
      disabled: {
        type: Boolean,
        default: false
      },
      autofocus: {
        type: Boolean,
        default: false
      },
      validations: {
        type: Array,
        default: () => []
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      getInputId () {
        return `input_${this._uid}`
      },
      inputValue: {
        get () {
          return this.value
        },
        set (value) {
          const qty = parseInt(value, 10)
          const targetValue = qty !== 0 ? Math.abs(qty) : 1
          this.$emit('input', targetValue || 1)
        }
      },
      isMinusActive() {
        return this.value > 1 && !this.loading
      },
      isPlusActive() {
        return !this.loading
      }
    },
    data() {
      return {
        newValue: 0
      }
    },
    methods: {
      getNotificationClass(notification) {
        return `alert alert-${notification.type}`
      },
      mpplus: function () {
        if (this.max === undefined || (this.newValue < this.max)) {
          this.newValue = this.newValue + 1
          this.$emit('input', this.newValue)
        }
      },
      mpminus: function () {
        if ((this.newValue) > this.min) {
          this.newValue = this.newValue - 1
          this.$emit('input', this.newValue)
        }
      }
    },
    watch: {
      value: {
        handler: function (newVal, oldVal) {
          this.newValue = newVal
        }
      }
    },
    created: function () {
      this.newValue = this.value
    }
  }
</script>
<style lang="scss" scoped>
  .minusplusnumber {
    border-radius: 5px;
    background-color: #FFF;
    display: inline-flex;
    user-select: none;
    height: 30px;
    box-sizing: border-box;
  }

  .minusplusnumber div {
    display: inline-block;
    height: 30px;
  }

  #field_container {
    border: 1px solid #E0E0E0;
    border-right: 0;
    box-sizing: border-box;
    background-color: white;
  }

  .minusplusnumber #field_container input {
    width: 38px;
    text-align: center;
    padding: 3px;
    border: none;
    height: 28px;
    box-sizing: border-box;

    font-family: DIN Pro;
    font-style: normal;
    font-size: 12px;
    line-height: 13px;
  }

  .minusplusnumber .mpbtn {
    cursor: pointer;
    height: 30px;
    width: 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .minus, .plus {
    border: 1px solid #E0E0E0;
    background: #F9F9F9;
    svg {
      fill: #E0E0E0;
    }

    &.active {
      background: #23BE20;

      svg {
        fill: #fff;
      }
    }
  }

  .minus {
    border-radius: 4px 0 0 4px;
    border-right: none;
  }

  .plus {
    border-radius: 0 4px 4px 0;
  }

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
</style>
