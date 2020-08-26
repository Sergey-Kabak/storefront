<template>
  <div class="sort-by">
    <div
        class="label"
        :class="{active: variant.id === sortby.id}"
        v-for="variant in sortingVariants"
        :key="variant.id"
    >
      <input
          type="radio"
          name="sortby"
          :value="variant"
          v-model="sortby"
          @change="changeOrder"
      />
      {{ $t(variant.label) }}
    </div>
  </div>
</template>

<script>
import SortBy from '@vue-storefront/core/compatibility/components/SortBy';
import { products } from 'config';

export default {
  mixins: [SortBy],
  props: {
    hasLabel: {
      type: Boolean,
      required: false,
      default: false
    },
    value: {
      type: String,
      default: ''
    }
  },
  watch: {
    value: {
      handler () {
        const defaultVariant = this.value && this.value.length ? this.value : products.defaultSortBy.attribute
        this.sortby = this.sortingVariants.find(variant => variant.id.includes(defaultVariant))
      },
      immediate: true
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~theme/css/base/text';
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-tertiary: color(tertiary);
  .sort-by {
    display: flex;
    align-items: center;
    position: relative;
    .label {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: normal;
      font-size: 13px;
      line-height: 16px;
      color: #AFB3B9;
      position: relative;
      margin: 0 10px;
      border-bottom: 1px solid transparent;
      cursor: pointer;

      &.active {
        color: #1A1A1A;
        border-bottom-color: #1a1a1a;
      }

      input {
        margin: 0;
        padding: 0;
        opacity: 0;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
      }
    }
    select {
      @extend .h4;
      font-size: 14px;
      border: none;
      width: 100%;
      border-radius: 0;
      background-color: transparent;
      margin-right: 0;
      &:focus {
        outline: none;
      }
    }
    &__icon {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }
  @media (max-width: 770px) {
    .sort-by {
      width: 100%;
    }
  }
</style>
