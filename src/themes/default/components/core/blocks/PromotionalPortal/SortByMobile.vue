<template>
  <div class="sort-by">
    <select
      name="sortby"
      class="cl-secondary"
      v-model="sortby"
      @change="changeOrder"
    >
      <option v-for="variant in sortingVariants" :value="variant" :key="variant.id">
        {{ $t(variant.label) }}
      </option>
    </select>
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
  @import '~theme/css/base/text';
  @import '~theme/css/variables/colors';
  @import '~theme/css/helpers/functions/color';
  $color-tertiary: color(tertiary);
  .sort-by {
    display: flex;
    align-items: baseline;
    position: relative;
    background: #FFFFFF;
    border: 1px solid #E0E0E0;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 0 17px;
    height: 40px;
    select {
      height: 100%;
      @extend .h4;
      font-size: 14px;
      border: none;
      width: 100%;
      border-radius: 0;
      background-color: transparent;
      margin-right: 0;
      font-family: DIN Pro;
      line-height: 16px;
      color: #1A1919;
      appearance:none;
      background-image: url('/assets/custom/ArrowLeft.svg');
      background-repeat: no-repeat;
      background-position: 100% center;
    
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
</style>
