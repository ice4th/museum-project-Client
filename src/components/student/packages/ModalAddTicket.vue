<script setup lang="ts">
// ModalAddTicket Component

import { defineEmit, ref, watch } from 'vue'
import { defineProps } from 'vue'
import type { IAddTicketStudent } from '/@src/types/interfaces/ticket.interface'
import type { PropType } from 'vue'
import ticketType from '/@src/data/ticket-type.json'
const ticketTypeOptions = ticketType

const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  },
  input: {
    type: Object as PropType<IAddTicketStudent>,
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
})

const emit = defineEmit(['toggle-close', 'on-add', 'update:customDate'])
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
        <V-Field class="is-autocomplete-select">
          <label>Ticket Type</label>
          <V-Control icon="feather:book">
            <Multiselect
              v-model="input.type"
              :searchable="true"
              :options="ticketTypeOptions"
              placeholder="Ticket Type"
              track-by="text"
              value-prop="value"
            >
              <template #singlelabel="{ value }">
                <div class="multiselect-single-label">
                  {{ value.text }}
                </div>
              </template>
              <template #option="{ option }">
                <span class="select-option-text">
                  {{ option.text }}
                </span>
              </template>
            </Multiselect>
          </V-Control>
        </V-Field>
        <V-Field>
          <label>Amount</label>
          <V-Control icon="feather:hash">
            <input
              v-model="input.amount"
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
              v-model="input.comment"
              type="textarea"
              class="textarea is-primary-focus"
              rows="2"
              placeholder="หมายเหตุ"
              required
            />
          </V-Control>
        </V-Field>
        <V-Control>
          <V-SwitchBlock
            v-model="customDate"
            label="Need to custom start date and expire date"
            color="primary"
            @update:modelValue="emit('update:customDate', $event)"
          />
        </V-Control>
        <div class="columns is-multiline">
          <div class="column is-6">
            <v-date-picker
              v-show="customDate"
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
                      :required="customDate"
                    />
                  </V-Control>
                </V-Field>
              </template>
            </v-date-picker>
          </div>
          <div class="column is-6">
            <v-date-picker
              v-show="customDate"
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
                      :required="customDate"
                    />
                  </V-Control>
                </V-Field>
              </template>
            </v-date-picker>
          </div>
        </div>
      </form>
    </template>
    <template #action>
      <V-Button color="primary" raised @click="emit('on-add')">Add</V-Button>
    </template>
  </V-Modal>
</template>
