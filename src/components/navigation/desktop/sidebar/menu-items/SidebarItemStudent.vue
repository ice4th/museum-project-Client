<template>
  <li>
    <RouterLink
      id="home-sidebar-menu"
      :to="{ name: 'student' }"
      data-content="Student"
    >
      <i class="iconify sidebar-svg" data-icon="feather:user"></i>
    </RouterLink>
  </li>
</template>
