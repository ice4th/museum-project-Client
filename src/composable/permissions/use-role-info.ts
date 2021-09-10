import { onMounted, reactive, toRefs } from 'vue'
import { IRoleInfo } from '/@src/types/interfaces/permission.interface'
import usePermissionApi from '/@src/composable/api/usePermissionApi'
import { IPaginationResponse } from '../../types/interfaces/common.interface'
import { useRoute, useRouter } from 'vue-router'
import { Notyf } from 'notyf'
import { errMessage } from '../../helpers/filter.helper'
import usePaginationRoute from '../use-pagination-route'

/**
 * global notify
 */
const notyfMessage = new Notyf({
  duration: 2000,
  position: {
    x: 'center',
    y: 'top',
  },
})

export interface IUseRoleInfoState {
  rolePagination: IPaginationResponse<IRoleInfo[]>
  isLoading: boolean
  deleteActionItem?: IRoleInfo
}

export default function useRoleInfo() {
  /**
   * Composable Api
   */
  const { getRolePagination, deleteRole } = usePermissionApi()
  const { currentPage, perPage, search } = usePaginationRoute()

  /**
   * Router
   */
  const router = useRouter()
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
    isLoading: false,
    deleteActionItem: undefined,
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
      currentPage,
      perPage,
      search,
    })
    state.rolePagination = pagination
    state.isLoading = false
  }
  const onViewDetails = async (id: number) => {
    await router.push({
      name: 'permissions-role-:id-details',
      params: { id },
    })
  }
  const onUpdateRole = async (id: number) => {
    await router.push({
      name: 'permissions-role-:id-update',
      params: { id },
    })
  }
  const onDeleteRole = async () => {
    if (state.deleteActionItem?.id) {
      const { status, message } = await deleteRole(state.deleteActionItem.id)

      if (status === 200) {
        // refresh data table
        await fetchRoleItems()
        // show notify success
        notyfMessage.open({
          type: 'success',
          message: 'Role was removed!',
        })
      } else {
        notyfMessage.open({
          message: errMessage(message),
          type: 'error',
        })
      }
    }
    state.deleteActionItem = undefined
  }

  /**
   * On Mounted
   */
  onMounted(() => {
    fetchRoleItems()
  })

  return {
    ...toRefs(state),
    // variable
    roleTableHeaders,
    // methods
    onViewDetails,
    onUpdateRole,
    onDeleteRole,
  }
}
