<script setup lang="ts">
// Ticket Action Component
import { ref, watch, computed } from 'vue'
import type { PropType } from 'vue'
import useStudentPackageItemState from '/@src/composable/student/use-student-package'
import { toFormat } from '/@src/helpers/date.helper'
const { changeExpireDateTicketStudent, changeStartDateTicketStudent } =
  useStudentPackageItemState()
import type {
  IExpireTicketStudent,
  IStartTicketStudent,
} from '/@src/types/interfaces/ticket.interface'

const props = defineProps({
  isStartDate: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits([
  'change-start-ticket',
  'change-expire-ticket',
  'remove-ticket',
])
</script>
<template>
  <!-- [Dropdown]: Manage Ticket -->
  <V-Dropdown
    icon="feather:more-vertical"
    class="is-pushed-mobile"
    spaced
    right
  >
    <template #content>
      <a
        v-show="isStartDate"
        role="menuitem"
        class="dropdown-item is-media"
        @click="emit('change-start-ticket')"
      >
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-calendar"></i>
        </div>
        <div class="meta">
          <span>Start</span>
          <span>Change start date ticket</span>
        </div>
      </a>

      <a
        role="menuitem"
        class="dropdown-item is-media"
        @click="emit('change-expire-ticket')"
      >
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-calendar"></i>
        </div>
        <div class="meta">
          <span>Expire</span>
          <span>Change expire date ticket</span>
        </div>
      </a>

      <hr class="dropdown-divider" />

      <a
        role="menuitem"
        href="#"
        class="dropdown-item is-media"
        @click="emit('remove-ticket')"
      >
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-circle-minus"></i>
        </div>
        <div class="meta">
          <span>Delete</span>
          <span>Delete ticket</span>
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
