/**
 * Auth admin service
 */
import {
  IAccessToken,
  ICreateAdminUser,
  ILoginPayload,
} from '../types/interfaces/auth.interface'
import ApiService, { ApiServiceResponse } from './api.service'
import Cookies from 'js-cookie'
import { IAdminInfo } from '../types/interfaces/admin.interface'

const ADMIN_ACCESS_TOKEN = 'wh_access_token'
export default class AuthService {
  public static setCookie(token: string) {
    Cookies.set(ADMIN_ACCESS_TOKEN, token, { expires: 0.25 })
    localStorage.setItem(ADMIN_ACCESS_TOKEN, token)
  }

  public static getToken(): string | null {
    // return Cookies.get(ADMIN_ACCESS_TOKEN)
    return localStorage.getItem(ADMIN_ACCESS_TOKEN)
  }

  public static removeCookie() {
    Cookies.remove(ADMIN_ACCESS_TOKEN)
    localStorage.removeItem(ADMIN_ACCESS_TOKEN)
  }

  public static async registerAdmin(
    payload: ICreateAdminUser
  ): Promise<ApiServiceResponse> {
    return await ApiService.post(`/Auth/Register`, payload)
  }

  public static async loginAdmin(
    payload: ILoginPayload
  ): Promise<ApiServiceResponse<IAccessToken>> {
    const res = await ApiService.post<IAccessToken>(`/Auth/Login`, payload)

    if (res.data?.accessToken) {
      this.setCookie(res.data.accessToken)
    }
    return res
  }

  public static async activeAccount(
    token: string
  ): Promise<ApiServiceResponse<IAccessToken>> {
    const res = await ApiService.post<IAccessToken>(`/Auth/ActiveAccount`, {
      token,
    })
    if (res.data?.accessToken) {
      this.setCookie(res.data.accessToken)
    }
    return res
  }

  public static async getMyAdminInfo(): Promise<
    ApiServiceResponse<IAdminInfo>
  > {
    // TODO: Get My Admin Profile API
    const res = await ApiService.get<IAdminInfo>(`Auth/Me`)
    return res
  }
}
