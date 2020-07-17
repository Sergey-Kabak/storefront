<template>
  <component
    :is="compontentType"
    :to="redirectionLink"
    class="button-outline no-outline py15 bg-cl-transparent h4 no-underline sans-serif fs-medium"
    :class="{
      light : color === 'light', 'brdr-white' : color === 'light', 'cl-white' : color === 'light',
      dark : color === 'dark', 'brdr-darkgray' : color === 'dark', 'cl-secondary' : color === 'dark',
      green : color === 'green', 'brdr-green' : color === 'green', 'cl-main-green' : color === 'green',
      px0 : link ? true : false,
      px40 : link ? false : true
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
      required: true
    },
    link: {
      type: String,
      default: null,
      required: false
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
@import "~theme/css/variables/colors";
@import "~theme/css/helpers/functions/color";
$dark-border: color(secondary);
$green-border: color(main-green);
$white: color(white);
$black: color(black);
$green: color(main-green);

.button-outline {
  border: 2px solid;
  height: 62px;
}

@media screen and (min-width: 900px) {
  .button-outline {
    border: 2px solid;
    min-width: 220px;
  }
}
.dark {
  border: 1px solid $dark-border;
  &:hover,
  &:focus {
    color: $white;
    background: $black;
    border-color: $black;
  }
}
.green {
  border: 1px solid $green-border;
  &:hover,
  &:focus {
    color: $white;
    background: $green;
    border-color: $green-border;
  }
}
.light {
  &:hover,
  &:focus {
    color: $black;
    background: $white;
    border-color: $white;
  }
}
</style>
