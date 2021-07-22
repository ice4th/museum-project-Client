<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import { computed, defineProps, onBeforeMount, ref } from 'vue'
import type { PropType } from 'vue'
import useNotyf from '/@src/composable/useNotyf'
import type {
  IStudentInfo,
  StudentInfoResponse,
} from '/@src/types/interfaces/student.interface'
import sleep from '/@src/utils/sleep'
import occupationList from '/@src/data/occupation-list.json'
import industryList from '/@src/data/industry-list.json'
import moment from 'moment-timezone'
const props = defineProps({
  studentInfo: {
    type: Object as PropType<StudentInfoResponse>,
  },
})
const isUploading = ref(false)
const isLoading = ref(false)
const experience = ref('')
const firstJob = ref('')
const flexibility = ref('')
const remote = ref('')
const age = ref(moment().diff(props.studentInfo?.dob, 'years'))
const devicesOptions = ['IOS', 'Mac', 'Android', 'PC']

const industryOptions = industryList
const occupationOptions = occupationList
const timezoneOptions = moment.tz.names()
const genderOptions = {
  male: 'Male',
  female: 'Female',
}

const notyf = useNotyf()
const { y } = useWindowScroll()

const isScrolling = computed(() => {
  return y.value > 30
})

const onAddFile = (error: any, file: any) => {
  if (error) {
    console.error(error)
    return
  }

  console.log('file added', file)
}
const onRemoveFile = (error: any, file: any) => {
  if (error) {
    console.error(error)
    return
  }

  console.log('file removed', file)
}
const onSave = async () => {
  isLoading.value = true
  await sleep()
  notyf.success('Your changes have been successfully saved!')
  isLoading.value = false
}
const isEditMode = ref(false)

onBeforeMount(() => {
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
              @click="isEditMode = false"
            >
              Go Back
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
      <!-- <div v-show="isEditMode" class="fieldset">
        <div class="fieldset-heading">
          <h4>Profile Picture</h4>
          <p>This is how others will recognize you</p>
        </div>

        <V-Avatar size="xl" class="profile-v-avatar">
          <template #avatar>
            <img
              v-if="!isUploading"
              class="avatar"
              src="/demo/avatars/8.jpg"
              alt=""
              @error.once="
                $event.target.src = 'https://via.placeholder.com/150x150'
              "
            />
            <V-FilePond
              v-else
              class="profile-filepond"
              name="profile_filepond"
              :chunk-retry-delays="[500, 1000, 3000]"
              label-idle="<i class='lnil lnil-cloud-upload'></i>"
              :accepted-file-types="['image/png', 'image/jpeg', 'image/gif']"
              :image-preview-height="140"
              :image-resize-target-width="140"
              :image-resize-target-height="140"
              image-crop-aspect-ratio="1:1"
              style-panel-layout="compact circle"
              style-load-indicator-position="center bottom"
              style-progress-indicator-position="right bottom"
              style-button-remove-item-position="left bottom"
              style-button-process-item-position="right bottom"
              @addfile="onAddFile"
              @removefile="onRemoveFile"
            />
            <V-IconButton
              v-if="!isUploading"
              icon="feather:edit-2"
              class="edit-button is-edit"
              circle
              @click="isUploading = true"
            />
            <V-IconButton
              v-else
              icon="feather:arrow-left"
              class="edit-button is-back"
              circle
              @click="isUploading = false"
            />
          </template>
        </V-Avatar>
      </div> -->

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
                  v-model="studentInfo.firstname.th"
                  type="text"
                  class="input"
                  placeholder="First Name (TH)"
                  autocomplete="given-name"
                  :readonly="!isEditMode"
                />
              </V-Control>
            </V-Field>
          </div>
          <!--Field-->
          <div class="column is-6">
            <V-Field>
              <label>Last name (TH)</label>
              <V-Control icon="feather:user">
                <input
                  v-model="studentInfo.lastname.th"
                  type="text"
                  class="input"
                  placeholder="Last Name (TH)"
                  autocomplete="family-name"
                  :readonly="!isEditMode"
                />
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-12">
            <V-Field>
              <label>Nickname (TH)</label>
              <V-Control icon="feather:user">
                <input
                  v-model="studentInfo.nickname.th"
                  type="text"
                  class="input"
                  placeholder="Nickname (TH)"
                  autocomplete="family-name"
                  :readonly="!isEditMode"
                />
              </V-Control>
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
                  v-model="studentInfo.firstname.en"
                  type="text"
                  class="input"
                  placeholder="First Name (EN)"
                  autocomplete="given-name"
                  :readonly="!isEditMode"
                />
              </V-Control>
            </V-Field>
          </div>
          <!--Field-->
          <div class="column is-6">
            <V-Field>
              <label>Last name (EN)</label>
              <V-Control icon="feather:user">
                <input
                  v-model="studentInfo.lastname.en"
                  type="text"
                  class="input"
                  placeholder="Last Name (EN)"
                  autocomplete="family-name"
                  :readonly="!isEditMode"
                />
              </V-Control>
            </V-Field>
          </div>
          <div class="column is-12">
            <V-Field>
              <label>Nickname (EN)</label>
              <V-Control icon="feather:user">
                <input
                  v-model="studentInfo.nickname.en"
                  type="text"
                  class="input"
                  placeholder="Nick Name (EN)"
                  autocomplete="family-name"
                  :readonly="!isEditMode"
                />
              </V-Control>
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
                  v-model="studentInfo.email"
                  type="text"
                  class="input"
                  placeholder="Email"
                  autocomplete="email"
                  readonly
                />
              </V-Control>
            </V-Field>
          </div>
          <!--Field-->
          <div class="column is-6">
            <V-Field>
              <label>Phone</label>
              <V-Control icon="feather:phone">
                <input
                  v-model="studentInfo.phone"
                  type="text"
                  class="input"
                  placeholder="Phone"
                  autocomplete="phone"
                  :readonly="!isEditMode"
                />
              </V-Control>
            </V-Field>
          </div>
          <!--Field-->
          <div class="column is-12">
            <V-Field>
              <label>Gender</label>
              <V-Control>
                <input
                  v-show="!isEditMode"
                  v-model="studentInfo.gender"
                  type="text"
                  class="input gender"
                  placeholder="Gender"
                  autocomplete="gender"
                  :readonly="!isEditMode"
                />
                <Multiselect
                  v-show="isEditMode"
                  v-model="studentInfo.gender"
                  :searchable="true"
                  :options="genderOptions"
                  placeholder="Gender"
                  :disabled="!isEditMode"
                />
              </V-Control>
            </V-Field>
          </div>
          <!--Field-->
          <div class="column is-9">
            <V-Field>
              <label>Date of birth</label>
              <V-Control icon="feather:calendar">
                <input
                  v-model="studentInfo.dob"
                  type="text"
                  class="input"
                  placeholder="Date of birth"
                  autocomplete="country-name"
                  :readonly="!isEditMode"
                />
              </V-Control>
            </V-Field>
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
                  autocomplete="country-name"
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
                  v-model="studentInfo.timezone"
                  type="text"
                  class="input"
                  placeholder="Age"
                  autocomplete="country-name"
                  :readonly="!isEditMode"
                />
                <Multiselect
                  v-show="isEditMode"
                  v-model="studentInfo.timezone"
                  :searchable="true"
                  :options="timezoneOptions"
                  placeholder="timezone"
                  :disabled="!isEditMode"
                />
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
                  v-model="studentInfo.studentNote.industry"
                  type="text"
                  class="input"
                  placeholder="Industry"
                  autocomplete="industry-name"
                  :readonly="!isEditMode"
                />
                <Multiselect
                  v-show="isEditMode"
                  v-model="studentInfo.studentNote.industry"
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
                  v-model="studentInfo.studentNote.occupation"
                  type="text"
                  class="input"
                  placeholder="Occupation"
                  autocomplete="occupation-name"
                  :readonly="!isEditMode"
                />
                <Multiselect
                  v-show="isEditMode"
                  v-model="studentInfo.studentNote.occupation"
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
                  v-model="studentInfo.studentNote.device"
                  type="text"
                  class="input"
                  placeholder="Add devices"
                  autocomplete="device-name"
                  :readonly="!isEditMode"
                />
                <Multiselect
                  v-show="isEditMode"
                  v-model="studentInfo.studentNote.device"
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
.input.gender {
  text-transform: capitalize;
}
</style>
