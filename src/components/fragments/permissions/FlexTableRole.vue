<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  rows: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div v-for="row in rows" :key="row.id" class="flex-table-item">
    <div class="flex-table-cell is-bold" data-th="Company">
      <span class="dark-text">{{ row.name }}</span>
    </div>
    <div class="flex-table-cell" data-th="Type">
      <span class="light-text mobile-text-right">{{ row.description }}</span>
    </div>
    <div class="flex-table-cell" data-th="Industry">
      <span class="light-text">{{ row.industry }}</span>
    </div>
    <div class="flex-table-cell" data-th="Contacts">
      <V-AvatarStack
        class="is-pushed-mobile"
        size="small"
        :avatars="row.contacts"
        :limit="3"
      />
    </div>
    <div class="flex-table-cell cell-end" data-th="Actions">
      <FlexTableDropdown />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media only screen and (max-width: 767px) {
  .mobile-text-right {
    text-align: right;
  }
}
</style>
