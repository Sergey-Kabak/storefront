<template>
  <div class="register">
    <div class="register-details">
      <span>{{ $t('Please, enter your account details') }}</span>
    </div>
    <form @submit.prevent="register" novalidate class="register">
      <base-input
        type="text"
        name="first-name"
        v-model="firstName"
        :class="{ error: $v.firstName.$error && $v.firstName.$dirty }"
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
            condition: !$v.firstName.lettersOnly && $v.firstName.$error,
            text: $t('Accepts only alphabet characters.')
          }
        ]"
      />
      <base-input
        type="text"
        name="last-name"
        v-model="lastName"
        :class="{ error: $v.lastName.$error && $v.lastName.$dirty }"
        @blur="$v.lastName.$touch()"
        :placeholder="$t('Last name *')"
        :validations="[
          {
            condition: !$v.lastName.required && $v.lastName.$error,
            text: $t('Field is required.')
          },
          {
            condition: !$v.lastName.minLength,
            text: $t('Name must have at least 2 letters.')
          },
          {
            condition: !$v.lastName.lettersOnly && $v.lastName.$error,
            text: $t('Accepts only alphabet characters.')
          }
        ]"
      />
      <base-input
        type="email"
        name="email"
        v-model="email"
        :class="{ error: $v.email.$error && $v.email.$dirty }"
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
        type="tel"
        name="phone-number"
        v-mask="'+38(###)###-##-##'"
        :placeholder="$t('Phone Number') + ' *'"
        v-model.trim="telephone"
        autocomplete="tel"
        @blur="$v.telephone.$touch()"
        :class="{ error: $v.telephone.$error && $v.telephone.$dirty }"
        :validations="[{
          condition: !$v.telephone.required && $v.telephone.$error,
          text: $t('Field is required.')
        }, {
          condition: !$v.telephone.isPhone && $v.telephone.$error,
          text: $t('Please provide valid phone number')
        }]"
      />
      <base-input
        type="password"
        name="password"
        ref="password"
        v-model="password"
        :class="{ error: $v.password.$error && $v.password.$dirty }"
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
        class="repeat-password"
        v-model="rPassword"
        :class="{ error: $v.rPassword.$error && $v.rPassword.$dirty }"
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
      <div class="validations">
        <div class="validation-item">
          <div class="ellipsis" />
          <span class="validation-text">{{ $t("8 and more symbols") }}</span>
          <svg v-if="$v.password.$dirty && $v.password.minLength && !$v.password.$error" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.00091 10.8001L3.20091 8.00006L2.26758 8.9334L6.00091 12.6667L14.0009 4.66673L13.0676 3.7334L6.00091 10.8001Z" fill="#23BE20"/>
          </svg>
          <svg v-if="$v.password.$dirty && !$v.password.minLength && $v.password.$error" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6673 4.2735L11.7273 3.3335L8.00065 7.06016L4.27398 3.3335L3.33398 4.2735L7.06065 8.00016L3.33398 11.7268L4.27398 12.6668L8.00065 8.94016L11.7273 12.6668L12.6673 11.7268L8.94065 8.00016L12.6673 4.2735Z" fill="#EE2C39"/>
          </svg>
        </div>
        <div class="validation-item">
          <div class="ellipsis" />
          <span class="validation-text">{{ $t("Latin letters and numbers") }}</span>
          <svg v-if="$v.password.$dirty && $v.password.alphaNum && password !== ''" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.00091 10.8001L3.20091 8.00006L2.26758 8.9334L6.00091 12.6667L14.0009 4.66673L13.0676 3.7334L6.00091 10.8001Z" fill="#23BE20"/>
          </svg>
          <svg v-if="$v.password.$dirty && !$v.password.alphaNum" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6673 4.2735L11.7273 3.3335L8.00065 7.06016L4.27398 3.3335L3.33398 4.2735L7.06065 8.00016L3.33398 11.7268L4.27398 12.6668L8.00065 8.94016L11.7273 12.6668L12.6673 11.7268L8.94065 8.00016L12.6673 4.2735Z" fill="#EE2C39"/>
          </svg>
        </div>
      </div>

      <button-full class="register-button" type="submit">
        {{ $t('Registrate') }}
      </button-full>
      <div class="register-terms">
        {{ $t('Registering, you are accepting') }}
        <a class="register-terms--highlight" @click="navigate('/info/umovi-vikoristannja-sajtu')">
          {{ $t('users accepting') }}
        </a>
      </div>
    </form>
  </div>
</template>
<script>
import Register from '@vue-storefront/core/compatibility/components/blocks/Auth/Register';
import ButtonFull from 'theme/components/theme/ButtonFull.vue';
import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox.vue';
import BaseInput from 'theme/components/core/blocks/Form/BaseInput.vue';
import {
  email,
  minLength,
  required,
  sameAs,
  alphaNum
} from 'vuelidate/lib/validators';
import { mask } from 'vue-the-mask'

const lettersOnly = value => (/^[А-Яа-яЁёЇїІіЄєҐґ]?[А-Яа-яЁёЇїІіЄєҐґ\'\-]+[А-Яа-яЁёЇїІіЄєҐґ]+$/.test(value));
const isPhone = value => value ? /\+38\(\d{3}\)\d{3}\-\d{2}\-\d{2}$/.test(value) : !value

export default {
  validations: {
    email: {
      required,
      email
    },
    firstName: {
      minLength: minLength(2),
      required,
      lettersOnly
    },
    lastName: {
      minLength: minLength(2),
      required,
      lettersOnly
    },
    telephone: {
      isPhone,
      required
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
  directives: { mask },
  components: {
    ButtonFull,
    BaseCheckbox,
    BaseInput
  },
  computed: {
    hasLatinNumbersAndMethods() {
      return [/[0-9]/, /[a-zA-Z]/].every(reg => reg.test(this.password))
    }
  },
  methods: {
    close (e) {
      this.$store.commit('ui/setSignUp', false)
    },
    navigate(link) {
      this.close()
      this.$router.push(this.localizedRoute(link))
    },
    register () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.$v.$touch()
      } else {
        this.callRegister()
      }
    },
    onSuccess () {
      this.$router.push(this.localizedRoute('/account/personal-data'))
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
.register {
  .base-input {
    max-width: 100%;
    margin-bottom: 20px;

    &.repeat-password {
      margin-bottom: 16px;
    }

    ::v-deep {
      input {
        height: 40px;
      }
    }
  }
}

.register-details {
  margin-bottom: 24px;

  span {
    font-family: DIN Pro;
    font-size: 15px;
    line-height: 24px;
    color: #1A1919;
  }
}

.validations {
  margin-bottom: 32px;
}

.validation-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
}

.validation-text {
  margin-right: 4px;
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #1A1919;
}

.register-button {
  max-width: 100%;
  margin-bottom: 16px;
}

.register-terms {
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #5F5E5E;

  &--highlight {
    border-bottom: 1px solid #1A1919;
    cursor: pointer;
  }
}

@media (max-width: 768px) {
  .register-details {
    margin-bottom: 16px;
  }

  .register {
    .base-input {
      margin-bottom: 16px;

      &.repeat-password {
        margin-bottom: 12px;
      }
    }
  }

  .validations {
    margin-bottom: 24px;
  }
}
</style>
