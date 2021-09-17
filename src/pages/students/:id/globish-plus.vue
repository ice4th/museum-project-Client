<script setup lang="ts">
import { inject, ref, onMounted } from 'vue'
import useStudentGlobishPlus from '/@src/composable/students/useStudentGlobishPlus'
const {
  updateStudentGlobishPlusProfile,
  fetchStudentGlobishPlusById,
  validation,
  studentGlobishPlus,
} = useStudentGlobishPlus()

const studentInfo = inject('studentInfo')

onMounted(() => {
  fetchStudentGlobishPlusById()
})
</script>

<template>
  <StudentGlobishPlusEditor
    v-if="studentGlobishPlus"
    :student-info="studentInfo"
    :student-gbp-info="studentGlobishPlus"
    :validation="validation"
    @on-update="updateStudentGlobishPlusProfile"
  />
  <h3 v-if="!studentGlobishPlus">No Have Globish Plus</h3>
</template>
