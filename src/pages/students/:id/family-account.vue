<script setup lang="ts">
import useManageStudentFamily from '/@src/composable/students/useManageStudentFamily'
const { isOpenCreateFamilyPopup } = useManageStudentFamily()
// family-account Component
</script>

<template>
  <!-- student create button,student family list -> (inlist)>>add,delete student  -->
  <div class="is-flex is-justify-content-flex-end">
    <V-Button
      icon="fas fa-plus"
      color="primary"
      class="mb-3"
      @click="isOpenCreateFamilyPopup = true"
    >
      Create Family
    </V-Button>
  </div>
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
      <V-Button @click="isOpenCreateFamilyPopup = false">Submit</V-Button>
    </template>
  </V-modal>
  <div class="account-box">
    <h1>My Family Account</h1>
  </div>
</template>
