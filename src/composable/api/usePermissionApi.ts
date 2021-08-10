import useApi, { ApiResponse } from '../useApi'
import {
  IPaginationParams,
  IPaginationResponse,
} from '/@src/types/interfaces/common.interface'
import {
  ICreateRolePayload,
  IDeleteRole,
  IMenu,
  IRoleInfo,
} from '/@src/types/interfaces/permission.interface'
import { AxiosResponse } from 'axios'

export default function usePermissionApi() {
  const api = useApi()

  const getRolePagination = (
    params: IPaginationParams
  ): Promise<AxiosResponse<IPaginationResponse<IRoleInfo[]>>> => {
    return api.get<IPaginationResponse<IRoleInfo[]>>('/Roles', { params })
  }

  const getMenus = async (): Promise<AxiosResponse<IMenu[]>> => {
    return api.get<IMenu[]>('Menus')
  }

  const createRole = (data: ICreateRolePayload) => {
    const { teamId, ...payload } = data
    return api.post<void, ApiResponse>(`/Roles/Teams/${teamId}/Roles`, payload)
  }

  const deleteRole = (data: IDeleteRole) => {
    const { teamId, roleId } = data
    return api.delete<void, ApiResponse>(
      `/Roles/Teams/${teamId}/Roles/${roleId}`
    )
  }

  return {
    getRolePagination,
    createRole,
    getMenus,
    deleteRole,
  }
}
