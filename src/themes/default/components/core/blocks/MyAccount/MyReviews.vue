<template>
  <div class="reviews">
    <h2 class="account-page-title">{{ $t($route.name) }}</h2>
    <!-- <div class="reviews-wrapper">
      <div class="review" v-for="(review, index) in reviews" :key="index">
        <div class="review-image">
          <img :src="review.img" alt="product">
        </div>
        <div class="review-right">
          <div class="review-header">
            <div class="header-top">
              <span class="review-product-name">{{ review.productName }}</span>
            </div>
            <div class="header-bottom">
              <review-stars :rating="review.rating" class="review-rating" />
              <span class="review-date">{{ review.date }}</span>
            </div> 
          </div>
          <div class="review-body"> 
            <p class="review-text">{{ review.text }}</p>
          </div>
        </div>
      </div>
    </div> -->
    <p class="no-reviews"> {{ $t("You haven't left a review yet") }} </p>
  </div>
</template>

<script>
import ReviewStars from 'theme/components/core/ReviewStars.vue'

export default {
  components: {
    ReviewStars
  },
  data: () => ({
    reviews: [{
      img: 'https://ringoo.ua/img/150/150/resize/1/_/1_7.jpg',
      productName: 'Мобильный телефон Apple iPhone 11 64GB Black',
      rating: 3,
      date: '30.05.2020',
      text: 'Предварительно можно выделить несколько положительных моментов, выуженных из сети: у него более лучшая влагостойкость; улучшили ночной режим; фэс айди тоже работает лучше и срабатывает на более дальней дистанции; улучшили работу широкоугольной камеры; сверхширик добавил новые возможности. это минимум, что можно выделить из нового айфона. думаю, после использования, перечень плюсов у многих раздуется еще на несколько десятков положительных опций.'
    }]
  })
}
</script>

<style lang="scss" scoped>
.reviews-wrapper {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

.review {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
}

.review-header {
  margin-bottom: 16px;
}

.review-image {
  max-width: 56px;
  width: 100%;
  margin-right: 12px;

  img {
    display: block;
    width: 100%;
  }
}

.review-product-name {
  display: block;
  margin-bottom: 8px;
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #1A1919;
}

.header-bottom {
  display: flex;
  align-items: center;
}

.review-rating {
  margin-right: 16px;
}

.review-date {
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 12px;
  line-height: 13px;
  color: #BDBDBD;
}

.review-text {
  font-family: DIN Pro;
  font-size: 15px;
  line-height: 24px;
  color: #5F5E5E;
}

.no-reviews {
  text-align: center;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #1A1919;
}
</style>