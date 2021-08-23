import { computed, provide, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import useStudentApi from '../api/useStudentApi'
import { IStudentInfo } from '/@src/types/interfaces/student.interface'
import useNotyf from '/@src/composable/useNotyf'
import { IUpdateStudentProfile } from '/@src/types/interfaces/student.interface'
import { errMessage } from '/@src/helpers/filter.helper'

interface UseStudentInfoState {
  isLoading: Boolean
  studentInfo?: IStudentInfo
  validation?: object
}
export default function useStudentInfo() {
  const state = reactive<UseStudentInfoState>({
    isLoading: false,
    studentInfo: undefined,
    validation: {},
  })

  // can inject studentInfo use in child component
  provide(
    'studentInfo',
    computed(() => state.studentInfo)
  )
  const route = useRoute()
  const { getStudentInfoById, updateStudentInfoById } = useStudentApi()
  const notyf = useNotyf()

  const fetchStudentInfoById = async () => {
    const id = route.params.id as string
    if (!id) return
    state.isLoading = true
    const data = await getStudentInfoById(+id)
    state.isLoading = false
    if (data) {
      state.studentInfo = data
    }
  }

  const updateStudentProfile = async (payload: IUpdateStudentProfile) => {
    const id = route.params.id as string
    console.table(payload)
    const { status, data, message } = await updateStudentInfoById(+id, payload)
    if (status === 200) {
      state.studentInfo = data
      notyf.success('Your changes have been successfully saved!')
    } else {
      if (typeof message === 'object') {
        state.validation = message
        return
      }
      notyf.error(errMessage(message) || 'Fail! Please try again')
    }
  }

  return { ...toRefs(state), fetchStudentInfoById, updateStudentProfile }
}
