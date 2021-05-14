<template>
  <div class="compare-nav">
    <div class="compare-nav__text font weight-400">
      {{ $tc(`added {count} items`, getCompareItems.length) }}
    </div>
    <div class="compare-nav__link font">{{ $t('add more to compare') }}</div>
    <div class="compare-nav__text font underline">
      {{ $t('Remove all') }}
    </div>
    <div class="compare-nav__buttons">
      <span>{{ $t('indicate') }}</span>
      <div class="buttons-group">
        <button :class="{'active' : !isDifference}" @click.prevent="eventEmitter(false)" type="button" :aria-label="$t('All parameters')">
          {{ $t('All parameters') }}
        </button>
        <button :class="{'active' : isDifference}" @click.prevent="eventEmitter(true)" type="button" :aria-label="$t('Differences')">
          {{ $t('Differences') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      isDifference: false
    }
  },
  computed: {
    ...mapGetters({
      getCompareItems: 'compare/getCompareItems'
    })
  },
  methods: {
    eventEmitter (val) {
      this.isDifference = val
      this.$emit('difference', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.font {
  font-family: DIN Pro;
  font-style: normal;
  font-size: 13px;
  line-height: 16px;
}
.compare-nav{
  width: 336px;
  min-width: 336px;
  padding-right: 20px;
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
.compare-nav__buttons {
  @media (max-width: 767px) {
    padding: 0 16px;
  }
  margin-top: auto;
  width: 100%;

  & > span {
    font-family: DIN Pro;
    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    color: #1A1919;
    display: block;
    margin-bottom: 16px;
  }

  .buttons-group {
    @media (max-width: 767px) {
      margin-bottom: 16px;
    }
    display: flex;
    background: #F2F2F2;
    border-radius: 4px;
    height: 32px;

    button {
      flex: 1;
      background-color: transparent;
      border: 1px solid transparent;
      border-radius: 4px;
      outline: none;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;
      text-align: center;
      color: #1A1919;

      &.active {
        border-color: #23BE20;
        background-color: #fff;
      }
    }
  }
}
</style>
