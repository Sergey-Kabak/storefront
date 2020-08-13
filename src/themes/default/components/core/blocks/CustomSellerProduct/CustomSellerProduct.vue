<template>
  <modal name="modal-custom-seller-product" class="modal-custom-seller-product" :width="550">
    <h3 slot="header" class="align-center px25">
      {{ $t('Seller of goods') }}
    </h3>
    <div slot="content" class="modal-custom-city-picker_content">

      <div class="action-block">
        <button class="action">{{ $t('To apply') }}</button>
      </div>
    </div>
  </modal>
</template>

<script>
import Modal from 'theme/components/core/Modal.vue'

export default {
  components: {
    Modal
  },
  data () {
    return {
      loading: false,
    }
  },
  computed: {},
  mounted () {},
  methods: {
    close () {
      this.$bus.$emit('modal-hide', 'modal-custom-seller-product')
    }
  },
}
</script>
<style lang="scss">
  .modal-custom-city-picker {
    .modal-container {
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      -webkit-box-shadow: 0 0 15px rgba(0,0,0,.3);
      -moz-box-shadow: 0 0 15px rgba(0,0,0,.3);
      box-shadow: 0 0 15px rgba(0,0,0,.3);
    }
    h3 {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 500;
      font-size: 24px;
      line-height: 30px;
      padding: 13px 24px;
      margin: 0;
    }
    h4 {
      font-family: DIN Pro;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      color: #000000;
      margin: 30px 0 10px;
      padding: 0;
    }
    .modal-header {
      padding: 0;
    }
    .modal-content {
      padding: 0;
    }
    &_content {
      padding: 24px;
      .action {
        background: #23BE20;
        border-radius: 4px;
        font-family: DIN Pro;
        font-style: normal;
        font-weight: 0;
        font-size: 15px;
        line-height: 16px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #FFFFFF;
        padding: 12px 26px;
        border: 1px solid transparent;
        margin-top: 20px;
        &:hover {
          border-color: #23BE20;
          background-color: transparent;
          color: #23BE20;
        }
      }
    }
  }
</style>
