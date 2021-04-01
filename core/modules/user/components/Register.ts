import i18n from '@vue-storefront/i18n'
import {Logger} from '@vue-storefront/core/lib/logger'

export const Register = {
  name: 'Register',
  data () {
    return {
      email: '',
      telephone: '',
      firstName: '',
      lastName: '',
      password: '',
      rPassword: '',
      conditions: false
    }
  },
  methods: {
    callRegister () {
      // TODO Move to theme
      this.$bus.$emit('notification-progress-start', i18n.t('Registering the account ...'))
      this.$store.dispatch('user/register', { email: this.email, password: this.password, firstname: this.firstName, lastname: this.lastName,
        custom_attributes: [{
          attribute_code: 'telephone',
          value: this.telephone
        }]
      }).then((result) => {
        Logger.debug(result, 'user')()
        // TODO Move to theme
        this.$bus.$emit('notification-progress-stop')
        if (result.code !== 200) {
          this.onFailure(result)
        } else {
          this.$store.dispatch('user/login', { username: this.email, password: this.password, rememberMe: false })
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
