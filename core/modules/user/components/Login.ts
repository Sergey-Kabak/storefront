import i18n from '@vue-storefront/i18n'
import {Logger} from '@vue-storefront/core/lib/logger'

export const Login = {
  name: 'Login',
  methods: {
    callLogin () {
      this.$bus.$emit('notification-progress-start', i18n.t('Authorization in progress ...'))
      this.$store.dispatch('user/login', { 
        username: this.login.email,
        password: this.login.password,
        rememberMe: this.login.remember
      }).then((result) => {
        this.$bus.$emit('notification-progress-stop', {})

        if (result.code !== 200) {
          this.onFailure(result)
        } else {
          this.onSuccess()
          this.close()
        }
      }).catch(err => {
        Logger.error(err, 'user')()
        this.onFailure({ result: this.$t('Unexpected authorization error. Check your Network conection.') })
        // TODO Move to theme
        this.$bus.$emit('notification-progress-stop')
      })
    },
    callForgotPassword () {
      // TODO Move to theme
      this.$store.commit('ui/setAuthElem', 'forgot-pass')
    }
  }
}
