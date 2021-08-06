import Cookies from 'js-cookie'
import { ADMIN_ACCESS_TOKEN, ADMIN_PROFILE, checkResponseStatus } from '.'
import useApi, { ApiResponse } from '../useApi'
import { IAdminInfo } from '/@src/types/interfaces/admin.interface'
import {
  ICreateAdminUser,
  ILoginPayload,
  IAccessToken,
} from '/@src/types/interfaces/auth.interface'
import { provide } from 'vue'
import { apiSymbol } from '/@src/composable/useApi'
import { useRoute, useRouter } from 'vue-router'

export default function useAuthApi() {
  const api = useApi()
  const router = useRouter()
  const route = useRoute()

  const getToken = () => {
    return Cookies.get(ADMIN_ACCESS_TOKEN)
  }

  const setToken = (token: string, expire?: number) => {
    Cookies.set(ADMIN_ACCESS_TOKEN, token, { expires: expire || 0.25 })
  }

  const logout = () => {
    Cookies.remove(ADMIN_ACCESS_TOKEN)
    localStorage.removeItem(ADMIN_PROFILE)
    router.push({ name: 'auth-login', query: { redirect: route.fullPath } })
  }

  const getMyAdminInfo = async (): Promise<IAdminInfo | null> => {
    provide(apiSymbol, api)
    const res = await api.get<IAdminInfo>(`Auth/Me`)
    if (res.data) {
      localStorage.setItem(ADMIN_PROFILE, JSON.stringify(res.data))
    }
    return checkResponseStatus(res)
  }

  const registerAdmin = async (payload: ICreateAdminUser) => {
    return api.post<any, ApiResponse>(`/Auth/Register`, payload)
  }

  const loginAdmin = async (payload: ILoginPayload) => {
    const res = await api.post<IAccessToken, ApiResponse>(
      `/Auth/Login`,
      payload
    )
    if (res.data?.accessToken) {
      setToken(res.data?.accessToken)
      await getMyAdminInfo()
    }
    return res
  }

  const activeAccount = async (token: string) => {
    const res = await api.post<IAccessToken, ApiResponse>(
      `/Auth/ActiveAccount`,
      { token }
    )
    if (res.data?.accessToken) {
      setToken(res.data?.accessToken)
      await getMyAdminInfo()
    }
    return res
  }

  return {
    getMyAdminInfo,
    registerAdmin,
    loginAdmin,
    activeAccount,
    logout,
    getToken,
  }
}
