import { onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import usePackageApi from '../api/usePackageApi'

export default function useUpdatePackage() {
  /**
   * Use Api
   */
  const { getPackageById } = usePackageApi()

  /**
   * Router
   */
  const route = useRoute()

  /**
   * State
   */
  const state = reactive({
    package: undefined,
  })

  /**
   * Methods
   */
  const fetchPackage = async () => {
    const packageId = parseInt(route.params.id as string)
    const res = await getPackageById(packageId)
    console.log(res)
    state.package = res
  }

  /**
   * On Mounted
   */
  onMounted(() => {
    fetchPackage()
  })

  return { ...toRefs(state) }
}
