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
  isLoading,
  productTableHeaders,
  total,
  purchasable,
  selectPurchasable,
} = useProductTable()
</script>

<template>
  <div class="page-content-inner">
    <!-- if have data to show -->
    <Datatable
      :headers="productTableHeaders"
      :data="products"
      :total="total"
      :is-loading="isLoading"
    >
      <template #custom-left>
        <V-Field>
          <V-Control>
            <div class="select is-rounded">
              <select v-model="purchasable" @change="selectPurchasable">
                <option :value="undefined">all</option>
                <option value="1">purchasable</option>
                <option value="0">unpurchasable</option>
              </select>
            </div>
          </V-Control>
        </V-Field>
      </template>
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
          <V-Dropdown spaced right>
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
              <RouterLink
                role="menuitem"
                class="dropdown-item is-media"
                :to="{
                  name: 'product-:productid-view',
                  params: { productid: `${value.id}` },
                }"
              >
                <div class="icon">
                  <i aria-hidden="true" class="lnil lnil-eye"></i>
                </div>
                <div class="meta">
                  <span>View</span>
                  <span>View product details</span>
                </div>
              </RouterLink>
              <RouterLink
                role="menuitem"
                class="dropdown-item is-media"
                :to="{
                  name: 'product-:productid-edit',
                  params: { productid: `${value.id}` },
                }"
              >
                <div class="icon">
                  <i aria-hidden="true" class="lnil lnil-pencil"></i>
                </div>
                <div class="meta">
                  <span>Edit</span>
                  <span>Edit product details</span>
                </div>
              </RouterLink>
            </template>
          </V-Dropdown>
        </div>
      </template>
    </Datatable>
  </div>
</template>

<style lang="scss" scoped>
.chip {
  width: 80%;
  min-width: 100px;
  max-width: 100px;
  text-align: center;
}
</style>
