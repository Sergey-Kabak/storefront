<template>
  <div class="delivery">
    <h2>{{ $t('justin') }}</h2>
    <img src="/assets/static/justin_poshta.jpg" alt="justin_poshta">
    <p>{{ $t('justin company') }}</p>
    <h2>{{ $t('why justin') }}</h2>
    <ul>
      <li>{{ $t('justin chain') }}</li>
      <li>{{ $t('justin location') }}</li>
      <li>{{ $t('justin delivery') }}</li>
      <li>{{ $t('justin schedule') }}</li>
    </ul>
    <a href="https://justin.ua/">{{ $t('justin site') }}</a>
    <p>{{ $t('delivery warning') }}</p>
    <h2>{{ $t('nova poshta') }}</h2>
    <img src="/assets/static/novaya_poshta.jpg" alt="novaya_poshta">
    <p>{{ $t('nova poshta descrtiption') }}</p>
    <p>Обрати найближче відділення можна під час оформлення замовлення.</p>
    <h4>{{ $t('cost order') }}</h4>
    <ul>
      <li>{{ $t('nova poshta free order') }}</li>
      <li>{{ $t('nova poshta price order') }}</li>
    </ul>
    <h4>{{ $t('nova poshta postpay') }}</h4>
    <ul>
      <li>Безкоштовно — від 100 грн.</li>
      <li>Вартість доставки 35 грн — вартість замовлення до 100 грн. (якщо інше не передбачено умовами пропозиції.)</li>
    </ul>
    <h4>{{ $t('delivery time') }}</h4>
    <p>Точний час доставки повідомляє наш консультант після підтвердження замовлення.</p>
    <p>{{ $t('delivery warning') }}</p>
        <h4>Самовивіз з торгової точки</h4>
    <ul>
      <li>Безкоштовно</li>
    </ul>
    <p>Ви можете оплатити та забрати товар в одному з магазинів ringoo. Дізнатися адресу магазину в своєму місті ви можете у нашого консультанта під час підтвердження замовлення.</p>
    <h2>{{ $t('ukr poshta') }}</h2>
    <img src="/assets/static/ukr_poshta.jpg" alt="ukr_poshta">
    <p>{{ $t('ukr poshta description') }}</p>
    <p>{{ $t('ukr poshta department') }}</p>
    <p>{{ $t('delivery warning') }}</p>
  </div>
</template>

<script>

export default {}
</script>

<style lang="scss" scoped>
  .delivery {
    text-align: justify;
  }

  h4 {
    font-family: DIN Pro;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #1A1919;
  }

  p {
    font-family: DIN Pro;
    font-size: 15px;
    line-height: 24px;
  }

  h2 {
    font-family: sans-serif;
    &:first-child {
      margin-top: 0;
    }
  }

  img {
    max-width: 200px;
    width: 100%;
  }
</style>