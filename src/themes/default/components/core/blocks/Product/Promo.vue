<template>
  <div class="promo-block flex w-100">
    <div class="promo-block-gift relative flex v-center">
      <img v-lazy="getImageUrl()" alt="">
      <div v-if="!noGiftImage" class="promo-block-gift-icon absolute flex h-center v-center">
        <GiftSvg />
      </div>
    </div>
    <div class="promo-block-description">
      <span class="promo-block-description-text block">
        {{ getTitle() }}
      </span>
      <div class="promo-block-actions flex">
        <router-link
          class="no-underline super-link"
          :to="localizedRoute(getCatLink())"
          exact
        >
          <button-grey v-if="!!!getCurrentProduct.preorder" class="details">
            <span>{{ $t('Details') }}</span>
          </button-grey>
        </router-link>
        <div class="timer flex v-center">
          <count-down :end-time="getEndDate()" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CountDown from '../../CountDown';
import ButtonGrey from './ButtonGrey'
import GiftSvg from '../Svg/GiftSvg';
import config from 'config';

export default {
  props: {
    labelValue: {
      type: Number | String,
      required: true
    }
  },
  components: {
    CountDown,
    ButtonGrey,
    GiftSvg
  },
  computed: {
    ...mapGetters({
      getCurrentProduct: 'product/getCurrentProduct',
    }),
    noGiftImage () {
      return this.labelValue === '6'
    }
  },
  methods: {
    showDetails(){
      this.$bus.$emit('modal-toggle', 'modal-terms-of-action')
    },
    getImageUrl() {
      return config.rma[this.labelValue].image_url;
    },
    getTitle() {
      return config.rma[this.labelValue].title;
    },
    getEndDate() {
      return new Date((config.rma[this.labelValue].time).replace(/-/g,'/')).getTime();
    },
    getCatLink() {
      return config.rma[this.labelValue].category_link;
    }
  }
}
</script>

<style lang="scss" scoped>
  .promo-block{
    padding: 16px;
    margin-bottom: 14px;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    box-sizing: border-box;
    border-radius: 4px;
    .super-link {
      display: flex;
      max-width: 131px;
    }
    &-gift{
      @media (max-width : 575px){
        display: none;
      }
      margin-right: 16px;
      max-height: 88px;
      img{
        max-width: 88px;
        max-height: 88px;
        object-fit: contain;
        object-position: center;
      }
      &-icon{
        width: 40px;
        height: 40px;
        top: -11px;
        right: -11px;
        background-color: #fff;
        border-radius: 50%;
      }
    }
    &-description{
      &-text{
        font-family: DIN Pro;
        font-size: 14px;
        line-height: 20px;
        font-weight: 700;
        color: #1A1919;
        margin-bottom: 16px;
      }
    }
    &-actions{
      button.details{
        @media (max-width : 575px){
          width: 100%;
          display: flex;
          justify-content: center;
        }
      }
      @media (max-width : 1199px){
        flex-direction: column-reverse;
      }
      .timer{
        @media (min-width : 1200px){
          margin-left: 8px;
        }
        @media (max-width : 1199px){
          margin-bottom: 16px;
          margin-left: -8px;
        }
      }
    }
  }
</style>
