<template>
  <div>
    {{value}}
  </div>
</template>

<script>
export default {
  props: {
    attribute: {
      type: null,
      required: true
    },
    emptyPlaceholder: {
      type: String,
      default: ''
    }
  },
  computed: {
    value () {
      if (typeof this.attribute === 'object' && this.attribute.options && this.attribute.options.length) {
        return this.attribute.options[0].label
      } else {
        return 'N/A'
      }
    }
  }
}
</script>
