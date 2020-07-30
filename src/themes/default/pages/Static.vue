<template>
  <div>
    <div class="bg-cl-secondary py35 pl20">
      <div class="container">
        <breadcrumbs :with-homepage="true" :routes="[]" :active-route="$props.title" />
        <h2 class="fs-big">
          {{ $props.title }}
        </h2>
      </div>
    </div>

    <div class="container pt45 pb70">
      <div class="row pl20 pt0">
        <div class="col-sm-3">
          <nav class="static-menu serif h4 mb35">
            <ul class="m0 p0">
              <li class="mb10" v-for="element in navigation" :key="element.id">
                <router-link :to="localizedRoute(element.link)" class="cl-accent relative">
                  {{ element.title }}
                </router-link>
              </li>
            </ul>
          </nav>
        </div>
        <div class="static-content h4 lh35 col-sm-9">
          <component :is="activeComponent" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from '@vue-storefront/i18n'
import Breadcrumbs from 'theme/components/core/Breadcrumbs'
import StaticExample from 'theme/components/theme/blocks/Static/Example'
import StaticShortExample from 'theme/components/theme/blocks/Static/Short'
import { getPathForStaticPage } from 'theme/helpers'
import { localizedRoute } from '@vue-storefront/core/lib/multistore'

import Delivery from 'theme/components/theme/blocks/Static/Delivery'
import Payment from 'theme/components/theme/blocks/Static/Payments'
import PaymentAndLoans from 'theme/components/theme/blocks/Static/PaymentsAndLoans'
import WarrantyExchangeReturn from 'theme/components/theme/blocks/Static/WarrantyExchangeReturns'
import ServiceCenters from 'theme/components/theme/blocks/Static/ServiceCenters'
import UsingAPromoCode from 'theme/components/theme/blocks/Static/UsingAPromoCode'
import PublicOffer from 'theme/components/theme/blocks/Static/PublicOffer'
import PromotionalOffers from 'theme/components/theme/blocks/Static/PromotionalOffers'
import Shops from 'theme/components/theme/blocks/Static/Shops'
import AboutTheCompany from 'theme/components/theme/blocks/Static/Company'
import OwnAccount from 'theme/components/theme/blocks/Static/OwnAccount'
import WorkInTheCompany from 'theme/components/theme/blocks/Static/WorkInTheCompany'
import Landlords from 'theme/components/theme/blocks/Static/Landlords'
import Contacts from 'theme/components/theme/blocks/Static/Contacts'

export default {
  components: {
    Breadcrumbs
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || this.$props.title,
      meta: this.$route.meta.description ? [{ vmid: 'description', description: i18n.t(this.$route.meta.description) }] : []
    }
  },
  props: {
    title: {
      type: String,
      required: true
    },
    page: {
      type: String,
      required: true
    }
  },
  computed: {
    activeComponent () {
      const matchedNav = this.navigation.find(nav => nav.link.includes(this.$route.path))
      return matchedNav ? matchedNav.component : null
    }
  },
  data () {
    return {
      navigation: [
        { title: i18n.t('Delivery'), link: '/delivery', component: Delivery },
        { title: i18n.t('Payment'), link: '/payment', component: Payment },
        { title: i18n.t('PaymentAndLoans'), link: '/payments-and-loans', component: PaymentAndLoans },
        { title: i18n.t('WarrantyExchangeReturn'), link: '/warranty-exchange-return', component: WarrantyExchangeReturn },
        { title: i18n.t('ServiceCenters'), link: '/service-centers', component: ServiceCenters },
        { title: i18n.t('UsingAPromoCode'), link: '/using-a-promo-code', component: UsingAPromoCode },
        { title: i18n.t('PublicOffer'), link: '/public-offer', component: PublicOffer },
        { title: i18n.t('PromotionalOffers'), link: '/promotional-offers', component: PromotionalOffers },
        { title: i18n.t('Shops'), link: '/shops', component: Shops },
        { title: i18n.t('AboutTheCompany'), link: '/about-the-company', component: AboutTheCompany },
        { title: i18n.t('OwnAccount'), link: '/own-account', component: OwnAccount },
        { title: i18n.t('WorkInTheCompany'), link: '/work-in-the-company', component: WorkInTheCompany },
        { title: i18n.t('Landlords'), link: '/landlords', component: Landlords },
        { title: i18n.t('Contacts'), link: '/contacts', component: Contacts },

        { title: i18n.t('About us'), link: getPathForStaticPage('/about-us'), component: StaticExample },
        { title: i18n.t('Customer service'), link: getPathForStaticPage('/customer-service'), component: StaticShortExample },
        { title: i18n.t('Store locator'), link: localizedRoute('/store-locator'), component: StaticExample },
        { title: i18n.t('Return policy'), link: '/returns', component: StaticExample },
        { title: i18n.t('Privacy policy'), link: '/privacy', component: StaticShortExample },
        { title: i18n.t('Size guide'), link: '/size-guide', component: StaticExample },
        { title: i18n.t('Contact us'), link: '/contact', component: StaticShortExample }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$border-primary: color(primary, $colors-border);

.static-menu {
  ul {
    list-style: none;
  }

  a::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: $border-primary;
  }

  a:hover::after,
  .router-link-active::after {
    opacity: 0;
  }
}

.static-content {
  *:first-of-type {
    margin-top: 0;
  }
}
</style>

<style lang="scss">
.static-content {
  h3 {
    margin-top: 40px;
    margin-bottom: 25px;
    @media (max-width: 767px) {
      margin-top: 35px;
      margin-bottom: 10px;
    }
  }
}
</style>
