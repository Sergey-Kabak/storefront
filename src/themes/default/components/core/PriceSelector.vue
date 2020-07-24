<template>
  <div class="price-selector">
    <div class="inputs">
      <custom-input label="От" v-model="variant.from" @keypress="isNumber($event)" @change="changeFilter()" />
      <custom-input label="До" v-model="variant.to" @keypress="isNumber($event)"  @change="changeFilter()" />
    </div>
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
        numeric,
        maxValue: function () {
          return +this.variant.to >= +this.variant.from;
        }
      },
      to: {
        numeric
      }
    }
  },
  methods: {
    changeFilter () {
      if (!this.$v.$invalid) {
        this.variant.label = `${this.variant.from}₴ - ${this.variant.to}₴`;
        this.variant.id = `${this.variant.from}-${this.variant.to}`;
        this.$emit('change', this.variant);
      }
      // currency sign should be received from i18n
    },
    isNumber (event) {
      const charCode = (event.which) ? event.which : event.keyCode;
      if ((charCode > 31 && (charCode < 48 || charCode > 57))) {
        event.preventDefault();
      } else {
        return true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.inputs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>
