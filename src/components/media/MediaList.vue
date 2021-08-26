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
    v-for="item in fileList"
    :key="item.id"
    class="column"
    @click="item?.type ? emit('handle-file', item) : null"
    @dblclick="!item?.type ? emit('change-folder', item) : null"
  >
    <div class="tile-grid-item" :class="[item === selectedFile && 'is-active']">
      <MediaItem
        :key="`list-${item.id}`"
        :file="item"
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
