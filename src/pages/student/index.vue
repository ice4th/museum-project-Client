<script setup lang="ts">
/**
 * This is a Vue Component that will be
 * automatically mapped to a entry on vue-router.
 *
 * You will be able to access this page at http://localhost:8083/sidebar-blank-page-5
 * Page uri will match related path to src/pages folder
 *
 * Read more about routing:
 * @see /vite.config.ts
 * @see /src/router.ts
 */

import { useHead } from '@vueuse/head'

/**
 * activeSidebar is an exported ref() that we can use everywhere
 * @see /src/components/navigation/desktop/sidebar/subsidebars/GenericSidebar.vue
 */
import { activeSidebar, toggleSidebar } from '/@src/state/activeSidebarState'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { toFormat } from '/@src/helpers/date.helper'

pageTitle.value = 'Student Information'

useHead({
  title: 'Whitehouse: Student',
})
const headers = [
  { key: 'firstname', label: 'First name' },
  { key: 'lastname', label: 'Last name' },
  { key: 'position', label: 'Position' },
  { key: 'action', label: 'Actions', isEnd: true },
]

const data = [
  { firstname: 'Tina', lastname: 'Bergmann', position: 'Head of Sales' },
  { firstname: 'John', lastname: 'Wistmus', position: 'Senior Executive' },
  { firstname: 'Sam', lastname: 'Watson', position: 'Software Engineer' },
  { firstname: 'Jolaine', lastname: 'Joestar', position: 'HR Manager' },
  { firstname: 'Anders', lastname: 'Jensen', position: 'Accountant' },
]
</script>

<template>
  <div class="page-content-inner">
    <p>Student Page</p>
    <Datatable :can-searchable="false" :headers="headers" :data="data">
      <template #position="{ value }">
        <p>
          value: {{ value }}
          <!-- <FlexTableDropdown /> -->
        </p>
      </template>
      <template #action>
        <div class="dark-inverted is-flex is-justify-content-flex-end">
          <FlexTableDropdown />
        </div>
      </template>
    </Datatable>
  </div>
</template>
