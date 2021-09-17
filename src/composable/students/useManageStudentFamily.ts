import { onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import useStudentApi from '../api/useStudentApi'
import useNotyf from '../useNotyf'
import useOptionApi from '/@src/composable/api/useOptionApi'
import { errMessage } from '/@src/helpers/filter.helper'
import {
  IFamilyInfo,
  ICreateFamily,
} from '/@src/types/interfaces/student.interface'

interface UseManageStudentFamilyState {
  student: string
  family: ICreateFamily
  familyId: number
  familyInfo?: IFamilyInfo
  memberId?: number
  isOpenCreateFamilyPopup: boolean
  isOpenDeleteConfirmPopup: boolean
  validate: Object
}
export default function useManageStudentFamuly() {
  const state = reactive<UseManageStudentFamilyState>({
    student: '',
    isOpenCreateFamilyPopup: false,
    isOpenDeleteConfirmPopup: false,
    family: {
      name: '',
      note: '',
    },
    familyId: 0,
    familyInfo: undefined,
    memberId: undefined,
    validate: {},
  })
  const route = useRoute()
  const notyf = useNotyf()
  const studentId = route.params.id as string

  // const getStudents = useOptionApi()
  const {
    getStudentByFamily,
    addStudentFamily,
    addStudentToFamily,
    deleteFamilyMember,
  } = useStudentApi()

  const fectStudentFamily = async () => {
    const data = await getStudentByFamily(+studentId)
    console.log('data' + data)
    if (data) {
      state.familyInfo = data
      state.familyId = state.familyInfo.id
    }
    //Api get getStudentByFamily
  }

  const addFamily = async () => {
    const res = await addStudentFamily(+studentId, state.family)
    console.log('res' + res)
    if (res.status === 201) {
      notyf.success('success!')
      state.validate = {}
      state.isOpenCreateFamilyPopup = false
      fectStudentFamily()
    } else {
      if (typeof res.message === 'object') {
        state.validate = res.message
      } else {
        notyf.error(errMessage(res.message))
      }
    }

    // Api post addStudentFamily
  }

  const addStdToFam = async () => {
    if (!state.familyInfo) return
    const res = await addStudentToFamily(
      +studentId,
      state.familyInfo?.id,
      state.student
    )
    if (res.status === 200) {
      notyf.success('success!')
      state.validate = {}
      fectStudentFamily()
    } else {
      if (typeof res.message === 'object') {
        state.validate = res.message
      } else {
        notyf.error(errMessage(res.message))
      }
    }
    // Api post  addStudentToFamily
    // studentId,familyId,memberId
  }

  const deleteMember = async () => {
    if (!state.memberId) return
    const res = await deleteFamilyMember(
      +studentId,
      state.familyId,
      state.memberId
    )
    if (res.status === 200) {
      notyf.success('success!')
    } else {
      notyf.error(errMessage(res.message))
    }
    state.memberId = undefined
  }
  onMounted(() => {
    fectStudentFamily()
  })

  const familyTableHeaders = [
    { key: 'id', label: 'ID' },
    { key: 'fullnameTh', label: 'Student name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'action', label: 'Action', isCenter: true, isRaw: true },
  ]
  return {
    ...toRefs(state),
    familyTableHeaders,
    deleteMember,
    addFamily,
    addStdToFam,
    fectStudentFamily,
  }
}
