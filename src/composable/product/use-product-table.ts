import { identity } from '@vueuse/core'
import { onMounted, reactive, toRefs } from 'vue'
import { ProductType, Purchasable } from '/@src/types/enums/product.enum'
import useProductApi from '../api/useProductApi'
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
  totalPage: number
}
export default function useProductTable() {
  const state = reactive<UseProductTableState>({
    products: [],
    isloading: false,
    currentPage: 1,
    perPage: 10,
    total: 1,
    totalPage: 1,
  })
  const { getAllProduct } = useProductApi()

  const fetchAllProduct = async () => {
    state.isloading = true
    const res = await getAllProduct({
      currentPage: state.currentPage,
      perPage: state.perPage,
    })
    state.isloading = false
    state.products = res.data
    state.total = res.total
    state.totalPage = res.totalPage
    console.log(res)
  }

  const getProductDetails = () => {
    // state.products = getProduct.getAllProduct() as IProductDetail[]
  }
  onMounted(() => {
    fetchAllProduct()
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
