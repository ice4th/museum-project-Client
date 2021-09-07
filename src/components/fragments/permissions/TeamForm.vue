<script setup lang="ts">
// TeamForm Component

import type { PropType } from 'vue'
import type { ITeamData } from '/@src/types/interfaces/permission.interface'

const props = defineProps({
  readonly: {
    type: Boolean,
    default: false,
  },
  info: {
    type: Object as PropType<ITeamData>,
    default: undefined,
  },
  validate: {
    type: Object,
    default: undefined,
  },
})
const emit = defineEmits(['edit'])
const editTeam = () => {
  const team = {
    name: props.info?.name,
    description: props.info?.description,
  } as ITeamData
  emit('edit', team)
}
</script>

<template>
  <div class="page-content-inner">
    <div v-if="info" class="form-layout">
      <div class="form-outer">
        <div class="form-header">
          <div class="form-header-inner">
            <div class="left">
              <h3>Team information</h3>
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

                <V-Button
                  v-if="readonly"
                  icon="feature:edit-2"
                  to="#edit"
                  color="primary"
                  >Edit</V-Button
                >
                <V-Button v-else color="primary" raised @click="editTeam"
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
                  v-model="info.name"
                  type="text"
                  class="input"
                  placeholder="Team name"
                  :readonly="readonly"
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
                  v-model="info.description"
                  class="textarea"
                  rows="3"
                  placeholder="Team description"
                  :readonly="readonly"
                ></textarea>
              </V-Control>
              <p v-show="validate.description" class="help text-danger">
                {{ validate.description }}
              </p>
            </V-Field>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import 'src/scss/abstracts/_variables.scss';
@import 'src/scss/abstracts/_mixins.scss';
@import 'src/scss/pages/generic/_forms.scss';
</style>
