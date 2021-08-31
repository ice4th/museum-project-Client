<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PropType } from 'vue'
import moment from 'moment'
import { thumbnailFileIcon } from '/@src/helpers/file-manager.helper'
import type { IFile } from '/@src/types/interfaces/file-manager.interface'

const props = defineProps({
  file: {
    type: Object as PropType<IFile>,
    default: undefined,
  },
})
const emit = defineEmits(['on-close'])
</script>

<template>
  <V-IconButton
    class="close-button"
    color="primary"
    circle
    icon="feather:x"
    @click="emit('on-close')"
  />
  <div class="column tile-grid tile-grid-v3 is-4">
    <div class="tile-grid-item">
      <div class="tile-grid-item-inner">
        <div class="flex has-text-centered">
          <img
            v-if="file.type.match('image')"
            :src="file.src"
            :alt="file.name"
            class="image-preview"
            @error.once="
              $event.target.src = 'https://via.placeholder.com/150x150'
            "
          />
          <V-Plyr
            v-else-if="file.type.match('video')"
            ratio="16by9"
            :source="file.src"
          />
          <audio v-else-if="file.type.match('audio')" controls>
            <source :src="file.src" />
            Your browser does not support the audio element.
          </audio>
          <img
            v-else
            width="100"
            :src="thumbnailFileIcon(file.type)"
            :alt="file.name"
            @error.once="
              $event.target.src = 'https://via.placeholder.com/150x150'
            "
          />
        </div>
        <div class="meta">
          <p>
            Name: <span class="dark-inverted">{{ file.name }}</span>
          </p>
          <p>
            Size: <span class="dark-inverted">{{ file.size }}</span>
          </p>
          <p>
            Type: <span class="dark-inverted">{{ file.type }}</span>
          </p>
          <p>
            Last modified:
            <span class="dark-inverted">{{
              moment(file.lastUpdateModified).format('DD MMM YYYY HH:mm')
            }}</span>
          </p>
          <p>
            Public URL:
            <a :href="file.src" target="_target" class="dark-inverted"
              >Click Here</a
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/abstracts/_mixins.scss';

.close-button {
  position: absolute;
}
.tile-grid-v3 {
  .tile-grid-item {
    @include vuero-s-card();

    padding: 2rem;
    border-radius: 16px;
    height: 510px;
    max-height: 700px;
    .tile-grid-item-inner {
      display: flex;
      height: 100%;
      flex-direction: column;
      img.image-preview {
        object-fit: cover;
        max-width: 100%;
        max-height: 260px;
        width: auto;
        height: auto;
      }
      audio {
        max-width: 300px;
        min-width: 180px;
        width: 100%;
      }
      .meta {
        margin: 2rem 0;
        display: flex;
        flex-direction: column;
        font-family: $font;
        p {
          font-family: $font-alt;
          font-size: 1rem;
          font-weight: 400;
          color: $light-text;
          line-height: 2;
          text-overflow: ellipsis;
          overflow: hidden;
          span,
          a {
            margin-left: 1rem;
          }
          span {
            color: $dark-text;
          }
        }
      }
    }
  }
}

.is-dark {
  .tile-grid {
    .tile-grid-item {
      @include vuero-card--dark();
    }
  }
  .tile-grid-v3 {
    .tile-grid-item {
      @include vuero-card--dark();
    }
  }
}
</style>
