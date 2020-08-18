<template>
  <div class="contacts">
    <h1>Інтернет-магазин ringoo.ua</h1>
    Мережа магазинів мобільного зв’язку — більше 100 магазинів по всій Україні.
    Знайдіть найближчий
    <router-link to="/shops">магазин ringoo на мапі...</router-link>
    Дивіться актуальні акції зі знижками та подарунками
    <router-link to="/promotional-offers">тут...</router-link>
    <h2>Якщо у вас виникли питання чи пропозиції</h2>
    <ul>
      <li>
        Телефонуйте <a href="tel:+380970908707">(097) 090-87-07</a> або
        <a href="tel:+380730908707">(073) 090-87-07</a>.
        <strong>Час роботи</strong>: Пн—Пт, з 9:00 до 18:00. Усі замовлення,
        зроблені в неробочі години, будуть виконані найближчого робочого дня.
      </li>
      <li>
        Пишіть, використовуючи форму зворотнього зв’язку або на пошту
        <a href="mailto:info@ringoo.ua">info@ringoo.ua</a>, і ми відповімо
        якнайшвидше.
      </li>
    </ul>
    Докладніше про компанію ringoo читайте <router-link to="/about-the-company">тут...</router-link>
    <h2>Наш магазин:</h2>
    м. Київ, вул. Борщагівська, 154 А Інші магазини
    <router-link to="/shops">тут...</router-link>
    <h2>Шукаєте роботу в ringoo?</h2>
    Дивіться наявні <router-link to="/work-in-the-company">вакансії...</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
  h1 {
    margin-top: 0;
  }

  h1, h2 {
    font-family: sans-serif;
  }
</style>
