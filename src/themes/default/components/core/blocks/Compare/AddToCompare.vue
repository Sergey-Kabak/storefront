<template>
  <button
    @click="isOnCompare ? removeProduct(product) : addProduct(product)"
    class="add-to-compare p0 inline-flex middle-xs bg-cl-transparent brdr-none action h5 pointer cl-secondary"
    type="button"
    aria-label="addToCompare"
    data-testid="addToCompare"
  >
    <div class="item" v-if="!isOnCompare">
      <slot name="not-active-compare-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#BDBDBD">
          <path d="M21.9984 14.7007C22.0045 14.5941 21.9894 14.4846 21.9489 14.3783L19.0326 6.71673L14.0483 5.63723C13.8851 4.97321 13.4067 4.43215 12.7814 4.18184V2H11.2188V4.18188C10.8618 4.32481 10.5527 4.56231 10.3227 4.86364L5.05446 3.75407L2.05122 11.6439C2.01262 11.7453 1.99661 11.8498 2.00059 11.9518C2.00055 11.9548 2.00012 11.9578 2.00012 11.9609C2.00012 13.921 3.59474 15.5156 5.55478 15.5156C7.51486 15.5156 9.10947 13.921 9.10947 11.9609C9.10947 11.8502 9.08611 11.745 9.04455 11.6495C9.04385 11.6477 9.04346 11.6458 9.04275 11.6439L6.78615 5.71555L9.90369 6.37208C9.98994 7.15837 10.5101 7.8156 11.2188 8.09935V20.4374H7.23447V21.9999H16.7657V20.4374H12.7814V8.09935C13.2246 7.92192 13.5938 7.59848 13.8296 7.18856L17.3998 7.96181L14.9574 14.3783C14.9364 14.4335 14.9227 14.4895 14.9146 14.5456C14.8996 14.6062 14.8907 14.6691 14.8907 14.7343C14.8907 16.6944 16.4853 18.289 18.4453 18.289C20.4054 18.289 22 16.6944 22 14.7343C22 14.7229 21.9988 14.7119 21.9984 14.7007ZM5.55482 13.9531C4.73349 13.9531 4.02661 13.4534 3.7222 12.7421H7.38736C7.08298 13.4534 6.37611 13.9531 5.55482 13.9531ZM7.19416 11.1796H3.89985L5.547 6.85231L7.19416 11.1796ZM12.0001 6.68747C11.6985 6.68747 11.4532 6.44216 11.4532 6.14059C11.4532 5.83903 11.6985 5.59372 12.0001 5.59372C12.3017 5.59372 12.547 5.83903 12.547 6.14059C12.547 6.44216 12.3017 6.68747 12.0001 6.68747ZM18.4532 9.58665L20.1153 13.9531H16.7912L18.4532 9.58665ZM18.4454 16.7265C17.6241 16.7265 16.9172 16.2268 16.6128 15.5155H20.2779C19.9736 16.2268 19.2667 16.7265 18.4454 16.7265Z" />
        </svg>
        <span v-if="showDescription">{{ $t('Add to compare') }}</span>
      </slot>
    </div>
    <div class="item" v-else>
      <slot name="active-compare-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#23BE20">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0332 5.5794C13.857 4.94186 13.3884 4.42484 12.7814 4.18184V2H11.2188V4.18188C10.8618 4.32481 10.5527 4.56231 10.3227 4.86364L5.05446 3.75407L2.05122 11.6439C2.01262 11.7453 1.99661 11.8498 2.00059 11.9518C2.00057 11.9532 2.00047 11.9546 2.00036 11.9561C2.00024 11.9577 2.00012 11.9593 2.00012 11.9609C2.00012 13.921 3.59474 15.5156 5.55478 15.5156C7.51486 15.5156 9.10947 13.921 9.10947 11.9609C9.10947 11.8502 9.08611 11.745 9.04455 11.6495L9.04275 11.6439L6.78615 5.71555L9.90369 6.37208C9.98994 7.15837 10.5101 7.8156 11.2188 8.09935V20.4374H7.23447V21.9999H16.7657V20.4374H12.7814V8.09935C13.2246 7.92192 13.5938 7.59848 13.8296 7.18856L14.5869 7.35259C14.2987 6.81297 14.1065 6.21429 14.0332 5.5794ZM19 10C19.4226 10 19.8329 9.94758 20.2249 9.84888L21.9489 14.3783C21.9894 14.4845 22.0045 14.5941 21.9984 14.7007C21.9985 14.7049 21.9988 14.709 21.9991 14.7131C21.9996 14.7202 22 14.7272 22 14.7343C22 16.6944 20.4054 18.289 18.4453 18.289C16.4853 18.289 14.8907 16.6944 14.8907 14.7343C14.8907 14.6691 14.8996 14.6062 14.9146 14.5456C14.9227 14.4895 14.9364 14.4335 14.9574 14.3783L16.8149 9.49852C17.2789 9.72431 17.783 9.88043 18.3137 9.95328L16.7912 13.9531H20.1153L18.6047 9.9846C18.7351 9.9948 18.867 10 19 10ZM3.89985 11.1796H7.19416L5.547 6.85231L3.89985 11.1796ZM11.4532 6.14059C11.4532 6.44215 11.6985 6.68747 12.0001 6.68747C12.3017 6.68747 12.547 6.44215 12.547 6.14059C12.547 5.83903 12.3017 5.59372 12.0001 5.59372C11.6985 5.59372 11.4532 5.83903 11.4532 6.14059Z" />
          <path d="M18.25 8.16L15.5 5.16L16.66 4L18.25 5.59L21.84 2L23 3.41L18.25 8.16Z" fill="#23BE20"/>
        </svg>
        <span v-if="showDescription">{{ $t('Remove from compare') }}</span>
      </slot>
    </div>
  </button>
</template>

<script>
import { IsOnCompare } from '@vue-storefront/core/modules/compare/components/IsOnCompare';
import { AddToCompare } from '@vue-storefront/core/modules/compare/components/AddToCompare';
import { RemoveFromCompare } from '@vue-storefront/core/modules/compare/components/RemoveFromCompare';
import i18n from '@vue-storefront/i18n';
import { htmlDecode } from '@vue-storefront/core/lib/store/filters';
import { mapActions } from 'vuex';

export default {
  mixins: [IsOnCompare, AddToCompare, RemoveFromCompare],
  props: {
    product: {
      required: true,
      type: Object
    },
    showDescription: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  methods: {
    ...mapActions({
      getProduct: 'product/single'
    }),
    async addProduct (product) {
      const childSku = product.configurable_children && product.configurable_children[0] && product.configurable_children[0].sku || null
      const compareProduct = await this.$store.dispatch('product/loadProduct', { parentSku: product.parentSku, childSku})

      this.addToCompare(compareProduct)
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('Product {productName} has been added to the compare!', { productName: htmlDecode(product.name) }),
        action1: { label: i18n.t('OK') }
      }, { root: true })
    },
    removeProduct (product) {
      this.removeFromCompare(product)
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('Product {productName} has been removed from compare!', { productName: htmlDecode(product.name) }),
        action1: { label: i18n.t('OK') }
      }, { root: true })
    }
  }
}
</script>

<style lang="scss" scoped>
.add-to-compare {
  font-family: DIN Pro;
  font-size: 12px;
  line-height: 13px;
  display: flex;
  align-items: center;
  color: #595858;
}

svg {
  padding: 4px;
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
    align-items: center;
    border-style: none;
    background: none;
    padding: 0;
  }
}
</style>
