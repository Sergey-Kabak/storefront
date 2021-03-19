<template>
  <div class="menu">
    <div class="menu-inner" :class="{'active': isMenuActive}">
      <ul class="menu-list menu-list-top">
        <li class="menu-item" v-for="({identifier, icon, title}) in firstMenu" :key="identifier" @click="changeActiveMenu({identifier, title})">
          <router-link class="menu-link" :to="identifier"><span class="menu-item-icon" v-html="icon"></span><span class="menu-item-title">{{title}}</span></router-link>
        </li>
        <li class="menu-item menu-item-toggle" @click="toggleMenu()">
          <div class="menu-link">
            <svg class="arrow menu-item-icon" width="24" height="24" viewBox="0 0 24 24" fill="#BDBDBD" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.293 10.707L12 16.414L17.707 10.707L16.293 9.29297L12 13.586L7.707 9.29297L6.293 10.707Z"/>
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
      vacancy: `<svg fill="#828282" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 6V4H10V6H14ZM4 8V19H20V8H4ZM20 6C21.11 6 22 6.89 22 8V19C22 20.11 21.11 21 20 21H4C2.89 21 2 20.11 2 19L2.01 8C2.01 6.89 2.89 6 4 6H8V4C8 2.89 8.89 2 10 2H14C15.11 2 16 2.89 16 4V6H20Z" /></svg> `,
      shops: `<svg fill="#828282" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="M21 13V20C21 20.2652 20.8946 20.5196 20.7071 20.7071C20.5196 20.8946 20.2652 21 20 21H4C3.73478 21 3.48043 20.8946 3.29289 20.7071C3.10536 20.5196 3 20.2652 3 20V13H2V11L3 6H21L22 11V13H21ZM5 13V19H19V13H5ZM4.04 11H19.96L19.36 8H4.64L4.04 11ZM6 14H14V17H6V14ZM3 3H21V5H3V3Z" /> </svg> `,
      'payments-and-loans': `<svg fill="#828282" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="M19 14V6C19 4.9 18.1 4 17 4H3C1.9 4 1 4.9 1 6V14C1 15.1 1.9 16 3 16H17C18.1 16 19 15.1 19 14ZM17 14H3V6H17V14ZM10 7C8.34 7 7 8.34 7 10C7 11.66 8.34 13 10 13C11.66 13 13 11.66 13 10C13 8.34 11.66 7 10 7ZM23 7V18C23 19.1 22.1 20 21 20H4C4 19 4 19.1 4 18H21V7C22.1 7 22 7 23 7Z" /> </svg> `,
      'warranty-exchange-return': `<svg fill="#828282" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="M12 5V1L7 6L12 11V7C15.31 7 18 9.69 18 13C18 16.31 15.31 19 12 19C8.69 19 6 16.31 6 13H4C4 17.42 7.58 21 12 21C16.42 21 20 17.42 20 13C20 8.58 16.42 5 12 5Z" /> </svg> `,
      'using-a-promo-code': `<svg fill="#828282" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="M20 6H17.82C17.93 5.69 18 5.35 18 5C18 3.34 16.66 2 15 2C13.95 2 13.04 2.54 12.5 3.35L12 4.02L11.5 3.34C10.96 2.54 10.05 2 9 2C7.34 2 6 3.34 6 5C6 5.35 6.07 5.69 6.18 6H4C2.89 6 2.01 6.89 2.01 8L2 19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM15 4C15.55 4 16 4.45 16 5C16 5.55 15.55 6 15 6C14.45 6 14 5.55 14 5C14 4.45 14.45 4 15 4ZM9 4C9.55 4 10 4.45 10 5C10 5.55 9.55 6 9 6C8.45 6 8 5.55 8 5C8 4.45 8.45 4 9 4ZM20 19H4V17H20V19ZM20 14H4V8H9.08L7 10.83L8.62 12L11 8.76L12 7.4L13 8.76L15.38 12L17 10.83L14.92 8H20V14Z" /> </svg> `,
      delivery: `<svg fill="#828282" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="M8.965 18C8.84612 18.8343 8.43021 19.5977 7.79368 20.1499C7.15714 20.7022 6.34272 21.0063 5.5 21.0063C4.65728 21.0063 3.84286 20.7022 3.20632 20.1499C2.56979 19.5977 2.15388 18.8343 2.035 18H1V6C1 5.73478 1.10536 5.48043 1.29289 5.29289C1.48043 5.10536 1.73478 5 2 5H16C16.2652 5 16.5196 5.10536 16.7071 5.29289C16.8946 5.48043 17 5.73478 17 6V8H20L23 12.056V18H20.965C20.8461 18.8343 20.4302 19.5977 19.7937 20.1499C19.1571 20.7022 18.3427 21.0063 17.5 21.0063C16.6573 21.0063 15.8429 20.7022 15.2063 20.1499C14.5698 19.5977 14.1539 18.8343 14.035 18H8.965ZM15 7H3V15.05C3.39456 14.6472 3.8806 14.3457 4.41675 14.1711C4.9529 13.9966 5.52329 13.9541 6.07938 14.0474C6.63546 14.1407 7.16077 14.3669 7.61061 14.7069C8.06044 15.0469 8.42148 15.4905 8.663 16H14.337C14.505 15.647 14.73 15.326 15 15.05V7ZM17 13H21V12.715L18.992 10H17V13ZM17.5 19C17.898 19 18.2796 18.8419 18.561 18.5605C18.8424 18.2791 19.0005 17.8975 19.0005 17.4995C19.0005 17.1015 18.8424 16.7199 18.561 16.4385C18.2796 16.1571 17.898 15.999 17.5 15.999C17.102 15.999 16.7204 16.1571 16.439 16.4385C16.1576 16.7199 15.9995 17.1015 15.9995 17.4995C15.9995 17.8975 16.1576 18.2791 16.439 18.5605C16.7204 18.8419 17.102 19 17.5 19ZM7 17.5C7 17.303 6.9612 17.108 6.88582 16.926C6.81044 16.744 6.69995 16.5786 6.56066 16.4393C6.42137 16.3001 6.25601 16.1896 6.07403 16.1142C5.89204 16.0388 5.69698 16 5.5 16C5.30302 16 5.10796 16.0388 4.92597 16.1142C4.74399 16.1896 4.57863 16.3001 4.43934 16.4393C4.30005 16.5786 4.18956 16.744 4.11418 16.926C4.0388 17.108 4 17.303 4 17.5C4 17.8978 4.15804 18.2794 4.43934 18.5607C4.72064 18.842 5.10218 19 5.5 19C5.89782 19 6.27936 18.842 6.56066 18.5607C6.84196 18.2794 7 17.8978 7 17.5Z" /> </svg> `,
      'own-account': `<svg fill="#828282" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <mask id="path-1-inside-1" fill="white"> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0811 23.5024C15.6054 23.4799 19.3387 21.0324 21.1178 17.2716C23.2783 12.6902 21.7523 7.89846 17.6951 6.56611C15.8279 6.00357 13.8199 6.14366 12.0494 6.9592C10.2788 6.14366 8.27076 6.00357 6.40357 6.56611C2.34644 7.89846 0.820419 12.6902 2.98088 17.2716C4.76002 21.0324 8.4933 23.4799 12.0177 23.5024V23.5026C12.0282 23.5026 12.0388 23.5026 12.0494 23.5026C12.0599 23.5026 12.0705 23.5026 12.0811 23.5026V23.5024Z"/> </mask> <path d="M21.1178 17.2716L22.9257 18.1269L22.9268 18.1247L21.1178 17.2716ZM12.0811 23.5024L12.0683 21.5025L10.0811 21.5151V23.5024H12.0811ZM17.6951 6.56611L18.3191 4.66595L18.2957 4.65825L18.2721 4.65113L17.6951 6.56611ZM12.0494 6.9592L11.2126 8.77575L12.0494 9.16118L12.8861 8.77575L12.0494 6.9592ZM6.40357 6.56611L5.82663 4.65113L5.80301 4.65825L5.77956 4.66595L6.40357 6.56611ZM2.98088 17.2716L1.17193 18.1247L1.17299 18.1269L2.98088 17.2716ZM12.0177 23.5024H14.0177V21.5151L12.0304 21.5025L12.0177 23.5024ZM12.0177 23.5026H10.0177V25.499L12.014 25.5026L12.0177 23.5026ZM12.0494 23.5026L12.0537 21.5025L12.045 21.5026L12.0494 23.5026ZM12.0811 23.5026L12.0847 25.5026L14.0811 25.499V23.5026H12.0811ZM19.3099 16.4163C17.8192 19.5675 14.7341 21.4854 12.0683 21.5025L12.0938 25.5024C16.4768 25.4744 20.8582 22.4973 22.9257 18.1269L19.3099 16.4163ZM17.0711 8.46628C19.6303 9.30669 21.1307 12.5553 19.3089 16.4185L22.9268 18.1247C25.4259 12.8251 23.8743 6.49022 18.3191 4.66595L17.0711 8.46628ZM12.8861 8.77575C14.2133 8.16442 15.7186 8.05941 17.1182 8.48109L18.2721 4.65113C15.9373 3.94774 13.4264 4.1229 11.2126 5.14265L12.8861 8.77575ZM12.8861 5.14265C10.6723 4.1229 8.16137 3.94774 5.82663 4.65113L6.9805 8.48109C8.38016 8.05941 9.88543 8.16442 11.2126 8.77575L12.8861 5.14265ZM5.77956 4.66595C0.224448 6.49022 -1.3272 12.8251 1.17193 18.1247L4.78983 16.4185C2.96803 12.5553 4.46842 9.30669 7.02757 8.46628L5.77956 4.66595ZM1.17299 18.1269C3.24052 22.4973 7.62194 25.4744 12.0049 25.5024L12.0304 21.5025C9.36465 21.4854 6.27953 19.5675 4.78878 16.4163L1.17299 18.1269ZM14.0177 23.5026V23.5024H10.0177V23.5026H14.0177ZM12.045 21.5026C12.0371 21.5026 12.0292 21.5026 12.0213 21.5026L12.014 25.5026C12.0273 25.5026 12.0405 25.5026 12.0537 25.5025L12.045 21.5026ZM12.045 25.5025C12.0582 25.5026 12.0715 25.5026 12.0847 25.5026L12.0774 21.5026C12.0695 21.5026 12.0616 21.5026 12.0537 21.5026L12.045 25.5025ZM14.0811 23.5026V23.5024H10.0811V23.5026H14.0811Z" mask="url(#path-1-inside-1)"/> <path d="M16.9487 0.500853C15.9621 0.542844 13.1402 0.991816 12.6822 4.79032C12.6745 4.84044 12.6787 4.89166 12.6944 4.93984C12.71 4.98802 12.7367 5.03181 12.7723 5.06767C12.8078 5.10352 12.8513 5.13043 12.899 5.14621C12.9468 5.162 12.9976 5.16622 13.0473 5.15854C16.8046 4.69988 17.2498 1.84131 17.2914 0.846465C17.2948 0.800215 17.2882 0.753782 17.2722 0.710322C17.2561 0.666862 17.231 0.627396 17.1985 0.594605C17.1659 0.561815 17.1268 0.536469 17.0837 0.520292C17.0406 0.504114 16.9946 0.497485 16.9487 0.500853V0.500853Z" /> <path d="M8.59221 1.23162C8.54551 1.22763 8.49851 1.23403 8.45452 1.25036C8.41053 1.26669 8.37064 1.29255 8.33765 1.32613C8.30466 1.3597 8.27938 1.40017 8.26359 1.44468C8.2478 1.48918 8.24189 1.53663 8.24628 1.58369C8.29432 2.46549 8.72354 4.73619 11.7697 5.15286C11.821 5.16276 11.874 5.15984 11.924 5.14435C11.9739 5.12886 12.0194 5.10128 12.0563 5.064C12.0933 5.02673 12.1207 4.9809 12.136 4.93052C12.1514 4.88013 12.1543 4.82672 12.1445 4.77495C11.7216 1.71289 9.47947 1.2833 8.59221 1.23162Z" /> </svg>`,
      payment: `<svg fill="#828282" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="M19 14V6C19 4.9 18.1 4 17 4H3C1.9 4 1 4.9 1 6V14C1 15.1 1.9 16 3 16H17C18.1 16 19 15.1 19 14ZM17 14H3V6H17V14ZM10 7C8.34 7 7 8.34 7 10C7 11.66 8.34 13 10 13C11.66 13 13 11.66 13 10C13 8.34 11.66 7 10 7ZM23 7V18C23 19.1 22.1 20 21 20H4C4 19 4 19.1 4 18H21V7C22.1 7 22 7 23 7Z" /> </svg> `,
      company: `<svg fill="#828282" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="M18 2H6C4.897 2 4 2.897 4 4V21C4 21.2652 4.10536 21.5196 4.29289 21.7071C4.48043 21.8946 4.73478 22 5 22H19C19.2652 22 19.5196 21.8946 19.7071 21.7071C19.8946 21.5196 20 21.2652 20 21V4C20 2.897 19.103 2 18 2ZM18 20H6V4H18V20Z" /> <path d="M8 6H11V8H8V6ZM13 6H16V8H13V6ZM8 10H11V12H8V10ZM13 10.031H16V12H13V10.031ZM8 14H11V16H8V14ZM13 14H16V16H13V14Z" /> </svg> `,
      landlords: `<svg fill="#828282"width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="M22 19H16V15H13.32C12.18 17.42 9.72 19 7 19C3.14 19 0 15.86 0 12C0 8.14 3.14 5 7 5C9.72 5 12.17 6.58 13.32 9H24V15H22V19ZM18 17H20V13H22V11H11.94L11.71 10.33C11.01 8.34 9.11 7 7 7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17C9.11 17 11.01 15.66 11.71 13.67L11.94 13H18V17ZM7 15C5.35 15 4 13.65 4 12C4 10.35 5.35 9 7 9C8.65 9 10 10.35 10 12C10 13.65 8.65 15 7 15ZM7 11C6.45 11 6 11.45 6 12C6 12.55 6.45 13 7 13C7.55 13 8 12.55 8 12C8 11.45 7.55 11 7 11Z" /> </svg> `,
      'umovi-vikoristannja-sajtu': `<svg fill="#828282" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" /> </svg> `,
      'public-offer': `<svg fill="#828282" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="M17 21L14.25 18L15.41 16.84L17 18.43L20.59 14.84L21.75 16.25L17 21ZM12.8 21H5C3.89 21 3 20.11 3 19V5C3 3.89 3.89 3 5 3H19C20.11 3 21 3.89 21 5V12.8C20.39 12.45 19.72 12.2 19 12.08V5H5V19H12.08C12.2 19.72 12.45 20.39 12.8 21ZM12 17H7V15H12V17ZM14.68 13H7V11H17V12.08C16.15 12.22 15.37 12.54 14.68 13ZM17 9H7V7H17" /> </svg>`,
      contacts: `<svg fill="#828282" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 10.99L4 6H20ZM20 18H4V8L12 13L20 8V18Z" /> </svg> `
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

.menu-item-title {
  display: block;
  font-family: DIN Pro;
  font-size: 14px;
  line-height: 24px;
  color: #1A1919;
  width: 100%;
}

.menu-item-icon {
  margin-right: 20px;
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
  align-items: center;

  &:hover {
    .menu-item-title {
      color: #23BE20;
    }

    ::v-deep {
      svg {
        fill:#23BE20!important;
      }
    }
  }

  &:active {
    .menu-item-title {
      color: #1da01b;
    }

    ::v-deep {
      svg {
        fill:#1da01b!important;
      }
    }
  }

  &.router-link-active {
    color: #23BE20;
    font-weight: 600;
    background: #E4F9E4;
    border-radius: 4px;

    ::v-deep {
      svg {
        fill:#23BE20 !important;
      }
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