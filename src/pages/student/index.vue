<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { onMounted, watch } from 'vue'
import useStudentList from '/@src/composable/student/use-student-list'
import {
  displayStudentFullname,
  countryFlag,
} from '/@src/helpers/student.helper'
import { useRoute, useRouter } from 'vue-router'
import { toFormat } from '/@src/helpers/date.helper'
import { pageTitle } from '/@src/state/sidebarLayoutState'

const route = useRoute()
pageTitle.value = 'Student Information'

const { data, totalPage, total, currentPage, perPage, isLoading, search } =
  useStudentList()

useHead({
  title: 'Whitehouse: Student',
})
const headers = [
  { key: 'studentId', label: 'ID' },
  { key: 'fullname', label: 'Fullname', isRaw: true },
  { key: 'nickname', label: 'Nickname' },
  { key: 'partner', label: 'Partner' },
  { key: 'level', label: 'level', isRaw: true },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'lastLogin', label: 'lastLogin' },
  { key: 'lastUsedPackage', label: 'lastUsedPackage' },
  { key: 'ticket.used', label: 'Used' },
  { key: 'ticket.available', label: 'Available' },
]
</script>

<template>
  <div class="page-content-inner">
    <Datatable
      :is-loading="isLoading"
      search-placeholder="search by id, name, phone, email"
      :search="search"
      :headers="headers"
      :data="data"
      :current-page="currentPage"
      :per-page="perPage"
      :total="total"
      :total-page="totalPage"
    >
      <template #thead>
        <tr>
          <th scope="col" rowspan="2" class="has-text-centered">ID</th>
          <th scope="col" rowspan="2">Fullname</th>
          <th scope="col" rowspan="2">Nickname</th>
          <th scope="col" rowspan="2">Partner</th>
          <th scope="col" rowspan="2">Level</th>
          <th scope="col" rowspan="2">E-mail</th>
          <th scope="col" rowspan="2">Phone</th>
          <th scope="col" rowspan="2">Last Login</th>
          <th scope="col" rowspan="2">Last Package</th>
          <th scope="col" colspan="2" class="has-text-centered">Ticket</th>
        </tr>
        <tr>
          <th class="has-text-centered">Used</th>
          <th class="has-text-centered">Remain</th>
        </tr>
      </template>
      <template #fullname="{ value }">
        <div class="student-name-col">
          <V-Avatar
            size="small"
            :picture="value.avatar"
            :badge="countryFlag[value.country]"
          />
          <router-link
            :to="{ path: `/student/${value?.studentId}` }"
            class="link"
          >
            {{ displayStudentFullname(value) }}
          </router-link>
        </div>
      </template>
      <template #nickname="{ value }">
        {{ value?.th || value?.en || '-' }}
      </template>
      <template #partner="{ value }">
        {{ value?.pop()?.partnerName || '-' }}
      </template>
      <template #level="{ value }">
        {{ value.lastUsedPackage?.globishLevel || '-' }}
      </template>
      <template #email="{ value }">
        {{ value || '-' }}
      </template>
      <template #phone="{ value }">
        {{ value || '-' }}
      </template>
      <template #lastLogin="{ value }">
        {{ value ? toFormat(value, 'DD/MM/YYYY, HH:mm') : '-' }}
      </template>
      <template #lastUsedPackage="{ value }">
        {{ value?.packageName || '-' }}
      </template>
      <template #action>
        <div class="dark-inverted is-flex is-justify-content-flex-end">
          <FlexTableDropdown />
        </div>
      </template>
    </Datatable>
  </div>
</template>
<style lang="scss" scoped>
.link {
  color: #a2a5b9;
  text-decoration: underline;
  &:hover {
    color: #e9e9e9;
  }
}
thead {
  height: 4rem;
}
td {
  font-size: 12px;
}
.student-name-col {
  display: flex;
  align-items: center;
  > a {
    margin-left: 10px;
  }
}
</style>
