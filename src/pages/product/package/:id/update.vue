<script setup lang="ts">
import { ref } from 'vue'

import useUpdatePackage from '/@src/composable/package/use-update-package'

const hello = ref('world')
const { package: pkg } = useUpdatePackage()
</script>

<template>
  <div>Hello {{ hello }}!</div>
</template>
