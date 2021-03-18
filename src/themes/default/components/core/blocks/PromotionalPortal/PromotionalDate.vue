<template>
  <div class="date">
    <span class="date-title">{{ fromDateString }} {{ toDateString }}</span>
    <div v-if="leftDays > 1" class="days-left">
      <span class="days-left-title"> {{ $tc(`Left {count}`, leftDays) }} </span>
      <span class="days-left-count">{{ $tc(`Left {count} day`, leftDays) }}</span>
    </div>
    <div v-if="isLeftOneDay" class="last-day">
      <span class="last-day-title">{{ $t('Last day') }}!</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    fromDate: {
      type: String,
      default: ''
    },
    toDate: {
      type: String,
      default: ''
    }
  },
  computed: {
    fromDateString() {
      if (this.fromDate) {
        const date = new Date(this.fromDate)
        return `${this.$t('From')} ${date.getDate()} ${this.getMonth(date)}`
      }
    },
    toDateString() {
      if (this.toDate) {
        const date = new Date(this.toDate)
        return `${this.$t('To')} ${date.getDate()} ${this.getMonth(date)}`
      }
    },
    leftDays() {
      const oneDay = 24 * 60 * 60 * 1000;
      if (this.toDate) {
        return Math.ceil((new Date(this.toDate).setHours(23, 59, 59, 999) - new Date()) / oneDay)
      }
    },
    isLeftOneDay() {
      return this.leftDays === 1
    }
  },
  methods: {
    getMonth(date) {
      return this.$tc(new Date().toLocaleDateString('en-US', { month: 'long' }) + ' {count}', date)
    }
  }
}
</script>

<style lang="scss" scoped>
.date {
  margin-bottom: 20px;
  margin-top: auto;
}

.date-title {
  display: flex;
  align-items: baseline;
  font-family: DIN Pro;
  color: #9f9e9e;
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 4px;
}

.days-left-title {
  font-family: DIN Pro;
  font-size: 12px;
  line-height: 12px;
  color: #1A1919;
}

.days-left-title {
  margin-right: 4px;
}

.days-left-count,
.last-day-title {
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  color: #EE2C39;
}
</style>
