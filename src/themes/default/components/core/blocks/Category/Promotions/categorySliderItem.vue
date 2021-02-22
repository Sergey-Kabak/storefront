<template>
  <div class="gradient-wrapper" @click="changeFilter(variant)">
    <div class="category-filter-item" :class="{ 'active': isActive }">
      <div class="category-filter-icon" v-if="icon[variant.id]" v-html="icon[variant.id]"></div>
      <div class="category-filter-label">{{variant.label}}</div>
    </div>
  </div>
</template>

<script>
import filterMixin from 'theme/mixins/filterMixin.ts';
import { mapGetters } from 'vuex';

export default {
  mixins: [filterMixin],
  data () {
    return {
      icon: {
        8269: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M27.4962 23.7102C27.081 24.6781 26.5681 25.6011 25.9654 26.4647C25.1602 27.6148 24.499 28.4095 23.9923 28.8519C23.2051 29.5746 22.3595 29.9465 21.4554 29.9675C20.8076 29.9675 20.025 29.7831 19.1134 29.4082C18.1988 29.0348 17.3592 28.8519 16.59 28.8519C15.7848 28.8519 14.9212 29.0348 13.9961 29.4082C13.0725 29.7831 12.3259 29.9795 11.7546 29.9975C10.8895 30.035 10.0244 29.6541 9.16224 28.8519C8.61198 28.3721 7.92378 27.5473 7.09764 26.3808C6.21303 25.1377 5.48585 23.6907 4.9161 22.0458C4.30587 20.2659 4 18.5445 4 16.8771C4 14.9683 4.41232 13.3203 5.23846 11.9408C5.86331 10.8574 6.75662 9.95318 7.83232 9.31525C8.89306 8.67898 10.104 8.33638 11.3408 8.3226C12.0305 8.3226 12.9346 8.53553 14.0546 8.95538C15.1746 9.37523 15.8943 9.58816 16.2077 9.58816C16.4446 9.58816 17.2407 9.33774 18.5961 8.84142C19.8751 8.38108 20.9546 8.19065 21.8392 8.26562C24.2381 8.45905 26.0389 9.40372 27.2368 11.1071C25.0928 12.4072 24.0327 14.226 24.0537 16.5607C24.0717 18.3796 24.7329 19.8925 26.0284 21.0936C26.6011 21.6417 27.2693 22.0803 28 22.3877C27.8411 22.848 27.6731 23.2873 27.4962 23.7102ZM21.9981 2.0713C21.9981 3.4958 21.4764 4.82733 20.4403 6.0584C19.1869 7.52188 17.6725 8.36909 16.0307 8.23563C16.0093 8.0565 15.9987 7.87623 15.9993 7.69582C15.9993 6.3268 16.593 4.86332 17.653 3.66524C18.1808 3.05945 18.8525 2.55413 19.6666 2.15227C20.4793 1.75641 21.247 1.53749 21.9696 1.5C21.9891 1.69193 21.9981 1.88237 21.9981 2.0713Z" fill="url(#paint0_linear)"/>
              <defs>
              <linearGradient id="paint0_linear" x1="16" y1="1.5" x2="16" y2="30" gradientUnits="userSpaceOnUse">
              <stop stop-color="#EE2C39"/>
              <stop offset="0.557292" stop-color="#FF5D81"/>
              </linearGradient>
              </defs>
              </svg>`,
        8250: `<svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" viewBox="0 0 33 32" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3281 5.33002C5.90985 5.33002 2.32812 8.91174 2.32812 13.33V18.66C2.32812 23.0783 5.90984 26.66 10.3281 26.66H23.6581C28.0764 26.66 31.6581 23.0783 31.6581 18.66V13.33C31.6581 8.91174 28.0764 5.33002 23.6581 5.33002H10.3281ZM11.3281 11.9999H13.3281V14.9999H16.3281V16.9999H13.3281V19.9999H11.3281V16.9999H8.32812V14.9999H11.3281V11.9999ZM20.6582 11.9999H23.6582V14.9999H20.6582V11.9999ZM25.6582 16.9999H22.6582V19.9999H25.6582V16.9999Z" fill="url(#paint1_linear)"/>
              <defs>
              <linearGradient id="paint1_linear" x1="16.9931" y1="5.33002" x2="16.9931" y2="26.66" gradientUnits="userSpaceOnUse">
              <stop stop-color="#EE2C39"/>
              <stop offset="0.557292" stop-color="#FF5D81"/>
              </linearGradient>
              </defs>
              </svg>`,
        8257: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M26.6673 16C26.6673 12.6133 25.0806 9.58667 22.614 7.64L21.334 0H10.6673L9.40065 7.64C6.92065 9.58667 5.33398 12.6 5.33398 16C5.33398 19.4 6.92065 22.4133 9.40065 24.36L10.6673 32H21.334L22.614 24.36C25.0806 22.4133 26.6673 19.3867 26.6673 16ZM8.00065 16C8.00065 11.5867 11.5873 8 16.0007 8C20.414 8 24.0007 11.5867 24.0007 16C24.0007 20.4133 20.414 24 16.0007 24C11.5873 24 8.00065 20.4133 8.00065 16Z" fill="url(#paint2_linear)"/>
              <defs>
              <linearGradient id="paint2_linear" x1="16.0007" y1="0" x2="16.0007" y2="32" gradientUnits="userSpaceOnUse">
              <stop stop-color="#EE2C39"/>
              <stop offset="0.557292" stop-color="#FF5D81"/>
              </linearGradient>
              </defs>
              </svg>`,
        8263: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.69922 2.70001C7.59465 2.70001 6.69922 3.59544 6.69922 4.70001V27.3C6.69922 28.4046 7.59465 29.3 8.69922 29.3H23.2992C24.4038 29.3 25.2992 28.4046 25.2992 27.3V4.70001C25.2992 3.59544 24.4038 2.70001 23.2992 2.70001H8.69922ZM16 25.2C17.1046 25.2 18 24.3046 18 23.2C18 22.0954 17.1046 21.2 16 21.2C14.8954 21.2 14 22.0954 14 23.2C14 24.3046 14.8954 25.2 16 25.2Z" fill="url(#paint3_linear)"/>
            <defs>
            <linearGradient id="paint3_linear" x1="15.9992" y1="2.70001" x2="15.9992" y2="29.3" gradientUnits="userSpaceOnUse">
            <stop stop-color="#EE2C39"/>
            <stop offset="0.557292" stop-color="#FF5D81"/>
            </linearGradient>
            </defs>
            </svg>`,
        8259: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="9.60156" y="4.21423" width="2" height="8" transform="rotate(-45 9.60156 4.21423)" fill="url(#tv0_linear)"/>
              <rect width="2" height="8" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 22.6016 4.21423)" fill="url(#tv1_linear)"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2.80078 10.4C2.80078 9.29545 3.69621 8.40002 4.80078 8.40002H27.4008C28.5054 8.40002 29.4008 9.29545 29.4008 10.4V27.4C29.4008 28.5046 28.5054 29.4 27.4008 29.4H4.80078C3.69621 29.4 2.80078 28.5046 2.80078 27.4V10.4ZM26.4004 13.4C26.4004 14.5046 25.505 15.4 24.4004 15.4C23.2958 15.4 22.4004 14.5046 22.4004 13.4C22.4004 12.2954 23.2958 11.4 24.4004 11.4C25.505 11.4 26.4004 12.2954 26.4004 13.4ZM24.4004 21.4C25.505 21.4 26.4004 20.5046 26.4004 19.4C26.4004 18.2954 25.505 17.4 24.4004 17.4C23.2958 17.4 22.4004 18.2954 22.4004 19.4C22.4004 20.5046 23.2958 21.4 24.4004 21.4Z" fill="url(#tv2_linear)"/>
              <defs>
              <linearGradient id="tv0_linear" x1="10.6016" y1="4.21423" x2="10.6016" y2="12.2142" gradientUnits="userSpaceOnUse">
              <stop stop-color="#EE2C39"/>
              <stop offset="0.557292" stop-color="#FF5D81"/>
              </linearGradient>
              <linearGradient id="tv1_linear" x1="1" y1="0" x2="1" y2="8" gradientUnits="userSpaceOnUse">
              <stop stop-color="#EE2C39"/>
              <stop offset="0.557292" stop-color="#FF5D81"/>
              </linearGradient>
              <linearGradient id="tv2_linear" x1="16.1008" y1="8.40002" x2="16.1008" y2="29.4" gradientUnits="userSpaceOnUse">
              <stop stop-color="#EE2C39"/>
              <stop offset="0.557292" stop-color="#FF5D81"/>
              </linearGradient>
              </defs>
              </svg>`,
        8252: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M29.3335 10.8333C28.2989 10.8593 27.2764 10.6059 26.3735 10.1C25.6524 9.68614 24.8314 9.47857 24.0002 9.5V8.16667C25.0348 8.14075 26.0573 8.39407 26.9602 8.9C27.6813 9.31386 28.5024 9.52143 29.3335 9.5V10.8333ZM29.3335 6.83333C28.5024 6.85476 27.6813 6.64719 26.9602 6.23333C26.0573 5.7274 25.0348 5.47408 24.0002 5.5V6.83333C24.8314 6.81191 25.6524 7.01948 26.3735 7.43333C27.2764 7.93926 28.2989 8.19259 29.3335 8.16667V6.83333ZM29.3335 12.1667C28.5024 12.1881 27.6813 11.9805 26.9602 11.5667C26.0573 11.0607 25.0348 10.8074 24.0002 10.8333V12.1667C24.8314 12.1452 25.6524 12.3528 26.3735 12.7667C27.2764 13.2726 28.2989 13.5259 29.3335 13.5V12.1667ZM13.3335 15.8067C16.482 15.1977 19.5972 14.4278 22.6669 13.5V4.16667C22.6669 4.16667 14.0002 1.5 10.0002 1.5C8.21954 1.50501 6.50152 2.15776 5.16677 3.33642C3.83202 4.51509 2.97173 6.13915 2.74644 7.90552C2.52116 9.67188 2.94627 11.4599 3.94245 12.9358C4.93862 14.4118 6.4378 15.4749 8.16021 15.9267L9.33354 24.1667H10.6669C10.7202 24.8022 10.9247 25.4157 11.2633 25.9562C11.602 26.4966 12.0649 26.9482 12.6135 27.2733C13.2321 27.6411 13.7458 28.1616 14.1054 28.785C14.4649 29.4084 14.6583 30.1137 14.6669 30.8333H16.0002C15.9942 29.9148 15.7579 29.0125 15.313 28.2089C14.8681 27.4052 14.2288 26.726 13.4535 26.2333C12.5202 25.5 12.0002 25.0067 12.0002 24.1667H13.3335V15.8067ZM10.0002 12.1667C9.34094 12.1667 8.69647 11.9712 8.14831 11.6049C7.60014 11.2386 7.1729 10.718 6.92061 10.1089C6.66832 9.49986 6.60231 8.82964 6.73092 8.18303C6.85954 7.53643 7.17701 6.94249 7.64319 6.47631C8.10936 6.01014 8.70331 5.69267 9.34991 5.56405C9.99651 5.43543 10.6667 5.50144 11.2758 5.75373C11.8849 6.00603 12.4055 6.43327 12.7718 6.98143C13.138 7.5296 13.3335 8.17406 13.3335 8.83333C13.3335 9.71739 12.9824 10.5652 12.3572 11.1904C11.7321 11.8155 10.8843 12.1667 10.0002 12.1667Z" fill="url(#paint6_linear)"/>
              <defs>
              <linearGradient id="paint6_linear" x1="16.0105" y1="1.5" x2="16.0105" y2="30.8333" gradientUnits="userSpaceOnUse">
              <stop stop-color="#EE2C39"/>
              <stop offset="0.557292" stop-color="#FF5D81"/>
              </linearGradient>
              </defs>
              </svg>`,
        8255: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 4C9.37333 4 4 9.37333 4 16V25.3333C4 26.8 5.2 28 6.66667 28H12V17.3333H6.66667V16C6.66667 10.84 10.84 6.66667 16 6.66667C21.16 6.66667 25.3333 10.84 25.3333 16V17.3333H20V28H25.3333C26.8 28 28 26.8 28 25.3333V16C28 9.37333 22.6267 4 16 4Z" fill="url(#paint7_linear)"/>
            <defs>
            <linearGradient id="paint7_linear" x1="16" y1="4" x2="16" y2="28" gradientUnits="userSpaceOnUse">
            <stop stop-color="#EE2C39"/>
            <stop offset="0.557292" stop-color="#FF5D81"/>
            </linearGradient>
            </defs>
            </svg>`,
        9002: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16.7195 2.63H10.373V4.50188H16.7195V2.63Z" fill="url(#paint9_linear)"/>
              <path d="M24.9425 6.34307V5.77724H22.0936V5.49284H17.5105H5V13.4699H17.5105H22.0936V7.68529H24.9425V7.46926C25.4549 7.84978 26.1044 8.76095 25.935 10.9286C25.6392 14.715 23.1485 16.4179 21.4743 16.4179C20.3075 16.4179 18.17 15.7654 16.7198 15.2714V14.2557H10.3733V16.1276H12.8626V20.3816H12.0599V29.3H15.0327V20.3816H14.2301V16.1276H16.1604C17.6631 16.6483 20.0939 17.4088 21.4738 17.4088C23.5285 17.4088 26.5776 15.4225 26.9224 11.0064C27.1845 7.65704 25.7061 6.64282 24.9425 6.34307ZM19.8021 10.4723C19.2551 10.4723 18.8111 10.0284 18.8111 9.48135C18.8111 8.93436 19.2551 8.49042 19.8021 8.49042C20.3491 8.49042 20.793 8.93436 20.793 9.48135C20.793 10.0284 20.3491 10.4723 19.8021 10.4723Z" fill="url(#paint10_linear)"/>
              <defs>
              <linearGradient id="paint9_linear" x1="13.5463" y1="2.63" x2="13.5463" y2="4.50188" gradientUnits="userSpaceOnUse">
              <stop stop-color="#EE2C39"/>
              <stop offset="0.557292" stop-color="#FF5D81"/>
              </linearGradient>
              <linearGradient id="paint10_linear" x1="15.9766" y1="5.49284" x2="15.9766" y2="29.3" gradientUnits="userSpaceOnUse">
              <stop stop-color="#EE2C39"/>
              <stop offset="0.557292" stop-color="#FF5D81"/>
              </linearGradient>
              </defs>
              </svg>`,
        8251: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16.6714 11.5254L17.9971 10.1997C17.6895 9.89114 17.022 9.37483 16.0122 9.37483C15.0024 9.37483 14.335 9.89121 14.0273 10.1997L15.353 11.5254C15.4565 11.4228 15.679 11.2498 16.0122 11.2498C16.3455 11.2498 16.568 11.4229 16.6714 11.5254Z" fill="url(#a0_linear)"/>
              <path d="M11.373 7.54842L12.6987 8.8741C14.4712 7.10167 17.5501 7.10167 19.3244 8.8741L20.6501 7.54842C18.1672 5.0673 13.8542 5.0673 11.373 7.54842Z" fill="url(#a1_linear)"/>
              <path d="M16 20.6874C16.5178 20.6874 16.9375 20.2676 16.9375 19.7499C16.9375 19.2321 16.5178 18.8124 16 18.8124C15.4822 18.8124 15.0625 19.2321 15.0625 19.7499C15.0625 20.2676 15.4822 20.6874 16 20.6874Z" fill="url(#a2_linear)"/>
              <path d="M11.3125 26.3124H20.6875V13.1874H11.3125V26.3124ZM16 16.9374C17.5509 16.9374 18.8125 18.199 18.8125 19.7499C18.8125 21.3007 17.5509 22.5624 16 22.5624C14.4491 22.5624 13.1875 21.3007 13.1875 19.7499C13.1875 18.199 14.4491 16.9374 16 16.9374Z" fill="url(#a3_linear)"/>
              <path d="M25.375 13.1874H22.5625V26.3124H25.375C28.9932 26.3124 32 23.3681 32 19.7499C32 16.1317 28.9932 13.1874 25.375 13.1874Z" fill="url(#a4_linear)"/>
              <path d="M6.5625 26.3124H9.4375V13.1874H6.5625C2.94431 13.1874 0 16.1317 0 19.7499C0 23.3681 2.94431 26.3124 6.5625 26.3124Z" fill="url(#a5_linear)"/>
              <defs>
              <linearGradient id="a0_linear" x1="16.0122" y1="9.37483" x2="16.0122" y2="11.5254" gradientUnits="userSpaceOnUse">
              <stop stop-color="#EE2C39"/>
              <stop offset="0.557292" stop-color="#FF5D81"/>
              </linearGradient>
              <linearGradient id="a1_linear" x1="16.0116" y1="5.68758" x2="16.0116" y2="8.8741" gradientUnits="userSpaceOnUse">
              <stop stop-color="#EE2C39"/>
              <stop offset="0.557292" stop-color="#FF5D81"/>
              </linearGradient>
              <linearGradient id="a2_linear" x1="16" y1="18.8124" x2="16" y2="20.6874" gradientUnits="userSpaceOnUse">
              <stop stop-color="#EE2C39"/>
              <stop offset="0.557292" stop-color="#FF5D81"/>
              </linearGradient>
              <linearGradient id="a3_linear" x1="16" y1="13.1874" x2="16" y2="26.3124" gradientUnits="userSpaceOnUse">
              <stop stop-color="#EE2C39"/>
              <stop offset="0.557292" stop-color="#FF5D81"/>
              </linearGradient>
              <linearGradient id="a4_linear" x1="27.2812" y1="13.1874" x2="27.2812" y2="26.3124" gradientUnits="userSpaceOnUse">
              <stop stop-color="#EE2C39"/>
              <stop offset="0.557292" stop-color="#FF5D81"/>
              </linearGradient>
              <linearGradient id="a5_linear" x1="4.71875" y1="13.1874" x2="4.71875" y2="26.3124" gradientUnits="userSpaceOnUse">
              <stop stop-color="#EE2C39"/>
              <stop offset="0.557292" stop-color="#FF5D81"/>
              </linearGradient>
              </defs>
              </svg>`,
        9003: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M26.6673 16C26.6673 12.6133 25.0806 9.58667 22.614 7.64L21.334 0H10.6673L9.40065 7.64C6.92065 9.58667 5.33398 12.6 5.33398 16C5.33398 19.4 6.92065 22.4133 9.40065 24.36L10.6673 32H21.334L22.614 24.36C25.0806 22.4133 26.6673 19.3867 26.6673 16ZM8.00065 16C8.00065 11.5867 11.5873 8 16.0007 8C20.414 8 24.0007 11.5867 24.0007 16C24.0007 20.4133 20.414 24 16.0007 24C11.5873 24 8.00065 20.4133 8.00065 16Z" fill="url(#paint11_linear)"/>
              <defs>
              <linearGradient id="paint11_linear" x1="16.0007" y1="0" x2="16.0007" y2="32" gradientUnits="userSpaceOnUse">
              <stop stop-color="#EE2C39"/>
              <stop offset="0.557292" stop-color="#FF5D81"/>
              </linearGradient>
              </defs>
              </svg>`,
        9004: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M25.3327 26.6667H18.666H13.3327H6.66602V16H2.66602L15.9993 4L29.3327 16H25.3327V26.6667ZM8.90039 16.9325L10.1904 18.2225C13.3804 15.0325 18.5704 15.0325 21.7604 18.2225L23.0504 16.9325C19.1404 13.0225 12.8004 13.0225 8.90039 16.9325ZM15.9704 24.0025L17.9004 22.0725C16.8304 21.0125 15.1104 21.0125 14.0404 22.0725L15.9704 24.0025ZM12.7604 20.7925C14.5304 19.0225 17.4104 19.0225 19.1904 20.7925L20.4704 19.5025C17.9904 17.0225 13.9504 17.0225 11.4704 19.5025L12.7604 20.7925Z" fill="url(#paint12_linear)"/>
              <defs>
              <linearGradient id="paint12_linear" x1="15.9993" y1="4" x2="15.9993" y2="26.6667" gradientUnits="userSpaceOnUse">
              <stop stop-color="#EE2C39"/>
              <stop offset="0.557292" stop-color="#FF5D81"/>
              </linearGradient>
              </defs>
              </svg>`
      }
    }
  },
  computed: {
    ...mapGetters({
      getAvailableFilters: 'category-next/getAvailableFilters'
    })
  },
  methods: {
    async changeFilter (filterVariant) {
      this.$store.dispatch('category-next/switchSearchFilters', [filterVariant])
    }
  }
}
</script>

<style lang="scss" scoped>
.gradient-wrapper{
  background: linear-gradient(180deg, #EE2C39 0%, #FF5D81 55.73%);
  border-radius: 4px;
  padding: 1px;
  margin: 0 auto;
  cursor: pointer;
  width: 138px;
  height: 100px;
}
.category-filter {
  &-item{
    &:not(.active):hover{
      background: #fef2f3;
    }
    &.active{
      background: linear-gradient(180deg, #EE2C39 0%, #FF5D81 55.73%);
      .category-filter-label{
        color: #fff;
      }
      category-filter-icon{
        fill: #fff;
      }
      ::v-deep svg path {
        fill: #fff;
      }
    }
    padding: 12px;
    background: #fff;
    display: flex;
    flex-direction: column;
    height: 100%;
    border-radius: 4px;
  }
  &-icon{
    margin-bottom: auto;
  }
  &-label{
    font-family: DIN Pro;
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 20px;
    color: #1A1919;
    margin-top: auto;
  }
}
</style>
