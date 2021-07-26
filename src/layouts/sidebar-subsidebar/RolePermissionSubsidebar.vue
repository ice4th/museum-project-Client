<script setup lang="ts">
import { defineEmit } from 'vue'

const emit = defineEmit(['close'])
</script>

<template>
  <div class="sidebar-panel is-generic">
    <div class="subpanel-header">
      <h3 class="no-mb">Role & Permission</h3>
      <div class="panel-close" @click="emit('close')">
        <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
      </div>
    </div>
    <div class="inner" data-simplebar>
      <ul>
        <li v-has-nested-router-link class="has-children">
          <div class="collapse-wrap">
            <a class="parent-link">
              Permission
              <i class="iconify" data-icon="feather:chevron-right" />
            </a>
          </div>
          <ul>
            <li>
              <RouterLink
                :to="{ name: 'role-permission-permission' }"
                class="is-submenu"
              >
                <i class="lnil lnil-books"></i>
                <span>Permission Page</span>
              </RouterLink>
            </li>
          </ul>
        </li>
        <li v-has-nested-router-link class="has-children">
          <div class="collapse-wrap">
            <a class="parent-link">
              Role
              <i class="iconify" data-icon="feather:chevron-right" />
            </a>
          </div>
          <ul>
            <li>
              <RouterLink
                :to="{ name: 'role-permission-role' }"
                class="is-submenu"
              >
                <i class="lnil lnil-books"></i>
                <span>Role Page</span>
              </RouterLink>
            </li>
          </ul>
        </li>
        <li v-has-nested-router-link class="has-children">
          <div class="collapse-wrap">
            <a class="parent-link">
              Team
              <i class="iconify" data-icon="feather:chevron-right" />
            </a>
          </div>
          <ul>
            <li>
              <RouterLink
                :to="{ name: 'role-permission-team' }"
                class="is-submenu"
              >
                <i class="lnil lnil-books"></i>
                <span>Team Page</span>
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
