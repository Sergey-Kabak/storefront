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
              :class="{'active' : ActiveTab == tab.component}"
            >
              {{tab.title}}
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
import { currentStoreView } from '@vue-storefront/core/lib/multistore';

export default {
  mixins: [ProductMixin],
  components: {
    AddToCart
  },
  data () {
    return {
      ActiveTab: 'AboutTab',
      tabs: [
        {
          title: this.$t('AboutTab'),
          component: 'AboutTab',
          icon: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM10 18C12.1217 18 14.1566 17.1571 15.6569 15.6569C17.1571 14.1566 18 12.1217 18 10C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10C2 12.1217 2.84285 14.1566 4.34315 15.6569C5.84344 17.1571 7.87827 18 10 18ZM9 5H11V7H9V5ZM9 9H11V15H9V9Z" fill="#23BE20"/>
        </svg>`
        },
        {
          title: this.$t('SpecificationsTab'),
          component: 'SpecificationsTab',
          icon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 1H18V3H5V1ZM0 0.5H3V3.5H0V0.5ZM0 7.5H3V10.5H0V7.5ZM0 14.5H3V17.5H0V14.5ZM5 8H18V10H5V8ZM5 15H18V17H5V15Z" fill="#23BE20"/>
        </svg>`
        },
        // {
        //   title: this.$t('VideoReviewTab'),
        //   component: 'VideoReviewTab',
        //   icon: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        // <path d="M0 0.993C0 0.445 0.445 0 0.993 0H17.007C17.555 0 18 0.445 18 0.993V17.007C17.9997 17.2703 17.895 17.5227 17.7089 17.7089C17.5227 17.895 17.2703 17.9997 17.007 18H0.993C0.729721 17.9997 0.477302 17.895 0.291135 17.7089C0.104969 17.5227 0.000264735 17.2703 0 17.007V0.993ZM2 2V16H16V2H2ZM7.622 5.415L12.501 8.667C12.5559 8.70351 12.6009 8.75302 12.632 8.81111C12.6631 8.86921 12.6794 8.93409 12.6794 9C12.6794 9.06591 12.6631 9.13079 12.632 9.18889C12.6009 9.24698 12.5559 9.29649 12.501 9.333L7.621 12.585C7.56083 12.6249 7.49098 12.6477 7.41887 12.6512C7.34676 12.6546 7.27507 12.6384 7.21141 12.6043C7.14774 12.5703 7.09448 12.5197 7.05726 12.4578C7.02004 12.396 7.00025 12.3252 7 12.253V5.747C7.00013 5.67465 7.01989 5.60369 7.05716 5.54168C7.09443 5.47967 7.14782 5.42893 7.21165 5.39486C7.27547 5.36079 7.34734 5.34467 7.41961 5.34822C7.49187 5.35177 7.56182 5.37485 7.622 5.415Z" fill="#23BE20"/>
        // </svg>`
        // },
        // {
        //   title: this.$t('AccessoriesTab'),
        //   component: 'AccessoriesTab',
        //   icon: `<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        // <path d="M10 2C7.87827 2 5.84344 2.84285 4.34315 4.34315C2.84285 5.84344 2 7.87827 2 10H5C5.53043 10 6.03914 10.2107 6.41421 10.5858C6.78929 10.9609 7 11.4696 7 12V17C7 17.5304 6.78929 18.0391 6.41421 18.4142C6.03914 18.7893 5.53043 19 5 19H2C1.46957 19 0.960859 18.7893 0.585786 18.4142C0.210714 18.0391 0 17.5304 0 17V10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10V17C20 17.5304 19.7893 18.0391 19.4142 18.4142C19.0391 18.7893 18.5304 19 18 19H15C14.4696 19 13.9609 18.7893 13.5858 18.4142C13.2107 18.0391 13 17.5304 13 17V12C13 11.4696 13.2107 10.9609 13.5858 10.5858C13.9609 10.2107 14.4696 10 15 10H18C18 7.87827 17.1571 5.84344 15.6569 4.34315C14.1566 2.84285 12.1217 2 10 2ZM2 12V17H5V12H2ZM15 12V17H18V12H15Z" fill="#23BE20"/>
        // </svg>`
        // },
        {
          title: this.$t('ReviewsTab'),
          component: 'ReviewsTab',
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
      this.ActiveTab = tab;
      this.$bus.$emit('change-tab', tab)
    }
  }
}
</script>

<style lang="scss" scoped>
.product-tabs{
  box-shadow: 0 0 7px #e0e0e0;
  margin-bottom: 48px;
  &_list{
    list-style-type : none;
    display: flex;
    padding: 0;
    margin: 0;
    grid-gap: 48px;
    min-height: 64px;
    &_item{
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 700;
      font-size: 15px;
      line-height: 24px;
      color: #1A1919;
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
  }
}
.product-tabs_action{
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
