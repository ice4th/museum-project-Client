<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { ref } from 'vue'

import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = 'Role Details'

useHead({
  title: 'Whitehouse Role Details',
})

const hello = ref('world')
</script>

<template>
  <div>Hello {{ hello }}!</div>
</template>
