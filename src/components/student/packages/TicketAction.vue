<script setup lang="ts">
// Ticket Action Component

import type { PropType } from 'vue'
import { defineProps } from 'vue'

type MyCustomType = {
  id: number
  name: string
}

const props = defineProps({
  isStartDate: {
    type: Boolean,
    default: true,
  },
  myStringArray: {
    type: Array as PropType<string[]>,
  },
})
</script>
<template>
  <V-Dropdown
    icon="feather:more-vertical"
    class="is-pushed-mobile"
    spaced
    right
  >
    <template #content>
      <a role="menuitem" href="#" class="dropdown-item is-media" isStartDate>
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-calendar"></i>
        </div>
        <div class="meta">
          <span>Start Date</span>
          <span>Change Start Date Ticket</span>
        </div>
      </a>

      <a role="menuitem" href="#" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-calendar"></i>
        </div>
        <div class="meta">
          <span>Expire Date</span>
          <span>Change Expire Date Ticket</span>
        </div>
      </a>

      <hr class="dropdown-divider" />

      <a role="menuitem" href="#" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-circle-minus"></i>
        </div>
        <div class="meta">
          <span>Delete</span>
          <span>Delete Ticket</span>
        </div>
      </a>
    </template>
  </V-Dropdown>
</template>
<style lang="scss" scoped>
a.dropdown-item,
button.dropdown-item {
  width: 90%;
}
</style>
