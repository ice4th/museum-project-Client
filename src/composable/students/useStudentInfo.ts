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
  loadingLogin: boolean
  validation?: object
}
export default function useStudentInfo() {
  const state = reactive<UseStudentInfoState>({
    isLoading: false,
    studentInfo: undefined,
    loadingLogin: false,
    validation: {},
  })

  // can inject studentInfo use in child component
  provide(
    'studentInfo',
    computed(() => state.studentInfo)
  )
  const route = useRoute()
  const { getStudentInfoById, updateStudentInfoById, loginByStudentId } =
    useStudentApi()
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

  const loginAsStudent = async () => {
    state.loadingLogin = true
    const id = route.params.id as string
    const { status, data, message } = await loginByStudentId(+id)
    state.loadingLogin = false
    if (status === 201) {
      window.open(data.link)
      return
    }
    notyf.error(errMessage(message) || 'Fail! Please try again')
  }

  return {
    ...toRefs(state),
    fetchStudentInfoById,
    updateStudentProfile,
    loginAsStudent,
  }
}
