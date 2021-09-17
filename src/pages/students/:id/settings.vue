<script setup lang="ts">
import useStudentSetup from '/@src/composable/students/useStudentSetup'
const { forgotPassword, copyForgotLink, isCopied } = useStudentSetup()
</script>

<template>
  <div class="account-box">
    <!-- <h1>Student Setting (activate ticket, set sth)</h1> -->
    <div class="columns">
      <div class="column">
        <V-Button class="button is-primary" @click="forgotPassword">
          Forgot Password
        </V-Button>
      </div>
      <!-- <div class="column">
        <V-Button
          class="button is-primary"
          icon="feather:copy"
          @click="copyForgotLink"
        >
          <span> Copy Forgot Password Link </span>
        </V-Button>
      </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.account-box {
  height: 100%;
}
</style>
