<template>
  <div class="auth-container">
    <header class="modal-header header-title">
      {{ $t('Register') }}
      <i
        slot="close"
        class="modal-close material-icons close-icon"
        @click="close"
      >
        close
      </i>
    </header>

    <div class="enter-details-message">
      {{ $t('Please, enter all fields to create an account') }}
    </div>

    <div class="modal-content bg-cl-primary cl-secondary">
      <form @submit.prevent="register" novalidate>
        <base-input
          type="email"
          name="email"
          containerClass="auth-input-container"
          inputClass="auth-input"
          labelClass="auth-label"
          errorClass="auth-error"
          autocomplete="email"
          v-model="email"
          @blur="$v.email.$touch()"
          focus
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
          type="text"
          name="first-name"
          autocomplete="given-name"
          containerClass="auth-input-container"
          inputClass="auth-input"
          labelClass="auth-label"
          errorClass="auth-error"
          v-model="firstName"
          @blur="$v.firstName.$touch()"
          :placeholder="$t('First name *')"
          :validations="[
            {
              condition: !$v.firstName.required && $v.firstName.$error,
              text: $t('Field is required.')
            },
            {
              condition: !$v.firstName.minLength,
              text: $t('Name must have at least 2 letters.')
            },
            {
              condition: !$v.firstName.alp && $v.firstName.$error,
              text: $t('Accepts only alphabet characters.')
            }
          ]"
        />
        <base-input
          type="text"
          name="last-name"
          autocomplete="last-name"
          containerClass="auth-input-container"
          inputClass="auth-input"
          labelClass="auth-label"
          errorClass="auth-error"
          v-model="lastName"
          @blur="$v.lastName.$touch()"
          :placeholder="$t('Last name *')"
          :validations="[
            {
              condition: !$v.lastName.required && $v.lastName.$error,
              text: $t('Field is required.')
            },
            {
              condition: !$v.firstName.minLength,
              text: $t('Name must have at least 2 letters.')
            },
            {
              condition: !$v.lastName.alpha && $v.lastName.$error,
              text: $t('Accepts only alphabet characters.')
            }
          ]"
        />
        <base-input
          type="password"
          name="password"
          ref="password"
          autocomplete="new-password"
          containerClass="auth-input-container"
          inputClass="auth-input"
          labelClass="auth-label"
          errorClass="auth-error"
          v-model="password"
          @blur="$v.password.$touch()"
          :placeholder="$t('Password *')"
          :validations="[
            {
              condition: !$v.password.required && $v.password.$error,
              text: $t('Field is required.')
            },
            {
              condition: !$v.password.minLength && $v.password.$error,
              text: $t('Password must have at least 8 letters.')
            }
          ]"
        />
        <base-input
          type="password"
          name="password-confirm"
          autocomplete="new-password"
          containerClass="auth-input-container"
          inputClass="auth-input"
          labelClass="auth-label"
          errorClass="auth-error"
          v-model="rPassword"
          @blur="$v.rPassword.$touch()"
          :placeholder="$t('Repeat password *')"
          :validations="[
            {
              condition: !$v.rPassword.required && $v.rPassword.$error,
              text: $t('Field is required.')
            },
            {
              condition: !$v.rPassword.sameAsPassword && $v.rPassword.$error,
              text: $t('Passwords must be identical.')
            }
          ]"
        />
        <ul class="auth-validation-description">
          <li>
            {{ $t("8 and more symbols") }}
            <svg v-if="$v.password.$dirty && $v.password.minLength && !$v.password.$error" width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.00091 7.80007L1.20091 5.00006L0.267578 5.9334L4.00091 9.66673L12.0009 1.66673L11.0676 0.733398L4.00091 7.80007Z" fill="#23BE20"/>
            </svg>
            <svg v-if="$v.password.$dirty && !$v.password.minLength && $v.password.$error" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.66732 1.2735L8.72732 0.333496L5.00065 4.06016L1.27398 0.333496L0.333984 1.2735L4.06065 5.00016L0.333984 8.72683L1.27398 9.66683L5.00065 5.94016L8.72732 9.66683L9.66732 8.72683L5.94065 5.00016L9.66732 1.2735Z" fill="#EE2C39"/>
            </svg>
          </li>
          <li>
            {{ $t("Latin letters and numbers") }}
            <svg v-if="$v.password.$dirty && $v.password.alphaNum && password !== ''" width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.00091 7.80007L1.20091 5.00006L0.267578 5.9334L4.00091 9.66673L12.0009 1.66673L11.0676 0.733398L4.00091 7.80007Z" fill="#23BE20"/>
            </svg>
            <svg v-if="$v.password.$dirty && !$v.password.alphaNum" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.66732 1.2735L8.72732 0.333496L5.00065 4.06016L1.27398 0.333496L0.333984 1.2735L4.06065 5.00016L0.333984 8.72683L1.27398 9.66683L5.00065 5.94016L8.72732 9.66683L9.66732 8.72683L5.94065 5.00016L9.66732 1.2735Z" fill="#EE2C39"/>
            </svg>
          </li>
        </ul>

        <button-full :disabled="$v.$invalid" class="mb20 auth-button" type="submit">
          {{ $t('Registrate') }}
        </button-full>
        <div class="auth-terms">
          {{ $t('Registering, you are accepting') }}
          <span
            class="link pointer"
            @click.prevent="openTermsModal()"
          >
            {{ $t('users accepting') }}
          </span>
        </div>
        <div class="center-xs register-link">
          <span>
            {{ $t('or') }}
            <a href="#" @click.prevent="switchElem">
              {{ $t('login to your account') }}
            </a>
          </span>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Register from '@vue-storefront/core/compatibility/components/blocks/Auth/Register'
import ButtonFull from 'theme/components/theme/ButtonFull.vue'
import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox.vue'
import BaseInput from 'theme/components/core/blocks/Form/BaseInput.vue'
import { required, email, minLength, sameAs, alphaNum } from 'vuelidate/lib/validators'

const lettersOnly = value => (
  /^[\u0400-\u04FF]+$/.test(value) ||
  /^[a-zA-Z]+$/.test(value) ||
    value === ""
);

export default {
  validations: {
    email: {
      required,
      email
    },
    firstName: {
      minLength: minLength(2),
      required,
      alpha: lettersOnly
    },
    lastName: {
      minLength: minLength(2),
      required,
      alpha: lettersOnly
    },
    password: {
      minLength: minLength(8),
      required,
      alphaNum
    },
    rPassword: {
      required,
      sameAsPassword: sameAs('password'),
      alphaNum
    },
  },
  mixins: [Register],
  components: {
    ButtonFull,
    BaseCheckbox,
    BaseInput
  },
  methods: {
    register () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: this.$t('Please fix the validation errors'),
          action1: { label: this.$t('OK') }
        })
        return
      }
      this.callRegister()
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
    },
    openTermsModal () {
      this.$bus.$emit('modal-toggle', 'modal-terms')
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
