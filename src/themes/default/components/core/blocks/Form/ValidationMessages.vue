<template>
  <div v-if="validations">
    <span
      v-if="validation"
      class="message block cl-error h6"
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

<style lang="scss" scoped>
.message {
  display: block;
  margin-top: 4px;
  margin-left: 16px;
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #EE2C39;
}
</style>
