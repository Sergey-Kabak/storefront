<template>
  <component
    :is="compontentType"
    :type="!link ? type : false"
    :to="redirectionLink"
    class="button-underline"
    :class="{
      disabled: disabled,
      'button-disabled': disabled
    }"
    data-testid="subscribeSubmit"
    :disabled="disabled"
  >
    <slot>
      Button
    </slot>
  </component>
</template>

<script>
import focusClean from 'theme/components/theme/directives/focusClean';
export default {
  name: 'ButtonUnderline',
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
      return this.link ? 'router-link' : 'button';
    },
    redirectionLink () {
      return this.link ? this.localizedRoute(this.link) : null;
    }
  }
};
</script>

<style lang='scss' scoped>
$main-dark: #1A1919;
.button-underline {
  outline: none;
  box-shadow: none;
  border: none;
  padding: 0;
  transition: all ease-in 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 5px;
  background: transparent;
  color: $main-dark;
  max-width: 260px;
  font-family: DIN Pro;
  font-size: 14px;
  font-weight: 700;
  line-height: 15px;
  padding-bottom: 4px;
  border-bottom: 1px dashed $main-dark;

  &:hover,
  &:focus,
  &:active {
    color: grey;
    border-color: transparent;
  }
  &:disabled {
    color: grey;
    cursor: not-allowed;
  }
}
</style>
