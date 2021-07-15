<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = 'Student Information'

useHead({
  title: 'Whitehouse: Student',
})
</script>

<template>
  <div class="page-content-inner">
    <!--Edit Profile-->
    <div class="account-wrapper">
      <div class="columns">
        <!--Navigation-->
        <div class="column is-4">
          <div class="account-box is-navigation">
            <V-Block title="Erik Kovalsky" subtitle="Product Manager" center>
              <template #icon>
                <V-Avatar
                  size="large"
                  picture="/demo/avatars/8.jpg"
                  badge="/images/icons/flags/thailand.svg"
                />
              </template>
            </V-Block>

            <div class="account-menu">
              <RouterLink
                :to="{ name: 'student-info' }"
                class="account-menu-item"
              >
                <i aria-hidden="true" class="lnil lnil-user-alt"></i>
                <span>General</span>
                <span class="end">
                  <i aria-hidden="true" class="fas fa-arrow-right"></i>
                </span>
              </RouterLink>
              <RouterLink :to="{ name: 'student' }" class="account-menu-item">
                <i aria-hidden="true" class="lnil lnil-book"></i>
                <span>Packages</span>
                <span class="end">
                  <i aria-hidden="true" class="fas fa-arrow-right"></i>
                </span>
              </RouterLink>
              <RouterLink :to="{ name: 'student' }" class="account-menu-item">
                <i aria-hidden="true" class="lnil lnil-user-alt"></i>
                <span>Private Class</span>
                <span class="end">
                  <i aria-hidden="true" class="fas fa-arrow-right"></i>
                </span>
              </RouterLink>
              <RouterLink :to="{ name: 'student' }" class="account-menu-item">
                <i aria-hidden="true" class="lnil lnil-users-alt"></i>
                <span>Discussion Class</span>
                <span class="end">
                  <i aria-hidden="true" class="fas fa-arrow-right"></i>
                </span>
              </RouterLink>
              <RouterLink :to="{ name: 'student' }" class="account-menu-item">
                <i aria-hidden="true" class="lnil lnil-users"></i>
                <span>Family Account</span>
                <span class="end">
                  <i aria-hidden="true" class="fas fa-arrow-right"></i>
                </span>
              </RouterLink>
              <RouterLink :to="{ name: 'student' }" class="account-menu-item">
                <i aria-hidden="true" class="lnil lnil-control-panel"></i>
                <span>Report Log</span>
                <span class="end">
                  <i aria-hidden="true" class="fas fa-arrow-right"></i>
                </span>
              </RouterLink>
              <RouterLink :to="{ name: 'student' }" class="account-menu-item">
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
  </div>
</template>

<style lang="scss">
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/abstracts/_mixins.scss';
@import '../../scss/pages/profile/_user-profile.scss';
</style>
