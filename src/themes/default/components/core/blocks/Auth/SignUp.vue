<template>
  <div class="auth-sidebar">
    <close-sidebar @click.native="closeSignUp()"/>
    <div class="auth" v-if="isShowAuth">
      <div class="auth-header">
        <span class="auth-title">{{ $t('My Account') }}</span>
        <svg class="auth-icon" width="24" height="24" viewBox="0 0 24 24" fill="#23BE20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.579 2 2 6.579 2 12C2 15.189 3.592 18.078 6 19.924V20H6.102C7.77 21.245 9.813 22 12 22C14.187 22 16.23 21.245 17.898 20H18V19.924C20.408 18.078 22 15.19 22 12C22 6.579 17.421 2 12 2ZM8.074 18.927C8.22136 18.2604 8.59154 17.6639 9.12347 17.236C9.6554 16.808 10.3173 16.5742 11 16.573H13C13.6827 16.5744 14.3445 16.8083 14.8764 17.2362C15.4082 17.6641 15.7785 18.2605 15.926 18.927C14.758 19.604 13.416 20 12 20C10.584 20 9.242 19.604 8.074 18.927ZM17.61 17.641C17.2286 16.7329 16.5877 15.9574 15.7677 15.4117C14.9477 14.866 13.985 14.5742 13 14.573H11C10.015 14.5742 9.05227 14.866 8.23227 15.4117C7.41227 15.9574 6.77144 16.7329 6.39 17.641C4.923 16.182 4 14.176 4 12C4 7.663 7.663 4 12 4C16.337 4 20 7.663 20 12C20 14.176 19.077 16.182 17.61 17.641Z" />
          <path d="M12 6C9.72 6 8 7.72 8 10C8 12.28 9.72 14 12 14C14.28 14 16 12.28 16 10C16 7.72 14.28 6 12 6ZM12 12C10.822 12 10 11.178 10 10C10 8.822 10.822 8 12 8C13.178 8 14 8.822 14 10C14 11.178 13.178 12 12 12Z" />
        </svg>
      </div>
      <div class="auth-navigation">
        <div @click="setAuthElem('login')" :class="{'active': authElem === 'login'}" class="navigation-login navigation-item">
          <span> {{ $t('Sign in') }} </span>
        </div>
        <div @click="setAuthElem('register')" class="navigation-register navigation-item" :class="{'active': authElem === 'register'}">
          <span> {{ $t('Sign up') }} </span>
        </div>
      </div>
      <div class="auth-body">
        <login v-if="authElem === 'login'" />
        <register v-if="authElem === 'register'" />
      </div>
    </div>
    <forgot-pass v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Login from 'theme/components/core/blocks/Auth/Login';
import Register from 'theme/components/core/blocks/Auth/Register';
import ForgotPass from 'theme/components/core/blocks/Auth/ForgotPass';
import CloseSidebar from 'theme/components/core/CloseSidebar';

export default {
  name: 'SignUp',
  computed: {
    ...mapState({
      authElem: state => state.ui.authElem
    }),
    isShowAuth() {
      return ['login', 'register'].includes(this.authElem)
    }
  },
  methods: {
    closeSignUp() {
      this.$store.commit('ui/setSignUp', false)
    },
    setAuthElem(authElem) {
      this.$store.commit('ui/setAuthElem', authElem)
    }
  },
  components: {
    Login,
    Register,
    ForgotPass,
    CloseSidebar
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.auth {
  padding: 0 32px;
}

.auth-header {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
}

.auth-title {
  margin-right: 16px;
  font-family: DIN Pro;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #1A1919;
}

.auth-navigation {
  display: flex;
  align-items: center;
  background-color: #F2F2F2;
  border-radius: 4px;
  margin-bottom: 24px;
}

.navigation-item {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #F2F2F2;
  height: 32px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: .2s ease-in-out;

  &.active {
    background-color: #FFFFFF;
    border-color: #23BE20;
  }
  
  span {
    font-family: DIN Pro;
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    color: #000000;
  }
}

@media (max-width: 768px) {
  .auth {
    padding: 0 16px;
  }

  .auth-header {
    margin-bottom: 20px;
  }
}
</style>
