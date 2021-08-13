import useApi, { apiHandleError, ApiResponse } from '../useApi'
import { IProductDetail } from '/@src/types/interfaces/product.interface'
import {
  IPaginationParams,
  IPaginationResponse,
} from '/@src/types/interfaces/common.interface'

interface GetAllProductParams extends IPaginationParams {}

export default function useProductApi() {
  const api = useApi()
  const { catchReponse } = apiHandleError()

  const getAllProduct = async (
    params: GetAllProductParams
  ): Promise<IPaginationResponse<IProductDetail[]>> => {
    const res = await api.get<
      IPaginationResponse<IProductDetail[]>,
      ApiResponse
    >(`/Products/List`, { params })
    return catchReponse(res)
  }

  return { getAllProduct }
}
