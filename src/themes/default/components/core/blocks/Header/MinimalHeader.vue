<template>
  <div class="header-wrapper">
    <header class="header">
      <router-link
        :to="localizedRoute('/')"
        class="return-to-shopping__link"
      >
        <svg class="arrow" width="24" height="24" viewBox="0 0 24 24" fill="#828282" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.2929 6.29297L7.58594 12L13.2929 17.707L14.7069 16.293L10.4139 12L14.7069 7.70697L13.2929 6.29297Z" />
        </svg>
        <span class="return-to-shopping__text">{{ $t('Return to shopping') }}</span>
      </router-link>
      <logo width="auto" height="41px" />
      <div class="header-help">
        <div class="header-help-desktop">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.54 2C3.6 2.89 3.75 3.76 3.99 4.59L2.79 5.79C2.38 4.59 2.12 3.32 2.03 2H3.54ZM13.4 14.02C14.25 14.26 15.12 14.41 16 14.47V15.96C14.68 15.87 13.41 15.61 12.2 15.21L13.4 14.02ZM4.5 0H1C0.45 0 0 0.45 0 1C0 10.39 7.61 18 17 18C17.55 18 18 17.55 18 17V13.51C18 12.96 17.55 12.51 17 12.51C15.76 12.51 14.55 12.31 13.43 11.94C13.33 11.9 13.22 11.89 13.12 11.89C12.86 11.89 12.61 11.99 12.41 12.18L10.21 14.38C7.38 12.93 5.06 10.62 3.62 7.79L5.82 5.59C6.1 5.31 6.18 4.92 6.07 4.57C5.7 3.45 5.5 2.25 5.5 1C5.5 0.45 5.05 0 4.5 0Z" fill="#787878" />
          </svg>
          <span class="header-help-text">{{ $t('Need help?') }}</span>
          <phone-info />
        </div>
        <div class="header-help-mobile">
          <microcart-icon class="icon pointer icon-microcart" />
          <consultation-icon class="icon icon-consultation" />
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import CurrentPage from 'theme/mixins/currentPage';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import Logo from 'theme/components/core/Logo';
import config from 'config';
import PhoneInfo from 'theme/components/core/PhoneInfo';
import MicrocartIcon from 'theme/components/core/blocks/Header/MicrocartIcon';
import ConsultationIcon from 'theme/components/core/blocks/Header/ConsultationIcon';

export default {
  mixins: [CurrentPage],
  components: {
    Logo,
    PhoneInfo,
    MicrocartIcon,
    ConsultationIcon
  },
  data () {
    const storeView = currentStoreView()
    return {
      navVisible: true,
      defaultTitle: storeView.seo.defaultTitle ? storeView.seo.defaultTitle : config.seo.defaultTitle
    }
  }
}
</script>

<style lang="scss" scoped>
.arrow {
  margin-right: 12px;

  @media only screen and (max-width: 600px) {
    margin-right: 2px;
  }
}
.header-wrapper {
  width: 100%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  height: 67px;
  margin-bottom: 16px;

  @media only screen and (max-width: 600px) {
    height: 56px;
  }
}

.header {
  height: 100%;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  width: 90%;
  max-width: 1157px;
  margin: auto;
}

.header-help {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;

  svg {
    margin-right: 15px;
  }

  &-text {
    font-family: DIN Pro;
    font-style: normal;
    font-size: 15px;
    line-height: 24px;
    color: #1A1919;
  }

  &-desktop {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;

    &:hover {
      .phone-tooltip {
        display: flex;
        animation: slide .2s ease-in-out;
        left: auto;
        right: 0;
        transform: none;
      }
    }
  }
}

.return-to-shopping {
  &__text {
    font-family: DIN Pro;
    font-style: normal;
    font-size: 15px;
    line-height: 25px;
    display: block;
    color: #595858;
    transition: .2s ease-in-out;

    @media only screen and (max-width: 600px) {
      font-size: 13px;
      line-height: 16px;
    }
    &:hover {
      color: #1A1919;
    }
  }

  &__icon {
    margin-right: 12px;
    width: 10px;
  }

  &__link {
    height: 100%;
    display: flex;
    align-items: center;
    width: fit-content;
  }
}

.phone-tooltip {
  cursor: auto;
  box-sizing: border-box;
  display: none;
  padding: 16px;
  width: 280px;
  position: absolute;
  font-family: DIN Pro;
  font-style: normal;
  font-size: 14px;
  line-height: 16px;
  flex-direction: column;
  top: calc(100% + 10px);
  left: 50%;
  background: #fff;
  border-radius: 4px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);

  &:after {
    top: -10px;
    content: " ";
    height: 10px;
    position: absolute;
    width: 100%;
  }
}

.header-help-mobile {
  display: none;
  align-items: center;

  .icon-consultation {
    cursor: pointer;
  }

  .icon-microcart {
    margin-right: 16px;
  }
}

@media (max-width : 576px) {
  .header-help-mobile {
    display: flex;
  }

  .header-help-desktop {
    display: none;
  }
}
</style>
