<template>
  <div v-if="isExtraItemsPart">
    <div class="alert" :class="alertStatus.class">
      <i class="icon" v-html="alertStatus.icon"></i>
      <div class="content">
        <span>{{alertStatus.message}}</span>
        <span class="accent-text">{{alertStatus.accentMessage}}</span>
      </div>
    </div>
    <div v-if="alertStatus.class !== 'success'" class="addition-services">
      <b>{{ $t('additional services')}}</b>
      <div class="flex w-100">
        <custom-radiobutton
          v-for="item in categories" :key="item.type"
          :id="'category' + item.type" name="category" @change="setCategory(item)"
          :checked="selectedCategory.type === item.type" :disabled="!item.link">{{ item.name }}
        </custom-radiobutton>
        <router-link :to="localizedRoute(selectedCategory.link)" target="_blank" class="link">
          <button-full>
            {{ $t('Select products') }}
          </button-full>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import mixin from './mixin'
import BaseRadiobutton from 'theme/components/core/blocks/Form/BaseRadiobutton'
import CustomRadiobutton from "../../Form/CustomRadiobutton";
import ButtonFull from '../../../../theme/ButtonFull';

export default {
  mixins: [mixin],
  components: {
    BaseRadiobutton,
    ButtonFull,
    CustomRadiobutton
  },
  data () {
    return {
      categories: [
        {
          type: 'Accessories',
          name: this.$t('Accessories'),
          total: 0,
          link: '/aksesuari?credit_extra_tag=accessory'
        },
        {
          type: 'Services',
          name: this.$t('Services'),
          total: 0,
          link: '/services?credit_extra_tag=accessory'
        }
      ],
      selectedCategory: null
    }
  },
  created () {
    this.selectedCategory = this.categories[0];
  },
  methods: {
    setCategory (item) {
      this.selectedCategory = item;
    }
  }
}
</script>

<style lang="scss" scoped>
.addition-services{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  &>div{
    flex-wrap: wrap;
    @media (max-width: 575px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  &>div>div{
    @media (max-width: 575px) {
      flex-direction: column;
      margin-right: 0;
      margin-bottom: 16px;
    }
    display: flex;
    align-items: center;
    margin-right: 32px;
  }
  b{
    display: block;
    margin-bottom: 16px;
    font-family: DIN Pro;
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    color: #1A1919;
  }
  .link{
    @media (min-width: 576px) {
      margin-left: auto;
      max-width: 195px;
      min-width: 195px;
    }
    @media (max-width: 575px) {
      margin-top: 10px;
    }
    width: 100%;
  }
  ::v-deep label{
    white-space: nowrap;
    font-size: 15px;
    line-height: 24px;
    color: #1A1919;
  }
}
.alert{
  display: flex;
  padding: 0 16px 16px;
  box-sizing: border-box;
  margin-bottom: 16px;
  width: calc(100% + 32px);
  margin-left: -16px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.05);
  &.error{
    .accent-text{
      color: #EE2C39;
    }
  }
  &.warning{
    .accent-text{
      color: #EE8128;
    }
  }
  &.success{
    .accent-text{
      color: #23BE20;
    }
  }
  .content{
    text-align: left;
    position: relative;
    top: 2px;
    span{
      font-family: DIN Pro;
      font-size: 13px;
      line-height: 16px;
    }
    .accent-text{
      font-weight: 700;
    }
  }
  .icon{
    margin-right: 16px;
  }
}
</style>
