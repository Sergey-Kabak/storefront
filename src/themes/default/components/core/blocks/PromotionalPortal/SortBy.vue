<template>
  <div class="promo-sort">
    <span class="promo-sorting">{{ $t('First') }}: </span>
    <div div class="sort-by">
      <label
        class="label"
        :class="{ active: variant.id === sortby.id }"
        v-for="variant in sortingVariants"
        :key="variant.id"
      >
        <input
          type="radio"
          name="sortby"
          :value="variant"
          v-model="sortby"
          @change="changeOrder"
        />
        {{ $t(variant.label) }}
      </label>
    </div>
  </div>
</template>

<script>
import SortBy from "@vue-storefront/core/compatibility/components/SortBy";
import config from "config";

export default {
  mixins: [SortBy],
  props: {
    hasLabel: {
      type: Boolean,
      required: false,
      default: false
    },
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      sortby: ""
    };
  },
  computed: {
    sortByAttribute() {
      return config.entities.promotionals.sortByAttributes;
    },
    sortingOptions() {
      return config.entities.promotionals.sortByAttributes;
    },
    sortingVariants() {
      let variants = [];
      Object.keys(this.sortingOptions).map(label => {
        variants.push({
          label: label,
          id: this.sortingOptions[label],
          type: "sort"
        });
      });
      return variants;
    }
  },
  mounted() {
    const sort = null;
    if (sort) {
      const sortingOptionValues = Object.values(this.sortingOptions);
      const sortOptionExist = sortingOptionValues.includes(sort);
      if (sortOptionExist) {
        this.sortby = sort;
      }
    }
  },
  watch: {
    value: {
      handler() {
        const defaultVariant =
          this.value && this.value.length
            ? this.value
            : config.entities.promotionals.defaultSortBy.attribute;
        this.sortby = this.sortingVariants.find(variant =>
          variant.id.includes(defaultVariant)
        );
      },
      immediate: true
    }
  },
  methods: {
    changeOrder() {
      this.sort();
    },
    sort() {
      this.$emit("change", this.sortby);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~theme/css/base/text";
.sort-by {
  display: flex;
  align-items: center;
  position: relative;
  .label {
    font-family: DIN Pro;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 16px;
    color: #afb3b9;
    position: relative;
    margin-right: 20px;
    border-bottom: 1px solid transparent;
    transition: 0.2s ease-in;

    &:last-child {
      margin-right: 0;
    }

    &.active {
      color: #1a1a1a;
      border-bottom-color: #1a1a1a;
    }

    &:hover {
      color: #1a1a1a;
    }

    input {
      cursor: pointer;
      margin: 0;
      padding: 0;
      opacity: 0;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    }
  }
  select {
    @extend .h4;
    font-size: 14px;
    border: none;
    width: 100%;
    border-radius: 0;
    background-color: transparent;
    margin-right: 0;
    &:focus {
      outline: none;
    }
  }
  &__icon {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
}
@media (max-width: 770px) {
  .sort-by {
    width: 100%;
  }
}

.promo-sort {
  display: flex;
  align-items: center;
  margin: 0px 0px 28px 0;
}

.promo-sorting {
  font-family: DIN Pro;
  font-weight: bold;
  font-size: 14px;
  line-height: 16px;
  color: #1A1919;
  margin-right: 12px;
}
</style>
