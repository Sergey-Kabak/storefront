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
  box-sizing: border-box;
  width: 100%;
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 24px;
  background: #FFFFFF;
  border: 1px solid #23BE20;
  box-sizing: border-box;
  border-radius: 4px;
  transition: .2s ease-in-out;

  &:hover {
    color: #ffffff  ;
    background-color: #23BE20;
  }

  &:active {
    background-color: #1fa71c
  }

  &.disabled {
    pointer-events: none;
    border-color: #abe6aa;
    color: #9e9e9e
  }
}
</style>
