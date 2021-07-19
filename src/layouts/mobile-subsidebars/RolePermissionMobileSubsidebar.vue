<template>
  <div class="mobile-subsidebar">
    <div class="inner">
      <div class="sidebar-title">
        <h3>Role & Permission</h3>
      </div>

      <ul class="submenu" data-simplebar>
        <li>
          <RouterLink :to="{ name: 'role-permission' }"
            >Role & Permission</RouterLink
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/layout/_sidebar-mobile.scss';
</style>
