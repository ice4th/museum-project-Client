<script setup lang="ts">
import { inject, ref, watch, onMounted } from 'vue'
import useStudentInfo from '/@src/composable/students/useStudentInfo'
const { updateStudentProfile, validation, fetchStudentInfoById, studentInfo } =
  useStudentInfo()

onMounted(() => {
  fetchStudentInfoById()
})
</script>

<template>
  <StudentProfileEditor
    v-if="studentInfo"
    :student-info="studentInfo"
    :validation="validation"
    @on-update="updateStudentProfile"
  />
</template>
