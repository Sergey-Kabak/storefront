<template>
  <div class="personal-details">
    <div class="row">
      <div class="col-xs-12 col-sm-12">
        <div class="row mt-3">
          <div class="col-xs-12">
            <div class="number-block d-flex align-items-center">
              <div class="number align-center">2</div>
              <div class="text">{{ $t('Contact details') }}:</div>
            </div>
          </div>

          <div class="col-xs-12">
            <div class="row">
              <base-input
                  class="col-xs-12 col-md-6 mb10 custom-input"
                  :class="{error: ($v.personalDetails.firstName.$error && !$v.personalDetails.firstName.required) || !$v.personalDetails.firstName.minLength}"
                  type="text"
                  :autofocus="true"
                  name="first-name"
                  :placeholder="$t('First name *')"
                  v-model.trim="personalDetails.firstName"
                  @blur="$v.personalDetails.firstName.$touch()"
                  autocomplete="given-name"
                  :validations="[
                    {
                      condition: $v.personalDetails.firstName.$error && !$v.personalDetails.firstName.required,
                      text: $t('Field is required')
                    },
                    {
                      condition: !$v.personalDetails.firstName.minLength,
                      text: $t('Name must have at least 2 letters.')
                    },
                    {
                      condition: !$v.personalDetails.firstName.lettersOnly,
                      text: $t('Accepts only alphabet characters.')
                    }
                  ]"
              />

              <base-input
                  class="col-xs-12 col-md-6 mb10 custom-input"
                  type="text"
                  name="last-name"
                  :placeholder="$t('Last name *')"
                  v-model.trim="personalDetails.lastName"
                  @blur="$v.personalDetails.lastName.$touch()"
                  autocomplete="family-name"
                  :validations="[
                    {
                      condition: $v.personalDetails.lastName.$error && !$v.personalDetails.lastName.required,
                      text: $t('Field is required')
                    },
                    {
                      condition: !$v.personalDetails.lastName.minLength,
                      text: $t('Last name must have at least 2 letters.')
                    },
                    {
                      condition: !$v.personalDetails.lastName.lettersOnly,
                      text: $t('Accepts only alphabet characters.')
                    }
                  ]"
              />

              <base-input
                  class="col-xs-12 col-md-6 mb10 custom-input"
                  type="text"
                  name="phone-number"
                  :placeholder="$t('Phone Number') + ' *'"
                  v-model.trim="personalDetails.phoneNumber"
                  autocomplete="tel"
                  @blur="$v.personalDetails.phoneNumber.$touch()"
                  :validations="[
                    {
                      condition: $v.personalDetails.phoneNumber.$error && !$v.personalDetails.phoneNumber.required,
                      text: $t('Field is required')
                    },
                    {
                      condition: !$v.personalDetails.phoneNumber.isPhone && $v.personalDetails.phoneNumber.$error,
                      text: $t('Please provide valid phone number')
                    }
                  ]"
              />

              <base-input
                  class="col-xs-12 col-md-6 mb10 custom-input"
                  type="email"
                  name="email-address"
                  :placeholder="$t('Email address *')"
                  v-model="personalDetails.emailAddress"
                  @blur="$v.personalDetails.emailAddress.$touch()"
                  autocomplete="email"
                  @keyup.enter="sendDataToCheckout"
                  :validations="[
                    {
                      condition: $v.personalDetails.emailAddress.$error && !$v.personalDetails.emailAddress.required,
                      text: $t('Field is required')
                    },
                    {
                      condition: !$v.personalDetails.emailAddress.email && $v.personalDetails.emailAddress.$error,
                      text: $t('Please provide valid e-mail address.')
                    }
                  ]"
                />

              <!--<base-checkbox-->
                  <!--v-if="!currentUser"-->
                  <!--class="col-xs-12 mb15"-->
                  <!--id="createAccountCheckbox"-->
                  <!--v-model="createAccount"-->
              <!--&gt;-->
                <!--{{ $t('I want to create an account') }}-->
              <!--</base-checkbox>-->

              <!--<template v-if="createAccount && !currentUser">-->
                <!--<base-input-->
                    <!--class="col-xs-12 mb10 mt10"-->
                    <!--type="password"-->
                    <!--name="password"-->
                    <!--ref="password"-->
                    <!--:placeholder="$t('Password *')"-->
                    <!--v-model="password"-->
                    <!--@blur="$v.password.$touch()"-->
                    <!--autocomplete="new-password"-->
                    <!--:validations="[{-->
                <!--condition: $v.password.$error && !$v.password.required,-->
                <!--text: $t('Field is required.')-->
              <!--}]"-->
                <!--/>-->

                <!--<base-input-->
                    <!--class="col-xs-12 mb25"-->
                    <!--type="password"-->
                    <!--name="password-confirm"-->
                    <!--:placeholder="$t('Repeat password *')"-->
                    <!--v-model="rPassword"-->
                    <!--autocomplete="new-password"-->
                    <!--:validations="[-->
                <!--{-->
                  <!--condition: $v.rPassword.$error && !$v.rPassword.required,-->
                  <!--text: $t('Field is required.')-->
                <!--},-->
                <!--{-->
                  <!--condition:!$v.rPassword.sameAsPassword,-->
                  <!--text: $t('Passwords must be identical.')-->
                <!--}-->
              <!--]"-->
                <!--/>-->

                <!--<base-checkbox-->
                    <!--class="col-xs-12 mb15"-->
                    <!--id="acceptConditions"-->
                    <!--@blur="$v.acceptConditions.$touch()"-->
                    <!--v-model="acceptConditions"-->
                    <!--:validations="[{-->
                <!--condition: !$v.acceptConditions.sameAs && $v.acceptConditions.$error,-->
                <!--text: $t('You must accept the terms and conditions.')-->
              <!--}]"-->
                <!--&gt;-->
                  <!--{{ $t('I accept ') }}-->
                  <!--<span-->
                      <!--class="link pointer"-->
                      <!--@click.prevent="$bus.$emit('modal-toggle', 'modal-terms')"-->
                  <!--&gt;-->
                <!--{{ $t('Terms and conditions') }}-->
              <!--</span>*-->
                <!--</base-checkbox>-->
              <!--</template>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-show="isActive">
      <div class="col-xs-12">
        <div class="row my30">
          <div class="col-xs-12 px20 button-container">
            <button-full
              class="custom-action-button"
              data-testid="personalDetailsSubmit"
              @click.native="sendDataToCheckout"
              :disabled="createAccount ? $v.$invalid : $v.personalDetails.$invalid"
            >
              {{ $t((isVirtualCart ? 'Далее' : 'Далее')) }}
            </button-full>
          </div>
          <!--<div-->
            <!--class="col-xs-12 col-md-5 center-xs end-md"-->
            <!--v-if="!currentUser"-->
          <!--&gt;-->
            <!--<p class="h4 cl-accent">-->
              <!--{{ $t('or') }}-->
              <!--<span-->
                <!--class="link pointer"-->
                <!--@click.prevent="gotoAccount"-->
              <!--&gt;-->
                <!--{{ $t('login to your account') }}-->
              <!--</span>-->
            <!--</p>-->
          <!--</div>-->
        </div>
      </div>
    </div>
    <!--<div class="row pl20" v-if="!isActive && isFilled">-->
      <!--<div class="hidden-xs col-sm-2 col-md-1" />-->
      <!--<div class="col-xs-12 col-sm-9 col-md-11">-->
        <!--<div class="row fs16 mb35">-->
          <!--<div class="col-xs-12 h4">-->
            <!--<p>-->
              <!--{{ personalDetails.firstName }} {{ personalDetails.lastName }}-->
            <!--</p>-->
            <!--<div>-->
              <!--<span class="pr15">{{ personalDetails.emailAddress }}</span>-->
              <!--<tooltip>{{ $t('We will send you details regarding the order') }}</tooltip>-->
            <!--</div>-->
            <!--<template v-if="createAccount && !currentUser">-->
              <!--<base-checkbox-->
                <!--class="mt25"-->
                <!--id="createAccountCheckboxInfo"-->
                <!--v-model="createAccount"-->
                <!--disabled-->
              <!--&gt;-->
                <!--{{ $t('Create a new account') }}-->
              <!--</base-checkbox>-->
              <!--<p class="h5 cl-tertiary">-->
                <!--{{ $t('The new account will be created with the purchase. You will receive details on e-mail.') }}-->
              <!--</p>-->
            <!--</template>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import { PersonalDetails } from '@vue-storefront/core/modules/checkout/components/PersonalDetails'

import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput'
import ButtonFull from 'theme/components/theme/ButtonFull'
import Tooltip from 'theme/components/core/Tooltip'

const lettersOnly = value => (
  /^[\u0400-\u04FF]+$/.test(value) ||
  /^[a-zA-Z]+$/.test(value) ||
    value === ""
);

export default {
  components: {
    ButtonFull,
    Tooltip,
    BaseCheckbox,
    BaseInput
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
        isPhone: (value) => {
          console.log("value", value);
          return (
            /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value) ||
            /^\+?3?8?(0\d{9})$/.test(value)
          );
        }
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
  }
}
</script>

<style lang="sass">
  .personal-details
    .custom-input
      input
        background: #FFFFFF
        border: 1px solid #E0E0E0
        box-sizing: border-box
        border-radius: 4px
        padding: 16px
      label
        font-family: 'DIN Pro'
        font-size: 13px
        line-height: 16px
        color: #5F5E5E
        opacity: .6
        margin: 5px 0 0 16px;
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
</style>
