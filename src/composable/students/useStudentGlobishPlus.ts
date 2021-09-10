import { reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import {
  IStudentGlobishPlusInfo,
  IUpdateStudentGlobishPlusProfile,
} from '/@src/types/interfaces/student.interface'
import useStudentApi from '/@src/composable/api/useStudentApi'
import useNotyf from '/@src/composable/useNotyf'
import { errMessage } from '/@src/helpers/filter.helper'

interface UseStudentGLobishPlusInfoState {
  isLoading: Boolean
  studentGlobishPlus?: IStudentGlobishPlusInfo
  validation?: object
}
export default function useStudentGlobishPlusInfo() {
  const state = reactive<UseStudentGLobishPlusInfoState>({
    isLoading: false,
    studentGlobishPlus: undefined,
    validation: {},
  })
  const route = useRoute()
  const notyf = useNotyf()

  const { getStudentGlobishPlusById, updateStudentGlobishPlusById } =
    useStudentApi()

  const fetchStudentGlobishPlusById = async () => {
    const id = route.params.id as string
    if (!id) return
    state.isLoading = true
    const data = await getStudentGlobishPlusById(+id)
    state.isLoading = false
    if (data) {
      state.studentGlobishPlus = {
        ...data,
        featureGroupId: data.featureGroup?.id,
      }
    } else return
  }

  const updateStudentGlobishPlusProfile = async (
    payload: IUpdateStudentGlobishPlusProfile
  ) => {
    const id = route.params.id as string
    const { status, message } = await updateStudentGlobishPlusById(+id, payload)
    if (status === 200) {
      notyf.success('Your changes have been successfully saved!')
      await fetchStudentGlobishPlusById()
    } else {
      if (typeof message === 'object') {
        state.validation = message
      }
      notyf.error(errMessage(message) || 'Fail! Please try again')
    }
  }

  return {
    ...toRefs(state),
    fetchStudentGlobishPlusById,
    updateStudentGlobishPlusProfile,
  }
}
