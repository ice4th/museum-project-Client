<script setup lang="ts">
import { isMobileSidebarOpen } from '/@src/state/mobileSidebarState'
import { activeSidebar } from '/@src/state/activeSidebarState'
</script>

<template>
  <div :class="[isMobileSidebarOpen && 'is-active']" class="mobile-subsidebar">
    <div class="inner">
      <div class="sidebar-title">
        <h3>Product</h3>
      </div>

      <ul class="submenu" data-simplebar>
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
              <RouterLink :to="{ name: 'product-package' }" class="is-submenu">
                <i class="lnil lnil-books"></i>
                <span>Package Detail</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'product-create-package' }"
                class="is-submenu"
              >
                <i class="lnil lnil-books"></i>
                <span>Create Package</span>
              </RouterLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../../../../scss/abstracts/_variables.scss';
@import '../../../../../scss/layout/_sidebar-mobile.scss';
</style>
