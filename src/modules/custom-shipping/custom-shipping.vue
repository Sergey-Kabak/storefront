<template>
  <div class="custom-shipping">
    <div class="hidden-md col-sm-12 mb20">
      <div class="custom-trigger">
        <div class="row">
          <div class="btn" :class="{active: trigger}" @click="trigger = true">Списком</div>
          <div class="btn" :class="{active: !trigger}" @click="trigger = false">На карте</div>
        </div>
      </div>
    </div>
    <no-ssr>
      <div class="container-fluid">
        <div class="row" v-if="(type === 'new_post')">
          <div class="col-sm-8 mx-auto mb-5">
            <base-input
                class="custom-input col-sm-12"
                type="text"
                :autofocus="true"
                name="number"
                :placeholder="$t('Номер отделения')"
                v-model.trim="np_number"
            />
          </div>
        </div>
        <div class="row">
          <div class="p-0" :class="[(type === 'shop') ? 'col-sm-7' : 'col-sm-8 m-auto', {'hide': !trigger}]">
            <template v-if="!type.includes('currier')">
              <custom-loader v-if="loading" />
              <template v-else>
                <location-list class="hidden-xs col-sm-12" :locations="cDroppoints" />
                <mobile-location-list class="hidden-md col-sm-12" :locations="cDroppoints" />
              </template>
            </template>
            <template v-else>
              <div class="currier-form">
                <div class="label">Адрес доставки<i>*</i></div>
                <div class="currier-form__wrapper">
                  <!--<place-autocomplete-field-->
                      <!--:component-restrictions="{country: 'ua'}"-->
                      <!--v-model="currierAddress.address"-->
                      <!--label="Улица *"-->
                      <!--name="field2"-->
                      <!--class="col-xs-5 custom-input"-->
                      <!--api-key="AIzaSyBNfA38HlGRbKD4vL5_Y8el1dp0o8NC3Tc"-->
                      <!--placeholder=""-->
                      <!--v-place-autofill.zipcode="currierAddress.zipcode"-->
                  <!--/>-->
                  <base-input
                      class="custom-input col-md-5 col-xs-12"
                      type="text"
                      :autofocus="true"
                      name="address"
                      :placeholder="$t('Адрес *')"
                      v-model.trim="currierAddress.address"
                  />
                  <base-input
                      class="custom-input col-md-2 col-xs-4"
                      type="text"
                      :autofocus="true"
                      name="house"
                      :placeholder="$t('Дом *')"
                      v-model.trim="currierAddress.house"
                  />
                  <base-input
                      class="custom-input col-md-2 col-xs-4"
                      type="text"
                      :autofocus="true"
                      name="apartmentNumber"
                      :placeholder="$t('Кв *')"
                      v-model.trim="currierAddress.apartmentNumber"
                  />
                  <!--<base-input-->
                      <!--class="custom-input col-md-3 col-xs-4 mt-xs-5"-->
                      <!--type="text"-->
                      <!--:autofocus="true"-->
                      <!--name="zipcode"-->
                      <!--:placeholder="$t('Индекс *')"-->
                      <!--v-model.trim="currierAddress.zipcode"-->
                  <!--/>-->
                </div>
                <div
                    class="btn green-btn mt20 ml10"
                    @click="next"
                    :disabled="!(currierAddress.house && currierAddress.address && city)"
                >
                  Далее
                </div>
              </div>
            </template>
          </div>
          <div class="col-sm-5" :class="{'hide': trigger}" v-if="type === 'shop'">
            <google-map :center="center" :droppoints="droppoints" :stock-id="stockId" />
          </div>
        </div>
      </div>
    </no-ssr>
  </div>
</template>

<script>
import CustomLoader from 'theme/components/core/CustomLoader.vue'
import LocationList from 'src/modules/locations/locations-list'
import MobileLocationList from 'src/modules/locations/mobile-location-list'
import GoogleMap from 'src/modules/google-map/google-map'
import CitySelect from 'src/modules/custom-shipping/components/city-select'
import NoSSR from 'vue-no-ssr'
import CustomShippingMixin from 'src/modules/custom-shipping/mixin'
import Vue from 'vue';
import VuePlaceAutocomplete from 'vue-place-autocomplete';
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'

Vue.use(VuePlaceAutocomplete);

export default {
  mixins: [CustomShippingMixin],
  components: {
    LocationList,
    MobileLocationList,
    GoogleMap,
    CitySelect,
    'no-ssr': NoSSR,
    BaseInput,
    CustomLoader
  },
}
</script>

<style lang="scss">
  .custom-shipping {
    width: 100%;
    @media (max-width: 768px) {
      width: calc(100% - 28px) !important;
      .hide {
        display: none;
      }
    }
    .custom-trigger {
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
      height: calc(100vh - 530px);
      .label {
        font-family: DIN Pro;
        font-size: 13px;
        line-height: 16px;
        color: #5F5E5E;
        margin-bottom: 12px;
        i {
          color: #23BE20;
        }
      }
      &__wrapper {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
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
</style>

<style lang="sass">
  .custom-shipping
    .custom-input
      min-height: auto
      &:not(:first-child)
        @media (max-width: 768px)
          margin-top: 20px

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
      label
        font-family: 'DIN Pro'
        font-size: 13px
        line-height: 16px
        color: #5F5E5E
        opacity: .6
        margin: 5px 0 0 5px;
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
