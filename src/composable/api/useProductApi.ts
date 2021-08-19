import useApi, { apiHandleError, ApiResponse } from '../useApi'
import {
  ICreateProduct,
  IProduct,
  IUpdateProduct,
} from '/@src/types/interfaces/product.interface'
export default function useProductApi() {
  const api = useApi()
  const { catchReponse } = apiHandleError()

  const getProductById = async (productId: number) => {
    const res = await api.get<IProduct, ApiResponse>(`Products/${productId}`)
    return catchReponse(res)
  }
  const createProduct = (payload: ICreateProduct) => {
    return api.post<any, ApiResponse>(`Products`, payload)
  }

  const updateProduct = (productId: number, payload: IUpdateProduct) => {
    return api.put<IProduct, ApiResponse>(`Products/${productId}`, payload)
  }
  return { createProduct, updateProduct, getProductById }
}
