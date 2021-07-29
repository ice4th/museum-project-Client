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
    console.log('api add ticket:', payload)
    const { status, message } = await StudentService.addNewTicketStudent(
      +studentId,
      payload
    )
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

  const expireTicketStudent = async (payload: IExpireTicketStudent) => {
    console.log('expireTicketStudent:', payload)
    fetchStudentPackages()
    return payload
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
    expireTicketStudent,
    fetchStudentPackages,
  }
}
