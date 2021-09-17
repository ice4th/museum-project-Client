<script setup lang="ts">
import { useHead } from '@vueuse/head'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { ref } from 'vue'
import type { IFile } from '/@src/types/interfaces/file-manager.interface'

pageTitle.value = 'Whitehouse Media'
useHead({
  title: 'Whitehouse Media',
})

const selected = ref(undefined)

const selectImage = (ev: IFile) => {
  productInfo.value.image = ev.src
}
</script>

<template>
  <FileManager :key="$route.fullpath" @select="selected = $event" />
</template>
