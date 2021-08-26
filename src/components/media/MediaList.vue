<script setup lang="ts">
// FileList Component

import type { PropType } from 'vue'
import { defineProps, defineAsyncComponent, computed } from 'vue'
import moment from 'moment'
const emit = defineEmits(['handleFile', 'downloadItem', 'copyItem'])

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
    :class="`column ${selectedFile?.type ? 'is-6' : 'is-4'}`"
    class="column is-6"
    @click="emit('handleFile', item)"
  >
    <div class="tile-grid-item" :class="[item === selectedFile && 'is-active']">
      <MediaItem
        :key="`list-${item.id}`"
        :file="item"
        @download-item="emit('downloadItem', $event)"
        @copy-item="emit('copyItem', $event)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/abstracts/_mixins.scss';
@import '../../scss/pages/lists/_tile-grid-v2.scss';
</style>
