<script setup lang="ts">
import { inject, ref } from 'vue'
import useStudentInfo from '/@src/composable/students/useStudentInfo'
const { updateStudentProfile, validation } = useStudentInfo()
const studentInfo = inject('studentInfo')
</script>

<template>
  <StudentProfileEditor
    v-if="studentInfo"
    :student-info="studentInfo"
    :validation="validation"
    @on-update="updateStudentProfile"
  />
</template>
