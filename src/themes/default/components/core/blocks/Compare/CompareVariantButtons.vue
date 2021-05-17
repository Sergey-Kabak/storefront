<template>
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
</template>

<script>
export default {
  data () {
    return {
      isDifference: false
    }
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
.compare-nav{
  &__buttons {
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
}
</style>
