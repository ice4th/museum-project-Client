/**
 * useRedeemTable Composition API
 */

import moment from 'moment'
import { onMounted, reactive, ref, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useNotyf from '../useNotyf'
import PackageService from '/@src/api/package.service'
import PartnerService from '/@src/api/partner.service'
import RedeemService from '/@src/api/redeem.service'
import router from '/@src/router'
import { RedeemType } from '/@src/types/enums/redeem.enum'
import { IPackageInfo } from '/@src/types/interfaces/package.interface'
import { IPartnerDetail } from '/@src/types/interfaces/partner.interface'
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
  packages: IPackageInfo[]
  partners: IPartnerDetail[]
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

  const fetchPackages = async () => {
    const { data, status } = await PackageService.getAllPackages()
    if (status === 200 && data) {
      state.packages = data
    }
  }

  const fetchPartners = async () => {
    const { data, status } = await PartnerService.getAllPartner()
    if (status === 200 && data) {
      state.partners = data
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
      await fetchAllRedeem()
    } else {
      if (typeof message === 'object') {
        notyf.error(JSON.stringify(message) || 'Fail')
      } else {
        notyf.error(message || 'Fail')
      }
    }
    return status === 201
  }

  onMounted(() => {
    const page = route.query.page as string
    if (page) {
      state.currentPage = +page
    }
    const today = moment().format('YYYY-MM-DD')
    const todayIso = moment(today).toISOString()
    state.createNewRedeem.ticketStartDate = todayIso
    fetchAllRedeem()
    Promise.all([fetchPackages(), fetchPartners()])
  })
  return { ...toRefs(state), fetchRedeemById, createRedeem }
}
