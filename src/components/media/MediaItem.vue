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

// const thumbnailIcon1 = computed(() => {
//   return props.file.type.match('audio')
//     ? 'fas fa-music'
//     : props.file.type.match('video')
//     ? 'fas fa-video'
//     : props.file.type.match('pdf')
//     ? 'fas fa-file-pdf'
//     : 'fas fa-file-alt'
// })
// const thumbnailIcon3 = (type = '') => {
//   return type.match('audio')
//     ? 'fas fa-music'
//     : type.match('video')
//     ? 'fas fa-video'
//     : type.match('pdf')
//     ? 'fas fa-file-pdf'
//     : !type.length
//     ? 'fas fa-folder'
//     : 'fas fa-file-alt'
// }

// const thumbnailIcon2 = (type = '') => {
//   return type.match('audio')
//     ? '/images/icons/files/music.svg'
//     : type.match('video')
//     ? '/images/icons/files/video.svg'
//     : type.match('pdf')
//     ? '/images/icons/files/pdf.svg'
//     : type.match('doc')
//     ? '/images/icons/files/doc-2.svg'
//     : !type.length
//     ? '/images/icons/files/folder2.svg'
//     : '/images/icons/files/doc.svg'
// }
</script>

<template>
  <div class="tile-grid-item-inner">
    <V-IconBox size="medium" color="primary" class="flex">
      <img
        :key="file"
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

<!-- <div class="tile-grid-item-inner">
  <V-IconBox size="medium" color="primary" class="flex">
    <img
      :key="item.src"
      :src="
        item.type.match('image')
          ? item.src
          : thumbnailIcon1(item.type)
      "
      :alt="item.name"
      @error.once="
        $event.target.src =
          'https://via.placeholder.com/150x150'
      "
    />
  </V-IconBox>
  <div class="meta">
    <span class="dark-inverted">{{ item.name }}</span>
    <span>
      <span>{{ item.size }}</span>
      <i
        aria-hidden="true"
        class="fas fa-circle icon-separator"
      ></i>
      <span
        >Updated {{ moment(item.lastModified).fromNow() }}</span
      >
    </span>
  </div>
  <MediaAction @click.prevent.stop />
</div> -->

<!-- <div class="tile-grid-item-inner">
  <V-IconBox size="medium" color="primary" class="flex">
    <i class="fas fa-folder icon-separator"></i>
    <img
      :key="item.src"
      :src="thumbnailIcon1()"
      :alt="item.name"
      @error.once="
        $event.target.src =
          'https://via.placeholder.com/150x150'
      "
    />
  </V-IconBox>
  <div class="meta">
    <span class="dark-inverted">{{ item }}</span>
  </div>
</div> -->
