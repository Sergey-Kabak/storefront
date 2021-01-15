<template>
  <div class="radio">
    <input class="radio-input" :class="{ 'disabled': !showDefaultButton }" type="radio" :id="label" :value="label" v-model="radioButtonValue">
    <label :for="label">
      <slot :active="label === radioButtonValue">
        <span>{{ label }}</span>
      </slot>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: null
    },
    label: {
      type: String,
      required: true
    },
    showDefaultButton: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    radioButtonValue: {
      get: function() {
        return this.value
      },
      set: function() {
        this.$emit("change", this.label)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.radio-input {
  &.disabled {
    display: none;
  }
}
</style>
