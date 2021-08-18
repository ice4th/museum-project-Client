import useApi, { apiHandleError, ApiResponse } from '../useApi'
import {
  ICreateProduct,
  IProductDetail,
} from '/@src/types/interfaces/product.interface'

import {
  IPaginationParams,
  IPaginationResponse,
} from '/@src/types/interfaces/common.interface'
import { Purchasable } from '/@src/types/enums/product.enum'

interface GetAllProductParams extends IPaginationParams {
  search?: string
  purchasable?: Purchasable
}

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

  const createProduct = (payload: ICreateProduct) => {
    return api.post<any, ApiResponse>(`Products`, payload)
  }

  return { getAllProduct, createProduct }
}
