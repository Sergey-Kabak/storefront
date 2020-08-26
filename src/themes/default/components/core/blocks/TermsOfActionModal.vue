<template>
  <modal name="modal-terms-of-action" class="modal-terms-of-action" :width="550">
    <h3 slot="header" class="modal-terms-of-action_header align-center">
      Условия акции
    </h3>
    <div slot="content" class="modal-terms-of-action_content">  
        <promo />
        <p>Тут будет какой-то текст про акцию:</p>
        <p>1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.</p>
        <p>2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>

    </div>
  </modal>
</template>

<script>
import Modal from 'theme/components/core/Modal.vue'
import Promo from 'theme/components/core/blocks/Product/Promo.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Modal,
    Promo
  },
  data () {
    return {
      loading: false,
    }
  },
}
</script>
<style lang="scss" scoped>
  /deep/ .promo-block{
    padding: 0;
    border: none;
  }
  /deep/ button.details{
    display : none !important;
  }
  /deep/ .promo-block-gift{
    display: block;
    &>img{
      max-width:50px;
    }
    .promo-block-gift-icon{
      width: 32px;
      height: 32px;
      img{
        width : 20px;
        max-height: 20px;
      }
    }
  }
</style>
<style lang="scss">
  .modal-terms-of-action{
      *:not(i){
        font-family: 'DIN Pro';
      }
      .modal-header{
        background-color: #fff;
        padding: 0 0 0 24px;
        font-style: normal;
        font-weight: 0;
        font-size: 24px;
        line-height: 30px;
        color: #1A1919;
        border-bottom: 1px solid #E0E0E0;
        h3{
            margin: 13px 0;
        }
      } 
      .modal-content{
          padding: 24px;
      }
      .clip-wrapper{
          margin-bottom: 24px;
          .code{
            font-size: 18px;
            line-height: 24px;
            color: #000;
            margin-right: 18px;
          }
          svg{
            cursor: pointer;
          }
      }
      p{
          margin-bottom: 16px;
      }
  }
</style>