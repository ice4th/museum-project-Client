import { reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import useStudentApi from '../api/useStudentApi'
import useNotyf from '../useNotyf'
import useOptionApi from '/@src/composable/api/useOptionApi'
import { IMemberInfo } from '/@src/types/interfaces/permission.interface'
import {
  ICreateFamily,
  IFamilyInfo,
} from '/@src/types/interfaces/student.interface'
interface UseManageStudentFamilyState {
  student: string
  family: ICreateFamily
  familyInfo?: IFamilyInfo
  memberInfo?: IMemberInfo
  isOpenCreateFamilyPopup: boolean
  isOpenDeleteConfirmPopup: boolean
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
    familyInfo: undefined,
    memberInfo: undefined,
  })
  const route = useRoute()
  const notyf = useNotyf()
  const studentId = route.params.id as string

  // const getStudents = useOptionApi()
  const { getStudentByFamily, addStudentFamily, addStudentToFamily } =
    useStudentApi()

  const fectStudentFamily = () => {
    const data = getStudentByFamily(+studentId)
    console.log('data' + data)
    // if (data) {
    //   state.familyInfo = data
    // }
    //Api get getStudentByFamily
  }

  const addFamily = () => {
    const res = addStudentFamily(+studentId, state.family)
    console.log('res' + res)
    state.isOpenCreateFamilyPopup = false
    // Api post addStudentFamily
  }

  const addStdToFam = () => {
    // const  res = addStudentToFamily(+studentId,familyId,state.student)
    // Api post  addStudentToFamily
    // studentId,familyId,memberId
  }

  const deleteMember = () => {
    //   Delete member
    state.isOpenDeleteConfirmPopup = false
  }

  const familyTableHeaders = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Student name' },
    { key: 'role', label: 'Role' },
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
