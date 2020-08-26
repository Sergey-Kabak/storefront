<template>
  <component
    :is="compontentType"
    :type="!link ? type : false"
    :to="redirectionLink"
    class="button-full"
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
      return this.link ? 'router-link' : 'button';
    },
    redirectionLink () {
      return this.link ? this.localizedRoute(this.link) : null;
    }
  }
};
</script>

<style lang='scss' scoped>
.button-full {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 40px;
  padding: 0 5px;
  width: 100%;
  border-style: none;
  background: #23be20;
  color: #ffffff;
  max-width: 260px;
  font-family: DIN Pro;
  font-size: 15px;
  font-weight: 600;
  line-height: 16px;
  border-radius: 4px;
  transition: .2s ease-in-out;

  &:hover {
    background-color: #20af1d;
  }

  &:focus {
    outline: none;
  }

  &:active {
    background-color: #1da01b;
  }

  &:disabled {
    background-color: #abe6aa;
    color: #828282;
  }
}
</style>
