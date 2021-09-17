<script setup lang="ts">
import { inject, ref, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useStudentInfo from '/@src/composable/students/useStudentInfo'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => route.hash === '#edit')
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
    :is-edit-mode="isEdit"
    @cancel="() => router.push({ hash: '' })"
    @on-update="updateStudentProfile"
    @change-country="(value) => updateStudentProfile({ country: value })"
  />
</template>
