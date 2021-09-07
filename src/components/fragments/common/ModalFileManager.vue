<script setup lang="ts">
import { ref } from 'vue'
const selected = ref(undefined)
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['close', 'select'])
const submit = (ev) => {
  emit('select', selected.value)
  emit('close')
}
</script>
<template>
  <V-Modal
    :open="open"
    title="File Manager"
    size="big"
    actions="right"
    @close="emit('close')"
  >
    <template #content>
      <FileManager @select="selected = $event" />
    </template>

    <template #action>
      <V-Button color="primary" :disabled="!selected" raised @click="submit"
        >Submit</V-Button
      >
    </template>
  </V-Modal>
</template>
