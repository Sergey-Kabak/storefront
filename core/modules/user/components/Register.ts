import i18n from '@vue-storefront/i18n'
import {Logger} from '@vue-storefront/core/lib/logger'

export const Register = {
  name: 'Register',
  methods: {
    callRegister () {
      // TODO Move to theme
      this.$bus.$emit('notification-progress-start', i18n.t('Registering the account ...'))
      this.$store.dispatch('user/register', {
        email: this.register.email,
        password: this.register.password,
        firstname: this.register.firstName,
        lastname: this.register.lastName,
        custom_attributes: [{
          attribute_code: 'telephone',
          value: this.register.telephone
        }]
      }).then((result) => {
        Logger.debug(result, 'user')()
        // TODO Move to theme
        this.$bus.$emit('notification-progress-stop')
        if (result.code !== 200) {
          this.onFailure(result)
        } else {
          this.$store.dispatch('user/login', { username: this.register.email, password: this.register.password, rememberMe: false })
          this.onSuccess()
          this.close()
        }
      }).catch(err => {
        // TODO Move to theme
        this.onFailure({ result: this.$t('Unexpected authorization error. Check your Network conection.') })
        this.$bus.$emit('notification-progress-stop')
        Logger.error(err, 'user')()
      })
    }
  }
}
