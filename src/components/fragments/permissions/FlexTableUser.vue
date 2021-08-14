<script setup lang="ts">
const props = defineProps({
  rows: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div v-for="row in props.rows" :key="row.id" class="flex-table-item">
    <div class="flex-table-cell is-media is-grow">
      <V-Avatar
        :picture="row.avatar ? row.avatar : undefined"
        :initials="row.initials"
        :color="row.color || undefined"
        size="medium"
      />
      <div>
        <span class="item-name">{{ row.firstname }} {{ row.lastname }}</span>
        <span class="item-meta">
          <span>{{ row.email }}</span>
        </span>
      </div>
    </div>
    <div class="flex-table-cell" data-th="Name">
      <span class="light-text">{{ row.name }}</span>
    </div>
    <div class="flex-table-cell" data-th="Status">
      <span
        class="tag is-rounded"
        :class="[row.status === 1 ? 'is-success' : 'Disabled']"
        >{{ row.status === 1 ? 'Active' : 'Deactive' }}</span
      >
    </div>
    <div class="flex-table-cell foo" data-th="Manage">
      <V-Tags>
        <V-Tag
          v-for="country in row.manageCountry"
          :key="country"
          :label="country"
          color="primary"
          curved
          outlined
        />
      </V-Tags>
    </div>
    <div class="flex-table-cell" data-th="Last Login">
      <span class="light-text">{{ row.lastLogin }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.foo {
  justify-content: space-between;
}
</style>
