<template>
  <div class="shipping radio">
    <div class="radio-button" :class="{ 'active': active }" />
    <img class="shipping-icon" :src="shippingIcons[shipping.method_code]" :alt="shipping.method_code">
    <div class="shipping-info">
      <div class="info">
        <span class="shipping-name">{{ $t(shipping.method_code) }}</span>
        <span class="shop-count" v-if="shipping.method_code === 'freeshipping'">{{ $tc('Available in {count} shops', totalShops) }}</span>
        <span class="shipping-description" v-if="shipping.method_code !== 'freeshipping'">{{ $t("Will send today") }}</span>
        <span class="shipping-description" v-else>{{ $t("Pick up today") }}</span>
      </div>
      <div class="price">
        <div class="shipping-price">
          <span v-if="shipping.amount" class="shipping-cost">{{ shipping.amount | price(storeView) }}</span>
          <span class="shipping-free" v-else>{{ $t("is free") }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { mapState } from 'vuex';

export default {
  props: {
    shipping: {
      type: Object,
      required: true,
      default: () => {}
    },
    active: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data: () => ({
    shippingIcons: {
      nova_poshta_to_door: '/assets/shipping/nova_poshta_to_door.svg',
      freeshipping: '/assets/shipping/freeshipping.svg',
      nova_poshta_to_warehouse: '/assets/shipping/nova_poshta_to_warehouse.svg',
      justin_to_department: '/assets/shipping/justin_to_department.svg'
    }
  }),
  computed: {
    ...mapState({
      totalShops: (state) => state.checkoutPage.totalShops
    }),
    storeView () {
      return currentStoreView()
    }
  }
}
</script>

<style lang="scss" scoped>
.shipping {
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 14px;
  cursor: pointer;
}

.shipping-icon {
  width: 20px;
  height: 20px;
  margin-right: 12px;
}

.shipping-info {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.shipping-name {
  font-family: DIN Pro;
  font-size: 15px;
  line-height: 16px;
  color: #1A1919;
  margin-bottom: 2px;
}

.info {
  display: flex;
  flex-direction: column;
}

.shipping-description {
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #5f5e5e99;
}

.price {
  display: flex;
  align-items: center;
}

.shipping-price {
  display: flex;
  margin-left: auto;
}

.shipping-free {
  text-transform: capitalize;
  font-family: DIN Pro;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: #23BE20;
}

.shipping-cost {
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #1A1919;
}

.shop-count {
  font-family: DIN Pro;
  margin-bottom: 2px;
  font-size: 13px;
  line-height: 16px;
  color: #23BE20;
}

@media  (max-width: 460px) {
  .shipping-info {
    flex-direction: column;
  }

  .info {
    margin-bottom: 8px;
  }

  .shipping-price {
    margin: unset;
  }
}
</style>
