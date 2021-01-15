<template>
  <div class="shipping active">
    <div class="title">
      <span>2. {{ $t("Delivery") }}</span>
    </div>
    <radio-button
      v-for="shipping in methods"
      :key="shipping.method_code"
      :label="shipping.method_code"
      @change="setActiveShippingMethod($event)"
      :value="selectedShipping.method_code"
      :showDefaultButton="false"
      :class="{ 'active': shipping.method_code === selectedShipping.method_code }"
      class="shipping-radio"
    >
      <template v-slot:default="slotProps">
        <div class="shipping-item">
          <shipping-radio :active="slotProps.active" :shipping="shipping" />
          <transition name="slide" mode="out-in">
            <component v-if="slotProps.active" :is="shipping.method_code" @onSelectShipping="selectShipping()"/>
          </transition>
        </div>
      </template>
    </radio-button>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Shipping } from '@vue-storefront/core/modules/checkout/components/Shipping';
import RadioButton from 'theme/components/core/blocks/Checkout/RadioButton';
import ShippingRadio from 'theme/components/core/blocks/Checkout/Shipping/ShippingRadio';
import CourierShipping from 'theme/components/core/blocks/Checkout/Shipping/CourierShipping/CourierShipping';
import NewPostShipping from 'theme/components/core/blocks/Checkout/Shipping/NewPostShipping/NewPostShipping';
import ShopShipping from 'theme/components/core/blocks/Checkout/Shipping/ShopShipping/ShopShipping';
import JustinShipping from 'theme/components/core/blocks/Checkout/Shipping/JustinShipping/JustinShipping.vue';

export default {
  mixins: [Shipping],
  components: {
    RadioButton,
    ShippingRadio,
    'nova_poshta_to_door': CourierShipping,
    'freeshipping': ShopShipping,
    'nova_poshta_to_warehouse': NewPostShipping,
    'justin_to_department': JustinShipping
  },
  computed: {
    ...mapState({
      selectedShipping: (state) => state.checkoutPage.selectedShipping,
      selectedShop: (state) => state.checkoutPage.shopShipping,
      justinShipping: (state) => state.checkoutPage.justinShipping
    }),
    methods() {
      const methods = {
        'freeshipping': this.selectedShop,
        'nova_poshta_to_warehouse': true,
        'justin_to_department': this.justinShipping,
        'nova_poshta_to_door': true
      }
      return this.shippingMethods.filter(it => {
        return methods[it.method_code]
      })
    }
  },
  methods: {
    setActiveShippingMethod(methodCode) {
      const activeShipping = this.shippingMethods.find(it => it.method_code === methodCode)
      this.$store.commit('checkoutPage/SET_SELECTED_SHIPPING', activeShipping)
    },
    selectShipping() {
      this.activateNextSection()
    },
    activateNextSection() {
      this.$store.commit('checkoutPage/SET_SHIPPING_STATUS', 'selected')
      this.$store.commit('checkoutPage/SET_PAYMENT_STATUS', 'active')
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  border: 1px solid #E0E0E0;
  border-radius: 4px 4px 0 0;
  padding: 16px;
  border-bottom: transparent;

  span {
    font-family: DIN Pro;
    font-size: 18px;
    line-height: 24px;
    font-weight: 500;
    color: #1A1919;
  }
}

.shipping-radio {
  .shipping-item {
    border: 1px solid #E0E0E0;
    border-bottom: 1px solid transparent;
  }

  &:last-child {
    .shipping-item {
      border-radius: 0 0 4px 4px;
      border-bottom: 1px solid #E0E0E0;
    }
  }

  &.active {
    .shipping-item {
      border: 1px solid#23BE20;
    }

    & + .shipping-radio {
      .shipping-item {
        border-top: none
      }
    }
  }
}

.slide-enter-active {
  transition: opacity .2s, transform .3s;
}

.slide-enter, .slide-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

</style>
