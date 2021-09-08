/**
 * useRedeemTable Composition API
 */

import moment from 'moment'
import { onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useOptionApi from '../api/useOptionApi'
import useRedeemApi from '../api/useRedeemApi'
import usePaginationRoute from '../use-pagination-route'
import useNotyf from '../useNotyf'
import { errMessage } from '/@src/helpers/filter.helper'
import { RedeemType } from '/@src/types/enums/redeem.enum'
import {
  PackageOption,
  PartnerOption,
} from '/@src/types/interfaces/option.interface'
import {
  ICreateRedeem,
  IRedeemDetail,
} from '/@src/types/interfaces/redeem.interface'

interface UseRedeemTableState {
  data: IRedeemDetail[]
  total: number
  currentRedeemId?: number
  redeemDetail: IRedeemDetail[]
  createNewRedeem: ICreateRedeem
  packages: PackageOption[]
  partners: PartnerOption[]
  isLoading: Boolean
}

export default function useRedeemTable() {
  const state = reactive<UseRedeemTableState>({
    data: [],
    total: 0,
    currentRedeemId: undefined,
    redeemDetail: [],
    createNewRedeem: {
      redeemType: RedeemType.DEFAULT,
      partnerId: 1,
      packageId: 0,
    },

    /**
     * packages and partners for create new redeem
     */
    packages: [],
    partners: [],
    isLoading: false,
  })
  const router = useRouter()
  const notyf = useNotyf()
  const { currentPage, perPage, search } = usePaginationRoute()
  const { getPackages, getPartners } = useOptionApi()
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

  const fetchRedeemById = async (id: number) => {
    const data = await redeemApi.getRedeemById(id)
    if (data.length) {
      state.currentRedeemId = id
      state.redeemDetail = data
    }
  }

  const createRedeem = async () => {
    if (!state.createNewRedeem.packageId) {
      notyf.error('Please Select Package')
      return
    }
    const { status, message } = await redeemApi.createRedeem(
      state.createNewRedeem
    )
    if (status === 201) {
      notyf.success('Create Redeem Success!')
      router.push({ name: 'code' })
    } else {
      notyf.error(errMessage(message) || 'Fail')
    }
    return status === 201
  }

  onMounted(async () => {
    const today = moment().format('YYYY-MM-DD')
    const todayIso = moment(today).toISOString()
    state.createNewRedeem.ticketStartDate = todayIso
    const [packages, partners] = await Promise.all([
      getPackages(),
      getPartners(),
      fetchAllRedeem(),
    ])
    state.packages = packages
    state.partners = partners
  })

  const redeemTableHeaders = [
    { key: 'id', label: 'ID' },
    { key: 'type', label: 'Type' },
    { key: 'partnerName', label: 'Partner' },
    { key: 'packageName', label: 'Package' },
    { key: 'status', label: 'Status' },
    { key: 'usedDate', label: 'Activated' },
    { key: 'createdAt', label: 'Created' },
    { key: 'expireDate', label: 'Expire' },
  ]
  return { ...toRefs(state), fetchRedeemById, createRedeem, redeemTableHeaders }
}
