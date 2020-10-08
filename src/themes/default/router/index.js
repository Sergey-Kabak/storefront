import i18n from '@vue-storefront/i18n';

const Home = () => import(/* webpackChunkName: "vsf-home" */ 'theme/pages/Home.vue');
const PageNotFound = () => import(/* webpackChunkName: "vsf-not-found" */ 'theme/pages/PageNotFound.vue');
const ErrorPage = () => import(/* webpackChunkName: "vsf-error" */ 'theme/pages/Error.vue');
const Product = () => import(/* webpackChunkName: "vsf-product" */ 'theme/pages/Product.vue');
const Category = () => import(/* webpackChunkName: "vsf-category" */ 'theme/pages/Category.vue');
const CmsPage = () => import(/* webpackChunkName: "vsf-cms" */ 'theme/pages/CmsPage.vue');
const Checkout = () => import(/* webpackChunkName: "vsf-checkout" */ 'theme/pages/Checkout.vue');
const Compare = () => import(/* webpackChunkName: "vsf-compare" */ 'theme/pages/Compare.vue');
const MyAccount = () => import(/* webpackChunkName: "vsf-my-account" */ 'theme/pages/MyAccount.vue');
const Static = () => import(/* webpackChunkName: "vsf-static" */ 'theme/pages/Static.vue');
// const ThankYouPage = () => import(/* webpackChunkName: "vsf-static" */ 'src/themes/default/components/core/blocks/Checkout/ThankYouPage.vue')

let routes = [
  { name: 'home', path: '/', component: Home, alias: '/pwa.html', meta: { title: i18n.t('home page meta title'), description: i18n.t('home page meta discription') } },
  // { name: 'ThankYouPage', path: '/thank-you-page', component: ThankYouPage },
  { name: 'checkout', path: '/checkout', component: Checkout },

  { name: 'delivery', path: '/delivery', component: Static, props: { page: 'lorem', title: i18n.t('Delivery') }, meta: { description: 'delivery metadesc' } },
  { name: 'payment', path: '/payment', component: Static, props: { page: 'lorem', title: i18n.t('Payment') }, meta: { description: 'payment metadesc' } },
  { name: 'payments and loans', path: '/payments-and-loans', component: Static, props: { page: 'lorem', title: i18n.t('Payments and loans') }, meta: { description: 'payments and loans metadesc' } },
  { name: 'warranty exchange return', path: '/warranty-exchange-return', component: Static, props: { page: 'lorem', title: i18n.t('Warranty, Exchange, Return') }, meta: { description: 'warranty, exchange, return metadesc' } },
  { name: 'service centers', path: '/service-centers', component: Static, props: { page: 'lorem', title: i18n.t('Service centres') }, meta: { description: 'service centers metadesc' } },
  { name: 'using a promo code', path: '/using-a-promo-code', component: Static, props: { page: 'lorem', title: i18n.t('Use promotional code') }, meta: { description: 'using a promo code metadesc' } },
  { name: 'public offer', path: '/public-offer', component: Static, props: { page: 'lorem', title: i18n.t('Public offer') }, meta: { description: 'public offer metadesc' } },
  { name: 'promotional offers', path: '/promotional-offers', component: Static, props: { page: 'lorem', title: i18n.t('Promotions') }, meta: { description: 'promotional offers metadesc' } },
  { name: 'shops', path: '/shops', component: Static, props: { page: 'lorem', title: i18n.t('The shops') }, meta: { description: 'shops metadesc' } },
  { name: 'about the company', path: '/about-the-company', component: Static, props: { page: 'lorem', title: i18n.t('Company') }, meta: { description: 'about the company metadesc' } },
  { name: 'own account', path: '/own-account', component: Static, props: { page: 'lorem', title: i18n.t('Own account') }, meta: { description: 'own account metadesc' } },
  { name: 'work in the company', path: '/work-in-the-company', component: Static, props: { page: 'lorem', title: i18n.t('Vacancies') }, meta: { description: 'work in the company metadesc' } },
  { name: 'landlords', path: '/landlords', component: Static, props: { page: 'lorem', title: i18n.t('To landlords') }, meta: { description: 'landlords metadesc' } },
  { name: 'contacts', path: '/contacts', component: Static, props: { page: 'lorem', title: i18n.t('Contact') }, meta: { description: 'contacts metadesc' } },

  // { name: 'legal', path: '/legal', component: Static, props: { page: 'lorem', title: 'Legal Notice' }, meta: { title: 'Legal Notice', description: 'Legal Notice - example of description usage' } },
  // { name: 'privacy', path: '/privacy', component: Static, props: { page: 'lorem', title: 'Privacy' } },
  // { name: 'magazine', path: '/magazine', component: Static, props: { page: 'lorem', title: 'Magazine' } },
  // { name: 'sale', path: '/sale', component: Static, props: { page: 'lorem', title: 'Sale' } },
  // { name: 'order-tracking', path: '/order-tracking', component: Static, props: { page: 'lorem', title: 'Track my Order' } },
  // { name: 'about-us', path: '/about-us', component: Static, props: { page: 'lorem', title: 'About us' } },
  // { name: 'customer-service', path: '/customer-service', component: Static, props: { page: 'lorem', title: 'Customer service' } },
  // { name: 'store-locator', path: '/store-locator', component: Static, props: { page: 'lorem', title: 'Store locator' } },
  // { name: 'size-guide', path: '/size-guide', component: Static, props: { page: 'lorem', title: 'Size guide' } },
  // { name: 'gift-card', path: '/gift-card', component: Static, props: { page: 'lorem', title: 'Gift card' } },
  // { name: 'returns', path: '/returns', component: Static, props: { page: 'lorem', title: 'Returns policy' } },
  // { name: 'order-from-catalog', path: '/order-from-catalog', component: Static, props: { page: 'lorem', title: 'Order from catalog' } },
  // { name: 'contact', path: '/contact', component: Static, props: { page: 'contact', title: 'Contact' } },

  { name: 'my-account', path: '/my-account', component: MyAccount },
  { name: 'my-shipping-details', path: '/my-account/shipping-details', component: MyAccount, props: { activeBlock: 'MyShippingDetails' } },
  { name: 'my-newsletter', path: '/my-account/newsletter', component: MyAccount, props: { activeBlock: 'MyNewsletter' } },
  { name: 'my-orders', path: '/my-account/orders', component: MyAccount, props: { activeBlock: 'MyOrders' } },
  { name: 'my-order', path: '/my-account/orders/:orderId', component: MyAccount, props: { activeBlock: 'MyOrder' } },
  { name: 'my-recently-viewed', path: '/my-account/recently-viewed', component: MyAccount, props: { activeBlock: 'MyRecentlyViewed' } },
  { name: 'compare', path: '/compare', component: Compare, props: { title: 'Compare Products' } },
  { name: 'error', path: '/error', component: ErrorPage, meta: { layout: 'minimal' } },
  { name: 'virtual-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'bundle-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'simple-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'downloadable-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'grouped-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'configurable-product', path: '/p/:parentSku/:slug/:childSku', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'product', path: '/p/:parentSku/:slug/:childSku', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'category', path: '/c/:slug', component: Category },
  { name: 'cms-page', path: '/i/:slug', component: CmsPage },
  { name: 'page-not-found', path: '*', component: PageNotFound }
];

export default routes;
