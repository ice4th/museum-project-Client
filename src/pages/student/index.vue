<script setup lang="ts">
import { useHead } from '@vueuse/head'
import moment from 'moment'
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

const { data, totalPage, total, currentPage, perPage } = useStudentList()

useHead({
  title: 'Whitehouse: Student',
})

onMounted(() => {})
const flag = {
  th: '/@src/assets/img/th-flag.png',
  vn: '/@src/assets/img/vn-flag.png',
  kr: '/@src/assets/img/kr-flag.png',
}
</script>

<template>
  <div class="page-content-inner">
    <SearchToolbar
      :placeholder="'search by name phone email'"
      :model-search="route.query?.search"
      :per-page="route.query?.perPage"
    />
    <table class="table is-hoverable is-fullwidth mt-4">
      <thead>
        <tr>
          <th scope="col" class="has-text-centered">ID</th>
          <th scope="col" class="is-media"></th>
          <th scope="col">Fullname</th>
          <th scope="col">Nickname</th>
          <th scope="col">Partner</th>
          <th scope="col">Level</th>
          <th scope="col">E-mail</th>
          <th scope="col">Phone</th>
          <th scope="col">Last Login</th>
          <th scope="col">Last Package</th>
          <th scope="col">Ticket</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(st, idxR) in data" :key="`r-${idxR}`">
          <td>{{ st.studentId }}</td>
          <td class="is-media">
            <V-Avatar
              size="small"
              :picture="st.avatar"
              :badge="countryFlag[st.country]"
            />
          </td>
          <td>
            <router-link
              :to="{ path: `/student/${st?.studentId}` }"
              class="link"
            >
              {{ displayStudentFullname(st) }}
            </router-link>
          </td>
          <td>{{ st.nickname?.th || st.nickname?.en }}</td>
          <td>{{ st.partner?.name }}</td>
          <td>{{ st.globishLevel }}</td>
          <td>{{ st.email }}</td>
          <td>{{ st.phone }}</td>
          <td>
            {{
              st.lastLogin ? toFormat(st.lastLogin, 'DD MMM YYYY, HH:mm') : '-'
            }}
          </td>
          <td>{{ st.package?.packageName || '-' }}</td>
          <td class="is-flex">
            Used: {{ st.ticketUsed || '-' }} | Available:
            {{ st.ticketAvailable || '-' }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex-table-wrapper mt-4">
      <!--Table Pagination-->
      <V-FlexPagination
        :item-per-page="perPage"
        :total-items="total"
        :current-page="currentPage"
        :max-links-displayed="10"
      />
    </div>
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
</style>
