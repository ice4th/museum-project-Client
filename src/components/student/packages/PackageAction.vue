<script setup lang="ts">
// PackageAction Component

import { onMounted, ref, watch } from 'vue'
import { defineProps } from 'vue'
import ticketType from '/@src/data/ticket-type.json'
import type { PropType } from 'vue'
import type {
  IAddTicketStudent,
  IExpireTicketStudent,
} from '/@src/types/interfaces/ticket.interface'
import useStudentPackageItemState from '/@src/composable/student/use-student-package'
import moment from 'moment'
const { addTicketStudent, expireTicketStudent, todayIso } =
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
  },
})
const addTicketState = ref({
  packageItemId: props.packageItemId || 0,
  type: 'package',
  amount: 1,
  comment: '',
})
const expirePackageState = ref({
  packageItemId: props.packageItemId || 0,
  comment: '',
  expireDate: todayIso.value,
})
const openAddTicketModal = ref(false)
const openExpirePackageModal = ref(false)
const addTicketInput = ref<IAddTicketStudent>(addTicketState.value)
const expirePackageInput = ref<IExpireTicketStudent>(expirePackageState.value)
const internalackageItemId = ref<number>(props.packageItemId || 0)
const onAddTicket = async () => {
  const data = {
    packageItemId: internalackageItemId.value,
    amount: addTicketInput?.value?.amount,
    comment: addTicketInput?.value?.comment,
    type: addTicketInput?.value?.type,
  } as IAddTicketStudent
  const res = await addTicketStudent(data)
  console.log('onAddTicket', res)
  if (res) toggleAddTicket()
}

const onExpirePackage = async () => {
  const data = {
    packageItemId: internalackageItemId.value,
    expireDate: expirePackageInput?.value?.expireDate,
    comment: expirePackageInput?.value?.comment,
  } as IExpireTicketStudent
  const res = await expireTicketStudent(data)
  console.log('onExpirePackage', res)
  if (res) toggleExpirePackage()
}

const toggleAddTicket = () => {
  openAddTicketModal.value = !openAddTicketModal.value
  if (!openAddTicketModal.value) {
    addTicketInput.value = {
      packageItemId: props.packageItemId || 0,
      type: 'package',
      amount: 1,
      comment: '',
    }
  }
}
const toggleExpirePackage = () => {
  openExpirePackageModal.value = !openExpirePackageModal.value
  if (!openExpirePackageModal.value) {
    expirePackageInput.value = {
      packageItemId: props.packageItemId || 0,
      expireDate: todayIso.value,
      comment: '',
    }
  }
}

watch(
  () => expirePackageInput,
  () => {
    console.log('expirePackageInput:', expirePackageInput.value)
  }
)
onMounted(() => {})
</script>
<template>
  <!-- [Modal]: Add Ticket -->
  <V-Modal
    :open="openAddTicketModal"
    title="Add Ticket"
    size="medium"
    actions="right"
    @close="toggleAddTicket"
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
            />
          </V-Control>
        </V-Field>
      </form>
    </template>
    <template #action>
      <V-Button color="primary" raised @click="onAddTicket">Add</V-Button>
    </template>
  </V-Modal>
  <!-- [Modal]: Add Ticket -->

  <V-Modal
    :open="openExpirePackageModal"
    title="Expire Package"
    size="medium"
    actions="right"
    @close="toggleExpirePackage"
  >
    <template #content>
      <form class="modal-form">
        <v-date-picker
          v-model="expirePackageInput.expireDate"
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
              v-model="expirePackageInput.comment"
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
      <V-Button color="primary" raised @click="onExpirePackage"
        >Save Expire</V-Button
      >
    </template>
  </V-Modal>
  <!-- [Dropdown]: Manage Package -->
  <V-Dropdown
    title="Manage Package"
    class="is-pushed-mobile"
    color="primary"
    spaced
    right
  >
    <template #content>
      <a role="menuitem" class="dropdown-item is-media" v-show="canActivate">
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

      <a role="menuitem" href="#" class="dropdown-item is-media">
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
  height: 280px;
}
</style>
