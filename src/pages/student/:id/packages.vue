<script setup lang="ts">
import { ref } from 'vue'
import useStudentPackageItemState from '/@src/composable/student/use-student-package'
const { validation, activePackages, inactivePackages, expirePackages } =
  useStudentPackageItemState()
</script>
<template>
  <StudentPackageItem
    :inactive-packages="inactivePackages"
    :active-packages="activePackages"
    :expire-packages="expirePackages"
  />
</template>
