<script setup lang="ts">
// DropdownAction Component
</script>

<template>
  <V-Dropdown spaced right>
    <template #button="{ toggle }">
      <V-Button icon="feather:more-vertical" class="is-trigger" @click="toggle">
        Actions
      </V-Button>
    </template>
    <template #content>
      <slot name="content" />
    </template>
  </V-Dropdown>
</template>
