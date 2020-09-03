<template>
  <router-link :to="localizedRoute('/compare')" class="compare-icon no-underline inline-flex">
    <!--<i class="material-icons">compare</i>-->
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.9984 14.7007C22.0045 14.5941 21.9894 14.4846 21.9489 14.3783L19.0326 6.71673L14.0483 5.63723C13.8851 4.97321 13.4067 4.43215 12.7814 4.18184V2H11.2188V4.18188C10.8618 4.32481 10.5527 4.56231 10.3227 4.86364L5.05446 3.75407L2.05122 11.6439C2.01262 11.7453 1.99661 11.8498 2.00059 11.9518C2.00055 11.9548 2.00012 11.9578 2.00012 11.9609C2.00012 13.921 3.59474 15.5156 5.55478 15.5156C7.51486 15.5156 9.10947 13.921 9.10947 11.9609C9.10947 11.8502 9.08611 11.745 9.04455 11.6495C9.04385 11.6477 9.04346 11.6458 9.04275 11.6439L6.78615 5.71555L9.90369 6.37208C9.98994 7.15837 10.5101 7.8156 11.2188 8.09935V20.4374H7.23447V21.9999H16.7657V20.4374H12.7814V8.09935C13.2246 7.92192 13.5938 7.59848 13.8296 7.18856L17.3998 7.96181L14.9574 14.3783C14.9364 14.4335 14.9227 14.4895 14.9146 14.5456C14.8996 14.6062 14.8907 14.6691 14.8907 14.7343C14.8907 16.6944 16.4853 18.289 18.4453 18.289C20.4054 18.289 22 16.6944 22 14.7343C22 14.7229 21.9988 14.7119 21.9984 14.7007ZM5.55482 13.9531C4.73349 13.9531 4.02661 13.4534 3.7222 12.7421H7.38736C7.08298 13.4534 6.37611 13.9531 5.55482 13.9531ZM7.19416 11.1796H3.89985L5.547 6.85231L7.19416 11.1796ZM12.0001 6.68747C11.6985 6.68747 11.4532 6.44216 11.4532 6.14059C11.4532 5.83903 11.6985 5.59372 12.0001 5.59372C12.3017 5.59372 12.547 5.83903 12.547 6.14059C12.547 6.44216 12.3017 6.68747 12.0001 6.68747ZM18.4532 9.58665L20.1153 13.9531H16.7912L18.4532 9.58665ZM18.4454 16.7265C17.6241 16.7265 16.9172 16.2268 16.6128 15.5155H20.2779C19.9736 16.2268 19.2667 16.7265 18.4454 16.7265Z" fill="#828282"/>
    </svg>

    <div v-if="getCompareProductsCount === 0" class="tooltip">
      <div class="tooltip-title">
        {{$t('There are no products to compare.')}}
      </div>
      <p class="tooltip-text">
         {{$t('Add products to compare characteristics and choose the most suitable product.')}}
      </p>
    </div>
    <span
      class="compare-count absolute flex center-xs middle-xs border-box py0 px2 h6 lh16 weight-700 cl-white bg-cl-silver"
      v-cloak
      v-show="getCompareProductsCount"
    >
      {{ getCompareProductsCount }}
    </span>
  </router-link>
</template>

<script>
import CompareIcon from '@vue-storefront/core/compatibility/components/blocks/Header/CompareIcon';
import { mapGetters } from 'vuex';

export default {
  mixins: [CompareIcon],
  computed: {
    ...mapGetters('compare', ['getCompareProductsCount'])
  }
}
</script>

<style lang="scss" scoped>
@keyframes slideDown {
  from {
    opacity: .7;
    transform: translateY(-10px) translateX(-50%);
  }
  to {
    opacity: 1;
    transform: translateY(0) translateX(-50%);
  }
}
  .compare-icon {
    position: relative;
    &:hover{
      .tooltip{
        display: block;
      }
    }
  }
  .tooltip{
      animation: slideDown .2s ease-in-out;
      cursor: auto;
      box-sizing: border-box;
      display: none;
      padding: 16px;
      width: 280px;
      position: absolute;
      font-family: DIN Pro;
      font-style: normal;
      font-size: 14px;
      line-height: 16px;
      -ms-flex-direction: column;
      flex-direction: column;
      top: calc(100% + 10px);
      left: 50%;
      transform: translateX(-50%);
      background: #fff;
      border-radius: 4px;
      box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
      &-title{
        font-size: 18px;
        line-height: 20px;
        color: #1A1919;
        margin-bottom: 16px;
      }
      &-text{
        font-size: 14px;
        color: #5F5E5E;
        margin-bottom: 12px;
      }
    }

  .compare-count {
    font-size: 11px;
    font-family: DIN Pro;
    font-style: normal;
    line-height: 16px;
    background: #EE2C39;
    left: 50%;
    top: 2px;
    padding: 0 2px;
    min-width: 16px;
    min-height: 16px;
    border-radius: 20px;
  }
</style>
