<template>
  <div class="logout">
    <div class="logout-left">
      <icon-base class="logout-icon">
        <exit-icon />
      </icon-base>
      <span class="logout-text" @click="logout()">{{ $t('Logout') }}</span>
    </div>
    <div class="logout-right">
      <span class="delete-account" @click="deleteUser()">{{ $t('remove account') }}</span>
    </div>
  </div>
</template>

<script>

import IconBase from 'theme/components/theme/IconBase';
import { ExitIcon } from 'theme/assets/account/index';

export default {
  components: {
    ExitIcon,
    IconBase
  },
  methods: {
    logout() {
      this.$bus.$emit('user-before-logout')
      this.$router.push(this.localizedRoute('/'))
    },
    deleteUser () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'warning',
        message: this.$t('Are you sure you want to delete account?'),
        action1: { label: this.$t('OK'),
          action: () => {
            this.$router.push(this.localizedRoute('/'))
            this.$store.dispatch('user/deleteUser')
          }
        },
        action2: { label: this.$t('Cancel'), action: 'close' },
        hasNoTimeout: true
      })
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

.logout {
  padding: 16px;
}

.logout,
.logout-left {
  display: flex;
  align-items: center;
}

.logout-left {
  cursor: pointer;
}

.logout-right {
  margin-left: auto;
}

.logout-icon {
  margin-right: 16px;
}

.logout-text {
  font-family: DIN Pro;
  font-size: 14px;
  line-height: 24px;
  color: #1A1919;
}

.delete-account {
  cursor: pointer;
  font-family: DIN Pro;
  font-size: 14px;
  line-height: 24px;
  color: #EE2C39;
}

</style>