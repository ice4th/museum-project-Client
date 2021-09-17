<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { ref, onBeforeMount, computed, watch } from 'vue'
import type { PropType } from 'vue'
import type {
  IStudentGlobishPlusInfo,
  IStudentInfo,
  IUpdateStudentGlobishPlusProfile,
} from '/@src/types/interfaces/student.interface'
import moment from 'moment-timezone'
import _ from 'lodash'
import { GLevel } from '/@src/types/enums/package.enum'
const props = defineProps({
  studentInfo: {
    type: Object as PropType<IStudentInfo>,
    required: true,
  },
  studentGbpInfo: {
    type: Object as PropType<IStudentGlobishPlusInfo>,
    required: true,
    default: () => {},
  },
  validation: {
    type: Object,
    default: () => {},
  },
})
const globishLevelItems = Object.keys(GLevel).map((key) => {
  return { key, value: GLevel[key] }
})
const { y } = useWindowScroll()
const isStuck = computed(() => {
  return y.value > 10
})
const isEditMode = ref(false)
const isLoading = ref(false)
const internalStudentGbpInfo = ref<IStudentGlobishPlusInfo>(
  props.studentGbpInfo ? _.cloneDeep(props.studentGbpInfo) : undefined
)
const internalValidation = ref(props.validation)

watch(
  () => props.validation,
  () => (internalValidation.value = props.validation)
)

const emit = defineEmits({
  'on-update': Object,
})

const onSave = async () => {
  isLoading.value = true
  const { value } = internalStudentGbpInfo
  const data = {
    firstname: value?.firstname,
    lastname: value?.lastname,
    email: value?.email,
    expireDate: value?.expireDate,
    globishLevel: +value?.voxyLevel,
    featureGroupId: +value?.featureGroupId,
  } as IUpdateStudentGlobishPlusProfile
  emit('on-update', data)
  isLoading.value = false
}

const onCancelEdit = () => {
  isEditMode.value = false
  internalStudentGbpInfo.value = _.cloneDeep(props.studentGbpInfo)
  internalValidation.value = {}
}

const removeValidation = (key: string) => {
  delete internalStudentGbpInfo.value[key]
}
</script>

<template>
  <div class="account-box is-form is-footerless">
    <div class="form-head stuck-header" :class="[isStuck && 'is-stuck']">
      <div class="form-head-inner">
        <div class="left">
          <h3>Globish Plus Management</h3>
          <p>Edit student's Globish Plus information</p>
        </div>
        <div class="right">
          <div v-show="isEditMode" class="buttons">
            <V-Button
              icon="lnir lnir-arrow-left rem-100"
              light
              dark-outlined
              @click="onCancelEdit()"
            >
              Cancel
            </V-Button>
            <V-Button
              color="primary"
              raised
              :loading="isLoading"
              @click="onSave"
            >
              Save Changes
            </V-Button>
          </div>
          <div v-show="!isEditMode" class="buttons">
            <V-Button color="primary" raised @click="isEditMode = true">
              Edit
            </V-Button>
          </div>
        </div>
      </div>
    </div>
    <div class="form-body">
      <!-- Student Info -->
      <div class="fieldset">
        <div class="fieldset-heading">
          <h4>Student Info</h4>
          <p>Information of student</p>
        </div>

        <div class="columns is-multiline">
          <div class="column is-6">
            <V-Field>
              <label>First name</label>
              <V-Control icon="feather:user">
                <input
                  v-model="studentInfo.firstname.en"
                  type="text"
                  class="input"
                  placeholder="First Name"
                  disabled
                />
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-6">
            <V-Field>
              <label>Last name</label>
              <V-Control icon="feather:user">
                <input
                  v-model="studentInfo.lastname.en"
                  type="text"
                  class="input"
                  placeholder="Last Name"
                  disabled
                />
              </V-Control>
            </V-Field>
          </div>

          <div class="column is-6">
            <V-Field>
              <label>Nickname</label>
              <V-Control icon="feather:user">
                <input
                  v-model="studentInfo.nickname.en"
                  type="text"
                  class="input"
                  placeholder="Nickname"
                  disabled
                />
              </V-Control>
            </V-Field>
          </div>

          <div class="column is-6">
            <V-Field>
              <label>Email</label>
              <V-Control icon="feather:at-sign">
                <input
                  v-model="studentInfo.email"
                  type="text"
                  class="input"
                  placeholder="Email"
                  disabled
                />
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-12">
            <V-Field>
              <label>Globish Level</label>
              <V-Control>
                <Multiselect
                  v-model="internalStudentGbpInfo.globishLevel"
                  track-by="key"
                  value-prop="value"
                  disabled
                  :options="globishLevelItems"
                >
                  <template #singlelabel="{ value }">
                    <div class="multiselect-single-label">
                      {{ value.key }}
                    </div>
                  </template>
                  <template #option="{ option }">
                    <span class="select-option-text">
                      {{ option.key }}
                    </span>
                  </template>
                </Multiselect>
              </V-Control>
            </V-Field>
          </div>
        </div>
      </div>

      <!-- Globish Plus Info -->
      <div class="fieldset">
        <div class="fieldset-heading">
          <h4>Globish Plus Info</h4>
          <p>Information of Globish Plus (From Voxy)</p>
        </div>

        <div class="columns is-multiline">
          <div class="column is-12">
            <V-Field>
              <label>First name</label>
              <V-Control icon="feather:user">
                <input
                  v-model="internalStudentGbpInfo.firstname"
                  type="text"
                  class="input"
                  placeholder="First Name"
                  :readonly="!isEditMode"
                  @keypress="removeValidation('firstname')"
                />
              </V-Control>
              <p v-show="internalValidation.firstname" class="help text-danger">
                {{ internalValidation.firstname }}
              </p>
            </V-Field>
          </div>
          <div class="column is-12">
            <V-Field>
              <label>Last name</label>
              <V-Control icon="feather:user">
                <input
                  v-model="internalStudentGbpInfo.lastname"
                  type="text"
                  class="input"
                  placeholder="Last Name"
                  :readonly="!isEditMode"
                  @keypress="removeValidation('lastname')"
                />
                <p
                  v-show="internalValidation.lastname"
                  class="help text-danger"
                >
                  {{ internalValidation.lastname }}
                </p>
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-12">
            <V-Field>
              <label>Email</label>
              <V-Control icon="feather:at-sign">
                <input
                  v-model="internalStudentGbpInfo.email"
                  type="text"
                  class="input"
                  placeholder="Email"
                  :readonly="!isEditMode"
                  @keypress="removeValidation('email')"
                />
                <p v-show="internalValidation.email" class="help text-danger">
                  {{ internalValidation.email }}
                </p>
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-12">
            <V-Field>
              <label>Globish Level</label>
              <p
                v-show="
                  internalStudentGbpInfo.voxyLevel !=
                  internalStudentGbpInfo.globishLevel
                "
                class="text-danger"
              >
                <i
                  aria-hidden="true"
                  class="iconify"
                  data-icon="feather:alert-triangle"
                ></i
                >&nbsp; &nbsp; Level Not Match!
              </p>
              <V-Control>
                <Multiselect
                  v-model="internalStudentGbpInfo.voxyLevel"
                  placeholder="Select globish level"
                  track-by="key"
                  value-prop="value"
                  :disabled="!isEditMode"
                  :searchable="true"
                  :options="globishLevelItems"
                  @keypress="removeValidation('globishLevel')"
                >
                  <template #singlelabel="{ value }">
                    <div class="multiselect-single-label">
                      {{ value.key }}
                    </div>
                  </template>
                  <template #option="{ option }">
                    <span class="select-option-text">
                      {{ option.key }}
                    </span>
                  </template>
                </Multiselect>
                <p
                  v-show="internalValidation.globishLevel"
                  class="help text-danger"
                >
                  {{ internalValidation.globishLevel }}
                </p>
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-12">
            <V-Field>
              <label>Group Globish Plus</label>
              <V-Control>
                <FeatureGroupOption
                  v-model="internalStudentGbpInfo.featureGroupId"
                  :disabled="!isEditMode"
                  @clear:validate="removeValidation('featureGroupId')"
                />
                <p
                  v-show="internalValidation.featureGroupId"
                  class="help text-danger"
                >
                  {{ internalValidation.featureGroupId }}
                </p>
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-12">
            <v-date-picker
              v-model="internalStudentGbpInfo.expireDate"
              color="orange"
              :model-config="{
                type: 'string',
                mask: 'YYYY-MM-DD',
              }"
              :masks="{
                input: 'DD/MM/YYYY',
              }"
              trim-weeks
              :popover="{ visibility: !isEditMode ? '' : 'click' }"
            >
              <template #default="{ inputValue, inputEvents }">
                <V-Field>
                  <label>Expire Date</label>
                  <V-Control icon="feather:calendar">
                    <input
                      class="input"
                      type="text"
                      placeholder="Expire Date"
                      :value="inputValue"
                      :readonly="!isEditMode"
                      v-on="inputEvents"
                      @change="removeValidation('expireDate')"
                    />
                  </V-Control>
                  <p
                    v-show="internalValidation.expireDate"
                    class="help text-danger"
                  >
                    {{ internalValidation.expireDate }}
                  </p>
                </V-Field>
              </template>
            </v-date-picker>
          </div>
        </div>
        <!-- Ticket Info -->
        <div class="fieldset">
          <div class="fieldset-heading">
            <h4>Ticket Info</h4>
            <p>Information of ticket</p>
          </div>
          <table class="table is-fullwidth table-size">
            <thead>
              <tr>
                <th scope="col">Ticket ID</th>
                <th scope="col" class="has-text-centered">Package Item ID</th>
                <th scope="col" class="has-text-centered">Feature Group ID</th>
                <th scope="col" class="has-text-centered">Globish Level</th>
                <th scope="col" class="has-text-centered">Package Name</th>
                <th scope="col" class="has-text-centered">Start Date</th>
                <th scope="col" class="has-text-centered">Expire Date</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(ticket, idxTicket) in internalStudentGbpInfo?.tickets"
                :key="`ticket-${idxTicket}`"
              >
                <td class="has-text-centered">{{ ticket?.id }}</td>
                <td class="has-text-centered">{{ ticket?.packageItemId }}</td>
                <td class="has-text-centered">
                  {{ ticket?.featureGroupId }}
                </td>
                <td class="has-text-centered">
                  {{
                    Object.keys(GLevel).find(
                      (key) => GLevel[key] === ticket?.globishLevel
                    ) || '-'
                  }}
                </td>
                <td class="has-text-centered">
                  ({{ ticket.packageId }}) {{ ticket?.packageName }}
                </td>
                <td class="has-text-centered">
                  {{
                    (ticket?.startDate &&
                      moment(ticket?.startDate).format('DD/MM/YYYY')) ||
                    '-'
                  }}
                </td>
                <td class="has-text-centered">
                  {{
                    (ticket?.expireDate &&
                      moment(ticket?.expireDate).format('DD/MM/YYYY')) ||
                    '-'
                  }}
                </td>
              </tr>
            </tbody>
          </table>
          <div class="content">
            <blockquote class="is-primary">
              <p class="text-danger">
                <i
                  aria-hidden="true"
                  class="iconify"
                  data-icon="feather:alert-triangle"
                ></i
                >&nbsp; &nbsp; Before "Save", please make sure the expiration
                date to be equal to the expiration date of the ticket.
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import 'src/scss/abstracts/_variables.scss';
.account-wrapper .account-box.is-form .form-body .fieldset {
  max-width: 750px;
}
.table-size {
  font-size: 12px;
}
</style>
