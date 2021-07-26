<script setup lang="ts">
import { defineProps, computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Search...',
  },
  modelSearch: {
    type: String,
    default: '',
  },
  perPage: {
    type: Number,
    default: 10,
  },
})
const internalModelSearch = ref(props.modelSearch)
const internalPerpage = ref(props.perPage)
const setSearch = () => {
  router.push({
    query: {
      ...route.query,
      search: internalModelSearch.value,
    },
  })
}

const setPerpage = () => {
  router.push({
    query: {
      ...route.query,
      perPage: +internalPerpage.value,
    },
  })
}
/**
 * Clear search
 */
watch(
  () => internalModelSearch.value,
  () => (internalModelSearch.value.length === 0 ? setSearch() : null)
)
</script>
<template>
  <div class="flex-table-wrapper mt-4">
    <div class="flex-table-toolbar">
      <div class="left">
        <V-Field class="width-search">
          <V-Control icon="feather:search">
            <input
              type="text"
              class="input is-rounded"
              v-model="internalModelSearch"
              :placeholder="placeholder"
              @keyup.enter="setSearch"
            />
          </V-Control>
        </V-Field>
      </div>
      <div class="right">
        <V-Field class="width-select">
          <V-Control>
            <div class="select is-rounded">
              <select v-model="internalPerpage" @change="setPerpage">
                <option value="10">10 results per page</option>
                <option value="25">25 results per page</option>
                <option value="50">50 results per page</option>
                <option value="100">100 results per page</option>
              </select>
            </div>
          </V-Control>
        </V-Field>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.width-search {
  width: 25rem;
}
.width-select {
  width: auto;
}
</style>
