<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { onMounted, watch } from 'vue'
import useStudentList from '/@src/composable/students/useStudentList'
import {
  displayStudentFullname,
  countryFlag,
} from '/@src/helpers/student.helper'
import { useRoute, useRouter } from 'vue-router'
import { toFormat } from '/@src/helpers/date.helper'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import type { IDatatableHeader } from '/@src/types/interfaces/component.interface'
import type { IPartner } from '/@src/types/interfaces/partner.interface'

const route = useRoute()
pageTitle.value = 'Student Information'

const { data, total, isLoading } = useStudentList()

useHead({
  title: 'Whitehouse: Student',
})
const displayPartner = (partners: IPartner[]) => {
  return partners.map((p) => p.partnerName).join(', ')
}
const headers: IDatatableHeader = [
  { key: 'id', label: 'ID' },
  { key: 'avatar', label: '', isRaw: true },
  { key: 'fullname', label: 'Fullname', isRaw: true },
  { key: 'nickname', label: 'Nickname' },
  { key: 'partners', label: 'Partner' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'ticketUsed', label: 'Used', isRaw: true, isCenter: true },
  { key: 'ticketAvailable', label: 'Remain', isRaw: true, isCenter: true },
  { key: 'action', label: 'Action', isRaw: true, isEnd: true },
]
</script>

<template>
  <div class="page-content-inner">
    <Datatable
      :is-loading="isLoading"
      search-placeholder="search by id, name, phone, email"
      :headers="headers"
      :data="data"
      :total="total"
    >
      <template #thead>
        <tr>
          <th scope="col" rowspan="2" class="has-text-centered">ID</th>
          <th scope="col" rowspan="2"></th>
          <th scope="col" rowspan="2">Fullname</th>
          <th scope="col" rowspan="2">Nickname</th>
          <th scope="col" rowspan="2">Partner</th>
          <th scope="col" rowspan="2">E-mail</th>
          <th scope="col" rowspan="2">Phone</th>
          <th scope="col" colspan="2" class="has-text-centered">Ticket</th>
          <th scope="col" rowspan="2" colspan="2" class="has-text-centered">
            Action
          </th>
        </tr>
        <tr>
          <th class="has-text-centered">Used</th>
          <th class="has-text-centered">Remain</th>
        </tr>
      </template>
      <template #avatar="{ value }">
        <V-Avatar
          size="small"
          :picture="value.avatar"
          :badge="countryFlag[value.country]"
        />
      </template>
      <template #fullname="{ value }">
        <p class="subtitle is-6 px-1">{{ displayStudentFullname(value) }}</p>
      </template>
      <template #nickname="{ value }">
        {{ value?.th || value?.en || '-' }}
      </template>
      <template #partners="{ value }">
        {{ value?.length ? displayPartner(value) : '-' }}
      </template>
      <template #email="{ value }">
        {{ value || '-' }}
      </template>
      <template #phone="{ value }">
        {{ value || '-' }}
      </template>
      <template #ticketUsed="{ value }">
        {{ value.ticket.used }}
      </template>
      <template #ticketAvailable="{ value }">
        {{ value.ticket.available }}
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
                name: 'students-:id',
                params: { id: `${value.id}` },
              }"
            >
              <div class="icon">
                <i aria-hidden="true" class="lnil lnil-eye"></i>
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
                name: 'students-:id',
                params: { id: `${value.id}` },
                hash: '#edit',
              }"
            >
              <div class="icon">
                <i aria-hidden="true" class="lnil lnil-pencil"></i>
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
tr {
  th {
    vertical-align: middle;
  }
}
</style>
