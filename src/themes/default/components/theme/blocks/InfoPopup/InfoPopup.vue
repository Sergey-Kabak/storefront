<template>
  <div class="marker-info">
    <div class="close-icon" @click="close()">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#BDBDBD"/>
      </svg>
    </div>
    <div class="content">
      <div class="address">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="8" cy="8" r="8" fill="#1A1919"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.43081 3.5C8.40841 3.5 7.44373 3.85479 6.66961 4.50721V3.99891H5V12.5H6.66684V12.4963H6.66961V7.91834C6.72536 6.28321 7.89325 5.06492 9.43081 5.06492C9.71626 5.06492 9.98946 5.10697 10.2449 5.18658C10.2496 5.18781 10.2595 5.19107 10.2595 5.19107L11 3.796C10.507 3.60207 9.9772 3.5 9.43081 3.5Z" fill="#23BE20"/>
        </svg>
        {{ marker.city }}, {{ marker.streetAddress || marker.streetname }} {{ marker.apartmentNumber || marker.streetname2 }}
      </div>
      <div class="metro" v-if="marker.metro">
        {{ marker.metro }}
      </div>
      <br v-if="marker.work_mode">
      <div class="work-mode" v-if="marker.work_mode">
        {{ marker.work_mode }}
      </div>
      <div class="work-mode-weekend" v-if="marker.work_mode_weekend">
        {{ marker.work_mode_weekend }}
      </div>

      <div class="working-hours">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.992 0C3.576 0 0 3.584 0 8C0 12.416 3.576 16 7.992 16C12.416 16 16 12.416 16 8C16 3.584 12.416 0 7.992 0ZM8 14.4C4.464 14.4 1.6 11.536 1.6 8C1.6 4.464 4.464 1.6 8 1.6C11.536 1.6 14.4 4.464 14.4 8C14.4 11.536 11.536 14.4 8 14.4Z" fill="#BDBDBD"/>
          <path d="M8.4002 4H7.2002V8.8L11.4002 11.32L12.0002 10.336L8.4002 8.2V4Z" fill="#BDBDBD"/>
        </svg>
        <div class="working-time">{{ marker.time || `Пн-Пт: 08:00-20:00; Сб: 10:00-18:00; Вс:11:00-17:00` }}</div>
      </div>

      <div v-if="!hideProducts">
        <button
          @click="onClick()"
          class="btn btn-success pickup-btn"
        >
          {{ $t('Pick up here') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import DroppointActionButton from 'src/modules/droppoint-shipping/components/DroppointActionButton.vue'

export default {
  name: 'InfoPopup',
  components: {DroppointActionButton},
  props: {
    marker: {
      required: true,
      type: Object
    },
    checked: {
      required: true,
      type: String
    },
    isMap: {
      required: false,
      type: Boolean,
      default: true
    },
    hideProducts: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick () {
      this.$bus.$emit('checked-location', this.marker);
    },
    close () {
      this.$emit("close");
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~bootstrap';
</style>

<style lang="scss">
.google-map {
  .gm-style {
    .gm-style-iw-c {
      max-width: 400px !important;
    }
    .gm-style-iw-d {
      max-width: 400px !important;
      overflow: hidden!important;
    }
  }
}
@media screen and (max-width: 420px) {
  .google-map {
    .gm-style {
      .gm-style-iw-c {
        max-width: 250px !important;
      }
      .gm-style-iw-d {
        max-width: 250px !important;
      }
    }
  }
}
.google-map {
  .gm-style-iw.gm-style-iw-c {
    max-width: 280px!important;
    padding: 16px!important;

    & > button {
      display: none!important;
    }
  }
}
.marker-info {
  overflow: hidden!important;
  .close-icon {
    position: absolute;
    right: 16px;
    top: 16px;
    cursor: pointer;
  }
  .title {
    text-transform: uppercase;
    color: #009777;
    font-weight: bold;
  }
  .content {
    .address {
      display: flex;
      align-items: center;
      font-family: 'DIN Pro';
      font-style: normal;
      font-weight: 600;
      font-size: 13px;
      line-height: 16px;
      color: #5F5E5E;
      padding-right: 20px;
      svg {
        margin-right: 12px;
        width: 16px;
        height: 16px;
        min-width: 16px;
        min-height: 16px;
      }
    }
    .working-hours {
      margin-top: 16px;
      display: flex;
      align-items: flex-start;
      font-family: 'DIN Pro';
      font-style: normal;
      font-size: 13px;
      line-height: 16px;
      color: #5F5E5E;
      svg {
        margin-right: 12px;
        width: 16px;
        height: 16px;
        min-width: 16px;
        min-height: 16px;
      }
    }
  }
  .pickup-btn {
    margin-top: 16px;
    width: 100%;
  }
  .metro {
    position: relative;
    padding-left: 15px;

    &:before {
      position: absolute;
      content: '';
      display: block;
      width: 5px;
      height: 5px;
      top: 3px;
      left: 0;
      border: 4px solid #24b9f1;
      -webkit-border-radius: 100%;
      -moz-border-radius: 100%;
      border-radius: 100%;
    }
  }
  .alert {
    line-height: 38px;
    font-size: 12px;
    i {
      position: relative;
      left: 0;
      bottom: 2px;
      display: inline-block;
      margin-right: 5px;
      width: 5px;
      height: 5px;
      border-radius: 100%;
    }
    &.yellow {
      color: #ffad2e;
      i {
        background: #ffad2e;
      }
    }
    &.green {
      color: #009777;
      i {
        background: #009777;
      }
    }
  }
  .select-btn {
    border: none;
    background: #23BE20;
    border-radius: 4px;
    font-family: DIN Pro;
    font-size: 15px;
    line-height: 16px;
    color: #FFFFFF;
    padding: 12px;
    width: 100%;
    text-align: center;
  }
}
</style>
