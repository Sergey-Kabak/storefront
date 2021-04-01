<template>
  <div class="reset-password">
    <div class="v-container">
      <span class="reset-password-title">{{ $t('Reset password') }}</span>
      <form v-if="!isPasswordChanged">
        <base-input
          type="password"
          name="password"
          ref="password"
          v-model="password"
          :class="{ error: $v.password.$error && $v.password.$dirty }"
          @blur="$v.password.$touch()"
          @input="$v.password.$touch()"
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
        <button-full class="reset-password-button" @click.native="createPassword()">{{ $t('Edit') }}</button-full>
      </form>
      <div class="password-changed" v-else>
        <span class="password-changed-title">{{ $t('Password successfully changed') }}</span>
        <div class="password-changed-actions">
          <button-full @click.native="navigate('/')">На сайт</button-full>
          <button-full @click.native="openLogin()">{{ $t('Log in') }}</button-full>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { localizedRoute } from '@vue-storefront/core/lib/multistore'
import store from '@vue-storefront/core/store';
import BaseInput from 'theme/components/core/blocks/Form/BaseInput.vue';
import {
  minLength,
  required,
  sameAs,
  alphaNum
} from 'vuelidate/lib/validators';
import ButtonFull from 'theme/components/theme/ButtonFull.vue';

export default {
  components: {
    BaseInput,
    ButtonFull
  },
  data: () => ({
    password: null,
    rPassword: null,
    isPasswordChanged: false
  }),
  validations: {
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
  async beforeRouteEnter(to, from, next) {
    const { id: userId, token } = to.query
    const isValid = await store.dispatch('user/validateResetPasswordToken', { userId, token })
    if (isValid) {
      next()
    } else {
      next({ path: localizedRoute('/') })
    }
  },
  methods: {
    async createPassword() {
      if (this.$v.$invalid) {
        this.$v.$touch()
      } else {
        const { email, token: resetToken } = this.$route.query
        const resp = await this.$store.dispatch('user/createPassword', { email, newPassword: this.password, resetToken  })
        if (resp.code === 200) {
          this.isPasswordChanged = true
        }
      }
    },
    navigate(link) {
      this.$router.push(localizedRoute(link))
    },
    openLogin() {
      this.$store.commit('ui/setSignUp', true)
      this.$store.commit('ui/setAuthElem', 'login')
    }
  }
};
</script>

<style lang="scss" scoped>
.v-container {
  width: 90%;
}

.reset-password { 
  padding: 40px 0 68px 0;
}

form {
  max-width: 316px;
  width: 100%;
}

.reset-password-title {
  display: block;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 36px;
  line-height: 46px;
  color: #1A1919;
  margin-bottom: 32px;
}

.base-input {
  max-width: 100%;
  margin-bottom: 20px;

  ::v-deep {
    input {
      height: 40px;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.validations {
  margin-bottom: 32px;
}

.validation-item {
  display: flex;
  align-items: center;
  margin-bottom: 8px;

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

.button-full.reset-password-button {
  max-width: 100%;
}

.password-changed {
  max-width: 360px;
  width: 100%;
}

.password-changed-title {
  display: block;
  margin-bottom: 32px;
  font-weight: 600;
  color: #23BE20;
  font-family: DIN Pro;
  font-size: 15px;
  line-height: 24px;
}

.password-changed-actions {
  display: flex;
  align-items: center;

  .button-full {
    margin-right: 20px;

    &:first-child {
      border: 1px solid #23BE20;
      color: #1A1919;
      background-color: #fff;

      &:hover {
        background: #23BE20;
        color: #fff;
      }
    }

    &:last-child {
      margin-right: 0;
    }
  }
}

@media (max-width: 768px) {
  .reset-password {
    padding: 0 0 16px 0;
  }

  .reset-password-title {
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 24px;
  }

  .validations {
    margin-bottom: 24px;
  }
}

</style>