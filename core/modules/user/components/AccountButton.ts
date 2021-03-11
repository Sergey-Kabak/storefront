import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'

export const AccountButton = {
  name: 'AccountButton',
  computed: {
    isLoggedIn () {
      return this.$store.getters['user/isLoggedIn']
    },
    user () {
      return this.$store.state.user.current
    }
  },
  methods: {
    goToAccount () {
      if (this.currentUser) {
        this.$router.push(this.localizedRoute('/account/personal-data'))
      } else {
        this.$store.commit('ui/setSignUp', true)
        this.$store.commit('ui/setAuthElem', 'login')
      }
    },
    logout () {
      EventBus.$emit('user-before-logout')
      this.$router.push(this.localizedRoute('/'))
    }
  }
}
