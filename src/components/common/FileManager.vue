<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import useFileManager from '/@src/composable/file-manager/use-file-manager'
import useFileAction from '/@src/composable/file-manager/use-file-action'
import type { IFile } from '/@src/types/interfaces/file-manager.interface'

const {
  fileList,
  currentDirectory,
  uploadFile,
  fetchFileList,
  directories,
  addFolder,
} = useFileManager()
const { downloadItem, copyUrlClipboard } = useFileAction()

const emit = defineEmits(['select'])
const selected = ref(undefined)
const isLoaderActive = ref(false)
const isPreview = ref(false)
const openModalAddFolder = ref(false)
const newFolderName = ref('')
const navigateFolder = ref<string>(currentDirectory || '')

const selectFile = (item: IFile) => {
  selected.value = item
  if (item?.type) {
    console.log('select item', item)
    emit('select', item)
    isPreview.value = true
  }
}
const onUploadFile = async (event) => {
  isLoaderActive.value = true
  console.log(event.target)
  const newFile = await uploadFile(event.target.files[0])
  console.log(newFile)
  setTimeout(() => (isLoaderActive.value = false), 3000)
}
const onAddFolder = async (folderName) => {
  isLoaderActive.value = true
  await addFolder(folderName)
  toggleModalAddFolder()
  isLoaderActive.value = false
}
const toggleModalAddFolder = () => {
  openModalAddFolder.value = !openModalAddFolder.value
  newFolderName.value = ''
}
const fetchMore = () => {
  isLoaderActive.value = true
  //Fetch more and append subDirectories and files with nextContinuationToken
  console.log('fetch more')
  setTimeout(() => (isLoaderActive.value = false), 3000)
}

const onChangeNavigateFolder = async (selected) => {
  isLoaderActive.value = true
  console.log('onNavigateFolder:', selected)
  navigateFolder.value = selected?.key || ''
  selectFile(undefined)
  await fetchFileList()
  isLoaderActive.value = false
}

const onChangeFolder = async (folder) => {
  isLoaderActive.value = true
  console.log('current navigateFolder:', navigateFolder.value)
  navigateFolder.value = `${navigateFolder.value}${folder}`
  console.log('new navigateFolder:', navigateFolder.value)
  await fetchFileList({
    baseUrl: 'https://d1627oxh4wmxfp.cloudfront.net',
    currentDirectory: navigateFolder.value,
    files: [],
    subDirectories: ['temps/'],
    total: 1,
  })
  selectFile(undefined)
  isLoaderActive.value = false
}
</script>
<template>
  <div class="tile-grid-toolbar">
    <BreadcrumbFileManager
      :breadcrumb="directories"
      @change-navigate="onChangeNavigateFolder($event)"
    />
    <div class="buttons">
      <V-Button icon="fas fa-folder" @click="openModalAddFolder = true"
        >Add Folder</V-Button
      >
      <V-Control>
        <div class="file is-primary">
          <label class="file-label">
            <input
              class="file-input"
              type="file"
              @change="onUploadFile($event)"
            />
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-cloud-upload-alt"></i>
              </span>
              <span class="file-label">Upload File</span>
            </span>
          </label>
        </div>
      </V-Control>
    </div>
  </div>
  <V-Loader size="large" :active="isLoaderActive" translucent>
    <div class="columns pr-5 pl-5">
      <MediaPreview
        v-if="isPreview"
        :key="selected"
        :file="selected"
        @on-close="isPreview = false"
      />
      <div class="column scoll-y">
        <div class="tile-grid">
          <div class="columns is-flex-tablet-p is-half-tablet-p is-multiline">
            <MediaList
              :file-list="fileList"
              :selected-file="selected"
              @handle-file="selectFile($event)"
              @download-item="downloadItem($event)"
              @copy-item="copyUrlClipboard($event)"
              @change-folder="onChangeFolder($event)"
            />
          </div>
        </div>
        <div class="flex has-text-centered m-5">
          <V-Button
            outlined
            color="primary"
            icon="feather:refresh-cw"
            :loading="isLoaderActive"
            @click="fetchMore"
            >Load More</V-Button
          >
          <!-- <V-IconButton
            color="primary"
            outlined
            :loading="isLoaderActive"
            is-dark${isPreview ? 'is-8' : ''}
            circle
            icon="feather:refresh-cw"
            @click="fetchMore"
          /> -->
        </div>
      </div>
    </div>
  </V-Loader>
  <ModalAddFolder
    :open-modal="openModalAddFolder"
    :folder-name="newFolderName"
    @on-add="onAddFolder($event)"
    @toggle-close="toggleModalAddFolder"
  />
  <V-PlaceholderPage
    :class="[fileList.length ? 'is-hidden' : '']"
    title="No data to show"
    subtitle="There is currently no data to show in this list."
    larger
  >
    <template #image>
      <img
        class="light-image"
        src="/@src/assets/illustrations/placeholders/search-4.svg"
        alt=""
      />
      <img
        class="dark-image"
        src="/@src/assets/illustrations/placeholders/search-4-dark.svg"
        alt=""
      />
    </template>
  </V-PlaceholderPage>
</template>

<style lang="scss" scoped>
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/abstracts/_mixins.scss';
.scoll-y {
  overflow-y: scroll;
  height: 800px;
}
.tile-grid-toolbar {
  // background: white;
  border-radius: 16px;
  margin: 1rem 1.5rem;
}
.is-dark {
  .tile-grid-toolbar {
    @include vuero-card--dark();
  }
}
</style>
