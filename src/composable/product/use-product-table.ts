import { identity } from '@vueuse/core'
import { onMounted, reactive, toRefs } from 'vue'
import { ProductType, Purchasable } from '/@src/types/enums/product.enum'
import useProductApi from '../api/useProductApi'
import {
  IProduct,
  IProductDetail,
} from '/@src/types/interfaces/product.interface'
import producList from '/@src/data/mock-product-list.json'
import { useRoute, useRouter } from 'vue-router'

interface UseProductTableState {
  products: IProductDetail[]
  isloading: boolean
  currentPage: number
  perPage: number
  total: number
  totalPage: number
  search?: string
  purchasable?: Purchasable
}
export default function useProductTable() {
  const state = reactive<UseProductTableState>({
    products: [],
    isloading: false,
    currentPage: 1,
    perPage: 10,
    total: 1,
    totalPage: 1,
    search: undefined,
    purchasable: undefined,
  })
  const route = useRoute()
  const router = useRouter()
  const { getAllProduct } = useProductApi()

  const fetchAllProduct = async () => {
    state.isloading = true
    if (route.query.perPage) {
      state.perPage = +(route.query.perPage as string)
    }
    if (route.query.page) {
      state.currentPage = +(route.query.page as string)
    }
    if (route.query.search) {
      state.search = route.query.search as string
    }
    if (route.query.purchasable) {
      state.purchasable =
        route.query.purchasable === Purchasable.YES ||
        route.query.purchasable === Purchasable.NO
          ? route.query.purchasable
          : undefined
    }
    const res = await getAllProduct({
      currentPage: state.currentPage,
      perPage: state.perPage,
      search: state.search,
      purchasable: state.purchasable,
    })
    state.isloading = false
    state.products = res.data
    state.total = res.total
    state.totalPage = res.totalPage
    console.log(route.query)
  }
  const selectPurchasable = () => {
    router.push({ query: { ...route.query, purchasable: state.purchasable } })
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
  return { ...toRefs(state), productTableHeaders, selectPurchasable }
}
