<script setup lang="ts">
import { ref } from 'vue'
import moment from 'moment'
import useStudentPrivateClass from '/@src/composable/students/useStudentPrivateClass'
const { data, total, isLoading } = useStudentPrivateClass()

const headers: IDatatableHeader = [
  { key: 'id', label: 'ID' },
  { key: 'packageName', label: 'Package Name' },
  { key: 'coachName', label: 'Coach', isRaw: true },
  { key: 'date', label: 'Class Date', isRaw: true },
  { key: 'time', label: 'Class Time', isRaw: true },
  { key: 'coachAttend', label: 'Coach Attend' },
  { key: 'studentAttend', label: 'Student Attend' },
]
</script>

<template>
  <div class="account-box">
    <h1 class="title is-4 p-3">Private Class History</h1>
    <div class="page-content-inner">
      <Datatable
        :can-searchable="false"
        :is-loading="isLoading"
        :headers="headers"
        :data="data"
        :total="total"
      >
        <template #thead>
          <tr>
            <th scope="col" rowspan="2" class="has-text-centered">ID</th>
            <th scope="col" rowspan="2">Package Name</th>
            <th scope="col" rowspan="2">Coach</th>
            <th scope="col" rowspan="2">Class Date</th>
            <th scope="col" rowspan="2">Class Time</th>
            <th scope="col" rowspan="2">Coach Attend</th>
            <th scope="col" rowspan="2">Student Attend</th>
          </tr>
        </template>
        <template #coachName="{ value }">
          {{ value.coach.name }}
        </template>
        <template #date="{ value }">
          {{ moment(value.time).format('L') }}
        </template>
        <template #time="{ value }">
          {{ moment(value.time).format('HH:mm:ss') }}
        </template>
        <template #coachAttend="{ value }">
          {{
            moment(value).isValid() ? moment(value).format('L HH:mm:ss') : '-'
          }}
        </template>
        <template #studentAttend="{ value }">
          {{
            moment(value).isValid() ? moment(value).format('L HH:mm:ss') : '-'
          }}
        </template>
      </Datatable>
    </div>
  </div>
</template>
