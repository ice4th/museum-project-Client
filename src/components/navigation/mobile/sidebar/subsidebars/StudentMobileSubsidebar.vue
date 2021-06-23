<script setup lang="ts">
import { isMobileSidebarOpen } from '/@src/state/mobileSidebarState'
import { activeSidebar } from '/@src/state/activeSidebarState'
</script>

<template>
  <div :class="[isMobileSidebarOpen && 'is-active']" class="mobile-subsidebar">
    <div class="inner">
      <div class="sidebar-title">
        <h3>Student</h3>
      </div>

      <ul class="submenu" data-simplebar>
        <li>
          <RouterLink :to="{ name: 'student' }">Student Info</RouterLink>
        </li>
        <!-- <li v-has-nested-router-link class="has-children">
          <div class="collapse-wrap">
            <a class="parent-link"
              >Personal <i class="iconify" data-icon="feather:chevron-right"
            /></a>
          </div>
          <ul>
            <li>
              <RouterLink
                :to="{ name: 'sidebar-dashboards' }"
                class="is-submenu"
              >
                <i class="lnil lnil-analytics-alt-1"></i>
                <span>Personal V1</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'sidebar-dashboards-personal-2' }"
                class="is-submenu"
              >
                <i class="lnil lnil-pie-chart"></i>
                <span>Personal V2</span>
              </RouterLink>
            </li>
          </ul>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../../../../scss/abstracts/_variables.scss';
@import '../../../../../scss/layout/_sidebar-mobile.scss';
</style>
