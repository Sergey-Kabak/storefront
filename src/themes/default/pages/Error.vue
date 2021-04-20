<template>
  <div id="page_not_found">
    <div class="v-container">
      <div class="error-page">
        <div class="error-left">
          <span class="title"> <span class="highlighted"> 500 </span> - {{ $t('Server error') }}</span>
          <div class="error-info">
            <span class="info-title">{{ $t('Sorry, something went wrong') }} :(</span>
            <div class="emojis">
              <img src="/assets/emojis/surprised.png" alt="surprised" class="emoji">
              <img src="/assets/emojis/facepalm.png" alt="facepalm" class="emoji">
              <img src="/assets/emojis/wrench.png" alt="wrench" class="emoji">
            </div>
            <router-link :to="localizedRoute('/')" class="link">
              <button-full class="not-found">{{ $t('to main') }}</button-full>
            </router-link>
          </div>
          <div class="error-image">
            <img src="/assets/custom/thunder.png" alt="thunder">
          </div>
        </div>
        <div class="error-right">
          <div class="error-cloud top">
            <span class="cloud-text">fix me, please <pre class="emoji-icon">😭</pre> </span>
            <svg width="162" height="140" viewBox="0 0 162 140"  fill="#f2f2f2" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.8625 54.003C11.4647 50.3853 10.7577 46.5712 10.7577 42.6309C10.7577 25.184 24.9515 10.9902 42.3983 10.9902C46.2929 10.9902 50.0663 11.6824 53.6493 13.0494C60.7165 4.97481 70.6698 0.390625 81.3163 0.390625C93.849 0.390625 105.502 6.86336 112.306 17.442C114.313 16.9315 116.357 16.5805 118.431 16.3877C119.688 16.2715 120.95 16.211 122.212 16.211C144.326 16.211 162.316 34.2016 162.316 56.3155C162.316 70.3845 155.055 83.2323 143.182 90.5072L162.067 135.214C162.564 136.39 162.305 137.749 161.412 138.66C160.805 139.28 159.985 139.61 159.152 139.61C158.757 139.61 158.359 139.535 157.978 139.383L109.85 120.144C102.121 125.329 93.142 128.061 83.7685 128.061C71.8031 128.061 60.5571 123.627 51.8572 115.53C47.2297 117.548 42.3019 118.568 37.1776 118.568C16.8522 118.568 0.316269 102.033 0.316269 81.7071C0.316269 70.9728 4.85843 61.0097 12.8625 54.003Z"/>
            </svg>
          </div>
          <div class="error-cloud bottom">
            <span class="cloud-text">{{ $t('We will fix it soon') }} <pre class="emoji-icon">🙃</pre> </span>
            <svg width="162" height="140" viewBox="0 0 162 140" fill="#E8E8E8" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.8625 54.003C11.4647 50.3853 10.7577 46.5712 10.7577 42.6309C10.7577 25.184 24.9515 10.9902 42.3983 10.9902C46.2929 10.9902 50.0663 11.6824 53.6493 13.0494C60.7165 4.97481 70.6698 0.390625 81.3163 0.390625C93.849 0.390625 105.502 6.86336 112.306 17.442C114.313 16.9315 116.357 16.5805 118.431 16.3877C119.688 16.2715 120.95 16.211 122.212 16.211C144.326 16.211 162.316 34.2016 162.316 56.3155C162.316 70.3845 155.055 83.2323 143.182 90.5072L162.067 135.214C162.564 136.39 162.305 137.749 161.412 138.66C160.805 139.28 159.985 139.61 159.152 139.61C158.757 139.61 158.359 139.535 157.978 139.383L109.85 120.144C102.121 125.329 93.142 128.061 83.7685 128.061C71.8031 128.061 60.5571 123.627 51.8572 115.53C47.2297 117.548 42.3019 118.568 37.1776 118.568C16.8522 118.568 0.316269 102.033 0.316269 81.7071C0.316269 70.9728 4.85843 61.0097 12.8625 54.003Z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Error from '@vue-storefront/core/pages/Error';
import ButtonFull from 'theme/components/theme/ButtonFull';

export default {
  name: 'Error',
  mixins: [Error],
  components: {
    ButtonFull
  },
  mounted() {
    eS('sendEvent', 'NotFound');
  },
}
</script>

<style lang="scss" scoped>
#page_not_found {
  display: flex;
  flex-grow: 1;
  margin-bottom: 16px;
}
.error-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.error-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 32px;
}

.title {
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  color: #1A1919;
  margin-bottom: 24px;

  .highlighted {
    color: #ee2c39;
  }
}

.error-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 277px;
  width: 100%;
  margin-bottom: 24px;
  padding: 16px;
  border: 1px solid #E0E0E0;
  border-radius: 4px;
}

.info-title {
  font-family: DIN Pro;
  font-size: 15px;
  line-height: 24px;
  color: #5F5E5E;
  margin-bottom: 16px;
}

.emojis {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;

  .emoji {
    margin-right: 12px;

    &:last-child {
      margin-right: 0;
    }
  }
}

.button-full.not-found {
  max-width: 131px;
}

.error-right {
  padding-top: 15px;
  position: relative;
  max-width: 239px;
  width: 100%;
  height: 222px;
}

.error-cloud {
  display: inline-block;
  position: relative;

  &.top {
    svg {
      transform: scale(-1, 1);
    }

    span {
      max-width: 60px;
      color: #1A1919;
    }
  }

  &.bottom {
    position: absolute;
    z-index: 1;
    top: 35%;
    right: 0;

    span {
      color: #23BE20;
      max-width: 113px;
    }
  }
}

.emoji-icon {
  margin-top: 6px;
}

.cloud-text {
  display: block;
  width: 100%;
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  white-space: pre-line;
  transform: translate(-50%, -50%);
  font-family: DIN Pro;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
}

.link {
  width: 100%;
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .error-page {
    flex-direction: column;
    align-items: center;
  }

  .error-left {
    align-items: flex-start;
    margin-right: 0;
  }

  .emojis {
    margin-bottom: 24px;
  }

  .button-full.not-found {
    max-width: 100%;
  }
}
</style>
