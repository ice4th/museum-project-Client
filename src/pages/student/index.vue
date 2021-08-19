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
import type { IDatatableHeader } from '/@src/types/interfaces/component.interface'

const route = useRoute()
pageTitle.value = 'Student Information'

const { data, totalPage, total, currentPage, perPage, isLoading, search } =
  useStudentList()

useHead({
  title: 'Whitehouse: Student',
})
const headers: IDatatableHeader = [
  { key: 'studentId', label: 'ID' },
  { key: 'fullname', label: 'Fullname', isRaw: true },
  { key: 'nickname', label: 'Nickname' },
  { key: 'partner', label: 'Partner' },
  { key: 'level', label: 'level', isRaw: true },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'action', label: 'Action', isRaw: true, isEnd: true },
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
        {{ value?.length ? value[value.length - 1].partnerName : '-' }}
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
      <template #action="{ value }">
        <V-Dropdown spaced right>
          <template #button="{ toggle }">
            <V-Button
              icon="feather:more-vertical"
              class="is-trigger"
              @click="toggle"
            >
              Actions
            </V-Button>
          </template>
          <template #content>
            <RouterLink
              role="menuitem"
              class="dropdown-item is-media"
              :to="{
                name: 'student-:id',
                params: { id: `${value.studentId}` },
              }"
            >
              <div class="icon">
                <i aria-hidden="true" class="lnil lnil-flag"></i>
              </div>
              <div class="meta">
                <span>View Profile</span>
                <span>view student profile</span>
              </div>
            </RouterLink>
            <RouterLink
              role="menuitem"
              class="dropdown-item is-media"
              :to="{
                name: 'student-:id',
                params: { id: `${value.studentId}` },
              }"
            >
              <div class="icon">
                <i aria-hidden="true" class="lnil lnil-flag"></i>
              </div>
              <div class="meta">
                <span>Edit Profile</span>
                <span>edit student profile</span>
              </div>
            </RouterLink>

            <!-- <hr class="dropdown-divider" /> -->
          </template>
        </V-Dropdown>
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
