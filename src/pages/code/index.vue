<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { toFormat } from '/@src/helpers/date.helper'
import useRedeemTable from '/@src/composable/redeem/use-redeem-table'
pageTitle.value = 'Code Management'

useHead({
  title: 'Whitehouse: Code',
})
const { currentPage, perPage, total, data, fetchRedeemById, currentRedeem } =
  useRedeemTable()
</script>

<template>
  <div class="page-content-inner">
    <V-Modal
      :title="`Redeem Detail ${currentRedeem?.id}`"
      :open="currentRedeem !== undefined"
      size="medium"
      actions="center"
      @close="currentRedeem = undefined"
    >
      <template v-if="currentRedeem" #content>
        <div v-if="currentRedeem.type !== 'group'" class="redeem-modal-content">
          <div class="content">
            <blockquote class="is-primary">
              <p class="subtitle is-5">Code</p>
              <h1 class="title is-1 is-narrow">
                {{ currentRedeem.code }}
              </h1>
            </blockquote>
          </div>
          <div v-if="currentRedeem.usedDate" class="columns is-multiline">
            <div class="column is-12">
              <p class="subtitle is-6">Student</p>
              <h2 class="title is-5 is-narrow">
                (id: {{ currentRedeem.studentId }})
                {{ currentRedeem.studentName }}
              </h2>
            </div>
            <div class="column is-12">
              <p class="subtitle is-6">Package Item</p>
              <h2 class="title is-5 is-narrow">
                {{ currentRedeem.packageItemId }}
              </h2>
            </div>
            <div class="column is-12">
              <p class="subtitle is-6">Activate Date</p>
              <h2 class="title is-5 is-narrow">
                {{ toFormat(currentRedeem.usedDate) }}
              </h2>
            </div>
          </div>
        </div>
      </template>
      <!-- <template #action>
        <V-Button color="danger" raised @click="confirmRemovePackage"
          >Confirm</V-Button
        >
      </template>
      <template #cancel>
        <V-Button color="primary" raised @click="toggleConfirmRemovePopup"
          >Cancel</V-Button
        >
      </template> -->
    </V-Modal>
    <ListTable
      v-if="data.length"
      :data="data"
      :current-page="currentPage"
      :per-page="perPage"
      :total="total"
    >
      <template #item="{ item }">
        <div class="meta-left">
          <h3>ID: {{ item.id }}</h3>
          <h3>Type: {{ item.type }}</h3>
          <h3>Partner: {{ item.partnerName }}</h3>
          <h3>Package: {{ item.packageName }}</h3>
          <span v-if="item.usedDate">
            Activated at: {{ toFormat(item.usedDate) }}
          </span>
        </div>
        <div class="right">
          <V-Button @click="fetchRedeemById(item.id)">View</V-Button>
          <h3>Created at: {{ toFormat(item.createdAt) }}</h3>
          <h3 v-if="item.expireDate">
            Expire date: {{ toFormat(item.expireDate, 'YYYY-MM-DD') }}
          </h3>
        </div>
      </template>
      <template #tabs>
        <div>
          <V-Button color="primary">Create Redeem</V-Button>
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
