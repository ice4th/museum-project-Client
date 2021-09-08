<script setup lang="ts">
// ModalSendPackage Component
import { onMounted, ref } from 'vue'
import type { PropType } from 'vue'
import useOptionApi from '/@src/composable/api/useOptionApi'

const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
})
const emit = defineEmits(['toggle-close', 'on-change'])

const student = ref(undefined)
const isLoading = ref(false)
const { getStudents } = useOptionApi()
</script>

<template>
  <V-Modal
    :open="openModal"
    :title="title"
    size="small"
    actions="right"
    @close="emit('toggle-close')"
  >
    <template #content>
      <form class="modal-form">
        <V-Control>
          <SelectOption
            v-model="student"
            :callback-search="getStudents"
            label-by="fullnameTh"
            value-prop="id"
            placeholder="Select student for send package (Search by name)"
          />
        </V-Control>
      </form>
    </template>
    <template #action>
      <V-Button
        color="primary"
        :disabled="!student"
        raised
        @click="emit('on-change', student)"
        >Submit</V-Button
      >
    </template>
  </V-Modal>
</template>
<style lang="scss" scoped>
.v-modal .modal-content .modal-card .modal-card-body .modal-form {
  height: 150px;
}
</style>
