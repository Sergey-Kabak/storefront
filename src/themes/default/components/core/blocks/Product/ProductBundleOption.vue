<template>
  <div class="options">
    <div class="option" v-if="mainOption">
      <div class="option-image">
        <img :src="getThumbnail(mainOption.product.image, 88, 88)" alt="option image">
      </div>
      <div class="option-info">
        <div class="option-type">
          <span class="option-type-text"> {{ $t('Gift') }} !</span>
          <img src="/assets/custom/Gift.svg" alt="gift" class="option-type-image">
        </div>
        <p class="option-description">{{ title }}</p>
        <div class="option-actions">
          <div class="date" v-if="isShowDate">
            <span class="option-date">{{ dateString }}</span>
            <span class="option-days-left" v-if="toDate"> {{ $tc(`Left {count}`, leftDays) }} </span>
            <span class="option-days-left highlighted" v-if="leftDays > 0">{{ $tc(`Left {count} day`, leftDays) }}</span>
          </div>
          <router-link :to="productLink(mainOption)" class="option-link">{{ $t('Details') }}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ProductBundleOption } from '@vue-storefront/core/modules/catalog/components/ProductBundleOption.ts'
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';

export default {
  mixins: [ProductBundleOption],
  props: {
    title: {
      type: String,
      required: false
    },
    date: {
      type: Object,
      required: false
    }
  },
  computed: {
    mainOption() {
      return this.option.product_links[0] 
    },
    fromDate() {
      return this.date.from && new Date(this.date.from).getDate()
    },
    dateString() {
      return `${this.fromDate ? this.$t('From') + ' ' + this.fromDate : ''} ${this.toDate ? this.$t('To') + ' ' + this.toDate : ''} ${(this.fromDate || this.toDate) ? this.getMonth : ''}`
    },
    toDate() {
      return this.date.to && new Date(this.date.to).getDate()
    },
    leftDays() {
      const leftDays = this.toDate && Math.ceil((new Date(new Date(this.date.to) - new Date()) / (1000 * 60 * 60 * 24)))
      return (leftDays > 0) ? leftDays : 0
    },
    isShowDate() {
      return !!(this.date.from || this.date.to)
    },
    getMonth() {
      return this.$tc(new Date().toLocaleDateString('en-US', { month: 'long' }) + ' {count}', this.toDate || this.fromDate)
    }
  },
  methods: {
    productLink(option) {
      return formatProductLink(option.product, currentStoreView().storeCode)
    }
  }
}
</script>

<style lang="scss" scoped>
.option {
  display: flex;
  align-items: flex-start;
  padding: 15px;
  border: 1px dashed #EE2C39;
  border-radius: 4px;
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }
}

.option-info {
  width: 100%;
}

.option-image {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 56px;
  min-height: 56px;
  max-width: 88px;
  max-height: 88px;
  flex-basis: 88px;
  margin-right: 12px;

  img {
    width: auto;
    height: auto;
  }
}

.option-type {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.option-type-text {
  margin-right: 8px;
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 15px;
  line-height: 17px;
  color: #EE2C39;
}

.option-description {
  overflow-wrap: break-word;
  margin: 0 0 12px 0;
  font-family: DIN Pro;
  font-size: 14px;
  line-height: 16px;
  color: #1A1919;
}

.option-actions {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: -4px 0;
}

.date {
  flex-wrap: wrap;
  display: inline-flex;
  align-items: baseline;
  white-space: nowrap;
}

.option-date {
  margin-right: 8px;
  white-space: nowrap;
  font-family: DIN Pro;
  font-size: 12px;
  line-height: 20px;
  color: rgba(95, 94, 94, 0.6);
}

.option-days-left {
  position: relative;
  padding-left: 8px;
  margin-right: 4px;
  font-family: DIN Pro;
  font-size: 12px;
  line-height: 12px;
  color: #1A1919;

  &:after {
    content: "";
    position: absolute;
    width: 1px;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 100%;
    background: #E0E0E0;
  }

  &.highlighted {
    padding-left: 0;
    margin-right: 0;
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    color: #EE2C39;

    &:after {
      content: none
    }
  }
}

.option-link {
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 14px;
  line-height: 15px;
  color: #1A1919;
  margin: 4px 0;
  border-bottom: 1px dashed #1A1919;
  transition: .2s ease-in-out;

  &:hover {
    border-bottom-color: transparent;
  }
}
</style>
