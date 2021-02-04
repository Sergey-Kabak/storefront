<template>
  <div class="product-delivery p16 mb16">
    <div class="product-delivery__city relative mb10">
      <span>Доставка в</span>
      <div class="picked-city ml8" @click="onShowModal">
        {{ city }}
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.25 0.5L4 4.25L7.75 0.5H0.25Z" fill="#BDBDBD"/>
        </svg>
      </div>
    </div>
    <div class="product-delivery__type flex mb15">
      <div class="delivery-label flex v-center">
        <i class="material-icons">
          store
        </i> Самовывоз из магазина
      </div>
      <div class="delivery-price">
        <div class="free cl-main-green">бесплатно</div>
      </div>
    </div>

    <div class="product-delivery__type flex mb15">
      <div class="delivery-label flex v-center">
        <img src="/assets/ProductCard/Nova-Poshta-24px.svg" alt="">
        Новая Почта (Отделение)
      </div>
      <div class="delivery-price">
        <div class="free cl-main-green">бесплатно</div>
        <div class="free-from">от 35 ₴</div>
      </div>
    </div>

    <div class="product-delivery__type flex">
      <div class="delivery-label flex v-center">
        <i class="material-icons">
          local_shipping
        </i>
        Доставка курьером
      </div>
      <div class="delivery-price">
        <div class="paid">бесплатно</div>
      </div>
    </div>
  </div>
</template>

<script>
// import NewPost from 'src/modules/nova-poshta/index';

export default {
  // mixins: [NewPost],
  data() {
    return {
      city: 'Київ',
      showCityPicker: false,
    }
  },
  beforeMount() {
    this.$bus.$on('change-city', this.changeCity)
    this.getCityList()
  },
  methods: {
    changeCity(city = this.city) {
      this.showCityPicker = false;
      this.city = city
    },
    onShowModal() {
      this.$bus.$emit('modal-show', 'modal-custom-city-picker')
    }
  },
}
</script>

<style lang="scss" scoped>
.product-delivery {
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  box-sizing: border-box;
  border-radius: 4px;

  &__city {
    * {
      font-family: 'DIN Pro';
      font-weight: 700;
      font-size: 13px;
      color: #000000;
      line-height: 20px;
    }

    display: inline-flex;
  }

  &__type {
    @media (max-width: 575px) {
      flex-direction: column;
    }
    align-items: flex-start;

    .delivery-label {
      font-family: 'DIN Pro';
      font-size: 14px;
      line-height: 24px;
      color: #5F5E5E;

      i {
        color: #BDBDBD;
      }

      i, img {
        margin-right: 18px;
      }
    }

    .delivery-price {
      @media (max-width: 575px) {
        margin-left: 43px;
      }
      margin-left: auto;
      font-family: 'DIN Pro';
      font-size: 14px;
      line-height: 16px;

      .free-from {
        color: rgba(95, 94, 94, 0.6);
        text-decoration-line: line-through;
      }

      .paid {
        color: #1A1919;
      }
    }
  }
}
</style>
