<template>
  <div>
    <description class="mb40" />
    <specifications v-if="['desktop'].includes(screenResolution)" count="9" class="mb40" />
    <reviews-tab v-if="['desktop'].includes(screenResolution)" class="mb40" />
  </div>
</template>

<script>
import Description from '../Sections/Descriptions';
import Specifications from '../Sections/Specifications';
import ReviewsTab from './ReviewsTab';
import ResizeMixin from '../Mixins/ResizeMixin';

export default {
  mixins: [ResizeMixin],
  components: {
    Description,
    Specifications,
    ReviewsTab
  }
}
</script>
