<template>
  <component
    :is="compontentType"
    :type="!link ? type : false"
    :to="redirectionLink"
    class="button-small"
    :class="{
      'no-underline pointer align-center border-box': link,
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
import focusClean from "theme/components/theme/directives/focusClean";
export default {
  name: "ButtonFull",
  directives: { focusClean },
  props: {
    type: {
      type: String,
      required: false,
      default: "button"
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
    compontentType() {
      return this.link ? "router-link" : "button";
    },
    redirectionLink() {
      return this.link ? this.localizedRoute(this.link) : null;
    }
  }
};
</script>

<style lang="scss" scoped>
.button-small {
  width: 100% !important;
  padding: 0;
  display: block;
  text-align: center;
  border-style: none;
  background: #23be20;
  color: #ffffff;
  height: 40px;
  max-width: 131px;
  font-family: DIN Pro;
  font-size: 15px;
  font-weight: 600;
  line-height: 16px;
  min-width: 100px;
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
