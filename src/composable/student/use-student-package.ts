import { reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { IStudentPackageItems } from '/@src/types/interfaces/package-item.interface'
import {
  IAddTicketStudent,
  IExpireTicketStudent,
  IStartTicketStudent,
} from '/@src/types/interfaces/ticket.interface'
import useNotyf from '../useNotyf'
import useStudentApi from '../api/useStudentApi'

interface UseStudentPackageItemState {
  isLoading: Boolean
  todayIso: string
  packageItems: {
    inactivePackages: IStudentPackageItems[]
    activePackages: IStudentPackageItems[]
    expirePackages: IStudentPackageItems[]
  }
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
  })
  const route = useRoute()
  const notyf = useNotyf()

  const {
    getStudentPackageItems,
    addNewTicketStudent,
    activatePackageItemById,
    changeExpireDateTicket,
    changeStartDateTicket,
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

  const changeStartDateTicketStudent = async (payload: IStartTicketStudent) => {
    const { status, message } = await changeStartDateTicket(payload)
    if (status === 200) {
      notyf.success('Change start date is completed!')
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
  }
}
