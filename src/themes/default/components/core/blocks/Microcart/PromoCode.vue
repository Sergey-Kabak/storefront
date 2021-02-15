<template>
  <div class="promo-code">
    <div class="promo-code-title">
      <button-text @click.native="togglePromoCode()">{{ $t("Enter promotional code") }}</button-text>
    </div>
    <div class="promo-code-body" v-if="isActive">
      <div class="promo-code-left">
        <div class="promocode-input" :class="{'active': isPromocodeActive, 'invalid': isPromocodeInvalid}">
          <input
            type="text"
            class="form-control promo-code-input"
            :placeholder="$t('PROMOCODE')"
            v-model.trim="couponCode"
          />
          <div class="promocode-active" v-if="isPromocodeActive">
            <img src="/assets/custom/Correct.svg" alt="correct">
          </div>
          <div class="promocode-invalid" v-if="isPromocodeInvalid" @click="clearPromocode()">
            <img src="/assets/custom/Cancel.svg" alt="invalid">
          </div>
        </div>
        <span class="input-error" v-if="isPromocodeInvalid">{{ $t('Promocode is not valid') }}</span>
      </div>
      <div class="promo-code-right">
        <button-outline
          class="promo-code-button"
          @click.native="deleteCoupon()"
          v-if="isPromocodeActive"
        >
          {{ $t("Remove") }}
        </button-outline>
        <button-outline
          class="promo-code-button"
          @click.native="setCoupon()"
          v-else
        >
          {{ $t("To apply") }}
        </button-outline>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import i18n from '@vue-storefront/i18n'
import ButtonOutline from 'theme/components/theme/ButtonOutline'
import ButtonText from 'theme/components/theme/ButtonText'

export default {
  name: 'PromoCode',
  props: {
    isActive: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    ButtonOutline,
    ButtonText
  },
  data: function () {
    return {
      couponCode: null,
      isPromocodeInvalid: false
    }
  },
  computed: {
    ...mapGetters({
      totals: 'cart/getTotals',
    }),
    isPromocodeActive() {
      return this.totals.find(it => it.code === 'discount')
    }
  },
  methods: {
    ...mapActions({
      applyCoupon: 'cart/applyCoupon',
      removeCoupon: 'cart/removeCoupon'
    }),
    async setCoupon () {
      this.isPromocodeInvalid = false
      if (this.couponCode) {
        const res = await this.applyCoupon(this.couponCode);
        if (res !== true) {
          this.isPromocodeInvalid = true
        }
      }
    },
    async deleteCoupon () {
      await this.removeCoupon()
      this.couponCode = ''
    },
    clearPromocode() {
      this.isPromocodeInvalid = false
      this.couponCode = ''
    },
    togglePromoCode () {
      this.$emit('update:isActive', !this.isActive)
    },
  }
};
</script>

<style lang="scss" scoped>
.promo-code {
  background-color: white;

  &-body {
    display: flex;
    padding-bottom: 16px;
  }

  &-title {
    width: fit-content;
    margin-bottom: 16px;
  }

  &-left {
    width: 100%;
    margin-right: 16px;
    min-width: 174px;
  }

  .promocode-input {
    position: relative;

    &.invalid {
      input {
        border-color: #ee2c39;
      }
    }
  }

  &-right {
    height: 40px;
    width: 100%;
    max-width: 153px;
  }

  &-input {
    width: 100%;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 0 44px 0 16px;
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

.input-error {
  font-family: DIN Pro;
  margin-top: 4px;
  font-style: normal;
  font-size: 13px;
  line-height: 16px;
  color: #EE2C39;

  padding-left: 16px;
}

.promo-code-button {
  width: 100%;
  height: 100%;
}

.promocode-active,
.promocode-invalid {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 20px;
  height: 20px;
  line-height: 25px;
  border-radius: 50%;
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
}

.promocode-active {
  background: #23BE20;
}

.promocode-invalid {
  cursor: pointer;
  background: #EE2C39;
}
</style>
