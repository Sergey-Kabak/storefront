<template>
  <div class="menu">
    <div class="menu-inner" :class="{'active': isMenuActive}">
      <ul class="menu-list menu-list-top">
        <li class="menu-item" v-for="({identifier, title}) in firstMenu" :key="identifier" @click="changeActiveMenu({identifier, title})">
          <router-link class="menu-link" :to="identifier">{{title}}</router-link>
        </li>
        <li class="menu-item menu-item-toggle" @click="toggleMenu()">
          <svg class="arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.293 10.707L12 16.414L17.707 10.707L16.293 9.29297L12 13.586L7.707 9.29297L6.293 10.707Z" fill="#BDBDBD"/>
          </svg>
          <span v-if="isMenuActive">{{ $t('collapse') }}</span>
          <span v-else>{{ $t('more') }}</span>
        </li>
        <li class="menu-item" v-show="isMenuActive" v-for="({identifier, title}) in secondMenu" :key="identifier" @click="changeActiveMenu({identifier, title})">
          <router-link class="menu-link" :to="identifier">{{title}}</router-link>
        </li>
      </ul>
    </div>
    <div class="line" v-show="isMenuActive" />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    isMenuActive: false
  }),
  computed: {
    ...mapState({
      menu: (state) => {
        return state.cms.menu
      },
      activeMenu: (state) => state.cms.activeMenu
    }),
    firstMenu() {
      return this.menu.slice(0,7)
    },
    secondMenu() {
      return this.menu.slice(7)
    }
  },
  watch: {
    $route(to, from) {
      this.activateMenu(to.params.slug)
      this.scrollToActiveElement()
    }
  },
  mounted: function() {
    this.activateMenu(this.$route.params.slug)
    this.scrollToActiveElement()
  },
  methods: {
    changeActiveMenu(menu) {
      this.$store.commit('cms/SET_ACTIVE_MENU', menu)
    },
    toggleMenu() {
      this.isMenuActive = !this.isMenuActive
    },
    activateMenu(slug) {
      if (this.secondMenu.find(it => it.identifier === slug)) {
        this.isMenuActive = true
      }
    },
    scrollToActiveElement() {
      this.$nextTick(() => {
        const activeLink = document.querySelector('.router-link-active.menu-link')
        if (activeLink) {
          activeLink.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.menu-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.menu-inner {
  overflow: hidden;
  position: relative;

  &.active {
    height: 400px;
    overflow-y: auto;
    .arrow {
      transform: rotate(-180deg)
    }
  }
}

.line {
  margin-top: 8px;
  background-color:#E0E0E0;
  width: 100%;
  height: 1px;
}

::v-deep {
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #E0E0E0;;
  }
}

.menu-item {
  cursor: pointer;
  margin: 0;
  display: flex;
  align-items: center;
}

.menu-item {
  span {
    display: block;
    padding: 8px 16px;
    font-family: DIN Pro;
    font-size: 14px;
    line-height: 24px;
    color: #1A1919;
    width: 100%;
  }
}

.menu-link {
  padding: 8px;
  font-family: DIN Pro;
  font-size: 14px;
  line-height: 24px;
  color: #1A1919;
  width: 100%;
  transition: color .2s ease-in-out;

  &:hover {
    color: #23BE20;
  }

  &.router-link-active {
    color: #23BE20;
    font-weight: 600;
    background: #E4F9E4;
    border-radius: 4px;
  }
}

.arrow {
  transition: .2s ease-in-out;
}
</style>