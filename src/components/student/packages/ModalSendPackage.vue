<script setup lang="ts">
// ModalSendPackage Component
import { onMounted, ref } from 'vue'
import type { PropType } from 'vue'
import type { StudentOption } from '/@src/types/interfaces/option.interface'
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
const isLoading = ref(true)
const student = ref(undefined)
const { getStudents, studentOptions } = useOptionApi()
const emit = defineEmits(['toggle-close', 'on-change'])
const searchStudent = async (value: string) => {
  isLoading.value = true
  await getStudents(value)
  isLoading.value = false
}
onMounted(async () => {
  isLoading.value = true
  await getStudents()
  isLoading.value = false
})
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
            @search-change="searchStudent"
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
  height: 150px;
}
</style>
