<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { computed, onMounted, ref } from 'vue-demi'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import useStudentInfo from '/@src/composable/students/useStudentInfo'
import { displayStudentFullname } from '/@src/helpers/student.helper'

pageTitle.value = 'Student Information'

useHead({
  title: 'Whitehouse: Student',
})
const {
  fetchStudentInfoById,
  studentInfo,
  updateStudentProfile,
  isLoading,
  loginAsStudent,
  loadingLogin,
} = useStudentInfo()

const studentName = computed(() => displayStudentFullname(studentInfo?.value))
const studentFlag = computed(() => {
  if (studentInfo?.value?.country === 'vn') {
    return '/images/icons/flags/vietnam.svg'
  } else {
    return '/images/icons/flags/thailand.svg'
  }
})

onMounted(() => {
  fetchStudentInfoById()
})
</script>

<template>
  <div class="page-content-inner">
    <!--Edit Profile-->
    <V-Loader size="large" translucent :active="isLoading">
      <div class="account-wrapper">
        <div class="columns">
          <!--Navigation-->
          <div class="column is-4">
            <div class="account-box is-navigation">
              <V-Block
                v-show="studentInfo"
                :title="`(${studentInfo?.id}) ${studentName}`"
                :subtitle="studentInfo?.email"
                center
              >
                <template #icon>
                  <V-Avatar
                    size="large"
                    :picture="studentInfo?.avatar"
                    :badge="studentFlag"
                  />
                </template>
              </V-Block>
              <div class="advanced-box p-3">
                <V-Button
                  icon="feather:log-in"
                  color="primary"
                  class="has-fullwidth"
                  :loading="loadingLogin"
                  outlined
                  @click="loginAsStudent"
                  >Login as Student</V-Button
                >
              </div>

              <div class="account-menu">
                <RouterLink
                  :to="{ name: 'students-:id' }"
                  class="account-menu-item"
                >
                  <i aria-hidden="true" class="lnil lnil-user-alt"></i>
                  <span>Profile</span>
                  <span class="end">
                    <i aria-hidden="true" class="fas fa-arrow-right"></i>
                  </span>
                </RouterLink>
                <RouterLink
                  :to="{ name: 'students-:id-packages' }"
                  class="account-menu-item"
                >
                  <i aria-hidden="true" class="lnil lnil-package"></i>
                  <span>Packages</span>
                  <span class="end">
                    <i aria-hidden="true" class="fas fa-arrow-right"></i>
                  </span>
                </RouterLink>
                <RouterLink
                  :to="{ name: 'students-:id-private-class' }"
                  class="account-menu-item"
                >
                  <i aria-hidden="true" class="lnil lnil-classroom"></i>
                  <span>Private Class</span>
                  <span class="end">
                    <i aria-hidden="true" class="fas fa-arrow-right"></i>
                  </span>
                </RouterLink>
                <RouterLink
                  :to="{ name: 'students-:id-discussion-class' }"
                  class="account-menu-item"
                >
                  <i aria-hidden="true" class="lnil lnil-users-alt"></i>
                  <span>Discussion Class</span>
                  <span class="end">
                    <i aria-hidden="true" class="fas fa-arrow-right"></i>
                  </span>
                </RouterLink>
                <RouterLink
                  :to="{ name: 'students-:id-globish-plus' }"
                  class="account-menu-item"
                >
                  <i aria-hidden="true" class="lnil lnil-global"></i>
                  <span>Globish Plus</span>
                  <span class="end">
                    <i aria-hidden="true" class="fas fa-arrow-right"></i>
                  </span>
                </RouterLink>
                <RouterLink
                  :to="{ name: 'students-:id-family-account' }"
                  class="account-menu-item"
                >
                  <i aria-hidden="true" class="lnil lnil-hierchy-alt"></i>
                  <span>Family Account</span>
                  <span class="end">
                    <i aria-hidden="true" class="fas fa-arrow-right"></i>
                  </span>
                </RouterLink>
                <RouterLink
                  :to="{ name: 'students-:id-report' }"
                  class="account-menu-item"
                >
                  <i aria-hidden="true" class="lnil lnil-control-panel"></i>
                  <span>Report Log</span>
                  <span class="end">
                    <i aria-hidden="true" class="fas fa-arrow-right"></i>
                  </span>
                </RouterLink>
                <RouterLink
                  :to="{ name: 'students-:id-settings' }"
                  class="account-menu-item"
                >
                  <i aria-hidden="true" class="lnil lnil-cog"></i>
                  <span>Settings</span>
                  <span class="end">
                    <i aria-hidden="true" class="fas fa-arrow-right"></i>
                  </span>
                </RouterLink>
              </div>
            </div>
          </div>
          <div class="column is-8">
            <!-- <StudentProfileEditor /> -->
            <RouterView v-slot="{ Component }">
              <transition name="fade-fast" mode="out-in">
                <component :is="Component" :key="$route.fullPath" />
              </transition>
            </RouterView>
          </div>
        </div>
      </div>
    </V-Loader>
  </div>
</template>

<style lang="scss">
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/abstracts/_mixins.scss';
@import '../../scss/pages/profile/_user-profile.scss';
.account-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}
.account-wrapper .account-box.is-navigation .media-flex-center {
  padding-bottom: 0;
}

.advanced-box {
  padding-bottom: 20px;
}
</style>
