<template>
  <button @click="isOnWishlist ? removeProductFromWhishList(product) : addProductToWhishlist(product)" class="add-to-wishlist p0 inline-flex middle-xs bg-cl-transparent brdr-none action h5 pointer cl-secondary" type="button" data-testid="addToWishlist" aria-label="wishlist">
    <slot>
      <div class="item" v-if="!isOnWishlist">
        <svg class="icon-wishlist" width="24" height="24" viewBox="0 0 24 24" fill="#BDBDBD" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4.59499C10.9104 3.59309 9.48419 3.03703 8.00398 3.03699C7.22052 3.0378 6.44495 3.19355 5.72192 3.49526C4.99888 3.79696 4.34265 4.23868 3.79098 4.79499C1.43798 7.15799 1.43898 10.854 3.79298 13.207L11.125 20.539C11.295 20.838 11.623 21.031 12 21.031C12.1548 21.0295 12.3071 20.9917 12.4446 20.9207C12.5822 20.8496 12.7011 20.7473 12.792 20.622L20.207 13.207C22.561 10.853 22.561 7.15799 20.205 4.79099C19.6536 4.2357 18.9979 3.79488 18.2756 3.49387C17.5532 3.19286 16.7785 3.03759 15.996 3.03699C14.5158 3.03723 13.0897 3.59326 12 4.59499ZM18.791 6.20499C20.354 7.77599 20.355 10.23 18.793 11.793L12 18.586L5.20698 11.793C3.64498 10.23 3.64598 7.77599 5.20498 6.20899C5.96498 5.45299 6.95898 5.03699 8.00398 5.03699C9.04898 5.03699 10.039 5.45299 10.793 6.20699L11.293 6.70699C11.3858 6.79993 11.496 6.87367 11.6173 6.92398C11.7386 6.97429 11.8686 7.00019 12 7.00019C12.1313 7.00019 12.2614 6.97429 12.3827 6.92398C12.504 6.87367 12.6142 6.79993 12.707 6.70699L13.207 6.20699C14.719 4.69799 17.281 4.70199 18.791 6.20499Z" />
        </svg>
        <span v-if="showDescription">{{ $t('Add to favorite') }}</span>
      </div>
      <div class="item" v-if="isOnWishlist">
        <svg class="icon-wishlist" width="24" height="24" viewBox="0 0 24 24" fill="#FFCA41" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.9731 4.558C10.8835 3.5561 9.45733 3.00005 7.97713 3C7.19366 3.00082 6.4181 3.15656 5.69506 3.45827C4.97203 3.75998 4.31579 4.20169 3.76413 4.758C1.41113 7.121 1.41213 10.817 3.76613 13.17L11.0981 20.502C11.2681 20.801 11.5961 20.994 11.9731 20.994C12.1279 20.9925 12.2802 20.9547 12.4178 20.8837C12.5553 20.8126 12.6743 20.7103 12.7651 20.585L20.1801 13.17C22.5341 10.816 22.5341 7.121 20.1781 4.754C19.6267 4.19872 18.971 3.7579 18.2487 3.45688C17.5264 3.15587 16.7517 3.0006 15.9691 3C14.489 3.00024 13.0628 3.55627 11.9731 4.558Z" />
        </svg>
        <span v-if="showDescription">{{ $t('Remove from favorite') }}</span>
      </div>
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
  props: {
    showDescription: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  mixins: [ IsOnWishlist, AddToWishlist, RemoveFromWishlist ],
  computed: {
    favoriteIcon () {
      return this.isOnWishlist ? 'favorite' : 'favorite_border'
    }
  },
  methods: {
    async addProductToWhishlist (product) {
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

<style lang="scss" scoped>
.add-to-wishlist {
  font-family: DIN Pro;
  font-style: normal;
  font-size: 12px !important;
  line-height: 13px;
  display: flex;
  align-items: center;
  color: #595858;
  svg{
    padding: 4px;
  }
}

.icon-wishlist {
  box-sizing: content-box;
  border-radius: 4px;

  &:hover {
    background-color: #F9F9F9;
  }

  &:active {
    background-color: #efefef;
  }
}

.item {
  display: flex;
  align-items: center;

  span {
    margin-left: 20px;
    font-family: DIN Pro;
    font-size: 14px;
    line-height: 24px;
    color: #595858;
  }
}
</style>
