<script setup lang="ts">
import type { PropType } from 'vue'
import { defineProps, defineAsyncComponent, computed } from 'vue'
import moment from 'moment'
const emit = defineEmits([
  'handle-file',
  'download-item',
  'copy-item',
  'change-folder',
])

const props = defineProps({
  fileList: {
    type: Array,
    default: () => [],
  },
  selectedFile: {
    type: Object || String,
    default: undefined,
  },
})
</script>

<template>
  <div
    v-for="file in fileList"
    :key="file.id"
    class="column"
    @click="!file.type.match('folder') ? emit('handle-file', file) : null"
    @dblclick="file.type.match('folder') ? emit('change-folder', file) : null"
  >
    <div class="tile-grid-item" :class="[file === selectedFile && 'is-active']">
      <MediaItem
        :key="`list-${file.id}`"
        :file="file"
        @download-item="emit('download-item', $event)"
        @copy-item="emit('copy-item', $event)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/abstracts/_mixins.scss';
@import '../../scss/pages/media/_tile-grid-media.scss';
// :class="`column ${selectedFile?.type ? 'is-6' : 'is-4'}`"
</style>
