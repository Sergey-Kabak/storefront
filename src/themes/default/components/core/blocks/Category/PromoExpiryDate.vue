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

<style scoped lang="scss">

</style>
