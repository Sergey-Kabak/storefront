<template>
  <div class="menu">
    <div class="menu-inner" :class="{'active': isMenuActive}">
      <ul class="menu-list menu-list-top">
        <li class="menu-item" v-for="({identifier, icon, title}) in firstMenu" :key="identifier" @click="changeActiveMenu({identifier, title})">
          <router-link class="menu-link" :to="identifier"><span class="menu-item-icon" v-html="icon"></span><span class="menu-item-title">{{title}}</span></router-link>
        </li>
        <li class="menu-item menu-item-toggle" @click="toggleMenu()">
          <div class="menu-link">
            <svg class="arrow menu-item-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.293 10.707L12 16.414L17.707 10.707L16.293 9.29297L12 13.586L7.707 9.29297L6.293 10.707Z" fill="#BDBDBD"/>
            </svg>
            <span v-if="isMenuActive" class="menu-item-title">{{ $t('collapse') }}</span>
            <span v-else class="menu-item-title">{{ $t('more') }}</span>
          </div>
        </li>
        <li class="menu-item" v-show="isMenuActive" v-for="({identifier, icon, title}) in secondMenu" :key="identifier" @click="changeActiveMenu({identifier, title})">
          <router-link class="menu-link" :to="identifier"><span class="menu-item-icon" v-html="icon"></span><span class="menu-item-title">{{title}}</span></router-link>
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
    isMenuActive: false,
    icons: {
      vacancy: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 6V4H10V6H14ZM4 8V19H20V8H4ZM20 6C21.11 6 22 6.89 22 8V19C22 20.11 21.11 21 20 21H4C2.89 21 2 20.11 2 19L2.01 8C2.01 6.89 2.89 6 4 6H8V4C8 2.89 8.89 2 10 2H14C15.11 2 16 2.89 16 4V6H20Z" fill="#828282"/></svg> `,
      shops: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M21 13V20C21 20.2652 20.8946 20.5196 20.7071 20.7071C20.5196 20.8946 20.2652 21 20 21H4C3.73478 21 3.48043 20.8946 3.29289 20.7071C3.10536 20.5196 3 20.2652 3 20V13H2V11L3 6H21L22 11V13H21ZM5 13V19H19V13H5ZM4.04 11H19.96L19.36 8H4.64L4.04 11ZM6 14H14V17H6V14ZM3 3H21V5H3V3Z" fill="#828282"/> </svg> `,
      'payments-and-loans': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M19 14V6C19 4.9 18.1 4 17 4H3C1.9 4 1 4.9 1 6V14C1 15.1 1.9 16 3 16H17C18.1 16 19 15.1 19 14ZM17 14H3V6H17V14ZM10 7C8.34 7 7 8.34 7 10C7 11.66 8.34 13 10 13C11.66 13 13 11.66 13 10C13 8.34 11.66 7 10 7ZM23 7V18C23 19.1 22.1 20 21 20H4C4 19 4 19.1 4 18H21V7C22.1 7 22 7 23 7Z" fill="#828282"/> </svg> `,
      'warranty-exchange-return': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12 5V1L7 6L12 11V7C15.31 7 18 9.69 18 13C18 16.31 15.31 19 12 19C8.69 19 6 16.31 6 13H4C4 17.42 7.58 21 12 21C16.42 21 20 17.42 20 13C20 8.58 16.42 5 12 5Z" fill="#828282"/> </svg> `,
      'using-a-promo-code': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M20 6H17.82C17.93 5.69 18 5.35 18 5C18 3.34 16.66 2 15 2C13.95 2 13.04 2.54 12.5 3.35L12 4.02L11.5 3.34C10.96 2.54 10.05 2 9 2C7.34 2 6 3.34 6 5C6 5.35 6.07 5.69 6.18 6H4C2.89 6 2.01 6.89 2.01 8L2 19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM15 4C15.55 4 16 4.45 16 5C16 5.55 15.55 6 15 6C14.45 6 14 5.55 14 5C14 4.45 14.45 4 15 4ZM9 4C9.55 4 10 4.45 10 5C10 5.55 9.55 6 9 6C8.45 6 8 5.55 8 5C8 4.45 8.45 4 9 4ZM20 19H4V17H20V19ZM20 14H4V8H9.08L7 10.83L8.62 12L11 8.76L12 7.4L13 8.76L15.38 12L17 10.83L14.92 8H20V14Z" fill="#828282"/> </svg> `,
      delivery: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M8.965 18C8.84612 18.8343 8.43021 19.5977 7.79368 20.1499C7.15714 20.7022 6.34272 21.0063 5.5 21.0063C4.65728 21.0063 3.84286 20.7022 3.20632 20.1499C2.56979 19.5977 2.15388 18.8343 2.035 18H1V6C1 5.73478 1.10536 5.48043 1.29289 5.29289C1.48043 5.10536 1.73478 5 2 5H16C16.2652 5 16.5196 5.10536 16.7071 5.29289C16.8946 5.48043 17 5.73478 17 6V8H20L23 12.056V18H20.965C20.8461 18.8343 20.4302 19.5977 19.7937 20.1499C19.1571 20.7022 18.3427 21.0063 17.5 21.0063C16.6573 21.0063 15.8429 20.7022 15.2063 20.1499C14.5698 19.5977 14.1539 18.8343 14.035 18H8.965ZM15 7H3V15.05C3.39456 14.6472 3.8806 14.3457 4.41675 14.1711C4.9529 13.9966 5.52329 13.9541 6.07938 14.0474C6.63546 14.1407 7.16077 14.3669 7.61061 14.7069C8.06044 15.0469 8.42148 15.4905 8.663 16H14.337C14.505 15.647 14.73 15.326 15 15.05V7ZM17 13H21V12.715L18.992 10H17V13ZM17.5 19C17.898 19 18.2796 18.8419 18.561 18.5605C18.8424 18.2791 19.0005 17.8975 19.0005 17.4995C19.0005 17.1015 18.8424 16.7199 18.561 16.4385C18.2796 16.1571 17.898 15.999 17.5 15.999C17.102 15.999 16.7204 16.1571 16.439 16.4385C16.1576 16.7199 15.9995 17.1015 15.9995 17.4995C15.9995 17.8975 16.1576 18.2791 16.439 18.5605C16.7204 18.8419 17.102 19 17.5 19ZM7 17.5C7 17.303 6.9612 17.108 6.88582 16.926C6.81044 16.744 6.69995 16.5786 6.56066 16.4393C6.42137 16.3001 6.25601 16.1896 6.07403 16.1142C5.89204 16.0388 5.69698 16 5.5 16C5.30302 16 5.10796 16.0388 4.92597 16.1142C4.74399 16.1896 4.57863 16.3001 4.43934 16.4393C4.30005 16.5786 4.18956 16.744 4.11418 16.926C4.0388 17.108 4 17.303 4 17.5C4 17.8978 4.15804 18.2794 4.43934 18.5607C4.72064 18.842 5.10218 19 5.5 19C5.89782 19 6.27936 18.842 6.56066 18.5607C6.84196 18.2794 7 17.8978 7 17.5Z" fill="#828282"/> </svg> `,
      'own-account': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0)"> <path d="M21.0539 10.1223L21.0539 10.1223C20.7403 9.37336 20.2694 8.70122 19.6736 8.15155L20.3516 7.41654L19.6736 8.15155C19.0777 7.60189 18.3709 7.1876 17.6014 6.93672L17.5975 6.93547C16.0616 6.42791 14.2368 6.52684 12.4419 7.2766L12.0567 7.43749L11.6715 7.2768C9.87402 6.52705 8.05266 6.42895 6.51111 6.93591L6.50846 6.93678L6.50846 6.93678C5.73888 7.18749 5.03206 7.6017 4.43625 8.15134C3.84043 8.70098 3.36964 9.37314 3.05613 10.1221L3.05297 10.1297L3.05294 10.1296C2.21795 12.0794 2.31617 14.5534 3.43402 16.9254L21.0539 10.1223ZM21.0539 10.1223L21.0571 10.1296M21.0539 10.1223L21.0571 10.1296M21.0571 10.1296C21.8921 12.0796 21.7937 14.5535 20.6762 16.9206L20.676 16.9211M21.0571 10.1296L20.676 16.9211M20.676 16.9211C19.0005 20.475 15.4208 22.88 12.0926 22.88H12.016C8.68726 22.88 5.10935 20.4789 3.43408 16.9256L20.676 16.9211Z" stroke="#828282" stroke-width="2"/> <path d="M17.0157 -4.40852e-05C15.9377 0.0458383 12.8542 0.536426 12.3537 4.68701C12.3453 4.74178 12.3499 4.79775 12.367 4.8504C12.3841 4.90305 12.4133 4.95089 12.4521 4.99007C12.491 5.02925 12.5384 5.05865 12.5906 5.0759C12.6428 5.09315 12.6983 5.09776 12.7527 5.08937C16.8582 4.58819 17.3447 1.46466 17.3902 0.377603C17.3938 0.327066 17.3866 0.276328 17.3691 0.22884C17.3516 0.181352 17.3241 0.138227 17.2886 0.102398C17.253 0.0665676 17.2103 0.0388728 17.1632 0.021196C17.1161 0.00351928 17.0658 -0.00372494 17.0157 -4.40852e-05Z" fill="#828282"/> <path d="M7.88442 0.801186C7.83338 0.796827 7.78202 0.803817 7.73396 0.82166C7.6859 0.839503 7.64231 0.867766 7.60626 0.904454C7.57021 0.941141 7.54259 0.98536 7.52533 1.03399C7.50808 1.08262 7.50163 1.13447 7.50642 1.18589C7.55892 2.14942 8.02792 4.6306 11.3564 5.08589C11.4125 5.09671 11.4704 5.09351 11.525 5.07659C11.5796 5.05966 11.6292 5.02952 11.6696 4.9888C11.71 4.94807 11.7399 4.89799 11.7567 4.84294C11.7735 4.78788 11.7766 4.72952 11.7659 4.67295C11.3039 1.32707 8.85392 0.857656 7.88442 0.801186Z" fill="#828282"/> </g> <defs> <clipPath id="clip0"> <rect width="24" height="24" fill="white"/> </clipPath> </defs> </svg> `,
      payment: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M19 14V6C19 4.9 18.1 4 17 4H3C1.9 4 1 4.9 1 6V14C1 15.1 1.9 16 3 16H17C18.1 16 19 15.1 19 14ZM17 14H3V6H17V14ZM10 7C8.34 7 7 8.34 7 10C7 11.66 8.34 13 10 13C11.66 13 13 11.66 13 10C13 8.34 11.66 7 10 7ZM23 7V18C23 19.1 22.1 20 21 20H4C4 19 4 19.1 4 18H21V7C22.1 7 22 7 23 7Z" fill="#828282"/> </svg> `,
      company: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M18 2H6C4.897 2 4 2.897 4 4V21C4 21.2652 4.10536 21.5196 4.29289 21.7071C4.48043 21.8946 4.73478 22 5 22H19C19.2652 22 19.5196 21.8946 19.7071 21.7071C19.8946 21.5196 20 21.2652 20 21V4C20 2.897 19.103 2 18 2ZM18 20H6V4H18V20Z" fill="#828282"/> <path d="M8 6H11V8H8V6ZM13 6H16V8H13V6ZM8 10H11V12H8V10ZM13 10.031H16V12H13V10.031ZM8 14H11V16H8V14ZM13 14H16V16H13V14Z" fill="#828282"/> </svg> `,
      landlords: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M22 19H16V15H13.32C12.18 17.42 9.72 19 7 19C3.14 19 0 15.86 0 12C0 8.14 3.14 5 7 5C9.72 5 12.17 6.58 13.32 9H24V15H22V19ZM18 17H20V13H22V11H11.94L11.71 10.33C11.01 8.34 9.11 7 7 7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17C9.11 17 11.01 15.66 11.71 13.67L11.94 13H18V17ZM7 15C5.35 15 4 13.65 4 12C4 10.35 5.35 9 7 9C8.65 9 10 10.35 10 12C10 13.65 8.65 15 7 15ZM7 11C6.45 11 6 11.45 6 12C6 12.55 6.45 13 7 13C7.55 13 8 12.55 8 12C8 11.45 7.55 11 7 11Z" fill="#828282"/> </svg> `,
      'umovi-vikoristannja-sajtu': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#828282"/> </svg> `,
      'public-offer': `<svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14 18L11.25 15L12.41 13.84L14 15.43L17.59 11.84L18.75 13.25L14 18ZM9.8 18H2C0.89 18 0 17.11 0 16V2C0 0.89 0.89 0 2 0H16C17.11 0 18 0.89 18 2V9.8C17.39 9.45 16.72 9.2 16 9.08V2H2V16H9.08C9.2 16.72 9.45 17.39 9.8 18ZM9 14H4V12H9V14ZM11.68 10H4V8H14V9.08C13.15 9.22 12.37 9.54 11.68 10ZM14 6H4V4H14" fill="#828282"/> </svg> `,
      contacts: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 10.99L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="#828282"/> </svg> `
    }
  }),
  computed: {
    ...mapState({
      menu: (state) => {
        return state.cms.menu
      },
      activeMenu: (state) => state.cms.activeMenu
    }),
    menuWithIcons() {
      return this.menu.map(el => ({ ...el, icon: this.icons[el.identifier]}))
    },
    firstMenu() {
      return this.menuWithIcons.slice(0,7)
    },
    secondMenu() {
      return this.menuWithIcons.slice(7)
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        this.activateMenu(to.params.slug)
        this.scrollToActiveElement()
      },
      immediate: true
    }
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
    .menu-item-toggle .menu-item-icon {
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
  // padding: 8px 16px 8px 0;
}

.menu-item-title {
  display: block;
  font-family: DIN Pro;
  font-size: 14px;
  line-height: 24px;
  color: #1A1919;
  width: 100%;
}
.menu-item-icon {
  margin-right: 22px;
  display: inline-flex;
}

.menu-link {
  padding: 8px;
  font-family: DIN Pro;
  font-size: 14px;
  line-height: 24px;
  color: #1A1919;
  width: 100%;
  display: flex;
  transition: color .2s ease-in-out;
  align-items: center;

  &:hover {
    color: #23BE20;
  }

  &.router-link-active {
    color: #23BE20;
    font-weight: 600;
    background: #E4F9E4;
    border-radius: 4px;
    path {
      fill:#23BE20 !important;
    }
    .menu-item-title {
      color: #23BE20;
    }
  }
}

.arrow {
  transition: .2s ease-in-out;
}
</style>