import useApi, { apiHandleError, ApiResponse } from '../useApi'
import {
  IProductDetail,
  IProduct,
  IUpdateProduct,
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

  const getProductById = async (productId: number) => {
    const res = await api.get<IProduct, ApiResponse>(`Products/${productId}`)
    return catchReponse(res)
  }
  const createProduct = (payload: IUpdateProduct) => {
    return api.post<any, ApiResponse>(`Products`, payload)
  }
  const updateProduct = (productId: number, payload: IUpdateProduct) => {
    return api.put<IProduct, ApiResponse>(`Products/${productId}`, {
      ...payload,
      // draft: payload.isPublish ? '0' : '1',
    })
  }
  return { getAllProduct, createProduct, updateProduct, getProductById }
}
