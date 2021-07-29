<script setup lang="ts">
// Ticket Action Component
import type { PropType } from 'vue'
import { ref, defineProps } from 'vue'
import { toFormat } from '/@src/helpers/date.helper'
import type { IExpireTicketStudent } from '/@src/types/interfaces/ticket.interface'
const props = defineProps({
  isStartDate: {
    type: Boolean,
    default: true,
  },
  packageItemId: {
    type: Number,
    require: true,
  },
  ticketType: {
    type: String,
    require: true,
  },
})
const openExpireTicketModal = ref(false)
const internalTicketType = ref(props.ticketType)
const expireTicketState = ref({
  packageItemId: props.packageItemId || 0,
  comment: '',
  expireDate: toFormat(new Date(), 'YYYY-MM-DD'),
  type: internalTicketType.value,
  amount: 1,
})
const expireTicketInput = ref<IExpireTicketStudent>(expireTicketState.value)
const onExpirePackage = {}
</script>
<template>
  <V-Dropdown
    icon="feather:more-vertical"
    class="is-pushed-mobile"
    spaced
    right
  >
    <template #content>
      <a role="menuitem" href="#" class="dropdown-item is-media" isStartDate>
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-calendar"></i>
        </div>
        <div class="meta">
          <span>Start Date</span>
          <span>Change Start Date Ticket</span>
        </div>
      </a>

      <a role="menuitem" href="#" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-calendar"></i>
        </div>
        <div class="meta">
          <span>Expire Date</span>
          <span>Change Expire Date Ticket</span>
        </div>
      </a>

      <hr class="dropdown-divider" />

      <a role="menuitem" href="#" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-circle-minus"></i>
        </div>
        <div class="meta">
          <span>Delete</span>
          <span>Delete Ticket</span>
        </div>
      </a>
    </template>
  </V-Dropdown>
</template>
<style lang="scss" scoped>
a.dropdown-item,
button.dropdown-item {
  width: 90%;
}
</style>
