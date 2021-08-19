import { onMounted, reactive, toRefs } from 'vue'
import { IAdminInfo } from '/@src/types/interfaces/admin.interface'
import useAdminApi from '../api/useAdminApi'
// import { useRoute, useRouter } from 'vue-router'
// import usePackageApi from '../api/usePackageApi'
interface UseViewAdminState {
  data: IAdminInfo[]
  userid: number
}
export default function useViewAdmin() {
  const state = reactive<UseViewAdminState>({
    data: [],
    userid: 3,
  })

  const { getAdminById } = useAdminApi()

  const getAdminInfo = async (admin: IAdminInfo) => {
    const res = await getAdminById(admin.id)
    console.log('res=' + res)
  }
  onMounted(() => {
    getAdminInfo
  })

  return { ...toRefs(state) }
}
