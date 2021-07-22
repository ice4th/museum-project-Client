<script setup lang="ts">
// PackageAction Component

import type { PropType } from 'vue'
import { defineProps } from 'vue'

type MyCustomType = {
  id: number
  name: string
}

const props = defineProps({
  myCustomObject: {
    type: Object,
  },
  myStringArray: {
    type: Array as PropType<string[]>,
  },
})

// Access props with `props.myCustomObject` and `props.myStringArray`
</script>
<template>
  <V-Dropdown
    icon="feather:more-vertical"
    class="is-pushed-mobile"
    spaced
    right
  >
    <template #content>
      <a role="menuitem" href="#" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-briefcase"></i>
        </div>
        <div class="meta">
          <span>Send</span>
          <span>Send Package</span>
        </div>
      </a>

      <a role="menuitem" href="#" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-change"></i>
        </div>
        <div class="meta">
          <span>Change</span>
          <span>Change Package</span>
        </div>
      </a>

      <a role="menuitem" href="#" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-calendar"></i>
        </div>
        <div class="meta">
          <span>Expire</span>
          <span>Expire Package</span>
        </div>
      </a>

      <hr class="dropdown-divider" />
      <a role="menuitem" href="#" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-trash-can-alt"></i>
        </div>
        <div class="meta">
          <span>Remove</span>
          <span>Remove Package</span>
        </div>
      </a>
    </template>
  </V-Dropdown>
</template>
