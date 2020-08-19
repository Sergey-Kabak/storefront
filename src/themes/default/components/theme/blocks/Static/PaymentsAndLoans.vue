<template>
  <div class="payments-and-loans">
    <p>
      {{ $t('loan description') }}
    </p>
    <h2>{{ $t('loan') }}</h2>
    <h3>{{ $t('loan provide') }}</h3>
    <ul>
      <li>{{ $t('cart universal') }}</li>
      <li>{{ $t('cart universal gold') }}</li>
      <li>{{ $t('cart elite') }}</li>
    </ul>
    <h3>{{ $t('loan advantages') }}</h3>
    <ul>
      <li>{{ $t('loan advantage time') }}</li>
      <li>{{ $t('loan advantage simplicity') }}</li>
      <li>{{ $t('loan advantage repayment') }}</li>
      <li>{{ $t('loan advantage conditions') }}</li>
      <li>{{ $t('loan advantage fisrt payment') }}</li>
    </ul>
    <table>
      <tbody>
        <tr>
          <td>
            <strong>{{ $t('monthly commission') }}</strong>
          </td>
          <td >
            <strong>{{ $t('maximum purchase amount') }}</strong>
          </td>
          <td>
            <strong>{{ $t('minimum purchase amount') }}</strong>
          </td>
          <td><strong>{{ $t('term') }}</strong></td>
        </tr>
        <tr>
          <td>2,9 %</td>
          <td>{{ $t('according to your limit') }}*</td>
          <td>-</td>
          <td>{{ $t('loan term description') }}</td>
        </tr>
      </tbody>
    </table>
    * {{ $t('loan limit') }}
    <h2>{{ $t('loan promotional') }}</h2>
    <h3>{{ $t('loan promotional provide') }}</h3>
    <ul>
      <li>{{ $t('cart universal') }}</li>
      <li>{{ $t('cart universal gold') }}</li>
      <li>{{ $t('cart elite') }}</li>
    </ul>
    <h3>{{ $t('loan promotional advantages') }}</h3>
    <ul>
      <li>{{ $t('loan advantage time') }}</li>
      <li>{{ $t('loan advantage simplicity') }}</li>
      <li>{{ $t('loan advantage repayment') }}</li>
      <li>{{ $t('loan promotional advantage commission') }}</li>
      <li>{{ $t('loan promotional advantage fisrt payment') }}</li>
    </ul>
    <table>
      <tbody>
        <tr>
          <td>
            <strong>{{ $t('monthly commission') }}</strong>
          </td>
          <td>
            <strong>{{ $t('maximum purchase amount') }}</strong>
          </td>
          <td>
            <strong>{{ $t('minimum purchase amount') }}</strong>
          </td>
          <td><strong>{{ $t('term') }}</strong></td>
        </tr>
        <tr>
          <td>0,99 %</td>
          <td>{{ $t('according to your limit') }}*</td>
          <td>-</td>
          <td>{{ $t('loan promotional term description') }}</td>
        </tr>
      </tbody>
    </table>
    * {{ $t('loan limit') }}
    <h2>{{ $t('payment in installments') }}</h2>
    <h3>{{ $t('payment in installments provide') }}</h3>
    <ul>
      <li>{{ $t('cart universal') }}</li>
      <li>{{ $t('cart universal gold') }}</li>
      <li>{{ $t('cart elite') }}</li>
    </ul>
    <h3>{{ $t('payment in installments advantages') }}</h3>
    <ul>
      <li>{{ $t('loan advantage time') }}</li>
      <li>{{ $t('loan advantage simplicity') }}</li>
      <li>{{ $t('loan advantage repayment') }}</li>
      <li>{{ $t('payment in installments advantage commission') }}</li>
      <li>{{ $t('loan advantage fisrt payment') }}</li>
    </ul>
    <table>
      <tbody>
        <tr>
          <td>
            <strong>{{ $t('monthly commission') }}</strong>
          </td>
          <td>
            <strong>{{ $t('maximum purchase amount') }}</strong>
          </td>
          <td>
            <strong>{{ $t('minimum purchase amount') }}</strong>
          </td>
          <td><strong>{{ $t('term') }}</strong></td>
        </tr>
        <tr>
          <td>0,0 %</td>
          <td>{{ $t('according to your limit') }}*</td>
          <td>-</td>
          <td>{{ $t('payment in installments term description') }}</td>
        </tr>
      </tbody>
    </table>
    * {{ $t('loan limit') }}
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
  .payments-and-loans {
    text-align: justify;
  }

  table {
    width: 100%;
  }

  h2, h3 {
    font-family: sans-serif;
  }

  td, tr {
    text-align: center;
  }

  p {
    &:first-child {
      margin-top: 0;
    }
  }
</style>
