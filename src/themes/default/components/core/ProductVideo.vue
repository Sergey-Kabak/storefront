<template>
  <div class="product-video">
    <div
      v-show="!videoStarted"
      class="gallery-video absolute w-100 h-100"
      @click="initVideo"
    >
      <div class="play-video">
        <svg width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 8.5L0.749999 16.7272L0.75 0.272758L15 8.5Z" fill="white"/>
        </svg>
      </div>
    </div>
    <div v-if="videoStarted" class="iframe-wrapper w-100 h-100">
      <LoaderScoped v-if="!iframeLoaded" />
      <iframe
        :src="embedUrl"
        loading="lazy"
        class="w-100 h-100"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        webkitallowfullscreen mozallowfullscreen allowfullscreen
        @load="iframeIsLoaded()"
      />
    </div>
  </div>
</template>

<script>
import LoaderScoped from 'theme/components/core/LoaderScoped.vue';
import { ProductVideo } from '@vue-storefront/core/modules/catalog/components/ProductVideo.ts';

export default {
  components: {
    LoaderScoped
  },
  mixins: [ProductVideo]
}
</script>

<style lang="scss" scoped>

.play-video {
  position: absolute;
  padding: 25px;
  border-radius: 50%;
  background-color: #23BE20;
  display: flex;
  margin: auto;
  width: 68px;
  height: 68px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: .2s ease-in-out;

  svg {
    margin-left: 4px;
    width: 19px;
    height: 19px;
  }
}

.product-video {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;

  &:hover {
    .play-video {
      transform: translate(-50%, -50%), scale(1.1);
    }
  }

  .gallery-video {
    top: 0;

    > .material-icons {
      left: 0;
      right: 0;
      color: #fff;
      font-size: 120px;
      top: calc( 50% - 60px);
      transition: transform ease 0.3s;
    }

    &:hover {
      cursor: pointer;

      > .material-icons {
        transform: scale(1.1);
      }
    }
  }

  .iframe-wrapper {
    left: 0;

    iframe {
      top: 0;
      left: 0;
      border: none;
    }
  }
}
</style>
