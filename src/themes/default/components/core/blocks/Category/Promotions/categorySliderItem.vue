<template>
  <div class="gradient-wrapper" @click="changeFilter(variant)">
    <div class="category-filter-item" :class="{ 'active': isActive }">
      <div class="category-filter-icon" v-if="icon[variant.id]" v-html="icon[variant.id]"></div>
      <div class="category-filter-label">{{variant.label}}</div>
    </div>
  </div>
</template>

<script>
import filterMixin from 'theme/mixins/filterMixin.ts';
import { mapGetters } from 'vuex';

export default {
  mixins: [filterMixin],
  data () {
    return {
      icon: {
        8269: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M27.4962 23.7102C27.081 24.6781 26.5681 25.6011 25.9654 26.4647C25.1602 27.6148 24.499 28.4095 23.9923 28.8519C23.2051 29.5746 22.3595 29.9465 21.4554 29.9675C20.8076 29.9675 20.025 29.7831 19.1134 29.4082C18.1988 29.0348 17.3592 28.8519 16.59 28.8519C15.7848 28.8519 14.9212 29.0348 13.9961 29.4082C13.0725 29.7831 12.3259 29.9795 11.7546 29.9975C10.8895 30.035 10.0244 29.6541 9.16224 28.8519C8.61198 28.3721 7.92378 27.5473 7.09764 26.3808C6.21303 25.1377 5.48585 23.6907 4.9161 22.0458C4.30587 20.2659 4 18.5445 4 16.8771C4 14.9683 4.41232 13.3203 5.23846 11.9408C5.86331 10.8574 6.75662 9.95318 7.83232 9.31525C8.89306 8.67898 10.104 8.33638 11.3408 8.3226C12.0305 8.3226 12.9346 8.53553 14.0546 8.95538C15.1746 9.37523 15.8943 9.58816 16.2077 9.58816C16.4446 9.58816 17.2407 9.33774 18.5961 8.84142C19.8751 8.38108 20.9546 8.19065 21.8392 8.26562C24.2381 8.45905 26.0389 9.40372 27.2368 11.1071C25.0928 12.4072 24.0327 14.226 24.0537 16.5607C24.0717 18.3796 24.7329 19.8925 26.0284 21.0936C26.6011 21.6417 27.2693 22.0803 28 22.3877C27.8411 22.848 27.6731 23.2873 27.4962 23.7102ZM21.9981 2.0713C21.9981 3.4958 21.4764 4.82733 20.4403 6.0584C19.1869 7.52188 17.6725 8.36909 16.0307 8.23563C16.0093 8.0565 15.9987 7.87623 15.9993 7.69582C15.9993 6.3268 16.593 4.86332 17.653 3.66524C18.1808 3.05945 18.8525 2.55413 19.6666 2.15227C20.4793 1.75641 21.247 1.53749 21.9696 1.5C21.9891 1.69193 21.9981 1.88237 21.9981 2.0713Z" fill="url(#paint0_linear)"/>
              <defs>
              <linearGradient id="paint0_linear" x1="16" y1="1.5" x2="16" y2="30" gradientUnits="userSpaceOnUse">
              <stop stop-color="#EE2C39"/>
              <stop offset="0.557292" stop-color="#FF5D81"/>
              </linearGradient>
              </defs>
              </svg>`,
        8250: `<svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3281 5.33002C5.90985 5.33002 2.32812 8.91174 2.32812 13.33V18.66C2.32812 23.0783 5.90984 26.66 10.3281 26.66H23.6581C28.0764 26.66 31.6581 23.0783 31.6581 18.66V13.33C31.6581 8.91174 28.0764 5.33002 23.6581 5.33002H10.3281ZM11.3281 11.9999H13.3281V14.9999H16.3281V16.9999H13.3281V19.9999H11.3281V16.9999H8.32812V14.9999H11.3281V11.9999ZM20.6582 11.9999H23.6582V14.9999H20.6582V11.9999ZM25.6582 16.9999H22.6582V19.9999H25.6582V16.9999Z" fill="url(#paint1_linear)"/>
              <defs>
              <linearGradient id="paint1_linear" x1="16.9931" y1="5.33002" x2="16.9931" y2="26.66" gradientUnits="userSpaceOnUse">
              <stop stop-color="#EE2C39"/>
              <stop offset="0.557292" stop-color="#FF5D81"/>
              </linearGradient>
              </defs>
              </svg>`,
        8257: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M26.6673 16C26.6673 12.6133 25.0806 9.58667 22.614 7.64L21.334 0H10.6673L9.40065 7.64C6.92065 9.58667 5.33398 12.6 5.33398 16C5.33398 19.4 6.92065 22.4133 9.40065 24.36L10.6673 32H21.334L22.614 24.36C25.0806 22.4133 26.6673 19.3867 26.6673 16ZM8.00065 16C8.00065 11.5867 11.5873 8 16.0007 8C20.414 8 24.0007 11.5867 24.0007 16C24.0007 20.4133 20.414 24 16.0007 24C11.5873 24 8.00065 20.4133 8.00065 16Z" fill="url(#paint2_linear)"/>
              <defs>
              <linearGradient id="paint2_linear" x1="16.0007" y1="0" x2="16.0007" y2="32" gradientUnits="userSpaceOnUse">
              <stop stop-color="#EE2C39"/>
              <stop offset="0.557292" stop-color="#FF5D81"/>
              </linearGradient>
              </defs>
              </svg>`,
        8263: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.69922 2.70001C7.59465 2.70001 6.69922 3.59544 6.69922 4.70001V27.3C6.69922 28.4046 7.59465 29.3 8.69922 29.3H23.2992C24.4038 29.3 25.2992 28.4046 25.2992 27.3V4.70001C25.2992 3.59544 24.4038 2.70001 23.2992 2.70001H8.69922ZM16 25.2C17.1046 25.2 18 24.3046 18 23.2C18 22.0954 17.1046 21.2 16 21.2C14.8954 21.2 14 22.0954 14 23.2C14 24.3046 14.8954 25.2 16 25.2Z" fill="url(#paint3_linear)"/>
            <defs>
            <linearGradient id="paint3_linear" x1="15.9992" y1="2.70001" x2="15.9992" y2="29.3" gradientUnits="userSpaceOnUse">
            <stop stop-color="#EE2C39"/>
            <stop offset="0.557292" stop-color="#FF5D81"/>
            </linearGradient>
            </defs>
            </svg>`,
        8259: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="9.60156" y="4.21423" width="2" height="8" transform="rotate(-45 9.60156 4.21423)" fill="url(#tv0_linear)"/>
              <rect width="2" height="8" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 22.6016 4.21423)" fill="url(#tv1_linear)"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2.80078 10.4C2.80078 9.29545 3.69621 8.40002 4.80078 8.40002H27.4008C28.5054 8.40002 29.4008 9.29545 29.4008 10.4V27.4C29.4008 28.5046 28.5054 29.4 27.4008 29.4H4.80078C3.69621 29.4 2.80078 28.5046 2.80078 27.4V10.4ZM26.4004 13.4C26.4004 14.5046 25.505 15.4 24.4004 15.4C23.2958 15.4 22.4004 14.5046 22.4004 13.4C22.4004 12.2954 23.2958 11.4 24.4004 11.4C25.505 11.4 26.4004 12.2954 26.4004 13.4ZM24.4004 21.4C25.505 21.4 26.4004 20.5046 26.4004 19.4C26.4004 18.2954 25.505 17.4 24.4004 17.4C23.2958 17.4 22.4004 18.2954 22.4004 19.4C22.4004 20.5046 23.2958 21.4 24.4004 21.4Z" fill="url(#tv2_linear)"/>
              <defs>
              <linearGradient id="tv0_linear" x1="10.6016" y1="4.21423" x2="10.6016" y2="12.2142" gradientUnits="userSpaceOnUse">
              <stop stop-color="#EE2C39"/>
              <stop offset="0.557292" stop-color="#FF5D81"/>
              </linearGradient>
              <linearGradient id="tv1_linear" x1="1" y1="0" x2="1" y2="8" gradientUnits="userSpaceOnUse">
              <stop stop-color="#EE2C39"/>
              <stop offset="0.557292" stop-color="#FF5D81"/>
              </linearGradient>
              <linearGradient id="tv2_linear" x1="16.1008" y1="8.40002" x2="16.1008" y2="29.4" gradientUnits="userSpaceOnUse">
              <stop stop-color="#EE2C39"/>
              <stop offset="0.557292" stop-color="#FF5D81"/>
              </linearGradient>
              </defs>
              </svg>`
      }
    }
  },
  computed: {
    ...mapGetters({
      getAvailableFilters: 'category-next/getAvailableFilters'
    })
  },
  methods: {
    async changeFilter (filterVariant) {
      this.$store.dispatch('category-next/switchSearchFilters', [filterVariant])
    }
  }
}
</script>

<style lang="scss" scoped>
.gradient-wrapper{
  background: linear-gradient(180deg, #EE2C39 0%, #FF5D81 55.73%);
  border-radius: 4px;
  padding: 1px;
  margin: 0 auto;
  cursor: pointer;
  width: 138px;
  height: 100px;
}
.category-filter {
  &-item{
    &.active{
      background: linear-gradient(180deg, #EE2C39 0%, #FF5D81 55.73%);
      .category-filter-label{
        color: #fff;
      }
      category-filter-icon{
        fill: #fff;
      }
      ::v-deep svg path {
        fill: #fff;
      }
    }
    padding: 12px;
    background: #fff;
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 4px;
  }
  &-icon{
    margin-bottom: auto;
  }
  &-label{
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 20px;
    color: #1A1919;
    margin-top: auto;
  }
}
</style>
