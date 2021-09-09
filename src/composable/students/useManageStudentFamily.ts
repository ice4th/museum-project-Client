import { reactive, toRefs } from 'vue'

interface UseManageStudentFamilyState {
  isOpenCreateFamilyPopup: boolean
}
export default function useManageStudentFamuly() {
  const state = reactive<UseManageStudentFamilyState>({
    isOpenCreateFamilyPopup: false,
  })
  return { ...toRefs(state) }
}
