<template>
  <div class="courier">
    <div class="courier-row">
      <div class="courier-column">
        <span class="column-title">{{ $t("Shipping address") }}</span>
      </div>
      <div class="courier-column courier-form">
        <div class="courier-row">
          <div class="autocomplete-wrapper base-input">
            <autocomplete
              @submit="onChooseStreet($event)"
              :search="getStreets"
              :selectedValue="courierShipping.address.Description"
              :options="streets"
              label="Description"
              :placeholder="$t('Choose your street *')"
              :class="{ 'invalid': $v.courierShipping.address.Description.$invalid && $v.courierShipping.address.Description.$dirty }"
              class="search-autocomplete"
            />
          </div>
        </div>
        <div class="courier-row">
          <base-input
            class="custom-input custom-input-house"
            type="text"
            name="house"
            :placeholder="$t('Дом *')"
            v-model.trim="courierShipping.house"
            @blur="$v.courierShipping.house.$touch()"
            :class="{ error: ($v.courierShipping.house.$error && !$v.courierShipping.house.required) }"
            :validations="[
              {
                condition: $v.courierShipping.house.$error && !$v.courierShipping.house.required,
                text: $t('Field is required')
              }
            ]"
          />
          <base-input
            class="custom-input custom-input-appartment"
            type="text"
            name="apartmentNumber"
            :placeholder="$t('Кв *')"
            v-model.trim="courierShipping.apartmentNumber"
            @blur="$v.courierShipping.apartmentNumber.$touch()"
            :class="{ error: ($v.courierShipping.apartmentNumber.$error && !$v.courierShipping.apartmentNumber.required) }"
            :validations="[
              {
                condition: $v.courierShipping.apartmentNumber.$error && !$v.courierShipping.apartmentNumber.required,
                text: $t('Field is required')
              }
            ]"
          />
        </div>
        <div class="courier-row">
          <button-full class="courier-button" @click.native="validateData()">{{ $t('next') }}</button-full>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import Autocomplete from 'theme/components/core/blocks/Form/Autocomplete'
import ButtonFull from 'theme/components/theme/ButtonFull'
import ValidationMessages from 'theme/components/core/blocks/Form/ValidationMessages';
import DOMPurify from 'dompurify';

export default {
  components: {
    BaseInput,
    ButtonFull,
    ValidationMessages,
    Autocomplete
  },
  validations: {
    courierShipping: {
      address: {
        Description: {
          required
        }
      },
      house: {
        required
      },
      apartmentNumber: {
        required
      }
    }
  },
  data: () => ({
    value: null
  }),
  computed: {
    ...mapState({
      courierShipping: (state) => state.checkoutPage.courierShipping,
      streets: (state) => state.checkoutPage.streets,
      city: (state) => state.ui.city
    })
  },
  mounted() {
    this.value = this.courierShipping.address.Description
  },
  methods: {
    sanitize(e) {
      const v = DOMPurify.sanitize(e.target.value);
      this.$refs.autocomplete.value = v
    },
    validateData() {
      if (this.$v.courierShipping.$invalid) {
        this.$v.courierShipping.$touch()
      } else {
        this.$store.commit('checkoutPage/SET_COURIER_SHIPPING', this.courierShipping)
        this.$emit('onSelectShipping')
      }
    },
    getStreets(query) {
      this.value = query
      return this.$store.dispatch('checkoutPage/getStreetsByCity', { city: this.city, street: query })
    },
    onChooseStreet(result) {
      this.value = result.value.Description
      this.$set(this.courierShipping, 'address', result.value)
    }
  }
};
</script>

<style lang="scss" scoped>
.courier {
  padding: 16px 32px;
}

.column-title {
  display: block;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  color: #5F5E5E;
}

.courier-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.base-input {
  margin-bottom: 16px;
  max-width: 100%;
  width: 100%;
}

.courier-form {
  max-width: 316px;
  width: 100%;
}

.custom-input-house {
  margin-right: 20px;
}

.button-full {
  margin-top: 16px;

  &.courier-button {
    max-width: 100%;
  }
}

.autocomplete-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.search-autocomplete ::v-deep {
  [data-position=below] .autocomplete-result-list {
    margin-top: 3px;
  }

  [data-position=above] .autocomplete-input[aria-expanded=true] {
    margin-bottom: 3px;
  }

  [data-position=below] .autocomplete-input[aria-expanded=true] {
    border-bottom-color: #23be20;
    border-radius: 4px;
  }

  [data-position=above] .autocomplete-input[aria-expanded=true] {
    border-top-color: #23be20;
    border-radius: 4px;
  }

  .autocomplete-result-list {
    border-top-color: #e0e0e0;
    border-radius: 4px;
  }
}

.search-autocomplete {
  margin-bottom: 0;

  &.invalid ::v-deep {
    .autocomplete-input {
      border-color: #EE2C39;
    }

    ::placeholder {
      color: #EE2C39;
    }

    [data-position=below] .autocomplete-input[aria-expanded=true] {
      border-bottom-color: #EE2C39;
    }

    [data-position=above] .autocomplete-input[aria-expanded=true] {
      border-top-color: #EE2C39;
    }
  }
}

@media  (max-width: 576px) {
  .courier {
    padding: 8px 16px 16px 16px;
  }

  .courier-form {
    max-width: 100%;
  }

  .courier-row {
    flex-direction: column;
  }
  
  .column-title {
    margin-bottom: 16px;
  }
}
</style>
