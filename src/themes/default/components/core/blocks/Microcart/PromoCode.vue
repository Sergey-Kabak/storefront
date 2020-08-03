<template>
  <div class="promo-code-wrapper">
    <div class="promo-code-top-row">
      <span :class="{ 'active': isToggled }" @click="togglePromoCode()">{{ $t("Enter promotional code") }}</span>
    </div>
    <div class="promo-code-body-row row" v-if="!isActive">
      <div class="col-sm-7">
        <input
          type="text"
          class="form-control w-100 promo-code-body-row-input"
          aria-describedby="emailHelp"
          :placeholder="$t('PROMOCODE')"
          v-model.trim="couponCode"
        />
      </div>
      <div class="col-sm-5">
        <button 
          class="promo-code-body-row-btn" 
          @click="setCoupon()"
        >
          {{ $t("To apply") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
import i18n from '@vue-storefront/i18n'

export default {
  props: {
    isToggled: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      couponCode: null,
      isActive: this.isToggled
    }
  },
  name: "PromoCode",
  methods: {
    ...mapActions({
      applyCoupon: 'cart/applyCoupon'
    }),
    async setCoupon() {
      const couponApplied = await this.applyCoupon(this.couponCode);
      this.couponCode = "";
      if (!couponApplied) {
        this.$store.dispatch("notification/spawnNotification", {
          type: "warning",
          message: i18n.t(
            "You've entered an incorrect coupon code. Please try again."
          ),
          action1: { label: i18n.t("OK") }
        });
      }
    },
    togglePromoCode() {
      if (this.isToggled) {
        this.isActive = !this.isActive
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.promo-code {
  &-wrapper {
    background-color: white;
    padding-bottom: 20px;
  }
  &-top-row {
    margin-bottom: 20px;

    span {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 100;
      font-size: 13px;
      line-height: 16px;
      padding-bottom: 4px;
      border-bottom: 1px dashed #1a1919;
      
      &.active {
        cursor: pointer;
      }
    }
  }
  &-body-row {
    &-input {
      margin-bottom: 10px;
      background: #ffffff;
      border: 1px solid #e0e0e0;
      box-sizing: border-box;
      border-radius: 4px;
      padding: 0 10px;
      height: 45px;
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 0;
      font-size: 13px;
      line-height: 16px;

      &:focus {
        outline: none;
      }
    }
    &-btn {
      margin-bottom: 10px;

      border: 1px solid #23be20;
      box-sizing: border-box;
      border-radius: 4px;
      height: 45px;
      width: 100%;
      background-color: white;

      font-family: DIN Pro;
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 16px;
    }
  }
}
</style>
