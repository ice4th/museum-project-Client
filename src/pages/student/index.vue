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
  'id',
  'Picture',
  'Firstname - Lastname',
  'Partner',
  'Level',
  'E-mail',
  'Phone',
  'Last Login',
  'Last Package',
  'Ticket Available',
  'Ticket Used',
  'Country',
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
]
const data = [
  {
    id: 232322,
    name: 'Erik K.',
    nickname: 'Erik',
    picture:
      'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png',
    badge:
      'https://www.countryflags.com/wp-content/uploads/thailand-flag-png-xl.png',
    lastLogin: new Date(),
    status: 'new',
    country: 'vn',
  },
  {
    id: 24293,
    name: 'Dusadee Srijulpo',
    nickname: 'Mookky',
    picture:
      'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png',
    badge:
      'https://www.countryflags.com/wp-content/uploads/thailand-flag-png-xl.png',
    lastLogin: new Date(),
    status: 'lost',
    country: 'th',
  },
  {
    id: 24294,
    name: 'Kang Daniel',
    nickname: 'Dan',
    picture:
      'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png',
    badge:
      'https://www.countryflags.com/wp-content/uploads/thailand-flag-png-xl.png',
    lastLogin: new Date(),
    status: 'ban',
    country: 'kr',
  },
]
</script>

<template>
  <div class="page-content-inner">
    <SearchToolbar />
    <!--V-FlexTable-->
    <TableRowMedia :rows="data" :headers="headers" />
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
