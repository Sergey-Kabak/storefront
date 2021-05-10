<template>
  <div class="register">
    <div class="register-details">
      <span>{{ $t('Please, enter your account details') }}</span>
    </div>
    <form @submit.prevent="onRegister" novalidate class="register">
      <base-input
        type="text"
        name="first-name"
        :value="register['firstName']"
        @input="onRegisterDataChange('firstName', $event)"
        :class="{ error: $v.register.firstName.$error && $v.register.firstName.$dirty }"
        @blur="$v.register.firstName.$touch()"
        :placeholder="$t('First name *')"
        :validations="[
          {
            condition: !$v.register.firstName.required && $v.register.firstName.$error,
            text: $t('Field is required.')
          },
          {
            condition: !$v.register.firstName.minLength,
            text: $t('Name must have at least 2 letters.')
          },
          {
            condition: !$v.register.firstName.lettersOnly && $v.register.firstName.$error,
            text: $t('Accepts only alphabet characters.')
          }
        ]"
      />
      <base-input
        type="text"
        name="last-name"
        :value="register['lastName']"
        @input="onRegisterDataChange('lastName', $event)"
        :class="{ error: $v.register.lastName.$error && $v.register.lastName.$dirty }"
        @blur="$v.register.lastName.$touch()"
        :placeholder="$t('Last name *')"
        :validations="[
          {
            condition: !$v.register.lastName.required && $v.register.lastName.$error,
            text: $t('Field is required.')
          },
          {
            condition: !$v.register.lastName.minLength,
            text: $t('Name must have at least 2 letters.')
          },
          {
            condition: !$v.register.lastName.lettersOnly && $v.register.lastName.$error,
            text: $t('Accepts only alphabet characters.')
          }
        ]"
      />
      <base-input
        type="email"
        name="email"
        :value="register['email']"
        @input="onRegisterDataChange('email', $event)"
        :class="{ error: $v.register.email.$error && $v.register.email.$dirty }"
        @blur="$v.register.email.$touch()"
        :placeholder="$t('E-mail address *')"
        :validations="[
          {
            condition: !$v.register.email.required && $v.register.email.$error,
            text: $t('Field is required.')
          },
          {
            condition: !$v.register.email.email && $v.register.email.$error,
            text: $t('Please provide valid e-mail address.')
          }
        ]"
      />
      <base-input
        type="tel"
        name="phone-number"
        v-mask="'+38(###)###-##-##'"
        :placeholder="$t('Phone Number') + ' *'"
        :value="register['telephone']"
        @input="onRegisterDataChange('telephone', $event)"
        autocomplete="tel"
        @blur="$v.register.telephone.$touch()"
        :class="{ error: $v.register.telephone.$error && $v.register.telephone.$dirty }"
        :validations="[{
          condition: !$v.register.telephone.required && $v.register.telephone.$error,
          text: $t('Field is required.')
        }, {
          condition: !$v.register.telephone.isPhone && $v.register.telephone.$error,
          text: $t('Please provide valid phone number')
        }]"
      />
      <base-input
        type="password"
        name="password"
        ref="password"
        :value="register['password']"
        @input="onRegisterDataChange('password', $event)"
        :class="{ error: $v.register.password.$error && $v.register.password.$dirty }"
        @blur="$v.register.password.$touch()"
        :placeholder="$t('Password *')"
        :validations="[
          {
            condition: !$v.register.password.required && $v.register.password.$error,
            text: $t('Field is required.')
          },
          {
            condition: !$v.register.password.minLength && $v.register.password.$error,
            text: $t('Password must have at least 8 letters.')
          }
        ]"
      />
      <base-input
        type="password"
        name="password-confirm"
        class="repeat-password"
        :value="register['rPassword']"
        @input="onRegisterDataChange('rPassword', $event)"
        :class="{ error: $v.register.rPassword.$error && $v.register.rPassword.$dirty }"
        @blur="$v.register.rPassword.$touch()"
        :placeholder="$t('Repeat password *')"
        :validations="[
          {
            condition: !$v.register.rPassword.required && $v.register.rPassword.$error,
            text: $t('Field is required.')
          },
          {
            condition: !$v.register.rPassword.sameAsPassword && $v.register.rPassword.$error,
            text: $t('Passwords must be identical.')
          }
        ]"
      />
      <div class="validations">
        <div class="validation-item">
          <div class="ellipsis" />
          <span class="validation-text">{{ $t("8 and more symbols") }}</span>
          <svg v-if="$v.register.password.$dirty && $v.register.password.minLength && !$v.register.password.$error" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.00091 10.8001L3.20091 8.00006L2.26758 8.9334L6.00091 12.6667L14.0009 4.66673L13.0676 3.7334L6.00091 10.8001Z" fill="#23BE20"/>
          </svg>
          <svg v-if="$v.register.password.$dirty && !$v.register.password.minLength && $v.register.password.$error" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6673 4.2735L11.7273 3.3335L8.00065 7.06016L4.27398 3.3335L3.33398 4.2735L7.06065 8.00016L3.33398 11.7268L4.27398 12.6668L8.00065 8.94016L11.7273 12.6668L12.6673 11.7268L8.94065 8.00016L12.6673 4.2735Z" fill="#EE2C39"/>
          </svg>
        </div>
        <div class="validation-item">
          <div class="ellipsis" />
          <span class="validation-text">{{ $t("Latin letters and numbers") }}</span>
          <svg v-if="$v.register.password.$dirty && $v.register.password.alphaNum && register.password !== ''" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.00091 10.8001L3.20091 8.00006L2.26758 8.9334L6.00091 12.6667L14.0009 4.66673L13.0676 3.7334L6.00091 10.8001Z" fill="#23BE20"/>
          </svg>
          <svg v-if="$v.register.password.$dirty && !$v.register.password.alphaNum" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
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
import { mapState } from 'vuex';
import * as types from '@vue-storefront/core/modules/user/store/mutation-types';

const lettersOnly = value => (/^[А-Яа-яЁёЇїІіЄєҐґ]?[А-Яа-яЁёЇїІіЄєҐґ\'\-]+[А-Яа-яЁёЇїІіЄєҐґ]+$/.test(value));
const isPhone = value => value ? /\+38\(\d{3}\)\d{3}\-\d{2}\-\d{2}$/.test(value) : !value

export default {
  validations: {
    register: {
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
      }
    }
  },
  mixins: [Register],
  directives: { mask },
  components: {
    ButtonFull,
    BaseCheckbox,
    BaseInput
  },
  computed: {
    ...mapState({
      register: (state) => state.user.register
    }),
    hasLatinNumbersAndMethods() {
      return [/[0-9]/, /[a-zA-Z]/].every(reg => reg.test(this.password))
    }
  },
  methods: {
    onRegisterDataChange(key, value) {
      this.$store.commit('user/' + types.USER_REGISTER, { key, value })
    },
    close (e) {
      this.$store.commit('ui/setSignUp', false)
    },
    navigate(link) {
      this.close()
      this.$router.push(this.localizedRoute(link))
    },
    onRegister () {
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
