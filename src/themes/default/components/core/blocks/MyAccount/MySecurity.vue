<template>
  <div class="security">
    <h2 class="account-page-title">{{ $t($route.name) }}</h2>
    <div class="personal-data profile-item">
      <account-header
        :icon="LockIcon"
        :isEdited.sync="isEdited"
        :title="$t('your password')"
      />
      <div class="profile-data" v-if="isEdited">
        <div class="profile-data-item">
          <span class="profile-item-name">{{ $t('password change') }}</span>
          <div class="profile-item-data">
            <base-input
              type="password"
              v-model="user.password"
              :placeholder="$t('current password')"
              class="profile-input"
              :class="{ error: $v.user.password.$error && $v.user.password.$dirty }"
              @blur="$v.user.password.$touch()"
              :validations="[{
                condition: !$v.user.password.required && $v.user.password.$error,
                text: $t('Field is required.')
              }]"
            />
            <base-input
              type="password"
              v-model="user.newPassword"
              :placeholder="$t('new password')"
              class="profile-input"
              :class="{ error: $v.user.newPassword.$error && $v.user.newPassword.$dirty }"
              @blur="$v.user.newPassword.$touch()"
              :validations="[{
                condition: !$v.user.newPassword.required && $v.user.newPassword.$error,
                text: $t('Field is required.')
              }, {
                condition: !$v.user.newPassword.minLength && $v.user.newPassword.$error,
                text: $t('Password must have at least 8 letters.')
              }]"
            />
            <base-input
              type="password"
              v-model="user.rePassword"
              :placeholder="$t('repeat new password')"
              class="profile-input"
              :class="{ error: $v.user.rePassword.$error && $v.user.rePassword.$dirty }"
              @blur="$v.user.rePassword.$touch()"
              :validations="[{
                condition: !$v.user.rePassword.required && $v.user.rePassword.$error,
                text: $t('Field is required.')
              }, {
                condition: !$v.user.rePassword.sameAsPassword && $v.user.rePassword.$error,
                text: $t('Passwords must be identical.')
              }]"
            />
          </div>
        </div>
        <div class="profile-data-actions">
          <span class="profile-item-name"></span>
          <button-full @click.native="updatePassword()">{{ $t('save') }}</button-full>
          <button-text @click.native="changeEdit()">{{ $t('Cancel') }}</button-text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { LockIcon } from 'theme/assets/account/index';
import IconBase from 'theme/components/theme/IconBase';
import AccountHeader from 'theme/components/core/blocks/MyAccount/AccountHeader'  
import { mapState } from 'vuex';
import BaseInput from 'theme/components/core/blocks/Form/BaseInput';
import cloneDeep from 'lodash-es/cloneDeep'
import ButtonFull from 'theme/components/theme/ButtonFull.vue';
import ButtonText from 'theme/components/theme/ButtonText'
import { required, sameAs, minLength } from 'vuelidate/lib/validators'

export default {
  components: {
    IconBase,
    AccountHeader,
    BaseInput,
    ButtonFull,
    ButtonText
  },
  data: () => ({
    LockIcon,
    isEdited: false,
    user: {
      password: null,
      newPassword: null,
      rePassword: null
    }
  }),
  validations: {
    user: {
      password: {
        required
      },
      newPassword: {
        required,
        minLength: minLength(6),
      },
      rePassword: {
        required,
        sameAsPassword: sameAs('newPassword')
      }
    }
  },
  mounted: function() {
    this.copyUser()
  },
  computed: {
    ...mapState({
      userData: (state) => state.user.current
    })
  },
  methods: {
    copyUser() {this.user = cloneDeep(this.userData)
      this.user = cloneDeep(this.userData)
    },
    changeEdit() {
      this.isEdited = !this.isEdited
      this.resetData()
    },
    updatePassword() {
      if (this.$v.user.$invalid) {
        this.$v.$touch()
      } else {
        this.$store.dispatch('user/changePassword', {
          currentPassword: this.user.password,
          newPassword: this.user.newPassword
        })
        this.resetData()
      }
    },
    resetData() {
      this.user = {
        password: null,
        newPassword: null,
        rePassword: null
      }
      this.$v.user.$reset()
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-item-data {
  max-width: 316px;
}

.profile-input {
  max-width: 100%;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
}

@media (max-width: 1000px) {
  .profile-data-item {
    flex-direction: column;
  }

  .profile-item-data {
    max-width: 100%;
  }

  .profile-item-name {
    margin-bottom: 16px;
  }
}
</style>