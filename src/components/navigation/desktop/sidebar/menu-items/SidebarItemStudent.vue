<template>
  <li>
    <RouterLink
      id="student-sidebar-menu"
      :to="{ name: 'student' }"
      data-content="Student"
    >
      <i class="iconify sidebar-svg" data-icon="feather:users"></i>
    </RouterLink>
  </li>
</template>
