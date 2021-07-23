<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { activeSidebar, toggleSidebar } from '/@src/state/activeSidebarState'
import usePackageGroupTable from '/@src/composable/package/use-package-group-table'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { ref } from 'vue'
import type { IPackageGroupInfo } from '/@src/types/interfaces/package.interface'

pageTitle.value = 'Package Group Information'
useHead({
  title: 'Whitehouse Package',
})

const {
  isLoading,
  packageTableFormat,
  optionsTable,
  packages,
  viewAddonPackage,
  addonPackages,
  currentViewMainPackageId,
  removePackageGroup,
  packageTableHeaders,
} = usePackageGroupTable()

const showConfirmRemovePopup = ref(false)

const currentPackage = ref<IPackageGroupInfo | undefined>(undefined)

const toggleConfirmRemovePopup = (pk?: IPackageGroupInfo) => {
  currentPackage.value = pk
  showConfirmRemovePopup.value = !!pk
}
const confirmRemovePackage = () => {
  if (!currentPackage.value) return
  removePackageGroup(currentPackage.value?.packageId)
  toggleConfirmRemovePopup()
}
</script>

<template>
  <div class="page-content-inner">
    <V-Modal
      title="Confirm Remove Package Group"
      :open="showConfirmRemovePopup"
      size="small"
      actions="center"
      @close="toggleConfirmRemovePopup"
    >
      <template #content>
        <V-PlaceholderSection
          :title="`You want to remove group of ${currentPackage?.packageInfo?.packageName}`"
        />
      </template>
      <template #action>
        <V-Button color="danger" raised @click="confirmRemovePackage"
          >Confirm</V-Button
        >
      </template>
      <template #cancel>
        <V-Button color="primary" raised @click="toggleConfirmRemovePopup"
          >Cancel</V-Button
        >
      </template>
    </V-Modal>

    <Datatable
      :can-searchable="false"
      :headers="packageTableHeaders"
      :data="packages"
      is-action
    >
      <template #action="{ data }">
        <div class="dark-inverted is-flex is-justify-content-flex-end">
          <!-- {{ data }} -->
          <V-Button
            color="primary"
            icon="feather:arrow-down"
            :to="{
              name: 'product-package-group-:packageid',
              params: { packageid: `${data.packageId}` },
            }"
            >View</V-Button
          >
          <V-Button
            color="danger"
            icon="feather:trash"
            class="ml-3"
            @click="toggleConfirmRemovePopup(data)"
            >Delete</V-Button
          >
        </div>
      </template>
    </Datatable>
  </div>
</template>
