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
const BrandPortal = () => import(/* webpackChunkName: "vsf-static" */ 'theme/pages/BrandPortal.vue');
const ThankYouPage = () => import(/* webpackChunkName: "vsf-static" */ 'theme/pages/ThankYouPage.vue');
const Shops = () => import(/* webpackChunkName: "vsf-static" */ 'theme/pages/Shops.vue');
const UnderConstruction = () => import(/* webpackChunkName: "vsf-static" */ 'theme/pages/UnderConstruction.vue');
// const ThankYouPage = () => import(/* webpackChunkName: "vsf-static" */ 'src/themes/default/components/core/blocks/Checkout/ThankYouPage.vue')

let routes = [
  { name: 'home', path: '/', component: Home, alias: '/pwa.html', meta: { name: 'home page', title: i18n.t('home page meta title'), description: i18n.t('home page meta discription') } },
  // { name: 'ThankYouPage', path: '/thank-you-page', component: ThankYouPage },
  { name: 'checkout', path: '/checkout', component: Checkout, meta: { name: 'checkout', layout: 'minimal' } },
  { name: 'thank-you-page', path: '/thank-you-page', component: ThankYouPage, meta: { name: 'thank-you-page', layout: 'minimal' } },
  { name: 'brand-portal', path: '/brand-portal/:brandId', component: BrandPortal, meta: { name: 'brand portal' } },
  { name: 'my-account', path: '/my-account', component: MyAccount },
  { name: 'my-shipping-details', path: '/my-account/shipping-details', component: MyAccount, props: { activeBlock: 'MyShippingDetails' } },
  { name: 'my-newsletter', path: '/my-account/newsletter', component: MyAccount, props: { activeBlock: 'MyNewsletter' } },
  { name: 'my-orders', path: '/my-account/orders', component: MyAccount, props: { activeBlock: 'MyOrders' } },
  { name: 'my-order', path: '/my-account/orders/:orderId', component: MyAccount, props: { activeBlock: 'MyOrder' } },
  { name: 'my-recently-viewed', path: '/my-account/recently-viewed', component: MyAccount, props: { activeBlock: 'MyRecentlyViewed' } },
  { name: 'compare', path: '/compare', component: Compare, props: { title: 'Compare Products' }, meta: { name: 'compare' } },
  { name: 'error', path: '/error', component: ErrorPage, meta: { layout: 'error' } },
  { name: 'virtual-product', path: '/p/:parentSku/:slug', component: Product, meta: { name: 'product page' } }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'bundle-product', path: '/p/:parentSku/:slug', component: Product, meta: { name: 'product page' } }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'simple-product', path: '/p/:parentSku/:slug', component: Product, meta: { name: 'product page' } }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'downloadable-product', path: '/p/:parentSku/:slug', component: Product, meta: { name: 'product page' } }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'grouped-product', path: '/p/:parentSku/:slug', component: Product, meta: { name: 'product page' } }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'configurable-product', path: '/p/:parentSku/:slug/:childSku', component: Product, meta: { name: 'product page' } }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'product', path: '/p/:parentSku/:slug/:childSku', component: Product, meta: { name: 'product page' } }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'category', path: '/c/:slug', component: Category, meta: { name: 'category' } },
  { name: 'cms-page', path: '/info/:slug', component: CmsPage, meta: { name: 'cms page' } },
  { name: 'page-not-found', path: '*', component: PageNotFound },
  { name: 'page-not-found', path: '/under-construction', component: UnderConstruction },
  { path: '/ua/shops.html', redirect: '/' },
  { path: '/magazyny', redirect: '/' }
];

export default routes;
