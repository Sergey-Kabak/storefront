<template>
  <div class="location">
    <div class="location-item">
      <div class="location-item-left">
        <div class="svg-logo" v-if="source.number">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M32.0519 11.8426C32.1728 11.804 32.332 11.8811 32.4911 12.0932C32.4911 12.0932 32.4911 12.0932 39.6852 19.2C40.1054 19.6241 40.1054 20.2667 39.6852 20.5815C39.6852 20.5815 39.6852 20.5815 32.4911 27.7976C32.332 28.0096 32.1728 28.061 32.0519 27.9968C31.9309 27.9325 31.8545 27.7462 31.8545 27.4763V12.3052C31.8545 12.0418 31.9309 11.8811 32.0519 11.8426Z" fill="#EC1B23"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.7448 0H20.2541L20.7443 0.205623C20.7443 0.205623 20.7443 0.205623 28.1485 7.63374C28.4668 8.05783 28.3586 8.37912 27.8302 8.37912C27.8302 8.37912 27.8302 8.37912 24.7615 8.37912C24.2331 8.37912 23.8129 8.80321 23.8129 9.33655C23.8129 9.33655 23.8129 9.33655 23.8129 14.8498C23.8129 15.3831 23.3864 15.8072 22.7497 15.8072C22.7497 15.8072 22.7497 15.8072 17.3573 15.8072C16.8289 15.8072 16.4024 15.3831 16.4024 14.8498C16.4024 14.8498 16.4024 14.8498 16.4024 9.33655C16.4024 8.80321 15.9822 8.37912 15.4474 8.37912H12.1687C11.6403 8.37912 11.5321 8.05783 11.8504 7.63374C11.8504 7.63374 11.8504 7.63374 19.2609 0.205623L19.7448 0Z" fill="#EC1B23"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.14587 11.6819C8.27956 11.7461 8.36233 11.9325 8.36233 12.2024V27.6883C8.36233 27.9582 8.27956 28.1188 8.14587 28.1702C8.01854 28.2216 7.83391 28.1702 7.61745 28.0096C7.61745 28.0096 7.61745 28.0096 0.315139 20.5815C-0.105046 20.2666 -0.105046 19.6241 0.315139 19.2C0.315139 19.2 0.31514 19.2 7.61745 11.8811C7.83391 11.669 8.01854 11.6176 8.14587 11.6819Z" fill="#EC1B23"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.3575 23.8715C17.3575 23.8715 17.3575 23.8715 22.7499 23.8715C23.3865 23.8715 23.8131 24.2956 23.8131 24.8289C23.8131 24.8289 23.8131 24.8289 23.8131 30.6634C23.8131 31.2996 24.2333 31.7237 24.7617 31.7237H27.6202C28.1486 31.7237 28.3587 32.0385 27.9385 32.3598C27.9385 32.3598 27.9385 32.3598 20.7445 39.6787C20.528 39.8907 20.267 40 19.9996 40C19.7386 40 19.4712 39.8907 19.2611 39.6787C19.2611 39.6787 19.2611 39.6787 12.067 32.3598C11.6404 32.0385 11.8505 31.7237 12.379 31.7237C12.379 31.7237 12.3789 31.7237 15.4476 31.7237C15.9824 31.7237 16.4025 31.2996 16.4025 30.6634C16.4025 30.6634 16.4025 30.6634 16.4025 24.8289C16.4025 24.2956 16.8291 23.8715 17.3575 23.8715Z" fill="#EC1B23"/>
          </svg>
        </div>
        <div class="logo" v-else>
          <img src="/assets/custom/Ringo_logo_green.svg" alt="logo">
        </div>
        <div class="location-left-data">
          <span class="name"> {{ locationName }} №{{ source.number || index  + 1}} </span>
          <span class="phone">{{ source.phone || '(097) 090-87-07' }}</span>
        </div>
      </div>
      <div class="location-item-middle">
        <div class="address">
          <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.99967 9.00008C6.08301 9.00008 5.33301 8.25008 5.33301 7.33342C5.33301 6.41675 6.08301 5.66675 6.99967 5.66675C7.91634 5.66675 8.66634 6.41675 8.66634 7.33342C8.66634 8.25008 7.91634 9.00008 6.99967 9.00008ZM11.9997 7.50008C11.9997 4.47508 9.79134 2.33341 6.99967 2.33341C4.20801 2.33341 1.99967 4.47508 1.99967 7.50008C1.99967 9.45008 3.62467 12.0334 6.99967 15.1167C10.3747 12.0334 11.9997 9.45008 11.9997 7.50008ZM6.99967 0.666748C10.4997 0.666748 13.6663 3.35008 13.6663 7.50008C13.6663 10.2667 11.4413 13.5417 6.99967 17.3334C2.55801 13.5417 0.333008 10.2667 0.333008 7.50008C0.333008 3.35008 3.49967 0.666748 6.99967 0.666748Z" fill="#23BE20"/>
          </svg>
          <span> {{ source.streetname }} {{ source.streetname2 }}</span>
        </div>
        <div class="working-time">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.99199 0.666626C4.39199 0.666626 0.666992 4.39996 0.666992 8.99996C0.666992 13.6 4.39199 17.3333 8.99199 17.3333C13.6003 17.3333 17.3337 13.6 17.3337 8.99996C17.3337 4.39996 13.6003 0.666626 8.99199 0.666626ZM9.00033 15.6666C5.31699 15.6666 2.33366 12.6833 2.33366 8.99996C2.33366 5.31663 5.31699 2.33329 9.00033 2.33329C12.6837 2.33329 15.667 5.31663 15.667 8.99996C15.667 12.6833 12.6837 15.6666 9.00033 15.6666ZM9.41699 4.83329H8.16699V9.83329L12.542 12.4583L13.167 11.4333L9.41699 9.20829V4.83329Z" fill="#BDBDBD"/>
          </svg>
          <span>{{ schedule }}</span>
        </div>
      </div>
      <div class="location-item-right">
        <div class="status" v-if="type === 'shop'">
          <div class="ellipsis"></div>
          <span>{{ $t('partial availability') }}</span>
        </div>
        <div class="weight-limit" v-if="type === 'new_post'">
          <div class="ellipsis"></div>
          Ограничение веса: до {{source.weightLimit}} кг
        </div>
        <div class="action">
          <button-full @click.native="$bus.$emit('checked-location', source)" type="button" :aria-label="$t('Pick up here')">{{ $t('Pick up here') }} </button-full>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ButtonFull from 'theme/components/theme/ButtonFull'

export default {
  props: ['source', 'index'],
  components: {
    ButtonFull
  },
  computed: {
    ...mapState({
      type: (state) => state.customShipping.type
    }),
    locationName() {
      const assoc = {
        new_post: this.$t('Department'),
        shop: this.$t('Ringoo')
      }
      return assoc[this.type]
    },
    schedule() {
      const schedule = this.source.schedule
      if (schedule) {
        return this.$t('schedule', { 
          mon: this.formatDay(schedule.Monday),
          sat: this.formatDay(schedule.Saturday),
          sun: this.formatDay(schedule.Sunday)}
        )
      } else {
        return this.$t('Пн-Пт: 8:00-20:00; Сб: 10:00-18:00; Вс: 11:00-17:00')
      }
    }
  },
  methods: {
    formatDay(day) {
      if (day === '-') {
        return this.$t('weekend')
      }
      return day
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~bootstrap';

</style>

<style lang="scss" scoped>

.location {
  &-item {
    padding: 15px;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 1fr 1fr auto;
  }
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    min-width: 40px;
    height: 40px;
    background: #1A1919;
    border-radius: 100%;
    padding: 10px 6px;
    box-sizing: border-box;
    margin-right: 15px;
    img {
      width: 100%;
    }
  }
  .svg-logo {
    width: 40px;
    height: 40px;
    min-width: 40px;
    margin-right: 15px;
  }
  .name {
    font-family: 'DIN Pro';
    font-size: 14px;
    line-height: 16px;
    color: #19223D;
    font-weight: 600;
  }
  .address {
    display: flex;
    align-items: center;
    font-family: 'DIN Pro';
    font-size: 13px;
    line-height: 16px;
    color: #595858;
    font-weight: 600;
    margin-bottom: 16px;

    svg {
      margin-right: 12px;
      min-width: 14px;
      min-height: 18px;
    }
  }
  .working-time {
    display: flex;
    align-items: center;
    font-family: 'DIN Pro';
    font-size: 13px;
    line-height: 16px;
    color: #595858;

    svg {
      margin-right: 12px;
      min-width: 18px;
      min-height: 18px;
    }

    span {
      display: block;
      max-width: 225px;
    }
  }
  .phone {
    font-family: 'DIN Pro';
    font-size: 13px;
    line-height: 16px;
    color: #595858;
  }
  .time {
    font-family: 'DIN Pro';
    font-size: 13px;
    line-height: 16px;
    color: #1A1919;
    margin-top: 10px;
  }
  .status {
    display: flex;
    align-items: baseline;
    font-family: 'DIN Pro';
    font-size: 13px;
    line-height: 16px;
    color: #EE8128;
    margin-bottom: 16px;

    .ellipsis {
      background-color: #EE8128;
    }
  }
}

.location-item-left {
  display: flex;
}

.location-left-data {
  display: flex;
  flex-direction: column;

  .name {
    margin-bottom: 4px;
  }
}

.location-item-right {
  display: flex;
  flex-direction: column;
  max-width: 131px;
}

.location-item-middle {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.action {
  width: 100%;
}

.weight-limit {
  display: flex;
  align-items: baseline;
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  margin-bottom: 16px;
  color: #1A1919;
}

</style>
