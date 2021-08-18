import { toRefs } from 'vue'
import { reactive } from 'vue-demi'
import useProductApi from '../api/useProductApi'
import useNotyf from '../useNotyf'
import { errMessage } from '/@src/helpers/filter.helper'
import { ICreateProduct } from '/@src/types/interfaces/product.interface'

interface UseManageProductState {
  validate: Object
}
export default function useManageProduct() {
  const state = reactive<UseManageProductState>({
    validate: {},
  })
  const notyf = useNotyf()
  const { createProduct } = useProductApi()
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

  return { ...toRefs(state), submitCreateProduct }
}
