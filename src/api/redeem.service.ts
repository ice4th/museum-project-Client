/**
 * RedeemService about admin profile service
 */
import {
  IPaginationParams,
  IPaginationResponse,
} from '../types/interfaces/common.interface'
import { IRedeemDetail } from '../types/interfaces/redeem.interface'
import ApiService, { ApiServiceResponse } from './api.service'

export default class RedeemService {
  public static async getAllRedeems(
    params: IPaginationParams
  ): Promise<ApiServiceResponse<IPaginationResponse<IRedeemDetail[]>>> {
    return await ApiService.get<IPaginationResponse<IRedeemDetail[]>>(
      `/Redeems`,
      { params }
    )
  }

  public static async getRedeemById(
    id: number
  ): Promise<ApiServiceResponse<IRedeemDetail>> {
    return await ApiService.get<IRedeemDetail>(`/Redeems/${id}`)
  }
}
