<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { ref } from 'vue'

import { pageTitle } from '/@src/state/sidebarLayoutState'

pageTitle.value = 'Update Role'

useHead({
  title: 'Whitehouse Update Role',
})

const hello = ref('world')
</script>

<template>
  <div>Hello {{ hello }}!</div>
</template>
