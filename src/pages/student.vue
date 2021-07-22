<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { sidebarTheme } from '/@src/state/sidebarLayoutState'

const route = useRoute()
</script>

<template>
  <AppLayout :theme="sidebarTheme" close-on-change default-sidebar="student">
    <RouterView v-slot="{ Component }">
      <transition name="fade-fast" mode="out-in">
        <component :is="Component" :key="route.fullPath" />
      </transition>
    </RouterView>
  </AppLayout>
</template>
