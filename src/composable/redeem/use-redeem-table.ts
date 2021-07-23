/**
 * useRedeemTable Composition API
 */

import moment from 'moment'
import { onMounted, reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useOptionApi from '../api/useOptionApi'
import useNotyf from '../useNotyf'
import RedeemService from '/@src/api/redeem.service'
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
  currentPage: number
  totalPage: number
  perPage: number
  total: number
  currentRedeemId?: number
  redeemDetail: IRedeemDetail[]
  createNewRedeem: ICreateRedeem
  packages: PackageOption[]
  partners: PartnerOption[]
}

export default function useRedeemTable() {
  const state = reactive<UseRedeemTableState>({
    data: [],
    currentPage: 1,
    perPage: 15,
    totalPage: 1,
    total: 1,
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
  })
  const route = useRoute()
  const router = useRouter()
  const notyf = useNotyf()
  const { getPackages, getPartners } = useOptionApi()

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
      state.currentRedeemId = id
      state.redeemDetail = data
    }
  }

  const createRedeem = async () => {
    if (!state.createNewRedeem.packageId) {
      notyf.error('Please Select Package')
      return
    }
    const { status, message } = await RedeemService.createRedeem(
      state.createNewRedeem
    )
    if (status === 201) {
      notyf.success('Create Redeem Success!')
      router.push({ name: 'code' })
    } else {
      if (typeof message === 'object') {
        notyf.error(JSON.stringify(message) || 'Fail')
      } else {
        notyf.error(message || 'Fail')
      }
    }
    return status === 201
  }

  onMounted(async () => {
    const page = route.query.page as string
    if (page) {
      state.currentPage = +page
    }
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
  return { ...toRefs(state), fetchRedeemById, createRedeem }
}
