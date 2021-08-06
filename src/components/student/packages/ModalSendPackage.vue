<script setup lang="ts">
// ModalSendPackage Component
import { ref } from 'vue'
import type { PropType } from 'vue'
import type { StudentOption } from '/@src/types/interfaces/option.interface'

const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  studentOptions: {
    type: Array as PropType<StudentOption[]>,
    default: () => [],
  },
})
const student = ref(undefined)
const emit = defineEmits(['toggle-close', 'on-change'])
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
          <Multiselect
            v-model="student"
            placeholder="Select student for send package"
            :options="studentOptions"
            :searchable="true"
            track-by="id"
            value-prop="id"
          >
            <template #singlelabel="{ value }">
              <div class="multiselect-single-label">
                ({{ value.id }}) {{ value.fullnameTh }}
              </div>
            </template>
            <template #option="{ option }">
              <span class="select-option-text">
                ({{ option.id }}) {{ option.fullnameTh }}
              </span>
            </template>
          </Multiselect>
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
  height: 350px;
}
</style>
