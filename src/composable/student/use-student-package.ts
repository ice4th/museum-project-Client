import { computed, onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  IAddPackageStudent,
  IStudentPackageItems,
} from '/@src/types/interfaces/package-item.interface'
import {
  IAddTicketStudent,
  IDeleteTicketPayload,
  IExpireTicketStudent,
  IStartTicketStudent,
} from '/@src/types/interfaces/ticket.interface'
import useNotyf from '../useNotyf'
import useStudentApi from '../api/useStudentApi'
import { TicketType } from '/@src/types/enums/ticket.enum'

interface UseStudentPackageItemState {
  isLoading: Boolean
  packageItems: {
    inactivePackages: IStudentPackageItems[]
    activePackages: IStudentPackageItems[]
    expirePackages: IStudentPackageItems[]
  }
  currentPackageItem?: IStudentPackageItems
  currentTicketType?: TicketType
}

export default function useStudentPackageItem() {
  const state = reactive<UseStudentPackageItemState>({
    isLoading: true,
    packageItems: {
      inactivePackages: [],
      activePackages: [],
      expirePackages: [],
    },
    currentPackageItem: undefined,
    currentTicketType: undefined,
  })
  const route = useRoute()
  const router = useRouter()
  const notyf = useNotyf()
  const studentId = computed(() => +route.params.id)

  const {
    getStudentPackageItems,
    addNewTicketStudent,
    activatePackageItemById,
    changeExpireDateTicket,
    changeStartDateTicket,
    deleteTicketByPackageItem,
    sendPackageToAnotherStudent,
    changePackage,
    deletePackageByPackageItem,
    redeemPackageByStudentId,
    addPackageItemByStudentId,
  } = useStudentApi()

  const notyfError = (message: any) => {
    if (typeof message === 'object') {
      Object.keys(message).map((key) => {
        notyf.error(`${key}: ${message[key]}`)
      })
    } else notyf.error(message || 'Fail! Please try again')
  }

  const fetchStudentPackages = async () => {
    state.isLoading = true
    const data = await getStudentPackageItems(studentId.value)
    state.isLoading = false
    if (data) {
      state.packageItems = data
    }
  }

  const addTicketStudent = async (payload: IAddTicketStudent) => {
    const { status, message } = await addNewTicketStudent({
      ...payload,
      packageItemId:
        state.currentPackageItem?.packageItemId || payload.packageItemId,
      studentId: studentId.value,
    })
    if (status === 201) {
      notyf.success('Adding ticket(s) completed!')
      return status
    } else {
      notyfError(message)
    }
  }

  const activatePackageItem = async (
    packageItemId: number,
    startDate?: string
  ) => {
    const { status, message } = await activatePackageItemById(packageItemId, {
      startDate,
    })
    if (status === 201) {
      notyf.success('Activate package completed!')
      return status
    } else {
      notyfError(message)
    }
  }

  const changeExpireDateTicketStudent = async (
    payload: IExpireTicketStudent
  ) => {
    const { status, message } = await changeExpireDateTicket({
      ...payload,
      type: state.currentTicketType,
      packageItemId:
        state.currentPackageItem?.packageItemId || payload.packageItemId,
    })
    if (status === 200) {
      notyf.success('Change expire date completed!')
      return status
    } else {
      notyfError(message)
    }
  }

  const removeTicket = async (payload: IDeleteTicketPayload) => {
    if (!state.currentTicketType) return
    const { status, message } = await deleteTicketByPackageItem({
      ...payload,
      packageItemId:
        state.currentPackageItem?.packageItemId || payload.packageItemId,
      type: state.currentTicketType,
    })
    if (status === 200) {
      notyf.success(
        `Remove ticket type ${payload.type} (amount: ${payload.amount}) completed!`
      )
      return status
    } else {
      notyfError(message)
    }
  }

  const changeStartDateTicketStudent = async (payload: IStartTicketStudent) => {
    const { status, message } = await changeStartDateTicket(payload)
    if (status === 200) {
      notyf.success('Change start date completed!')
      return status
    } else {
      notyfError(message)
    }
  }

  const sendPackage = async (newstudentId: number) => {
    if (!state.currentPackageItem) return
    const { status, message } = await sendPackageToAnotherStudent(
      state.currentPackageItem.packageItemId,
      newstudentId
    )
    if (status === 201) {
      notyf.success('Send package completed!')
      return status
    } else {
      notyfError(message)
    }
  }

  const changeToNewPackage = async (newPackageId: number) => {
    if (!state.currentPackageItem) return
    const { status, message } = await changePackage(
      state.currentPackageItem.packageItemId,
      newPackageId
    )
    if (status === 201) {
      notyf.success('Change package completed!')
      return status
    } else {
      notyfError(message)
    }
  }

  const removePackage = async (comment: string) => {
    if (!state.currentPackageItem) return
    const { status, message } = await deletePackageByPackageItem(
      state.currentPackageItem.packageItemId,
      comment
    )
    if (status === 200) {
      notyf.success('Remove package completed!')
      return status
    } else {
      notyfError(message)
    }
  }
  const redeemPackage = async (code: string) => {
    const { status, message } = await redeemPackageByStudentId({
      code,
      studentId: studentId.value,
    })
    if (status === 201) {
      notyf.success('Redeem Package Success!')
      await fetchStudentPackages()
      return status === 201
    } else {
      notyfError(message)
    }
  }
  const addPackage = async (payload: IAddPackageStudent) => {
    const { status, message } = await addPackageItemByStudentId({
      ...payload,
      studentId: studentId.value,
    })
    if (status === 201) {
      notyf.success('Add package completed!')
      await fetchStudentPackages()
      return status
    } else {
      notyfError(message)
    }
  }

  onMounted(() => {
    Promise.all([fetchStudentPackages()])
  })
  return {
    ...toRefs(state),
    addTicketStudent,
    changeExpireDateTicketStudent,
    changeStartDateTicketStudent,
    fetchStudentPackages,
    activatePackageItem,
    removeTicket,
    sendPackage,
    changeToNewPackage,
    removePackage,
    redeemPackage,
    addPackage,
  }
}
