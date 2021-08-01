import { onMounted, reactive, toRefs, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import StudentService from '/@src/api/student.service'
import {
  IStudentPackageItems,
  StudentPackageItemResponse,
} from '/@src/types/interfaces/package-item.interface'
import { TicketType } from '../../types/enums/ticket.enum'
import {
  IAddTicketStudent,
  IExpireTicketStudent,
  IStartTicketStudent,
} from '/@src/types/interfaces/ticket.interface'
import moment from 'moment'
import useNotyf from '../useNotyf'

interface UseStudentPackageItemState {
  validation?: object
  todayIso: string
  packageItems: {
    inactivePackages: IStudentPackageItems[]
    activePackages: IStudentPackageItems[]
    expirePackages: IStudentPackageItems[]
  }
}

export default function useStudentPackageItem() {
  const state = reactive<UseStudentPackageItemState>({
    validation: {},
    packageItems: {
      inactivePackages: [],
      activePackages: [],
      expirePackages: [],
    },
    todayIso: '',
  })
  const route = useRoute()
  const notyf = useNotyf()

  const fetchStudentPackages = async () => {
    const studentId = route.params.id as string
    const { data, status } = await StudentService.getStudentPackageItems(
      +studentId
    )
    if (status === 200 && data) {
      state.packageItems = data
    }
  }

  const addTicketStudent = async (payload: IAddTicketStudent) => {
    const studentId = route.params.id as string
    console.log('add ticket:', payload)
    const { status, message } = await StudentService.addNewTicketStudent({
      ...payload,
      studentId: +studentId,
    })
    if (status === 201) {
      notyf.success('Adding ticket(s) completed!')
      return status
    } else {
      if (typeof message === 'object') {
        state.validation = message
      }
      notyf.error(message || 'Fail! Please try again')
    }
  }

  const activatePackageItem = async (
    packageItemId: number,
    startDate?: string
  ) => {
    const { status, message } = await StudentService.activatePackageItemById(
      packageItemId,
      { startDate }
    )
    if (status === 201) {
      notyf.success('Activate package is completed!')
      return status
    } else {
      if (typeof message === 'object') {
        state.validation = message
      }
      notyf.error(message || 'Fail! Please try again')
    }
  }

  const changeExpireDateTicketStudent = async (
    payload: IExpireTicketStudent
  ) => {
    console.log('expireTicketStudent:', payload)
    const { status, message } = await StudentService.changeExpireDateTicket(
      payload
    )
    if (status === 200) {
      notyf.success('Change expire date is completed!')
      return status
    } else {
      if (typeof message === 'object') {
        state.validation = message
      }
      notyf.error(message || 'Fail! Please try again')
    }
  }

  const changeStartDateTicketStudent = async (payload: IStartTicketStudent) => {
    console.log('StartTicketStudent:', payload)
    const { status, message } = await StudentService.changeStartDateTicket(
      payload
    )
    if (status === 200) {
      notyf.success('Change start date is completed!')
      return status
    } else {
      if (typeof message === 'object') {
        state.validation = message
      }
      notyf.error(message || 'Fail! Please try again')
    }
  }
  watch(
    () => state.packageItems,
    () => console.log('update state packageItems::', state.packageItems)
  )
  onMounted(() => {
    const today = moment().format('YYYY-MM-DD')
    state.todayIso = moment(today).toISOString()
  })
  return {
    ...toRefs(state),
    addTicketStudent,
    changeExpireDateTicketStudent,
    changeStartDateTicketStudent,
    fetchStudentPackages,
    activatePackageItem,
  }
}
