<template>
  <div v-if="validations">
    <span
      v-for="(validation, index) in validations"
      :key="index"
      v-if="validation.condition"
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
  }
}
</script>
