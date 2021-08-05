import { reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { IStudentPackageItems } from '/@src/types/interfaces/package-item.interface'
import {
  IAddTicketStudent,
  IDeleteTicketPayload,
  IExpireTicketStudent,
  IStartTicketStudent,
} from '/@src/types/interfaces/ticket.interface'
import useNotyf from '../useNotyf'
import useStudentApi from '../api/useStudentApi'
import useOptionApi from '../api/useOptionApi'

interface UseStudentPackageItemState {
  isLoading: Boolean
  todayIso: string
  packageItems: {
    inactivePackages: IStudentPackageItems[]
    activePackages: IStudentPackageItems[]
    expirePackages: IStudentPackageItems[]
  }
  currentPackageItem?: IStudentPackageItems
}

export default function useStudentPackageItem() {
  const state = reactive<UseStudentPackageItemState>({
    isLoading: true,
    packageItems: {
      inactivePackages: [],
      activePackages: [],
      expirePackages: [],
    },
    todayIso: '',
    currentPackageItem: undefined,
  })
  const route = useRoute()
  const notyf = useNotyf()
  const { getStudents } = useOptionApi()

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
    const studentId = route.params.id as string
    const data = await getStudentPackageItems(+studentId)
    state.isLoading = false
    if (data) {
      state.packageItems = data
    }
  }

  const addTicketStudent = async (payload: IAddTicketStudent) => {
    const studentId = route.params.id as string
    const { status, message } = await addNewTicketStudent({
      ...payload,
      studentId: +studentId,
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
      notyf.success('Activate package is completed!')
      return status
    } else {
      notyfError(message)
    }
  }

  const changeExpireDateTicketStudent = async (
    payload: IExpireTicketStudent
  ) => {
    const { status, message } = await changeExpireDateTicket(payload)
    if (status === 200) {
      notyf.success('Change expire date is completed!')
      return status
    } else {
      notyfError(message)
    }
  }

  const removeTicket = async (payload: IDeleteTicketPayload) => {
    const { status, message } = await deleteTicketByPackageItem(payload)
    if (status === 201) {
      notyf.success(
        `Remove ticket type ${payload.type} (amount: ${payload.amount}) is completed!`
      )
      return status
    } else {
      notyfError(message)
    }
  }

  const changeStartDateTicketStudent = async (payload: IStartTicketStudent) => {
    const { status, message } = await changeStartDateTicket(payload)
    if (status === 200) {
      notyf.success('Change start date is completed!')
      return status
    } else {
      notyfError(message)
    }
  }

  const sendPackage = async (studentId: number) => {
    if (!state.currentPackageItem) return
    const { status, message } = await sendPackageToAnotherStudent(
      state.currentPackageItem.packageItemId,
      studentId
    )
    if (status === 201) {
      notyf.success('Send package is completed!')
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
      notyf.success('Change package is completed!')
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
      notyf.success('Remove package is completed!')
      return status
    } else {
      notyfError(message)
    }
  }
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
  }
}
