<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import useFileManager from '/@src/composable/file-manager/use-file-manager'
import useFileAction from '/@src/composable/file-manager/use-file-action'
import type {
  IFile,
  IDirectoryNavigator,
} from '/@src/types/interfaces/file-manager.interface'

const {
  fileList,
  currentDirectory,
  uploadFileItem,
  fetchFileList,
  directories,
  addFolder,
  nextToken,
  onClearNewFile,
} = useFileManager()
const { downloadItem, copyUrlClipboard } = useFileAction()

const emit = defineEmits(['select'])
const selected = ref(undefined)
const isLoaderActive = ref(false)
const isPreview = ref(false)
const openModalAddFolder = ref(false)
const newFolderName = ref('')
const search = ref('')
const navigateFolder = ref<string>(currentDirectory || '')
const selectFile = (item: IFile) => {
  selected.value = item
  if (selected.value) {
    emit('select', item)
    isPreview.value = true
  }
}
const onUploadFile = async (event) => {
  isLoaderActive.value = true
  const newFile = await uploadFileItem(event.target.files[0])
  isLoaderActive.value = false
}
const onAddFolder = async (folderName: string) => {
  isLoaderActive.value = true
  await addFolder({ path: navigateFolder.value, folderName })
  toggleModalAddFolder()
  isLoaderActive.value = false
}
const toggleModalAddFolder = () => {
  openModalAddFolder.value = !openModalAddFolder.value
  newFolderName.value = ''
}
const fetchMore = async () => {
  isLoaderActive.value = true
  await fetchFileList({ prefix: navigateFolder.value, next: true })
  isLoaderActive.value = false
}
const onChangeNavigateFolder = async (folder: IDirectoryNavigator) => {
  isLoaderActive.value = true
  navigateFolder.value = folder.key
  await fetchFileList({ prefix: navigateFolder.value })
  isLoaderActive.value = false
  search.value = ''
  onReset()
}
const onSearch = async () => {
  isLoaderActive.value = true
  await fetchFileList({ prefix: navigateFolder.value, search: search.value })
  isLoaderActive.value = false
  onReset()
}

const onReset = () => {
  isPreview.value = false
  selectFile(undefined)
  onClearNewFile()
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
      <br />
    </div>
  </div>
  <div class="is-flex is-justify-content-flex-end mb-5 mr-5">
    <V-Control icon="feather:search">
      <input
        v-model="search"
        type="text"
        class="input is-rounded"
        placeholder="Search folders in this folder (Sensitive case)"
        @keyup.enter="onSearch"
      />
    </V-Control>
  </div>

  <V-Loader size="large" :active="isLoaderActive" translucent>
    <V-PlaceholderPage
      :class="[fileList.length ? 'is-hidden' : '']"
      title="No media to show"
      subtitle="There is currently no media to show in this folder."
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
              @change-folder="onChangeNavigateFolder($event)"
            />
          </div>
        </div>
        <div class="flex has-text-centered m-5">
          <V-Button
            v-show="nextToken"
            outlined
            color="primary"
            icon="feather:refresh-cw"
            :loading="isLoaderActive"
            @click="fetchMore"
            >Load More</V-Button
          >
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
</template>

<style lang="scss" scoped>
@import '../../scss/abstracts/_variables.scss';
@import '../../scss/abstracts/_mixins.scss';
.scoll-y {
  overflow-y: scroll;
  height: 800px;
}
.tile-grid-toolbar {
  border-radius: 16px;
  margin: 1rem 1.5rem;
}
.input {
  width: 25rem;
}
.is-dark {
  .tile-grid-toolbar {
    @include vuero-card--dark();
  }
}
</style>
