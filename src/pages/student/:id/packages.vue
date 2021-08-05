<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref, watch } from 'vue'
import useStudentPackageItemState from '/@src/composable/student/use-student-package'
import { toFormat } from '/@src/helpers/date.helper'
import { TicketType } from '/@src/types/enums/ticket.enum'
import type { IStudentPackageItems } from '/@src/types/interfaces/package-item.interface'
import type {
  IAddTicketStudent,
  IExpireTicketStudent,
  IStartTicketStudent,
} from '/@src/types/interfaces/ticket.interface'
const ModalAddTicket = defineAsyncComponent(
  () => import('/@src/components/student/packages/ModalAddTicket.vue')
)
const ModalSetExpireTicket = defineAsyncComponent(
  () => import('/@src/components/student/packages/ModalSetExpireTicket.vue')
)
const ModalChangePackage = defineAsyncComponent(
  () => import('/@src/components/student/packages/ModalChangePackage.vue')
)
const ModalSendPackage = defineAsyncComponent(
  () => import('/@src/components/student/packages/ModalSendPackage.vue')
)
const ModalRemovePackage = defineAsyncComponent(
  () => import('/@src/components/student/packages/ModalRemovePackage.vue')
)
const ModalSetStartTicket = defineAsyncComponent(
  () => import('/@src/components/student/packages/ModalSetStartTicket.vue')
)
const {
  packageItems,
  fetchStudentPackages,
  isLoading,
  currentPackageItem,
  activatePackageItem,
  addTicketStudent,
  changeStartDateTicketStudent,
  changeExpireDateTicketStudent,
  removeTicket,
  sendPackage,
  changeToNewPackage,
  removePackage,
} = useStudentPackageItemState()
const customDate = ref(toFormat(undefined, 'YYYY-MM-DD'))
type modalComponent =
  | 'add-ticket'
  | 'change-expire'
  | 'send-package'
  | 'change-package'
  | 'remove-package'
  | 'change-start-ticket'
  | 'change-expire-ticket'
  | 'remove-ticket'
const currentModal = ref<modalComponent | undefined>(undefined)
const currentTicketType = ref<TicketType | undefined>(undefined)
const toggleModal = (
  packageItem?: IStudentPackageItems,
  from?: modalComponent
) => {
  currentModal.value = from || ''
  currentPackageItem.value = packageItem
  if (from === 'change-expire') {
    customDate.value = currentPackageItem?.value?.tickets.reduce(
      (result, current) => {
        return result > current.expireDate ? current.expireDate : result
      },
      currentPackageItem?.value?.tickets[0].expireDate
    )
  }
}
const toggleModalTicket = (
  event: {
    packageItem?: IStudentPackageItems
    ticketType?: TicketType
    date?: string
  },
  from?: modalComponent
) => {
  toggleModal(event.packageItem, from)
  currentTicketType.value = event.ticketType
  customDate.value = event.date
}
const isOpenModalComponent = computed(() => {
  switch (currentModal.value) {
    /**
     * @info modal for package action
     */
    case 'add-ticket':
      return ModalAddTicket
    case 'change-expire':
      return ModalSetExpireTicket
    case 'change-package':
      return ModalChangePackage
    case 'send-package':
      return ModalSendPackage
    case 'remove-package':
      return ModalRemovePackage
    /**
     * @info modal for ticket action
     */
    case 'change-start-ticket':
      return ModalSetStartTicket
    case 'change-expire-ticket':
      return ModalSetExpireTicket
    case 'remove-ticket':
      return ModalSetExpireTicket

    default:
      return ModalRemovePackage
  }
})

const modalTitle = computed(() => {
  const packageItemTitle = `(Item ID: ${currentPackageItem?.value?.packageItemId}) ${currentPackageItem?.value?.packageName}`
  switch (currentModal.value) {
    /**
     * @info modal for package action
     */
    case 'add-ticket':
      return `Add ticket: ${packageItemTitle}`
    case 'change-expire':
      return `Expire package: ${packageItemTitle}`
    case 'change-package':
      return `Change package: ${packageItemTitle}`
    case 'send-package':
      return `Send package: ${packageItemTitle}`
    case 'remove-package':
      return `Remove package: ${packageItemTitle}`
    /**
     * @info modal for ticket action
     */
    case 'change-start-ticket':
      return `Start ticket: ${packageItemTitle}`
    case 'change-expire-ticket':
      return `Expire ticket: ${packageItemTitle}`
    case 'remove-ticket':
      return `Remove ticket: ${packageItemTitle}`
    default:
      return `Package: ${packageItemTitle}`
  }
})

const modalProps = computed(() => {
  const defaultProps = {
    openModal: !!currentPackageItem.value,
    title: modalTitle.value,
  }
  switch (currentModal.value) {
    /**
     * @info modal for package action
     */
    case 'add-ticket':
      return { ...defaultProps, packageItem: currentPackageItem?.value }
    case 'change-expire':
      return {
        ...defaultProps,
        expireDate: customDate.value,
        packageItem: currentPackageItem?.value,
      }
    case 'change-package':
      return defaultProps
    case 'send-package':
      return defaultProps
    case 'remove-package':
      return { ...defaultProps, packageItem: currentPackageItem?.value }
    /**
     * @info modal for ticket action
     */
    case 'change-start-ticket':
      return {
        ...defaultProps,
        startDate: customDate.value,
        ticketType: currentTicketType.value,
        packageItem: currentPackageItem?.value,
      }
    case 'change-expire-ticket':
      return {
        ...defaultProps,
        expireDate: customDate.value,
        ticketType: currentTicketType.value,
        packageItem: currentPackageItem?.value,
      }
    case 'remove-ticket':
      return {
        ...defaultProps,
        expireDate: customDate.value,
        packageItem: currentPackageItem?.value,
      }

    default:
      return defaultProps
  }
})
const checkAction = async (
  value:
    | string
    | number
    | IAddTicketStudent
    | IExpireTicketStudent
    | IStartTicketStudent
) => {
  if (currentModal.value === 'add-ticket' && typeof value === 'object')
    return await addTicketStudent(value)
  else if (currentModal.value === 'change-expire' && typeof value === 'object')
    return await changeExpireDateTicketStudent(value)
  else if (currentModal.value === 'change-package' && typeof value === 'number')
    return await changeToNewPackage(data)
  else if (currentModal.value === 'send-package' && typeof value === 'number')
    return await sendPackage(value)
  else if (currentModal.value === 'remove-package' && typeof value === 'string')
    return await removePackage(value)
  else if (
    currentModal.value === 'change-start-ticket' &&
    typeof value === 'object'
  )
    return await changeStartDateTicketStudent(value)
  else if (
    currentModal.value === 'change-expire-ticket' &&
    typeof value === 'object'
  )
    return await changeExpireDateTicketStudent(value)
  else if (currentModal.value === 'remove-ticket') return `Remove ticket`
}
const onSubmit = async (
  value:
    | string
    | number
    | IAddTicketStudent
    | IExpireTicketStudent
    | IStartTicketStudent
) => {
  const res = await checkAction(value)
  if (res) {
    toggleModal()
    await fetchStudentPackages()
  }
}

const onActivatePackage = async (packageItemId: number) => {
  await activatePackageItem(packageItemId)
  await fetchStudentPackages()
}
onMounted(() => {
  fetchStudentPackages()
})
</script>
<template>
  <div v-if="!isLoading">
    <!-- Modal for package action -->
    <!-- [Modal]: Add Ticket -->
    <!-- [Modal]: Expire Package -->
    <!-- [Modal]: Send Package -->
    <!-- [Modal]: Change Package -->
    <!-- [Modal]: Remove Package -->
    <!-- [Modal]: Start Package -->
    <!-- [Modal]: Expire Package -->
    <component
      :is="isOpenModalComponent"
      v-bind.prop="modalProps"
      @on-change="onSubmit"
      @toggle-close="toggleModal"
    ></component>
    <CollapseContent
      v-if="packageItems.inactivePackages.length"
      with-chevron
      title="Inactive Package"
    >
      <template #collapse-content>
        <StudentPackageItem
          :package-items="packageItems.inactivePackages"
          can-activate
          @activate-package="onActivatePackage"
          @add-ticket="toggleModal($event, 'add-ticket')"
          @change-expire="toggleModal($event, 'change-expire')"
          @send-package="toggleModal($event, 'send-package')"
          @change-package="toggleModal($event, 'change-package')"
          @remove-package="toggleModal($event, 'remove-package')"
          @change-start-ticket="
            toggleModalTicket($event, 'change-start-ticket')
          "
          @change-expire-ticket="
            toggleModalTicket($event, 'change-expire-ticket')
          "
        />
      </template>
    </CollapseContent>
    <CollapseContent
      v-if="packageItems.activePackages.length"
      with-chevron
      title="Active Package"
    >
      <template #collapse-content>
        <StudentPackageItem
          :package-items="packageItems.activePackages"
          @add-ticket="toggleModal($event, 'add-ticket')"
          @change-expire="toggleModal($event, 'change-expire')"
          @send-package="toggleModal($event, 'send-package')"
          @change-package="toggleModal($event, 'change-package')"
          @remove-package="toggleModal($event, 'remove-package')"
          @change-start-ticket="
            toggleModalTicket($event, 'change-start-ticket')
          "
          @change-expire-ticket="
            toggleModalTicket($event, 'change-expire-ticket')
          "
        />
      </template>
    </CollapseContent>
    <CollapseContent
      v-if="packageItems.expirePackages.length"
      with-chevron
      title="Expired Package"
    >
      <template #collapse-content>
        <StudentPackageItem
          :package-items="packageItems.expirePackages"
          @add-ticket="toggleModal($event, 'add-ticket')"
          @change-expire="toggleModal($event, 'change-expire')"
          @send-package="toggleModal($event, 'send-package')"
          @change-package="toggleModal($event, 'change-package')"
          @remove-package="toggleModal($event, 'remove-package')"
          @change-start-ticket="
            toggleModalTicket($event, 'change-start-ticket')
          "
          @change-expire-ticket="
            toggleModalTicket($event, 'change-expire-ticket')
          "
        />
      </template>
    </CollapseContent>
  </div>
</template>
