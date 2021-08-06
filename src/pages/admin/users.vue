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

const router = useRouter()
const route = useRoute()
pageTitle.value = 'Admin list'

const {
  data,
  totalPage,
  total,
  currentPage,
  perPage,
  isLoading,
  search,
  status,
  activateAccount,
  deactivateAccount,
} = useAdminList()

useHead({
  title: 'Whitehouse: Admin list',
})
const headers = [
  { key: 'id', label: 'ID' },
  { key: 'avatar', label: 'Avatar', isRaw: true },
  { key: 'name', label: 'Name' },
  { key: 'fullname', label: 'Fullname' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'country', label: 'Country' },
  { key: 'status', label: 'Status' },
  { key: 'action', label: 'Action', isRaw: true },
]

const onStatusChange = () => {
  const query = {
    ...route.query,
    status: status.value,
  }

  router.push({
    name: route.name,
    params: route.params,
    query,
  })
}
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
      <template #custom-left>
        <div>
          <V-Field>
            <V-Control>
              <div class="select is-rounded">
                <select v-model="status" @change="onStatusChange">
                  <option :value="undefined">All</option>
                  <option value="activate">Activate</option>
                  <option value="deactivate">Deactivate</option>
                </select>
              </div>
            </V-Control>
          </V-Field>
        </div>
      </template>
      <template #avatar="{ value }">
        <V-Avatar
          size="small"
          :picture="value.avatar"
          :badge="countryFlag[value.country]"
        />
      </template>
      <!-- <template #fullname="{ value }">
        {{ `${value.firstname} ${value.lastname}` }}
      </template> -->
      <template #status="{ value }">
        <!-- {{ value ? toFormat(value, 'DD/MM/YYYY, HH:mm') : '-' }} -->
        <V-Tag
          :color="value ? 'success' : 'danger'"
          :label="value ? 'Active' : 'Deactivate'"
          rounded
          elevated
        />
      </template>
      <template #action="{ value }">
        <div class="dark-inverted is-flex is-justify-content-flex-end">
          <V-Dropdown
            icon="feather:more-vertical"
            class="is-pushed-mobile"
            spaced
            right
          >
            <template #content>
              <a
                v-show="!value.status"
                role="menuitem"
                href="#"
                class="dropdown-item is-media"
                @click="activateAccount"
              >
                <div class="icon">
                  <i aria-hidden="true" class="lnil lnil-calendar"></i>
                </div>
                <div class="meta">
                  <span>Activate</span>
                  <span>Resend email for activate</span>
                </div>
              </a>

              <!-- <hr class="dropdown-divider" /> -->

              <a
                v-show="value.status"
                role="menuitem"
                href="#"
                class="dropdown-item is-media"
                @click="deactivateAccount(value)"
              >
                <div class="icon">
                  <i aria-hidden="true" class="lnil lnil-trash-can-alt"></i>
                </div>
                <div class="meta">
                  <span>Deactivate</span>
                </div>
              </a>
            </template>
          </V-Dropdown>
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
