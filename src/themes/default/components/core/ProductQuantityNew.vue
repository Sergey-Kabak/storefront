<template>
  <div class="product-quantity">
    <plus-minus-field
      :name="name"
      :value="value"
      :min="1"
      :max="max"
      :loading="loading"
      :disabled="disabled"
      @input="$emit('input', $event)"
      @blur="$v.$touch()"
    />
    <spinner v-if="loading" containerClass="quantity-spinner" />
  </div>
</template>

<script>
import { minValue, maxValue, numeric, required } from 'vuelidate/lib/validators'
import { onlineHelper } from '@vue-storefront/core/helpers'
import BaseInputNumber from 'theme/components/core/blocks/Form/BaseInputNumber'
import Spinner from 'theme/components/core/Spinner'
import PlusMinusField from "./blocks/Microcart/PlusMinusField";

export default {
  components: {
    Spinner,
    BaseInputNumber,
    PlusMinusField
  },
  props: {
    value: {
      type: [Number, String],
      required: true
    },
    showQuantity: {
      type: Boolean,
      default: false
    },
    maxQuantity: {
      type: Number,
      default: undefined
    },
    checkMaxQuantity: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isOnline (value) {
      return onlineHelper.isOnline
    },
    max () {
      if (!this.isOnline) {
        return null
      }

      return this.maxQuantity
    },
    disabled () {
      if (!this.isOnline) {
        return false
      }
      return !this.maxQuantity && this.checkMaxQuantity
    },
    name () {
      if (!this.loading && this.showQuantity) {
        return this.$i18n.t(this.isOnline ? 'Quantity available' : 'Quantity available offline', { qty: this.maxQuantity })
      }
      return this.$i18n.t('Quantity')
    }
  },
  validations () {
    return {
      value: {
        minValue: minValue(1),
        maxValue: maxValue(this.max),
        numeric,
        required
      }
    }
  },
  watch: {
    '$v.$invalid' (error) {
      this.$emit('error', error)
    }
  }
}
</script>
<style lang="scss" scoped>
.product-quantity {
  display: inline-flex;
  position: relative;
  /deep/ .spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
}
</style>
<style>
.quantity-spinner {
  display: flex;
  justify-content: center;
  background: rgba(255,255,255,.5);
  height: 32px;
  align-items: center;
  bottom: auto!important;
}
</style>
