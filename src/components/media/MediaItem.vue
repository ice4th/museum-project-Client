<script setup lang="ts">
import type { PropType } from 'vue'
import { defineProps, computed } from 'vue'
import moment from 'moment'

const props = defineProps({
  file: {
    type: Object || String,
    default: undefined,
  },
})
const emit = defineEmits(['downloadItem', 'copyItem'])

const thumbnailIcon = computed(() => {
  return props.file?.type?.match('audio')
    ? '/images/icons/files/music.svg'
    : props.file?.type?.match('video')
    ? '/images/icons/files/video.svg'
    : props.file?.type?.match('pdf')
    ? '/images/icons/files/pdf.svg'
    : props.file?.type?.match('doc')
    ? '/images/icons/files/doc-2.svg'
    : !props.file?.type
    ? '/images/icons/files/folder.svg'
    : '/images/icons/files/doc.svg'
})
</script>

<template>
  <div class="tile-grid-item-inner">
    <V-IconBox size="medium" color="primary" class="flex">
      <img
        :key="file"
        class="image-preview"
        :src="file.type?.match('image') ? file.src : thumbnailIcon"
        :alt="file?.name"
        @error.once="$event.target.src = 'https://via.placeholder.com/150x150'"
      />
    </V-IconBox>

    <div v-if="file?.type" class="meta">
      <span class="dark-inverted">{{ file.name }}</span>
      <span>
        <span>{{ file.size }}</span>
        <i aria-hidden="true" class="fas fa-circle icon-separator"></i>
        <span>Updated {{ moment(file.lastModified).fromNow() }}</span>
      </span>
    </div>
    <div v-else class="meta">
      <span class="dark-inverted">{{ file }}</span>
    </div>
    <MediaAction
      v-if="file?.type"
      :key="`Media-action-${file.name}`"
      :file="file"
      @click.prevent.stop
      @download-item="emit('downloadItem', $event)"
      @copy-item="emit('copyItem', $event)"
    />
  </div>
</template>

<style lang="scss" scoped>
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/abstracts/_mixins.scss';
@import '../../scss/pages/lists/_tile-grid-v2.scss';
</style>
