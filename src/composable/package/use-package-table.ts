/**
 * usePackageTable Composition API
 */

import { onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import usePackageApi from '../api/usePackageApi'
import { IPaginationResponse } from '/@src/types/interfaces/common.interface'
import { IPackageTableInfo } from '/@src/types/interfaces/package.interface'

interface UsePackageTableState {
  isLoading: boolean
  packages: IPackageTableInfo[]
  paginationData?: IPaginationResponse<IPackageTableInfo[]>
  currentPage: number
  perPage: number
  search: string
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
    search: '',
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
      currentPage: state.currentPage,
      perPage: state.perPage,
      search: state.search,
    })
    state.isLoading = false
    if (res) {
      state.paginationData = res
      state.currentPage = res.currentPage
    }
  }
  const onViewPackage = async (id: number) => {
    await router.push({
      name: 'product-package-:id-details',
      params: { id },
    })
  }
  const onEditPackage = async (id: number) => {
    await router.push({
      name: 'product-package-:id-update',
      params: { id },
    })
  }
  const setDefaultPagination = () => {
    state.currentPage = parseInt(`${route.query?.page || 1}`)
    state.perPage = parseInt(`${route.query?.perPage || 10}`)
    state.search = `${route.query?.search || ''}`
  }

  /**
   * On Mounted
   */
  onMounted(() => {
    setDefaultPagination()
    fetchAllPackages()
  })

  return {
    ...toRefs(state),
    packageTableHeaders,
    fetchAllPackages,
    onViewPackage,
    onEditPackage,
  }
}
