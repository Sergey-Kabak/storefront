<template>
  <div class="orders-wrapper">
    <h2 class="account-page-title">{{ $t('my-orders') }}</h2>
    <div class="orders" v-if="ordersHistory.length">
      <div class="order" v-for="order in ordersHistory" :key="order.entity_id">
        <div class="order-body">
          <div class="order-top">
            <div class="order-top-info"> 
              <span class="order-id">{{ $t('Order №{id}', { id: order.increment_id })}}</span>
              <span class="bullet">&#8226;</span>
              <span class="order-date mobile">{{ order.created_at | date(null, storeView) }}</span>
            </div>
            <span class="order-price">{{ order.grand_total | price(storeView) }}</span>
            <span class="order-date">{{ order.created_at | date(null, storeView) }}</span>
            <div class="order-status" :class="order.status">
              <div class="ellipsis"></div>
              <span class="status">{{ $t(order.status) }}</span>
            </div>
          </div>
          <div class="order-bottom">
            <div class="order-images">
              <div class="order-image" v-for="product in filterOrderItems(order.items)" :key="product.id">
                <product-image :image="image(product)" />
              </div>
            </div>
            <router-link class="order-link" :to="localizedRoute('orders/' + order.entity_id)">
              <button-full>{{ $t('Details') }}</button-full>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="orders-empty" v-else>
      <span class="orders-empty-title">{{ $t('you dont have orders yet') }} :(</span>
      <span class="orders-empty-description">
        {{ $t('make your') }} 
        <router-link class="orders-empty-link" :to="localizedRoute('/')">{{ $t('first purchase') }}</router-link>
        {{ $t('right now') }}
      </span>
      <div class="orders-empty-images">
        <span class="emoji">&#128071;</span>
        <span class="emoji">&#128064;</span>
      </div>
      <router-link :to="localizedRoute('/')">
        <button-full>
          {{ $t('start') }}
        </button-full>
      </router-link>
    </div>
  </div>
</template>

<script>
import UserOrder from '@vue-storefront/core/modules/order/components/UserOrdersHistory';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import ButtonFull from 'theme/components/theme/ButtonFull'
import ProductImage from 'theme/components/core/ProductImage'

export default {
  mixins: [UserOrder],
  components: {
    ButtonFull,
    ProductImage
  },
  computed: {
    storeView () {
      return currentStoreView()
    }
  },
  methods: {
    image(product) {
      return {
        src: this.getThumbnail(product.extension_attributes.thumbnail, 56, 56)
      }
    },
    filterOrderItems(products) {
      if (products) {
        return products.filter(it => it.parent_item && it.parent_item.product_type === 'bundle' || !it.parent_item)
      }
      return [] 
    } 
  }
}
</script>

<style lang="scss" scoped>
.orders {
  border: 1px solid #E0E0E0;
  border-radius: 4px;
}

.order {
  padding: 14px;
  border-bottom: 1px solid #E0E0E0;

  &:last-child {
    border-bottom: 0;
  }
}

.order-body {
  display: flex;
  flex-direction: column;
}

.order-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
}

.order-bottom {
  display: flex;
  justify-content: space-between;
}

.button-full {
  grid-column: 4;
  max-width: 131px;
  min-width: 131px;
}

.order-images {
  display: flex;
  flex-wrap: wrap;
  grid-column: span 3;
}

.order-date {
  &.mobile {
    display: none;
  }
}

.bullet {
  display: none;
}

.order-top-info {
  display: flex;
  align-items: baseline;
}

span {
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #1A1919;
}

.order-status {
  display: flex;
  align-items: center;
}

.order-status {
  &.processing,
  &.pending {
    color: #EE8128;
  }

  &.canceled {
    color: #EE2C39;
  }

  &.complete {
    color: #23BE20;
  }
}

.status {
  color: inherit
}

.ellipsis {
  background-color: currentColor;
}

.orders-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.orders-empty-title {
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #1A1919;
  margin-bottom: 16px;
}

.orders-empty-description {
  font-family: DIN Pro;
  font-size: 15px;
  line-height: 24px;
  color: #5F5E5E;
  margin-bottom: 16px;
}

.orders-empty-link {
  color: #23BE20;
}

.emoji {
  font-size: 18px;
}

.bullet {
  margin: 0 5px;
}

.orders-empty-images {
  margin-bottom: 32px;
}

.product-image {
  width: 56px;
  height: 56px;
}

.order-image  {
  width: auto;
  margin-right: 16px;

  &:last-child {
    margin-right: 0;
  }
}

.order-link {
  margin-top: auto;
}

@media (max-width: 1000px) {
  .order-top {
    flex-direction: column;
    margin-bottom: 16px;
  }

  .order-date {
    display: none;

    &.mobile {
      display: block;
    }
  }

  .bullet {
    display: block;
  }

  .order-top-info,
  .order-price {
    margin-bottom: 16px;
  }
}

@media (max-width: 576px) {
  .order-bottom {
    flex-direction: column;
  }
  .order-images {
    margin-bottom: 16px;
  }

  .button-full {
    max-width: 100%;
  }
}
</style>
