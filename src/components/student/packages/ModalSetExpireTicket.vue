<script setup lang="ts">
// ModalSetExpireTicket Component

import { defineProps, defineEmit } from 'vue'
import type { IExpireTicketStudent } from '/@src/types/interfaces/ticket.interface'
import type { PropType } from 'vue'

const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  },
  input: {
    type: Object as PropType<IExpireTicketStudent>,
    default: () => {},
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

const emit = defineEmit(['toggle-close', 'on-change'])
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
        <v-date-picker
          v-model="input.expireDate"
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
