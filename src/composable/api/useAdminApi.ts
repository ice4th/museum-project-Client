import useApi, { apiHandleError, ApiResponse } from '../useApi'
import { AdminCountry, AdminStatus } from '/@src/types/enums/admin.enum'
import {
  IAdminDetail,
  IAdminInfo,
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
    return api.get<any, IAdminInfo>(`/Admin/Info/${id}`)
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
  }
}
