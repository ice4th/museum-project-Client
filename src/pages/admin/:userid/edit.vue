<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { computed, ref } from 'vue'
import useViewAdmin from '../../../composable/admin/useAdminDetails'
const { adminInfo, saveInfo, loading, validate } = useViewAdmin()
</script>

<template>
  <div class="page-content-inner">
    <div class="form-layout">
      <V-Loader size="small" lighter grey translucent :active="loading">
        <AdminForm
          v-if="adminInfo"
          :info="adminInfo"
          :validate="validate"
          @edit="saveInfo"
        />
      </V-Loader>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../../scss/abstracts/_variables.scss';
@import '../../../scss/abstracts/_mixins.scss';
@import '../../../scss/pages/generic/_forms.scss';
</style>
