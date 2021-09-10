<script setup lang="ts">
import useStudentSetup from '/@src/composable/student/use-student-setup.ts'
const { forgotPassword } = useStudentSetup()
</script>

<template>
  <div class="account-box">
    <h1>Student Setting (activate ticket, set sth)</h1>
    <V-Button class="button is-primary" @click="forgotPassword"
      >Forgot Password</V-Button
    >
  </div>
</template>
