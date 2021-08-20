import useApi, { apiHandleError, ApiResponse } from '../useApi'
import { AdminCountry } from '/@src/types/enums/admin.enum'
import {
  IAdminDetail,
  IAdminInfo,
  IFormAdminInfo,
} from '/@src/types/interfaces/admin.interface'
import {
  IPaginationParams,
  IPaginationResponse,
} from '/@src/types/interfaces/common.interface'
interface GetAllAdminParams extends IPaginationParams {
  search?: string
  status?: 'activate' | 'deactivate'
}
export default function useAdminApi() {
  const api = useApi()
  const { catchReponse } = apiHandleError()

  const getAllAdmins = async (
    params: GetAllAdminParams
  ): Promise<IPaginationResponse<IAdminDetail[]>> => {
    const res = await api.get<IPaginationResponse<IAdminDetail[]>, ApiResponse>(
      `/Admins/List`,
      { params }
    )
    return catchReponse(res)
  }

  const getAdminById = async (id: number): Promise<IAdminInfo> => {
    const res = await api.get<IAdminInfo, ApiResponse>(`/Admins/Info/${id}`)
    return catchReponse(res)
  }

  const putAdminInfo = async (id: number, payload: IFormAdminInfo) => {
    const res = await api.put<any, ApiResponse>(`/admins/info/${id}`, payload)
    return catchReponse(res)
  }

  const deactivateAccount = (id: number) => {
    return api.put<any, ApiResponse>(`/Admins/${id}/Deactivate`)
  }

  const changeCountry = (id: number, country: AdminCountry) => {
    return api.put<any, ApiResponse>(`/Admins/${id}/ChangeCountry`, undefined, {
      data: { country },
    })
  }

  const resendActivateEmail = (id: number) => {
    return api.put<any, ApiResponse>(`/Admins/${id}/ResendActivateEmail`)
  }

  return {
    getAllAdmins,
    getAdminById,
    deactivateAccount,
    changeCountry,
    resendActivateEmail,
    putAdminInfo,
  }
}
