<template>
  <button
    @click="isOnCompare ? removeProduct(product) : addProduct(product)"
    class="p0 inline-flex middle-xs bg-cl-transparent brdr-none action h5 pointer cl-secondary add-to-compare"
    type="button"
    data-testid="addToCompare"
  >
    <slot>
      <!--<i class="pr5 material-icons">compare</i>-->

      <svg v-if="!isOnCompare" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21.9984 14.7007C22.0045 14.5941 21.9894 14.4846 21.9489 14.3783L19.0326 6.71673L14.0483 5.63723C13.8851 4.97321 13.4067 4.43215 12.7814 4.18184V2H11.2188V4.18188C10.8618 4.32481 10.5527 4.56231 10.3227 4.86364L5.05446 3.75407L2.05122 11.6439C2.01262 11.7453 1.99661 11.8498 2.00059 11.9518C2.00055 11.9548 2.00012 11.9578 2.00012 11.9609C2.00012 13.921 3.59474 15.5156 5.55478 15.5156C7.51486 15.5156 9.10947 13.921 9.10947 11.9609C9.10947 11.8502 9.08611 11.745 9.04455 11.6495C9.04385 11.6477 9.04346 11.6458 9.04275 11.6439L6.78615 5.71555L9.90369 6.37208C9.98994 7.15837 10.5101 7.8156 11.2188 8.09935V20.4374H7.23447V21.9999H16.7657V20.4374H12.7814V8.09935C13.2246 7.92192 13.5938 7.59848 13.8296 7.18856L17.3998 7.96181L14.9574 14.3783C14.9364 14.4335 14.9227 14.4895 14.9146 14.5456C14.8996 14.6062 14.8907 14.6691 14.8907 14.7343C14.8907 16.6944 16.4853 18.289 18.4453 18.289C20.4054 18.289 22 16.6944 22 14.7343C22 14.7229 21.9988 14.7119 21.9984 14.7007ZM5.55482 13.9531C4.73349 13.9531 4.02661 13.4534 3.7222 12.7421H7.38736C7.08298 13.4534 6.37611 13.9531 5.55482 13.9531ZM7.19416 11.1796H3.89985L5.547 6.85231L7.19416 11.1796ZM12.0001 6.68747C11.6985 6.68747 11.4532 6.44216 11.4532 6.14059C11.4532 5.83903 11.6985 5.59372 12.0001 5.59372C12.3017 5.59372 12.547 5.83903 12.547 6.14059C12.547 6.44216 12.3017 6.68747 12.0001 6.68747ZM18.4532 9.58665L20.1153 13.9531H16.7912L18.4532 9.58665ZM18.4454 16.7265C17.6241 16.7265 16.9172 16.2268 16.6128 15.5155H20.2779C19.9736 16.2268 19.2667 16.7265 18.4454 16.7265Z" fill="#23BE20"/>
      </svg>

      <svg v-if="isOnCompare" width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.99836 12.7007C7.00449 12.5941 6.98941 12.4845 6.94894 12.3783L4.03265 4.71673L-0.951693 3.63723C-1.11493 2.97321 -1.59333 2.43215 -2.21865 2.18184V0H-3.78115V2.18188C-4.13818 2.32481 -4.44732 2.56231 -4.67728 2.86364L-9.94554 1.75407L-12.9488 9.64388C-12.9874 9.74533 -13.0034 9.84978 -12.9994 9.95177C-12.9994 9.95482 -12.9999 9.95779 -12.9999 9.96087C-12.9999 11.921 -11.4053 13.5156 -9.44522 13.5156C-7.48514 13.5156 -5.89053 11.921 -5.89053 9.96091C-5.89053 9.85017 -5.91389 9.74498 -5.95545 9.64951C-5.95545 9.64951 -5.95654 9.6458 -5.95725 9.64392L-8.21385 3.71555L-5.09631 4.37208C-5.01006 5.15837 -4.48994 5.8156 -3.78115 6.09935V18.4374H-7.76553V19.9999H1.76569V18.4374H-2.21865V6.09935C-1.7754 5.92192 -1.40619 5.59848 -1.17044 5.18856L2.39983 5.96181L-0.0425901 12.3783C-0.0636063 12.4335 -0.0773163 12.4895 -0.0854025 12.5456C-0.100442 12.6062 -0.109309 12.6691 -0.109309 12.7343C-0.109309 14.6944 1.4853 16.289 3.44534 16.289C5.40543 16.289 7 14.6944 7 12.7343C7.00004 12.7229 6.99883 12.7119 6.99836 12.7007ZM-7.80584 9.17962H-11.1001L-9.453 4.85231L-7.80584 9.17962ZM-2.9999 4.68747C-3.30146 4.68747 -3.54677 4.44215 -3.54677 4.14059C-3.54677 3.83903 -3.30146 3.59372 -2.9999 3.59372C-2.69834 3.59372 -2.45302 3.83903 -2.45302 4.14059C-2.45302 4.44215 -2.69834 4.68747 -2.9999 4.68747ZM3.45324 7.58665L5.11527 11.9531H1.7912L3.45324 7.58665Z" fill="#23BE20"/>
        <path d="M3.25 6.16L0.5 3.16L1.66 2L3.25 3.59L6.84 0L8 1.41L3.25 6.16Z" fill="#23BE20"/>
      </svg>

      <template v-if="!isOnCompare">
        {{ $t('Add to compare') }}
      </template>
      <template v-else>
        {{ $t('Remove from compare') }}
      </template>
    </slot>
  </button>
</template>

<script>
  import { IsOnCompare } from '@vue-storefront/core/modules/compare/components/IsOnCompare'
  import { AddToCompare } from '@vue-storefront/core/modules/compare/components/AddToCompare'
  import { RemoveFromCompare } from '@vue-storefront/core/modules/compare/components/RemoveFromCompare'
  import i18n from '@vue-storefront/i18n'
  import { htmlDecode } from '@vue-storefront/core/lib/store/filters'

  export default {
    mixins: [IsOnCompare, AddToCompare, RemoveFromCompare],
    props: {
      product: {
        required: true,
        type: Object
      }
    },
    methods: {
      addProduct (product) {
        this.addToCompare(product)
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

<style lang="scss">
  .add-to-compare {
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
