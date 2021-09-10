<script setup lang="ts">
import useManageStudentFamily from '/@src/composable/students/useManageStudentFamily'
import useOptionApi from '/@src/composable/api/useOptionApi'
const {
  isOpenCreateFamilyPopup,
  isOpenDeleteConfirmPopup,
  familyTableHeaders,
  deleteMember,
  students,
} = useManageStudentFamily()
const { getStudents } = useOptionApi()
// family-account Component

const familyData = [
  {
    id: 1,
    name: 'สมปอง เป็นน้องสมชาย',
    role: 'General',
    email: 'ggg@gmail.com',
    phone: '0946872456',
  },
  {
    id: 2,
    name: 'สมหมาย เป็นพี่สมปอง',
    role: 'General',
    email: 'ggg@gmail.com',
    phone: '0946872567',
  },
]
</script>

<template>
  <!-- student create button,student family list -> (inlist)>>add,delete student  -->

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
              type="text"
              class="input is-primary-focus"
              placeholder="Student family"
              required
            />
          </V-Control>
        </V-Field>
        <V-Field>
          <label>Note</label>
          <V-Control>
            <textarea
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
      <V-Button color="primary" @click="isOpenCreateFamilyPopup = false"
        >Submit</V-Button
      >
    </template>
  </V-modal>

  <!-- family list -->
  <div class="account-box">
    <div class="is-flex is-justify-content-space-between">
      <div class="left">
        <h2 class="title is-5 is-narrow is-bolder">My Family Account</h2>
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
    <div class="columns">
      <div class="column is-6">
        <SelectOption
          v-model="students"
          :callback-search="getStudents"
          label-by="fullnameTh"
          track-by="fullnameTh"
          value-prop="id"
          placeholder="Select student for send package (Search by name)"
        />
      </div>
      <div class="column is-6">
        <V-Button color="primary">Add</V-Button>
      </div>
    </div>

    <Datatable
      :headers="familyTableHeaders"
      :data="familyData"
      :can-searchable="false"
      hide-per-page
      hide-pagination
    >
      <template #action>
        <V-Button
          color="danger"
          outlined
          @click="isOpenDeleteConfirmPopup = true"
          >Delete</V-Button
        >
      </template>
    </Datatable>
  </div>
  <V-Modal
    :open="isOpenDeleteConfirmPopup"
    size="small"
    actions="center"
    @close="isOpenDeleteConfirmPopup = false"
  >
    <!-- <template #content>
      <p class="title has-text-danger is-justify-content-center">
        Are you sure to delete ?
      </p>
    </template> -->
    <!-- <template #content>
      <V-PlaceholderSection
        class="has-text-danger-dark"
        title="Confirmation"
        subtitle="Are you sure to delete ?"
      />
    </template> -->
    <template #content>
      <V-Message color="danger"> Confirm Remove </V-Message>
    </template>
    <template #action>
      <V-Button color="danger" outlined @click="deleteMember">Comfirm</V-Button>
    </template>
  </V-Modal>
</template>
