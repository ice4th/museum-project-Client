<script setup lang="ts">
import type { PropType } from 'vue'
import type { IAdminInfo } from '/@src/types/interfaces/admin.interface'

const props = defineProps({
  readonly: {
    type: Boolean,
    default: false,
  },
  info: {
    type: Object as PropType<IAdminInfo>,
    default: undefined,
  },
})
</script>

<template>
  <div v-if="info" class="form-body">
    <div class="d-flex justify-content-center">
      <V-Avatar
        picture="/demo/avatars/5.jpg"
        size="xl"
        class="align-item-center"
      />
    </div>
    <div class="columns is-multiline">
      <div class="column is-6">
        <V-Field>
          <label>Firstname</label>
          <V-Control>
            <input
              v-model="info.firstname"
              type="text"
              class="input"
              placeholder="Firstname"
              :readonly="readonly"
            />
          </V-Control>
        </V-Field>
      </div>
      <div class="column is-6">
        <V-Field>
          <label>Lastname</label>
          <V-Control>
            <input
              v-model="info.lastname"
              type="text"
              class="input"
              placeholder="Lastname"
              :readonly="readonly"
            />
          </V-Control>
        </V-Field>
      </div>
      <div class="column is-6">
        <V-Field>
          <label>Name</label>
          <V-Control>
            <input
              v-model="info.name"
              type="text"
              class="input"
              placeholder="Name"
              :readonly="readonly"
            />
          </V-Control>
        </V-Field>
      </div>
      <div class="column is-6">
        <V-Field>
          <label>Phone</label>
          <V-Control>
            <input
              v-model="info.phone"
              type="text"
              class="input"
              placeholder="Phone Number"
              :readonly="readonly"
            />
          </V-Control>
        </V-Field>
      </div>
      <div class="column is-12">
        <label>Date of birth</label>
        <v-date-picker
          v-model="info.dob"
          color="orange"
          :model-config="{
            type: 'string',
            mask: 'YYYY-MM-DD',
          }"
          :masks="{
            input: 'YYYY-MM-DD',
          }"
          trim-weeks
          :readonly="readonly"
        >
          <template #default="{ inputValue, inputEvents }">
            <V-Field>
              <V-Control icon="feather:calendar">
                <input
                  class="input"
                  type="text"
                  placeholder="Date of birth YYYY-MM-DD"
                  :value="inputValue"
                  v-on="inputEvents"
                />
              </V-Control>
            </V-Field>
          </template>
        </v-date-picker>
      </div>

      <div class="column is-12">
        <V-Field>
          <label>Email</label>
          <V-Control>
            <input v-model="info.email" type="text" class="input" readonly />
          </V-Control>
        </V-Field>
      </div>
      <div class="column is-12">
        <V-Field>
          <label>Team</label>
          <V-Control>
            <input v-model="info.teamName" type="text" class="input" readonly />
          </V-Control>
        </V-Field>
      </div>
      <div class="column is-12">
        <V-Field>
          <label>Role</label>
          <V-Control>
            <input v-model="info.roleName" type="text" class="input" readonly />
          </V-Control>
        </V-Field>
      </div>
      <div class="column is-12">
        <V-Field>
          <label>Country</label>
          <V-Control>
            <Multiselect
              v-model="info.country"
              :options="['th', 'vn']"
              placeholder="Select your country"
              :readonly="readonly"
            >
            </Multiselect>
          </V-Control>
        </V-Field>
      </div>
      <div class="column is-12">
        <V-Field>
          <!-- check box -->
          <label>Manage Country</label>
          <V-Control>
            <V-Checkbox
              v-model="info.manageCountry"
              value="th"
              label="th"
              color="primary"
              :readonly="readonly"
            />
            <V-Checkbox
              v-model="info.manageCountry"
              value="vn"
              label="vn"
              color="primary"
              :readonly="readonly"
            />
          </V-Control>
        </V-Field>
      </div>
    </div>
  </div>
</template>
