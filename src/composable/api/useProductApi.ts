import useApi, { apiHandleError, ApiResponse } from '../useApi'
import { ICreateProduct } from '/@src/types/interfaces/product.interface'
export default function useProductApi() {
  const api = useApi()
  const { catchReponse } = apiHandleError()
  const createProduct = (payload: ICreateProduct) => {
    return api.post<any, ApiResponse>(`Products`, payload)
  }
  return { createProduct }
}
