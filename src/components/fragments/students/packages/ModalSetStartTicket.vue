<script setup lang="ts">
// ModalSetStartTicket Component
import type { IStartTicketStudent } from '/@src/types/interfaces/ticket.interface'
import { ref } from 'vue'
import type { PropType } from 'vue'
import type { IStudentPackageItems } from '/@src/types/interfaces/package-item.interface'
import { toFormat } from '/@src/helpers/date.helper'
import { TicketType } from '/@src/types/enums/ticket.enum'
import { displayTicketText } from '/@src/helpers/ticket.helper'

const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  },
  startDate: {
    type: [Date, String],
    default: undefined,
  },
  packageItem: {
    type: Object as PropType<IStudentPackageItems>,
    default: undefined,
  },
  title: {
    type: String,
    default: '',
  },
  ticketType: {
    type: String as PropType<TicketType>,
    default: undefined,
  },
})

const customDate = ref(false)
const startTicketInput = ref<IStartTicketStudent>({
  packageItemId: props.packageItem?.id || 0,
  comment: '',
  startDate: props.startDate,
  type: props.ticketType,
})

const ticketTypeName = ref(displayTicketText(props.ticketType))
const emit = defineEmits(['toggle-close', 'on-change'])
</script>

<template>
  <V-Modal
    :open="openModal"
    :title="title"
    size="medium"
    actions="right"
    @close="emit('toggle-close')"
  >
    <template #content>
      <h3 v-show="ticketType">Ticket Type: {{ ticketType }}</h3>
      <form class="modal-form">
        <V-Control>
          <V-SwitchBlock
            v-model="customDate"
            label="Need to reset start date like inactive ticket (NULL)"
            color="primary"
            @update:model-value="startTicketInput.startDate = null"
          />
        </V-Control>
        <v-date-picker
          v-show="!customDate"
          v-model="startTicketInput.startDate"
          color="orange"
          :model-config="{
            type: 'string',
            mask: 'YYYY-MM-DD',
          }"
          :masks="{
            input: 'DD/MM/YYYY',
          }"
          trim-weeks
          :popover="{ visibility: 'click' }"
        >
          <template #default="{ inputValue, inputEvents }">
            <V-Field>
              <label>Start Date</label>
              <V-Control icon="feather:calendar">
                <input
                  class="input"
                  type="text"
                  placeholder="Start Date"
                  :value="inputValue"
                  required
                  v-on="inputEvents"
                />
              </V-Control>
            </V-Field>
          </template>
        </v-date-picker>
        <V-Field>
          <label>Comment</label>
          <V-Control>
            <textarea
              v-model="startTicketInput.comment"
              type="textarea"
              class="textarea is-primary-focus"
              rows="2"
              placeholder="หมายเหตุ"
              required
            />
          </V-Control>
        </V-Field>
      </form>
    </template>
    <template #action>
      <V-Button
        color="primary"
        raised
        @click="emit('on-change', startTicketInput)"
        >Save Start Date</V-Button
      >
    </template>
  </V-Modal>
</template>
<style lang="scss" scoped>
.v-modal .modal-content .modal-card .modal-card-body .modal-form {
  height: 350px;
}
</style>
