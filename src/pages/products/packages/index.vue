<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { activeSidebar, toggleSidebar } from '/@src/state/activeSidebarState'
import usePackageTable from '../../../composable/package/usePackageTable'
import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = 'Package Information'
useHead({
  title: 'Whitehouse Package',
})

const { isLoading, packageTableHeaders, paginationData, fetchAllPackages } =
  usePackageTable()
</script>

<template>
  <div class="page-content-inner">
    <Datatable
      :is-loading="isLoading"
      :headers="packageTableHeaders"
      :data="paginationData?.data || []"
      :total="paginationData?.total || 0"
      is-action
    >
      <template #custom-left>
        <div class="is-flex is-justify-content-flex-start pt-4">
          <V-Button
            color="primary"
            icon="fas fa-plus"
            :to="{ name: 'products-packages-create' }"
          >
            Add Package
          </V-Button>
        </div>
      </template>
      <template #purchasable="{ value }">
        <div class="flex-table-cell">
          <span
            class="tag is-rounded"
            :class="[value === '1' && 'is-primary', value === '0' && '']"
            >{{ value === '1' ? 'Sale' : 'Not for Sale' }}</span
          >
        </div>
      </template>
      <template #action="{ value }">
        <div class="is-flex is-justify-content-flex-end">
          <V-Dropdown spaced right>
            <template #button="{ toggle }">
              <V-Button
                icon="feather:more-vertical"
                class="is-trigger"
                @click="toggle"
              >
                Actions
              </V-Button>
            </template>
            <template #content>
              <RouterLink
                role="menuitem"
                class="dropdown-item is-media"
                :to="{
                  name: 'products-packages-:id',
                  params: { id: value.id },
                }"
              >
                <div class="icon">
                  <i aria-hidden="true" class="lnil lnil-eye"></i>
                </div>
                <div class="meta">
                  <span>View</span>
                  <span>View package details</span>
                </div>
              </RouterLink>

              <RouterLink
                role="menuitem"
                class="dropdown-item is-media"
                :to="{
                  name: 'products-packages-:id',
                  params: { id: value.id },
                  hash: '#edit',
                }"
              >
                <div class="icon">
                  <i aria-hidden="true" class="lnil lnil-pencil"></i>
                </div>
                <div class="meta">
                  <span>Edit</span>
                  <span>Edit package details</span>
                </div>
              </RouterLink>

              <hr class="dropdown-divider" />

              <a role="menuitem" href="#" class="dropdown-item is-media">
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
  </div>
</template>

<style lang="scss" scoped>
.tag {
  margin-bottom: 0 !important;
  line-height: 1.5rem;
  height: 1.8em;
}

.action-btn {
  padding: 4px 16px;
  line-height: 1.5rem;
  height: 28px;
}
</style>
