<template>
  <div class="banner-description__timer" v-if="!timeExpired">
    <span class="banner-description__timer--from-to">
      {{ $t('From date') }} {{ startDate }} {{ $t('To date') }} {{ endDate }}
    </span>
    <div class="banner-description__timer--days-left-wrapper" v-html="daysLeftHTML"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    to: {
      type: String,
      required: true
    },
    from: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      getCurrentCategory: 'category-next/getCurrentCategory'
    }),
    daysLeftHTML () {
      const [word, ...days] = this.$tc('{count} days left', this.daysLeft, { count: this.daysLeft } ).split(' ');
      return `
        <span class="banner-description__timer--days-left-word">${word}</span>
        <span class="banner-description__timer--days-left-days">${days.join(' ')}</span>
      `
    },
    timeExpired () {
      return new Date() > new Date(this.to)
    },
    isMonthCompared () {
      return new Date(this.from).getMonth() === new Date(this.to).getMonth()
    },
    startDate () {
      return this.isMonthCompared ? new Date(this.from).getDate() : this.$d(new Date(this.from).getTime(), 'longWithMonth')
    },
    endDate () {
      return this.$d(new Date(this.to).getTime(), 'longWithMonth')
    },
    daysLeft () {
      const DateDiff = new Date(this.to).getTime() - Date.now();
      return Math.floor(DateDiff / (1000 * 60 * 60 * 24)) + 1;
    }
  }
}
</script>

<style lang="scss">
.banner-description {
  &__text {
    overflow-y: auto;
    height: 100%;
    font-family: DIN Pro;
    font-size: 15px;
    line-height: 24px;
    color: #5f5e5e;
    margin-bottom: 8px;
    margin: 0;
  }
  &__timer {
    display: flex;
    align-items: baseline;
    margin-top: auto;
    font-family: DIN Pro;
    padding-right: 16px;

    @media only screen and (max-width: 1024px) {
      padding-right: 0;
    }

    &--from-to {
      font-size: 12px;
      line-height: 16px;
      position: relative;
      margin-right: 16px;
      color: rgba(95, 94, 94, 0.6);
      text-align: justify;

      &::after {
        content: '';
        height: 100%;
        width: 1px;
        position: absolute;
        right: -8px;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: #E0E0E0;
      }
    }
    &--days-left-wrapper {
      display: flex;
      align-items: baseline;
    }
    &--days-left-days {
      white-space: nowrap;
      color: #EE2C39;
      font-size: 14px;
      line-height: 16px;
    }
    &--days-left-word {
      font-size: 12px;
      line-height: 12px;
      margin-right: 4px;
    }
  }
}
</style>
