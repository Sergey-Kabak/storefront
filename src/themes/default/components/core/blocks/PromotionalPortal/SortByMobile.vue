<template>
  <div class="sort-by">
    <base-select :options="sortingVariants" :value="sortby && sortby.label" :resultValue="(it) => it.label"> </base-select>
  </div>
</template>

<script>
import BaseSelect from 'theme/components/core/blocks/Form/BaseSelect.vue';
import SortBy from "@vue-storefront/core/compatibility/components/SortBy";
import config from "config";

export default {
  mixins: [SortBy],
  components: {
    BaseSelect
  },
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

</style>
