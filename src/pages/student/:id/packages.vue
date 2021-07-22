<script setup lang="ts">
import { ref } from 'vue'
import useStudentPackageItemState from '/@src/composable/student/use-student-package'
const { packageItems, validation, activePackages } =
  useStudentPackageItemState()
</script>
<template>
  <StudentPackageItem
    v-if="packageItems"
    :package-items="packageItems"
    :active-packages="activePackages"
  />
</template>
