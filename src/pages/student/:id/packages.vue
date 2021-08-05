<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import useStudentPackageItemState from '/@src/composable/student/use-student-package'
import type { IStudentPackageItems } from '/@src/types/interfaces/package-item.interface'
const {
  packageItems,
  fetchStudentPackages,
  isLoading,
  currentPackageItem,
  sendPackage,
} = useStudentPackageItemState()

const toggleModal = (packageItem?: IStudentPackageItems) => {
  console.log('toggleModal')

  currentPackageItem.value = packageItem
}
onMounted(() => {
  fetchStudentPackages()
})
</script>
<template>
  <div v-if="!isLoading">
    <!-- [Modal]: Send Package -->
    <ModalSendPackage
      :title="`Send package`"
      :open-modal="!!currentPackageItem"
      @on-change="sendPackage"
      @toggle-close="toggleModal"
    />
    <CollapseContent
      v-if="packageItems.inactivePackages.length"
      with-chevron
      title="Inactive Package"
    >
      <template #collapse-content>
        <StudentPackageItem
          :package-items="packageItems.inactivePackages"
          can-activate
          @fetch-package-items="fetchStudentPackages"
          @send-package="toggleModal"
        />
      </template>
    </CollapseContent>
    <CollapseContent
      v-if="packageItems.activePackages.length"
      with-chevron
      title="Active Package"
    >
      <template #collapse-content>
        <StudentPackageItem
          :package-items="packageItems.activePackages"
          @fetch-package-items="fetchStudentPackages"
          @send-package="toggleModal"
        />
      </template>
    </CollapseContent>
    <CollapseContent
      v-if="packageItems.expirePackages.length"
      with-chevron
      title="Expired Package"
    >
      <template #collapse-content>
        <StudentPackageItem
          :package-items="packageItems.expirePackages"
          @fetch-package-items="fetchStudentPackages"
          @send-package="toggleModal"
        />
      </template>
    </CollapseContent>
  </div>
</template>
