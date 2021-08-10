import { onMounted, reactive, toRefs } from 'vue'
import { IRoleInfo } from '/@src/types/interfaces/permission.interface'
import usePermissionApi from '/@src/composable/api/usePermissionApi'
import { IPaginationResponse } from '../../types/interfaces/common.interface'
import { useRoute } from 'vue-router'
import useUserSession from '../useUserSession'
import { Notyf } from 'notyf'
import { errMessage } from '../../helpers/filter.helper'

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
  search: string
  deleteActionItem?: IRoleInfo
}

export default function useRoleInfo() {
  /**
   * Composable Api
   */
  const { getRolePagination, deleteRole } = usePermissionApi()
  const userSession = useUserSession()

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
    state.search = `${route.query?.search || ''}`
  }
  const onDeleteRole = async () => {
    if (userSession.user?.teamId && state.deleteActionItem?.id) {
      const { status, message } = await deleteRole({
        roleId: state.deleteActionItem.id,
        teamId: userSession.user.teamId,
      })

      if (status === 200) {
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
    } else {
      notyfMessage.open({
        message: 'Not found team id',
        type: 'error',
      })
    }
    state.deleteActionItem = undefined
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
    // variable
    roleTableHeaders,
    // methods
    onDeleteRole,
  }
}
