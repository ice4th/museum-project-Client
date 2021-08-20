import { toRefs } from 'vue'
import { reactive } from 'vue-demi'
import { useRouter } from 'vue-router'
import { checkResponseStatus } from '../api'
import useProductApi from '../api/useProductApi'
import useNotyf from '../useNotyf'
import { errMessage } from '/@src/helpers/filter.helper'
import {
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
  const router = useRouter()
  const notyf = useNotyf()
  const { getProductById, createProduct, updateProduct } = useProductApi()

  const fetchProductById = async (productId: number) => {
    const data = await getProductById(productId)
    if (data) {
      state.productInfo = data
    }
  }

  const submitCreateProduct = async (payload: IUpdateProduct) => {
    const res = await createProduct(payload)
    if (checkResponseStatus(res)) {
      state.validate = {}
      notyf.success('Success!')
      router.push({ name: 'product' })
      return
    }
    if (typeof res.message === 'object') state.validate = res.message
    else notyf.error(errMessage(res.message))
  }

  const submitUpdateProduct = async (payload: IUpdateProduct) => {
    if (!state.productInfo?.id) return
    const res = await updateProduct(state.productInfo.id, payload)
    const data = checkResponseStatus(res)
    if (data) {
      state.productInfo = data
      state.validate = {}
      notyf.success('Success!')
      router.push({ name: 'product' })
      return
    }
    if (typeof res.message === 'object') state.validate = res.message
    else notyf.error(errMessage(res.message))
  }

  return {
    ...toRefs(state),
    submitCreateProduct,
    submitUpdateProduct,
    fetchProductById,
  }
}
