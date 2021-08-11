import { identity } from '@vueuse/core'
import { onMounted, reactive, toRefs } from 'vue'
import { ProductType, Purchasable } from '/@src/types/enums/product.enum'
import {
  IProduct,
  IProductDetail,
} from '/@src/types/interfaces/product.interface'
import producList from '/@src/data/mock-product-list.json'

interface UseProductTableState {
  products: IProductDetail[]
  isloading: boolean
  currentPage: number
  perPage: number
  total: number
}
export default function useProductTable() {
  const state = reactive<UseProductTableState>({
    products: [],
    isloading: false,
    currentPage: 1,
    perPage: 10,
    total: 1,
  })

  const getProductDetails = () => {
    state.products = producList.data.data as IProductDetail[]
  }
  onMounted(() => {
    getProductDetails()
  })

  const productTableHeaders = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'slug', label: 'Slug' },
    { key: 'type', label: 'Type' },
    { key: 'purchasable', label: 'Purchasable', isCenter: true },
    { key: 'price', label: 'Price' },
    { key: 'duration', label: 'Duration' },
    { key: 'order', label: 'Order' },
    { key: 'action', label: 'Action', isEnd: true, isRaw: true },
  ]
  return { ...toRefs(state), productTableHeaders }
}
