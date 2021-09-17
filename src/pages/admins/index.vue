<script setup lang="ts">
import { useHead } from '@vueuse/head'
import moment from 'moment'
import { ref, onMounted, watch } from 'vue'
import useAdminList from '../../composable/admin/useAdminList'
import {
  displayStudentFullname,
  countryFlag,
} from '/@src/helpers/student.helper'
import { useRoute, useRouter } from 'vue-router'
import { toFormat } from '/@src/helpers/date.helper'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import type { IAdminDetail } from '/@src/types/interfaces/admin.interface'
import type { IDatatableHeader } from '/@src/types/interfaces/component.interface'
import useUserSession from '/@src/composable/useUserSession'

const { user } = useUserSession()
const router = useRouter()
const route = useRoute()
pageTitle.value = 'Admin list'
const selectedUser = ref<IAdminDetail | undefined>(undefined)
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
  changeCountryById,
  isActive,
} = useAdminList()
useHead({
  title: 'Whitehouse: Admin list',
})
const headers: IDatatableHeader = [
  { key: 'user', label: 'User', isRaw: true },
  { key: 'name', label: 'Name' },
  { key: 'teamName', label: 'Team' },
  { key: 'roleName', label: 'Role' },
  { key: 'manage', label: 'Manage', isRaw: true },
  { key: 'status', label: 'Status' },
  { key: 'action', label: 'Action', isEnd: true, isRaw: true },
]

const onStatusChange = () => {
  const query = {
    ...route.query,
    status: isActive.value ? 'activate' : 'deactivate',
  }

  router.push({
    name: route.name,
    params: route.params,
    query,
  })
}
const confirmChangeCountry = async () => {
  await changeCountryById(selectedUser.value)
  selectedUser.value = undefined
}
</script>

<template>
  <div class="page-content-inner">
    <V-Modal
      title="Success!"
      :open="!!selectedUser"
      size="small"
      actions="center"
      @close="selectedUser = undefined"
    >
      <template #content>
        <form v-if="selectedUser" class="modal-form">
          <V-Field>
            <label>Country</label>
            <V-Control>
              <div class="select">
                <select v-model="selectedUser.country">
                  <option value="th">TH</option>
                  <option value="vn">VN</option>
                </select>
              </div>
            </V-Control>
          </V-Field>
        </form>
      </template>
      <template #action>
        <V-Button color="primary" raised @click="confirmChangeCountry"
          >Confirm</V-Button
        >
      </template>
    </V-Modal>
    <Datatable
      :is-loading="isLoading"
      search-placeholder="search by id, name, phone, email"
      :headers="headers"
      :data="data"
      :total="total"
    >
      <template #custom-left>
        <div>
          <V-Field>
            <V-Control>
              <V-SwitchBlock
                v-model="isActive"
                :label="isActive ? 'Activate' : 'Deactivate'"
                color="primary"
                @change="onStatusChange"
              />
            </V-Control>
          </V-Field>
        </div>
      </template>
      <template #user="{ value }">
        <div class="user-avatar dark-inverted">
          <V-Avatar
            :badge="countryFlag[value.country]"
            :picture="value.avatar ? value.avatar : undefined"
            :initials="value.initials"
            :color="value.color || undefined"
            size="medium"
          />
          <div class="avatar-details dark-inverted">
            <span class="item-name dark-inverted"
              >{{ value.firstname }} {{ value.lastname }}</span
            >
            <span class="item-meta">
              <span>{{ value.email }}</span>
            </span>
          </div>
        </div>
      </template>
      <template #manage="{ value }">
        <V-Tags>
          <V-Tag
            v-for="country in value.manageCountry"
            :key="country"
            :label="country"
            color="primary"
            curved
            outlined
          />
        </V-Tags>
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
      <template #action="{ value }">
        <div class="dark-inverted is-flex is-justify-content-flex-end">
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
                :to="{
                  name: 'admins-:id',
                  params: { id: value.id },
                }"
                class="dropdown-item is-media"
              >
                <div class="icon">
                  <i aria-hidden="true" class="lnil lnil-eye"></i>
                </div>
                <div class="meta">
                  <span>view</span>
                  <span>View Profile</span>
                </div>
              </RouterLink>
              <!-- can edit only super admin -->
              <RouterLink
                v-show="user.roleId === 1"
                role="menuitem"
                :to="{
                  name: 'admins-:id',
                  params: { id: value.id },
                  hash: '#edit',
                }"
                class="dropdown-item is-media"
              >
                <div class="icon">
                  <i aria-hidden="true" class="lnil lnil-pencil"></i>
                </div>
                <div class="meta">
                  <span>Edit</span>
                  <span>Edit Profile</span>
                </div>
              </RouterLink>

              <hr class="dropdown-divider" />
              <a
                v-show="!value.status"
                role="menuitem"
                href="#"
                class="dropdown-item is-media"
                @click="activateAccount(value)"
              >
                <div class="icon">
                  <i aria-hidden="true" class="lnil lnil-calendar"></i>
                </div>
                <div class="meta">
                  <span>Activate</span>
                  <span>Resend email for activate</span>
                </div>
              </a>

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
@import 'src/scss/abstracts/_variables.scss';

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

.user-avatar {
  display: flex;

  .avatar-details {
    display: flex;
    flex-direction: column;
    padding-left: 0.8rem;

    .item-name {
      font-family: $font-alt;
      font-size: 0.9rem;
      font-weight: 600;
      color: $dark;
    }

    .item-meta {
      color: $light-text;
    }
  }
}
</style>
