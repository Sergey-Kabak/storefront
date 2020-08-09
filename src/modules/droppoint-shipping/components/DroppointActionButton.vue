<template>
  <button class="button-wrapper droppoint-action-button" @click="getSelected()">
    <a href="#" :class="['btn-outline btn-danger btn', {'check': hideProducts ? isFavorite : checked === id}]">
      {{ hideProducts ? $t('To favorite') : $t('Pick up here') }}
      <i v-if="hideProducts">
        <svg version="1.1" id="Ð¡Ð»Ð¾Ð¹_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" xml:space="preserve">
          <path class="icon-back" d="M0,0h24v24H0V0z" />
          <path class="icon-fill" d="M16.5,3c-1.7,0-3.4,0.8-4.5,2.1C10.9,3.8,9.2,3,7.5,3C4.4,3,2,5.4,2,8.5c0,3.8,3.4,6.9,8.6,11.5l1.4,1.3l1.4-1.3 c5.2-4.7,8.6-7.8,8.6-11.5C22,5.4,19.6,3,16.5,3z M12.1,18.5L12,18.6l-0.1-0.1C7.1,14.2,4,11.4,4,8.5C4,6.5,5.5,5,7.5,5 c1.5,0,3,1,3.6,2.4h1.9C13.5,6,15,5,16.5,5c2,0,3.5,1.5,3.5,3.5C20,11.4,16.9,14.2,12.1,18.5z" />
        </svg>
      </i>
      <input type="radio" :id="id" :value="id">
    </a>
  </button>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  name: 'DroppointActionButton',
  props: {
    hideProducts: {
      required: true,
      type: Boolean
    },
    isFavorite: {
      required: true,
      type: Boolean
    },
    id: {
      required: true,
      type: String
    },
    checked: {
      required: true,
      type: String
    },
    item: {
      required: true,
      type: Object
    }
  },
  methods: {
    getSelected () {
      this.$store.dispatch('shipping/updateChecked', this.item.id)
      this.hideProducts ? this.toFavorite(this.item) : (this.isProduct ? this.saveShippingDetails(this.item) : this.toCheckout(this.item))

      this.$emit("onClick", this.item);
    },
    saveShippingDetails (val) {
      this.shipping = {
        droppoint: this.droppoints.find(d => d.id === val),
        shippingMethod: this.shippingMethod
      }

      this.$store.dispatch('checkout/saveShippingDetails', this.shipping)

      this.$bus.$emit('modal-show', 'modal-take-in-pharmacy')
    },
    toFavorite (m) {
      this.$store.dispatch('checkout/saveFavorite', m)
    },
    selectDroppoint (m) {
      let nameArr = m.name.split(' ')
      let first = nameArr[0]
      let last = nameArr[1]

      if (!last || last.length === 0) {
        last = first
      }
      let country = (m.country === 'Україна') ? 'Ukraine' : m.country
      this.shipping = {
        id: m.id,
        company: m.id,
        firstName: first,
        lastName: last,
        country,
        streetAddress: m.streetname,
        apartmentNumber: m.streetname2,
        city: m.city,
        state: '',
        region_id: 0,
        zipCode: m.zipcode,
        phoneNumber: '',
        droppoint: m,
        shippingMethod: this.shippingMethod
      }
    },
    toCheckout (m) {
      this.selectDroppoint(m)
      this.$v.$touch()
      this.setShipping()
    },
    setShipping (invalidate = false) {
      if (!this.$v.$invalid && !invalidate) {
        this.$bus.$emit('checkout-after-shippingset', this.shipping)
        this.$bus.$emit('send-data-to-checkout')
      }
    }
  },
  validations () {
    let val = {
      shipping: {
        city: {
          required
        }
      }
    }
    if (this.extraFields) {
      val.shipping.extraFields = {}
      for (const [key, value] of Object.entries(this.extraFields)) {
        val.shipping.extraFields[key] = {}
        if (value.required) {
          val.shipping.extraFields[key] = {required}
        }
      }
    }
    return val
  }
}
</script>

<style lang="scss">
  .droppoint-action-button {
    max-width: 350px;
    border: 1px solid #00612B;
    background-color: #00612B;
    min-width: 250px;
    border-radius: 5px;
    color: #FFFFFF;
    &:hover {
      border: 1px solid #68BC3B;
      background-color: #68BC3B;
      color: #fff;
    }
  }
  .button-wrapper {
    position: relative !important;
    margin-left: auto !important;
    top: auto !important;
    border: none;
    background-color: transparent;
    cursor: pointer;
    .btn {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      cursor: pointer;
      display: block;
      padding: 12px;
      text-align: center;
      font-size: 15px;
      line-height: 16px;
      font-weight: 400;
      max-width: 350px;
      background: #23BE20;
      min-width: 250px;
      border-radius: 5px;
      color: #FFFFFF;
      -webkit-border-radius: 3px;
      -moz-border-radius: 3px;
      -webkit-transition: all .3s;
      -moz-transition: all .3s;
      -ms-transition: all .3s;
      -o-transition: all .3s;
      transition: all .3s;
      &:hover, &.check {
        border: 1px solid #68BC3B;
        background-color: #68BC3B;
        color: #fff;

        .icon-fill {
          fill: #ffffff;
        }
      }
      i {
        display: inline-block;
        vertical-align: middle;
        margin-left: 5px;
        svg {
          width: 18px;
          height: 18px;
        }
      }
    }
    a {
      font-size: 13px;
      line-height: 16px;
      color: #6a6a6a;
      border-bottom: 1px dotted #6a6a6a;
      display: inline-block;
      -webkit-transition: all .3s;
      -moz-transition: all .3s;
      -ms-transition: all .3s;
      -o-transition: all .3s;
      transition: all .3s;

      &.underline:after, &:not(.no-underline):hover:after {
        display: none;
      }
      &.check {
        color: #dd3743;
        border-bottom-color: #dd3743;
      }
    }
    input {
      cursor: pointer;
      opacity: 0;
      position: absolute;
      width: 100%;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      height: 100%;
      margin: 0;
      z-index: 3;
    }
  }
</style>
