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
    <div class="flex-table-wrapper mt-4">
      <TableFlexMedia :data="data" />
    </div>
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
</style>
