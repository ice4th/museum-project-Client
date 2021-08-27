import useApi, { ApiResponse } from '../useApi'
import { checkResponseStatus } from '.'
import {
  IPaginationParams,
  IPaginationResponse,
} from '/@src/types/interfaces/common.interface'
import {
  ISaveRolePayload,
  IMenu,
  IRoleInfo,
  IEditRolePayload,
  ITeamCreate,
  ITeamData,
  ITeamInfo,
} from '/@src/types/interfaces/permission.interface'
import { AxiosResponse } from 'axios'
interface GetAllTeamParams extends IPaginationParams {
  search?: string
}
export default function usePermissionApi() {
  const api = useApi()

  const getRolePagination = (
    params: IPaginationParams
  ): Promise<AxiosResponse<IPaginationResponse<IRoleInfo[]>>> => {
    return api.get<IPaginationResponse<IRoleInfo[]>>('/Roles', { params })
  }

  const getRoleById = async (id: number): Promise<IRoleInfo> => {
    const res = await api.get<IRoleInfo>(`/Roles/${id}`)
    return checkResponseStatus(res)
  }

  const getRoleUsers = async (id: number): Promise<IRoleInfo> => {
    const res = await api.get<IRoleInfo>(`/Roles/${id}/Users`)
    return checkResponseStatus(res)
  }

  const getMenus = async (): Promise<AxiosResponse<IMenu[]>> => {
    return api.get<IMenu[]>('Menus')
  }

  const createRole = (data: ISaveRolePayload) => {
    return api.post<void, ApiResponse>('/Roles', data)
  }

  const updateRole = (data: IEditRolePayload) => {
    const { id, ...payload } = data
    return api.put<void, ApiResponse>(`/Roles/${id}`, payload)
  }

  const deleteRole = (id: number) => {
    return api.delete<void, ApiResponse>(`/Roles/${id}`)
  }

  const getAllTeam = async (
    params: GetAllTeamParams
  ): Promise<IPaginationResponse<ITeamInfo[]>> => {
    const res = await api.get<IPaginationResponse<ITeamInfo[]>, ApiResponse>(
      '/Teams',
      { params }
    )
    return checkResponseStatus(res)
  }

  const getTeamById = async (id: number): Promise<ITeamData> => {
    const res = await api.get<ITeamData>(`/Teams/${id}`)
    return checkResponseStatus(res)
  }

  const createTeam = (data: ITeamCreate) => {
    return api.post<void, ApiResponse>('/Teams', data)
  }

  const updateTeam = (id: number, payload: ITeamData) => {
    return api.put<ITeamData, ApiResponse>(`/Teams/${id}`, payload)
  }

  const deleteTeam = (id: number) => {
    return api.delete<any, ApiResponse>(`/Teams/${id}`)
  }

  return {
    getRolePagination,
    getRoleById,
    getRoleUsers,
    createRole,
    getMenus,
    updateRole,
    deleteRole,
    getAllTeam,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam,
  }
}
