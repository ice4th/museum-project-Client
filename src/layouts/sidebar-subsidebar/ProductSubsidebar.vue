<script setup lang="ts">
import { defineEmit } from 'vue'

const emit = defineEmit(['close'])
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
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/layout/_sidebar-panel.scss';
</style>
