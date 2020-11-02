<template>
  <div class="login">
    <div class="auth-container">
      <header class="modal-header header-title">
        {{ $t('Log in') }}
        <i
          slot="close"
          class="modal-close material-icons close-icon"
          @click="close"
        >
          close
        </i>
      </header>
      <div v-if="hasRedirect" class="redirect-error">
        <p class="mb0 mt0">
          {{ $t('You need to be logged in to see this page') }}
        </p>
      </div>

      <div class="enter-details-message">
        {{ $t('Log in to your account') }}
      </div>

      <div class="modal-content bg-cl-primary cl-secondary">
        <form @submit.prevent="login" novalidate>
          <base-input
            type="email"
            name="email"
            containerClass="auth-input-container"
            inputClass="auth-input"
            labelClass="auth-label"
            errorClass="auth-error"
            v-model="email"
            @blur="$v.email.$touch()"
            :placeholder="$t('E-mail address *')"
            :validations="[
            {
              condition: !$v.email.required && $v.email.$error,
              text: $t('Field is required.')
            },
            {
              condition: !$v.email.email && $v.email.$error,
              text: $t('Please provide valid e-mail address.')
            }
          ]"
          />
          <base-input
            type="password"
            name="password"
            containerClass="auth-input-container"
            inputClass="auth-input"
            labelClass="auth-label"
            errorClass="auth-error"
            v-model="password"
            @blur="$v.password.$touch()"
            :placeholder="$t('Password *')"
            :validations="[{
            condition: !$v.password.required && $v.password.$error,
            text: $t('Field is required.')
          }]"
          />
          <div class="row mb35">
            <base-checkbox
              class="col-xs-7 col-sm-6 auth-checkbox"
              id="remember"
              v-model="remember"
            >
              {{ $t('Remember me') }}
            </base-checkbox>
            <div class="col-xs-5 col-sm-6 flex end-xs middle-xs">
              <a href="#" @click.prevent="remindPassword" class="auth-forget-pass-link">
                {{ $t('Forgot the password?') }}
              </a>
            </div>
          </div>
          <button-full class="mb20 auth-button" type="submit" data-testid="loginSubmit" :aria-label="$t('Log in')">
            {{ $t('Log in') }}
          </button-full>
          <div class="center-xs register-link">
            {{ $t('or') }}
            <a href="#" @click.prevent="switchElem" data-testid="registerLink">
              {{ $t('register an account') }}
            </a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Login from '@vue-storefront/core/compatibility/components/blocks/Auth/Login';

import ButtonFull from 'theme/components/theme/ButtonFull.vue';
import BaseCheckbox from '../Form/BaseCheckbox.vue';
import BaseInput from '../Form/BaseInput.vue';
import {
  email,
  required
} from 'vuelidate/lib/validators';

export default {
  mixins: [Login],
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  data () {
    return {
      hasRedirect: !!localStorage.getItem('redirect')
    }
  },
  methods: {
    close (e) {
      if (e) localStorage.removeItem('redirect')
      this.$bus.$emit('modal-hide', 'modal-signup')
    },
    login () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: this.$t('Please fix the validation errors'),
          action1: { label: this.$t('OK') }
        })
        return
      }
      this.callLogin()
    },
    remindPassword () {
      if (!(typeof navigator !== 'undefined' && navigator.onLine)) {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: this.$t('Reset password feature does not work while offline!'),
          action1: { label: this.$t('OK') }
        })
      } else {
        this.callForgotPassword()
      }
    },
    onSuccess () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: this.$t('You are logged in!'),
        action1: { label: this.$t('OK') }
      })
    },
    onFailure (result) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'error',
        message: this.$t(result.result),
        action1: { label: this.$t('OK') }
      })
    }
  },
  components: {
    ButtonFull,
    BaseCheckbox,
    BaseInput
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-error: color(error);
$white: color(white);
  .modal-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .modal-close{
    cursor: pointer;
  }
  .modal-content {
    @media (max-width: 400px) {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
  .redirect-error {
    //background-color: $color-error;
    color: $color-error;
    font-family: "DIN Pro";
    font-weight: 0;
    font-size: 15px;
    line-height: 24px;
    margin-bottom: 10px;
  }
</style>
<style lang="scss" scoped>
  .login {
    display: flex;
    flex: 1;
  }
</style>
<style lang="scss">
  .auth-container {
    background: #fff;
    padding: 50px 32px;
    position: relative;
    flex: 1;

    .header-title {
      font-family: "DIN Pro";
      font-style: normal;
      font-weight: 0;
      font-size: 24px;
      line-height: 30px;
      color: #1A1919;
      margin-bottom: 32px;

      .close-icon {
        position: absolute;
        top: 0;
        right: 0;
        padding: 18px;
        background: #F9F9F9;
      }
    }

    .enter-details-message {
      font-family: "DIN Pro";
      font-size: 15px;
      line-height: 24px;
      color: #1A1919;
      margin-bottom: 24px;
    }

    .auth-input-container {
      min-height: 0!important;
      margin-bottom: 20px!important;

      .icon {
        right: 12px;
      }

      input:focus ~ label, input:not(.empty) ~ label {
        top: -8px!important;
      }

      .auth-error {
        font-family: "DIN Pro"!important;
        font-size: 13px!important;
        line-height: 16px!important;
        color: #EE2C39!important;
        margin-top: 4px!important;
      }
    }

    .auth-input {
      background: #FFFFFF!important;
      border: 1px solid #E0E0E0!important;
      border-radius: 4px!important;
      padding: 12px 16px!important;
      font-size: 13px!important;
      line-height: 16px!important;
      font-family: "DIN Pro"!important;
    }
    .auth-label {
      margin-left: 16px!important;
      padding: 0 3px!important;
      background: #fff!important;
      font-size: 13px!important;
      line-height: 16px!important;
      font-family: "DIN Pro"!important;
      top: 13px!important;
    }
    .auth-checkbox {
      label:before {
        border-radius: 4px!important;
        border: 2px solid #E0E0E0;
        top: 0!important;
      }
      input:checked + label:before {
        background-color: #23BE20;
        border: 2px solid #23BE20;
        cursor: pointer;
      }
      input:checked + label:after {
        background-color: #23BE20;
      }
      input {
        max-height: 26px!important;
      }
      label {
        font-family: "DIN Pro";
        font-size: 13px;
        line-height: 16px;
        color: #1A1919;
        margin-left: 15px;
        height: 26px;
        min-height: 26px;
        display: flex;
        align-items: center;
      }
    }
    .auth-forget-pass-link {
      font-family: "DIN Pro";
      font-size: 13px;
      line-height: 16px;
      color: #1A1919;
      border-bottom: 1px dashed #1A1919;
      padding-bottom: 4px;
    }
    .auth-button {
      border-radius: 4px;
      font-family: "DIN Pro";
      font-size: 15px;
      line-height: 16px;
      color: #FFFFFF;
      padding: 12px;
    }
    .register-link {
      font-family: "DIN Pro";
      font-size: 15px;
      line-height: 24px;
      color: #1A1919;
    }
    .auth-validation-description {
      margin: -5px 0 35px 0;
      padding: 0;
      li {
        margin-left: 20px;
        font-family: "DIN Pro";
        font-size: 13px;
        line-height: 16px;
        color: #1A1919;
        margin-bottom: 12px;

        svg {
          margin-left: 7px;
        }
      }
    }
    .auth-terms {
      font-family: "DIN Pro";
      font-size: 13px;
      line-height: 16px;
      color: #595858;
      text-align: center;
      margin-top: -5px;
      margin-bottom: 15px;
      span {
        cursor: pointer;
        color: #23BE20;
      }
    }
  }
</style>
