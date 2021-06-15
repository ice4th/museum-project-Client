<script setup lang="ts">
import { activeSidebar } from '/@src/state/activeSidebarState'
</script>

<template>
  <div
    id="product-sidebar"
    :class="[activeSidebar === 'product' && 'is-active']"
    class="sidebar-panel is-generic"
  >
    <div class="subpanel-header">
      <!-- <ProjectsQuickDropdown /> -->

      <h3 class="no-mb">Product & Package</h3>
      <div class="panel-close" @click="activeSidebar = 'none'">
        <i class="iconify" data-icon="feather:x"></i>
      </div>
    </div>
    <div class="inner" data-simplebar>
      <ul>
        <li v-has-nested-router-link class="has-children">
          <div class="collapse-wrap">
            <a class="parent-link"
              >Product <i class="iconify" data-icon="feather:chevron-right"
            /></a>
          </div>
          <ul>
            <li>
              <RouterLink :to="{ name: 'product' }" class="is-submenu">
                <i class="lnil lnil-books"></i>
                <span>Product Detail</span>
              </RouterLink>
            </li>
          </ul>
        </li>
        <li v-has-nested-router-link class="has-children">
          <div class="collapse-wrap">
            <a class="parent-link"
              >Package <i class="iconify" data-icon="feather:chevron-right"
            /></a>
          </div>
          <ul>
            <li>
              <RouterLink :to="{ name: 'product' }" class="is-submenu">
                <i class="lnil lnil-books"></i>
                <span>Package Detail</span>
              </RouterLink>
            </li>
          </ul>
        </li>
        <!-- <li class="divider"></li> -->
        <!-- <li>
          <RouterLink :to="{ name: 'student' }">Student Info</RouterLink>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../../../../scss/abstracts/_variables.scss';
@import '../../../../../scss/layout/_sidebar-panel.scss';
</style>
