<script setup lang="ts">
/**
 * This is a Vue Component that will be
 * automatically mapped to a entry on vue-router.
 *
 * You will be able to access this page at http://localhost:8083/sidebar-blank-page-5
 * Page uri will match related path to src/pages folder
 *
 * Read more about routing:
 * @see /vite.config.ts
 * @see /src/router.ts
 */

import { useHead } from '@vueuse/head'
import moment from 'moment'
import { onMounted, computed } from 'vue'
import useStudentList from '/@src/composable/student/use-student-list'
import { displayStudentFullname } from '/@src/helpers/student.helper'

/**
 * activeSidebar is an exported ref() that we can use everywhere
 * @see /src/components/navigation/desktop/sidebar/subsidebars/GenericSidebar.vue
 */
import { activeSidebar, toggleSidebar } from '/@src/state/activeSidebarState'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { StudentCountry } from '/@src/types/enums/student.enum'
import type { IStudentList } from '/@src/types/interfaces/student.interface'

pageTitle.value = 'Student Information'
const { data, totalPage, total, currentPage } = useStudentList()

useHead({
  title: 'Whitehouse: Student',
})

const flag = {
  th: '/@src/assets/img/th-flag.png',
  vn: '/@src/assets/img/vn-flag.png',
  kr: '/@src/assets/img/kr-flag.png',
}

onMounted(() => {
  // console.log(data)
})
</script>

<template>
  <div class="page-content-inner">
    <SearchToolbar />
    <!--V-FlexTable-->
    <!-- <TableRowMedia :rows="data" :headers="headers"> </TableRowMedia> -->
    <!-- <div class="flex-table-wrapper mt-4"> -->
    <!-- <TableFlexMedia :data="data" /> -->
    <!-- </div> -->
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
              :badge="flag[st.country]"
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
              st.lastLogin
                ? moment(st.lastLogin).format('DD MMM YYYY, HH:mm')
                : '-'
            }}
          </td>
          <td>{{ st.package?.packageName || '-' }}</td>
          <td class="is-flex">
            Used: {{ st.ticketUsed || '-' }} | Available:
            {{ st.ticketAvailable || '-' }}
          </td>
          <!-- <td class="is-end">
          <div class="is-flex is-justify-content-flex-end">
            <FlexTableDropdown />
          </div>
        </td> -->
        </tr>
      </tbody>
    </table>
    <div class="flex-table-wrapper mt-4">
      <!--Table Pagination-->
      <V-FlexPagination
        :item-per-page="5"
        :total-items="total"
        :current-page="currentPage"
        :max-links-displayed="5"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.link {
  color: #a2a5b9;
  // border-bottom: 1px solid white;
  text-decoration: underline;
  &:hover {
    color: #e9e9e9;
  }
}
thead {
  height: 4rem;
}
</style>
