<template>
  <div class="availability-sheet" :class="{'orange-border': opened}">
    <div class="flex-container w-100 pharmacy-info">
      <div class="flex-item">
        <div class="info">
          <div class="btn-group b-dropdown m-md-2">
            <div class="btn btn-secondary text-decoration-none pointer" @click="showDD">
              <div style="display: block; width: 68px;height: 68px;border-radius: 100%; background: #363636;position: relative;text-align: center;">
                <span style="display: block;position: absolute;font-size: 18px;color: #23BE20;font-weight: bold; top: 20px;left: 0;right: 0;margin: 0 auto;">ringoo</span>
              </div>
              <!--<img class="pharmacy-logo" src="/assets/pharmacy.png" alt="">-->
            </div>
          </div>
        </div>
        <p class="title mob">
          <i class="material-icons"
             @click="$emit('toggle:favorite', {item, action: isFavorite ? 'fromFavorite' : 'toFavorite'})"
          >
            {{ isFavorite ? 'favorite' : 'favorite_border' }}
          </i>
          {{ $t('Plantain') }} №{{ item.pharmacy_number }}
        </p>
      </div>
      <div class="flex-item">
        <div class="content">
          <p class="title">
            <i class="material-icons"
               @click="$emit('toggle:favorite', {item, action: isFavorite ? 'fromFavorite' : 'toFavorite'})"
            >
              {{ isFavorite ? 'favorite' : 'favorite_border' }}
            </i>
            {{ $t('Plantain №') }}{{ item.pharmacy_number }}
          </p>
          <p class="work-time" v-if="item.work_mode">
            <i class="material-icons">watch_later</i>{{ item.work_mode }}
          </p>
          <div class="address-mob">
            <p class="metro" v-if="item.metro">
              <img src="/assets/metro.png" alt=""> {{ item.metro }}
            </p>
            <p :class="['address', item.metro ? 'with-metro' : '']">
              <i class="material-icons">room</i>
              {{ $t('st.') }} {{ item && (item.streetAddress || item.streetname) }},
              {{ item.apartmentNumber || item.streetname2 }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex-item">
        <div class="content">
          <p class="metro" v-if="item.metro">
            <img src="/assets/metro.png" alt=""> {{ item.metro }}
          </p>
          <p :class="['address', item.metro ? 'with-metro' : '']">
            <i class="material-icons">room</i>
            {{ $t('st.') }} {{ item && (item.streetAddress || item.streetname) }},
            <br>
            {{ item.apartmentNumber || item.streetname2 }}
          </p>
        </div>
      </div>
      <div class="flex-item">
        <div class="flex-column">
          <div class="item">
            <button-full type="submit" :aria-label="$t('Get here')">
              {{ $t('Get here') }}
            </button-full>
            <!--<droppoint-action-button-->
              <!--v-if="!hideActions"-->
              <!--:hide-products="hideProducts"-->
              <!--:is-favorite="isFavorite"-->
              <!--:id="item.company || item.id"-->
              <!--:checked="checked"-->
              <!--:item="item"-->
            <!--/>-->
          </div>
          <!--<div v-if="!hideProducts" class="item">-->
            <!--<div v-if="!(missing && missing.length)" class="available all">-->
              <!--<i />{{ $t('In place') }} {{ $t('all products') }}-->
            <!--</div>-->
            <!--<div v-if="item.missing && item.missing.length" class="available not-all">-->
              <!--<i />-->
              <!--{{ $t('Partial availability') }}-->
              <!--&lt;!&ndash;{{ $t('In place') }}: {{ products.length - missing.length }} {{ $t('of') }} {{ products.length }}&ndash;&gt;-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </div>
    </div>
    <!--<div v-if="missing && missing.length && !hideProducts" class="dropdown-products">-->
    <!--<div class="dropdown-products">-->
      <!--<button @click="toggle" class="btn">-->
        <!--<img v-if="opened" class="minus" src="/assets/minus.png" alt="">-->
        <!--<img v-else src="/assets/plus.png" alt="">-->
        <!--{{ cBtnText }}-->
      <!--</button>-->
      <!--<div class="popup-container" v-if="opened">-->
        <!--<div v-for="product in products" :key="product.sku">-->
          <!--<div class="product flex-container align-center">-->
            <!--<div class="flex-item">-->
              <!--<img class="blend pl10" v-lazy="thumbnail(product.image)" :alt="product.name">-->
            <!--</div>-->
            <!--<div class="flex-item">-->
              <!--<div class="flex-wrapper">-->
                <!--<div class="flex-wrapper-item">-->
                  <!--<div class="h4 weight-400 cl-accent serif pl10">-->
                    <!--{{ cProductName(product) }}-->
                  <!--</div>-->
                  <!--<div class="available-container-mob">-->
                    <!--<div v-if="!filterData(product)" class="available all">-->
                      <!--{{ hideProducts ? $t('To favorite') : $t('In place') }}-->
                    <!--</div>-->
                    <!--<div v-if="filterData(product)" class="available not-all">-->
                      <!--{{ $t('Order at this pharmacy') }}-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
                <!--<div class="flex-wrapper-item">-->
                  <!--<div class="price">-->
                    <!--{{ product.priceInclTax | price }}-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="flex-item">-->
              <!--<div v-if="!filterData(product)" class="available all">-->
                <!--{{ hideProducts ? $t('To favorite') : $t('In place') }}-->
              <!--</div>-->
              <!--<div v-if="filterData(product)" class="available not-all">-->
                <!--{{ $t('Order at this pharmacy') }}-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>

import AvailabilitySheet from 'src/modules/availability-sheet/components/AvailabilitySheet'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'

export default {
  mixins: [AvailabilitySheet],
  components: {ButtonFull}
}
</script>

<style lang="scss">
  i.material-icons {
    font-family: 'Material Icons';
  }
  .availability-sheet * {
    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
  }
  .availability-sheet {
    .btn-group .btn {
      background-color: transparent;
      border: none;
      width: 90px;
      height: 90px;
      img {
        width: 100%;
      }
    }
    &.orange-border {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      /*border: 2px solid #f7942d;*/
      .pharmacy-info {
        .info {
          @media all and (max-width: 576px) {
            display: inline-block;
            vertical-align: middle;
          }
        }
      }
    }
    .pb10 {
      padding-bottom: 10px;
    }
    .pl10 {
      padding-left: 10px;
    }
    .flex-container {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-flex-direction: row;
      -ms-flex-direction: row;
      flex-direction: row;
      -webkit-flex-wrap: nowrap;
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
      -webkit-justify-content: flex-start;
      -ms-flex-pack: start;
      justify-content: flex-start;
      -webkit-align-content: flex-start;
      -ms-flex-line-pack: start;
      align-content: flex-start;
      -webkit-align-items: stretch;
      -ms-flex-align: stretch;
      align-items: stretch;

      &.align-center {
        -webkit-align-items: center;
        -ms-flex-align: center;
        align-items: center;
      }

      .flex-item {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-order: 0;
        -ms-flex-order: 0;
        order: 0;
        -webkit-flex: 0 1 auto;
        -ms-flex: 0 1 auto;
        flex: 0 1 auto;
        -webkit-align-self: auto;
        -ms-flex-item-align: auto;
        align-self: auto;

        &:not(:first-child) {
          .content {
            padding-left: 25px;
          }
        }

        &:last-child {
          margin-left: auto;
          /*width: 160px;*/
          .btn {
            min-width: 140px;
          }
        }
      }
    }
    .popup-container .flex-container .flex-item:last-child {
      margin-left: 0;
      padding-left: 20px;
    }
    .flex-column {
      height: 100%;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-flex-wrap: nowrap;
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
      -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -webkit-align-content: space-between;
      -ms-flex-line-pack: justify;
      align-content: space-between;
      -webkit-align-items: stretch;
      -ms-flex-align: stretch;
      align-items: stretch;

      .item {
        -webkit-order: 0;
        -ms-flex-order: 0;
        order: 0;
        -webkit-flex: 0 1 auto;
        -ms-flex: 0 1 auto;
        flex: 0 1 auto;
        -webkit-align-self: auto;
        -ms-flex-item-align: auto;
        align-self: auto;

        &:last-child:not(:first-child) {
          margin-top: auto;
        }
      }
    }
    .content {
      padding-left: 20px;
      p {
        margin: 0;
        font-size: 16px;
        line-height: 20px;
        font-weight: 400;
      }
      .title {
        white-space: nowrap;
        font-size: 14px;
        font-weight: 600;
        .material-icons {
          -webkit-transition: all .3s;
          -moz-transition: all .3s;
          -ms-transition: all .3s;
          -o-transition: all .3s;
          transition: all .3s;
          cursor: pointer;
        }
        i {
          display: inline-block;
          vertical-align: middle;
          color: #e41c3f;
        }
      }
      .address-mob {
        display: none;
      }

      .metro {
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        line-height: 20px;
        color: #19223D;
        display: block;
        position: relative;
        padding-left: 30px;
        img {
          display: block;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
      .address {
        padding: 0 0 0 20px;
        position: relative;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        line-height: 20px;
        color: #8B93A7;
        i {
          position: absolute;
          left: 0;
          top: 2px;
          font-size: 18px;
          color: #BFC5D2;
        }

        &.with-metro {
          padding: 10px 0 0 20px;
          i {
            top: 12px;
          }
        }
      }
      .work-time {
        padding-top: 10px;
        position: relative;
        padding-left: 20px;
        font-style: normal;
        font-weight: normal;
        font-size: 13px;
        line-height: 20px;
        color: #8B93A7;
        white-space: pre;
        i {
          position: absolute;
          left: 0;
          top: 12px;
          font-size: 18px;
          color: #BFC5D2;
        }
      }
    }
    .title {
      white-space: nowrap;
      font-size: 14px;
      font-weight: 600;
      i {
        display: inline-block;
        vertical-align: middle;
        color: #e41c3f;
      }
      &.mob {
        display: none;
      }
    }
    .available {
      font-family: 'Open Sans';
      font-style: normal;
      font-weight: normal;
      font-size: 13px;
      line-height: 20px;
      position: relative;
      i {
        position: relative;
        left: 0;
        bottom: 2px;
        display: inline-block;
        margin-right: 5px;
        width: 5px;
        height: 5px;
        -webkit-border-radius: 100%;
        -moz-border-radius: 100%;
        border-radius: 100%;
      }
    }
    .all {
      color: #009777;
      i {
        background: #009777;
      }
    }
    .not-all {
      color: #ffad2e;
      i {
        background: #ffad2e;
      }
    }
    .dropdown-products {
      margin-top: 20px;
      background: rgba(245, 147, 49, 0.1);
      display: block;
      position: relative;
      padding-right: 10px;
      &:before {
        content: '';
        display: inline-block;
        position: absolute;
        left: 32px;
        top: -15px;
        border: 8px solid transparent;
        border-bottom: 8px solid rgba(245, 147, 49, 0.1);
      }
      .minus {
        margin-bottom: 3px;
      }
      button {
        margin-left: 10px;
        display: inline-block;
        width: auto;
        background: transparent;
        border: none;
        font-size: 12px;
        line-height: 14px;
        padding: 5px 0;
        color: #F59331;
      }
      .popup-container {
        max-height: 200px;
        overflow-y: auto;
        padding-bottom: 10px;

        .checkout-product {
          margin: 0 10px;
        }

        img {
          width: 40px;
          height: 40px;
          display: block;
        }

        .h4 {
          font-size: 14px;
          line-height: 16px;
          letter-spacing: normal;
        }
        .h5, .h6 {
          display: none;
        }
      }
    }
    #dropdown-2 {
      button {
        display: block;
        width: 100px;
        height: 100px;
        padding: 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background-color: transparent;
        border: none;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        img {
          width: 80px;
          height: 80px;
          display: block;
          margin: 0 auto;
        }
      }

      .dropdown-menu {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        width: calc(100% - 10px);
        z-index: 1;
        display: none;
        min-width: 10rem;
        padding: 20px;
        margin: .125rem 0 0;
        font-size: 1rem;
        color: #212529;
        text-align: left;
        list-style: none;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid rgba(0, 0, 0, .15);
        border-radius: .25rem;

        &:focus {
          outline: none;
        }

        &.show {
          display: block;
        }

        .popup-container {
          max-height: 200px;
          overflow-y: auto;

          .title {
            margin: 0;
          }
          .content {
            padding: 10px 0;
          }
        }
      }
      .dropdown-menu[x-placement^=bottom], .dropdown-menu[x-placement^=left], .dropdown-menu[x-placement^=right], .dropdown-menu[x-placement^=top] {
        right: auto;
        bottom: auto;
      }
    }
    svg {
      width: 20px;
      height: 20px;

      .icon-back {
        fill: transparent;
      }
      .icon-fill {
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -ms-transition: all .3s;
        -o-transition: all .3s;
        transition: all .3s;
        fill: #dd3743;
      }
    }
    .product {
      padding: 5px 0;
      .flex-item {
        text-align: left;

        &:nth-child(2) {
          flex-grow: 1;
        }
        .available-container-mob {
          .available {
            display: none;
          }
        }
        .available {
          padding-left: 0;
          &:before {
            display: none;
          }
        }
        .price {
          font-size: 14px;
          padding-left: 5px;
        }
        .h4 {
          width: 250px;
        }
        .flex-wrapper {
          width: 100%;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -webkit-flex-direction: row;
          -ms-flex-direction: row;
          flex-direction: row;
          -webkit-flex-wrap: nowrap;
          -ms-flex-wrap: nowrap;
          flex-wrap: nowrap;
          -webkit-justify-content: flex-start;
          -ms-flex-pack: start;
          justify-content: flex-start;
          -webkit-align-content: stretch;
          -ms-flex-line-pack: stretch;
          align-content: stretch;
          -webkit-align-items: center;
          -ms-flex-align: center;
          align-items: center;

          .flex-wrapper-item {
            -webkit-order: 0;
            -ms-flex-order: 0;
            order: 0;
            -webkit-flex: 0 1 auto;
            -ms-flex: 0 1 auto;
            flex: 0 1 auto;
            -webkit-align-self: auto;
            -ms-flex-item-align: auto;
            align-self: auto;

            &:last-child {
              margin-left: 0;
              @media all and (max-width: 400px) {
                margin-left: auto;
                padding-right: 10px;
              }
            }
          }
        }
      }
    }
  }
  @media all and (max-width: 1200px) {
    .availability-sheet {
      .flex-container {
        .flex-item:not(:first-child) {
          .content {
            padding-left: 5px;
          }
        }
      }
    }
  }
  @media all and (max-width: 991px) {
    .availability-sheet {
      .popup-container .flex-container .flex-item:last-child {
        padding-left: 10px;
        margin-left: auto;
      }
    }
  }
  @media screen and (max-width: 767px) {
    .availability-sheet {
      #dropdown-2 {
        button {
          width: 80px;
          height: 80px;
        }
      }
    }
  }
  @media all and (max-width: 576px) {
    .availability-sheet {
      .flex-container.pharmacy-info {
        -webkit-align-items: stretch;
        -ms-flex-align: stretch;
        align-items: stretch;

        .info {
          display: inline-block;
          vertical-align: middle;
        }

        .flex-item {
          &:nth-child(3) {
            display: none;
          }
          &:nth-child(2) {
            padding-top: 18px;
          }
          &:last-child {
            margin: 20px 0 0 auto;
            width: auto;
            .flex-column {
              .item:first-child {
                order: 2;
                padding-top: 0;
              }
              .item:last-child {
                .available {
                  text-align: left;
                }
              }
            }
          }
        }
        .work-time, .address-mob {
          text-align: left;
          padding: 0;
          display: inline-block;
          vertical-align: middle;
          width: 100%;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
        }
        .work-time {
          padding-left: 25px;
          i {
            position: absolute;
            left: 0;
            top: 2px;
          }
        }
        .address-mob {
          .address {
            text-align: left;
            &.with-metro {
              padding-top: 0;
              text-align: left;
              i {
                top: 2px;
              }
            }
          }
        }

      }
      .title {
        display: none;
        &.mob {
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }
  @media all and (max-width: 550px) {
    .availability-sheet {
      .flex-container.pharmacy-info {
        flex-wrap: wrap;
        flex-direction: row;
        .flex-item {
          &:nth-child(1), &:nth-child(2) {
            width: 50%;
          }
          &:last-child {
            width: 100%;
            margin: 20px 0 0;
          }
        }
      }
      .flex-container:not(.pharmacy-info) {
        display: flex;
        justify-content: start;
        flex-wrap: wrap;
        align-items: center;
        align-content: start;
        flex-direction: row;

        .flex-item {
          display: inline-block;

          &:last-child {
            width: 100%;
            flex: 1;
            margin-top: 10px;
            padding-left: 0;
          }

          &:nth-child(2) {
            width: 70%;
          }

          .button-wrapper .btn {
            width: 100%;
          }
        }
      }
      .available {
        text-align: center;
      }
    }
  }
  @media all and (max-width: 420px) {
    .availability-sheet {
      .btn-group .btn {
        width: 70px;
        height: 70px;
      }
      .flex-container.pharmacy-info {
        .flex-item {
          &:nth-child(1), &:nth-child(2) {
            width: 100%;
          }
          &:nth-child(1) {
            i.material-icons {
              margin-left: auto;
            }
          }
          &:last-child {
            width: 100%;
            margin: 20px 0 0;
          }
        }
      }
      .title {
        margin-left: auto;
      }
      .dropdown-products {
        margin-top: 10px;
      }
    }
  }
  @media all and (max-width: 400px) {
    .availability-sheet {
      .product {
        .flex-item {
          .h4 {
            width: 170px;
          }
          .flex-wrapper {
            .flex-wrapper-item {
              &:last-child {
                margin-left: auto;
                padding-right: 10px;
              }
            }
          }
        }
      }
    }
  }
  @media screen and (max-height: 860px) and (max-width: 420px) {
    .availability-sheet {
      .flex-container {
        &.pharmacy-info {
          .flex-item:last-child .flex-column .item:last-child .available {
            text-align: center;
          }
        }
        .flex-item {
          &:last-child {
            width: 100%;
            .flex-column {
              .item {
                order: 2;
                .available {
                  text-align: center;
                }
                &:first-child {
                  order: 1;
                  margin-bottom: 15px;
                }
              }
            }
          }
        }
      }
      .product .flex-item {
        .available-container-mob {
          .available {
            padding-left: 10px;
            text-align: left;
            display: block;
          }
        }
        .available {
          display: none;
        }
      }
    }
  }
</style>
