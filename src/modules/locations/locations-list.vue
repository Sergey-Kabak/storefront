<template>
  <div class="location-list" :class="{ 'empty': locations && !locations.length }">
    <virtual-list
      style="max-height: 470px; overflow-y: auto;"
      v-if="locations && locations.length"
      :data-key="'id'"
      :data-sources="locations"
      :data-component="Location"
      :keep="15"
    />
    <div v-else>{{ $t("Nothing to show") }}</div>
  </div>
</template>

<script>
import Location from "src/modules/locations/location";
import VirtualList from "vue-virtual-scroll-list";
export default {
  data: () => ({
    Location
  }),
  components: {
    Location,
    VirtualList
  },
  props: ["locations"]
};
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #e0e0e0;
}

.location-list {
  border: 1px solid #e0e0e0;
  border-radius: 4px;

  &.empty {
    border: none;
  }
}

::v-deep div[role="listitem"] {
  border-top: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  border-bottom: 0;

  &:first-child {
    border-radius: 4px;
    border-top: none;
  }

  &:last-child {
    border-radius: 4px;
    border-bottom: none;
  }
}
</style>
