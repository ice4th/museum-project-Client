<script setup lang="ts">
// ModalSetDateTicket Component

import { defineEmit, ref, watch } from 'vue'
import { defineProps } from 'vue'
import type { IExpireTicketStudent } from '/@src/types/interfaces/ticket.interface'
import type { PropType } from 'vue'
import ticketType from '/@src/data/ticket-type.json'
const ticketTypeOptions = ticketType

const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  },
  input: {
    type: Object as PropType<IExpireTicketStudent>,
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
  typeDate: {
    type: String as PropType<'startDate' | 'expireDate'>,
    require: true,
    default: 'expireDate',
  },
})
const internalTypeDate = ref<'startDate' | 'expireDate'>(props.typeDate)
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
              <label>Expire Package Date </label>
              <V-Control icon="feather:calendar">
                <input
                  class="input"
                  type="text"
                  placeholder="Expire Package Date"
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
            />
          </V-Control>
        </V-Field>
      </form>
    </template>
    <template #action>
      <V-Button color="primary" raised @click="emit('on-change')"
        >Save Expire</V-Button
      >
    </template>
  </V-Modal>
</template>
<style lang="scss" scoped>
.v-modal .modal-content .modal-card .modal-card-body .modal-form {
  height: 350px;
}
</style>
