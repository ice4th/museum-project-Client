import { onMounted, reactive, toRefs } from 'vue'
import {
  IAdminInfo,
  IFormAdminInfo,
} from '/@src/types/interfaces/admin.interface'
import useAdminApi from '../api/useAdminApi'
import { useRoute } from 'vue-router'
// import { useRoute, useRouter } from 'vue-router'
// import usePackageApi from '../api/usePackageApi'
interface UseViewAdminState {
  adminInfo?: IAdminInfo
  formData?: IFormAdminInfo
}
export default function useViewAdmin() {
  const state = reactive<UseViewAdminState>({
    adminInfo: undefined,
    formData: undefined,
  })

  const { getAdminById } = useAdminApi()
  const route = useRoute()
  const getAdminInfo = async () => {
    const res = await getAdminById(+route.params.userid)
    console.log(res)
    // console.log('res=' + res)
    state.adminInfo = res
  }

  const saveInfo = () => {
    // const formData = state.adminInfo
    // console.log("formData"+formData)
    // putAdminInfo(state.formAdminInfo.id,formdata)
    // console.log(state.adminInfo)
  }

  onMounted(() => {
    getAdminInfo()
  })

  return { ...toRefs(state), saveInfo }
}
