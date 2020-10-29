<template>
  <div class="personal-details">
    <div class="checkout-subtitle">
      <div class="checkout-number-block" :class="{'checked': !isActive}">
        <div class="number align-center" v-if="isActive">2</div>
        <img src='/assets/custom/Check.svg' v-else alt="correct">
      </div>
      <div class="checkout-subtitle-text">{{ $t('Contact details') }}:</div>
    </div>
    <div class="personal-details-body">
      <div class="label">
        {{ $t('What is your name?') }}
        <span class="label--highlighted">*</span>
      </div>
      <div class="personal-details-row">
        <base-input
          class="custom-input"
          :class="{ error: $v.personalDetails.firstName.$error && $v.personalDetails.firstName.$dirty }"
          type="text"
          :autofocus="true"
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
      <div class="label">
        {{ $t('Your contacts') }}
        <span class="label--highlighted">*</span>
      </div>
      <div class="personal-details-row">
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
    <div class="row" v-show="isActive">
      <div class="col-xs-12">
        <div class="row">
          <div class="col-xs-12 px20 button-container">
            <button-small
              class="custom-action-button"
              data-testid="personalDetailsSubmit"
              @click.native="validateData()"
            >
              {{ $t((isVirtualCart ? 'next' : 'next')) }}
            </button-small>
          </div>
        </div>
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

import ButtonSmall from 'theme/components/theme/ButtonFilledSmall';
import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox';
import BaseInput from 'theme/components/core/blocks/Form/BaseInput';
import Tooltip from 'theme/components/core/Tooltip';
import { mask } from 'vue-the-mask'

const lettersOnly = value => (
  /^[\u0400-\u04FF]+$/.test(value) ||
  /^[a-zA-Z]+$/.test(value) ||
    value === ""
);

const isPhone = value => (
  /\+38\(\d{3}\)\d{3}\-\d{2}\-\d{2}$/.test(value)
)

export default {
  components: {
    Tooltip,
    BaseCheckbox,
    BaseInput,
    ButtonSmall
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
      }
    }
  }
}
</script>

<style lang="sass">
  .personal-details
    margin-bottom: 32px
    .custom-input
      input
        font-family: DIN Pro;
        font-size: 13px;
        color: #1A1919;
        line-height: 16px;
        background: #FFFFFF
        border: 1px solid #E0E0E0
        box-sizing: border-box
        border-radius: 4px
        padding: 16px
      label
        font-family: 'DIN Pro'
        font-size: 13px
        line-height: 16px
        color: #595858
        opacity: .6
      input:focus ~ label,
      input:not(.empty) ~ label
        padding: 0 10px
        background: #ffffff
        opacity: 1
        margin-top: 0
        color: #23BE20
      input:focus
        border-color: #23BE20;
      &.error
        input:focus ~ label,
        input:not(.empty) ~ label,
        label
          color: #EE2C39
        input:focus, input
          border-color: #EE2C39;

</style>

<style lang="scss" scoped>
@import '~bootstrap';

.link {
  text-decoration: underline;
}

.login-prompt {
  @media (min-width: 1200px) {
    margin-top: 30px;
  }
}

.personal-details-row {
  display: flex;
  justify-content: space-between;

  .relative {
    &:first-child {
      margin-right: 10px;
    }

    &:last-child {
      margin-left: 10px;
    }
  }

  &:last-of-type {
    margin-bottom: 14px;
  }
}

.personal-details-body {
  .custom-input {
    width: 100%;
    min-height: 70px;
    max-width: 310px;

    ::v-deep .cl-error {
      padding-left: 15px;
    }
  }
}

.label {
  display: flex;
  align-items: center;
  color: #595858;
  font-family: DIN Pro;
  font-style: normal;
  font-size: 13px;
  line-height: 16px;
  margin-bottom: 20px;

  &--highlighted {
    color: #23BE20;
  }
}

@media (max-width: 960px) {
  .custom-input {
    max-width: 100%!important;
    margin-bottom: 0;
  }

  .personal-details-row {
    &:last-of-type {
      margin-bottom: 0;
    }
  }
}

@media (max-width: 460px) {
  .personal-details-row {
    flex-direction: column;

    .relative {
      &:first-child,
      &:last-child {
        margin-right: 0;
        margin-left: 0;
      }
    }
  }

  .custom-action-button {
    max-width: 100%;
  }
}

</style>
