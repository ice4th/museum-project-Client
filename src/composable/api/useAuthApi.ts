import Cookies from 'js-cookie'
import { ADMIN_ACCESS_TOKEN } from '.'
import useApi from '../useApi'
import { IAdminInfo } from '/@src/types/interfaces/admin.interface'
import {
  ICreateAdminUser,
  ILoginPayload,
  IAccessToken,
} from '/@src/types/interfaces/auth.interface'

export default function useAuthApi() {
  const api = useApi()

  const registerAdmin = async (payload: ICreateAdminUser) => {
    return await api.post(`/Auth/Register`, payload)
  }

  const loginAdmin = async (payload: ILoginPayload) => {
    const res = await api.post<IAccessToken>(`/Auth/Login`, payload)
    if (res.data?.accessToken) {
      Cookies.set(ADMIN_ACCESS_TOKEN, res.data?.accessToken, { expires: 0.25 })
      localStorage.setItem(ADMIN_ACCESS_TOKEN, res.data?.accessToken)
    }
    return res
  }

  const activeAccount = async (token: string) => {
    return await api.post<IAccessToken>(`/Auth/ActiveAccount`, {
      token,
    })
  }

  const getMyAdminInfo = async () => {
    return await api.get<IAdminInfo>(`Auth/Me`)
  }

  const logout = () => {
    Cookies.remove(ADMIN_ACCESS_TOKEN)
    localStorage.removeItem(ADMIN_ACCESS_TOKEN)
  }

  return { getMyAdminInfo, registerAdmin, loginAdmin, activeAccount, logout }
}
