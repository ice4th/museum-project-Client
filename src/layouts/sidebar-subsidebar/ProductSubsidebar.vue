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
          <RouterLink :to="{ name: 'products' }" class="is-submenu">
            <i class="lnil lnil-books"></i>
            <span>Product Detail</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'products-create' }" class="is-submenu">
            <i class="lnil lnil-books"></i>
            <span>Create Product</span>
          </RouterLink>
        </li>
        <li class="divider"></li>
        <li>
          <RouterLink :to="{ name: 'products-packages' }" class="is-submenu">
            <i class="lnil lnil-books"></i>
            <span>Package Detail</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="{ name: 'products-create-package' }"
            class="is-submenu"
          >
            <i class="lnil lnil-books"></i>
            <span>Create Package</span>
          </RouterLink>
        </li>
        <li class="divider"></li>
        <li>
          <RouterLink
            :to="{ name: 'products-packages-groups' }"
            class="is-submenu"
          >
            <i class="lnil lnil-books"></i>
            <span>Package Group Detail</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            :to="{ name: 'products-create-package' }"
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
@import 'src/scss/abstracts/_variables.scss';
@import 'src/scss/layout/_sidebar-panel.scss';
</style>
