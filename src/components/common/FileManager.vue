<script setup lang="ts">
// import useClipboard from 'vue-clipboard3'

import { ref, computed, watch, onMounted } from 'vue'
import moment from 'moment'
import useFileManager from '../../composable/file-manager/use-file-manager'
import useFileAction from '../../composable/file-manager/use-file-action'

const { fileList, uploadFile, fetchFileList } = useFileManager()
const { downloadItem, copyUrlClipboard } = useFileAction()
// const { toClipboard } = useClipboard()

// const copy = async () => {
//   try {
//     await toClipboard(text.value)
//     console.log('Copied to clipboard')
//   } catch (e) {
//     console.error(e)
//   }
// }
export interface IFile {
  name: string
  src: string
  updated: string
  size: string
}

const emit = defineEmits(['select'])
const selected = ref(undefined)
const newUploaded = ref([])
const isLoaderActive = ref(false)
const openModalAddFolder = ref(false)
const navigateFolder = ref<string>(fileList?.currentDirectory || '')
const text = ref('')

const selectFile = (item: IFileList) => {
  selected.value = item
  console.log('item', item)
  emit('select', item)
}
const onUploadFile = async (event) => {
  isLoaderActive.value = true
  console.log(event.target)
  const newFile = await uploadFile(event.target.files[0])
  console.log(newFile)
  newUploaded.value = [newFile, ...newUploaded.value]
  setTimeout(() => (isLoaderActive.value = false), 3000)
}
const onCreateFolder = () => {
  isLoaderActive.value = true
  setTimeout(() => (isLoaderActive.value = false), 3000)
}

const fetchMore = () => {
  //Fetch more and append subDirectories and files with nextContinuationToken
  console.log('fetch more')
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
// onMounted(() => console.log(fileList?.currentDirectory))
</script>
<template>
  <div class="tile-grid-toolbar">
    <BreadcrumbFileManager
      :directories="navigateFolder"
      @change-navigate="onChangeNavigateFolder($event)"
    />
    <div class="buttons p-5">
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
              <span class="file-label">Choose a file</span>
            </span>
          </label>
        </div>
      </V-Control>
      <V-Control>
        <div class="file is-info">
          <label class="file-label">
            <span class="file-cta" @click="onCreateFolder">
              <span class="file-icon">
                <i class="fas fa-folder"></i>
              </span>
              <span class="file-label">Add folder</span>
            </span>
          </label>
        </div>
      </V-Control>
    </div>
  </div>
  <V-Loader size="large" :active="isLoaderActive" translucent>
    <div class="columns pr-5 pl-5">
      <MediaPreview v-if="selected?.type" :key="selected" :file="selected" />
      <div :class="`column scoll-y ${selected?.type ? 'is-8' : ''}`">
        <div class="tile-grid">
          <div class="columns is-flex-tablet-p is-half-tablet-p is-multiline">
            <MediaList
              :file-list="newUploaded"
              :selected-file="selected"
              @handle-file="selectFile($event)"
              @download-item="downloadItem($event)"
              @copy-item="copyUrlClipboard($event)"
            />
            <div
              v-for="item in fileList?.subDirectories"
              :key="item"
              :class="`column ${selected?.type ? 'is-6' : 'is-4'}`"
              @dblclick="onChangeFolder(item)"
            >
              <div
                class="tile-grid-item"
                :class="[item === selected && 'is-active']"
              >
                <MediaItem :key="`subDirectories-${item}`" :file="item" />
              </div>
            </div>
            <MediaList
              :file-list="fileList?.files"
              :selected-file="selected"
              @handle-file="selectFile($event)"
              @download-item="downloadItem($event)"
              @copy-item="copyUrlClipboard($event)"
            />
          </div>
        </div>
        <div class="flex has-text-centered m-5">
          <V-Button color="primary" icon="feather:refresh-cw" @click="fetchMore"
            >Load More</V-Button
          >
        </div>
      </div>
    </div>
  </V-Loader>
  <V-PlaceholderPage
    :class="[
      fileList?.subDirectories?.length || fileList?.files?.length
        ? 'is-hidden'
        : '',
    ]"
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
@import '../../scss/pages/lists/_tile-grid-v2.scss';

.scoll-y {
  overflow-y: scroll;
  height: 800px;
}
</style>
