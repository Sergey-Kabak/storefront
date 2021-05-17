<template>
  <div class="compare-nav">
    <div class="compare-nav__text font weight-400">
      {{ $tc(`added {count} items`, getCompareItems.length) }}
    </div>
    <div @click="back" class="compare-nav__link add_more font">{{ $t('add more to compare') }}</div>
    <div @click="removeAll" class="compare-nav__text font remove underline">
      {{ $t('Remove all') }}
    </div>
    <compare-variant-buttons @difference="eventEmitter" class="desktop" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Compare from '@vue-storefront/core/pages/Compare';
import CompareVariantButtons from './CompareVariantButtons';

export default {
  mixins: [Compare],
  components: {
    CompareVariantButtons
  },
  computed: {
    ...mapGetters({
      getCompareItems: 'compare/getCompareItems'
    })
  },
  methods: {
    eventEmitter (val) {
      this.$emit('difference', val)
    },
    back () {
      this.$router.go(-1)
    },
    removeAll () {
      if (this.getCompareItems) {
        this.getCompareItems.forEach(product => this.removeFromCompare(product));
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.desktop{
  @media (max-width: 768px) {
    display: none;
  }
}
.font {
  font-family: DIN Pro;
  font-style: normal;
  font-size: 13px;
  line-height: 16px;
}
.compare-nav{
  @media (max-width: 768px) {
    width: calc(100vw - 44px);
    position: sticky;
    left: 0;
  }
  @media (min-width: 769px) {
    width: 336px;
    min-width: 336px;
  }
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &__text {
    color: #1A1919;
    display: inline-block;
    margin-bottom: 29px;

    &.underline {
      cursor: pointer;
      padding-bottom: 3px;
      border-bottom: 1px dashed;

      &:hover {
        border-bottom-color: transparent;
      }
    }
  }
  &__link {
    cursor: pointer;
    color: #23BE20;
    display: inline-block;
    padding-bottom: 3px;
    border-bottom: 1px dashed #23BE20;
    margin-bottom: 16px;

    &:hover {
      border-bottom-color: transparent;
    }
  }
}
.add_more{
  @media (max-width: 768px) {
    order: -1;
  }
}
.remove{
  @media (max-width: 768px) {
    position: absolute;
    bottom: 0;
    right: 0;
  }
}
</style>
