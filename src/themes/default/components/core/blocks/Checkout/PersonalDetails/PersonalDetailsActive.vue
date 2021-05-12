<template>
  <div class="personal-details active">
    <div class="title">
      <span class="section-title">1. {{ $t("Contact information") }} </span>
    </div>
    <div class="personal-details-row">
      <div class="personal-details-column personal-details-column--left">
        <span class="column-title">{{ $t("Your name") }}</span>
      </div>
      <div class="personal-details-column personal-details-column--right">
        <div class="inputs">
          <base-input
            class="custom-input"
            :class="{ error: $v.personalDetails.firstName.$error && $v.personalDetails.firstName.$dirty }"
            type="text"
            name="first-name"
            :placeholder="$t('First name')"
            v-model.trim="personalDetails.firstName"
            @blur="$v.personalDetails.firstName.$touch()"
            autocomplete="given-name"
            :validations="[
              {
                condition: $v.personalDetails.firstName.$error && !$v.personalDetails.firstName.required && $v.personalDetails.firstName.$dirty,
                text: $t('Field is required')
              },
            {
                condition: !$v.personalDetails.firstName.minLength && $v.personalDetails.firstName.$dirty,
                text: $t('Name must have at least 2 letters.')
              },
              {
                condition: !$v.personalDetails.firstName.lettersOnly && $v.personalDetails.firstName.$dirty,
                text: $t('Accepts only alphabet characters.')
              }
            ]"
          />
          <base-input
            class="custom-input"
            type="text"
            name="last-name"
            :placeholder="$t('Last name')"
            v-model.trim="personalDetails.lastName"
            @blur="$v.personalDetails.lastName.$touch()"
            autocomplete="family-name"
            :class="{ error: $v.personalDetails.lastName.$error && $v.personalDetails.lastName.$dirty }"
            :validations="[
              {
                condition: $v.personalDetails.lastName.$error && !$v.personalDetails.lastName.required && $v.personalDetails.lastName.$dirty,
                text: $t('Field is required')
              },
              {
                condition: !$v.personalDetails.lastName.minLength && $v.personalDetails.lastName.$dirty,
                text: $t('Last name must have at least 2 letters.')
              },
              {
                condition: !$v.personalDetails.lastName.lettersOnly && $v.personalDetails.lastName.$dirty,
                text: $t('Accepts only alphabet characters.')
              }
            ]"
          />
        </div>
      </div>
    </div>
    <div class="personal-details-row">
      <div class="personal-details-column personal-details-column--left">
        <span class="column-title">{{ $t("Your contacts") }}</span>
      </div>
      <div class="personal-details-column personal-details-column--right">
        <base-input
          class="custom-input"
          type="tel"
          name="phone-number"
          v-mask="'+38(###)###-##-##'"
          @blur="$v.personalDetails.phoneNumber.$touch()"
          :placeholder="$t('Phone Number')"
          v-model.trim="personalDetails.phoneNumber"
          autocomplete="tel"
          :class="{ error: $v.personalDetails.phoneNumber.$error && $v.personalDetails.phoneNumber.$dirty }"
          :validations="[
            {
              condition: $v.personalDetails.phoneNumber.$error && !$v.personalDetails.phoneNumber.required && $v.personalDetails.phoneNumber.$dirty,
              text: $t('Field is required')
            },
            {
              condition: !$v.personalDetails.phoneNumber.isPhone && $v.personalDetails.phoneNumber.$error && $v.personalDetails.phoneNumber.$dirty,
              text: $t('Please provide valid phone number')
            }
          ]"
        />
        <base-input
          class="custom-input"
          type="email"
          name="email-address"
          :placeholder="$t('Email address')"
          v-model="personalDetails.emailAddress"
          @blur="$v.personalDetails.emailAddress.$touch()"
          autocomplete="email"
          @keyup.enter="sendDataToCheckout"
          :class="{ error: $v.personalDetails.emailAddress.$error && $v.personalDetails.emailAddress.$dirty }"
          :validations="[
            {
              condition: $v.personalDetails.emailAddress.$error && !$v.personalDetails.emailAddress.required && $v.personalDetails.emailAddress.$dirty,
              text: $t('Field is required')
            },
            {
              condition: !$v.personalDetails.emailAddress.email && $v.personalDetails.emailAddress.$error && $v.personalDetails.emailAddress.$dirty,
              text: $t('Please provide valid e-mail address.')
            }
          ]"
        />
      </div>
    </div>
    <div class="personal-details-row">
      <div class="personal-details-column"/>
      <div class="personal-details-column personal-details-column--right">
        <button-full
          class="button-next"
          data-testid="personalDetailsSubmit"
          @click.native="validateData()"
        >
          {{ $t('next') }}
        </button-full>
      </div>
    </div>
  </div>
</template>

<script>
import {
  required,
  minLength,
  email,
  sameAs
} from 'vuelidate/lib/validators';
import { PersonalDetails } from '@vue-storefront/core/modules/checkout/components/PersonalDetails';

import ButtonFull from 'theme/components/theme/ButtonFull';
import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox';
import BaseInput from 'theme/components/core/blocks/Form/BaseInput';
import { mask } from 'vue-the-mask'
import { isPhone, lettersOnly } from 'theme/helpers/regular-expressions'

export default {
  components: {
    BaseCheckbox,
    BaseInput,
    ButtonFull
  },
  directives: {
    mask
  },
  mixins: [PersonalDetails],
  validations: {
    personalDetails: {
      firstName: {
        required,
        minLength: minLength(2),
        lettersOnly
      },
      lastName: {
        required,
        minLength: minLength(2),
        lettersOnly
      },
      emailAddress: {
        required,
        email
      },
      phoneNumber: {
        required,
        isPhone
      }
    },
    password: {
      required
    },
    rPassword: {
      required,
      sameAsPassword: sameAs('password')
    },
    acceptConditions: {
      sameAs: sameAs(() => true)
    }
  },
  methods: {
    validateData() {
      if (this.$v.personalDetails.$invalid) {
        this.$v.personalDetails.$touch()
      } else {
        this.sendDataToCheckout()
        this.activateNextSection()
      }
    },
    activateNextSection() {
      this.$store.commit('checkoutPage/SET_PERSONAL_DETAILS_STATUS', 'selected')
      this.$store.commit('checkoutPage/SET_SHIPPING_STATUS', 'active')
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.personal-details-row {
  display: flex;
  justify-content: space-between;
}

.personal-details-column {

  &--left {
    flex: 1;
    padding: 0 16px;
  }
  &--right {
    flex: 0 1 316px;
    margin-right: 16px;
    @media only screen and (max-width: 1200px) {
      flex: 0 1 250px;
    }
    @media only screen and (max-width: 960px) {
      flex: 1;
    }
    @media only screen and (max-width: 576px) {
      flex: 1;
      margin-right: 0;
    }
  }
}

.column-title {
  display: block;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  color: #5F5E5E;
}

.button-full {
  &.button-next {
    max-width: 100%;
  }
}

.title {
  margin-bottom: 32px;
}

.section-title {
  max-width: 100%;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: DIN Pro;
  font-size: 18px;
  line-height: 24px;
  font-weight: 400;
  color: #1A1919;
}

.base-input {
  margin-bottom: 18px;

  &:last-child {
    margin-bottom: 34px;

    @media only screen and (max-width: 600px) {
      margin-bottom: 22px;
    }
  }
}
@media (max-width: 960px) {
  .base-input.custom-input {
    max-width: 100%;
  }
}

@media (max-width: 576px) {
  .personal-details-row {
    flex-direction: column;
  }

  .personal-details-column {
    padding: 0;
  }

  .title {
    margin-bottom: 24px;
  }

  .column-title {
    margin-bottom: 16px;
    font-size: 13px;
    line-height: 16px;
    color: #5F5E5E;
  }
}
</style>
