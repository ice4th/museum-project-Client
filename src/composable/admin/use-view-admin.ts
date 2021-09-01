import { onMounted, reactive, toRefs } from 'vue'
import {
  IAdminInfo,
  IFormAdminInfo,
} from '/@src/types/interfaces/admin.interface'
import useAdminApi from '../api/useAdminApi'
import { useRoute } from 'vue-router'
import useNotyf from '../useNotyf'
import { errMessage } from '/@src/helpers/filter.helper'
interface UseViewAdminState {
  loading: boolean
  adminInfo?: IAdminInfo
  formData?: IFormAdminInfo
  validate: Object
}
export default function useViewAdmin() {
  const state = reactive<UseViewAdminState>({
    loading: false,
    adminInfo: undefined,
    formData: undefined,
    validate: {},
  })
  const notyf = useNotyf()
  const { getAdminById, putAdminInfo } = useAdminApi()
  const route = useRoute()
  const adminId = route.params.userid as string
  const getAdminInfo = async () => {
    state.loading = true
    const res = await getAdminById(+adminId)
    state.loading = false
    state.adminInfo = res
  }

  const saveInfo = async (profile: IFormAdminInfo) => {
    const { status, message } = await putAdminInfo(+adminId, profile)
    if (status === 200) {
      notyf.success('Success!')
    } else {
      if (typeof message === 'object') {
        state.validate = message
      } else {
        notyf.error(errMessage(message))
      }
    }
  }

  onMounted(() => {
    getAdminInfo()
  })

  return { ...toRefs(state), saveInfo }
}
