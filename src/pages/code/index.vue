<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { toFormat } from '/@src/helpers/date.helper'
import useRedeemTable from '/@src/composable/redeem/use-redeem-table'
pageTitle.value = 'Code Management'

useHead({
  title: 'Whitehouse: Code',
})
const { currentPage, perPage, total, data, fetchRedeemById } = useRedeemTable()
</script>

<template>
  <div class="page-content-inner">
    <ListTable
      v-if="data.length"
      :data="data"
      :current-page="currentPage"
      :per-page="perPage"
      :total="total"
    >
      <template #item="{ item }">
        <div class="meta-left">
          <h3>{{ item.type }}</h3>
          <h3>Partner: {{ item.partnerName }}</h3>
          <h3>Package: {{ item.packageName }}</h3>
          <span v-if="item.usedDate">
            Activated at: {{ toFormat(item.usedDate) }}
          </span>
        </div>
        <div class="right">
          <V-Button color="primary" @click="fetchRedeemById(item.id)"
            >View</V-Button
          >
          <h3>Created at: {{ toFormat(item.createdAt) }}</h3>
          <h3 v-if="item.expireDate">
            Expire date: {{ toFormat(item.expireDate, 'YYYY-MM-DD') }}
          </h3>
        </div>
      </template>
    </ListTable>
  </div>
</template>

<style lang="scss" scoped>
.right {
  display: flex;
  flex-direction: column;
  margin-left: auto;
}
</style>
