<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { activeSidebar, toggleSidebar } from '/@src/state/activeSidebarState'
import usePackageGroupTable from '/@src/composable/package/use-package-group-table'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { ref } from 'vue'

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
} = usePackageGroupTable()

const showPackageDetailPopup = ref(false)

const view = async (packageId: number) => {
  await viewAddonPackage(packageId)
  showPackageDetailPopup.value = true
}

const closeDetailPopup = () => {
  showPackageDetailPopup.value = false
  addonPackages.value = []
}
</script>

<template>
  <div class="page-content-inner">
    <V-Button color="primary" icon="feather:arrow-down" @click="view"
      >View</V-Button
    >
    <!-- if have data to show -->
    <!-- <V-SimpleDatatables v-if="!isLoading && packageTableFormat.length">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Type</th>
          <th scope="col" data-format="YYYY/MM/DD">Purchase</th>
          <th scope="col" data-sort="asc">Price</th>
          <th scope="col" data-sort="asc">Duration</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(pk, index) in packages" :key="index">
          <td>
            {{ pk.packageId }}
          </td>
          <td>
            <div>
              <p>{{ pk.packageInfo.packageName }}</p>
              <V-Button color="primary" icon="feather:arrow-down" @click="view"
                >View</V-Button
              >
            </div>
            <div>{{ pk.packageInfo.packageName }}</div>
          </td>
          <td>{{ pk.packageInfo.type }}</td>
          <td>{{ pk.packageInfo.purchasable }}</td>
          <td>{{ pk.packageInfo.price }}</td>
          <td>{{ pk.packageInfo.duration }}</td>
        </tr>
      </tbody>
    </V-SimpleDatatables> -->

    <V-FlexTable v-if="!isLoading && packages.length">
      <template #header>
        <div class="flex-table-header">
          <span>ID</span>
          <span class="is-grow">Package Name</span>
          <span>Type</span>
          <span>Purchasable</span>
          <span>Price</span>
          <span>Duration</span>
          <span class="cell-end">Actions</span>
        </div>
      </template>
      <template #body>
        <div v-for="pk in packages" :key="pk.packageId" class="flex-table-item">
          <div class="flex-table-cell" data-th="ID">
            <span class="dark-text">{{ pk.packageId }}</span>
          </div>
          <div class="flex-table-cell is-grow is-bold" data-th="Package Name">
            <span class="light-text">{{ pk.packageInfo.packageName }}</span>
          </div>
          <div class="flex-table-cell" data-th="Type">
            <span class="light-text">{{ pk.packageInfo.type }}</span>
          </div>
          <div class="flex-table-cell" data-th="Purchasable">
            <span class="light-text">{{ pk.packageInfo.purchasable }}</span>
          </div>
          <div class="flex-table-cell" data-th="Price">
            <span class="light-text">{{ pk.packageInfo.price }}</span>
          </div>
          <div class="flex-table-cell" data-th="Duration">
            <span class="light-text">{{ pk.packageInfo.duration }}</span>
          </div>
          <div class="flex-table-cell cell-end" data-th="Actions">
            <V-Button
              color="primary"
              icon="feather:arrow-down"
              :to="{
                name: 'product-package-group-:packageid',
                params: { packageid: `${pk.packageId}` },
              }"
              >View</V-Button
            >
          </div>
        </div>
      </template>
    </V-FlexTable>
    <!-- else for empty stage -->

    <V-Loader v-else size="large" translucent :active="isLoading">
      <V-SimpleDatatables>
        <thead>
          <tr>
            <th data-sortable="false">
              <V-Control>
                <label class="checkbox is-primary is-outlined is-circle">
                  <input id="head-checkbox" type="checkbox" />
                  <span></span>
                </label>
              </V-Control>
            </th>
            <th data-sortable="false">Type</th>
            <th>Name</th>
            <th>Size</th>
            <th>Version</th>
            <th>Last Updated</th>
            <th data-sortable="false"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="7">
              <!--Empty Placeholder-->
              <V-PlaceholderSection
                title="No data to show"
                subtitle="There is currently no data to show in this list."
              >
                <template #image>
                  <img
                    class="light-image"
                    src="/@src/assets/illustrations/placeholders/search-4.svg"
                    alt=""
                  />
                  <img
                    class="dark-image"
                    src="/@src/assets/illustrations/placeholders/search-4-dark.svg"
                    alt=""
                  />
                </template>
              </V-PlaceholderSection>
            </td>
          </tr>
        </tbody>
      </V-SimpleDatatables>
    </V-Loader>
  </div>
</template>
