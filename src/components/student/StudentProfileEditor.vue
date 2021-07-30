<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, defineEmit, onBeforeMount, ref, watch } from 'vue'
import type { PropType } from 'vue'
import useNotyf from '/@src/composable/useNotyf'
import type {
  IStudentInfo,
  IUpdateStudentProfile,
  StudentInfoResponse,
} from '/@src/types/interfaces/student.interface'
import sleep from '/@src/utils/sleep'
import occupationList from '/@src/data/occupation-list.json'
import industryList from '/@src/data/industry-list.json'
import moment from 'moment-timezone'
import _ from 'lodash'

const props = defineProps({
  studentInfo: {
    type: Object as PropType<StudentInfoResponse>,
    required: true,
  },
  validation: {
    type: Object,
    default: () => {},
  },
})
const emit = defineEmit({
  'on-update': Object,
})

const { y } = useWindowScroll()
const isScrolling = computed(() => {
  return y.value > 30
})

const isEditMode = ref(false)
const isLoading = ref(false)
const internalStudentInfo = ref<StudentInfoResponse | undefined>(undefined)
const internalValidation = ref(props.validation)

watch(
  () => props.validation,
  () => (internalValidation.value = props.validation)
)

const age = computed(() =>
  moment(internalStudentInfo.value?.dob).isValid()
    ? moment().diff(internalStudentInfo.value?.dob, 'years')
    : ''
)
const devicesOptions = ['IOS', 'Mac', 'Android', 'PC']
const industryOptions = industryList
const occupationOptions = occupationList
const timezoneOptions = moment.tz.names()
const genderOptions = {
  male: 'Male',
  female: 'Female',
}

const onSave = async () => {
  isLoading.value = true
  const { value } = internalStudentInfo
  const data = {
    firstnameTH: value?.firstname.th,
    lastnameTH: value?.lastname.th,
    nicknameTH: value?.nickname.th,
    firstnameEN: value?.firstname.en,
    lastnameEN: value?.lastname.en,
    nicknameEN: value?.nickname.en,
    gender: value?.gender,
    dob: value?.dob,
    phone: value?.phone,
    email: value?.email,
    timezone: value?.timezone,
    industry: value?.studentNote?.industry,
    school: value?.studentNote?.school,
    device: value?.studentNote?.device?.join(','),
    occupation: value?.studentNote?.occupation,
  } as IUpdateStudentProfile
  emit('on-update', data)
  isLoading.value = false
}

const onCancelEdit = () => {
  isEditMode.value = false
  internalStudentInfo.value = _.cloneDeep(props.studentInfo)
  internalValidation.value = {}
}

onBeforeMount(() => {
  if (props.studentInfo) {
    internalStudentInfo.value = _.cloneDeep(props.studentInfo)
  }
  if (
    !occupationOptions.some(
      (oc) => oc.value === props.studentInfo?.studentNote?.occupation
    )
  ) {
    occupationOptions.push({
      text: props.studentInfo?.studentNote?.occupation || '',
      value: props.studentInfo?.studentNote?.occupation || '',
    })
  }
})

const removeValidation = (key: string) => {
  delete internalValidation.value[key]
}
</script>

<template>
  <div class="account-box is-form is-footerless">
    <div class="form-head stuck-header" :class="[isScrolling && 'is-stuck']">
      <div class="form-head-inner">
        <div class="left">
          <h3>General Info</h3>
          <p>Edit your account's general information</p>
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
      <!--Fieldset-->
      <div class="fieldset">
        <div class="fieldset-heading">
          <h4>Personal Info (TH)</h4>
          <p>Others diserve to know you more</p>
        </div>

        <div class="columns is-multiline">
          <!--Field-->
          <div class="column is-6">
            <V-Field>
              <label>First name (TH)</label>
              <V-Control icon="feather:user">
                <input
                  v-model="internalStudentInfo.firstname.th"
                  type="text"
                  class="input"
                  placeholder="First Name (TH)"
                  autocomplete="given-name"
                  :readonly="!isEditMode"
                  @keypress="removeValidation('firstnameTH')"
                />
              </V-Control>
              <h6 v-show="internalValidation.firstnameTH" class="msg-error">
                {{ internalValidation.firstnameTH }}
              </h6>
            </V-Field>
          </div>
          <!--Field-->
          <div class="column is-6">
            <V-Field>
              <label>Last name (TH)</label>
              <V-Control icon="feather:user">
                <input
                  v-model="internalStudentInfo.lastname.th"
                  type="text"
                  class="input"
                  placeholder="Last Name (TH)"
                  autocomplete="family-name"
                  :readonly="!isEditMode"
                  @keypress="removeValidation('lastnameTH')"
                />
              </V-Control>
              <h6 v-show="internalValidation.lastnameTH" class="msg-error">
                {{ internalValidation.lastnameTH }}
              </h6>
            </V-Field>
          </div>
          <div class="column is-12">
            <V-Field>
              <label>Nickname (TH)</label>
              <V-Control icon="feather:user">
                <input
                  v-model="internalStudentInfo.nickname.th"
                  type="text"
                  class="input"
                  placeholder="Nickname (TH)"
                  autocomplete="family-name"
                  :readonly="!isEditMode"
                  @keypress="removeValidation('nicknameTH')"
                />
              </V-Control>
              <h6 v-show="internalValidation.nicknameTH" class="msg-error">
                {{ internalValidation.nicknameTH }}
              </h6>
            </V-Field>
          </div>
        </div>
      </div>

      <!--Fieldset-->
      <div class="fieldset">
        <div class="fieldset-heading">
          <h4>Personal Info (EN)</h4>
          <p>Others diserve to know you more</p>
        </div>

        <div class="columns is-multiline">
          <!--Field-->
          <div class="column is-6">
            <V-Field>
              <label>First name (EN)</label>
              <V-Control icon="feather:user">
                <input
                  v-model="internalStudentInfo.firstname.en"
                  type="text"
                  class="input"
                  placeholder="First Name (EN)"
                  autocomplete="given-name"
                  :readonly="!isEditMode"
                  @keypress="removeValidation('firstnameEN')"
                />
              </V-Control>
              <h6 v-show="internalValidation.firstnameEN" class="msg-error">
                {{ internalValidation.firstnameEN }}
              </h6>
            </V-Field>
          </div>
          <!--Field-->
          <div class="column is-6">
            <V-Field>
              <label>Last name (EN)</label>
              <V-Control icon="feather:user">
                <input
                  v-model="internalStudentInfo.lastname.en"
                  type="text"
                  class="input"
                  placeholder="Last Name (EN)"
                  autocomplete="family-name"
                  :readonly="!isEditMode"
                  @keypress="removeValidation('lastnameEN')"
                />
              </V-Control>
              <h6 v-show="internalValidation.lastnameEN" class="msg-error">
                {{ internalValidation.lastnameEN }}
              </h6>
            </V-Field>
          </div>
          <div class="column is-12">
            <V-Field>
              <label>Nickname (EN)</label>
              <V-Control icon="feather:user">
                <input
                  v-model="internalStudentInfo.nickname.en"
                  type="text"
                  class="input"
                  placeholder="Nick Name (EN)"
                  autocomplete="family-name"
                  :readonly="!isEditMode"
                  @keypress="removeValidation('nicknameEN')"
                />
              </V-Control>
              <h6 v-show="internalValidation.nicknameEN" class="msg-error">
                {{ internalValidation.nicknameEN }}
              </h6>
            </V-Field>
          </div>
        </div>
      </div>

      <!--Fieldset-->
      <div class="fieldset">
        <div class="fieldset-heading">
          <h4>General Info</h4>
          <p>Others diserve to know you more</p>
        </div>

        <div class="columns is-multiline">
          <!--Field-->
          <div class="column is-6">
            <V-Field>
              <label>Email</label>
              <V-Control icon="feather:user">
                <input
                  v-model="internalStudentInfo.email"
                  type="text"
                  class="input"
                  placeholder="Email"
                  autocomplete="email"
                  @keypress="removeValidation('email')"
                />
              </V-Control>
              <h6 v-show="internalValidation.email" class="msg-error">
                {{ internalValidation.email }}
              </h6>
            </V-Field>
          </div>
          <!--Field-->
          <div class="column is-6">
            <V-Field>
              <label>Phone</label>
              <V-Control icon="feather:phone">
                <input
                  v-model="internalStudentInfo.phone"
                  type="text"
                  class="input"
                  placeholder="Phone"
                  autocomplete="phone"
                  :readonly="!isEditMode"
                  @keypress="removeValidation('phone')"
                />
              </V-Control>
              <h6 v-show="internalValidation.phone" class="msg-error">
                {{ internalValidation.phone }}
              </h6>
            </V-Field>
          </div>
          <!--Field-->
          <div class="column is-12">
            <V-Field>
              <label>Gender</label>
              <V-Control>
                <input
                  v-show="!isEditMode"
                  v-model="internalStudentInfo.gender"
                  type="text"
                  class="input gender"
                  placeholder="Gender"
                  autocomplete="gender"
                  :readonly="!isEditMode"
                />
                <Multiselect
                  v-show="isEditMode"
                  v-model="internalStudentInfo.gender"
                  :searchable="true"
                  :options="genderOptions"
                  placeholder="Gender"
                  :disabled="!isEditMode"
                  @change="removeValidation('gender')"
                />
              </V-Control>
              <h6 v-show="internalValidation.gender" class="msg-error">
                {{ internalValidation.gender }}
              </h6>
            </V-Field>
          </div>
          <!--Field-->
          <div class="column is-9">
            <v-date-picker
              v-model="internalStudentInfo.dob"
              color="orange"
              :model-config="{
                type: 'string',
                mask: 'YYYY-MM-DD',
              }"
              :masks="{
                input: 'YYYY-MM-DD',
              }"
              trim-weeks
              :popover="{ visibility: !isEditMode ? '' : 'click' }"
            >
              <template #default="{ inputValue, inputEvents }">
                <V-Field>
                  <label>Date of birth</label>
                  <V-Control icon="feather:calendar">
                    <input
                      class="input"
                      type="text"
                      placeholder="Date of birth"
                      :value="inputValue"
                      :readonly="!isEditMode"
                      v-on="inputEvents"
                      @click="removeValidation('dob')"
                    />
                  </V-Control>
                  <h6 v-show="internalValidation.dob" class="msg-error">
                    {{ internalValidation.dob }}
                  </h6>
                </V-Field>
              </template>
            </v-date-picker>
          </div>
          <!--Field-->
          <div class="column is-3">
            <V-Field>
              <label>Age</label>
              <V-Control>
                <input
                  v-model="age"
                  type="text"
                  class="input"
                  placeholder="Age"
                  readonly
                />
              </V-Control>
            </V-Field>
          </div>

          <div class="column is-12">
            <V-Field class="is-autocomplete-select">
              <label>Timezone</label>
              <V-Control icon="feather:clock">
                <input
                  v-show="!isEditMode"
                  v-model="internalStudentInfo.timezone"
                  type="text"
                  class="input"
                  placeholder="Timezone"
                  autocomplete="country-name"
                  :readonly="!isEditMode"
                  @keypress="removeValidation('timezone')"
                />
                <Multiselect
                  v-show="isEditMode"
                  v-model="internalStudentInfo.timezone"
                  :searchable="true"
                  :options="timezoneOptions"
                  placeholder="timezone"
                  :disabled="!isEditMode"
                  @change="removeValidation('timezone')"
                />
                <h6 v-show="internalValidation.timezone" class="msg-error">
                  {{ internalValidation.timezone }}
                </h6>
              </V-Control>
            </V-Field>
          </div>
          <!--Field-->
          <!-- <div class="column is-12">
            <V-Field>
              <label>Address</label>
              <V-Control>
                <textarea
                  class="textarea"
                  rows="4"
                  placeholder="Address"
                  autocomplete="off"
                  autocapitalize="off"
                  spellcheck="true"
                  :readonly="!isEditMode"
                ></textarea>
              </V-Control>
            </V-Field>
          </div> -->
        </div>
      </div>

      <!--Fieldset-->
      <div class="fieldset">
        <div class="fieldset-heading">
          <h4>Professional Info</h4>
          <p>This can help you to win some opportunities</p>
        </div>
        <div class="columns is-multiline">
          <!--Field-->
          <div class="column is-12">
            <V-Field class="is-autocomplete-select">
              <label>Industry</label>
              <V-Control icon="feather:briefcase">
                <input
                  v-show="!isEditMode"
                  v-model="internalStudentInfo.studentNote.industry"
                  type="text"
                  class="input"
                  placeholder="Industry"
                  autocomplete="industry-name"
                  :readonly="!isEditMode"
                />
                <Multiselect
                  v-show="isEditMode"
                  v-model="internalStudentInfo.studentNote.industry"
                  :searchable="true"
                  :options="industryOptions"
                  placeholder="Industry"
                  track-by="text"
                  value-prop="value"
                  :disabled="!isEditMode"
                >
                  <template #singlelabel="{ value }">
                    <div class="multiselect-single-label">
                      {{ value.text }}
                    </div>
                  </template>
                  <template #option="{ option }">
                    <span class="select-option-text">
                      {{ option.text }}
                    </span>
                  </template>
                </Multiselect>
              </V-Control>
            </V-Field>
            <V-Field class="is-autocomplete-select">
              <label>Occupation</label>
              <V-Control icon="feather:briefcase">
                <input
                  v-show="!isEditMode"
                  v-model="internalStudentInfo.studentNote.occupation"
                  type="text"
                  class="input"
                  placeholder="Occupation"
                  autocomplete="occupation-name"
                  :readonly="!isEditMode"
                />
                <Multiselect
                  v-show="isEditMode"
                  v-model="internalStudentInfo.studentNote.occupation"
                  :searchable="true"
                  :options="occupationOptions"
                  placeholder="Occupation"
                  track-by="text"
                  value-prop="value"
                  :disabled="!isEditMode"
                >
                  <template #singlelabel="{ value }">
                    <div class="multiselect-single-label">
                      {{ value.text }}
                    </div>
                  </template>
                  <template #option="{ option }">
                    <span class="select-option-text">
                      {{ option.text }}
                    </span>
                  </template>
                </Multiselect>
              </V-Control>
            </V-Field>
            <V-Field>
              <label>School</label>
              <V-Control icon="feather:briefcase">
                <input
                  type="text"
                  class="input"
                  placeholder="School"
                  autocomplete="organization-title"
                  :readonly="!isEditMode"
                />
              </V-Control>
            </V-Field>
          </div>
          <!--Field-->
          <div class="column is-12">
            <V-Field>
              <label>Devices</label>
              <V-Control>
                <input
                  v-show="!isEditMode"
                  v-model="internalStudentInfo.studentNote.device"
                  type="text"
                  class="input"
                  placeholder="Add devices"
                  autocomplete="device-name"
                  :readonly="!isEditMode"
                />
                <Multiselect
                  v-show="isEditMode"
                  v-model="internalStudentInfo.studentNote.device"
                  mode="tags"
                  :searchable="true"
                  :create-tag="true"
                  :options="devicesOptions"
                  placeholder="Add devices"
                  :disabled="!isEditMode"
                />
              </V-Control>
            </V-Field>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../scss/abstracts/_variables.scss';
.input.gender {
  text-transform: capitalize;
}
h6.msg-error {
  color: $danger;
}
</style>
