/**
 * useRedeemTable Composition API
 */

import { onMounted, reactive, ref, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import useNotyf from '../useNotyf'
import PackageService from '/@src/api/package.service'
import RedeemService from '/@src/api/redeem.service'
import router from '/@src/router'
import { IRedeemDetail } from '/@src/types/interfaces/redeem.interface'

interface UseRedeemTableState {
  data: IRedeemDetail[]
  currentPage: number
  totalPage: number
  perPage: number
  total: number
  currentRedeem?: IRedeemDetail
}

export default function useRedeemTable() {
  const state = reactive<UseRedeemTableState>({
    data: [],
    currentPage: 1,
    perPage: 15,
    totalPage: 1,
    total: 1,
    currentRedeem: undefined,
  })
  const route = useRoute()

  const fetchAllRedeem = async () => {
    const { data, status } = await RedeemService.getAllRedeems({
      currentPage: state.currentPage,
      perPage: state.perPage,
    })
    if (status === 200 && data) {
      state.data = data.data
      state.total = data.total
      state.totalPage = data.totalPage
    }
  }

  const fetchRedeemById = async (id: number) => {
    const { data, status } = await RedeemService.getRedeemById(id)
    if (status === 200 && data) {
      state.currentRedeem = data
    }
  }
  onMounted(() => {
    const page = route.query.page as string
    if (page) {
      state.currentPage = +page
    }
    fetchAllRedeem()
  })
  return { ...toRefs(state), fetchRedeemById }
}
