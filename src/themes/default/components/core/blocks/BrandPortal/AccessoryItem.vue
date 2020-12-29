<template>
  <router-link :to="localizedRoute(accessory.url)" class="accessory-link">
    <div class="accessory-body">
      <img class="accessory-image" :src="accessoryImage" :alt="accessory.name">
      <span class="accessory-name">{{ accessory.name }}</span>
    </div>
    <div class="accessory-arrow">
      <svg class="arrow" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#BDBDBD">
        <path d="M8.58984 7.41L13.1698 12L8.58984 16.59L9.99984 18L15.9998 12L9.99984 6L8.58984 7.41Z" />
      </svg>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    accessory: {
      type: Object,
      required: true
    }
  },
  computed: {
    accessoryImage() {
      return this.getThumbnail(this.accessory.thumbnail, 56, 56, 'brand')
    }
  }
}
</script>

<style lang="scss" scoped>
.accessory-link {
  cursor: pointer;
  max-width: 372px;
  width: 100%;
  padding: 18px 0;
  border-bottom: 1px solid #E0E0E0;

  &:hover {
    .accessory-name {
      color: #23BE20;
    }
    .arrow {
      fill: #23BE20;
    }
  }
}

.accessory-link,
.accessory-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.accessory-image {
  display: block;
  margin-right: 12px;
}

.accessory-name {
  font-family: DIN Pro;
  font-size: 13px;
  line-height: 16px;
  color: #000000;
}

.arrow,
.accessory-name {
  transition: .2s ease-in-out;
}
</style>
