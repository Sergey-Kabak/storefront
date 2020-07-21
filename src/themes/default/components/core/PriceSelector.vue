<template>
  <div class="price-selector">
    <div class="inputs">
      <custom-input label="От" :amount="variant.min" v-model="variant.from" />
      <custom-input label="До" :amount="variant.max" v-model="variant.to" />
    </div>
    <button
      class="price-selector-button"
      @click="changeFilter()"
      :disabled="$v.$invalid"
    >
      OK
    </button>
  </div>
</template>

<script>
import filterMixin from 'theme/mixins/filterMixin.ts'
import { required, numeric } from 'vuelidate/lib/validators'
import CustomInput from 'theme/components/core/blocks/Form/CustomInput'

export default {
  components: {
    CustomInput
  },
  mixins: [filterMixin],
  validations: {
    variant: {
      from: {
        required,
        numeric,
        maxValue: function () {
          return +this.variant.to >= +this.variant.from;
        }
      },
      to: {
        required,
        numeric
      }
    }
  },
  methods: {
    changeFilter () {
      // currency sign should be received from i18n
      this.variant.label = `${this.variant.from}₴ - ${this.variant.to}₴`;
      this.variant.id = `${this.variant.from}-${this.variant.to}`;
      this.$emit('change', this.variant);
    }
  }
};
</script>

<style lang="scss" scoped>
.inputs {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.price-selector-button {
  border: none;
  background: #23be20;
  border-radius: 4px;
  color: #fff;
  width: 100%;
  padding: 5px 12px;

  &:disabled {
    background: #bdbdbd;
  }
}
</style>
