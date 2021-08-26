<route lang="yaml">
meta:
  requiresAuth: true
</route>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { pageTitle } from '/@src/state/sidebarLayoutState'
import { ref, watch } from 'vue'
import type { IFile } from '../../common/FileManager.vue'

const route = useRoute()

pageTitle.value = 'Whitehouse Media'
useHead({
  title: 'Whitehouse Media',
})
const showFilePopup = ref(false)
const selected = ref(undefined)

const selectImage = (ev: IFile) => {
  productInfo.value.image = ev.src
}
</script>

<template>
  <AppLayout :theme="sidebarTheme" close-on-change default-sidebar="media">
    <!-- <ModalFileManager
      :open="showFilePopup"
      @select="selectImage"
      @close="showFilePopup = false"
    />
    <V-Button
      color="primary"
      icon="feather:upload"
      @click="showFilePopup = true"
      >Select File</V-Button
    >
    <br />
    <br /> -->
    <FileManager @select="selected = $event" />
  </AppLayout>
</template>
