<template>
  <div class="brand-portal">
    <div class="v-container">
      <div class="breadcrumbs-wrapper">
        <mobile-breadcrumbs withHomepage v-if="isMobile"/>
        <breadcrumbs v-else :with-homepage="true" :routes="[]" :active-route="brand.brand_name"/>
      </div>
      <banner-carousel />
      <h1 class="brand-portal-title">{{ brand.brand_name }}</h1>
      <brand-products :brandItems="brand.categories" class="brand-products" />
      <brand-categories :categories="brand.accessories" class="brand-categories" />
      <div class="best-sellers"> 
        <h4 class="best-sellers-title">Лидеры продаж</h4>
        <lazy-hydrate :trigger-hydration="!loading">
          <product-listing columns="4" :products="getRecommends" />
        </lazy-hydrate>
        <router-link to="/apple">
          <button-full
            class="show-all"
            type="submit"
          >
            {{ $t('See all') }}
          </button-full>
        </router-link>
      </div>
      <!-- <see-also /> -->
      <div class="brand-description" v-html="brand.description" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import LazyHydrate from 'vue-lazy-hydration';
import ProductListing from 'theme/components/core/ProductListing';
import Breadcrumbs from 'theme/components/core/Breadcrumbs.vue';
import BannerCarousel from 'theme/components/core/blocks/BrandPortal/BannerCarousel.vue';
import BrandProducts from 'theme/components/core/blocks/BrandPortal/BrandProducts.vue';
import BrandCategories from 'theme/components/core/blocks/BrandPortal/BrandCategories.vue';
import SeeAlso from 'theme/components/core/blocks/BrandPortal/SeeAlso.vue';
import NoSSR from 'vue-no-ssr';
import { isServer } from '@vue-storefront/core/helpers';
import ButtonFull from 'theme/components/theme/ButtonFull'
import { Logger } from '@vue-storefront/core/lib/logger';
import mobileResolution from 'theme/mixins/mobileResolution'
import MobileBreadcrumbs from 'theme/components/core/MobileBreadcrumbs.vue';

export default {
  mixins: [mobileResolution],
  components: {
    Breadcrumbs,
    BannerCarousel,
    BrandCategories,
    SeeAlso,
    ProductListing,
    LazyHydrate,
    mobileResolution,
    MobileBreadcrumbs,
    BrandProducts,
    ButtonFull,
    'no-ssr': NoSSR
  },
  data: () => {
    return {
      loading: true,
    }
  },
  computed: {
    ...mapGetters('homepage', ['getRecommends']),
    ...mapState({
      brand: state => state.brand.brand
    })
  },
  async asyncData ({ store, route, context }) { // this is for SSR purposes to prefetch data
    if (context) context.output.cacheTags.add('brand')
    Logger.info('Calling asyncData in BrandPortal (theme)')()
    try {
      return Promise.all([
        store.dispatch('homepage/loadRecommends'),
        store.dispatch('brand/getBrand', route.params.brandId)
      ])
    } catch (e) {
      Logger.error(e)()
      throw e
    }
  },
  beforeRouteEnter (to, from, next) {
    if (!isServer && !from.name) {
      next(vm => {
        vm.$store.dispatch('brand/getBrand', to.params.brandId).then(res => {
          vm.loading = false
        })
        vm.$store.dispatch('homepage/loadRecommends').then(res => {
            vm.loading = false
        })
      })
    } else {
      next()
    }
  }
}
</script>

<style lang="scss" scoped>
.v-container {
  width: 90%;
}

.breadcrumbs-wrapper  {
  margin-bottom: 24px;
}

.brand-portal-title {
  text-align: center;
  margin: 68px 0 32px 0;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 36px;
  line-height: 46px;
  color: #1A1919;
  text-transform: capitalize;
}

.brand-categories {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.brand-products,
.brand-categories {
  margin-bottom: 68px;
}

.best-sellers {
  margin-bottom: 68px;

  .product-listing {
    margin-bottom: 32px;
  }
}

.best-sellers-title {
  margin: 0 0 33px 0;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #1A1919;
}

.show-all {
  margin: auto;
  background-color: transparent;
  border: 1px solid #23BE20;
  color: #1A1919;
}

.see-also {
  margin-bottom: 68px;
}

.brand-description {
  columns: 2;
  margin-bottom: 68px;
  gap: 40px;
  column-gap: 40px;

  ::v-deep {
    h1,h2,h3,h4,h5,h6 {
      margin-top: 0;
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 30px;
      color: #1A1919;
    }

    p {
      margin-top: 0;
      font-family: DIN Pro;
      font-size: 15px;
      line-height: 24px;
      color: #5F5E5E;
    }
  }
}

@media (max-width: 1024px) {
  .brand-categories {
    flex-direction: column;
    align-items: center;

    ::v-deep {
      .brand-categories-left {
        max-width: 100%;
        margin-right: 0;
      }

      .categories {
        margin-bottom: 48px;
        grid-template-columns: 1fr;
      }

      .category-link {
        padding: 14px 0;
        max-width: 100%;
      }

      .brand-categories-banner {
        width: 100%;
      }
    }
  }

  .best-sellers {
    margin-bottom: 48px;
  }

  .see-also {
    margin-bottom: 28px;

    ::v-deep {
      .see-also-title {
        margin-bottom: 24px;
        font-size: 24px;
      }

      .brands {
        padding: 0;
        grid-template-columns: repeat(3, 1fr);
      }

      .brand {
        &:last-child {
          border-right: 1px solid #E0E0E0;
        }

        &:nth-child(3n) {
          border-right: none;
        }

        &:nth-child(-n + 3) {
          border-bottom: 1px solid #E0E0E0;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .breadcrumbs-wrapper {
    margin-bottom: 20px;
  }

  .brand-description {
    columns: 1;
  }

  .brand-portal-title {
    display: none;
  }

  .brand-products {
    margin-bottom: 48px;
  }
}

@media (max-width: 576px) {
  .see-also {
    ::v-deep {
      .brands {
        grid-template-columns: repeat(2, 1fr);
      }

      .brand {
        border: none;
        padding: 16px 0;

        &:nth-child(-n + 4) {
          border-bottom: 1px solid #E0E0E0;
        }

        &:nth-child(2n -1) {
          border-right: 1px solid #E0E0E0;
        }
      }
    }
  }
}
</style>
