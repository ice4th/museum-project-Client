/**
 * useRedeemManagement Composition API
 */

import moment from 'moment'
import { onMounted, reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import useRedeemApi from '../api/useRedeemApi'
import useNotyf from '../useNotyf'
import { toFormat } from '/@src/helpers/date.helper'
import { errMessage } from '/@src/helpers/filter.helper'
import { RedeemType } from '/@src/types/enums/redeem.enum'
import {
  ICreateRedeem,
  IRedeemDetail,
} from '/@src/types/interfaces/redeem.interface'

interface UseRedeemManagementState {
  redeemDetail: IRedeemDetail[]
  createNewRedeem: ICreateRedeem
  isLoading: Boolean
}

export default function useRedeemManagement() {
  const state = reactive<UseRedeemManagementState>({
    redeemDetail: [],
    createNewRedeem: {
      redeemType: RedeemType.DEFAULT,
      partnerId: 1,
      packageId: 0,
    },

    /**
     * packages and partners for create new redeem
     */
    isLoading: false,
  })
  const router = useRouter()
  const notyf = useNotyf()
  const redeemApi = useRedeemApi()

  const fetchRedeemById = async (id: number) => {
    state.isLoading = true
    const data = await redeemApi.getRedeemById(id)
    state.isLoading = false
    if (data.length) {
      state.redeemDetail = data
    }
  }

  const createRedeem = async () => {
    if (!state.createNewRedeem.packageId) {
      notyf.error('Please Select Package')
      return
    }
    state.isLoading = true
    const ticketStartDate = moment(
      toFormat(state.createNewRedeem.ticketStartDate, 'YYYY-MM-DD')
    ).toISOString()
    const expireDate = moment(
      toFormat(state.createNewRedeem.expireDate, 'YYYY-MM-DD')
    ).toISOString()
    const { status, message } = await redeemApi.createRedeem({
      ...state.createNewRedeem,
      ticketStartDate,
      expireDate,
    })
    state.isLoading = false
    if (status === 201) {
      notyf.success('Create Redeem Success!')
      router.push({ name: 'codes-redeems' })
    } else {
      notyf.error(errMessage(message) || 'Fail')
    }
  }
  const redeemTypeChange = (value: string) => {
    if (value === RedeemType.GROUP) {
      state.createNewRedeem.amount = state.createNewRedeem.amount || 2
    } else {
      state.createNewRedeem.amount = undefined
    }
  }

  onMounted(async () => {
    const todayIso = toFormat()
    state.createNewRedeem.ticketStartDate = todayIso
  })
  return { ...toRefs(state), fetchRedeemById, redeemTypeChange, createRedeem }
}
