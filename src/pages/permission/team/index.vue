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

pageTitle.value = 'Team'

useHead({
  title: 'Whitehouse Team',
})

const data = [
  {
    id: 0,
    username: 'Erik K.',
    position: 'Product Manager',
    picture: '/demo/avatars/8.jpg',
    badge: '/images/icons/flags/united-states-of-america.svg',
    team: 'Software',
    description: 'Lorem, ipsum dolor elit.',
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
      // and more contacts ...
    ],
  },
  {
    id: 0,
    username: 'Erik K.',
    position: 'Product Manager',
    picture: '/demo/avatars/8.jpg',
    badge: '/images/icons/flags/united-states-of-america.svg',
    team: 'Software',
    description:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem, quam.',
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
      // and more contacts ...
    ],
  },
  {
    id: 0,
    username: 'Erik K.',
    position: 'Product Manager',
    picture: '/demo/avatars/8.jpg',
    badge: '/images/icons/flags/united-states-of-america.svg',
    team: 'Software',
    description: 'Lorem, ipsum dolor sit Autem, quam.',
    contacts: [
      {
        id: 0,
        picture: '/demo/avatars/25.jpg',
        initials: 'AC',
        color: 'info',
      },
      // and more contacts ...
    ],
  },
  {
    id: 0,
    username: 'Erik K.',
    position: 'Product Manager',
    picture: '/demo/avatars/8.jpg',
    badge: '/images/icons/flags/united-states-of-america.svg',
    team: 'Software',
    description: 'Lorem, ipsum dolor sit amet consectetur',
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
      // and more contacts ...
    ],
  },
  // and more data ...
]
</script>

<template>
  <div class="page-content-inner">
    <div class="list-flex-toolbar flex-list-v1">
      <V-Field>
        <V-Control icon="lnil lnil-search-alt">
          <input type="text" class="input" placeholder="Search" />
        </V-Control>
      </V-Field>
      <V-Buttons>
        <V-Button color="primary" icon="fas fa-plus" elevated>
          Add Team
        </V-Button>
      </V-Buttons>
    </div>

    <!--V-FlexTable-->
    <V-FlexTable>
      <template #header>
        <div class="flex-table-header">
          <span class="is-grow">Manager</span>
          <span>Team</span>
          <span>Description</span>
          <span>Members</span>
          <span class="cell-end">Actions</span>
        </div>
      </template>
      <template #body>
        <FlexTableTeam :rows="data" />
      </template>
    </V-FlexTable>

    <p></p>

    <!--Table Pagination-->
    <V-FlexPagination
      :item-per-page="10"
      :total-items="63"
      :current-page="4"
      :max-links-displayed="5"
    />
  </div>
</template>
