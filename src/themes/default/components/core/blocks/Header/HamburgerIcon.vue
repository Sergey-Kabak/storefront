<template>
  <button
    type="button"
    class="bg-cl-transparent inline-flex custom-menu__button"
    @click="openSidebarMenu"
    :aria-label="$t('Open menu')"
    data-testid="menuButton"
  >
    <!--<i class="material-icons">dehaze</i>-->
    <!-- <svg  width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 2H3C2.44772 2 2 2.44772 2 3V7C2 7.55228 2.44772 8 3 8H7C7.55228 8 8 7.55228 8 7V3C8 2.44772 7.55228 2 7 2Z" fill="#23BE20"/>
      <path d="M15 2H11C10.4477 2 10 2.44772 10 3V7C10 7.55228 10.4477 8 11 8H15C15.5523 8 16 7.55228 16 7V3C16 2.44772 15.5523 2 15 2Z" fill="#23BE20"/>
      <path d="M7 10H3C2.44772 10 2 10.4477 2 11V15C2 15.5523 2.44772 16 3 16H7C7.55228 16 8 15.5523 8 15V11C8 10.4477 7.55228 10 7 10Z" fill="#23BE20"/>
      <path d="M15 10H11C10.4477 10 10 10.4477 10 11V15C10 15.5523 10.4477 16 11 16H15C15.5523 16 16 15.5523 16 15V11C16 10.4477 15.5523 10 15 10Z" fill="#23BE20"/>
    </svg> -->
    <svg width="24" class="icon" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 11H10C10.2652 11 10.5196 10.8946 10.7071 10.7071C10.8946 10.5196 11 10.2652 11 10V4C11 3.73478 10.8946 3.48043 10.7071 3.29289C10.5196 3.10536 10.2652 3 10 3H4C3.73478 3 3.48043 3.10536 3.29289 3.29289C3.10536 3.48043 3 3.73478 3 4V10C3 10.2652 3.10536 10.5196 3.29289 10.7071C3.48043 10.8946 3.73478 11 4 11ZM14 11H20C20.2652 11 20.5196 10.8946 20.7071 10.7071C20.8946 10.5196 21 10.2652 21 10V4C21 3.73478 20.8946 3.48043 20.7071 3.29289C20.5196 3.10536 20.2652 3 20 3H14C13.7348 3 13.4804 3.10536 13.2929 3.29289C13.1054 3.48043 13 3.73478 13 4V10C13 10.2652 13.1054 10.5196 13.2929 10.7071C13.4804 10.8946 13.7348 11 14 11ZM4 21H10C10.2652 21 10.5196 20.8946 10.7071 20.7071C10.8946 20.5196 11 20.2652 11 20V14C11 13.7348 10.8946 13.4804 10.7071 13.2929C10.5196 13.1054 10.2652 13 10 13H4C3.73478 13 3.48043 13.1054 3.29289 13.2929C3.10536 13.4804 3 13.7348 3 14V20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21ZM14 21H20C20.2652 21 20.5196 20.8946 20.7071 20.7071C20.8946 20.5196 21 20.2652 21 20V14C21 13.7348 20.8946 13.4804 20.7071 13.2929C20.5196 13.1054 20.2652 13 20 13H14C13.7348 13 13.4804 13.1054 13.2929 13.2929C13.1054 13.4804 13 13.7348 13 14V20C13 20.2652 13.1054 20.5196 13.2929 20.7071C13.4804 20.8946 13.7348 21 14 21Z" fill="#23BE20"/>
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
