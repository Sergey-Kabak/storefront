<template>
  <div class="shop-tabs">
    <div class="tab-wrapper">
      <button class="shop-tab" :class="{'active': activeTab === 'shop-listing'}" @click="onTabClick('shop-listing')">{{ $t('All stores') }}</button>
      <button v-if="isLoggedIn" class="shop-tab" :class="{'active': activeTab === 'shop-favourites'}" @click="onTabClick('shop-favourites')">{{ $t('Favorite stores') }}</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    activeTab: {
      type: String,
      required: true,
      default: null
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters['user/isLoggedIn']
    }
  },
  methods: {
    onTabClick(component) {
      this.$emit('onTabChange', component)
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.shop-tabs {
  padding: 16px;
  box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.15)
}

.tab-wrapper {
  border-radius: 4px;
  background: #F2F2F2;
  display: flex;
  align-items: center;
}

.shop-tab {
  height: 32px;
  width: 100%;
  box-sizing: border-box;
  border-style: none;
  border-radius: 4px;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #1A1919;

  &.active {
    border: 1px solid #23BE20;
    background: #FFFFFF;
  }
}
</style>