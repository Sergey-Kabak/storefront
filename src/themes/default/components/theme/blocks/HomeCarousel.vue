<template>
  <div class="home-carousel-wrapper">
    <VueSlickCarousel v-if="getHomePageBanners && getHomePageBanners.banners.length" v-bind="settings" class="carousel" :responsive="isClient ? responsive : null">
      <div
        v-for="(product, index) in sortedBanners" :key="index"
        data-testid="productLink"
        class="slide-link"
        @click="checkRoute(product)"
      >
        <img lazy="loading" :src="getThumbnail(product.banner_desktop, 263, 434, 'banner')" :alt="index">
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import { mapGetters } from "vuex";

export default {
  components: {
    VueSlickCarousel,
  },
  data: () => ({
    isClient: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 460,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 340,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    settings: {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 5,
      slidesToScroll: 5
    }
  }),
  computed: {
    ...mapGetters({
      getHomePageBanners: 'bannerGroup/getHomePageBanners'
    }),
    sortedBanners () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      if (!this.getHomePageBanners.banners) {
        return []
      }
      return this.getHomePageBanners.banners.slice().sort((a, b) => {
        return +a.position - +b.position
      })
    }
  },
  mounted: function() {
    this.isClient = true
  },
  methods: {
    checkRoute (product) {
      if (+product.new_tab) {
        window.open(product.banner_url, '_blank');
      } else {
        const url = new URL(product.banner_url)
        this.$router.push(url.pathname + url.search)
      }
    },
    formatLink(product) {
      if (product.url_path) {
        return formatProductLink(product, currentStoreView().storeCode)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.slide-link{
  cursor: pointer;
}
::v-deep {
  .slick-list {
    margin: 0 -3px 24px -3px;
  }

  .slick-slide {
    & > div {
      margin: 0 3px;
    }
  }

  .slick-dots {
    display: flex!important;
    justify-content: center;
    align-items: center;
    position: static;

    & > li {
      width: 8px;
      border-radius: 50%;
      background-color: #efefef;
      height: 8px;
      margin: 0 4px;

      @media only screen and (max-width: 540px) {
        height: 8px;
        width: 8px;
      }
      button {
        padding: 0;
        width: auto;
        height: auto;
      }

      &.slick-active {
        background-color: #23BE20;
      }

      button {
        &:before {
          content: none;
        }
      }
    }
  }
}

.slide-link {
  display: flex!important;

  &:focus,
  &:active {
    outline: none!important;
  }
}

img {
  width: 100%;
  height: 100%;
  max-height: 434px;

  @media only screen and (min-width: 1440px) {
    height: 434px;
  }

  &:focus,
  &:active {
    outline: none!important;
  }
}
</style>
