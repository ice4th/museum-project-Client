<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import useStudentPackageItemState from '/@src/composable/student/use-student-package'
const { packageItems, fetchStudentPackages } = useStudentPackageItemState()

onMounted(() => {
  fetchStudentPackages()
})
</script>
<template>
  <CollapseContent
    with-chevron
    title="Inactive Package"
    v-if="packageItems.inactivePackages.length"
  >
    <template #collapse-content>
      <StudentPackageItem
        :package-items="packageItems.inactivePackages"
        @fetch-package-items="fetchStudentPackages"
        can-activate
      />
    </template>
  </CollapseContent>
  <CollapseContent
    with-chevron
    title="Active Package"
    v-if="packageItems.activePackages.length"
  >
    <template #collapse-content>
      <StudentPackageItem
        :package-items="packageItems.activePackages"
        @fetch-package-items="fetchStudentPackages"
      />
    </template>
  </CollapseContent>
  <CollapseContent
    with-chevron
    title="Expired Package"
    v-if="packageItems.expirePackages.length"
  >
    <template #collapse-content>
      <StudentPackageItem
        :package-items="packageItems.expirePackages"
        @fetch-package-items="fetchStudentPackages"
      />
    </template>
  </CollapseContent>
</template>
