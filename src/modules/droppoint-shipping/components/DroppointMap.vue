<template>
  <div class="droppoint-map">
    <custom-loader v-if="loadData" />

    <div v-if="!loadData">
      <div class="row" v-if="isMobNavShow">
        <droppoint-navigation :is-show="showList" class="drp-navigation" @onNavClick="onNavClick" />
      </div>

      <div class="row mob-city-select" v-if="isMobNavShow">
        <div class="col-xs-12">
          <city-select :options="citiesOptions" :selected="city" :error="error" @onCityChange="changeCity" />
        </div>
      </div>

      <div class="col-sm-12">
        <div :class="[mob ? 'tab-content' : 'row']">
          <div v-if="(mob && showList) || !mob" id="panel2" class="tab-pane col-sm-12 col-lg-7">
            <div class="row desk-city-select">
              <city-select :options="citiesOptions" :selected="city" :error="error" @onCityChange="changeCity" />
            </div>
            <!--<div v-if="!hideProducts" class="row">-->
              <!--<pharmacy-filter />-->
            <!--</div>-->
            <pharmacy-list
              :stock-id="stockId"
              :is-product="isProduct"
              :droppoints="droppoints"
              :hide-products="hideProducts"
              :city="city"
              :items="items"
              @sendDataToCheckout="sendDataToCheckout"
              @onScrollShowNav="onScrollShowNav"
              :products="products"
            />
          </div>

          <div v-show="(mob && !showList) || !mob" id="panel1" class="tab-pane active in col-sm-12 col-lg-5">
            <!--<h4 class="col-xs-12" v-if="!isProduct && !hideProducts">{{ $t('Choose shop') }}</h4>-->
            <i class="material-icons" @click="onNavClick(true)">close</i>
            <no-ssr>
              <div>
                <google-map v-if="isOnline"
                            :droppoints="droppoints"
                            :center="center"
                            :stock-id="stockId"
                            :hide-products="hideProducts"
                            :is-product="isProduct"
                            :selected="selected"
                />
                <div class="loading" v-else>
                  loading ...
                </div>
              </div>
            </no-ssr>
          </div>
        </div>
      </div>

      <span :key="index" v-for="(field, index) in extraFields">
        {{ field.title }}
        <input type="text"
               v-model="shipping.extraFields[index]"
               @keyup="$v.shipping.extraFields[index].$touch(); setShipping()"
        >
        <span
          class="validation-error"
          v-if="$v.shipping.extraFields[index].$error && !$v.shipping.extraFields[index].required"
        >
          {{ $t('Field is required') }}
        </span>
      </span>
    </div>
  </div>
</template>

<script>

import CustomLoader from 'theme/components/core/CustomLoader.vue'
import GoogleMap from '@vue-storefront/theme-default/components/core/blocks/GoogleMap/GoogleMap'

import CitySelect from 'src/modules/droppoint-shipping/components/CitySelect'
import DroppointWrapper from 'src/modules/droppoint-shipping/components/DroppointWrapper'
import PharmacyList from '@vue-storefront/theme-default/components/theme/blocks/PharmacyList/PharmacyList'
import DroppointNavigation from 'src/modules/droppoint-shipping/components/DroppointNavigation'
import PharmacyFilter from 'src/modules/pharmacy-filters/PharmacyFilter'

export default {
  name: 'DroppointMap',
  components: {CitySelect, CustomLoader, GoogleMap, PharmacyList, DroppointNavigation, PharmacyFilter},
  mixins: [DroppointWrapper]
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700,800');
  .droppoint-map * {
    font-family: 'Open Sans', sans-serif;
  }
  .droppoint-map #panel1 > i {
    display: none;
  }
  @media all and (max-width: 1200px) {
    .droppoint-map #dropdown-1 .dropdown-menu.show {
      margin-left: -25px;
    }
    .droppoint-map #dropdown-2 .dropdown-menu.show {
      margin-left: 5px;
    }
  }
  .droppoint-map {
    .select-wrapper .label {
      display: none;
    }
    #panel2.tab-pane {
      position: relative;

      &.col-sm-6 {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding-right: 30px;
      }
    }
    .drp-navigation, .mob-city-select {
      display: none;
    }

    @media all and (max-width: 991px) {
      .drp-navigation, .mob-city-select {
        display: block;
      }
      .mob-city-select {
        .label {
          display: none;
        }
      }
      .desk-city-select {
        display: none;
      }
      .pharmacy-filter {
        padding-top: 15px;
        padding-bottom: 15px;
      }
    }
    @media screen and (max-height: 820px) and (max-width: 420px) {
      .pharmacy-filter {
        padding-top: 0;
        padding-bottom: 0;
      }
      #panel1 {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100vh;
        width: 100vw;
        z-index: 9;
        & > i {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 40px;
          font-weight: bold;
          z-index: 10;
          display: block;
        }
        .map-container {
          width: 100vw;
          height: 100vh;
        }
      }
    }
  }
</style>
