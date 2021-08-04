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

const { data, totalPage, total, currentPage, perPage } = useStudentList()

useHead({
  title: 'Whitehouse: Student',
})
</script>

<template>
  <div class="page-content-inner">
    <SearchToolbar
      :placeholder="'search by id, name, phone, email'"
      :model-search="route.query?.search"
      :per-page="route.query?.perPage"
    />
    <table class="table is-hoverable is-fullwidth mt-4">
      <thead>
        <tr>
          <th scope="col" rowspan="2" class="has-text-centered">ID</th>
          <th scope="col" rowspan="2" class="is-media"></th>
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
          <td>{{ st.nickname?.th || st.nickname?.en || '-' }}</td>
          <td>{{ st.partner?.pop()?.partnerName || '-' }}</td>
          <td>{{ st.lastUsedPackage?.globishLevel || '-' }}</td>
          <td style="white-space: pre">{{ st.email || '-' }}</td>
          <td>{{ st.phone || '-' }}</td>
          <td>
            {{
              st.lastLogin ? toFormat(st.lastLogin, 'DD/MM/YYYY, HH:mm') : '-'
            }}
          </td>
          <td>{{ st.lastUsedPackage?.packageName || '-' }}</td>
          <td class="has-text-centered">{{ st.ticket?.used || 0 }}</td>
          <td class="has-text-centered">{{ st.ticket?.available || 0 }}</td>
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
td {
  font-size: 12px;
}
</style>
