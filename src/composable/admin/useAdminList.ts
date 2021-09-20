import { onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import { initAvatar } from '../../helpers/avatar.helper'
import { isSuccess } from '../api'
import useAdminApi from '../api/useAdminApi'
import usePaginationRoute from '../usePaginationRoute'
import useNotyf from '../useNotyf'
import { errMessage } from '/@src/helpers/filter.helper'
import { IAdminDetail } from '/@src/types/interfaces/admin.interface'
interface useAdminListState {
  data: IAdminDetail[]
  total: number
  status: 'activate' | 'deactivate'
  isActive: Boolean
  isLoading: Boolean
}

export default function useAdminList() {
  const state = reactive<useAdminListState>({
    data: [],
    total: 0,
    status: 'activate',
    isActive: true,
    isLoading: true,
  })
  const route = useRoute()
  const notyf = useNotyf()
  const { currentPage, perPage, search } = usePaginationRoute()
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
      currentPage,
      perPage,
      status: state.status,
      search,
    })
    state.isLoading = false
    if (data) {
      state.data = data.data.map((item) => {
        const { firstname, lastname } = item
        const { initials, color } = initAvatar(firstname, lastname)
        return {
          ...item,
          firstname,
          lastname,
          initials,
          color,
        }
      })
      state.total = data.total
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
    const status = route.query.status as 'activate' | 'deactivate'
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
