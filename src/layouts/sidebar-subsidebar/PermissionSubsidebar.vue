<script setup lang="ts">
import { defineEmit } from 'vue'

const emit = defineEmits(['close'])
</script>

<template>
  <div class="sidebar-panel is-generic">
    <div class="subpanel-header">
      <h3 class="no-mb">Roles & Permissions</h3>
      <div class="panel-close" @click="emit('close')">
        <i aria-hidden="true" class="iconify" data-icon="feather:x"></i>
      </div>
    </div>
    <div class="inner" data-simplebar>
      <ul>
        <li v-has-nested-router-link class="has-children">
          <div class="collapse-wrap">
            <a class="parent-link">
              Roles
              <i class="iconify" data-icon="feather:chevron-right"></i>
            </a>
          </div>
          <ul>
            <li>
              <RouterLink :to="{ name: 'permissions-role' }" class="is-submenu">
                <i class="lnil lnil-books"></i>
                <span>Roles Information</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'permissions-role-create' }"
                class="is-submenu"
              >
                <i class="lnil lnil-books"></i>
                <span>Create Role</span>
              </RouterLink>
            </li>
          </ul>
        </li>
        <li v-has-nested-router-link class="has-children">
          <div class="collapse-wrap">
            <a class="parent-link">
              Team
              <i class="iconify" data-icon="feather:chevron-right"></i>
            </a>
          </div>
          <ul>
            <li>
              <RouterLink
                :to="{ name: 'permissions-teams' }"
                class="is-submenu"
              >
                <i class="lnil lnil-books"></i>
                <span>Team Information</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'permissions-teams-create' }"
                class="is-submenu"
              >
                <i class="lnil lnil-books"></i>
                <span>Create Team</span>
              </RouterLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
