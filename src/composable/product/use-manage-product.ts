import { toRefs } from 'vue'
import { reactive } from 'vue-demi'
import useProductApi from '../api/useProductApi'
import useNotyf from '../useNotyf'
import { errMessage } from '/@src/helpers/filter.helper'
import {
  ICreateProduct,
  IProduct,
  IUpdateProduct,
} from '/@src/types/interfaces/product.interface'

interface UseManageProductState {
  validate: Object
  productInfo?: IProduct
}
export default function useManageProduct() {
  const state = reactive<UseManageProductState>({
    validate: {},
    productInfo: undefined,
  })
  const notyf = useNotyf()
  const { getProductById, createProduct, updateProduct } = useProductApi()

  const fetchProductById = async (productId: number) => {
    const data = await getProductById(productId)
    if (data) {
      state.productInfo = data
    }
  }

  const submitCreateProduct = async (payload: ICreateProduct) => {
    const { status, message } = await createProduct(payload)
    if (status !== 201) {
      if (typeof message === 'object') state.validate = message
      else notyf.error(errMessage(message))
      return
    }
    state.validate = {}
    notyf.success('Success!')
    // TODO: change route to product list
  }

  const submitUpdateProduct = async (
    productId: number,
    payload: IUpdateProduct
  ) => {
    const { status, message } = await updateProduct(productId, payload)
    if (status !== 201) {
      if (typeof message === 'object') state.validate = message
      else notyf.error(errMessage(message))
      return
    }
    state.validate = {}
    notyf.success('Success!')
    // TODO: change route to product list
  }

  return {
    ...toRefs(state),
    submitCreateProduct,
    submitUpdateProduct,
    fetchProductById,
  }
}
