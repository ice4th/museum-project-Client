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
const { total, data, redeemTableHeaders, isLoading } = useRedeemTable()
</script>

<template>
  <div class="page-content-inner">
    <Datatable
      :headers="redeemTableHeaders"
      :data="data"
      :total="total"
      :is-loading="isLoading"
      is-action
    >
      <template #custom-right>
        <div class="is-flex is-justify-content-flex-end">
          <V-Button
            color="primary"
            icon="feather:plus-circle"
            :to="{ name: 'codes-redeems-create' }"
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
