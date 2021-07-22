<script setup lang="ts">
import { ref } from 'vue'
import useStudentInfo from '/@src/composable/student/use-student-info'
const { studentInfo, updateStudentProfile, validation } = useStudentInfo()
</script>

<template>
  <StudentProfileEditor
    v-if="studentInfo"
    :student-info="studentInfo"
    @on-update="updateStudentProfile"
    :validation="validation"
  />
</template>
