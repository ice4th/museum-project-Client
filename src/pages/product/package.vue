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
    >
      <!-- <template #action>
        <div class="dark-inverted is-flex is-justify-content-flex-end">
          <FlexTableDropdown />
        </div>
      </template> -->
    </Datatable>
  </div>
</template>
