<template>
  <div class="promo-block">
    <picture class="promo-image">
      <source :srcset="baseUrl('xxl')" media="(min-width: 1921px)">
      <source :srcset="baseUrl('xl')" media="(min-width: 1441px) and (max-width: 1920px)">
      <source :srcset="baseUrl('lg')" media="(min-width: 1281px) and (max-width: 1440px)">
      <source :srcset="baseUrl('md')" media="(min-width: 1025px) and (max-width: 1280px)">
      <source :srcset="baseUrl('sm')" media="(min-width: 769px) and (max-width: 1024px)">
      <source :srcset="baseUrl('xs')" media="(min-width: 576px) and (max-width: 768px)">
      <img :src="baseUrl('mob')" alt="promo">
    </picture>
    <div v-if="screenResolution !== 'mobile'" class="carousel-wrapper">
      <VueSlickCarousel
        v-if="categories.length"
        v-bind="settings"
        :responsive="isClient ? responsive : null"
        class="carousel">
        <div
          v-for="(category, index) in categories" :key="index"
          data-testid="productLink"
          class="slide-link"
        >
          <category-slider-item
            :variant="category"
            :selected-filters="getCurrentFilters"
          />
        </div>
      </VueSlickCarousel>
    </div>
    <div v-else class="mobile-horizontal-scroll">
      <div>
        <category-slider-item
          v-for="(category, index) in categories" :key="index"
          :variant="category"
          :selected-filters="getCurrentFilters"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import categorySliderItem from './categorySliderItem';
import ResizeMixin from '../../Product/Mixins/ResizeMixin';

export default {
  mixins: [ResizeMixin],
  components: {
    VueSlickCarousel,
    categorySliderItem
  },
  data: () => ({
    isClient: false,
    responsive: [
      {
        breakpoint: 1360,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ],
    settings: {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 500,
      autoplay: false,
      slidesToShow: 8,
      slidesToScroll: 1
    }
  }),
  computed: {
    ...mapGetters({
      getCurrentCategory: 'category-next/getCurrentCategory',
      getAvailableFilters: 'category-next/getAvailableFilters',
      getCurrentFilters: 'category-next/getCurrentFilters'
    }),
    categories () {
      if (!!this.getAvailableFilters.kategorija_akcija && this.getAvailableFilters.kategorija_akcija.length) {
        const orders = [
          'Apple',
          'Смартфони',
          'Гаджети',
          'Навушники',
          'Акустика',
          'Аксесуари',
          `Краса та здоров'я`,
          'Товари для дому'
        ]
        const NotSorted = this.getAvailableFilters.kategorija_akcija.filter(it => !orders.find(o => o === it.label))
        const Sorted = orders.map(it => this.getAvailableFilters.kategorija_akcija.find(o => o.label === it))
        console.log([...Sorted, ...NotSorted])
        return [...Sorted, ...NotSorted]
      }
      return []
    }
  },
  mounted () {
    this.isClient = true
  },
  methods: {
    baseUrl (resolution) {
      return `/assets/promo/march-8-${resolution}.jpg`
    }
  }
}
</script>

<style lang="scss" scoped>
.mobile-horizontal-scroll{
  padding: 0 16px;
  &>div{
    -webkit-overflow-scrolling: touch;
    overflow-x: auto;
    overflow-y: hidden;
    display: flex;
    grid-gap: 12px;
  }
}
::v-deep .slick-arrow {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid #E0E0E0;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
::v-deep .slick-prev {
  left: -48px;
  &:before{
    content: url("data:image/svg+xml; utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='12' viewBox='0 0 8 12' fill='none'%3E%3Cpath d='M6.29294 0.29303L0.585938 6.00003L6.29294 11.707L7.70694 10.293L3.41394 6.00003L7.70694 1.70703L6.29294 0.29303Z' fill='%23828282'/%3E%3C/svg%3E");
    font-family: auto;
    font-size: 1em;
  }
}
::v-deep .slick-next {
  right: -48px;
  &:before{
    content: url("data:image/svg+xml; utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='12' viewBox='0 0 8 12' fill='none'%3E%3Cpath d='M1.70697 11.707L7.41397 6.00003L1.70697 0.29303L0.292969 1.70703L4.58597 6.00003L0.292969 10.293L1.70697 11.707Z' fill='%23828282'/%3E%3C/svg%3E");
    font-family: auto;
    font-size: 1em;
  }
}
::v-deep .slide-link, .category-filter-item{
  outline: none !important;
}
.carousel-wrapper{
  margin: 0 auto;
  @media (min-width: 1361px) {
    max-width: 1216px;
  }
  @media (min-width: 1025px) and (max-width: 1360px) {
    max-width: 894px;
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    max-width: 600px;
  }
}
.promo{
  &-block{
    @media (max-width: 575px) {
      margin-top: -11px;
    }
    margin-top: -15px;
    margin-bottom: 68px;
  }
  &-image{
    margin-bottom: 66px;
    display: block;
    img{
      max-width: 100%;
    }
  }
}
.font{
  font-family: 'DIN Pro';
  font-style: normal;
  display: block;
  margin-bottom: 16px;
}
</style>
