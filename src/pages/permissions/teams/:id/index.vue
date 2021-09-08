<script setup lang="ts">
import useManageTeam from '/@src/composable/permissions/useManageTeam.ts'
const { teamInfo, editTeam, validate, isEdit } = useManageTeam()
</script>

<template>
  <div class="page-content-inner">
    <div class="form-layout">
      <!-- <div class="form-outer">
        <div class="form-header">
          <div class="form-header-inner">
            <div class="left">
              <h3>Edit team</h3>
            </div>
            <div class="right">
              <div class="buttons">
                <V-Button
                  icon="lnir lnir-arrow-left rem-100"
                  light
                  dark-outline
                  :to="{ name: 'permission-team' }"
                  >Cancel</V-Button
                >
                <V-Button color="primary" raised @click="editTeam"
                  >Done</V-Button
                >
              </div>
            </div>
          </div>
        </div>

        <div class="form-body">
          <div>
            <V-Field>
              <label>Name</label>
              <V-Control>
                <input
                  v-model="teamInfo.name"
                  type="text"
                  class="input"
                  placeholder="Team name"
                />
              </V-Control>
              <p v-show="validate.name" class="help text-danger">
                {{ validate.name }}
              </p>
            </V-Field>
            <V-Field>
              <label>Description</label>
              <V-Control>
                <textarea
                  v-model="teamInfo.description"
                  class="textarea"
                  rows="3"
                  placeholder="Team description"
                ></textarea>
              </V-Control>
              <p v-show="validate.description" class="help text-danger">
                {{ validate.description }}
              </p>
            </V-Field>
          </div>
        </div>
      </div> -->

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
