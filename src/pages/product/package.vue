<script setup lang="ts">
import { useHead } from '@vueuse/head'

import { activeSidebar, toggleSidebar } from '/@src/state/activeSidebarState'
import usePackageTable from '/@src/composable/package/use-package-table'
useHead({
  title: 'Whitehouse Package',
})

const { isLoading, packageTableFormat, optionsTable } = usePackageTable()
</script>

<template>
  <div>
    <div class="page-title has-text-centered">
      <!-- Sidebar Trigger -->
      <div
        class="vuero-hamburger nav-trigger push-resize"
        @click="toggleSidebar('product')"
      >
        <span class="menu-toggle has-chevron">
          <span
            :class="[activeSidebar !== 'none' && 'active']"
            class="icon-box-toggle"
          >
            <span class="rotate">
              <i class="icon-line-top"></i>
              <i class="icon-line-center"></i>
              <i class="icon-line-bottom"></i>
            </span>
          </span>
        </span>
      </div>

      <div class="title-wrap">
        <h1 class="title is-4">Package Management</h1>
      </div>

      <!-- <Toolbar /> -->
    </div>

    <div class="page-content-inner">
      <!-- if have data to show -->
      <V-SimpleDatatables
        v-if="!isLoading && packageTableFormat.length"
        :options="optionsTable"
      />
      <!-- else for empty stage -->
      <V-SimpleDatatables v-else>
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
    </div>
  </div>
</template>
