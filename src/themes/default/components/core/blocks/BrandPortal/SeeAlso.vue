<template>
  <div class="see-also">
    <h4 class="see-also-title"> Смотрите также </h4>
    <ul class="brands">
      <li class="brand" v-for="(brand, index) in brands" :key="index">
        <router-link to="/">
          <img v-lazy="brand.img" alt="">
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data: () => ({
    brands: [
      {
        img: '/assets/brand-portal/brands/samsung.png'
      },
      {
        img: '/assets/brand-portal/brands/huawei.png'
      },
      {
        img: '/assets/brand-portal/brands/xiaomi.png'
      },
      {
        img: '/assets/brand-portal/brands/realme.png'
      },
      {
        img: '/assets/brand-portal/brands/jbl.png'
      },
      {
        img: '/assets/brand-portal/brands/lenovo.png'
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.see-also-title {
  margin: 0 0 32px 0;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #1A1919;
}

.brands {
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
  justify-content: center;
  background: #F6F7FA;
  border-radius: 4px;
}

.brand {
  cursor: pointer;
  padding: 16px 32px;
  position: relative;
  border-right: 1px solid #E0E0E0;

  &:last-child {
    border-right: none;
  }

  a {
    min-width: 100px;
    min-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>