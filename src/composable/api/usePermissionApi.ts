import useApi, { apiHandleError, ApiResponse } from '../useApi'
import {
  IPaginationParams,
  IPaginationResponse,
} from '/@src/types/interfaces/common.interface'
import {
  ICreateRolePayload,
  IMenu,
  IRoleInfo,
} from '/@src/types/interfaces/permission.interface'
import { AxiosResponse } from 'axios'

export default function usePermissionApi() {
  const api = useApi()
  const { catchReponse } = apiHandleError()

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

  return {
    getRolePagination,
    createRole,
    getMenus,
  }
}
