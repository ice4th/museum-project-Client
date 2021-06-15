<script setup lang="ts">
import { activeSidebar } from '/@src/state/activeSidebarState'
</script>

<template>
  <div
    id="home-sidebar"
    :class="[activeSidebar === 'student' && 'is-active']"
    class="sidebar-panel is-generic"
  >
    <div class="subpanel-header">
      <!-- <ProjectsQuickDropdown /> -->

      <h3 class="no-mb">Students</h3>
      <div class="panel-close" @click="activeSidebar = 'none'">
        <i class="iconify" data-icon="feather:x"></i>
      </div>
    </div>
    <div class="inner" data-simplebar>
      <ul>
        <!-- <li v-has-nested-router-link class="has-children">
          <div class="collapse-wrap">
            <a class="parent-link"
              >Student Info <i class="iconify" data-icon="feather:chevron-right"
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
        <li class="divider"></li>
        <li>
          <RouterLink :to="{ name: 'student' }">Student Info</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../../../../scss/abstracts/_variables.scss';
@import '../../../../../scss/layout/_sidebar-panel.scss';
</style>
