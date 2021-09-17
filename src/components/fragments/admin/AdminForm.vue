<script setup lang="ts">
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import type {
  IAdminInfo,
  IFormAdminInfo,
} from '/@src/types/interfaces/admin.interface'

const props = defineProps({
  header: {
    type: String,
    default: 'Edit Profile',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  info: {
    type: Object as PropType<IAdminInfo>,
    default: undefined,
  },
  validate: {
    type: Object,
    default: undefined,
  },
})
const emit = defineEmits(['edit'])
const manageCountry = ref(props.info?.manageCountry || [])

const { y } = useWindowScroll()
const isStuck = computed(() => y.value > 30)
const submitEdit = () => {
  const profile = {
    name: props.info?.name,
    firstname: props.info?.firstname,
    lastname: props.info?.lastname,
    avatar: props.info?.avatar,
    dob: props.info?.dob,
    phone: props.info?.phone,
    country: props.info?.country,
    manageCountry: manageCountry.value,
  } as IFormAdminInfo
  emit('edit', profile)
}
</script>

<template>
  <div v-if="info" class="form-outer">
    <div :class="[isStuck && 'is-stuck']" class="form-header stuck-header">
      <div class="form-header-inner">
        <div class="left">
          <h3>{{ header }}</h3>
        </div>
        <div class="right">
          <div class="buttons">
            <V-Button icon="feather:arrow-left" :to="{ name: 'admins' }" raised>
              Back
            </V-Button>
            <V-Button
              v-if="!readonly"
              icon="lnir lnir-checkmark"
              color="primary"
              raised
              @click="submitEdit"
            >
              Done
            </V-Button>
            <slot name="buttons" />
          </div>
        </div>
      </div>
    </div>
    <div class="form-body">
      <div class="form-body">
        <div class="is-flex is-justify-content-center p-3">
          <!-- TODO: Select image or upload by file manager -->
          <V-Avatar
            :picture="info.avatar ? info.avatar : undefined"
            :initials="info.initials"
            :color="info.color"
            size="xl"
            class="align-item-center"
          />
        </div>
        <div class="columns is-multiline">
          <div class="column is-6">
            <V-Field>
              <label>Firstname</label>
              <V-Control :has-error="!!validate?.firstname">
                <input
                  v-model="info.firstname"
                  type="text"
                  class="input"
                  placeholder="Firstname"
                  :readonly="readonly"
                />

                <p v-if="validate?.firstname" class="help text-danger">
                  {{ validate?.firstname }}
                </p>
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-6">
            <V-Field>
              <label>Lastname</label>
              <V-Control :has-error="!!validate?.lastname">
                <input
                  v-model="info.lastname"
                  type="text"
                  class="input"
                  placeholder="Lastname"
                  :readonly="readonly"
                />
                <p v-if="validate?.lastname" class="help text-danger">
                  {{ validate?.lastname }}
                </p>
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-6">
            <V-Field>
              <label>Name</label>
              <V-Control :has-error="!!validate?.name">
                <input
                  v-model="info.name"
                  type="text"
                  class="input"
                  placeholder="Name"
                  :readonly="readonly"
                />
                <p v-if="validate?.name" class="help text-danger">
                  {{ validate?.name }}
                </p>
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-6">
            <V-Field>
              <label>Phone</label>
              <V-Control :has-error="!!validate?.phone">
                <input
                  v-model="info.phone"
                  type="text"
                  class="input"
                  placeholder="Phone Number"
                  :readonly="readonly"
                />
                <p v-if="validate?.phone" class="help text-danger">
                  {{ validate?.phone }}
                </p>
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-12">
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
              :popover="{ visibility: readonly ? '' : 'click' }"
            >
              <template #default="{ inputValue, inputEvents }">
                <V-Field>
                  <label>Date of birth</label>
                  <V-Control
                    icon="feather:calendar"
                    :has-error="!!validate?.dob"
                  >
                    <input
                      class="input"
                      type="text"
                      placeholder="Date of birth YYYY-MM-DD"
                      :value="inputValue"
                      :readonly="readonly"
                      v-on="inputEvents"
                    />
                    <p v-if="validate?.dob" class="help text-danger">
                      {{ validate?.dob }}
                    </p>
                  </V-Control>
                </V-Field>
              </template>
            </v-date-picker>
          </div>

          <div class="column is-12">
            <V-Field>
              <label>Email</label>
              <V-Control>
                <input
                  v-model="info.email"
                  type="text"
                  class="input"
                  readonly
                />
                <p v-if="!readonly" class="help">*Readonly</p>
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-12">
            <V-Field>
              <label>Team</label>
              <V-Control>
                <input
                  v-model="info.teamName"
                  type="text"
                  class="input"
                  readonly
                />
                <p v-if="!readonly" class="help">*Readonly</p>
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-12">
            <V-Field>
              <label>Role</label>
              <V-Control>
                <input
                  v-model="info.roleName"
                  type="text"
                  class="input"
                  readonly
                />
                <p v-if="!readonly" class="help">*Readonly</p>
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
                  :can-clear="false"
                  :disabled="readonly"
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
                  v-model="manageCountry"
                  value="th"
                  label="th"
                  color="primary"
                  :disabled="readonly"
                  class="checkbox"
                />
                <V-Checkbox
                  v-model="manageCountry"
                  value="vn"
                  label="vn"
                  color="primary"
                  :disabled="readonly"
                  class="checkbox"
                />

                <p v-if="validate?.manageCountry" class="help text-danger">
                  *{{ validate?.manageCountry }}
                </p>
              </V-Control>
            </V-Field>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.checkbox {
  cursor: pointer;
}
</style>
