import {
  IPaginationParams,
  IPaginationResponse,
} from '/@src/types/interfaces/common.interface'
import useApi from '../useApi'
import { IRoleInfo } from '/@src/types/interfaces/permission.interface'
import { AxiosResponse } from 'axios'

export default function usePermissionApi() {
  const api = useApi()

  const getRolePagination = (
    params: IPaginationParams
  ): Promise<AxiosResponse<IPaginationResponse<IRoleInfo[]>>> => {
    return api.get<IPaginationResponse<IRoleInfo[]>>('/Roles', { params })
  }

  return {
    getRolePagination,
  }
}
