<template>
  <component
    :is="compontentType"
    :type="!link ? type : false"
    :to="redirectionLink"
    class="no-outline button-full block brdr-none w-100 px10 bg-cl-main-green :bg-cl-th-forest-green ripple weight-400 h4 cl-white sans-serif fs-medium"
    :class="{ 'no-underline pointer align-center border-box': link, 'disabled': disabled, 'button-disabled': disabled }"
    data-testid="subscribeSubmit"
    :disabled="disabled"
  >
    <slot>
      Button
    </slot>
  </component>
</template>

<script>
import focusClean from 'theme/components/theme/directives/focusClean'
export default {
  name: 'ButtonFull',
  directives: { focusClean },
  props: {
    type: {
      type: String,
      required: false,
      default: 'button'
    },
    link: {
      type: Object,
      required: false,
      default: null
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    compontentType () {
      return this.link ? 'router-link' : 'button'
    },
    redirectionLink () {
      return this.link ? this.localizedRoute(this.link) : null
    }
  }
}
</script>

<style lang="scss" scoped>
  .disabled {
    background-color: gray
  }
</style>

<style lang="scss">
  .button-full {
    font-family: DIN Pro;
    font-size: 15px;
    line-height: 16px;
    min-width: 250px;
    padding: 12px 0;
    border-radius: 4px;
  }
</style>
