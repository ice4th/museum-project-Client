<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { computed, onMounted, ref } from 'vue-demi'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import useStudentInfo from '/@src/composable/student/use-student-info'
import { displayStudentFullname } from '/@src/helpers/student.helper'

pageTitle.value = 'Student Information'

useHead({
  title: 'Whitehouse: Student',
})
const { fetchStudentInfoById, studentInfo, updateStudentProfile, isLoading } =
  useStudentInfo()

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
                :title="`(${studentInfo?.studentId}) ${studentName}`"
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
              <div class="advanced-box">
                <div v-if="studentInfo">
                  <V-Field>
                    <label>Change Country</label>
                    <V-Control>
                      <div class="select">
                        <select
                          v-model="studentInfo.country"
                          @change="
                            updateStudentProfile({
                              country: $event.target.value,
                            })
                          "
                        >
                          <option value="th">TH</option>
                          <option value="vn">VN</option>
                        </select>
                      </div>
                    </V-Control>
                  </V-Field>
                </div>
              </div>

              <div class="account-menu">
                <RouterLink
                  :to="{ name: 'student-:id' }"
                  class="account-menu-item"
                >
                  <i aria-hidden="true" class="lnil lnil-user-alt"></i>
                  <span>General</span>
                  <span class="end">
                    <i aria-hidden="true" class="fas fa-arrow-right"></i>
                  </span>
                </RouterLink>
                <RouterLink
                  :to="{ name: 'student-:id-packages' }"
                  class="account-menu-item"
                >
                  <i aria-hidden="true" class="lnil lnil-book"></i>
                  <span>Packages</span>
                  <span class="end">
                    <i aria-hidden="true" class="fas fa-arrow-right"></i>
                  </span>
                </RouterLink>
                <RouterLink
                  :to="{ name: 'student-:id-private-class' }"
                  class="account-menu-item"
                >
                  <i aria-hidden="true" class="lnil lnil-user-alt"></i>
                  <span>Private Class</span>
                  <span class="end">
                    <i aria-hidden="true" class="fas fa-arrow-right"></i>
                  </span>
                </RouterLink>
                <RouterLink
                  :to="{ name: 'student-:id-discussion-class' }"
                  class="account-menu-item"
                >
                  <i aria-hidden="true" class="lnil lnil-users-alt"></i>
                  <span>Discussion Class</span>
                  <span class="end">
                    <i aria-hidden="true" class="fas fa-arrow-right"></i>
                  </span>
                </RouterLink>
                <RouterLink
                  :to="{ name: 'student-:id-family-account' }"
                  class="account-menu-item"
                >
                  <i aria-hidden="true" class="lnil lnil-users"></i>
                  <span>Family Account</span>
                  <span class="end">
                    <i aria-hidden="true" class="fas fa-arrow-right"></i>
                  </span>
                </RouterLink>
                <RouterLink
                  :to="{ name: 'student-:id-report' }"
                  class="account-menu-item"
                >
                  <i aria-hidden="true" class="lnil lnil-control-panel"></i>
                  <span>Report Log</span>
                  <span class="end">
                    <i aria-hidden="true" class="fas fa-arrow-right"></i>
                  </span>
                </RouterLink>
                <RouterLink
                  :to="{ name: 'student-:id-settings' }"
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
              <transition name="translate-page-y" mode="in-out">
                <component :is="Component" />
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
.account-wrapper .account-box.is-navigation .media-flex-center {
  padding-bottom: 0;
}
.advanced-box {
  padding-bottom: 20px;
}
</style>
