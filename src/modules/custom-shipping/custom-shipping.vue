<template>
  <div class="custom-shipping">
    <div class="shipping-show-types" v-if="['shop'].includes(type)">
      <div class="btn" :class="{active: trigger}" @click="trigger = true">{{ $t('List') }}</div>
      <div class="btn" :class="{active: !trigger}" @click="trigger = false">{{ $t('On map') }}</div>
    </div>
    <no-ssr>
      <div class="shipping-types">
        <div class="new-post" v-if="(type === 'new_post')">
          <base-input
            class="custom-input new-post-input"
            type="text"
            :autofocus="true"
            name="number"
            :placeholder="$t('Number or address of New Post')"
            v-model.trim="np_number"
          />
          <custom-loader v-if="loading" />
          <location-list v-else :locations="cDroppoints" />
        </div>
        <div class="shop" v-if="type === 'shop'">
          <div class="listing" :class="{active: trigger}">
            <custom-loader v-if="loading" />
            <location-list v-else :locations="cDroppoints" />
          </div>
          <template>
            <google-map :center="center" :droppoints="droppoints" :stock-id="stockId"  :class="{active: !trigger}"/>
          </template>
        </div>
        <div class="currier-form" v-if="type === 'currier'">
          <div class="label">{{ $t('Delivery address') }}<i>*</i></div>
          <div class="currier-form__wrapper">
            <base-input
              class="custom-input custom-input-street"
              type="text"
              :autofocus="true"
              name="address"
              :placeholder="$t('Адрес *')"
              v-model.trim="currierAddress.address"
              @blur="$v.currierAddress.address.$touch()"
              :class="{ error: ($v.currierAddress.address.$error && !$v.currierAddress.address.required) }"
              :validations="[
                {
                  condition: $v.currierAddress.address.$error && !$v.currierAddress.address.required,
                  text: $t('Field is required')
                }
              ]"
            />
            <base-input
              class="custom-input custom-input-house"
              type="text"
              :autofocus="true"
              name="house"
              :placeholder="$t('Дом *')"
              v-model.trim="currierAddress.house"
              @blur="$v.currierAddress.house.$touch()"
              :class="{ error: ($v.currierAddress.house.$error && !$v.currierAddress.house.required) }"
              :validations="[
                {
                  condition: $v.currierAddress.house.$error && !$v.currierAddress.house.required,
                  text: $t('Field is required')
                }
              ]"
            />
            <base-input
              class="custom-input"
              type="text"
              :autofocus="true"
              name="apartmentNumber"
              :placeholder="$t('Кв *')"
              v-model.trim="currierAddress.apartmentNumber"
              @blur="$v.currierAddress.apartmentNumber.$touch()"
              :class="{ error: ($v.currierAddress.apartmentNumber.$error && !$v.currierAddress.apartmentNumber.required) }"
              :validations="[
                {
                  condition: $v.currierAddress.apartmentNumber.$error && !$v.currierAddress.apartmentNumber.required,
                  text: $t('Field is required')
                }
              ]"
            />
          </div>
          <button-full
            :aria-label="$t('next')"
            @click.native="validateData()"
          >
            {{ $t('next') }}
          </button-full>
        </div>
      </div>
    </no-ssr>
  </div>
</template>

<script>
import CustomLoader from 'theme/components/core/CustomLoader.vue'
import LocationList from 'src/modules/locations/locations-list'
import GoogleMap from 'src/modules/google-map/google-map'
import NoSSR from 'vue-no-ssr'
import CustomShippingMixin from 'src/modules/custom-shipping/mixin'
import Vue from 'vue';
import VuePlaceAutocomplete from 'vue-place-autocomplete';
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import { required } from 'vuelidate/lib/validators';
import ButtonFull from 'theme/components/theme/ButtonFull'
Vue.use(VuePlaceAutocomplete);


export default {
  mixins: [CustomShippingMixin],
  components: {
    LocationList,
    GoogleMap,
    'no-ssr': NoSSR,
    BaseInput,
    CustomLoader,
    ButtonFull
  },
  validations: {
    currierAddress: {
      address: {
        required,
      },
      house: {
        required
      },
      apartmentNumber: {
        required
      }
    }
  },
  methods: {
    validateData() {
      if (this.$v.currierAddress.$invalid) {
        this.$v.currierAddress.$touch()
      } else {
        this.next()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.shop {
  display: flex;
}

.button-full {
  max-width: 195px;
}

.listing {
  width: 100%;
  margin-right: 76px;
}

.google-map {
  max-width: 596px;
  width: 100%;
}

.custom-shipping {
  width: 100%;
  @media (max-width: 768px) {
    .hide {
      display: none;
    }
  }
  .shipping-show-types {
    display: none;
    align-items: center;
    background: #F2F2F2;
    border-radius: 4px;
    .btn {
      width: 50%;
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 16px;
      text-align: center;
      color: #000000;
      padding: 12px 0;
      &.active {
        background: #FFFFFF;
        border: 1px solid #23BE20;
        box-sizing: border-box;
        border-radius: 4px;
      }
    }
  }
  .currier-form {
    .label {
      font-family: DIN Pro;
      font-size: 13px;
      line-height: 16px;
      color: #595858;
      margin-bottom: 12px;
      i {
        color: #23BE20;
      }
    }
    &__wrapper {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .custom-input {
        width: 100%;
        max-width: 148px;
        margin-right: 20px;

        &-street {
          max-width: 316px;
        }

        &:last-child {
          margin-right: 0;
        }

        &.error {
          label {
            color: #EE2C39;
          }

          input, input:focus {
            border-color: #EE2C39;
          }
        }
      }
    }
  }
  .btn.green-btn {
    background: #23BE20;
    border-radius: 4px;
    font-family: DIN Pro;
    font-weight: 500;
    font-size: 15px;
    line-height: 16px;
    color: #FFFFFF;
    padding: 12px 53px;
  }
  .autocomplete-field {
    width: 100%;
    .for {
      position: absolute;
      z-index: 1;
      top: 10px;
      transition: all .3s;
    }
    .has-focus, .has-changed {
      .for {
        padding: 0 10px;
        background: #ffffff;
        opacity: 1;
        margin-top: 0;
        color: #23BE20;
        top: -8px;
      }
      .form-control, input {
        border-color: #23BE20 !important;
      }
    }
    .form-control {
      width: 100%;
      outline: none;
      font-family: DIN Pro;
      font-size: 13px !important;
      line-height: 16px;
      color: #1A1919;
    }
  }
}

@media (max-width: 1120px) {
  .shipping-show-types {
    display: block;
    margin-bottom: 16px;
  }

  .custom-shipping {
    .shipping-show-types {
      display: flex!important;
    }
  }

  .shop {
    grid-template-columns: 1fr;
  }

  .google-map,
  .listing {
    display: none;

    &.active {
      display: block;
    }
  }
  .google-map {
    max-width: 100%;
  }

  .listing {
    margin-right: 0;
  }
}

@media (max-width: 540px) {
  ::v-deep .location-item  {
    grid-template-rows: auto auto auto;
    grid-gap: 16px;
    grid-template-columns: 1fr;

    .working-time {
      span {
        max-width: 100%;
      }
    }

    .location-item-right {
      max-width: 100%;
    }

    .action {
      .button-full {
        max-width: 100%;
      }
    }
  }

  .custom-shipping {
    .currier-form__wrapper {
      .custom-input-street {
        margin-right: 0;
        max-width: 100%;
      }

      .custom-input-house {
        margin-right: 4%;
      }

      .custom-input {
        &:not(.custom-input-street) {
          max-width: 48%;
        }
      }
    }
  }
  .button-full  {
    max-width: 100%;
  }
}
</style>

<style lang="sass" >
  .shipping-listing
    display: flex
  .custom-shipping
    input
      background: #FFFFFF
      border: 1px solid #E0E0E0
      box-sizing: border-box
      border-radius: 4px
      padding: 16px
      font-family: DIN Pro
      font-size: 13px !important
      line-height: 16px
        color: #1A1919
    input:focus ~ label,
    input:not(.empty) ~ label
      padding: 0 10px
      background: #ffffff
      opacity: 1
      margin-top: 0
      color: #23BE20
    input:focus
      border-color: #23BE20;
    &.error
      input:focus ~ label,
      input:not(.empty) ~ label,
      label
        color: #EE2C39
      input:focus, input
        border-color: #EE2C39;

</style>

<style lang="scss" scoped>
  @import '~bootstrap';
</style>
