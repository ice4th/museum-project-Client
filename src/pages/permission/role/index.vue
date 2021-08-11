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
import useRoleInfo from '/@src/composable/permission/use-role-info'

pageTitle.value = 'Role'

useHead({
  title: 'Whitehouse Role',
})

const {
  // state
  search,
  isLoading,
  rolePagination,
  deleteActionItem,
  // variable
  roleTableHeaders,
  // methods
  onViewDetails,
  onUpdateRole,
  onDeleteRole,
} = useRoleInfo()
</script>

<template>
  <div class="page-content-inner">
    <Datatable
      :is-loading="isLoading"
      :headers="roleTableHeaders"
      :data="rolePagination.data"
      :current-page="rolePagination.currentPage"
      :per-page="rolePagination.perPage"
      :total="rolePagination.total"
      :search="search"
      is-action
    >
      <template #custom-right>
        <div class="is-flex is-justify-content-flex-end pt-4">
          <V-Button color="primary" icon="fas fa-plus" to="role/create">
            Add Role
          </V-Button>
        </div>
      </template>
      <template #action="{ value }">
        <div class="is-flex is-justify-content-flex-end">
          <V-Dropdown title="More" spaced right>
            <template #content>
              <a
                role="menuitem"
                class="dropdown-item is-media"
                @click="onViewDetails(value.id)"
              >
                <div class="icon">
                  <i aria-hidden="true" class="lnil lnil-eye"></i>
                </div>
                <div class="meta">
                  <span>View</span>
                  <span>View package details</span>
                </div>
              </a>

              <a
                role="menuitem"
                class="dropdown-item is-media"
                @click="onUpdateRole(value.id)"
              >
                <div class="icon">
                  <i aria-hidden="true" class="lnil lnil-pencil"></i>
                </div>
                <div class="meta">
                  <span>Edit</span>
                  <span>Edit package details</span>
                </div>
              </a>

              <hr class="dropdown-divider" />

              <a
                role="menuitem"
                href="#"
                class="dropdown-item is-media"
                @click="deleteActionItem = value"
              >
                <div class="icon">
                  <i aria-hidden="true" class="lnil lnil-trash-can-alt"></i>
                </div>
                <div class="meta">
                  <span>Remove</span>
                  <span>Remove from list</span>
                </div>
              </a>
            </template>
          </V-Dropdown>
        </div>
      </template>
    </Datatable>

    <!-- Delete Action -->
    <V-Modal
      :open="deleteActionItem !== undefined"
      title="Confirm Remove"
      actions="center"
      @close="deleteActionItem = undefined"
    >
      <template #content>
        <V-PlaceholderSection title="Are you sure ?" />
        <p class="text-center">
          Please make sure that you are going to remove the role named
          <b>"{{ deleteActionItem && deleteActionItem.name }}"</b>.
        </p>
      </template>
      <template #action>
        <V-Button color="primary" raised @click="onDeleteRole"
          >Confirm</V-Button
        >
      </template>
    </V-Modal>
  </div>
</template>

<style lang="scss" scoped>
.text-center {
  text-align: center;
}
</style>
