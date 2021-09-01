import { computed, defineAsyncComponent, ref } from 'vue'
import { toFormat } from '/@src/helpers/date.helper'
import { IStudentPackageItems } from '/@src/types/interfaces/package-item.interface'

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
const ModalRemoveTicket = defineAsyncComponent(
  () => import('/@src/components/student/packages/ModalRemoveTicket.vue')
)

type modalComponent =
  | 'add-ticket'
  | 'change-expire'
  | 'send-package'
  | 'change-package'
  | 'remove-package'
  | 'change-start-ticket'
  | 'change-expire-ticket'
  | 'remove-ticket'
const modalComponents = {
  'add-ticket': ModalAddTicket,
  'change-expire': ModalSetExpireTicket,
  'send-package': ModalSendPackage,
  'change-package': ModalChangePackage,
  'remove-package': ModalRemovePackage,
  'change-start-ticket': ModalSetStartTicket,
  'change-expire-ticket': ModalSetExpireTicket,
  'remove-ticket': ModalRemoveTicket,
}
export const customDate = ref(toFormat(undefined, 'YYYY-MM-DD'))
export const currentModal = ref<keyof typeof modalComponents | undefined>(
  undefined
)
export const isOpenModalComponent = computed(() => {
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
      return ModalRemoveTicket

    default:
      return ModalRemovePackage
  }
})
