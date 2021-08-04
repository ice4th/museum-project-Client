<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import useStudentPackageItemState from '/@src/composable/student/use-student-package'
const { packageItems, fetchStudentPackages, isLoading } =
  useStudentPackageItemState()

onMounted(() => {
  fetchStudentPackages()
})
</script>
<template>
  <div v-if="!isLoading">
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
        />
      </template>
    </CollapseContent>
  </div>
</template>
