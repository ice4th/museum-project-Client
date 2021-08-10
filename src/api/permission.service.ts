import {
  ICreateRolePayload,
  IMenu,
} from '../types/interfaces/permission.interface'
import ApiService, { ApiServiceResponse } from './api.service'

export default class PermissionService {
  static async getMenus(): Promise<ApiServiceResponse<IMenu[]>> {
    return ApiService.get<IMenu[]>('Menus')
  }

  static async createRole({
    teamId,
    ...data
  }: ICreateRolePayload): Promise<ApiServiceResponse<void>> {
    return ApiService.post(`/Roles/Teams/${teamId}/Roles`, data)
  }
}
