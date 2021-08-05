<script setup lang="ts">
// ModalSetStartTicket Component
import type { IStartTicketStudent } from '/@src/types/interfaces/ticket.interface'
import { onBeforeMount, ref } from 'vue'
import type { PropType } from 'vue'
import type { StudentOption } from '/@src/types/interfaces/option.interface'
import useOptionApi from '/@src/composable/api/useOptionApi'

const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  },
  input: {
    type: Object as PropType<IStartTicketStudent>,
    default: () => {},
  },
  title: {
    type: String,
    default: '',
  },
})
const { getStudents } = useOptionApi()
const studentList = ref<StudentOption[]>([])
const student = ref(undefined)
onBeforeMount(async () => {
  studentList.value = await getStudents()
})
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
            placeholder="Select a main package"
            :options="studentList"
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
        <!-- <V-Field>
          <label>Comment</label>
          <V-Control>
            <textarea
              v-model="input.comment"
              type="textarea"
              class="textarea is-primary-focus"
              rows="2"
              placeholder="หมายเหตุ"
              required
            />
          </V-Control>
        </V-Field> -->
      </form>
    </template>
    <template #action>
      <V-Button color="primary" raised @click="emit('on-change', student)"
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
