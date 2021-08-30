<script setup lang="ts">
const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  },
  folderName: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['toggle-close', 'on-add'])
</script>
<template>
  <V-Modal
    :open="openModal"
    title="Add new folder"
    size="small"
    actions="right"
    @close="emit('toggle-close')"
  >
    <template #content>
      <form class="modal-form">
        <V-Field>
          <label>Folder Name</label>
          <V-Control icon="feather:folder">
            <input
              v-model="folderName"
              type="text"
              class="input"
              placeholder="A-Z a-z 0-9 or _- characters"
              required
            />
          </V-Control>
        </V-Field>
      </form>
    </template>
    <template #action>
      <V-Button color="primary" raised @click="emit('on-add', folderName)"
        >Add</V-Button
      >
    </template>
  </V-Modal>
</template>
