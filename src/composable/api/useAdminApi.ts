import useApi, { apiHandleError, ApiResponse } from '../useApi'
import { AdminStatus } from '/@src/types/enums/admin.enum'
import { IAdminDetail } from '/@src/types/interfaces/admin.interface'
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
      `/Admins`,
      { params }
    )
    return catchReponse(res)
  }

  const deactivateAccount = (id: number) => {
    return api.put<any, ApiResponse>(`/Admins/${id}/Deactivate`)
  }

  return { getAllAdmins, deactivateAccount }
}
