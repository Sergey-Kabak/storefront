<template>
  <div class="forgot-pass">
    <span class="forgot-pass-title">
      {{ $t('Reset password') }}
    </span>
    <form @submit.prevent="sendEmail" novalidate v-if="!passwordSent">
      <p class="forgot-pass-details">{{ $t('reset password description') }}</p>
      <base-input
        type="email"
        name="email"
        v-model="email"
        :class="{ error: $v.email.$error && $v.email.$dirty }"
        :placeholder="$t('E-mail address *')"
        @blur="$v.email.$touch()"
        :validations="[{
          condition: !$v.email.required && $v.email.$error,
          text: $t('Field is required.')
        }, {
          condition: !$v.email.email && $v.email.$error,
          text: $t('Please provide valid e-mail address.')
        }]"
      />
      <button-full class="forgot-pass-button" type="submit">
        {{ $t('Reset password') }}
      </button-full>
      <button-text @click.native="switchElem()" class="forgot-pass-back">{{ $t('Back') }}</button-text>
    </form>
    <template v-else>
      <form>
        <p class="forgot-pass-instruction">{{ $t("We've sent password reset instructions to your email. Check your inbox and follow the link.") }}</p>
      </form>
    </template>
  </div>
</template>

<script>

import ButtonFull from 'theme/components/theme/ButtonFull.vue';
import BaseInput from '../Form/BaseInput.vue';
import {
  email,
  required
} from 'vuelidate/lib/validators';
import i18n from '@vue-storefront/i18n';
import ButtonText from 'theme/components/theme/ButtonText'

export default {
  name: 'ForgotPass',
  components: {
    ButtonFull,
    BaseInput,
    ButtonText
  },
  data () {
    return {
      email: '',
      passwordSent: false
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  methods: {
    close () {
      this.$bus.$emit('modal-hide', 'modal-signup')
    },
    sendEmail () {
      // todo: send email with reset password instructions

      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: i18n.t('Please fix the validation errors'),
          action1: { label: i18n.t('OK') }
        })
        return
      }

      this.$bus.$emit('notification-progress-start', i18n.t('Resetting the password ... '))
      this.$store.dispatch('user/resetPassword', { email: this.email }).then((response) => {
        this.$bus.$emit('notification-progress-stop')
        if (response.code === 200) {
          this.passwordSent = true
        } else {
          this.$store.dispatch('notification/spawnNotification', {
            type: 'error',
            message: i18n.t(response.result) || i18n.t('Error while sending reset password e-mail'),
            action1: { label: i18n.t('OK'), action: 'close' }
          })
        }
      }).catch((err) => {
        console.error(err)
        this.$bus.$emit('notification-progress-stop')
      })
    },
    switchElem () {
      this.$store.commit('ui/setAuthElem', 'login')
    }
  }
}
</script>

<style lang="scss" scoped>
.forgot-pass {
  padding: 0 32px;
}

.base-input {
  max-width: 100%;
  margin-bottom: 32px;

  ::v-deep {
    input {
      height: 40px;
    }
  }
}

.forgot-pass-title {
  display: block;
  margin-bottom: 32px;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #1A1919;
}

.forgot-pass-details {
  font-family: DIN Pro;
  font-size: 15px;
  line-height: 24px;
  color: #1A1919;
  margin: 0 0 24px 0;
}

.forgot-pass-button {
  max-width: 100%;
  margin-bottom: 24px;
}

.button-text {
  justify-content: center;
  font-weight: 600;
}

.forgot-pass-instruction {
  font-family: DIN Pro;
  font-size: 15px;
  line-height: 24px;
  color: #1A1919;
  margin: 0;
}

@media (max-width: 768px) {
  .forgot-pass-title {
    margin-bottom: 25px;
  }
  .forgot-pass {
    padding: 0 16px;
  }

  .base-input {
    margin-bottom: 24px;
  }

  .forgot-pass-details {
    margin-bottom: 16px;
  }
}
</style>
