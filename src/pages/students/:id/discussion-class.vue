<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { toFormat } from '/@src/helpers/date.helper'
import useStudentGroupClass from '/@src/composable/student/use-student-group-class'
import type { IDatatableHeader } from '/@src/types/interfaces/component.interface'
import type { IStudentGroupClass } from '/@src/types/interfaces/student.interface'

const headers: IDatatableHeader = [
  { key: 'id', label: 'ID' },
  { key: 'topic', label: 'Topic' },
  { key: 'type', label: 'Type' },
  { key: 'level', label: 'level' },
  { key: 'teacher', label: 'Teacher' },
  { key: 'date', label: 'Date' },
  { key: 'time', label: 'Time' },
  { key: 'attend', label: 'Attend' },
]

const route = useRoute()
const { data, total, isLoading, fetchStudentGroupClass } =
  useStudentGroupClass()

const x = 'test&#013;\ntesttest&#013;\ntesttest&#013;\ntest'

onMounted(async () => {
  await fetchStudentGroupClass(route.params.id)
  console.log(data)
})
</script>

<template>
  <div class="account-box">
    <Datatable
      :is-loading="isLoading"
      search-placeholder="search ....."
      :headers="headers"
      :data="data"
      :total="total"
    >
      <template #topic="{ value }">
        {{ value || '-' }}
      </template>
      <template #type="{ value }">
        {{ value || '-' }}
      </template>
      <template #level="{ value }">
        {{ value || '-' }}
      </template>
      <template #teacher="{ value }">
        {{ value || '-' }}
      </template>
      <template #date="{ value }">
        <div class="light-text max-content">{{ value || '-' }}</div>
      </template>
      <template #time="{ value }">
        {{ value || '-' }}
      </template>
      <template #attend="{ value }">
        <V-Tag v-if="!value" color="orange" rounded label="Student cancel" />
        <div
          v-else-if="Array.isArray(value) && value.length > 0"
          v-tooltip.rounded.warning="
            value.length === 1 ? '' : value.map((it) => toFormat(it)).join('\n')
          "
          class="light-text max-content"
        >
          {{ toFormat(value[value.length - 1]) }}
        </div>
        <div v-else>-</div>
      </template>
    </Datatable>
  </div>
</template>

<style lang="scss" scoped>
.max-content {
  width: max-content;
}

[class*='hint--'][data-hint]::after {
  white-space: pre-wrap;
  width: max-content;
  line-height: 16px;
}
</style>
