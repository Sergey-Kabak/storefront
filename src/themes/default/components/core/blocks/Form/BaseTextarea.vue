<template>
  <div class="relative">
    <div class="relative">
      <textarea
        :class="{empty: value === ''}"
        :type="type"
        :name="name"
        :autocomplete="autocomplete"
        :value="value"
        :autofocus="autofocus"
        :ref="focus ? name : false"
        @input="$emit('input', $event.target.value)"
        @blur="$emit('blur')"
        @keyup.enter="$emit('keyup.enter', $event.target.value)"
        @keyup="$emit('keyup', $event)"
      />
      <label>
        {{ placeholder }}
      </label>
    </div>

    <ValidationMessages v-if="validations" :validations="validations" />
  </div>
</template>

<script>
import ValidationMessages from './ValidationMessages.vue';

export default {
  name: 'BaseTextarea',
  components: {
    ValidationMessages
  },
  data () {
    return {
      iconActive: false,
      icon: 'visibility'
    }
  },
  props: {
    type: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
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
    }
  },
  mounted () {
    if (this.focus) {
      this.$refs[this.name].focus()
    }
  }
}
</script>

<style lang="scss" scoped>
textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #E0E0E0;
  resize: none;
  background: inherit;
  color: #1A1919;
  line-height: 16px;
  min-height: 100px;
  font-family: DIN Pro;
  font-size: 14px;

  &:hover {
    outline: none;
  }

  &:focus {
    outline: none;
    border-color: #23BE20
  }
}

label {
  font-family: 'DIN Pro';
  font-size: 14px;
  line-height: 16px;
  color: #9f9e9e;
  background-color: #fff;
  position: absolute;
  pointer-events: none;
  left: 15px;
  top: 10px;
  transition: 0.2s ease all;
}

textarea:focus ~ label,
textarea:not(.empty) ~ label {
  top: -10px;
  left: 15px;
  font-size: 14px;
  color: #23BE20;
  padding: 0 5px;
}
</style>
