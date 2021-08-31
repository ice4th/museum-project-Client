<route lang="yaml">
meta:
  requiresAuth: true
</route>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { pageTitle } from '/@src/state/sidebarLayoutState'

const route = useRoute()

pageTitle.value = 'Welcome to Globish Academia'
useHead({
  title: 'Whitehouse Globish',
})
</script>

<template>
  <AppLayout hide-hamburger>
    <!-- Content Wrapper -->
    <div>hello</div>
    <!-- <RouterView v-slot="{ Component }">
      <transition name="fade-fast" mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </RouterView> -->
  </AppLayout>
</template>
