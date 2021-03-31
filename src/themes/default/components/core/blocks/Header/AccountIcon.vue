<template>
  <div
    class="inline-flex relative dropdown"
    data-testid="accountButton"
    @click.self="goToAccount();showMenu = true;"
    @keyup.enter="goToAccount"
    tabindex="0"
    role="button"
    @mouseover="showMenu = true"
    @mouseout="showMenu = false"
    :aria-label="$t('Open my account')"
  >
    <button
      type="button"
      class="bg-cl-transparent brdr-none p0 main-green-color acc-link"
      aria-label="account"
    >
      <!--<i class="material-icons block">account_circle</i>-->
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.579 2 2 6.579 2 12C2 15.189 3.592 18.078 6 19.924V20H6.102C7.77 21.245 9.813 22 12 22C14.187 22 16.23 21.245 17.898 20H18V19.924C20.408 18.078 22 15.19 22 12C22 6.579 17.421 2 12 2ZM8.074 18.927C8.22136 18.2604 8.59154 17.6639 9.12347 17.236C9.6554 16.808 10.3173 16.5742 11 16.573H13C13.6827 16.5744 14.3445 16.8083 14.8764 17.2362C15.4082 17.6641 15.7785 18.2605 15.926 18.927C14.758 19.604 13.416 20 12 20C10.584 20 9.242 19.604 8.074 18.927ZM17.61 17.641C17.2286 16.7329 16.5877 15.9574 15.7677 15.4117C14.9477 14.866 13.985 14.5742 13 14.573H11C10.015 14.5742 9.05227 14.866 8.23227 15.4117C7.41227 15.9574 6.77144 16.7329 6.39 17.641C4.923 16.182 4 14.176 4 12C4 7.663 7.663 4 12 4C16.337 4 20 7.663 20 12C20 14.176 19.077 16.182 17.61 17.641Z" fill="#828282"/>
        <path d="M12 6C9.72 6 8 7.72 8 10C8 12.28 9.72 14 12 14C14.28 14 16 12.28 16 10C16 7.72 14.28 6 12 6ZM12 12C10.822 12 10 11.178 10 10C10 8.822 10.822 8 12 8C13.178 8 14 8.822 14 10C14 11.178 13.178 12 12 12Z" fill="#828282"/>
      </svg>

    </button>
  </div>
</template>

<script>
import NoSSR from 'vue-no-ssr';
import AccountIcon from '@vue-storefront/core/compatibility/components/blocks/Header/AccountIcon';

export default {
  mixins: [AccountIcon],
  components: {
    'no-ssr': NoSSR
  },
  data () {
    return {
      showMenu: false,
      navigation: [
        { title: this.$t('My profile'), link: '/account' }
      ]
    }
  },
  methods: {
    notify (title) {
      if (title === 'My loyalty card' || title === 'My product reviews') {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'warning',
          message: this.$t('This feature is not implemented yet! Please take a look at https://github.com/DivanteLtd/vue-storefront/issues for our Roadmap!'),
          action1: { label: this.$t('OK') }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/base/global_vars';
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-icon-hover: color(secondary, $colors-background);
$green: color(main-green);

.dropdown {
  outline: none;
  &:hover {
    background-color: transparent !important;
    .acc-link {
      i {
        color: $green;
      }
    }
  }

  button {
    display: inline-flex;
    pointer-events: none;
  }

  .dropdown-content {
    display: none;
    position: absolute;
    right: 0;
    top: 100%;
    width: 160px;
    z-index: 1;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }

  a {
    opacity: .6;

    &:hover,
    &:focus {
      background-color: $color-icon-hover;
      opacity: 1;
    }

  }

  @media (min-width: 768px) {
    &:hover .dropdown-content:not(.dropdown-content__hidden),
    &:focus .dropdown-content:not(.dropdown-content__hidden) {
      display: block;
    }

    &:focus-within {
      background-color: $color-icon-hover;
      opacity: 1;
      .dropdown-content:not(.dropdown-content__hidden) {
        display: block;
      }
    }
  }
}
</style>
