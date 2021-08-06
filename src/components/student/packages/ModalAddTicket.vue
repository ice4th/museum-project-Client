<script setup lang="ts">
// ModalAddTicket Component

import { ref, watch } from 'vue'
import type { IAddTicketStudent } from '/@src/types/interfaces/ticket.interface'
import type { PropType } from 'vue'
import ticketType from '/@src/data/ticket-type.json'
import type { IStudentPackageItems } from '/@src/types/interfaces/package-item.interface'
const ticketTypeOptions = ticketType

const props = defineProps({
  openModal: {
    type: Boolean,
    default: false,
  },
  packageItem: {
    type: Object as PropType<IStudentPackageItems>,
    default: undefined,
  },
  title: {
    type: String,
    default: '',
  },
})
const customDate = ref(false)
const addTicketInput = ref<IAddTicketStudent>({
  packageItemId: props.packageItem?.packageId || 0,
  type: 'package',
  amount: 1,
  comment: '',
})
const emit = defineEmits(['toggle-close', 'on-change'])
const customDateChange = (value: boolean) => {
  if (!value) {
    addTicketInput.value.startDate = undefined
    addTicketInput.value.expireDate = undefined
  }
}
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
              v-model="addTicketInput.type"
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
              v-model="addTicketInput.amount"
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
              v-model="addTicketInput.comment"
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
            @update:model-value="customDateChange"
          />
        </V-Control>
        <div class="columns is-multiline">
          <div class="column is-6">
            <v-date-picker
              v-show="customDate"
              v-model="addTicketInput.startDate"
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
                      :required="customDate"
                      v-on="inputEvents"
                    />
                  </V-Control>
                </V-Field>
              </template>
            </v-date-picker>
          </div>
          <div class="column is-6">
            <v-date-picker
              v-show="customDate"
              v-model="addTicketInput.expireDate"
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
                      :required="customDate"
                      v-on="inputEvents"
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
      <V-Button
        color="primary"
        raised
        @click="emit('on-change', addTicketInput)"
        >Add</V-Button
      >
    </template>
  </V-Modal>
</template>
