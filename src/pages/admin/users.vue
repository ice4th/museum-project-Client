<script setup lang="ts">
import { useHead } from '@vueuse/head'
import moment from 'moment'
import { onMounted, watch } from 'vue'
import useAdminList from '/@src/composable/admin/use-admin-list'
import {
  displayStudentFullname,
  countryFlag,
} from '/@src/helpers/student.helper'
import { useRoute, useRouter } from 'vue-router'
import { toFormat } from '/@src/helpers/date.helper'
import { pageTitle } from '/@src/state/sidebarLayoutState'

const route = useRoute()
pageTitle.value = 'Admin list'

const { data, totalPage, total, currentPage, perPage, isLoading, search } =
  useAdminList()

useHead({
  title: 'Whitehouse: Admin list',
})
const headers = [
  { key: 'id', label: 'ID' },
  { key: 'avatar', label: 'Avatar' },
  { key: 'name', label: 'Name' },
  { key: 'fullname', label: 'Fullname', isRaw: true },
  { key: 'dob', label: 'DOB (DD/MM/YYYY)', isRaw: true },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'lastLogin', label: 'Last login' },
  { key: 'status', label: 'Status' },
  { key: 'action', label: 'Action', isRaw: true },
]
</script>

<template>
  <div class="page-content-inner">
    <p>Student Page</p>
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
      <!-- <template #thead>
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
      </template> -->
      <!-- <template #fullname="{ value }">
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
      </template> -->
      <template #avatar="{ value }">
        <V-Avatar size="small" :picture="value" :badge="countryFlag.th" />
      </template>
      <template #fullname="{ value }">
        {{ `${value.firstname} ${value.lastname}` }}
      </template>
      <template #dob="{ value }">
        {{ value ? toFormat(value, 'DD/MM/YYYY') : '-' }}
      </template>
      <template #lastLogin="{ value }">
        {{ value ? toFormat(value, 'DD/MM/YYYY, HH:mm') : '-' }}
      </template>
      <template #status="{ value }">
        <!-- {{ value ? toFormat(value, 'DD/MM/YYYY, HH:mm') : '-' }} -->
        <V-Tag
          :color="value ? 'success' : 'danger'"
          :label="value ? 'Active' : 'Deactivate'"
          rounded
          elevated
        />
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
