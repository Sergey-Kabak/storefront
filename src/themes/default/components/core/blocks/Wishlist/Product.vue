<template>
  <li class="product" :class="stockStatus">
    <div class="product-left">
      <div class="product-img" @click="closeWishlist">
        <router-link :to="productLink" class="product-link">
          <img v-lazy="image.src" :alt="product.name" class="product-image">
        </router-link>
      </div>
    </div>
    <div class="product-right">
      <div class="product-top">
        <span class="product-status" :class="stockStatus">{{ $t(stockStatus) }}</span>
        <div class="additional-actions">
          <div class="additional-actions-container">
            <AddToCompare :product="product"> </AddToCompare>
            <RemoveIcon @onRemove="removeProductFromWhishList(product)"/>
          </div>
          <div class="additional-actions mobile">
            <more-icon class="more">
              <AddToCompare :product="product" showDescription class="more-item"/>
              <RemoveIcon @onRemove="removeProductFromWhishList(product)" :description="$t('Remove from wishlist')"  class="more-item"/>
            </more-icon>
          </div>
        </div>
      </div>
      <div class="product-middle">
        <router-link
          @click.native="closeWishlist()"
          :to="productLink"
          class="product-name"
          style="-webkit-line-clamp: 2; -webkit-box-orient: vertical; display: -webkit-box;"
        >
          {{ product.name | htmlDecode }}
        </router-link>
      </div>
      <div class="product-bottom">
        <product-cart-price :product="product" :nameVisibility="false" class="product-prices" />
        <div class="product-actions" >
          <product-cart-controls @click="addToCart(product)" :product="product" :stockStatus="stockStatus" class="cart-wishlist" />
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import Product from '@vue-storefront/core/compatibility/components/blocks/Wishlist/Product';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers';
import { notifications } from '@vue-storefront/core/modules/cart/helpers';
import ProductImage from 'theme/components/core/ProductImage';
import { ProductStock } from 'theme/helpers'
import { htmlDecode } from '@vue-storefront/core/lib/store/filters';
import AddToCompare from 'theme/components/core/blocks/Compare/AddToCompare';
import RemoveIcon from 'theme/components/core/RemoveIcon';
import MoreIcon from 'theme/components/core/MoreIcon';
import ProductCartControls from '../Product/ProductCartControls';
import ProductCartPrice from "../Product/ProductCartPrice";

export default {
  components: {
    ProductImage,
    AddToCompare,
    MoreIcon,
    ProductCartControls,
    ProductCartPrice,
    RemoveIcon
  },
  mixins: [Product],
  props: {
    showAddToCart: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    productLink () {
      return formatProductLink(this.product, currentStoreView().storeCode)
    },
    image () {
      return {
        loading: this.thumbnail,
        src: this.thumbnail
      }
    },
    storeView () {
      return currentStoreView()
    },
    stockStatus () {
      return ProductStock(this.product)
    }
  },
  methods: {
    removeProductFromWhishList (product) {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'success',
        message: this.$t('Remove {productName} from wishlist', { productName: htmlDecode(product.name) }),
        action1: { label: this.$t('OK'), action: () => {
          this.removeFromWishlist(product)
        }},
        action2: { label: this.$t('Cancel') },
        hasNoTimeout: true
      }, { root: true })
    },
    async addToCart (product) {
      if (this.stockStatus === 'InStock') {
        try {
          const diffLog = await this.$store.dispatch('cart/addItem', { productToAdd: product })
          diffLog.clientNotifications.forEach(notificationData => {
            this.notifyUser(notificationData)
          })
        } catch (message) {
          this.notifyUser(notifications.createNotification({ type: 'error', message }))
        }
      } else {
        this.closeWishlist()
        this.$router.push(this.productLink)
      }
    },
    notifyUser (notificationData) {
      this.$store.dispatch('notification/spawnNotification', notificationData, { root: true })
    }
  }
}
</script>

<style lang="scss" scoped>
.product {
  position: relative;
  display: flex;
  padding: 12px 12px 16px 16px;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  margin-bottom: 20px;
}

.product-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-middle {
  overflow: hidden;
  margin-bottom: 16px;
  height: 36px;
}

.product-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.product-right {
  width: 100%;
}

.product-top {
  margin-bottom: 8px;
}

.additional-actions.mobile {
  display: none;
}

.additional-actions-container {
  display: flex;
}

.product-img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 88px;
  height: 88px;
  margin-right: 16px;
}

.product-link {
  display: flex;
  justify-content: center;
}

.product-image {
  max-width: 88px;
  max-height: 88px;
}

.product-status {
  font-family: DIN Pro;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
}

.product-name {
  height: 36px;
  display: block;
  font-family: DIN Pro;
  font-size: 15px;
  line-height: 18px;
  color: #1A1919;
}

::v-deep {
  .product-prices {
    .price-discount {
      position: absolute;
      top: 16px;
      left: 16px;
      padding: 0 6px;
    }
  }
}

@media (max-width: 768px) {
  .additional-actions.mobile {
    display: block;
  }

  .additional-actions-container {
    display: none;
  }

  .product-middle {
    height: 32px;
  }

  .product-img {
    width: 56px;
    height: 56px;
  }

  .product-image {
    max-width: 56px;
    max-height: 56px;
    margin-right: 12px;
  }

  .product-status {
    font-size: 13px;
  }

  .product-name {
    font-size: 13px;
    line-height: 16px;
  }

  ::v-deep {
    .product-prices {
      .price-special {
        font-size: 18px;
        line-height: 20px;
      }

      .price-original {
        font-size: 12px;
        line-height: 12px;
      }
    }
  }
}
</style>
