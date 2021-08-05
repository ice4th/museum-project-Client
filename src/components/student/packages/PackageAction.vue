<script setup lang="ts">
// PackageAction Component

import { ref, watch } from 'vue'
import ticketType from '/@src/data/ticket-type.json'
import type {
  IAddTicketStudent,
  IExpireTicketStudent,
} from '/@src/types/interfaces/ticket.interface'
import useStudentPackageItemState from '/@src/composable/student/use-student-package'
import { toFormat } from '/@src/helpers/date.helper'
const { addTicketStudent, changeExpireDateTicketStudent, activatePackageItem } =
  useStudentPackageItemState()

const ticketTypeOptions = ticketType

const props = defineProps({
  canActivate: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'activate-package',
  'add-ticket',
  'change-expire',
  'send-package',
  'change-package',
  'remove-package',
])
</script>
<template>
  <!-- [Dropdown]: Manage Package -->
  <V-Dropdown
    title="Manage Package"
    class="is-pushed-mobile"
    color="primary"
    spaced
    right
  >
    <template #content>
      <a
        v-show="canActivate"
        role="menuitem"
        class="dropdown-item is-media"
        @click="emit('active-package')"
      >
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-rocket"></i>
        </div>
        <div class="meta">
          <span>Activate</span>
          <span>Activate Package</span>
        </div>
      </a>

      <a
        role="menuitem"
        class="dropdown-item is-media"
        @click="emit('add-ticket')"
      >
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-circle-plus"></i>
        </div>
        <div class="meta">
          <span>Add</span>
          <span>Add Ticket</span>
        </div>
      </a>

      <a
        role="menuitem"
        class="dropdown-item is-media"
        @click="emit('change-expire')"
      >
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-calendar"></i>
        </div>
        <div class="meta">
          <span>Expire</span>
          <span>Change Expire Package</span>
        </div>
      </a>

      <a
        role="menuitem"
        href="#"
        class="dropdown-item is-media"
        @click="emit('send-package')"
      >
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-reply"></i>
        </div>
        <div class="meta">
          <span>Send</span>
          <span>Send Package to another student</span>
        </div>
      </a>

      <a
        role="menuitem"
        href="#"
        class="dropdown-item is-media"
        @click="emit('change-package')"
      >
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-share"></i>
        </div>
        <div class="meta">
          <span>Change</span>
          <span>Change Package</span>
        </div>
      </a>

      <hr class="dropdown-divider" />
      <a
        role="menuitem"
        href="#"
        class="dropdown-item is-media"
        @click="emit('remove-package')"
      >
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-trash-can-alt"></i>
        </div>
        <div class="meta">
          <span>Remove</span>
          <span>Remove Package</span>
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
.v-modal .modal-content .modal-card .modal-card-body .modal-form {
  height: 350px;
}
</style>
