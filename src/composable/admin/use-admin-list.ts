import { onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { isSuccess } from '../api'
import useAdminApi from '../api/useAdminApi'
import useNotyf from '../useNotyf'
import { errMessage } from '/@src/helpers/filter.helper'
import { IAdminDetail } from '/@src/types/interfaces/admin.interface'
interface UseStudentListState {
  data: IAdminDetail[]
  currentPage: number
  totalPage: number
  perPage: number
  total: number
  search: string
  status: 'activate' | 'deactivate'
  isActive: Boolean
  isLoading: Boolean
}

export default function useAdminList() {
  const state = reactive<UseStudentListState>({
    data: [],
    currentPage: 1,
    totalPage: 0,
    perPage: 10,
    total: 0,
    search: '',
    status: 'activate',
    isActive: true,
    isLoading: true,
  })
  const route = useRoute()
  const notyf = useNotyf()
  const {
    getAllAdmins,
    deactivateAccount: deactivate,
    changeCountry,
    resendActivateEmail,
  } = useAdminApi()
  const fetchAllAdmins = async () => {
    state.isLoading = true
    // state.data =
    const data = await getAllAdmins({
      currentPage: state.currentPage,
      perPage: state.perPage,
      status: state.status,
      search: state.search,
    })
    state.isLoading = false
    if (data) {
      state.data = data.data
      state.total = data.total
      state.totalPage = data.totalPage
    }
  }

  const activateAccount = async (admin: IAdminDetail) => {
    // activateAccount
    const res = await resendActivateEmail(admin.id)
    if (isSuccess(res))
      notyf.success(
        `Send verify email to ${admin.fullname} (${admin.name}) Success!`
      )
    else notyf.error(errMessage(res.message) || 'Fail, Please try again')
    fetchAllAdmins()
  }
  const deactivateAccount = async (admin: IAdminDetail) => {
    // deactivateAccount
    const res = await deactivate(admin.id)
    if (isSuccess(res))
      notyf.success(`Deactivate ${admin.fullname} (${admin.name}) Success!`)
    else notyf.error(errMessage(res.message) || 'Fail, Please try again')
    fetchAllAdmins()
  }

  const changeCountryById = async (admin: IAdminDetail) => {
    // change country
    const res = await changeCountry(admin.id, admin.country)
    if (isSuccess(res))
      notyf.success(
        `Change country of ${admin.fullname} (${admin.name}) Success!`
      )
    else notyf.error(errMessage(res.message) || 'Fail, Please try again')
    fetchAllAdmins()
  }

  onMounted(() => {
    const page = route.query.page as string
    const search = route.query.search as string
    const perPage = route.query.perPage as string
    const status = route.query.status as 'activate' | 'deactivate'
    if (page) state.currentPage = +page
    if (perPage) state.perPage = +perPage
    if (search) state.search = search
    if (status) {
      state.status = status
      state.isActive = status === 'activate'
    }
    fetchAllAdmins()
  })
  return {
    ...toRefs(state),
    activateAccount,
    deactivateAccount,
    changeCountryById,
  }
}
