<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { activeSidebar, toggleSidebar } from '/@src/state/activeSidebarState'
import usePackageGroupTable from '/@src/composable/package-groups/usePackageGroupTable'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { ref } from 'vue'
import type { IPackageGroupInfo } from '/@src/types/interfaces/package.interface'
import { addCommas } from '/@src/helpers/filter.helper'

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
  total,
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
      :headers="packageTableHeaders"
      :data="packages"
      :total="total"
      is-action
    >
      <template #custom-right>
        <div class="is-flex is-justify-content-flex-end pt-4">
          <V-Button
            color="primary"
            icon="fas fa-plus"
            :to="{ name: 'products-packages-groups-create' }"
          >
            Add Package
          </V-Button>
        </div>
      </template>
      <template #generateTicket="{ value }">
        <V-Tag
          :color="+value ? 'success' : 'danger'"
          :label="+value ? 'Generate' : 'Not generate'"
          :outlined="!+value"
          rounded
        />
      </template>
      <template #subPackages="{ value: addons }">
        <ul class="addon-list">
          <li v-for="pk in addons" :key="`addon-${pk.id}`">
            (ID: {{ pk.packageId }}) {{ pk.packageName }}
          </li>
        </ul>
      </template>

      <template #purchasable="{ value }">
        <V-Tag
          :color="+value ? 'success' : 'danger'"
          :label="+value ? 'Sale' : 'Not for sale'"
          :outlined="!+value"
          rounded
        />
      </template>
      <template #price="{ value }">
        {{ addCommas(value) }}
      </template>
      <template #action="{ value }">
        <div class="dark-inverted is-flex is-justify-content-flex-end">
          <DropdownAction>
            <template #content>
              <RouterLink
                :to="{
                  name: 'products-packages-groups-:packageid',
                  params: { packageid: `${value.packageId}` },
                }"
                role="menuitem"
                class="dropdown-item is-media"
              >
                <div class="icon">
                  <i aria-hidden="true" class="lnil lnil-eye"></i>
                </div>
                <div class="meta">
                  <span>View</span>
                  <span>view detail of package group</span>
                </div>
              </RouterLink>
              <RouterLink
                :to="{
                  name: 'products-packages-groups-:packageid-edit',
                  params: { packageid: `${value.packageId}` },
                }"
                role="menuitem"
                class="dropdown-item is-media"
              >
                <div class="icon">
                  <i aria-hidden="true" class="lnil lnil-pencil"></i>
                </div>
                <div class="meta">
                  <span>Edit</span>
                  <span>edit package group</span>
                </div>
              </RouterLink>
              <hr class="dropdown-divider" />
              <a
                role="menuitem"
                class="dropdown-item is-media"
                @click="toggleConfirmRemovePopup(value)"
              >
                <div class="icon">
                  <i aria-hidden="true" class="lnil lnil-trash"></i>
                </div>
                <div class="meta">
                  <span>Delete</span>
                  <span>delete package group</span>
                </div>
              </a>
            </template>
          </DropdownAction>
        </div>
      </template>
    </Datatable>
  </div>
</template>
<style lang="scss" scoped>
ul.addon-list {
  list-style: disc;
}
</style>
