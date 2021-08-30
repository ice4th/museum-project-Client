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
  clearNewFile,
} = useFileManager()
const { downloadItem, copyUrlClipboard } = useFileAction()

const emit = defineEmits(['select'])
const selected = ref(undefined)
const isLoaderActive = ref<boolean>(false)
const isPreview = ref<boolean>(false)
const openModalAddFolder = ref<boolean>(false)
const newFolderName = ref<string>('')
const search = ref<string>('')
const navigateFolder = ref<string>(currentDirectory || '')
const selectFile = (item: IFile) => {
  selected.value = item
  if (selected.value && selected.value?.type !== 'folder') {
    emit('select', item)
    isPreview.value = true
  }
}
const onUploadFile = async (event: File) => {
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
  await fetchFileList({ prefix: folder.key })
  isLoaderActive.value = false
  search.value = '' //Clear search when navigate new folder
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
  clearNewFile()
}
</script>
<template>
  <div class="tile-grid-toolbar">
    <!-- Breadcrumb for navigate folder -->
    <BreadcrumbFileManager
      :breadcrumb="directories"
      @change-navigate="onChangeNavigateFolder($event)"
    />
    <!-- Add folder or upload file  -->
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
  <!-- Search folder -->
  <div class="is-flex is-justify-content-flex-end mb-5 mr-5">
    <V-Control icon="feather:search">
      <input
        v-model="search"
        type="text"
        class="input is-rounded"
        placeholder="Search any folders in this folder(Sensitive case)"
        @keyup.enter="onSearch"
      />
    </V-Control>
  </div>

  <V-Loader size="large" :active="isLoaderActive" grey translucent>
    <!-- The component will show when no media-->
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
      <!-- Show Preview Media-->
      <MediaPreview
        v-if="isPreview"
        :key="selected"
        :file="selected"
        @on-close="isPreview = false"
      />
      <!-- Show media list -->
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
        <!-- Show Load more button -->
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
