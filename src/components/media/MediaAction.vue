<script setup lang="ts">
import type { PropType } from 'vue'
import { defineProps, ref } from 'vue'

const props = defineProps({
  file: {
    type: Object,
    default: () => {},
  },
})
const emit = defineEmits(['download-item', 'copy-item'])
const info = ref({ name: props.file?.name, url: props.file?.src })
</script>

<template>
  <V-Dropdown icon="feather:more-vertical" color="primary" spaced right>
    <template #content>
      <a
        role="menuitem"
        class="dropdown-item is-media"
        @click="emit('download-item', info)"
      >
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-cloud-download-alt"></i>
        </div>
        <div class="meta">
          <span>Download</span>
          <span>Download this file</span>
        </div>
      </a>
      <a
        role="menuitem"
        class="dropdown-item is-media"
        @click="emit('copy-item', info.url)"
      >
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-clipboard"></i>
        </div>
        <div class="meta">
          <span>Copy URL</span>
          <span>Copy public url</span>
        </div>
      </a>
      <hr class="dropdown-divider" />
      <a role="menuitem" href="#" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-trash-can-alt"></i>
        </div>
        <div class="meta">
          <span>Delete</span>
          <span>Delete this file</span>
        </div>
      </a>
    </template>
  </V-Dropdown>
</template>
