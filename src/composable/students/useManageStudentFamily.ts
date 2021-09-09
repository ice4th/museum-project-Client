import { reactive, toRefs } from 'vue'

interface UseManageStudentFamilyState {
  isOpenCreateFamilyPopup: boolean
  isOpenDeleteConfirmPopup: boolean
}
export default function useManageStudentFamuly() {
  const state = reactive<UseManageStudentFamilyState>({
    isOpenCreateFamilyPopup: false,
    isOpenDeleteConfirmPopup: false,
  })

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
