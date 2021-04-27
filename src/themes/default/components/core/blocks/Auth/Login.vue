<template>
  <div class="login">
    <div class="login-details">
      <span>{{ $t('Please, enter your account details') }}</span>
    </div>
    <form @submit.prevent="login" novalidate class="login-form">
      <base-input
        type="email"
        name="email"
        class="email"
        :class="{ error: $v.email.$error && $v.email.$dirty }"
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
        class="password"
        :class="{ error: $v.password.$error && $v.password.$dirty }"
        v-model="password"
        @blur="$v.password.$touch()"
        :placeholder="$t('Password *')"
        :validations="[{
          condition: !$v.password.required && $v.password.$error,
          text: $t('Field is required.')
        }]"
      />
      <div class="login-additional">
        <base-checkbox
          class="login-checkbox"
          v-model="remember"
        >
          {{ $t('Remember me') }}
        </base-checkbox>
        <button-text @click.native="remindPassword" class="login-forget">{{ $t('Restore password') }}</button-text>
      </div>
      <button-full class="login-button" type="submit">
        {{ $t('Log in') }}
      </button-full>
    </form>
  </div>
</template>

<script>
import Login from '@vue-storefront/core/compatibility/components/blocks/Auth/Login';
import ButtonFull from 'theme/components/theme/ButtonFull.vue';
import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox.vue';
import BaseInput from 'theme/components/core/blocks/Form/BaseInput';
import ButtonText from 'theme/components/theme/ButtonText'

import {
  email,
  required
} from 'vuelidate/lib/validators';

export default {
  components: {
    ButtonFull,
    BaseCheckbox,
    BaseInput,
    ButtonText
  },
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
  methods: {
    close (e) {
      this.$store.commit('ui/setSignUp', false)
    },
    login () {
      if (this.$v.$invalid) {
        this.$v.$touch()
      } else {
        this.callLogin()
      }
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
    }
  }
}
</script>

<style lang="scss" scoped>
.login-details {
  margin-bottom: 24px;

  span {
    font-family: DIN Pro;
    font-size: 15px;
    line-height: 24px;
    color: #1A1919;
  }
}

.login-additional {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 32px;
}

.login-form {
  .base-input {
    max-width: 100%;
    margin-bottom: 20px;

    &.password {
      margin-bottom: 16px;
    }

    ::v-deep {
      input {
        height: 40px;
      }
    }
  }
}

.login-checkbox ::v-deep {
  .checkbox-selector {
    font-family: DIN Pro;
    margin-bottom: 0;
    font-size: 13px;
    line-height: 16px;
    color: #1A1919;
  }

  .checkbox {
    margin-right: 16px;
  }
}

.login-button {
  max-width: 100%;
}

.button-text.login-forget {
  &::v-deep {
    span {
      padding-bottom: 2px;
    }
  }
}

@media (max-width: 768px) {
  .auth {
    padding: 0 16px;
  }

  .login-form {
    .base-input {
      margin-bottom: 16px;
    }
  }
  
  .login-details {
    margin-bottom: 16px;
  }

  .login-additional {
    margin-bottom: 24px;
  }
}
</style>
