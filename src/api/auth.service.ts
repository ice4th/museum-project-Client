/**
 * Auth admin service
 */
import {
  ICreateAdminUser,
  ILoginPayload,
} from '../types/interfaces/auth.interface'
import ApiService, { ApiServiceResponse } from './api.service'
export default class AuthService {
  public static async registerAdmin(
    payload: ICreateAdminUser
  ): Promise<ApiServiceResponse> {
    return await ApiService.post(`/Auth/Register`, payload)
  }

  public static async loginAdmin(
    payload: ILoginPayload
  ): Promise<ApiServiceResponse> {
    return await ApiService.post(`/Auth/Login`, payload)
  }

  public static async activeAccount(
    token: string
  ): Promise<ApiServiceResponse> {
    return await ApiService.post(`/Auth/ActiveAccount`, { token })
  }
}
