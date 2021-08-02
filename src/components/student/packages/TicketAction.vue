<script setup lang="ts">
// Ticket Action Component
import { ref, defineProps, defineEmit, watch, computed } from 'vue'
import type { PropType } from 'vue'
import useStudentPackageItemState from '/@src/composable/student/use-student-package'
import { toFormat } from '/@src/helpers/date.helper'
const { changeExpireDateTicketStudent, changeStartDateTicketStudent } =
  useStudentPackageItemState()
import { TicketType } from '/@src/types/enums/ticket.enum'
import type {
  IExpireTicketStudent,
  IStartTicketStudent,
} from '/@src/types/interfaces/ticket.interface'
import ticketType from '/@src/data/ticket-type.json'
const ticketTypeOptions = ticketType

const props = defineProps({
  isStartDate: {
    type: Boolean,
    default: true,
  },
  packageItemId: {
    type: Number,
    require: true,
  },
  packageName: {
    type: String,
    require: true,
  },
  ticketType: {
    type: String as PropType<TicketType>,
    require: true,
    default: TicketType.PACKAGE,
  },
  defaultExpire: {
    type: String,
  },
  defaultStart: {
    type: String,
  },
})
const openExpireTicketModal = ref(false)
const openStartTicketModal = ref(false)
const customStartDate = ref(false)
const defaultStart = computed(() =>
  // toFormat(props.defaultStart || new Date(), 'YYYY-MM-DD')
  toFormat(new Date(), 'YYYY-MM-DD')
)
const defaultExpire = computed(() =>
  // toFormat(props.defaultExpire || new Date(), 'YYYY-MM-DD')
  toFormat(new Date(), 'YYYY-MM-DD')
)
const ticketTypeName = ref(
  ticketTypeOptions.find((type) => type.value == props.ticketType)?.text
)

const emit = defineEmit(['fetch-package-items'])

const expireTicketInput = ref<IExpireTicketStudent>({
  packageItemId: props.packageItemId || 0,
  comment: '',
  expireDate: defaultExpire.value,
  type: props.ticketType,
})
const startTicketInput = ref<IStartTicketStudent>({
  packageItemId: props.packageItemId || 0,
  comment: '',
  startDate: defaultStart.value,
  type: props.ticketType,
})

const onStartTicket = async () => {
  const data = {
    packageItemId: props.packageItemId,
    startDate: customStartDate.value
      ? null
      : startTicketInput?.value?.startDate,
    comment: startTicketInput?.value?.comment,
    type: startTicketInput?.value?.type,
  } as IStartTicketStudent
  const res = await changeStartDateTicketStudent(data)
  emit('fetch-package-items')
  if (res) toggleStartTicket()
}

const toggleStartTicket = () => {
  openStartTicketModal.value = !openStartTicketModal.value
  if (!openStartTicketModal.value) {
    startTicketInput.value = {
      packageItemId: props.packageItemId || 0,
      startDate: defaultStart.value,
      comment: '',
      type: props.ticketType,
    }
  }
  if (customStartDate.value) {
    customStartDate.value = !customStartDate.value
  }
}

const onExpireTicket = async () => {
  const data = {
    packageItemId: props.packageItemId,
    expireDate: expireTicketInput?.value?.expireDate,
    comment: expireTicketInput?.value?.comment,
    type: expireTicketInput?.value?.type,
  } as IExpireTicketStudent
  const res = await changeExpireDateTicketStudent(data)
  emit('fetch-package-items')
  if (res) toggleExpireTicket()
}

const toggleExpireTicket = () => {
  openExpireTicketModal.value = !openExpireTicketModal.value
  if (!openExpireTicketModal.value) {
    expireTicketInput.value = {
      packageItemId: props.packageItemId || 0,
      expireDate: defaultExpire.value,
      comment: '',
      type: props.ticketType,
    }
  }
}
</script>
<template>
  <!-- [Modal]: Expire Package -->
  <ModalSetExpireTicket
    :title="`Expire ticket : (Item ID: ${packageItemId}) ${packageName} `"
    :open-modal="openExpireTicketModal"
    :input="expireTicketInput"
    :ticket-type="ticketTypeName"
    @toggle-close="toggleExpireTicket"
    @on-change="onExpireTicket"
  />
  <!-- [Modal]: Start Package -->
  <ModalSetStartTicket
    :title="`Start ticket : (Item ID: ${packageItemId}) ${packageName} `"
    :open-modal="openStartTicketModal"
    :input="startTicketInput"
    :ticket-type="ticketTypeName"
    :custom-date="customStartDate"
    @update:customDate="customStartDate = $event"
    @toggle-close="toggleStartTicket"
    @on-change="onStartTicket"
  />
  <!-- [Dropdown]: Manage Ticket -->
  <V-Dropdown
    icon="feather:more-vertical"
    class="is-pushed-mobile"
    spaced
    right
  >
    <template #content>
      <a
        role="menuitem"
        class="dropdown-item is-media"
        v-show="isStartDate"
        @click="openStartTicketModal = true"
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
        @click="openExpireTicketModal = true"
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

      <a role="menuitem" href="#" class="dropdown-item is-media">
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
