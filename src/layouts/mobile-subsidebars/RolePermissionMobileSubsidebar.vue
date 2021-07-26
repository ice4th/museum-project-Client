<template>
  <div class="mobile-subsidebar is-activity">
    <div class="inner">
      <div class="sidebar-title">
        <h3>Role & Permission</h3>
      </div>

      <ul class="submenu">
        <li v-has-nested-router-link class="has-children">
          <div class="collapse-wrap">
            <a class="parent-link">
              Permission
              <i class="iconify" data-icon="feather:chevron-right"></i>
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
              <i class="iconify" data-icon="feather:chevron-right"></i>
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
              <i class="iconify" data-icon="feather:chevron-right"></i>
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
@import '../../scss/layout/_sidebar-mobile.scss';
</style>
