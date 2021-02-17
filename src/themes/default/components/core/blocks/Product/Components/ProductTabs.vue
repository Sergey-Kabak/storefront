<template>
  <div class="product-tabs">
    <div class="v-container">
      <div class="row">
        <div class="col-12 flex">
          <ul class="product-tabs_list">
            <li
              v-for="(tab , key) in tabs" :key="key"
              @click="selectTab(tab.component)"
              class="product-tabs_list_item"
              :class="{'active' : activeTab == tab.component}"
            >
              <div class="product-tabs_list-icon" v-html="tab.icon"></div>
              <span class="product-tabs_list-name">{{tab.title}}</span>
              <svg class="product-tabs_list-icon-right" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M10.707 17.707L16.414 12L10.707 6.29297L9.29297 7.70697L13.586 12L9.29297 16.293L10.707 17.707Z" fill="#E0E0E0"/>
              </svg>
            </li>
          </ul>
          <div class="product-tabs_action">
            <strong class="product-price">
              {{getCurrentProduct.final_price | price}}
            </strong>
            <add-to-cart :product="getCurrentProduct" :showIcon="false">
              <template v-if="ProductStock === 'PendingDelivery'" v-slot:text>{{$t('pre order')}}</template>
            </add-to-cart>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddToCart from '../../../AddToCart';
import ProductMixin from '../Mixins/ProductMixin';
import ResizeMixin from '../Mixins/ResizeMixin';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';

export default {
  mixins: [ProductMixin, ResizeMixin],
  props: {
    activeTab: {
      type: String,
      default: () => 'about-tab'
    }
  },
  components: {
    AddToCart
  },
  data () {
    return {
      tabs: [
        {
          title: this.$t('AboutTab'),
          component: 'about-tab',
          icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM9 5H11V7H9V5ZM9 9H11V15H9V9Z" fill="#23BE20"/>
        </svg>`
        },
        {
          title: this.$t('SpecificationsTab'),
          component: 'specifications-tab',
          icon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 1H18V3H5V1ZM0 0.5H3V3.5H0V0.5ZM0 7.5H3V10.5H0V7.5ZM0 14.5H3V17.5H0V14.5ZM5 8H18V10H5V8ZM5 15H18V17H5V15Z" fill="#23BE20"/>
        </svg>`
        },
        {
          title: this.$t('ReviewsTab'),
          component: 'reviews-tab',
          icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 0H12C14.1217 0 16.1566 0.842855 17.6569 2.34315C19.1571 3.84344 20 5.87827 20 8C20 10.1217 19.1571 12.1566 17.6569 13.6569C16.1566 15.1571 14.1217 16 12 16V19.5C7 17.5 0 14.5 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0ZM10 14H12C12.7879 14 13.5681 13.8448 14.2961 13.5433C15.0241 13.2417 15.6855 12.7998 16.2426 12.2426C16.7998 11.6855 17.2417 11.0241 17.5433 10.2961C17.8448 9.56815 18 8.78793 18 8C18 7.21207 17.8448 6.43185 17.5433 5.7039C17.2417 4.97595 16.7998 4.31451 16.2426 3.75736C15.6855 3.20021 15.0241 2.75825 14.2961 2.45672C13.5681 2.15519 12.7879 2 12 2H8C6.4087 2 4.88258 2.63214 3.75736 3.75736C2.63214 4.88258 2 6.4087 2 8C2 11.61 4.462 13.966 10 16.48V14Z" fill="#23BE20"/>
        </svg>`
        }
      ]
    }
  },
  computed: {
    storeView () {
      return currentStoreView()
    }
  },
  methods: {
    selectTab (tab) {
      const separator = this.$parent.$refs.separator.offsetTop
      this.ActiveTab = tab;
      this.$bus.$emit('change-tab', tab)
      if (this.screenResolution !== 'mobile' && window.pageYOffset > separator) {
        window.scrollTo(0, separator - 65)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$mobile: 768px;
.product-tabs{
  box-shadow: 0 0 7px #e0e0e0;
  margin-bottom: 48px;
  &_list{
    @media (max-width: $mobile) {
      flex-direction: column;
      width: 100%;
      grid-gap: 0px;
    }
    list-style-type : none;
    display: flex;
    padding: 0;
    margin: 0;
    grid-gap: 48px;
    min-height: 64px;
    &_item{
      @media (max-width: $mobile) {
        align-items: center;
        padding: 16px 2px;
        margin-bottom: 4px;
        position: relative;
        &:not(:last-child){
          &:before{
            content: '';
            position: absolute;
            width: calc(100% + 32px);
            height: 4px;
            left: -16px;
            bottom: -4px;
            background-color: #f1f1f1;
          }
        }
      }
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      &:not(.active){
        &:after{
          width: 0%;
        }
      }
      &.active{
        &:after{
          width: 100%;
        }
      }
      &:after{
        @media (max-width: $mobile) {
          display: none;
        }
        content : '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        height: 2px;
        background: #23BE20;
        transition: ease-in 0.2s;
      }
      &:hover{
        &:after{
          width : 100%;
        }
      }
    }
    &-name{
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 700;
      font-size: 15px;
      line-height: 24px;
      color: #1A1919;
    }
    &-icon {
      @media (min-width: $mobile) {
        display: none;
      }
      display: flex;
      margin-right: 18px;
    }
    &-icon-right{
      @media (min-width: $mobile) {
        display: none;
      }
      margin-right: 2px;
      margin-left: auto;
    }
  }
}
.product-tabs_action{
  @media (max-width: $mobile) {
    display: none;
  }
  display: flex;
  align-items: center;
  margin-left: auto;
  .product-price{
    white-space: nowrap;
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 900;
    font-size: 24px;
    line-height: 30px;
    text-align: right;
    color: #1A1919;
    margin-right: 32px;
  }
}
::v-deep .add-to-cart{
  height: 32px;
  min-width: 131px;
}
</style>
