<template>
  <button
    type="button"
    class="inline-flex bg-cl-transparent main-green-color brdr-none relative"
    @click="toggleWishlistPanel"
    :aria-label="$t('Open wishlist')"
  >
    <!--<i class="material-icons">favorite_border</i>-->
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 4.595C10.9104 3.5931 9.48419 3.03705 8.00398 3.037C7.22052 3.03781 6.44495 3.19356 5.72192 3.49527C4.99888 3.79698 4.34265 4.23869 3.79098 4.795C1.43798 7.158 1.43898 10.854 3.79298 13.207L11.125 20.539C11.295 20.838 11.623 21.031 12 21.031C12.1548 21.0295 12.3071 20.9917 12.4446 20.9207C12.5822 20.8496 12.7011 20.7473 12.792 20.622L20.207 13.207C22.561 10.853 22.561 7.158 20.205 4.791C19.6536 4.23572 18.9979 3.7949 18.2756 3.49388C17.5532 3.19287 16.7785 3.0376 15.996 3.037C14.5158 3.03724 13.0897 3.59327 12 4.595ZM18.791 6.205C20.354 7.776 20.355 10.23 18.793 11.793L12 18.586L5.20698 11.793C3.64498 10.23 3.64598 7.776 5.20498 6.209C5.96498 5.453 6.95898 5.037 8.00398 5.037C9.04898 5.037 10.039 5.453 10.793 6.207L11.293 6.707C11.3858 6.79994 11.496 6.87368 11.6173 6.92399C11.7386 6.9743 11.8686 7.0002 12 7.0002C12.1313 7.0002 12.2614 6.9743 12.3827 6.92399C12.504 6.87368 12.6142 6.79994 12.707 6.707L13.207 6.207C14.719 4.698 17.281 4.702 18.791 6.205Z" fill="#828282"/>
    </svg>

    <span
      class="whishlist-count absolute flex center-xs middle-xs border-box py0 px2 h6 lh16 weight-700 cl-white bg-cl-silver"
      v-cloak
      v-show="getWishlistItemsCount"
    >
      {{ getWishlistItemsCount }}
    </span>
  </button>
</template>

<script>
import WishlistIcon from '@vue-storefront/core/compatibility/components/blocks/Header/WishlistIcon'

export default {
  mixins: [WishlistIcon]
}
</script>

<style scoped>
  .whishlist-count {
    background: #EE2C39;
    top: 7px;
    left: 50%;
    min-width: 16px;
    min-height: 16px;
    border-radius: 10px;
  }
</style>
