<template>
  <div>
    <description class="mb40" />
    <specifications count="9" class="mb40" />
    <reviews-tab class="mb40" />
  </div>
</template>

<script>
import Description from '../Sections/Descriptions';
import Specifications from '../Sections/Specifications';
import ReviewsTab from './ReviewsTab';
export default {
  components: {
    Description,
    Specifications,
    ReviewsTab
  }
}
</script>
