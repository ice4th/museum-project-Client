import { checkResponseStatus } from '.'
import useApi from '../useApi'
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

  const getAllRedeems = async (
    params: IPaginationParams
  ): Promise<IPaginationResponse<IRedeemDetail[]>> => {
    const res = await api.get<IPaginationResponse<IRedeemDetail[]>>(
      `/Redeems`,
      { params }
    )
    return checkResponseStatus(res)
  }

  const getRedeemById = async (id: number): Promise<IRedeemDetail[]> => {
    const res = await api.get<IRedeemDetail[]>(`/Redeems/${id}`)
    return checkResponseStatus(res)
  }

  const createRedeem = async (payload: ICreateRedeem) => {
    return await api.post(`/Redeems`, {
      ...payload,
      amount: payload.amount ? +payload.amount : undefined,
    })
  }

  return { getAllRedeems, getRedeemById, createRedeem }
}
