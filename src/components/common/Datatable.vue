<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { PropType } from 'vue'
import { useRoute, useRouter } from 'vue-router'
/**
 * @info header example
 * const headers = [
    { key: 'firstname', label: 'First name' },
    { key: 'lastname', label: 'Last name' },
    { key: 'position', label: 'Position', isEnd: true }
  ]
 */

/**
 * @info data example
 * const data = [
    { firstname: 'Tina', lastname: 'Bergmann', position: 'Head of Sales' },
    { firstname: 'John', lastname: 'Wistmus', position: 'Senior Executive' },
    { firstname: 'Sam', lastname: 'Watson', position: 'Software Engineer' },
    { firstname: 'Jolaine', lastname: 'Joestar', position: 'HR Manager' },
    { firstname: 'Anders', lastname: 'Jensen', position: 'Accountant' },
  ]
 */
interface IHeader {
  key: string
  label: string
  isEnd?: Boolean
  isRaw?: Boolean
}
const props = defineProps({
  total: {
    type: Number,
    default: 100,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  perPage: {
    type: Number,
    default: 10,
  },
  search: {
    type: String,
    default: '',
  },
  canSearchable: {
    type: Boolean,
    default: true,
  },
  searchPlaceholder: {
    type: String,
    default: 'Filter...',
  },
  headers: {
    type: Object as PropType<IHeader[]>,
    required: true,
  },
  data: {
    type: Array,
    default: () => [],
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  isAction: {
    type: Boolean,
    default: false,
  },
})

const isDataOfArray = computed(
  () => props.data.length > 0 && Array.isArray(props.data[0])
)
const router = useRouter()
const route = useRoute()
const changePerPage = (value) => {
  const query = {
    ...route.query,
    perPage: props.perPage,
  }

  router.push({
    name: route.name,
    params: route.params,
    query,
  })
}

const parseData = (data: object, key: string, isRaw?: false) => {
  const splitingKey = key.split('.')
  const value = splitingKey.reduce((text, current) => {
    return text[current]
  }, data)
  return isRaw ? data : value
}
const setSearch = () => {
  router.push({
    query: {
      ...route.query,
      page: 1,
      search: props.search,
    },
  })
}
watch(
  () => props.search.value,
  () => (props.search.value.length === 0 ? setSearch() : null)
)
</script>

<template>
  <div class="flex-table-wrapper mt-4">
    <!--Custom table toolbar-->
    <div class="flex-table-toolbar">
      <div class="left">
        <V-Field v-show="canSearchable">
          <V-Control icon="feather:search">
            <input
              v-model="search"
              type="text"
              class="input is-rounded"
              :placeholder="searchPlaceholder"
              @keyup.enter="setSearch"
            />
          </V-Control>
        </V-Field>
        <slot name="custom-left" />
      </div>

      <div class="right">
        <V-Field>
          <V-Control>
            <div class="select is-rounded">
              <select v-model="perPage" @update:model-value="changePerPage">
                <option :value="10">10 results per page</option>
                <option :value="25">25 results per page</option>
                <option :value="50">50 results per page</option>
                <option :value="100">100 results per page</option>
              </select>
            </div>
          </V-Control>
        </V-Field>
        <slot name="custom-right" />
      </div>
    </div>

    <!-- Datatable -->
    <V-Loader size="large" translucent :active="isLoading">
      <table class="table is-hoverable is-fullwidth">
        <thead>
          <tr v-if="!$slots.thead">
            <th
              v-for="(header, index) in headers"
              :key="`h-${index}`"
              scope="col"
              :class="{
                'is-end': header.isEnd,
              }"
            >
              <span
                :class="[
                  header.isEnd &&
                    'dark-inverted is-flex is-justify-content-flex-end',
                ]"
              >
                {{ header.label }}
              </span>
            </th>
            <th v-if="isAction" scope="col" class="is-end">
              <span class="dark-inverted is-flex is-justify-content-flex-end">
                Actions
              </span>
            </th>
          </tr>
          <slot name="thead" />
        </thead>
        <tbody v-if="data.length">
          <template v-if="isDataOfArray">
            <tr v-for="(dataList, index) in data" :key="`tb-${index}`">
              <td v-for="(d, i) in dataList" :key="`tb-data-${i}`">
                <span v-if="!$slots[`custom-column-${i + 1}`]">{{ d }}</span>
                <slot :name="`custom-column-${i + 1}`" :value="d" />
              </td>
            </tr>
          </template>
          <template v-else>
            <tr v-for="(dataList, index) in data" :key="`tb-${index}`">
              <td v-for="(header, i) in headers" :key="`tb-data-${i}`">
                <span v-if="!$slots[header.key]">{{
                  parseData(dataList, header.key)
                }}</span>
                <slot
                  :name="header.key"
                  :value="parseData(dataList, header.key, header.isRaw)"
                />
              </td>
              <td v-if="isAction">
                <FlexTableDropdown v-if="!$slots.action" />
                <slot name="action" :value="dataList" />
              </td>
            </tr>
          </template>
        </tbody>
        <tbody v-else>
          <tr>
            <td :colspan="headers.length">
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
      </table>
    </V-Loader>

    <V-FlexPagination
      :item-per-page="perPage"
      :total-items="total"
      :current-page="currentPage"
      :max-links-displayed="7"
    />
  </div>
</template>
