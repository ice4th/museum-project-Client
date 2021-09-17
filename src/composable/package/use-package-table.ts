/**
 * usePackageTable Composition API
 */

import { onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import usePackageApi from '../api/usePackageApi'
import usePaginationRoute from '../use-pagination-route'
import { IPaginationResponse } from '/@src/types/interfaces/common.interface'
import { IPackageTableInfo } from '/@src/types/interfaces/package.interface'

interface UsePackageTableState {
  isLoading: boolean
  packages: IPackageTableInfo[]
  paginationData?: IPaginationResponse<IPackageTableInfo[]>
}
export default function usePackageTable() {
  /**
   * Use Api
   */
  const { getPackagesWithPagination } = usePackageApi()

  /**
   * Router
   */
  const router = useRouter()
  const { currentPage, perPage, search } = usePaginationRoute()

  /**
   * State
   */
  const state = reactive<UsePackageTableState>({
    isLoading: false,
    packages: [],
    paginationData: undefined,
  })

  /**
   * Variable
   */
  const packageTableHeaders = [
    { key: 'id', label: 'ID' },
    { key: 'packageName', label: 'Package Name' },
    { key: 'type', label: 'Type' },
    { key: 'purchasable', label: 'Purchasable' },
    { key: 'price', label: 'Price' },
    { key: 'duration', label: 'Duration' },
    { key: 'actions', label: '', isRaw: true },
  ]

  /**
   * Methods
   */
  const fetchAllPackages = async () => {
    state.isLoading = true

    const res = await getPackagesWithPagination({
      currentPage,
      perPage,
      search,
    })
    state.isLoading = false
    if (res) {
      state.paginationData = res
    }
  }

  /**
   * On Mounted
   */
  onMounted(() => {
    fetchAllPackages()
  })

  return {
    ...toRefs(state),
    packageTableHeaders,
    fetchAllPackages,
  }
}
