<route lang="yaml">
meta:
  requiresAuth: true
</route>

<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = 'Welcome to Globish Academia'
useHead({
  title: 'Whitehouse Globish',
})
</script>

<template>
  <div>hello</div>
</template>
