<template>
  <div class="card marker-info">
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">
            {{ $t('Pharmacy') }} {{ marker.name }}
          </p>
        </div>
      </div>
      <div class="content">
        <div class="address">
          <i class="material-icons">room</i>
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
        <div class="container mt10" v-if="!hideProducts">
          <div class="row">
            <div class="col-sm-6">
              <div class="alert" :class="(marker.missing && marker.missing.length) ? 'yellow': 'green'">
                <i />{{ (marker.missing && marker.missing.length) ? $t('Partial availability') : $t('In place') }}
              </div>
            </div>
            <div class="col-sm-6">
              <droppoint-action-button
                v-if="marker && isMap && !hideProducts"
                :hide-products="false"
                :is-favorite="false"
                :id="marker.id || ''"
                :checked="checked"
                :item="marker"
                @onClick="onClick"
              />
            </div>
          </div>
        </div>
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
    onClick (id) {
      this.$emit('get:selected', id)
    }
  }
}
</script>

<style lang="scss">
.google-map {
  .gm-style {
    .gm-style-iw-c {
      max-width: 400px !important;
    }
    .gm-style-iw-d {
      max-width: 400px !important;
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
.marker-info {
  .title {
    text-transform: uppercase;
    color: #009777;
    font-weight: bold;
  }
  .content {
    .address {
      font-size: 13px;
      line-height: 20px;
      color: #8B93A7;
      position: relative;
      padding-left: 20px;
      i {
        line-height: 20px !important;
        position: absolute;
        left: 0;
        top: 0;
        font-size: 18px;
        color: #BFC5D2;
      }
    }
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
}
</style>
