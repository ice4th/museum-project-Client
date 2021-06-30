<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { sidebarTheme } from '/@src/state/sidebarLayoutState'

const route = useRoute()
</script>

<template>
  <SidebarLayout :theme="sidebarTheme" close-on-change default-sidebar="none">
    <!-- Content Wrapper -->
    <div class="page-content-inner">
      <div class="">
        <h1 class="title">Whitehouse Globish Academia</h1>
      </div>
    </div>
  </SidebarLayout>
</template>
