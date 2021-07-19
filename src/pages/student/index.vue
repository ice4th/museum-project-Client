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

/**
 * activeSidebar is an exported ref() that we can use everywhere
 * @see /src/components/navigation/desktop/sidebar/subsidebars/GenericSidebar.vue
 */
import { activeSidebar, toggleSidebar } from '/@src/state/activeSidebarState'
import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = 'Student Information'

useHead({
  title: 'Whitehouse: Student',
})

interface IStudent {
  id: number
  name: string
  status: string
  country: string
  picture: string
  lastlogin: Date
}

const columns = [
  'ID',
  ' ',
  'Fullname',
  'Nickname',
  'Partner',
  'Level',
  'E-mail',
  'Phone',
  // 'Last Login',
  'Last Package',
  'Ticket',
  // 'Ticket Available',
  // 'Ticket Used',
]

const headers = [
  {
    key: 'id',
    label: 'Student ID',
  },
  {
    key: 'picture',
    label: 'Picture',
    showAs: {
      avatar: true,
    },
  },
  {
    key: 'name',
    label: 'Firstname - Lastname',
    showAs: {
      link(data: IStudent) {
        return { path: '/student', query: { id: data?.id } }
      },
    },
  },
  {
    key: 'nickname',
    label: 'Nickname',
  },
  {
    key: 'status',
    label: 'Status',
    showAs: {
      tag: [
        {
          label: 'new',
          class: 'is-success',
        },
        {
          label: 'lost',
          class: '',
        },
        {
          label: 'ban',
          class: 'is-orange',
        },
      ],
    },
    display(data: IStudent) {
      return data.status.charAt(0).toUpperCase() + data.status.slice(1)
    },
  },
  {
    key: 'lastLogin',
    label: 'Last Login',
    display(data: IStudent) {
      return moment(data.lastlogin).format('DD MMM YYYY, HH:mm')
    },
  },
  {
    key: 'country',
    label: 'Country',
    showAs: {
      avatar: true,
    },
    display(data: IStudent) {
      return data.country == 'th'
        ? 'https://www.countryflags.com/wp-content/uploads/thailand-flag-png-xl.png'
        : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/220px-Flag_of_Vietnam.svg.png'
    },
  },
  {
    key: '',
    label: 'Action',
    showAs: {
      button: {
        action(data: IStudent) {},
      },
    },
    display(data: IStudent) {
      return data.country == 'th'
        ? 'https://www.countryflags.com/wp-content/uploads/thailand-flag-png-xl.png'
        : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/220px-Flag_of_Vietnam.svg.png'
    },
  },
]
const flag = {
  th: '/@src/assets/img/th-flag.png',
  vn: '/@src/assets/img/vn-flag.png',
  kr: '/@src/assets/img/kr-flag.png',
}
const rows = [
  {
    id: 232322,
    fullnameEn: 'Erik K.',
    fullnameTh: '',
    nicknameEn: 'Erik',
    globishLevel: 0,
    // partner: { name: 'Speaking Lab Vietnam' },
    picture:
      'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png',
    lastLogin: new Date(),
    email: 'new@gmail.com',
    phone: '083943432',
    country: 'vn',
  },
  {
    id: 24293,
    fullnameTh: 'ดุษฎี ศรีจุลโพธิ์',
    fullnameEn: 'Dusadee Srijulpo',
    nicknameEn: 'Mookky',
    nicknameTh: 'มุกกี้',
    globishLevel: 'A1',
    picture:
      'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png',
    lastLogin: new Date(),
    email: 'dusadee.srj@gmail.com',
    phone: '0839434332 เบอร์คุณแม่',
    country: 'th',
    package: { name: 'Business English G3' },
  },
  {
    id: 24294,
    fullnameEn: 'Kang Daniel',
    nicknameEn: 'Dan',
    picture:
      'https://www.hallyukstar.com/wp-content/uploads/2019/03/KANG-DANIEL.jpg',
    globishLevel: 'A2',
    lastLogin: new Date(),
    email: 'Daniel@gmail.com',
    phone: '034324234',
    country: 'kr',
    package: { name: 'Business English G4' },
  },
]

const data = Array(10).fill(rows[0])
data.push(...Array(10).fill(rows[1]))
data.push(...Array(10).fill(rows[2]))
onMounted(() => {
  console.log(data)
})
</script>

<template>
  <div class="page-content-inner">
    <SearchToolbar />
    <!--V-FlexTable-->
    <!-- <TableRowMedia :rows="data" :headers="headers"> </TableRowMedia> -->

    <div class="flex-table-wrapper mt-4">
      <V-FlexTable>
        <template #header>
          <div class="flex-table-header">
            <!-- <span
              v-for="(col, idxH) in columns"
              :key="`h-${idxH}`"
              class="cell-center"
            >
              {{ col }}
            </span> -->
            <span>ID</span>
            <span> </span>
            <span class="is-grow">Fullname</span>
            <span>Nickname</span>
            <span>Partner</span>
            <span>Level</span>
            <span>E-mail</span>
            <span>Phone</span>
            <!-- <span>Last Login</span> -->
            <span>Last Package</span>
            <span>Ticket</span>
            <!-- <span class="cell-end">Actions</span> -->
          </div>
        </template>
        <template #body>
          <div
            v-for="(st, idxR) in data"
            :key="`r-${idxR}`"
            class="flex-table-item"
          >
            <div class="flex-table-cell" data-th="ID">
              <span class="light-text">{{ st.id }}</span>
            </div>
            <div class="flex-table-cell" data-th="Picture">
              <V-Avatar
                size="small"
                :picture="st.picture"
                :badge="flag[st.country]"
              />
            </div>
            <div class="flex-table-cell" data-th="Fullname">
              <router-link
                :to="{ path: '/student', query: { id: data?.id } }"
                class="link"
              >
                {{ st.fullnameTh || st.fullnameEn }}</router-link
              >
            </div>
            <div class="flex-table-cell" data-th="Nickname">
              <span class="light-text">{{
                st.nicknameTh || st.nicknameEn
              }}</span>
            </div>
            <div class="flex-table-cell" data-th="Partner">
              <span class="light-text">{{ st.partner?.name }}</span>
            </div>
            <div class="flex-table-cell" data-th="Level">
              <span class="light-text">{{ st.globishLevel }}</span>
            </div>
            <div class="flex-table-cell" data-th="E-mail">
              <span class="light-text">{{ st.email }}</span>
            </div>
            <div class="flex-table-cell" data-th="Phone">
              <span class="light-text">{{ st.phone }}</span>
            </div>
            <!-- <div class="flex-table-cell" data-th="Last Login">
              <span class="light-text">{{
                moment(st.lastlogin).format('DD MMM YYYY, HH:mm')
              }}</span>
            </div> -->
            <div class="flex-table-cell" data-th="Last Package">
              <span class="light-text">{{ st?.package?.name || '-' }}</span>
            </div>
            <div class="flex-table-cell" data-th="Ticket Used">
              <span class="light-text"
                >Used: {{ st.ticketUsed || '-' }} | Available:
                {{ st.ticketAvailable || '-' }}</span
              >
            </div>
            <!-- <div class="flex-table-cell cell-center" data-th="Actions">
              <span class="light-text">{{ st.ticketUsed }}</span>
            </div> -->
          </div>
        </template>
      </V-FlexTable>
    </div>
    <div class="flex-table-wrapper mt-4">
      <!--Table Pagination-->
      <V-FlexPagination
        :item-per-page="10"
        :total-items="10"
        :current-page="1"
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
