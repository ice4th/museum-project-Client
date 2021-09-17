/**
 * useRedeemTable Composition API
 */

import { onMounted, reactive, toRefs } from 'vue'
import useRedeemApi from '../api/useRedeemApi'
import usePaginationRoute from '../usePaginationRoute'
import { IDatatableHeader } from '/@src/types/interfaces/component.interface'
import { IRedeemDetail } from '/@src/types/interfaces/redeem.interface'

interface UseRedeemTableState {
  data: IRedeemDetail[]
  total: number
  isLoading: Boolean
}

export default function useRedeemTable() {
  const state = reactive<UseRedeemTableState>({
    data: [],
    total: 0,
    isLoading: false,
  })
  const { currentPage, perPage, search } = usePaginationRoute()
  const redeemApi = useRedeemApi()

  const fetchAllRedeem = async () => {
    state.isLoading = true
    const data = await redeemApi.getAllRedeems({
      currentPage,
      perPage,
      search,
    })
    state.isLoading = false
    if (data.total) {
      state.data = data.data
      state.total = data.total
    }
  }

  onMounted(async () => {
    fetchAllRedeem()
  })

  const redeemTableHeaders: IDatatableHeader[] = [
    { key: 'id', label: 'ID' },
    { key: 'type', label: 'Type' },
    { key: 'partnerName', label: 'Partner' },
    { key: 'packageName', label: 'Package' },
    { key: 'status', label: 'Status' },
    { key: 'usedDate', label: 'Activated' },
    { key: 'createdAt', label: 'Created' },
    { key: 'expireDate', label: 'Expire' },
  ]
  return { ...toRefs(state), redeemTableHeaders }
}
