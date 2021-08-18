<script setup lang="ts">
const emit = defineEmits(['close'])
</script>

<template>
  <div class="sidebar-panel is-generic">
    <div class="subpanel-header">
      <h3 class="no-mb">Products & Packages</h3>
      <div class="panel-close" @click="emit('close')">
        <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
      </div>
    </div>
    <div class="inner" data-simplebar>
      <ul>
        <li>
          <RouterLink :to="{ name: 'product' }" class="is-submenu">
            <i class="lnil lnil-books"></i>
            <span>Product Detail</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'product' }" class="is-submenu">
            <i class="lnil lnil-books"></i>
            <span>Create Product</span>
          </RouterLink>
        </li>
        <li class="divider"></li>
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
        <li class="divider"></li>
        <li>
          <RouterLink
            :to="{ name: 'product-package-group' }"
            class="is-submenu"
          >
            <i class="lnil lnil-books"></i>
            <span>Package Group Detail</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="{ name: 'product-create-package' }"
            class="is-submenu"
          >
            <i class="lnil lnil-books"></i>
            <span>Create Package Group</span>
          </RouterLink>
        </li>
        <li class="divider"></li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/layout/_sidebar-panel.scss';
</style>
