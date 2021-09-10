import { reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import useOptionApi from '/@src/composable/api/useOptionApi'
interface UseManageStudentFamilyState {
  students: string
  isOpenCreateFamilyPopup: boolean
  isOpenDeleteConfirmPopup: boolean
}
export default function useManageStudentFamuly() {
  const state = reactive<UseManageStudentFamilyState>({
    students: '',
    isOpenCreateFamilyPopup: false,
    isOpenDeleteConfirmPopup: false,
  })
  const route = useRoute()
  const getStudents = useOptionApi()

  const fectAllStudent = async () => {
    if (route.query.students) {
    }
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
  return { ...toRefs(state), familyTableHeaders, deleteMember }
}
