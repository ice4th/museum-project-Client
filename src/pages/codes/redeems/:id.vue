<script setup lang="ts">
import { ref } from 'vue'

const hello = ref('world')
</script>

<template>
  <div class="page-content-inner">
    <div>Hello {{ hello }}!</div>
  </div>
</template>
