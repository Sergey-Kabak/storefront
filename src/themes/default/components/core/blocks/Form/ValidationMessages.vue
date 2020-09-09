<template>
  <div v-if="validations">
    <span
      v-if="validation"
      class="block cl-error h6 mt8"
      :class="[errorClass]"
      data-testid="errorMessage"
    >
      {{ validation.text }}
    </span>
  </div>
</template>
<script>
export default {
  props: {
    validations: {
      type: Array,
      default: () => []
    },
    errorClass: {
      type: String,
      default: ""
    }
  },
  computed: {
    validation () {
      return this.validations.find(it => it.condition)
    }
  }
}
</script>
