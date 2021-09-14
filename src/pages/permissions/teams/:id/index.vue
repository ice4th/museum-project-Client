<script setup lang="ts">
import useManageTeam from '/@src/composable/permissions/useManageTeam.ts'
const { teamInfo, editTeam, validate, isEdit } = useManageTeam()
</script>

<template>
  <div class="page-content-inner">
    <div class="form-layout">
      <div class="form-outer">
        <TeamForm
          v-if="teamInfo"
          :info="teamInfo"
          :readonly="!isEdit"
          :validate="validate"
          @edit="editTeam"
        >
        </TeamForm>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import 'src/scss/abstracts/_variables.scss';
@import 'src/scss/abstracts/_mixins.scss';
@import 'src/scss/pages/generic/_forms.scss';
</style>
