<script setup lang="ts">
import { defineProps } from 'vue'
import moment from 'moment'
import { displayStudentFullname } from '/@src/helpers/student.helper'
defineProps({
  data: {
    type: Array,
    default: [],
  },
})

const flag = {
  th: '/@src/assets/img/th-flag.png',
  vn: '/@src/assets/img/vn-flag.png',
  kr: '/@src/assets/img/kr-flag.png',
}
</script>
<template>
  <V-FlexTable>
    <template #header>
      <div class="flex-table-header">
        <span>ID</span>
        <span class="is-grow">Fullname</span>
        <span>Nickname</span>
        <span>Partner</span>
        <span>Level</span>
        <span>E-mail</span>
        <span>Phone</span>
        <span>Last Login</span>
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
          <span class="light-text mr-2">{{ st.studentId }}</span>
          <V-Avatar
            size="small"
            :picture="st.avatar"
            :badge="flag[st.country]"
          />
        </div>
        <div class="flex-table-cell is-grow" data-th="Fullname">
          <router-link :to="{ path: `/student/${st?.studentId}` }" class="link">
            {{ displayStudentFullname(st) }}
          </router-link>
        </div>
        <div class="flex-table-cell" data-th="Nickname">
          <span class="light-text">{{
            st.nickname?.th || st.nickname?.en
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
        <div class="flex-table-cell" data-th="Last Login">
          <span class="light-text">{{
            st.lastLogin
              ? moment(st.lastLogin).format('DD MMM YYYY, HH:mm')
              : '-'
          }}</span>
        </div>
        <div class="flex-table-cell" data-th="Last Package">
          <span class="light-text">{{ st?.package?.packageName || '-' }}</span>
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
</template>

<style lang="scss" scoped>
.link {
  color: #a2a5b9;
  border-bottom: 1px solid white;
  &:hover {
    color: #e9e9e9;
  }
}
</style>
