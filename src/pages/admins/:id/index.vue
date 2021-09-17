<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { computed, ref } from 'vue'
import useViewAdmin from '/@src/composable/admin/useAdminDetails'

const { adminInfo, loading, validate, isEdit, saveInfo } = useViewAdmin()
</script>

<template>
  <div class="page-content-inner">
    <div class="form-layout">
      <V-Loader size="small" lighter grey translucent :active="loading">
        <AdminForm
          v-if="adminInfo"
          header="View Profile"
          :info="adminInfo"
          :readonly="!isEdit"
          @edit="saveInfo"
        >
          <template v-if="!isEdit" #buttons>
            <V-Button
              icon="feather:edit-2"
              :to="{
                name: 'admins-:id',
                params: { id: `${adminInfo.id}` },
                hash: '#edit',
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
@import 'src/scss/abstracts/_variables.scss';
@import 'src/scss/abstracts/_mixins.scss';
@import 'src/scss/pages/generic/_forms.scss';
</style>
