<template>
  <div>
    <div class="time-wrapper">
      <div class="time">{{ getTimerData().days }}</div>
      <div class="time">{{ getTimerData().hours }}</div>
      <div class="time">{{ getTimerData().minutes }}</div>
      <div class="time">{{ getTimerData().seconds }}</div>
    </div>
    <div class="text-wrapper">
      <div class="text">{{ $t('d') }}</div>
      <div class="text">{{ $t('h') }}</div>
      <div class="text">{{ $t('m') }}</div>
      <div class="text">{{ $t('s') }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    endTime: {
      type: Number | String,
      required: true
    }
  },
  data () {
    return {
      timerData: {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      },
    }
  },
  methods: {
    getTimerData () {
      this.interval = setInterval(() => {
        let countDownDate = this.endTime;
        let now = new Date().getTime();
        let diff = countDownDate - now;
        let tdays = Math.floor(diff / (1000 * 60 * 60 * 24));
        let thours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let tminutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let tseconds = Math.floor((diff % (1000 * 60)) / 1000);

        this.timerData.days = (tdays < 10) ? '0' + tdays : tdays;
        this.timerData.hours = (thours < 10) ? '0' + thours : thours;
        this.timerData.minutes = (tminutes < 10) ? '0' + tminutes : tminutes;
        this.timerData.seconds = (tseconds < 10) ? '0' + tseconds : tseconds;

        if (diff < 0) {
          clearInterval(this.interval);
          this.expired = true;
        }
      }, 1000, true);
      return {
        days: this.timerData.days,
        hours: this.timerData.hours,
        minutes: this.timerData.minutes,
        seconds: this.timerData.seconds
      };
    }
  }
}
</script>

<style lang="scss" scoped>
  .time-wrapper, .text-wrapper {
    display: flex;
    align-items: center;
    margin: 0 -10px;
  }
  .time {
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    color: #EE2C39;
    width: 40px;
    text-align: center;
    position: relative;
    &:not(:last-child) {
      &:after {
        position: absolute;
        right: -2px;
        top: -2px;
        content: ':';
        display: block;
      }
    }
  }
  .text {
    font-family: DIN Pro;
    font-style: normal;
    font-size: 12px;
    line-height: 12px;
    color: #1A1919;
    width: 40px;
    text-align: center;
  }
</style>
