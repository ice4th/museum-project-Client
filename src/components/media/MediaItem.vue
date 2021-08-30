<script setup lang="ts">
import type { PropType } from 'vue'
import { defineProps, computed } from 'vue'
import moment from 'moment'
import { thumbnailFileIcon } from '/@src/helpers/file-manager.helper'
import type { IFile } from '/@src/types/interfaces/file-manager.interface'
const props = defineProps({
  file: {
    type: Object as IFile,
    default: undefined,
  },
})
const emit = defineEmits(['download-item', 'copy-item'])
</script>

<template>
  <div class="tile-grid-item-inner">
    <V-IconBox size="medium" color="primary" class="flex">
      <img
        :key="file"
        class="image-preview"
        :src="
          file.type.match('image') ? file.src : thumbnailFileIcon(file.type)
        "
        :alt="file?.name"
        @error.once="$event.target.src = 'https://via.placeholder.com/150x150'"
      />
    </V-IconBox>
    <div class="meta">
      <span class="dark-inverted">{{ file.name }}</span>
      <span v-if="file.type !== 'folder'">
        <span>{{ file.size }}</span>
        <i aria-hidden="true" class="fas fa-circle icon-separator"></i>
        <span>{{ moment(file.lastModified).fromNow() }}</span>
      </span>
    </div>
    <MediaAction
      v-if="file.type !== 'folder'"
      :key="`Media-action-${file.name}`"
      :file="file"
      @click.prevent.stop
      @download-item="emit('download-item', $event)"
      @copy-item="emit('copy-item', $event)"
    />
  </div>
</template>

<style lang="scss" scoped>
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/abstracts/_mixins.scss';
@import '../../scss/pages/media/_tile-grid-media.scss';
</style>
