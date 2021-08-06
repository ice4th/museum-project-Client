<script setup lang="ts">
// ModalRemoveTicket Component

import { ref, watch } from 'vue'
import type {
  IAddTicketStudent,
  IDeleteTicketPayload,
} from '/@src/types/interfaces/ticket.interface'
import type { PropType } from 'vue'
import type { IStudentPackageItems } from '/@src/types/interfaces/package-item.interface'
import { TicketType } from '/@src/types/enums/ticket.enum'
import { displayTicketText } from '/@src/helpers/ticket.helper'

const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  },
  packageItem: {
    type: Object as PropType<IStudentPackageItems>,
    default: undefined,
  },
  ticketType: {
    type: String as PropType<TicketType>,
    default: undefined,
  },
  title: {
    type: String,
    default: '',
  },
})
const dataInput = ref<IDeleteTicketPayload>({
  packageItemId: props.packageItem?.packageId || 0,
  type: props.ticketType,
  amount: 1,
  comment: '',
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
      <h3 v-show="ticketTypeName">Ticket Type: {{ ticketTypeName }}</h3>
      <form class="modal-form">
        <V-Field>
          <label>Amount</label>
          <V-Control icon="feather:hash">
            <input
              v-model="dataInput.amount"
              type="number"
              class="input"
              placeholder="ระบุเป็นจำนวนเต็มเท่านั้น"
              min="1"
              required
            />
          </V-Control>
        </V-Field>
        <V-Field>
          <label>Comment</label>
          <V-Control>
            <input
              v-model="dataInput.comment"
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
      <V-Button color="primary" raised @click="emit('on-change', dataInput)"
        >Remove</V-Button
      >
    </template>
  </V-Modal>
</template>
