<template>
  <div class="sidebar-overlay">
    <no-ssr>
      <transition name="slide-right">
        <div class="sidebar-content">
          <div class="sidebar-header">
            <div @click="closeSidebar" class="close-sidebar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.293 17.707L7.58603 12L13.293 6.293L14.707 7.707L10.414 12L14.707 16.293L13.293 17.707Z" fill="#23BE20"/>
              </svg>
              <span>{{ $t('Back') }}</span>
            </div>
          </div>
          <div class="sidebar-tab">
            <slot />
          </div>
        </div>
      </transition>
    </no-ssr>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr'

export default {
  components: {
    'no-ssr': NoSSR
  },
  methods: {
    closeSidebar () {
      this.$parent.isMobileSidebar = false
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform .25s;
}
.slide-right-enter,
.slide-right-leave-to {
  transform: translateX(100%);
}
.sidebar{
  &-overlay{
    position: fixed;
    display: block;
    background-color: rgba(0, 0, 0, 0.38);
    z-index: 5;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    -webkit-overflow-scrolling: touch;
    overflow-anchor: none;
    opacity: 0.9999;
    will-change: transform;
    overflow: auto;
  }
  &-content{
    min-height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    width: calc(100% - 32px);
    margin-left: auto;
    box-sizing: border-box;
  }
  &-header{
    position: sticky;
    background: #fff;
    top: 0;
    border-bottom: 1px solid #E0E0E0;
  }
  &-tab{
    padding: 9px 16px 16px 16px;
  }
}
.close-sidebar{
  padding: 16px 16px 16px 11px;
  display: flex;
  align-items: center;
  cursor: pointer;
  span{
    color: #23BE20;
    margin-right: 1px;
  }
  div{
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 0;
    font-size: 13px;
    line-height: 16px;
    color: #23BE20;
  }
}
</style>
