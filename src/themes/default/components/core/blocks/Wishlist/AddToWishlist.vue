<template>
  <button @click="isOnWishlist ? removeProductFromWhishList(product) : addProductToWhishlist(product)" class="add-to-wishlist p0 inline-flex middle-xs bg-cl-transparent brdr-none action h5 pointer cl-secondary" type="button" data-testid="addToWishlist">
    <slot>
      <!--<i class="pr5 material-icons">{{ favoriteIcon }}</i>-->
      <svg v-if="!isOnWishlist" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 4.59499C10.9104 3.59309 9.48419 3.03703 8.00398 3.03699C7.22052 3.0378 6.44495 3.19355 5.72192 3.49526C4.99888 3.79696 4.34265 4.23868 3.79098 4.79499C1.43798 7.15799 1.43898 10.854 3.79298 13.207L11.125 20.539C11.295 20.838 11.623 21.031 12 21.031C12.1548 21.0295 12.3071 20.9917 12.4446 20.9207C12.5822 20.8496 12.7011 20.7473 12.792 20.622L20.207 13.207C22.561 10.853 22.561 7.15799 20.205 4.79099C19.6536 4.2357 18.9979 3.79488 18.2756 3.49387C17.5532 3.19286 16.7785 3.03759 15.996 3.03699C14.5158 3.03723 13.0897 3.59326 12 4.59499ZM18.791 6.20499C20.354 7.77599 20.355 10.23 18.793 11.793L12 18.586L5.20698 11.793C3.64498 10.23 3.64598 7.77599 5.20498 6.20899C5.96498 5.45299 6.95898 5.03699 8.00398 5.03699C9.04898 5.03699 10.039 5.45299 10.793 6.20699L11.293 6.70699C11.3858 6.79993 11.496 6.87367 11.6173 6.92398C11.7386 6.97429 11.8686 7.00019 12 7.00019C12.1313 7.00019 12.2614 6.97429 12.3827 6.92398C12.504 6.87367 12.6142 6.79993 12.707 6.70699L13.207 6.20699C14.719 4.69799 17.281 4.70199 18.791 6.20499Z" fill="#23BE20"/>
      </svg>

      <svg v-if="isOnWishlist" width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.99836 12.7007C7.00449 12.5941 6.98941 12.4845 6.94894 12.3783L4.03265 4.71673L-0.951693 3.63723C-1.11493 2.97321 -1.59333 2.43215 -2.21865 2.18184V0H-3.78115V2.18188C-4.13818 2.32481 -4.44732 2.56231 -4.67728 2.86364L-9.94554 1.75407L-12.9488 9.64388C-12.9874 9.74533 -13.0034 9.84978 -12.9994 9.95177C-12.9994 9.95482 -12.9999 9.95779 -12.9999 9.96087C-12.9999 11.921 -11.4053 13.5156 -9.44522 13.5156C-7.48514 13.5156 -5.89053 11.921 -5.89053 9.96091C-5.89053 9.85017 -5.91389 9.74498 -5.95545 9.64951C-5.95545 9.64951 -5.95654 9.6458 -5.95725 9.64392L-8.21385 3.71555L-5.09631 4.37208C-5.01006 5.15837 -4.48994 5.8156 -3.78115 6.09935V18.4374H-7.76553V19.9999H1.76569V18.4374H-2.21865V6.09935C-1.7754 5.92192 -1.40619 5.59848 -1.17044 5.18856L2.39983 5.96181L-0.0425901 12.3783C-0.0636063 12.4335 -0.0773163 12.4895 -0.0854025 12.5456C-0.100442 12.6062 -0.109309 12.6691 -0.109309 12.7343C-0.109309 14.6944 1.4853 16.289 3.44534 16.289C5.40543 16.289 7 14.6944 7 12.7343C7.00004 12.7229 6.99883 12.7119 6.99836 12.7007ZM-7.80584 9.17962H-11.1001L-9.453 4.85231L-7.80584 9.17962ZM-2.9999 4.68747C-3.30146 4.68747 -3.54677 4.44215 -3.54677 4.14059C-3.54677 3.83903 -3.30146 3.59372 -2.9999 3.59372C-2.69834 3.59372 -2.45302 3.83903 -2.45302 4.14059C-2.45302 4.44215 -2.69834 4.68747 -2.9999 4.68747ZM3.45324 7.58665L5.11527 11.9531H1.7912L3.45324 7.58665Z" fill="#23BE20"/>
        <path d="M3.25 6.16L0.5 3.16L1.66 2L3.25 3.59L6.84 0L8 1.41L3.25 6.16Z" fill="#23BE20"/>
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
import { IsOnWishlist } from '@vue-storefront/core/modules/wishlist/components/IsOnWishlist';
import { AddToWishlist } from '@vue-storefront/core/modules/wishlist/components/AddToWishlist';
import { RemoveFromWishlist } from '@vue-storefront/core/modules/wishlist/components/RemoveFromWishlist';
import i18n from '@vue-storefront/i18n';
import { htmlDecode } from '@vue-storefront/core/lib/store/filters';

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
