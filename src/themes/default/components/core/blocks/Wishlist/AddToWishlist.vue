<template>
  <button @click="isOnWishlist ? removeProductFromWhishList(product) : addProductToWhishlist(product)" class="add-to-wishlist p0 inline-flex middle-xs bg-cl-transparent brdr-none action h5 pointer cl-secondary" type="button" data-testid="addToWishlist">
    <slot>
      <!--<i class="pr5 material-icons">{{ favoriteIcon }}</i>-->
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4.59499C10.9104 3.59309 9.48419 3.03703 8.00398 3.03699C7.22052 3.0378 6.44495 3.19355 5.72192 3.49526C4.99888 3.79696 4.34265 4.23868 3.79098 4.79499C1.43798 7.15799 1.43898 10.854 3.79298 13.207L11.125 20.539C11.295 20.838 11.623 21.031 12 21.031C12.1548 21.0295 12.3071 20.9917 12.4446 20.9207C12.5822 20.8496 12.7011 20.7473 12.792 20.622L20.207 13.207C22.561 10.853 22.561 7.15799 20.205 4.79099C19.6536 4.2357 18.9979 3.79488 18.2756 3.49387C17.5532 3.19286 16.7785 3.03759 15.996 3.03699C14.5158 3.03723 13.0897 3.59326 12 4.59499ZM18.791 6.20499C20.354 7.77599 20.355 10.23 18.793 11.793L12 18.586L5.20698 11.793C3.64498 10.23 3.64598 7.77599 5.20498 6.20899C5.96498 5.45299 6.95898 5.03699 8.00398 5.03699C9.04898 5.03699 10.039 5.45299 10.793 6.20699L11.293 6.70699C11.3858 6.79993 11.496 6.87367 11.6173 6.92398C11.7386 6.97429 11.8686 7.00019 12 7.00019C12.1313 7.00019 12.2614 6.97429 12.3827 6.92398C12.504 6.87367 12.6142 6.79993 12.707 6.70699L13.207 6.20699C14.719 4.69799 17.281 4.70199 18.791 6.20499Z" fill="#23BE20"/>
      </svg>

      <template v-if="!isOnWishlist">
        {{ $t('Add to favorite') }}
      </template>
      <template v-else>
        {{ $t('Remove') }}
      </template>
    </slot>
  </button>
</template>

<script>
import { IsOnWishlist } from '@vue-storefront/core/modules/wishlist/components/IsOnWishlist'
import { AddToWishlist } from '@vue-storefront/core/modules/wishlist/components/AddToWishlist'
import { RemoveFromWishlist } from '@vue-storefront/core/modules/wishlist/components/RemoveFromWishlist'
import i18n from '@vue-storefront/i18n'
import { htmlDecode } from '@vue-storefront/core/lib/store/filters'

export default {
  mixins: [ IsOnWishlist, AddToWishlist, RemoveFromWishlist ],
  computed: {
    favoriteIcon () {
      return this.isOnWishlist ? 'favorite' : 'favorite_border'
    }
  },
  methods: {
    addProductToWhishlist (product) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('Product {productName} has been added to wishlist!', { productName: htmlDecode(product.name) }),
        action1: { label: i18n.t('OK') }
      }, { root: true })
      this.addToWishlist(product)
    },
    removeProductFromWhishList (product) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('Product {productName} has been removed from wishlist!', { productName: htmlDecode(product.name) }),
        action1: { label: i18n.t('OK') }
      }, { root: true })
      this.removeFromWishlist(product)
    }
  }
}
</script>

<style lang="scss">
  .add-to-wishlist {
    font-family: DIN Pro;
    font-style: normal;
    font-weight: bold;
    font-size: 12px !important;
    line-height: 13px;
    display: flex;
    align-items: center;
    text-transform: uppercase;
    color: #5F5E5E;
  }
</style>
