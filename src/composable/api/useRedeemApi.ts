import useApi, { apiHandleError, ApiResponse } from '../useApi'
import {
  IPaginationParams,
  IPaginationResponse,
} from '/@src/types/interfaces/common.interface'
import {
  ICreateRedeem,
  IRedeemDetail,
} from '/@src/types/interfaces/redeem.interface'

export default function useRedeemApi() {
  const api = useApi()
  const { catchReponse } = apiHandleError()

  const getAllRedeems = async (
    params: IPaginationParams
  ): Promise<IPaginationResponse<IRedeemDetail[]>> => {
    const res = await api.get<
      IPaginationResponse<IRedeemDetail[]>,
      ApiResponse
    >(`/Redeems`, { params })
    return catchReponse(res)
  }

  const getRedeemById = async (id: number): Promise<IRedeemDetail[]> => {
    const res = await api.get<IRedeemDetail[], ApiResponse>(`/Redeems/${id}`)
    return catchReponse(res)
  }

  const createRedeem = async (payload: ICreateRedeem) => {
    return await api.post<any, ApiResponse>(`/Redeems`, {
      ...payload,
      amount: payload.amount ? +payload.amount : undefined,
    })
  }

  return { getAllRedeems, getRedeemById, createRedeem }
}
