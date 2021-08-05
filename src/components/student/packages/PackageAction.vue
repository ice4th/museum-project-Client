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
  packageItemId: {
    type: Number,
    require: true,
    default: 0,
  },
  packageName: {
    type: String,
    require: true,
  },
})
const currentDate = ref(toFormat(new Date(), 'YYYY-MM-DD'))

const customDateAddTicket = ref(false)
const openAddTicketModal = ref(false)
const openExpirePackageModal = ref(false)
const addTicketInput = ref<IAddTicketStudent>({
  packageItemId: props.packageItemId || 0,
  type: 'package',
  amount: 1,
  comment: '',
})
const expirePackageInput = ref<IExpireTicketStudent>({
  packageItemId: props.packageItemId || 0,
  comment: '',
  expireDate: currentDate.value,
})

const emit = defineEmits(['fetch-package-items', 'send-package'])

const onAddTicket = async () => {
  const data = {
    packageItemId: props.packageItemId,
    amount: addTicketInput?.value?.amount,
    comment: addTicketInput?.value?.comment,
    type: addTicketInput?.value?.type,
    startDate: addTicketInput?.value?.startDate,
    expireDate: addTicketInput?.value?.expireDate,
  } as IAddTicketStudent
  const res = await addTicketStudent(data)
  emit('fetch-package-items')
  if (res) toggleAddTicket()
}

const toggleAddTicket = () => {
  openAddTicketModal.value = !openAddTicketModal.value
  if (!openAddTicketModal.value) {
    addTicketInput.value = {
      packageItemId: props.packageItemId,
      type: 'package',
      amount: 1,
      comment: '',
    }
  }
  if (customDateAddTicket.value) {
    customDateAddTicket.value = !customDateAddTicket.value
  }
}

const onExpirePackage = async () => {
  const data = {
    packageItemId: props.packageItemId,
    expireDate: expirePackageInput?.value?.expireDate,
    comment: expirePackageInput?.value?.comment,
  } as IExpireTicketStudent
  const res = await changeExpireDateTicketStudent(data)
  emit('fetch-package-items')
  if (res) toggleExpirePackage()
}

const toggleExpirePackage = () => {
  openExpirePackageModal.value = !openExpirePackageModal.value
  if (!openExpirePackageModal.value) {
    expirePackageInput.value = {
      packageItemId: props.packageItemId,
      expireDate: currentDate.value,
      comment: '',
    }
  }
}

const onActivatePackage = async () => {
  const res = await activatePackageItem(props.packageItemId)
  emit('fetch-package-items')
}
</script>
<template>
  <!-- [Modal]: Add Ticket -->
  <ModalAddTicket
    :title="`Add ticket: (Item ID: ${packageItemId}) ${packageName}`"
    :open-modal="openAddTicketModal"
    :input="addTicketInput"
    :custom-date="customDateAddTicket"
    @update:customDate="customDateAddTicket = $event"
    @toggle-close="toggleAddTicket"
    @on-add="onAddTicket"
  />
  <!-- [Modal]: Expire Package -->
  <ModalSetExpireTicket
    :title="`Expire package: (Item ID: ${packageItemId}) ${packageName}`"
    :open-modal="openExpirePackageModal"
    :input="expirePackageInput"
    @toggle-close="toggleExpirePackage"
    @on-change="onExpirePackage"
  />
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
        @click="onActivatePackage"
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
        @click="openAddTicketModal = true"
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
        @click="openExpirePackageModal = true"
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

      <a role="menuitem" href="#" class="dropdown-item is-media">
        <div class="icon">
          <i aria-hidden="true" class="lnil lnil-share"></i>
        </div>
        <div class="meta">
          <span>Change</span>
          <span>Change Package</span>
        </div>
      </a>

      <hr class="dropdown-divider" />
      <a role="menuitem" href="#" class="dropdown-item is-media">
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
