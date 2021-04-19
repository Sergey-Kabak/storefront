<template>
  <component
    :is="compontentType"
    :to="redirectionLink"
    class="button-outline no-outline bg-cl-transparent h4 no-underline sans-serif fs-medium"
    :class="{
      'disabled': disabled
    }"
  >
    <slot>Button</slot>
  </component>
</template>

<script>
import focusClean from 'theme/components/theme/directives/focusClean'

export default {
  name: 'ButtonOutline',
  directives: { focusClean },
  props: {
    color: {
      type: String,
      required: false,
      default: null
    },
    link: {
      type: String,
      default: null,
      required: false
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
.button-outline {
  height: 40px;
  width: 100%;
  font-family: DIN Pro;
  font-style: normal;
  font-size: 15px;
  line-height: 24px;
  color: #1A1919;

  background-color: #FFFFFF;
  border: 1px solid #23BE20;
  box-sizing: border-box;
  border-radius: 4px;
  transition: .2s ease-in-out;
  font-weight: 700;

  &:hover {
    background-color: #E5F7E4;;
  }

  &:active {
    background-color: #cddccc
  }

  &.disabled {
    pointer-events: none;
    border-color: #caefca;
    color: #ababab
  }
}
</style>
