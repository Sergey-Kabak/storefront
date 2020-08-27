<template>
  <div class="promo-code">
    <div class="promo-code-title">
      <button-text @click.native="togglePromoCode()">{{ $t("Enter promotional code") }}</button-text>
    </div>
    <div class="promo-code-body" v-if="!isActive">
      <input
        type="text"
        class="form-control promo-code-input"
        :placeholder="$t('PROMOCODE')"
        v-model.trim="couponCode"
      />
      <button-outline
        class="promo-code-button"
        @click.native="setCoupon()"
      >
        {{ $t("To apply") }}
      </button-outline>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import i18n from '@vue-storefront/i18n'
import ButtonOutline from 'theme/components/theme/ButtonOutline'
import ButtonText from 'theme/components/theme/ButtonText'

export default {
  name: 'PromoCode',
  components: {
    ButtonOutline,
    ButtonText
  },
  data: function () {
    return {
      couponCode: null,
      isActive: false
    }
  },
  methods: {
    ...mapActions({
      applyCoupon: 'cart/applyCoupon'
    }),
    async setCoupon () {
      const couponApplied = await this.applyCoupon(this.couponCode);
      this.couponCode = '';
      if (!couponApplied) {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'warning',
          message: i18n.t(
            'You\'ve entered an incorrect coupon code. Please try again.'
          ),
          action1: { label: i18n.t('OK') }
        });
      }
    },
    togglePromoCode () {
      this.isActive = !this.isActive
    }
  }
};
</script>

<style lang="scss" scoped>
.promo-code {
  background-color: white;
  border-bottom: 1px solid #E0E0E0;

  &-body {
    display: flex;
    padding-bottom: 16px;
  }

  &-title {
    width: fit-content;
    padding-bottom: 20px;
  }

  &-input {
    flex-grow: 1;
    user-select: none;
    margin-right: 20px;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 0 10px;
    height: 40px;
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 0;
    font-size: 13px;
    line-height: 16px;

    &:focus {
      outline: none;
      border-color: #23BE20;
    }
  }
}

.promo-code-button {
  max-width: 150px;
}
</style>
