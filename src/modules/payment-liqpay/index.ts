import { StorefrontModule } from "@vue-storefront/core/lib/modules"
import EventBus from "@vue-storefront/core/compatibility/plugins/event-bus"

export const PaymentLiqpay: StorefrontModule = function({ store }) {
  let correctPaymentMethod = false;
  const placeOrder = () => {
    if (correctPaymentMethod) {
      EventBus.$emit("checkout-do-placeOrder", {});
    }
	};

  let paymentMethodConfig = {
    title: "Online payment",
    code: "liqpaymagento_liqpay",
    offline: false,
    is_server_method: true
  };

  store.dispatch("checkout/addPaymentMethod", paymentMethodConfig);

  EventBus.$on("checkout-before-placeOrder", placeOrder);

  EventBus.$on("checkout-payment-method-changed", paymentMethodCode => {
    let methods = store.state.checkout.paymentMethods
    if (methods) {
      let method = methods.find(item => item.code === paymentMethodCode);
      if (
        paymentMethodCode === "liqpaymagento_liqpay" &&
        ((typeof method !== "undefined") ||
          typeof method ===
            "undefined")
      ) {
        correctPaymentMethod = true;
      } else {
        correctPaymentMethod = false;
      }
    }
  });
};
