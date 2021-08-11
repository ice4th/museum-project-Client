<script setup lang="ts">
import { useHead } from '@vueuse/head'
import useProductTable from '/@src/composable/product/use-product-table'
import { activeSidebar, toggleSidebar } from '/@src/state/activeSidebarState'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { addCommas } from '/@src/helpers/filter.helper'
pageTitle.value = 'Product Information'

useHead({
  title: 'Whitehouse Product',
})
const {
  products,
  isloading,
  productTableHeaders,
  currentPage,
  perPage,
  total,
} = useProductTable()
console.log(products.value, isloading.value)

const options = {
  searchable: true,
  sortable: true,
  perPageSelect: false,
  data: {
    headings: ['id', 'Name', 'Type', 'Purchasable', 'Price', 'Duration'],
    data: [
      [1, 'Build Up', 'default', 0, '2220', 1],
      [6, 'Make New Friends', 'default', 0, '4320', 1],
      [7, 'Living Abroad', 'default', 0, '4320', 1],
      [8, 'Business', 'default', 0, '6120', 2],
      [9, 'Interview', 'default', 0, '2220', 2],
      [10, 'Presentation', 'default', 0, '2220', 3],
      [11, 'Free Talking (Hands Up)', 'default', 0, '2220', 2],
      [12, 'Mind English', 'default', 0, '2220', 2],
      [13, 'Trial Class', 'default', 0, '2220', 1],
    ],
  },
}
</script>

<template>
  <div class="page-content-inner">
    <!-- if have data to show -->
    <V-SimpleDatatables v-if="options.data.data.length" :options="options" />
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

  <Datatable
    :headers="productTableHeaders"
    :data="products"
    :current-page="currentPage"
    :per-page="perPage"
    :total="total"
    :is-loading="isLoading"
  >
    <template #purchasable="{ value }">
      <v-Tag
        :color="+value ? 'success' : 'danger'"
        :label="+value ? 'Sale' : 'Not for sale'"
        :outlined="!+value"
        class="chip"
        rounded
      />
    </template>
    <template #price="{ value }">
      {{ addCommas(value) }}
    </template>

    <template #action="{ value }">
      <div class="dark-inverted is-flex is-justify-content-flex-end">
        <V-Dropdown speced right>
          <template #button="{ toggle }">
            <V-Button
              icon="feather:more-vertical"
              class="is-trigger"
              @click="toggle"
            >
              Action
            </V-Button>
          </template>
          <template #content>
            <a
              role="menuitem"
              href="#"
              class="dropdown-item is-media"
              @click="showProduct(value)"
            >
              <div class="icon">
                <i aria-hidden="true" class="lnil lnil-eye"></i>
              </div>
              <div class="meta">
                <span>View</span>
                <span>View product details</span>
              </div>
            </a>
            <a
              role="menuitem"
              href="#"
              class="dropdown-item is-media"
              @click="editProduct(value.id)"
            >
              <div class="icon">
                <i aria-hidden="true" class="lnil lnil-pencil"></i>
              </div>
              <div class="meta">
                <span>Edit</span>
                <span>Edit product details</span>
              </div>
            </a>
          </template>
        </V-Dropdown>
      </div>
    </template>
  </Datatable>
</template>

<style lang="scss" scoped>
.chip {
  width: 80%;
  max-width: 80px;
  text-align: center;
}
</style>
