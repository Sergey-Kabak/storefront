<template>
  <button
    type="button"
    class="bg-cl-transparent inline-flex custom-menu__button"
    @click="openSidebarMenu"
    :aria-label="$t('Open menu')"
    data-testid="menuButton"
  >
    <!--<i class="material-icons">dehaze</i>-->
    <svg class="icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 2H3C2.44772 2 2 2.44772 2 3V7C2 7.55228 2.44772 8 3 8H7C7.55228 8 8 7.55228 8 7V3C8 2.44772 7.55228 2 7 2Z" fill="#23BE20"/>
      <path d="M15 2H11C10.4477 2 10 2.44772 10 3V7C10 7.55228 10.4477 8 11 8H15C15.5523 8 16 7.55228 16 7V3C16 2.44772 15.5523 2 15 2Z" fill="#23BE20"/>
      <path d="M7 10H3C2.44772 10 2 10.4477 2 11V15C2 15.5523 2.44772 16 3 16H7C7.55228 16 8 15.5523 8 15V11C8 10.4477 7.55228 10 7 10Z" fill="#23BE20"/>
      <path d="M15 10H11C10.4477 10 10 10.4477 10 11V15C10 15.5523 10.4477 16 11 16H15C15.5523 16 16 15.5523 16 15V11C16 10.4477 15.5523 10 15 10Z" fill="#23BE20"/>
    </svg>

    <span>{{ $t('Catalog of products') }}</span>
  </button>
</template>

<script>
import HamburgerIcon from '@vue-storefront/core/compatibility/components/blocks/Header/HamburgerIcon';

export default {
  mixins: [HamburgerIcon]
}
</script>

<style lang="sass">
  .custom-menu__button
    display: flex
    align-items: center
    height: 100%
    padding: 0 0 0 15px
    border-right: 1px solid gainsboro
    border-bottom: none
    border-top: none
    border-left: none
    width: 100%
    padding-right: 0
    line-height: 24px
    font-weight: bold
    font-size: 14px
    font-family: 'DIN Pro'
    font-style: normal
    font-weight: bold
    opacity: 1
    color: #1A1919
    .icon
      padding: 3px
      margin-right: 16px

    /*i.material-icons*/
      /*margin-right: 10px*/
      /*color: #23BE20*/
    @media (max-width: 1270px)
      width: 290px

    @media (max-width: 1200px)
      width: 256px

    @media (max-width: 991px)
      width: 230px

    @media (max-width: 767px)
      border-right: none !important
      span
        display: none
</style>
