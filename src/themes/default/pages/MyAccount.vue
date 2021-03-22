<template>
  <div id="my_account">
    <div class="v-container">
      <breadcrumbs />
      <h1 class="account-title">
        {{ $t('My Account') }}
      </h1>
      <div class="navigation-mobile" v-if="$route.name !== 'my-order'">
        <select-menu :menu="navigation" />
      </div>
      <div class="account-body">
        <div class="account-left">
          <no-ssr>
            <span class="account-welcome" v-if="userData">{{ userData.firstname }}, {{ $t('hello') }}!</span>
          </no-ssr>
          <nav class="account-menu">
            <ul class="account-menu-list">
              <li class="account-menu-item" v-for="(page, index) in navigation" :key="index">
                <router-link :to="page.link" class="account-menu-link">
                  <icon-base class="account-menu-icon"> 
                    <component :is="page.icon" />
                  </icon-base>
                  <span>{{ $t(page.title) }}</span>
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="account-right">
          <no-ssr>
            <router-view></router-view>
          </no-ssr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyAccount from '@vue-storefront/core/pages/MyAccount';
import Breadcrumbs from 'theme/components/core/blocks/MyAccount/Breadcrumbs'
import SelectMenu from 'theme/components/core/blocks/MyAccount/SelectMenu'
import NoSSR from 'vue-no-ssr';
import { RecentlyViewedModule } from '@vue-storefront/core/modules/recently-viewed';
import { registerModule } from '@vue-storefront/core/lib/modules';
import { AccountIcon, FormatListIcon, CommentIcon, VerifiedIcon, VisibilityIcon, ArrowLeftIcon } from 'theme/assets/account/index';
import IconBase from 'theme/components/theme/IconBase';
import { mapState } from 'vuex';

export default {
  components: {
    Breadcrumbs,
    IconBase,
    ArrowLeftIcon,
    SelectMenu,
    'no-ssr': NoSSR
  },
  mixins: [MyAccount],
  beforeCreate () {
    registerModule(RecentlyViewedModule)
  },
  data: () => ({
    navigation: [
      { title: 'my-account', link: '/account/personal-data', icon: AccountIcon },
      { title: 'my-orders', link: '/account/orders', icon: FormatListIcon },
      { title: 'my-recently-viewed', link: '/account/recently-viewed', icon: VisibilityIcon },
      { title: 'my-security', link: '/account/security', icon: VerifiedIcon },
      { title: 'my-reviews', link: '/account/reviews', icon: CommentIcon }
    ]
  }),
  computed: {
    ...mapState({
      userData: (state) => state.user && state.user.current
    }),
    activeRoute() {
      return this.$route.name
    }
  }
}
</script>

<style lang="scss" scoped>
.v-container {
  padding-bottom: 68px;
}

.navigation-mobile {
  display: none;
  margin-bottom: 16px;
}

.breadcrumbs {
  margin-bottom: 24px;
}

.account-title {
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 36px;
  margin: 0 0 17px 0;
  line-height: 46px;
  color: #1A1919;
}

.account-body {
  display: flex;
  grid-column-gap: 20px;
}

.account-left {
  max-width: 316px;
  flex: 1 1 316px;
}

.account-menu-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.account-menu-link {
  padding: 8px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  transition: .2s ease-in-out;
  white-space: nowrap;

  &:hover {
    .account-menu-icon {
      fill: #23BE20;
    }

    span {
      color: #23BE20;
      white-space: nowrap;
    }
  }
  

  .account-menu-icon {
    fill: #828282;
  }

  span {
    font-family: DIN Pro;
    font-size: 14px;
    line-height: 24px;
    color: #1A1919;
  }
}

.account-menu-item {
  .router-link-active {
    background-color: #E4F9E4;

    .account-menu-icon {
      fill: #23BE20;
    }

    span {
      font-weight: 600;
      color: #23BE20;
    }
  }
}

.account-menu-icon {
  margin-right: 20px;
}

.account-right {
  flex: 1 1 986px;
}

.account-welcome {
  display: block;
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #1A1919;
  margin-bottom: 36px;
}

.account-info {
  display: flex;
  margin-bottom: 22px;
}

@media (max-width: 768px) {
  .account-left {
    display: none;
  }

  .navigation-mobile {
    display: block;
  }

  ::v-deep {
    .account-page-title {
      display: none;
    }
  }
}
</style>
