<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { computed, ref } from 'vue'
import useViewAdmin from '/@src/composable/admin/use-view-admin'
const { adminInfo, loading } = useViewAdmin()
</script>

<template>
  <div class="page-content-inner">
    <div class="form-layout">
      <V-Loader size="small" lighter grey translucent :active="loading">
        <AdminForm
          v-if="adminInfo"
          header="View Profile"
          :info="adminInfo"
          readonly
        >
          <template #buttons>
            <V-Button
              icon="feather:edit-2"
              :to="{
                name: 'admin-:userid-edit',
                params: { userid: `${adminInfo.id}` },
              }"
              color="primary"
              >Edit</V-Button
            >
          </template>
        </AdminForm>
      </V-Loader>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../../scss/abstracts/_variables.scss';
@import '../../../scss/abstracts/_mixins.scss';
@import '../../../scss/pages/generic/_forms.scss';
</style>
