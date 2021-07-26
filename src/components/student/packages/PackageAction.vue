<script setup lang="ts">
// PackageAction Component

import type { PropType } from 'vue'
import { defineProps } from 'vue'

type MyCustomType = {
  id: number
  name: string
}

const props = defineProps({
  canActivate: {
    type: Boolean,
    default: false,
  },
  myStringArray: {
    type: Array as PropType<string[]>,
  },
})

// Access props with `props.myCustomObject` and `props.myStringArray`
</script>
<template>
  <V-Dropdown
    title="Manage Package"
    class="is-pushed-mobile"
    color="primary"
    spaced
    right
  >
    <template #content>
      <a
        role="menuitem"
        href="#"
        class="dropdown-item is-media"
        v-show="canActivate"
      >
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-rocket"></i>
        </div>
        <div class="meta">
          <span>Activate</span>
          <span>Activate Package</span>
        </div>
      </a>

      <a role="menuitem" href="#" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-circle-plus"></i>
        </div>
        <div class="meta">
          <span>Add</span>
          <span>Add Ticket</span>
        </div>
      </a>

      <a role="menuitem" href="#" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-calendar"></i>
        </div>
        <div class="meta">
          <span>Expire</span>
          <span>Change Expire Package</span>
        </div>
      </a>

      <a role="menuitem" href="#" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-reply"></i>
        </div>
        <div class="meta">
          <span>Send</span>
          <span>Send Package to another student</span>
        </div>
      </a>

      <a role="menuitem" href="#" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-share"></i>
        </div>
        <div class="meta">
          <span>Change</span>
          <span>Change Package</span>
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
<style lang="scss" scoped>
a.dropdown-item,
button.dropdown-item {
  width: 90%;
}
</style>
