<template>
  <li>
    <RouterLink
      id="product-sidebar-menu"
      :to="{ name: 'product' }"
      data-content="Product & Package"
    >
      <i class="iconify sidebar-svg" data-icon="feather:book"></i>
    </RouterLink>
  </li>
</template>
