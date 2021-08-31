<template>
  <div class="mobile-subsidebar is-activity">
    <div class="inner">
      <div class="sidebar-title">
        <h3>Roles & Permissions</h3>
      </div>

      <ul class="submenu">
        <li v-has-nested-router-link class="has-children">
          <div class="collapse-wrap">
            <a class="parent-link">
              Roles
              <i class="iconify" data-icon="feather:chevron-right"></i>
            </a>
          </div>
          <ul>
            <li>
              <RouterLink :to="{ name: 'permission-role' }" class="is-submenu">
                <i class="lnil lnil-books"></i>
                <span>Roles Information</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'permission-role-create' }"
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
              <RouterLink :to="{ name: 'permission-team' }" class="is-submenu">
                <i class="lnil lnil-books"></i>
                <span>Team Information</span>
              </RouterLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
