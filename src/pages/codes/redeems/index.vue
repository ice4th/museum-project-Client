<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { toFormat } from '/@src/helpers/date.helper'
import useRedeemTable from '/@src/composable/redeems/useRedeemTable'
import { computed, ref } from 'vue'
import { RedeemType } from '/@src/types/enums/redeem.enum'
pageTitle.value = 'Code Management'

useHead({
  title: 'Whitehouse: Code',
})
const {
  total,
  data,
  fetchRedeemById,
  currentRedeemId,
  redeemDetail,
  createRedeem,
  createNewRedeem,
  packages,
  partners,
  redeemTableHeaders,
  isLoading,
} = useRedeemTable()
const showCreatePopup = ref(false)
const toggleCreateRedeem = () => {
  showCreatePopup.value = !showCreatePopup.value
  if (!showCreatePopup.value) {
    createNewRedeem.value = {
      redeemType: RedeemType.DEFAULT,
      partnerId: 1,
      packageId: 0,
      ticketStartDate: '',
    }
  }
}

const create = async () => {
  const res = await createRedeem()
  if (res) toggleCreateRedeem()
}

const tableOptions = computed(() => {
  return {
    searchable: false,
    sortable: true,
    perPageSelect: false,
    data: {
      headings: ['Code', 'Activated', 'Student', 'Expired'],
      data: redeemDetail.value.map((detail) => [
        detail.code,
        detail.usedDate ? toFormat(detail.usedDate) : '',
        detail.studentName || '',
        detail.expireDate ? toFormat(detail.expireDate) : '',
      ]),
    },
  }
})
</script>

<template>
  <div class="page-content-inner">
    <V-Modal
      :title="`Redeem Detail ${currentRedeemId}`"
      :open="!!currentRedeemId"
      size="medium"
      actions="center"
      @close="currentRedeemId = undefined"
    >
      <template v-if="currentRedeemId" #content>
        <V-SimpleDatatables
          v-if="redeemDetail.length > 1"
          :options="tableOptions"
        />
        <template v-else>
          <div
            v-for="detail in redeemDetail"
            :key="detail.id"
            class="redeem-modal-content"
          >
            <div class="content">
              <blockquote class="is-primary">
                <p class="subtitle is-5">Code</p>
                <h1 class="title is-1 is-narrow">
                  {{ detail.code }}
                </h1>
              </blockquote>
            </div>
            <div v-if="detail.usedDate" class="columns is-multiline">
              <div class="column is-12">
                <p class="subtitle is-6">Student</p>
                <h2 class="title is-5 is-narrow">
                  <span v-show="detail.studentId"
                    >(id: {{ detail.studentId }})</span
                  >
                  <span v-show="detail.studentName" class="ml-2">{{
                    detail.studentName
                  }}</span>
                </h2>
              </div>
              <div class="column is-12">
                <p class="subtitle is-6">Package Item</p>
                <h2 class="title is-5 is-narrow">
                  {{ detail.packageItemId }}
                </h2>
              </div>
              <div class="column is-12">
                <p class="subtitle is-6">Activate Date</p>
                <h2 class="title is-5 is-narrow">
                  {{ toFormat(detail.usedDate) }}
                </h2>
              </div>
            </div>
          </div>
        </template>
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
    <Datatable
      :headers="redeemTableHeaders"
      :data="data"
      :total="total"
      :is-loading="isLoading"
      is-action
    >
      <template #custom-right>
        <div class="is-flex is-justify-content-flex-end">
          <V-Button color="primary" :to="{ name: 'codes-redeems-create' }"
            >Create Redeem</V-Button
          >
        </div>
      </template>
      <template #type="{ value }">
        <V-Tag
          :color="value === 'default' ? 'purple' : 'danger'"
          :label="value"
          curved
          outlined
        />
      </template>
      <template #createdAt="{ value }">
        {{ value ? toFormat(value) : '-' }}
      </template>
      <template #usedDate="{ value }">
        {{ value ? toFormat(value) : '-' }}
      </template>
      <template #expireDate="{ value }">
        {{ value ? toFormat(value) : '-' }}
      </template>
      <template #status="{ value }">
        <V-Tag
          :color="value ? 'success' : 'solid'"
          :label="value ? 'Activated' : 'Deactivated'"
          rounded
          elevated
        />
      </template>
      <template #action="{ value }">
        <V-Button
          icon="lnil lnil-eye"
          :to="{ name: 'codes-redeems-:id', params: { id: `${value.id}` } }"
          >View</V-Button
        >
      </template>
    </Datatable>
  </div>
</template>

<style lang="scss" scoped>
.right {
  display: flex;
  flex-direction: column;
  margin-left: auto;
}
</style>
