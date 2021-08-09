<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { activeSidebar, toggleSidebar } from '/@src/state/activeSidebarState'
import usePackageTable from '/@src/composable/package/use-package-table'
import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = 'Package Information'
useHead({
  title: 'Whitehouse Package',
})

const {
  isLoading,
  packageTableHeaders,
  paginationData,
  currentPage,
  perPage,
  onEditPackage,
  fetchAllPackages,
} = usePackageTable()
</script>

<template>
  <div class="page-content-inner">
    <Datatable
      :is-loading="isLoading"
      :headers="packageTableHeaders"
      :data="paginationData?.data || []"
      :current-page="currentPage"
      :total="paginationData?.total"
      :per-page="perPage"
      is-action
    >
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
        <!-- <div class="dark-inverted is-flex is-justify-content-flex-end">
          <V-Button
            rounded
            outlined
            color="primary"
            class="action-btn"
            :to="{
              name: 'product-package-:id-update',
              params: { id: value.id },
            }"
          >
            Edit
          </V-Button>
        </div> -->
        <div class="is-flex is-justify-content-flex-end">
          <V-Dropdown title="More" spaced right>
            <template #content>
              <a role="menuitem" href="#" class="dropdown-item is-media">
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
                @click="onEditPackage(value.id)"
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
