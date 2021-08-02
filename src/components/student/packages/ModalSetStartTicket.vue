<script setup lang="ts">
// ModalSetStartTicket Component

import { defineEmit, defineProps } from 'vue'
import type { IStartTicketStudent } from '/@src/types/interfaces/ticket.interface'
import type { PropType } from 'vue'

const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  },
  input: {
    type: Object as PropType<IStartTicketStudent>,
    default: {},
  },
  customDate: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: '',
  },
  ticketType: {
    type: String,
    default: undefined,
  },
})

const emit = defineEmit(['toggle-close', 'on-change', 'update:customDate'])
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
            label="Need to reset start date is NULL"
            color="primary"
            @update:modelValue="emit('update:customDate', $event)"
          />
        </V-Control>
        <v-date-picker
          v-show="!customDate"
          v-model="input.startDate"
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
                  v-on="inputEvents"
                  required
                />
              </V-Control>
            </V-Field>
          </template>
        </v-date-picker>
        <V-Field>
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
        </V-Field>
      </form>
    </template>
    <template #action>
      <V-Button color="primary" raised @click="emit('on-change')"
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
