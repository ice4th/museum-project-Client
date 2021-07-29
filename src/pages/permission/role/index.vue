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

pageTitle.value = 'Role'

useHead({
  title: 'Whitehouse Role',
})

const data = [
  {
    id: 0,
    name: 'Product Manager',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum, facere?',
    picture: '/demo/avatars/8.jpg',
    badge: '/images/icons/flags/united-states-of-america.svg',
    location: 'Las Vegas, NV',
    industry: 'Software',
    status: 'Active',
    contacts: [
      {
        id: 0,
        picture: '/demo/avatars/25.jpg',
        initials: 'AC',
        color: 'info',
      },
      {
        id: 0,
        picture: '/demo/avatars/25.jpg',
        initials: 'AC',
        color: 'info',
      },
      {
        id: 0,
        picture: '/demo/avatars/25.jpg',
        initials: 'AC',
        color: 'info',
      },
      {
        id: 0,
        picture: '/demo/avatars/25.jpg',
        initials: 'AC',
        color: 'info',
      },
      {
        id: 0,
        picture: '/demo/avatars/25.jpg',
        initials: 'AC',
        color: 'info',
      },
      {
        id: 0,
        picture: '/demo/avatars/25.jpg',
        initials: 'AC',
        color: 'info',
      },
      // and more contacts ...
    ],
  },
  // and more data ...
]
</script>

<template>
  <div class="page-content-inner">
    <div class="flex-table-wrapper mt-4">
      <!--Custom table toolbar-->
      <div class="flex-table-toolbar">
        <div class="left">
          <V-Field>
            <V-Control icon="feather:search">
              <input
                type="text"
                class="input is-rounded"
                placeholder="Filter..."
              />
            </V-Control>
          </V-Field>
        </div>

        <div class="right">
          <V-Button to="role/create-role" color="primary" icon="fas fa-plus">
            Add Role
          </V-Button>
        </div>
      </div>

      <!--V-FlexTable-->
      <V-FlexTable>
        <template #header>
          <div class="flex-table-header">
            <span>Role</span>
            <span>Description</span>
            <span>Team</span>
            <span>Members</span>
            <span class="cell-end">Actions</span>
          </div>
        </template>
        <template #body>
          <FlexTableRole :rows="data" />
        </template>
      </V-FlexTable>

      <!--Table Pagination-->
      <V-FlexPagination
        :item-per-page="10"
        :total-items="873"
        :current-page="42"
        :max-links-displayed="5"
      />
    </div>
  </div>
</template>
