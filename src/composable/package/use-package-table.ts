/**
 * usePackageTable Composition API
 */

import { onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import usePackageApi from '../api/usePackageApi'
import { IPaginationResponse } from '/@src/types/interfaces/common.interface'
import { IPackageTableInfo } from '/@src/types/interfaces/package.interface'

interface UsePackageTableState {
  isLoading: boolean
  packages: IPackageTableInfo[]
  paginationData?: IPaginationResponse<IPackageTableInfo[]>
  currentPage: number
  perPage: number
}
export default function usePackageTable() {
  /**
   * Use Api
   */
  const { getPackagesWithPagination } = usePackageApi()

  /**
   * Router
   */
  const route = useRoute()

  /**
   * State
   */
  const state = reactive<UsePackageTableState>({
    isLoading: false,
    packages: [],
    paginationData: undefined,
    currentPage: 1,
    perPage: 10,
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
    const page = route.query.page as string
    const perPage = route.query.perPage as string
    state.isLoading = true
    if (page) {
      state.currentPage = +page
    }
    if (perPage) {
      state.perPage = +perPage
    }
    const res = await getPackagesWithPagination({
      currentPage: state.currentPage,
      perPage: state.perPage,
    })
    state.isLoading = false
    if (res) {
      state.paginationData = res
      state.currentPage = res.currentPage
    }
  }
  const onEdit = () => {
    route.path
  }

  /**
   * On Mounted
   */
  onMounted(() => {
    fetchAllPackages()
  })

  return { ...toRefs(state), packageTableHeaders, fetchAllPackages }
}
