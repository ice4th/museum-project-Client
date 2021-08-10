import { onMounted, reactive, toRefs } from 'vue'
import { IRoleInfo } from '/@src/types/interfaces/permission.interface'
import usePermissionApi from '/@src/composable/api/usePermissionApi'
import { IPaginationResponse } from '../../types/interfaces/common.interface'
import { useRoute } from 'vue-router'

export interface IUseRoleInfoState {
  rolePagination: IPaginationResponse<IRoleInfo[]>
  isLoading: boolean
  search: string
}

export default function useRoleInfo() {
  /**
   * Composable Api
   */
  const { getRolePagination } = usePermissionApi()

  /**
   * Router
   */
  const route = useRoute()

  /**
   * State
   */
  const state = reactive<IUseRoleInfoState>({
    rolePagination: {
      currentPage: 1,
      data: [],
      nextPage: undefined,
      perPage: 10,
      previousPage: undefined,
      total: 0,
      totalPage: 1,
    },
    search: '',
    isLoading: false,
  })

  /**
   * Variable
   */
  const roleTableHeaders = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'description', label: 'Description' },
    { key: 'teamName', label: 'Team' },
    { key: 'actions', label: '', isRaw: true },
  ]

  /**
   * Methods
   */
  const fetchRoleItems = async () => {
    state.isLoading = true
    const { data: pagination } = await getRolePagination({
      currentPage: state.rolePagination.currentPage,
      perPage: state.rolePagination.perPage,
      search: state.search,
    })
    state.rolePagination = pagination
    state.isLoading = false
  }
  const setDefaultPagination = () => {
    state.rolePagination.currentPage = parseInt(`${route.query?.page || 1}`)
    state.rolePagination.perPage = parseInt(`${route.query?.perPage || 10}`)
    state.search = `${route.query?.search}` || ''
  }

  /**
   * On Mounted
   */
  onMounted(() => {
    setDefaultPagination()
    fetchRoleItems()
  })

  return {
    ...toRefs(state),
    roleTableHeaders,
  }
}
