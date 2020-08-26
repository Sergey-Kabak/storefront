<template>
  <modal name="modal-take-in-pharmacy" class="modal-take-in-pharmacy" :width="550">
    <h3 slot="header" class="align-center px25">
      {{ $t('Pick up in the selected pharmacy') }}
    </h3>
    <div slot="content" class="take-in-pharmacy-content">
      <div class="pharmacy bg-cl-secondary">
        <availability-sheet :id="shippingDetails && shippingDetails.droppoint.id"
                            :stock-id="shippingDetails && shippingDetails.droppoint.city_id"
                            :item="shippingDetails && shippingDetails.droppoint"
                            :hide-actions="true"
                            :hide-products="true"
                            :city="shippingDetails && shippingDetails.droppoint.city"
        />
      </div>
      <div class="product">
        <h4 class="mt30 mb0 cl-mine-shaft product-name" data-testid="productName" itemprop="name">
          {{ product.name | htmlDecode }}
        </h4>
        <div class="product-code mb20">
          {{ $t('SKU') }}: {{ parseInt(product.product_code) }}
        </div>
        <div class="count">
          <label class="qty-label flex">{{ $t('Quantity') }}</label>
          <qty-input v-model.number="qty"
                     @input="updateQuantity"
                     class="mr-5"
                     size="lg"
          />
        </div>
        <div class="row py20 weight-700" v-for="(segment, index) in totals" :key="index" v-if="segment.code === 'grand_total'">
          <div class="col-xs-8">
            <div class="dotted">
              <span>{{ $t('Sum') }}</span>
            </div>
          </div>
          <div class="col-xs-4">
            {{ (qty * cPrice) | price }}
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12 col-sm first-sm">
            <router-link v-if="more"
                         class="button-outline block px10 py20 no-underline align-center"
                         @click.native="returnToShopping"
                         :to="localizedRoute('')"
            >
              {{ $t('Return to shopping') }}
            </router-link>
            <a v-if="!more"
               class="button-outline block px10 py20 no-underline align-center"
               @click="toCheckout"
            >
              {{ $t('Book medicines here') }}
            </a>
          </div>
        </div>

        <div class="row mt20">
          <div class="col-sm-12">
            <div class="add-more-products">
              <base-checkbox class="col-xs-12"
                             id="addMoreProducts"
                             @click="more = !more"
                             v-model="more"
              >
                {{ $t('Add other products to this order') }}
              </base-checkbox>
            </div>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>
<script>

import { mapGetters } from 'vuex';
import Modal from 'theme/components/core/Modal.vue';
import AvailabilitySheet
  from '@vue-storefront/theme-default/components/theme/blocks/AvailabilitySheet/AvailabilitySheet';
import QtyInput from 'default/components/core/blocks/QtyInput/QtyInput.vue';
import BaseCheckbox from 'theme/components/core/blocks/Form/BaseCheckbox';

export default {
  components: {
    Modal,
    AvailabilitySheet,
    QtyInput,
    BaseCheckbox
  },
  data () {
    return {
      more: false,
      qty: 1,
      componentLoaded: false,
      cartItems: this.$store.state.cart.cartItems,
      shipping: this.$store.state.checkout.shippingDetails
    }
  },
  computed: {
    ...mapGetters({
      product: 'product/productCurrent',
      totals: 'cart/totals',
      shippingDetails: 'checkout/getShippingDetails'
    }),
    currentInCart () {
      return this.cartItems.find(p => p.id === this.product.id)
    },
    cPrice () {
      return this.currentInCart ? this.currentInCart.price : this.product.price
    }
  },
  mounted () {
    if (this.currentInCart) { this.qty = this.currentInCart.qty }
    this.$nextTick(() => {
      this.componentLoaded = true
      this.$bus.$emit('modal-show', 'modal-take-in-pharmacy')
    })
  },
  methods: {
    getSelected () {},
    updateQuantity (qty) {
      this.$store.dispatch('cart/updateQuantity', { product: this.product, qty })
    },
    returnToShopping () {
      this.addToCart()
      setTimeout(() => {
        this.close()
      })
    },
    addToCart () {
      if (!this.cartItems.find(p => p.id === this.product.id)) {
        this.$store.dispatch('cart/addItem', { productToAdd: {...this.product, qty: this.qty} })
      }
      this.selectDroppoint(this.shippingDetails.droppoint)
    },
    toCheckout () {
      this.addToCart()
      setTimeout(() => {
        this.$store.dispatch('cart/goToCheckout')
        this.close()
      })
    },
    selectDroppoint (m) {
      let phoneNumber = this.shippingDetails.phoneNumber

      let nameArr = m.name.split(' ')
      let first = nameArr[0]
      let last = nameArr[1]

      if (!last || last.length === 0) { last = first }

      this.shipping = {
        firstName: first,
        lastName: last,
        streetAddress: m.streetname,
        apartmentNumber: m.streetname2,
        zipCode: m.zipcode,
        company: m.id,
        city: m.city,
        droppoint: m,
        country: m.country,
        phoneNumber: phoneNumber,
        shippingMethod: 'flatrate'
      }

      this.$store.dispatch('checkout/saveShippingDetails', this.shipping)
    },
    close () {
      this.$bus.$emit('modal-hide', 'modal-take-in-pharmacy')
    }
  }
}
</script>
<style lang="scss">
  .modal-take-in-pharmacy {
    .modal-container {
      -webkit-border-radius: 5px;
      -moz-border-radius: 5px;
      border-radius: 5px;
      -webkit-box-shadow: 0 0 15px rgba(0,0,0,.3);
      -moz-box-shadow: 0 0 15px rgba(0,0,0,.3);
      box-shadow: 0 0 15px rgba(0,0,0,.3);
    }
    .modal-header {
      padding: 25px;

      h3 {
        margin-top: 0;
        margin-bottom: 0.5em;
      }
    }
    .modal-content {
      padding: 0 25px 30px;

      .take-in-pharmacy-content {
        border-top: 1px solid #ebebeb;
        padding-top: 20px;

        .pharmacy {
          -webkit-border-radius: 7px;
          -moz-border-radius: 7px;
          border-radius: 7px;

          .radioStyled {
            border: none;
            margin: 0;
            padding: 20px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }
        }

        .product {
          .product-code {
            color: #565a66;
          }
          .qty-label {
            font-weight: 800;
          }
          .dotted {
            position: relative;
            &:before {
              content: '';
              display: block;
              position: absolute;
              bottom: 5px;
              left: 0;
              right: 0;
              width: 100%;
              border-bottom: 1px dotted #565a66;
            }
            span {
              display: inline-block;
              position: relative;
              z-index: 2;
              background: #ffffff;
              padding-right: 10px;
            }
          }

          .button-outline {
            cursor: pointer;
            -webkit-transition: all .3s;
            -moz-transition: all .3s;
            -ms-transition: all .3s;
            -o-transition: all .3s;
            transition: all .3s;
            border: 1px solid #E41C3E;
            min-width: 240px;
            border-radius: 5px;
            color: #E41C3E;
            &:hover {
              background-color: #E41C3E;
              color: #fff;
            }
          }
          .add-more-products {
            label {
              font-size: 16px;
              font-weight: 500;
              color: #565a66;
              -webkit-transition: all .3s;
              -moz-transition: all .3s;
              -ms-transition: all .3s;
              -o-transition: all .3s;
              transition: all .3s;
            }
            label:before {
              -webkit-transition: all .3s;
              -moz-transition: all .3s;
              -ms-transition: all .3s;
              -o-transition: all .3s;
              transition: all .3s;
              -webkit-border-radius: 5px;
              -moz-border-radius: 5px;
              border-radius: 5px;
            }

            input:checked + label:before {
              background-color: #E41C3E !important;
              border-color: #E41C3E !important;
              cursor: pointer;
            }

            input:hover + label:before, input:focus + label:before {
              border-color: #911326;
            }

            input:checked + label:after {
              background-color: #E41C3E;
            }
          }
        }
      }
    }
  }
</style>
