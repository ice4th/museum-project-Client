<script setup lang="ts">
// ModalSetExpireTicket Component
import type { IExpireTicketStudent } from '/@src/types/interfaces/ticket.interface'
import type { PropType } from 'vue'
import { ref } from 'vue'
import { toFormat } from '/@src/helpers/date.helper'
import type { IStudentPackageItems } from '/@src/types/interfaces/package-item.interface'
import { TicketType } from '/@src/types/enums/ticket.enum'
import { displayTicketText } from '/@src/helpers/ticket.helper'

const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  packageItem: {
    type: Object as PropType<IStudentPackageItems>,
    default: undefined,
  },
  expireDate: {
    type: [Date, String],
    default: undefined,
  },
  ticketType: {
    type: String as PropType<TicketType>,
    default: undefined,
  },
})
const expirePackageInput = ref<IExpireTicketStudent>({
  packageItemId: props.packageItem?.id || 0,
  comment: '',
  expireDate: toFormat(props.expireDate, 'YYYY-MM-DD'),
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
        <v-date-picker
          v-model="expirePackageInput.expireDate"
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
              <label>Expire Date</label>
              <V-Control icon="feather:calendar">
                <input
                  class="input"
                  type="text"
                  placeholder="Expire Date"
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
              v-model="expirePackageInput.comment"
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
        @click="emit('on-change', expirePackageInput)"
        >Save Expire Date</V-Button
      >
    </template>
  </V-Modal>
</template>
<style lang="scss" scoped>
.v-modal .modal-content .modal-card .modal-card-body .modal-form {
  height: 350px;
}
</style>
