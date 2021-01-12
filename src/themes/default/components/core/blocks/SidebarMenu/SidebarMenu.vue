<template>
  <div class="sidebar-menu fixed mw-100 bg-cl-secondary">
    <div class="row brdr-bottom-1 brdr-cl-bg-secondary">
      <div
        v-if="submenu.depth"
        class="back-button"
      >
        <sub-btn type="back" class="bg-cl-transparent brdr-none" />
      </div>
      <div class="col-xs bg-cl-primary">
        <button
          type="button"
          :aria-label="$t('Close')"
          class="w-100 inline-flex end-xs bg-cl-transparent brdr-none p0 close-btn"
          @click="closeMenu"
        >
          <i class="material-icons p15">close</i>
        </button>
      </div>
    </div>
    <div class="sidebar-menu__container" ref="container">
      <div class="sidebar-wrapper">
        <ul class="p0 m0 relative sidebar-menu__list" :style="mainListStyles">
          <li
            @click="closeMenu"
            class="brdr-bottom-1 brdr-cl-bg-secondary bg-cl-primary"
          >
            <router-link
              class="block px25 py20 cl-accent no-underline"
              :to="localizedRoute('/')"
              exact
            >
              {{ $t('Home') }}
            </router-link>
          </li>
          <li
            class="brdr-bottom-1 brdr-cl-bg-secondary bg-cl-primary flex"
            :key="category.slug"
            @click="closeMenu"
            v-for="category in visibleCategories"
          >
            <div
              v-if="isCurrentMenuShowed"
              class="subcategory-item"
            >
              <sub-btn
                v-if="isShowChildrenCategories(category)"
                class="bg-cl-transparent brdr-none fs-medium"
                :id="category.id"
                :ico="ico[category.id]"
                :name="category.name"
              />
              <router-link
                v-else
                class="px25 py20 cl-accent no-underline col-xs custom-cat-link"
                :to="categoryLink(category)"
              >
                <span v-html="ico[category.id]"></span>
                {{ category.name }}
              </router-link>
            </div>

            <sub-category
              :category-links="category.children_data"
              :id="category.id"
              :parent-slug="category.slug"
              :parent-path="category.url_path"
            />
          </li>
          <li
            v-if="isCurrentMenuShowed"
            @click="closeMenu"
            class="bg-cl-secondary"
          >
            <router-link
              class="block px25 py20 brdr-bottom-1 cl-accent brdr-cl-secondary no-underline fs-medium-small sale-item"
              :to="localizedRoute('/sale')"
              exact
            >
              <span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 12L20.56 9.21998L20.9 5.53998L17.29 4.71998L15.4 1.53998L12 2.99998L8.6 1.53998L6.71 4.71998L3.1 5.52998L3.44 9.20998L1 12L3.44 14.78L3.1 18.47L6.71 19.29L8.6 22.47L12 21L15.4 22.46L17.29 19.28L20.9 18.46L20.56 14.78L23 12ZM18.49 14.11L18.75 16.9L16.01 17.52L14.58 19.93L12 18.82L9.42 19.93L7.99 17.52L5.25 16.9L5.51 14.1L3.66 12L5.51 9.87998L5.25 7.09998L7.99 6.48998L9.42 4.07998L12 5.17998L14.58 4.06998L16.01 6.47998L18.75 7.09998L18.49 9.88998L20.34 12L18.49 14.11Z" fill="#23BE20"/>
                  <path d="M9.5 7C9.10218 7 8.72064 7.15804 8.43934 7.43934C8.15804 7.72064 8 8.10218 8 8.5C8 8.89782 8.15804 9.27936 8.43934 9.56066C8.72064 9.84196 9.10218 10 9.5 10C9.89782 10 10.2794 9.84196 10.5607 9.56066C10.842 9.27936 11 8.89782 11 8.5C11 8.10218 10.842 7.72064 10.5607 7.43934C10.2794 7.15804 9.89782 7 9.5 7ZM14.5 14C14.1022 14 13.7206 14.158 13.4393 14.4393C13.158 14.7206 13 15.1022 13 15.5C13 15.8978 13.158 16.2794 13.4393 16.5607C13.7206 16.842 14.1022 17 14.5 17C14.8978 17 15.2794 16.842 15.5607 16.5607C15.842 16.2794 16 15.8978 16 15.5C16 15.1022 15.842 14.7206 15.5607 14.4393C15.2794 14.158 14.8978 14 14.5 14ZM8.41 17L17 8.41L15.59 7L7 15.59L8.41 17Z" fill="#23BE20"/>
                </svg>
            </span>
              {{ $t('Sale') }}
            </router-link>
          </li>
          <li
            v-if="isCurrentMenuShowed"
            @click="closeMenu"
            class="bg-cl-secondary"
          >
            <router-link
              class="block px25 py20 brdr-bottom-1 brdr-cl-secondary cl-accent no-underline fs-medium-small"
              :to="localizedRoute('/magazine')"
              exact
            >
              {{ $t('Magazine') }}
            </router-link>
          </li>
          <li
            v-if="compareIsActive && isCurrentMenuShowed"
            @click="closeMenu"
            class="bg-cl-secondary"
          >
            <router-link
              class="block px25 py20 brdr-bottom-1 brdr-cl-secondary cl-accent no-underline fs-medium-small"
              :to="localizedRoute('/compare')"
              exact
            >
              {{ $t('Compare products') }}
            </router-link>
          </li>
          <li
            @click="login"
            class="brdr-bottom-1 brdr-cl-secondary bg-cl-secondary flex"
          >
            <sub-btn
              v-if="currentUser"
              id="my-account-links"
              :is-category="false"
              :name="$t('My account')"
              class="bg-cl-transparent brdr-none fs-medium-small"
            />
            <sub-category
              v-if="currentUser"
              :my-account-links="myAccountLinks"
              id="my-account-links"
              @click.native="closeMenu"
            />
            <a
              v-if="!currentUser && isCurrentMenuShowed"
              href="#"
              @click.prevent="closeMenu"
              class="block w-100 px25 py20 cl-accent no-underline fs-medium-small"
            >
              {{ $t('My account') }}
            </a>
          </li>
          <li class="brdr-bottom-1 brdr-cl-secondary bg-cl-secondary flex">
            <router-link :to="{name : 'compare'}" class="block w-100 px25 py20 cl-accent no-underline fs-medium-small">
              {{$t('compare')}}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import i18n from '@vue-storefront/i18n';
import SidebarMenu from '@vue-storefront/core/compatibility/components/blocks/SidebarMenu/SidebarMenu';
import SubBtn from 'theme/components/core/blocks/SidebarMenu/SubBtn';
import SubCategory from 'theme/components/core/blocks/SidebarMenu/SubCategory';
import { formatCategoryLink } from '@vue-storefront/core/modules/url/helpers';
import {
  clearAllBodyScrollLocks,
  disableBodyScroll
} from 'body-scroll-lock';

export default {
  components: {
    SubCategory,
    SubBtn
  },
  mixins: [SidebarMenu],
  data () {
    return {
      myAccountLinks: [
        {
          id: 1,
          name: i18n.t('My profile'),
          url: '/my-account'
        },
        {
          id: 2,
          name: i18n.t('My shipping details'),
          url: '/my-account/shipping-details'
        },
        {
          id: 3,
          name: i18n.t('My newsletter'),
          url: '/my-account/newsletter'
        },
        {
          id: 4,
          name: i18n.t('My orders'),
          url: '/my-account/orders'
        },
        {
          id: 5,
          name: i18n.t('My loyalty card'),
          url: '#'
        },
        {
          id: 6,
          name: i18n.t('My product reviews'),
          url: '#'
        }
      ],
      ico: {
        3: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 4V20H17V4H7ZM6 2H18C18.2652 2 18.5196 2.10536 18.7071 2.29289C18.8946 2.48043 19 2.73478 19 3V21C19 21.2652 18.8946 21.5196 18.7071 21.7071C18.5196 21.8946 18.2652 22 18 22H6C5.73478 22 5.48043 21.8946 5.29289 21.7071C5.10536 21.5196 5 21.2652 5 21V3C5 2.73478 5.10536 2.48043 5.29289 2.29289C5.48043 2.10536 5.73478 2 6 2ZM12 17C12.2652 17 12.5196 17.1054 12.7071 17.2929C12.8946 17.4804 13 17.7348 13 18C13 18.2652 12.8946 18.5196 12.7071 18.7071C12.5196 18.8946 12.2652 19 12 19C11.7348 19 11.4804 18.8946 11.2929 18.7071C11.1054 18.5196 11 18.2652 11 18C11 17.7348 11.1054 17.4804 11.2929 17.2929C11.4804 17.1054 11.7348 17 12 17Z" fill="#BDBDBD"/>
            </svg>
            `,
        22: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 18V20H19V22H13C12.4696 22 11.9609 21.7893 11.5858 21.4142C11.2107 21.0391 11 20.5304 11 20V18H8C6.93913 18 5.92172 17.5786 5.17157 16.8284C4.42143 16.0783 4 15.0609 4 14V7C4 6.73478 4.10536 6.48043 4.29289 6.29289C4.48043 6.10536 4.73478 6 5 6H8V2H10V6H14V2H16V6H19C19.2652 6 19.5196 6.10536 19.7071 6.29289C19.8946 6.48043 20 6.73478 20 7V14C20 15.0609 19.5786 16.0783 18.8284 16.8284C18.0783 17.5786 17.0609 18 16 18H13ZM8 16H16C16.5304 16 17.0391 15.7893 17.4142 15.4142C17.7893 15.0391 18 14.5304 18 14V11H6V14C6 14.5304 6.21071 15.0391 6.58579 15.4142C6.96086 15.7893 7.46957 16 8 16ZM18 8H6V9H18V8Z" fill="#BDBDBD"/>
            </svg>`,
        18: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.31 2L14.72 4.48C13.87 4.17 12.96 4 12 4C11.05 4 10.13 4.17 9.29 4.47L9.7 2H14.31ZM14.72 19.52L14.31 22H9.7L9.29 19.53C10.13 19.83 11.05 20 12 20C12.96 20 13.87 19.83 14.72 19.52ZM16 0H8L7.05 5.73C5.19 7.19 4 9.45 4 12C4 14.55 5.19 16.81 7.05 18.27L8 24H16L16.96 18.27C18.81 16.81 20 14.54 20 12C20 9.46 18.81 7.19 16.96 5.73L16 0ZM12 18C8.69 18 6 15.31 6 12C6 8.69 8.69 6 12 6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18Z" fill="#BDBDBD"/>
              </svg>`,
        37: `<svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 2V13H19V2H3ZM1 1.007C1 0.451 1.455 0 1.992 0H20.008C20.556 0 21 0.449 21 1.007V15H1V1.007ZM0 16H22V18H0V16Z" fill="#BDBDBD"/>
              </svg>`,
        58: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.414 4.99999H21.008C21.556 4.99999 22 5.44499 22 5.99999V20C22 20.552 21.545 21 21.008 21H2.99202C2.86115 20.9997 2.73161 20.9736 2.61085 20.9232C2.4901 20.8727 2.38049 20.7989 2.28832 20.706C2.19615 20.6131 2.12324 20.5029 2.07376 20.3818C2.02429 20.2606 1.99923 20.1309 2.00002 20V5.99999C2.00002 5.44799 2.45502 4.99999 2.99202 4.99999H8.58602L6.05002 2.46399L7.46402 1.04999L11.414 4.99999H12.586L16.536 1.04999L17.95 2.46399L15.414 4.99999ZM4.00002 6.99999V19H20V6.99999H4.00002Z" fill="#BDBDBD"/>
              </svg>`,
        53: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 4C18.5913 4 20.1174 4.63214 21.2426 5.75736C22.3679 6.88258 23 8.4087 23 10V14C23 15.5913 22.3679 17.1174 21.2426 18.2426C20.1174 19.3679 18.5913 20 17 20H7C5.4087 20 3.88258 19.3679 2.75736 18.2426C1.63214 17.1174 1 15.5913 1 14V10C1 8.4087 1.63214 6.88258 2.75736 5.75736C3.88258 4.63214 5.4087 4 7 4H17ZM17 6H7C5.97376 6 4.98677 6.39444 4.24319 7.10172C3.4996 7.80901 3.05631 8.77504 3.005 9.8L3 10V14C3 15.0262 3.39444 16.0132 4.10172 16.7568C4.80901 17.5004 5.77504 17.9437 6.8 17.995L7 18H17C18.0262 18 19.0132 17.6056 19.7568 16.8983C20.5004 16.191 20.9437 15.225 20.995 14.2L21 14V10C21 8.97376 20.6056 7.98677 19.8983 7.24319C19.191 6.4996 18.225 6.05631 17.2 6.005L17 6ZM10 9V11H12V13H9.999L10 15H8L7.999 13H6V11H8V9H10ZM18 13V15H16V13H18ZM16 9V11H14V9H16Z" fill="#BDBDBD"/>
              </svg>`,
        51: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.81987 16H14.9999V15C14.9999 12.79 16.7899 11 18.9999 11H19.7399L17.8399 2.56C17.7386 2.11809 17.4907 1.72344 17.1367 1.44022C16.7827 1.15699 16.3432 1.00185 15.8899 1H11.9999V3H15.8899L17.2899 9.25H17.2799C16.2084 9.57295 15.2484 10.1888 14.5081 11.028C13.7678 11.8672 13.2766 12.8966 13.0899 14H7.81987C7.57957 13.3186 7.10111 12.747 6.47264 12.3905C5.84417 12.034 5.10804 11.9166 4.39987 12.06C3.21987 12.29 2.26987 13.26 2.04987 14.44C1.9678 14.8738 1.98244 15.3204 2.09275 15.748C2.20306 16.1755 2.40632 16.5735 2.68805 16.9134C2.96977 17.2534 3.32302 17.5271 3.72262 17.7149C4.12223 17.9027 4.55834 18 4.99987 18C6.29987 18 7.39987 17.16 7.81987 16ZM4.99987 16C4.44987 16 3.99987 15.55 3.99987 15C3.99987 14.45 4.44987 14 4.99987 14C5.54987 14 5.99987 14.45 5.99987 15C5.99987 15.55 5.54987 16 4.99987 16Z" fill="#BDBDBD"/>
                <path d="M19 12C17.34 12 16 13.34 16 15C16 16.66 17.34 18 19 18C20.66 18 22 16.66 22 15C22 13.34 20.66 12 19 12ZM19 16C18.45 16 18 15.55 18 15C18 14.45 18.45 14 19 14C19.55 14 20 14.45 20 15C20 15.55 19.55 16 19 16ZM11 20H7L13 23V21H17L11 18V20Z" fill="#BDBDBD"/>
              </svg>`,
        50: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.8998 2.10001L20.7988 3.51501L22.2128 13.415L13.0208 22.607C12.8333 22.7945 12.579 22.8998 12.3138 22.8998C12.0487 22.8998 11.7944 22.7945 11.6068 22.607L1.70685 12.707C1.51938 12.5195 1.41406 12.2652 1.41406 12C1.41406 11.7348 1.51938 11.4805 1.70685 11.293L10.8998 2.10001ZM11.6068 4.22201L3.82785 12L12.3138 20.485L20.0918 12.707L19.0318 5.28201L11.6068 4.22201ZM13.7268 10.586C13.3517 10.2107 13.141 9.70179 13.1411 9.17115C13.1411 8.90841 13.1929 8.64825 13.2935 8.40552C13.3941 8.1628 13.5415 7.94226 13.7273 7.75651C13.9132 7.57075 14.1338 7.42342 14.3765 7.32291C14.6193 7.22241 14.8795 7.1707 15.1422 7.17075C15.6728 7.17084 16.1817 7.38172 16.5568 7.75701C16.932 8.13229 17.1427 8.64123 17.1426 9.17186C17.1425 9.70249 16.9316 10.2114 16.5563 10.5865C16.1811 10.9617 15.6721 11.1724 15.1415 11.1723C14.6109 11.1722 14.102 10.9613 13.7268 10.586Z" fill="#23BE20"/>
              </svg>`,
        44: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.3607 7.4172C17.1629 7.4172 18.061 7.75284 18.8488 8.40526C16.0073 10.8918 16.5768 15.4628 19.6826 17.3734C19.4304 17.8969 19.2034 18.2935 18.8001 18.9073L18.7999 18.9077C18.3637 19.572 17.8837 20.2467 17.3559 20.7532C16.8219 21.2658 16.3594 21.4904 15.957 21.4963H15.9351C15.5408 21.4963 15.3134 21.3925 14.8517 21.1818C14.8244 21.1694 14.7962 21.1565 14.7672 21.1433C14.2152 20.8922 13.5194 20.6108 12.4082 20.6108H12.3801V20.6108L12.3745 20.6108C11.2557 20.617 10.5493 20.8969 9.98804 21.1458C9.95873 21.1588 9.9303 21.1715 9.90267 21.1838C9.42741 21.3951 9.18832 21.5014 8.78616 21.5014H8.76407C8.33406 21.4954 7.88092 21.2835 7.38069 20.8243C6.87758 20.3625 6.41724 19.7328 5.98559 19.0727L5.9854 19.0724C4.8381 17.3193 4.21165 15.4233 4.04481 13.7139C3.87629 11.9872 4.18271 10.5407 4.78393 9.61281C5.71827 8.17836 7.13568 7.42189 8.34366 7.42189C8.97631 7.42189 9.50168 7.59054 10.1257 7.81197C10.1649 7.82589 10.2049 7.84019 10.2457 7.85476C10.8171 8.05908 11.539 8.3172 12.3604 8.3172C13.1534 8.3172 13.8152 8.0639 14.3353 7.86481C14.3916 7.84326 14.4463 7.82234 14.4992 7.80245C15.0588 7.59236 15.5968 7.41611 16.3603 7.41533L16.3607 7.4172Z" stroke="#BDBDBD" stroke-width="2"/>
              <path d="M15.9491 1.5C14.8241 1.57641 13.5116 2.29266 12.7428 3.22781C12.0453 4.07531 11.4716 5.3325 11.6966 6.55172H11.7866C12.9847 6.55172 14.211 5.83031 14.9272 4.90594C15.6172 4.02609 16.1403 2.77922 15.9491 1.5V1.5Z" fill="#BDBDBD"/>
            </svg>`,
        598: `<svg width="34" height="24" viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9 1H7.5C6.12 1 5 2.12 5 3.5V20.5C5 21.88 6.12 23 7.5 23H15.5C16.88 23 18 21.88 18 20.5V10H16V18H7V4H9V1ZM10 20.5C10 21.33 10.67 22 11.5 22C12.33 22 13 21.33 13 20.5C13 19.67 12.33 19 11.5 19C10.67 19 10 19.67 10 20.5Z" fill="#BDBDBD"/>
                <path d="M15.9437 1V3.72636L13.6632 1H12V7.00136H13.9719V4.275L16.2524 7.00136H17.9155V1H15.9437Z" fill="#23BE20"/>
                <path d="M20.7111 5.47534V4.6865H23.2488V3.22905H20.7111V2.52602H23.6003V1H18.7222V7.00136H23.7118V5.47534H20.7111Z" fill="#23BE20"/>
                <path d="M32.0791 1L30.9732 4.45505L29.9272 1H28.0668L26.9608 4.41214L25.9148 1H23.8315L25.752 7.00136H27.9211L28.9413 3.79486L29.9101 7.00136H32.0791L33.9996 1H32.0791Z" fill="#23BE20"/>
              </svg>`,
        599: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0)">
                <path d="M14.739 4.69563L13.5 4.68248C13.6073 4.30957 13.7959 3.94342 14.0473 3.63404C14.2834 3.34365 14.7799 3.17224 15.4528 3.17224C15.831 3.17224 16.1376 2.54979 16.1376 2.17159C16.1376 1.79338 15.831 1.48683 15.4528 1.48683C13.74 1.48683 11.6919 3.0651 11.3829 4.68247C11.3507 4.6864 11.3187 4.69104 11.2866 4.69563H9.2608C5.10731 4.69563 1.5 8.07475 1.5 12.2282V14.9674C1.49996 19.1209 5.10731 22.5 9.26076 22.5H14.739C18.8925 22.5 22.5002 19.1209 22.5002 14.9674V12.2282C22.5002 8.07475 18.8925 4.69563 14.739 4.69563ZM20.5002 14.9674C20.5002 18.1778 18.4432 20.2173 15.3051 20.5C15.5431 20.2699 15.7593 20.0138 15.9488 19.7334C16.1605 19.42 16.0781 18.9944 15.7647 18.7827C15.4513 18.5709 15.0256 18.6534 14.8139 18.9668C14.1751 19.9123 13.1137 20.4768 11.9744 20.4768C10.8352 20.4768 9.7736 19.9123 9.13486 18.9667C8.92318 18.6535 8.49752 18.5711 8.18408 18.7827C7.87072 18.9944 7.78828 19.42 8 19.7334C8.18756 20.0111 8.4015 20.2649 8.63677 20.4932C5.53451 20.1753 3.50017 18.1521 3.50017 14.9674V12.2282C3.50017 9.08115 5.47758 6.91272 8.52713 6.5449C8.33481 6.74403 8.15799 6.96083 8 7.19466C7.78824 7.50802 7.87068 7.93368 8.18404 8.14541C8.49731 8.35725 8.9231 8.27473 9.13478 7.96137C9.66474 7.17703 10.4856 6.65523 11.4004 6.49998H12.5484C13.4631 6.65519 14.284 7.17695 14.8139 7.96137C15.0259 8.27497 15.4514 8.35705 15.7647 8.14545C16.0781 7.93372 16.1605 7.50806 15.9488 7.19466C15.7885 6.95735 15.6088 6.73759 15.4132 6.53608C18.4998 6.86908 20.5002 9.05477 20.5002 12.2282V14.9674Z" fill="#F6851F"/>
                <path d="M18.5394 14.3709C18.2368 14.1441 17.8076 14.2054 17.5807 14.5079L16.0741 16.5166L14.5676 14.5079C14.2937 14.1427 13.7454 14.1433 13.472 14.5079L11.9655 16.5166L10.459 14.5079C10.185 14.1427 9.63675 14.1433 9.36334 14.5079L7.85683 16.5166L6.35033 14.5079C6.12335 14.2053 5.6942 14.144 5.39163 14.3709C5.0891 14.5979 5.02774 15.0271 5.25468 15.3296L7.30903 18.0688C7.58297 18.434 8.13127 18.4333 8.40468 18.0688L9.91118 16.0601L11.4177 18.0688C11.6916 18.434 12.2399 18.4333 12.5133 18.0688L14.0198 16.0601L15.5263 18.0688C15.8003 18.434 16.3486 18.4333 16.622 18.0688L18.6763 15.3296C18.9032 15.0271 18.8419 14.5978 18.5394 14.3709Z" fill="#F6851F"/>
                <path d="M11.0806 11.6954L8.34146 8.95624C8.18589 8.80054 7.96473 8.72934 7.74756 8.76449C7.53026 8.79972 7.34323 8.93733 7.24475 9.13425L5.87521 11.8734C5.64803 12.3276 5.97882 12.8644 6.48773 12.8644H10.5964C11.2041 12.8643 11.5117 12.1265 11.0806 11.6954ZM7.59572 11.4993L8.04488 10.5964L8.94319 11.4993H7.59572Z" fill="#F6851F"/>
                <path d="M18.0564 11.8734L16.6868 9.13424C16.4781 8.71674 15.9207 8.62601 15.5902 8.95627L12.851 11.6954C12.4213 12.1251 12.7255 12.8644 13.3352 12.8644H17.4439C17.952 12.8644 18.284 12.3285 18.0564 11.8734ZM14.9884 11.4994L15.8867 10.5965L16.3359 11.4994H14.9884Z" fill="#F6851F"/>
                </g>
                <defs>
                <clipPath id="clip0">
                <rect width="21" height="21" fill="white" transform="translate(1.5 1.5)"/>
                </clipPath>
                </defs>
              </svg>`,
        600: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M23 12L20.56 9.21998L20.9 5.53998L17.29 4.71998L15.4 1.53998L12 2.99998L8.6 1.53998L6.71 4.71998L3.1 5.52998L3.44 9.20998L1 12L3.44 14.78L3.1 18.47L6.71 19.29L8.6 22.47L12 21L15.4 22.46L17.29 19.28L20.9 18.46L20.56 14.78L23 12ZM18.49 14.11L18.75 16.9L16.01 17.52L14.58 19.93L12 18.82L9.42 19.93L7.99 17.52L5.25 16.9L5.51 14.1L3.66 12L5.51 9.87998L5.25 7.09998L7.99 6.48998L9.42 4.07998L12 5.17998L14.58 4.06998L16.01 6.47998L18.75 7.09998L18.49 9.88998L20.34 12L18.49 14.11Z" fill="#23BE20"/>
                <path d="M9.5 7C9.10218 7 8.72064 7.15804 8.43934 7.43934C8.15804 7.72064 8 8.10218 8 8.5C8 8.89782 8.15804 9.27936 8.43934 9.56066C8.72064 9.84196 9.10218 10 9.5 10C9.89782 10 10.2794 9.84196 10.5607 9.56066C10.842 9.27936 11 8.89782 11 8.5C11 8.10218 10.842 7.72064 10.5607 7.43934C10.2794 7.15804 9.89782 7 9.5 7ZM14.5 14C14.1022 14 13.7206 14.158 13.4393 14.4393C13.158 14.7206 13 15.1022 13 15.5C13 15.8978 13.158 16.2794 13.4393 16.5607C13.7206 16.842 14.1022 17 14.5 17C14.8978 17 15.2794 16.842 15.5607 16.5607C15.842 16.2794 16 15.8978 16 15.5C16 15.1022 15.842 14.7206 15.5607 14.4393C15.2794 14.158 14.8978 14 14.5 14ZM8.41 17L17 8.41L15.59 7L7 15.59L8.41 17Z" fill="#23BE20"/>
              </svg>`,
        830: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.8998 2.10001L20.7988 3.51501L22.2128 13.415L13.0208 22.607C12.8333 22.7945 12.579 22.8998 12.3138 22.8998C12.0487 22.8998 11.7944 22.7945 11.6068 22.607L1.70685 12.707C1.51938 12.5195 1.41406 12.2652 1.41406 12C1.41406 11.7348 1.51938 11.4805 1.70685 11.293L10.8998 2.10001ZM11.6068 4.22201L3.82785 12L12.3138 20.485L20.0918 12.707L19.0318 5.28201L11.6068 4.22201ZM13.7268 10.586C13.3517 10.2107 13.141 9.70179 13.1411 9.17115C13.1411 8.90841 13.1929 8.64825 13.2935 8.40552C13.3941 8.1628 13.5415 7.94226 13.7273 7.75651C13.9132 7.57075 14.1338 7.42342 14.3765 7.32291C14.6193 7.22241 14.8795 7.1707 15.1422 7.17075C15.6728 7.17084 16.1817 7.38172 16.5568 7.75701C16.932 8.13229 17.1427 8.64123 17.1426 9.17186C17.1425 9.70249 16.9316 10.2114 16.5563 10.5865C16.1811 10.9617 15.6721 11.1724 15.1415 11.1723C14.6109 11.1722 14.102 10.9613 13.7268 10.586Z" fill="#23BE20"/>
              </svg> `,
        843: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.55 4L2.80005 4.00001V20H4.80005V6H11.55C12.7905 6 13.8 7.00951 13.8 8.25001V20L15.8 20V8.5C15.8 5.605 14.445 4 11.55 4Z" fill="#BDBDBD"/>
                <path d="M10.3 10H8.30005V20H10.3V10Z" fill="#BDBDBD"/>
                <path d="M21.3 4H19.3V20H21.3V4Z" fill="#BDBDBD"/>
              </svg>`,
        869: `<svg width="24" height="24" viewBox="0 0 24 24" fill="rgb(189, 189, 189)" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6H16C16 3.79 14.21 2 12 2C9.79 2 8 3.79 8 6H6C4.9 6 4 6.9 4 8V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8C20 6.9 19.1 6 18 6ZM12 4C13.1 4 14 4.9 14 6H10C10 4.9 10.9 4 12 4ZM18 20H6V8H8V10C8 10.55 8.45 11 9 11C9.55 11 10 10.55 10 10V8H14V10C14 10.55 14.45 11 15 11C15.55 11 16 10.55 16 10V8H18V20Z" />
              </svg>`,
        907: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 14V17C19 17.55 18.55 18 18 18H17V14H19ZM7 14V18H6C5.45 18 5 17.55 5 17V14H7ZM12 1C7.03 1 3 5.03 3 10V17C3 18.66 4.34 20 6 20H9V12H5V10C5 6.13 8.13 3 12 3C15.87 3 19 6.13 19 10V12H15V20H18C19.66 20 21 18.66 21 17V10C21 5.03 16.97 1 12 1Z" fill="#BDBDBD"/>
              </svg>`,
        906: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.414 4.99999H21.008C21.556 4.99999 22 5.44499 22 5.99999V20C22 20.552 21.545 21 21.008 21H2.99202C2.86115 20.9997 2.73161 20.9736 2.61085 20.9232C2.4901 20.8727 2.38049 20.7989 2.28832 20.706C2.19615 20.6131 2.12324 20.5029 2.07376 20.3818C2.02429 20.2606 1.99923 20.1309 2.00002 20V5.99999C2.00002 5.44799 2.45502 4.99999 2.99202 4.99999H8.58602L6.05002 2.46399L7.46402 1.04999L11.414 4.99999H12.586L16.536 1.04999L17.95 2.46399L15.414 4.99999ZM4.00002 6.99999V19H20V6.99999H4.00002Z" fill="#BDBDBD"/>
              </svg>`
      },
      componentLoaded: false
    }
  },
  computed: {
    mainListStyles () {
      return this.submenu.depth ? `transform: translateX(${this.submenu.depth * 100}%)` : false
    },
    ...mapState({
      submenu: state => state.ui.submenu,
      currentUser: state => state.user.current
    }),
    getSubmenu () {
      return this.submenu
    },
    visibleCategories () {
      return this.categories.filter(category => {
        return (category.product_count > 0 || category.children_count > 0) && category.include_in_menu
      })
    },
    isCurrentMenuShowed () {
      return !this.getSubmenu || !this.getSubmenu.depth
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.componentLoaded = true;
      disableBodyScroll(this.$refs.container)
    })
  },
  destroyed () {
    clearAllBodyScrollLocks()
  },
  methods: {
    login () {
      if (!this.currentUser && this.isCurrentMenuShowed) {
        this.$nextTick(() => {
          this.$store.commit('ui/setAuthElem', 'login')
          this.$bus.$emit('modal-show', 'modal-signup')
          this.$router.push({ name: 'my-account' })
        })
      }
    },
    categoryLink (category) {
      return formatCategoryLink(category)
    },
    isShowChildrenCategories(category) {
      return category.children_data && category.children_data.length && category.children_data.some(it => it.include_in_menu)
    }
  }
}
</script>

<style lang="scss">
  .sidebar-menu {
    a {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 700;
      font-size: 14px;
      line-height: 14px;
      color: #595858;
      display: flex;
      align-items: center;

      span {
        display: flex;
        align-items: center;
        width: 25px;
        margin-right: 10px;
      }
    }
  }
</style>

<style lang="scss" scoped>
@import "~theme/css/animations/transitions";
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$bg-secondary: color(secondary, $colors-background);
$color-gainsboro: color(gainsboro);
$color-matterhorn: color(matterhorn);
$color-mine-shaft: color(mine-shaft);

.sidebar-menu {
  height: 100%;
  width: 350px;
  overflow: hidden;

  a {
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 14px;
    color: #595858;
    display: flex;
    align-items: center;

    span {
      display: block;
      width: 25px;
      margin-right: 10px;
    }
  }

  @media (max-width: 767px) {
    width: 100vh;
  }

  &__container {
    -webkit-overflow-scrolling: touch;
    height: 100%;
  }

  &__list {
    transition: transform $duration-main $motion-main;
  }

  ul {
    list-style-type: none;
  }

  li {
    &:hover,
    &:focus {
      background-color: $color-gainsboro;
    }
    &.bg-cl-primary {
      &:hover,
      &:focus {
        background-color: $bg-secondary;
      }
    }
    a {
      color: $color-mine-shaft;
    }
  }

  .subcategory-item {
    display: flex;
    width: 100%;
  }

  .sidebar-wrapper {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    button {
      display: flex;
      align-items: center;
    }
  }

  button {
    color: $color-mine-shaft;a {
      color: $color-mine-shaft;
    }
  }

  .close-btn {
    i {
      color: $color-gainsboro;
    }
    &:hover,
    &:focus {
      i {
        color: $color-matterhorn;
      }
    }
  }

}

.back-button {
  button {
    background: #fff;
  }
}

.sale-item {
  background-color: #fff;

  &:hover {
    background-color: #f2f2f2;
  }
}
</style>
