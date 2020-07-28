import { StorefrontModule } from "@vue-storefront/core/lib/modules";
import { isServer } from "@vue-storefront/core/helpers";
import Vue from "vue";
import Vuex from 'vuex'
import Liqpay from "./components/Liqpay.vue";
import EventBus from "@vue-storefront/core/compatibility/plugins/event-bus";
export const PaymentLiqpay: StorefrontModule = function({ store }) {
  let correctPaymentMethod = false;
  const placeOrder = () => {
    if (correctPaymentMethod) {
      EventBus.$emit("checkout-do-placeOrder", {});
    }
	};

	
  let paymentMethodConfig = {
    title: "Online payment",
    code: "liqpaymagento_liqpay"
  };
  
  store.dispatch("checkout/addPaymentMethod", paymentMethodConfig);

  EventBus.$on("checkout-before-placeOrder", placeOrder);

  // Mount the info component when required.
  EventBus.$on("checkout-payment-method-changed", paymentMethodCode => {
		let methods = store.state["checkout"].paymentMethods;
    if (methods) {
      let method = methods.find(item => item.code === paymentMethodCode);
      if (
        paymentMethodCode === "liqpaymagento_liqpay" &&
        ((typeof method !== "undefined" && !method.is_server_method) ||
          typeof method ===
            "undefined")
      ) {
        correctPaymentMethod = true;
        const Component = Vue.extend(Liqpay);
        const componentInstance = new Component({ 
					propsData: {
						cart: store.state.cart
					}
				 });
        componentInstance.$mount("#checkout-order-review-additional");
      } else {
        correctPaymentMethod = false;
      }
    }
  });
};
