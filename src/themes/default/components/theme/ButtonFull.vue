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
$hover : #20af1d;
$focus : #1fa71c;
$active : #1d9f1b;
.button-full {
  transition: ease-in 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 40px;
  padding: 0 5px;
  width: 100%;
  border-style: none;
  background-color: #23be20;
  color: #ffffff;
  max-width: 260px;
  font-family: DIN Pro;
  font-size: 15px;
  font-weight: 600;
  line-height: 16px;
  border-radius: 4px;
  &:hover{
      background-color : $hover;
      color: #ffffff;
  }
  &:focus{
      background-color : $focus;
      outline: none;
      color: #ffffff;
  }
  &:active{
      background-color : $active;
      color: #ffffff;
  }
  &:disabled {
    background-color: #abe6aa;
    color: #ffffff;
  }
}
</style>
