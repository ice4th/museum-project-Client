<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PropType } from 'vue'
/**
 * @info header example
 * const headers = [
    { key: 'firstname', label: 'First name' },
    { key: 'lastname', label: 'Last name' },
    { key: 'position', label: 'Position' },
    { key: 'action', label: 'Actions', isEnd: true },
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
}
type TabId = 'active' | 'inactive'
const activeTab = ref<TabId>('active')
const filters = ref('')
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
  canSearchable: {
    type: Boolean,
    default: true,
  },
  headers: {
    type: Object as PropType<IHeader[]>,
    required: true,
  },
  data: {
    type: Array,
    default: () => [],
  },
})
const isDataOfArray = computed(
  () => props.data.length > 0 && Array.isArray(props.data[0])
)
</script>

<template>
  <div class="list-view-toolbar">
    <V-Field v-show="canSearchable">
      <V-Control icon="feather:search">
        <input
          v-model="filters"
          class="input custom-text-filter"
          placeholder="Search..."
        />
      </V-Control>
    </V-Field>

    <div class="tabs-inner">
      <slot name="tabs" />
      <!-- <div class="tabs">
        <ul>
          <li :class="[activeTab === 'active' && 'is-active']">
            <a @click="activeTab = 'active'"><span>Active</span></a>
          </li>
          <li :class="[activeTab === 'inactive' && 'is-active']">
            <a @click="activeTab = 'inactive'"><span>Inactive</span></a>
          </li>
          <li class="tab-naver"></li>
        </ul>
      </div> -->
    </div>
  </div>
  <div>
    <table class="table is-hoverable is-fullwidth">
      <thead>
        <tr>
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
        </tr>
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
              <span v-if="!$slots[header.key]">{{ dataList[header.key] }}</span>
              <slot :name="header.key" :value="dataList[header.key]" />
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
    <V-FlexPagination
      :item-per-page="perPage"
      :total-items="total"
      :current-page="currentPage"
      :max-links-displayed="7"
    />
  </div>
</template>
