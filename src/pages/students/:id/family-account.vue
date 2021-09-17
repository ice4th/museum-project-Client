<script setup lang="ts">
import useManageStudentFamily from '/@src/composable/students/useManageStudentFamily'
import useOptionApi from '/@src/composable/api/useOptionApi'
const {
  isOpenCreateFamilyPopup,
  isOpenDeleteConfirmPopup,
  familyTableHeaders,
  addFamily,
  deleteMember,
  student,
  family,
  addStdToFam,
  familyInfo,
  memberId,
  validate,
} = useManageStudentFamily()
const { getStudentsWithoutFamily } = useOptionApi()
// family-account Component

// const familyData = [
//   {
//     id: 1,
//     name: 'สมปอง เป็นน้องสมชาย',
//     role: 'General',
//     email: 'ggg@gmail.com',
//     phone: '0946872456',
//   },
//   {
//     id: 2,
//     name: 'สมหมาย เป็นพี่สมปอง',
//     role: 'General',
//     email: 'ggg@gmail.com',
//     phone: '0946872567',
//   },
// ]
</script>

<template>
  <!-- student create button,student family list -> (inlist)>>add,delete student  -->
  <!-- Creat family -->
  <V-modal
    :open="isOpenCreateFamilyPopup"
    title="Create student family"
    size="medium"
    actions="right"
    @close="isOpenCreateFamilyPopup = false"
  >
    <template #content>
      <form class="modal-form">
        <V-Field>
          <label>Name</label>
          <V-Control>
            <input
              v-model="family.name"
              type="text"
              class="input is-primary-focus"
              placeholder="Student family"
              required
            />
          </V-Control>
          <p v-show="validate.name" class="help text-danger">
            {{ validate.name }}
          </p>
        </V-Field>
        <V-Field>
          <label>Note</label>
          <V-Control>
            <textarea
              v-model="family.note"
              type="text"
              class="textarea is-primary-focus"
              rows="2"
              placeholder="Note"
              required
            ></textarea>
          </V-Control>
        </V-Field>
      </form>
    </template>
    <template #action>
      <V-Button color="primary" @click="addFamily">Submit</V-Button>
    </template>
  </V-modal>
  <!-- familylist page -->
  <div class="account-box">
    <div v-if="!familyInfo" class="is-flex is-justify-content-space-between">
      <div class="left">
        <h2 class="title is-5 is-narrow is-bolder">Family Account</h2>
      </div>
      <div class="right">
        <V-Button
          icon="fas fa-plus"
          color="primary"
          class="mb-3"
          @click="isOpenCreateFamilyPopup = true"
        >
          Create Family
        </V-Button>
      </div>
    </div>
    <template v-else>
      <div class="columns">
        <div class="column is-6">
          <SelectOption
            v-model="student"
            :callback-search="getStudentsWithoutFamily"
            label-by="fullnameTh"
            track-by="fullnameTh"
            value-prop="id"
            placeholder="Select student to add family (Search by name,id)"
          />
          <!-- <p v-show="validate.student" class="help text-danger">
          {{ validate.student }}
        </p> -->
        </div>
        <div class="column is-6">
          <V-Button color="primary" @click="addStdToFam">Add</V-Button>
        </div>
      </div>
      <!-- family list -->
      <Datatable
        :headers="familyTableHeaders"
        :data="familyInfo?.students || []"
        :can-searchable="false"
        hide-per-page
        hide-pagination
      >
        <template #action="{ value }">
          <V-Button color="danger" outlined @click="memberId = value.id"
            >Delete</V-Button
          >
        </template>
      </Datatable>
    </template>
  </div>
  <V-Modal
    :open="!!memberId"
    size="small"
    actions="center"
    @close="memberId = undefined"
  >
    <template #content>
      <V-Message color="danger"> Confirm Remove </V-Message>
    </template>
    <template #action>
      <V-Button color="danger" outlined @click="deleteMember(val)"
        >Comfirm</V-Button
      >
    </template>
  </V-Modal>
</template>
