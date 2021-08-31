import { onMounted, reactive, toRefs } from 'vue'
import { Purchasable } from '/@src/types/enums/product.enum'
import useProductApi from '../api/useProductApi'
import { IProductDetail } from '/@src/types/interfaces/product.interface'
import { useRoute, useRouter } from 'vue-router'
import usePaginationRoute from '../use-pagination-route'

interface UseProductTableState {
  products: IProductDetail[]
  isloading: boolean
  total: number
  purchasable?: Purchasable
}
export default function useProductTable() {
  const state = reactive<UseProductTableState>({
    products: [],
    isloading: false,
    total: 1,
    purchasable: undefined,
  })
  const route = useRoute()
  const router = useRouter()
  const { currentPage, perPage, search } = usePaginationRoute()
  const { getAllProduct } = useProductApi()

  const fetchAllProduct = async () => {
    state.isloading = true
    if (route.query.purchasable) {
      state.purchasable =
        route.query.purchasable === Purchasable.YES ||
        route.query.purchasable === Purchasable.NO
          ? route.query.purchasable
          : undefined
    }
    const res = await getAllProduct({
      currentPage,
      perPage,
      search,
      purchasable: state.purchasable,
    })
    state.isloading = false
    state.products = res.data
    state.total = res.total
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
