<template>
  <component
    :is="compontentType"
    :type="!link ? type : false"
    :to="redirectionLink"
    class="button-secondary"
    data-testid="subscribeSubmit"
    :disabled="disabled"
  >
    <slot>
      Button
    </slot>
  </component>
</template>

<script>
export default {
  name: 'ButtonFull',
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
.button-secondary {
  transition: all ease-in 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  width: 100%;
  border-style: none;
  background-color: #E5F7E4;
  color: #1A1919;
  font-family: DIN Pro;
  font-size: 15px;
  font-weight: 600;
  line-height: 16px;
  border-radius: 4px;

  &:hover {
    background-color : #ddeedc;
  }
  &:active {
    background-color :#cddccc;
  }
  &:disabled {
    background-color: #f2fbf1;
  }
}
</style>
